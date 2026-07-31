/* =====================================================================
   EL MOLLETERO — Lógica del menú digital
   - Dibuja el menú a partir de assets/js/datos.js
   - Navegación por categorías + buscador
   - Pedido (carrito) con persistencia y envío por WhatsApp
   - Tema claro / oscuro
   ===================================================================== */

(function () {
  'use strict';

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var MENU  = window.MENU;
  var MARCA = MENU.marca;
  var CONFIG = MENU.config || {};
  var IDIOMAS = window.IDIOMAS || { ui: { es: {} }, en: {} };
  var RUTA_IMG = 'assets/img/platillos/';
  /* Nombre con el que se guardan el pedido, el idioma y el tema en el
     navegador del cliente. Si publicas varios menús bajo el mismo dominio,
     dale a cada uno el suyo con config.almacen en datos.js: así el pedido
     de un negocio no se mezcla con el de otro. */
  var ALMACEN = (CONFIG.almacen || 'menu') + ':';
  var LLAVE_PEDIDO  = ALMACEN + 'pedido';
  var LLAVE_TEMA    = ALMACEN + 'tema';
  var LLAVE_PEDIDOS = ALMACEN + 'pedidos';
  var LLAVE_IDIOMA  = ALMACEN + 'idioma';

  /* ============================================================ IDIOMA ---
     El español sale de datos.js; el inglés, de idiomas.js. Si a un texto
     le falta traducción se muestra el español. */

  var IDIOMA = 'es';
  var T = IDIOMAS.ui.es;              // textos de la interfaz
  var EN = IDIOMAS.en || {};          // traducción del menú

  function leerIdiomaGuardado() {
    var porUrl = (new URLSearchParams(location.search).get('idioma') || '').toLowerCase();
    if (porUrl === 'es' || porUrl === 'en') {
      try { localStorage.setItem(LLAVE_IDIOMA, porUrl); } catch (e) {}
      return porUrl;
    }
    try {
      var guardado = localStorage.getItem(LLAVE_IDIOMA);
      if (guardado === 'es' || guardado === 'en') return guardado;
    } catch (e) {}
    return null;
  }

  function fijarIdioma(codigo) {
    IDIOMA = codigo === 'en' ? 'en' : 'es';
    T = IDIOMAS.ui[IDIOMA] || IDIOMAS.ui.es;
    document.documentElement.lang = IDIOMA;
    try { localStorage.setItem(LLAVE_IDIOMA, IDIOMA); } catch (e) {}
  }

  /* Traducción de un platillo: se busca por 'idCategoria/Nombre' */
  function traducirItem(item) {
    if (IDIOMA === 'es') return item;
    var t = (EN.platillos || {})[item._catId + '/' + item.nombre];
    if (!t) return item;
    return {
      nombre: t.nombre || item.nombre,
      desc: t.desc || item.desc
    };
  }

  /* Traducción de un texto suelto (grupos, extras, tamaños) */
  function traducir(mapa, texto) {
    if (IDIOMA === 'es') return texto;
    return (EN[mapa] || {})[texto] || texto;
  }

  function categoriaTraducida(cat) {
    if (IDIOMA === 'es') return cat;
    var t = (EN.categorias || {})[cat.id] || {};
    return {
      nav: t.nav || cat.nav || cat.titulo,
      titulo: t.titulo || cat.titulo,
      nota: t.nota || cat.nota
    };
  }

  /* ------------------------------------------- ¿pedidos activos o no? -----
     Manda lo que diga la URL (?pedidos=on|off|auto), que se recuerda en el
     navegador; si no hay nada guardado, manda config.pedidos de datos.js. */
  var PEDIDOS = (function () {
    var pedidoUrl = (new URLSearchParams(location.search).get('pedidos') || '').toLowerCase();

    try {
      if (pedidoUrl === 'auto') localStorage.removeItem(LLAVE_PEDIDOS);
      else if (pedidoUrl === 'on' || pedidoUrl === 'off') {
        localStorage.setItem(LLAVE_PEDIDOS, pedidoUrl);
      }
      var guardado = localStorage.getItem(LLAVE_PEDIDOS);
      if (guardado === 'on')  return true;
      if (guardado === 'off') return false;
    } catch (e) {
      // sin localStorage (modo privado): al menos respetamos la URL de esta visita
      if (pedidoUrl === 'on')  return true;
      if (pedidoUrl === 'off') return false;
    }

    return CONFIG.pedidos !== false;
  })();

  /* ---------------------------------------------------------- utilidades */

  function dinero(n) {
    return '$' + n.toLocaleString('es-MX');
  }

  function normalizar(txt) {
    return (txt || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function elem(tag, clase, texto) {
    var e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto != null) e.textContent = texto;
    return e;
  }

  /* Precio a mostrar en la ficha: el fijo o el más bajo de las variantes */
  function precioBase(item) {
    if (typeof item.precio === 'number') return item.precio;
    if (item.variantes && item.variantes.length) {
      return item.variantes.reduce(function (min, v) {
        return v.precio < min ? v.precio : min;
      }, item.variantes[0].precio);
    }
    return 0;
  }

  function nombreTag(t) {
    return T[t] || t;
  }

  /* ==================================================== DIBUJAR EL MENÚ */

  var indice = [];   // todos los items, para el buscador y el modal de detalle

  function dibujarMenu() {
    var contenedor = $('#secciones');
    var navLista   = $('#navLista');

    /* se puede volver a dibujar (al cambiar de idioma) */
    contenedor.replaceChildren();
    navLista.replaceChildren();
    indice = [];

    MENU.categorias.forEach(function (cat) {
      var tc = categoriaTraducida(cat);

      /* --- entrada en la navegación --- */
      var li = elem('li');
      var a  = elem('a', null, tc.nav || tc.titulo);
      a.href = '#' + cat.id;
      li.appendChild(a);
      navLista.appendChild(li);

      /* --- sección --- */
      var sec = elem('section', 'seccion');
      sec.id = cat.id;

      var cab = elem('div', 'seccion-cab');
      cab.appendChild(elem('h2', null, tc.titulo));
      if (tc.nota) cab.appendChild(elem('p', 'nota', tc.nota));
      cab.appendChild(elem('div', 'filete'));
      sec.appendChild(cab);

      cat.grupos.forEach(function (grupo) {
        if (grupo.titulo) {
          var gt = elem('div', 'grupo-titulo');
          gt.appendChild(elem('span', null, traducir('grupos', grupo.titulo)));
          sec.appendChild(gt);
        }
        var rejilla = elem('div', 'rejilla');
        grupo.items.forEach(function (item) {
          item._id = indice.length;
          item._catId = cat.id;
          item._cat = tc.titulo;
          indice.push(item);
          rejilla.appendChild(ficha(item));
        });
        sec.appendChild(rejilla);
      });

      if (cat.extras) sec.appendChild(bloqueExtras(cat.extras));

      contenedor.appendChild(sec);
    });
  }

  function ficha(item) {
    var art = elem('article', 'ficha');
    var txt = traducirItem(item);
    var ingles = (EN.platillos || {})[item._catId + '/' + item.nombre] || {};
    art.dataset.id = item._id;
    /* el buscador siempre mira los dos idiomas: encuentra "eggs" y "huevos"
       sin importar en cuál esté puesto el menú */
    art.dataset.buscar = normalizar([
      item.nombre, item.desc, ingles.nombre, ingles.desc, item._cat
    ].join(' '));

    /* foto o monograma */
    var foto = elem('div', 'ficha-foto');
    if (item.img) {
      var img = new Image();
      img.src = RUTA_IMG + item.img + '.webp';
      img.alt = txt.nombre;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = function () { foto.replaceChildren(monograma(txt.nombre)); };
      foto.appendChild(img);
    } else {
      foto.classList.add('sin-foto');
      foto.appendChild(monograma(txt.nombre));
    }
    art.appendChild(foto);

    /* cuerpo */
    var cuerpo = elem('div', 'ficha-cuerpo');

    var linea = elem('div', 'ficha-linea');
    linea.appendChild(elem('h3', null, txt.nombre));
    linea.appendChild(elem('div', 'puntos'));
    var precio = elem('div', 'precio');
    if (item.variantes) {
      precio.appendChild(elem('small', null, T.desde));
      precio.appendChild(document.createTextNode(dinero(precioBase(item))));
    } else {
      precio.textContent = dinero(precioBase(item));
    }
    linea.appendChild(precio);
    cuerpo.appendChild(linea);

    if (txt.desc) cuerpo.appendChild(elem('p', 'ficha-desc', txt.desc));

    if (item.tags && item.tags.length) {
      var tags = elem('div', 'etiquetas');
      item.tags.forEach(function (t) {
        tags.appendChild(elem('span', 'etiqueta ' + t, nombreTag(t)));
      });
      cuerpo.appendChild(tags);
    }

    if (PEDIDOS) {
      var pie = elem('div', 'ficha-pie');
      var btn = elem('button', 'btn-agregar', item.variantes ? T.elegir : T.agregar);
      btn.type = 'button';
      pie.appendChild(btn);
      cuerpo.appendChild(pie);
    }

    art.appendChild(cuerpo);

    art.addEventListener('click', function () { abrirDetalle(item); });
    return art;
  }

  function monograma(nombre) {
    var m = elem('div', 'monograma');
    m.appendChild(elem('b', null, nombre.charAt(0).toUpperCase()));
    return m;
  }

  function bloqueExtras(extras) {
    var caja = elem('div', 'extras');
    caja.appendChild(elem('h3', null, traducir('extras', extras.titulo)));
    var cols = elem('div', 'extras-cols');
    extras.columnas.forEach(function (col) {
      var c = elem('div', 'extras-col');
      var h = elem('h4');
      h.appendChild(document.createTextNode(traducir('extras', col.titulo) + ' '));
      if (col.precio) h.appendChild(elem('b', null, dinero(col.precio)));
      c.appendChild(h);
      var ul = elem('ul');
      col.lista.forEach(function (x) {
        ul.appendChild(elem('li', null, traducir('extras', x)));
      });
      c.appendChild(ul);
      cols.appendChild(c);
    });
    caja.appendChild(cols);
    return caja;
  }

  /* ================================================= NAVEGACIÓN ACTIVA */

  var observador = null;

  function activarNavegacion() {
    var enlaces = $$('#navLista a');
    var mapa = {};
    enlaces.forEach(function (a) { mapa[a.getAttribute('href').slice(1)] = a; });

    /* al cambiar de idioma se redibuja: hay que soltar el observador viejo */
    if (observador) observador.disconnect();

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        enlaces.forEach(function (a) { a.classList.remove('activo'); });
        var activo = mapa[e.target.id];
        if (!activo) return;
        activo.classList.add('activo');
        // en móvil, centrar el chip dentro de la tira que se desliza
        if (window.innerWidth < 1080) centrarChip(activo);
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    $$('.seccion').forEach(function (s) { obs.observe(s); });
    observador = obs;
  }

  /* Desplaza la tira de categorías (no la página) para centrar el chip activo */
  function centrarChip(enlace) {
    var tira = $('#navLista');
    if (!tira) return;
    var destino = enlace.offsetLeft - (tira.clientWidth - enlace.offsetWidth) / 2;
    tira.scrollTo({ left: Math.max(0, destino), behavior: 'smooth' });
  }

  /* ============================================================ BUSCADOR */

  function activarBuscador() {
    var campo   = $('#campoBusqueda');
    var limpiar = $('#limpiarBusqueda');
    var aviso   = $('#sinResultados');

    function filtrar() {
      var q = normalizar(campo.value.trim());
      limpiar.classList.toggle('oculto', !q);

      if (!q) {
        $$('.ficha, .seccion, .grupo-titulo, .extras, .rejilla').forEach(function (n) {
          n.classList.remove('oculto');
        });
        aviso.classList.add('oculto');
        return;
      }

      var encontrados = 0;
      $$('.ficha').forEach(function (f) {
        var coincide = f.dataset.buscar.indexOf(q) !== -1;
        f.classList.toggle('oculto', !coincide);
        if (coincide) encontrados++;
      });

      // ocultar rejillas, títulos de grupo y secciones que quedaron vacíos
      $$('.rejilla').forEach(function (r) {
        var vacia = !$('.ficha:not(.oculto)', r);
        r.classList.toggle('oculto', vacia);
        var previo = r.previousElementSibling;
        if (previo && previo.classList.contains('grupo-titulo')) {
          previo.classList.toggle('oculto', vacia);
        }
      });
      $$('.extras').forEach(function (e) { e.classList.add('oculto'); });
      $$('.seccion').forEach(function (s) {
        s.classList.toggle('oculto', !$('.ficha:not(.oculto)', s));
      });

      aviso.classList.toggle('oculto', encontrados > 0);
    }

    campo.addEventListener('input', filtrar);
    limpiar.addEventListener('click', function () {
      campo.value = '';
      filtrar();
      campo.focus();
    });
  }

  /* ====================================================== MODAL DETALLE */

  var detalle = {
    velo: null, item: null, variante: 0, cantidad: 1
  };

  function abrirDetalle(item) {
    detalle.item = item;
    detalle.variante = 0;
    detalle.cantidad = 1;
    pintarDetalle();
    abrirVelo($('#modalDetalle'));
  }

  function pintarDetalle() {
    var item = detalle.item;
    var cuerpo = $('#detalleCuerpo');
    cuerpo.replaceChildren();

    var txt = traducirItem(item);
    $('#tituloDetalle').textContent = item._cat;

    var foto = elem('div', 'detalle-foto');
    if (item.img) {
      var img = new Image();
      img.src = RUTA_IMG + item.img + '.webp';
      img.alt = txt.nombre;
      img.onerror = function () { foto.replaceChildren(monograma(txt.nombre)); };
      foto.appendChild(img);
    } else {
      foto.appendChild(monograma(txt.nombre));
    }
    cuerpo.appendChild(foto);

    cuerpo.appendChild(elem('h3', 'detalle-nombre', txt.nombre));
    if (txt.desc) cuerpo.appendChild(elem('p', 'detalle-desc', txt.desc));

    if (item.tags && item.tags.length) {
      var tags = elem('div', 'etiquetas');
      tags.style.marginBottom = '18px';
      item.tags.forEach(function (t) {
        tags.appendChild(elem('span', 'etiqueta ' + t, nombreTag(t)));
      });
      cuerpo.appendChild(tags);
    }

    /* Sin pedidos: sólo se informa el precio, no hay nada que elegir */
    if (!PEDIDOS) {
      var precios = elem('div', 'variantes solo-lectura');
      if (item.variantes) {
        item.variantes.forEach(function (v) {
          var p = elem('span', 'variante');
          p.appendChild(document.createTextNode(traducir('variantes', v.nombre)));
          p.appendChild(elem('b', null, dinero(v.precio)));
          precios.appendChild(p);
        });
      } else {
        precios.appendChild(elem('span', 'variante precio-suelto', dinero(item.precio)));
      }
      cuerpo.appendChild(precios);
      return;
    }

    if (item.variantes) {
      var caja = elem('div', 'variantes');
      item.variantes.forEach(function (v, i) {
        var b = elem('button', 'variante' + (i === detalle.variante ? ' activa' : ''));
        b.type = 'button';
        b.appendChild(document.createTextNode(traducir('variantes', v.nombre)));
        b.appendChild(elem('b', null, dinero(v.precio)));
        b.addEventListener('click', function () {
          detalle.variante = i;
          pintarDetalle();
        });
        caja.appendChild(b);
      });
      cuerpo.appendChild(caja);
    }

    /* El contador vive en el pie fijo, junto al botón: en pantallas cortas
       siempre queda a la vista sin tener que bajar dentro del modal. */
    var fila = $('#contadorDetalle');
    fila.replaceChildren();
    var menos = elem('button', null, '−'); menos.type = 'button';
    var valor = elem('span', null, String(detalle.cantidad));
    var mas   = elem('button', null, '+'); mas.type = 'button';
    menos.addEventListener('click', function () {
      if (detalle.cantidad > 1) { detalle.cantidad--; valor.textContent = detalle.cantidad; refrescarBotonDetalle(); }
    });
    mas.addEventListener('click', function () {
      if (detalle.cantidad < 30) { detalle.cantidad++; valor.textContent = detalle.cantidad; refrescarBotonDetalle(); }
    });
    fila.append(menos, valor, mas);

    refrescarBotonDetalle();
  }

  function precioDetalle() {
    var item = detalle.item;
    return item.variantes ? item.variantes[detalle.variante].precio : item.precio;
  }

  function refrescarBotonDetalle() {
    $('#btnAgregarDetalle').textContent =
      T.agregar + ' · ' + dinero(precioDetalle() * detalle.cantidad);
  }

  /* ============================================================ PEDIDO */

  var pedido = {};   // clave -> { nombre, variante, precio, cantidad }

  function cargarPedido() {
    try {
      var guardado = localStorage.getItem(LLAVE_PEDIDO);
      if (guardado) pedido = JSON.parse(guardado);
    } catch (e) { pedido = {}; }
  }

  function guardarPedido() {
    try { localStorage.setItem(LLAVE_PEDIDO, JSON.stringify(pedido)); } catch (e) {}
  }

  /* En el pedido se guarda SIEMPRE el nombre en español, más el id de la
     categoría. Así el pedido sobrevive a un cambio de idioma: al pintarlo
     se traduce al vuelo. */
  function agregar(item, variante, precio, cantidad) {
    var clave = item._catId + '||' + item.nombre + '||' + (variante || '');
    if (!pedido[clave]) {
      pedido[clave] = {
        catId: item._catId, nombre: item.nombre,
        variante: variante || '', precio: precio, cantidad: 0
      };
    }
    pedido[clave].precio = precio;
    pedido[clave].cantidad += cantidad;
    refrescarPedido();
  }

  /* Nombre y tamaño de una línea del pedido, en el idioma actual */
  function nombreDePedido(it) {
    if (IDIOMA === 'es') return it.nombre;
    var t = (EN.platillos || {})[it.catId + '/' + it.nombre];
    return (t && t.nombre) || it.nombre;
  }

  function totales() {
    var piezas = 0, total = 0;
    Object.keys(pedido).forEach(function (k) {
      piezas += pedido[k].cantidad;
      total  += pedido[k].cantidad * pedido[k].precio;
    });
    return { piezas: piezas, total: total };
  }

  function refrescarPedido() {
    guardarPedido();
    var t = totales();

    $('#piezas').textContent = t.piezas;
    $('#palabraPiezas').textContent = t.piezas === 1 ? T.producto : T.productos;
    $('#totalBarra').textContent = dinero(t.total);
    var mostrar = PEDIDOS && t.piezas > 0;
    $('#barraPedido').classList.toggle('visible', mostrar);
    // con pedido activo el contenido necesita más aire abajo (móvil)
    document.body.classList.toggle('con-pedido', mostrar);

    var lista = $('#listaPedido');
    lista.replaceChildren();

    var claves = Object.keys(pedido);
    if (!claves.length) {
      lista.appendChild(elem('p', 'vacio', T.pedidoVacio));
    }

    claves.forEach(function (clave) {
      var it = pedido[clave];
      var fila = elem('div', 'renglon');

      var nombre = elem('div', 'renglon-nombre', nombreDePedido(it));
      if (it.variante) nombre.appendChild(elem('small', null, traducir('variantes', it.variante)));
      fila.appendChild(nombre);

      var cont = elem('div', 'contador');
      var menos = elem('button', null, '−'); menos.type = 'button';
      var valor = elem('span', null, String(it.cantidad));
      var mas   = elem('button', null, '+'); mas.type = 'button';
      menos.addEventListener('click', function () {
        it.cantidad--;
        if (it.cantidad <= 0) delete pedido[clave];
        refrescarPedido();
      });
      mas.addEventListener('click', function () { it.cantidad++; refrescarPedido(); });
      cont.append(menos, valor, mas);
      fila.appendChild(cont);

      fila.appendChild(elem('div', 'renglon-sub', dinero(it.cantidad * it.precio)));
      lista.appendChild(fila);
    });

    $('#totalPedido').textContent = dinero(t.total);
    $('#btnWhatsapp').disabled = t.piezas === 0;
    $('#btnVaciar').classList.toggle('oculto', t.piezas === 0);
  }

  function enviarWhatsapp() {
    var t = totales();
    if (!t.piezas) return;

    var lineas = Object.keys(pedido).map(function (k) {
      var it = pedido[k];
      return '• ' + it.cantidad + ' × ' + nombreDePedido(it) +
             (it.variante ? ' (' + traducir('variantes', it.variante) + ')' : '') +
             ' — ' + dinero(it.cantidad * it.precio);
    }).join('\n');

    var texto = T.waTitulo + '\n\n' + lineas +
                '\n\n*' + T.total + ': ' + dinero(t.total) + ' MXN*\n\n' + T.waGracias;

    window.open('https://wa.me/' + MARCA.whatsapp + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
  }

  /* ============================================================= VELOS */

  function abrirVelo(velo) {
    velo.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function cerrarVelo(velo) {
    velo.classList.remove('visible');
    if (!$('.velo.visible')) document.body.style.overflow = '';
  }

  function activarVelos() {
    $$('.velo').forEach(function (velo) {
      velo.addEventListener('click', function (e) {
        if (e.target === velo) cerrarVelo(velo);
      });
      $$('[data-cerrar]', velo).forEach(function (b) {
        b.addEventListener('click', function () { cerrarVelo(velo); });
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var abierto = $('.velo.visible');
        if (abierto) cerrarVelo(abierto);
      }
    });
  }

  /* ============================================================== TEMA */

  function activarTema() {
    var guardado = null;
    try { guardado = localStorage.getItem(LLAVE_TEMA); } catch (e) {}
    var oscuro = guardado
      ? guardado === 'oscuro'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

    aplicarTema(oscuro);

    $('#btnTema').addEventListener('click', function () {
      aplicarTema(document.documentElement.dataset.tema !== 'oscuro');
    });
  }

  function aplicarTema(oscuro) {
    document.documentElement.dataset.tema = oscuro ? 'oscuro' : 'claro';
    try { localStorage.setItem(LLAVE_TEMA, oscuro ? 'oscuro' : 'claro'); } catch (e) {}
  }

  /* ============================================================= PIE */

  function rellenarMarca() {
    $$('[data-marca="web"]').forEach(function (n) {
      n.textContent = MARCA.web;
      n.href = 'https://' + MARCA.web.replace(/^www\./, 'www.');
    });
    $$('[data-marca="correo"]').forEach(function (n) {
      n.textContent = MARCA.correo;
      n.href = 'mailto:' + MARCA.correo;
    });
    $('[data-marca="social"]').textContent = MARCA.social;

    var suc = $('[data-marca="sucursales"]');
    suc.replaceChildren();
    MARCA.sucursales.forEach(function (s) { suc.appendChild(elem('p', null, s)); });

    var enMarca = (EN.marca || {});
    var aviso = (IDIOMA === 'en' && enMarca.aviso) || MARCA.aviso;
    var avisoComb = (IDIOMA === 'en' && enMarca.avisoCombinacion) || MARCA.avisoCombinacion;

    $$('[data-marca="aviso"]').forEach(function (n) { n.textContent = '“' + aviso + '”'; });
    $('[data-marca="avisoCombinacion"]').textContent = '*' + avisoComb + '*';
  }

  /* ================================================= TEXTOS DE LA PÁGINA */

  function aplicarTextos() {
    /* todo lo que lleva data-txt en el HTML */
    $$('[data-txt]').forEach(function (n) {
      var clave = n.dataset.txt;
      if (T[clave]) n.textContent = T[clave];
    });

    $('#campoBusqueda').placeholder = T.buscar;
    $('#limpiarBusqueda').setAttribute('aria-label', T.limpiarBusqueda);
    $('#btnTema').setAttribute('aria-label', T.cambiarTema);
    $('.barra-logo').setAttribute('aria-label', T.inicio);
    $$('[data-cerrar]').forEach(function (b) { b.setAttribute('aria-label', T.cerrar); });

    var botonIdioma = $('#btnIdioma');
    if (botonIdioma) {
      /* el botón muestra el idioma al que se va a cambiar */
      var otro = IDIOMA === 'es' ? 'en' : 'es';
      botonIdioma.textContent = IDIOMAS.ui[otro].idiomaCorto;
      botonIdioma.setAttribute('aria-label', T.cambiarIdioma);
    }

    var datos = $('#heroDatos');
    if (datos && T.resumen) {
      datos.replaceChildren();
      T.resumen.forEach(function (x) { datos.appendChild(elem('span', null, x)); });
    }

    var accion = $('#heroAccion');
    if (accion) accion.textContent = PEDIDOS ? T.accionPedido : T.accionConsulta;

    var avisoConsulta = $('.aviso-consulta');
    if (avisoConsulta) avisoConsulta.textContent = textoSinPedidos();

    document.title = MARCA.nombre + ' — ' + T.menu;
  }

  function textoSinPedidos() {
    return (IDIOMA === 'en' && (EN.config || {}).avisoSinPedidos) || CONFIG.avisoSinPedidos;
  }

  /* ============================== MODO CONSULTA (pedidos apagados) ----- */

  function aplicarModoConsulta() {
    document.body.classList.add('sin-pedidos');

    /* quitamos del DOM todo lo que sirve para pedir */
    ['#barraPedido', '#modalPedido'].forEach(function (sel) {
      var n = $(sel);
      if (n) n.remove();
    });
    var botonAgregar = $('#btnAgregarDetalle');
    var pieModal = botonAgregar && botonAgregar.closest('.hoja-pie');
    if (pieModal) pieModal.remove();

    var accion = $('#heroAccion');
    if (accion) accion.textContent = T.accionConsulta;

    var texto = textoSinPedidos();
    var hero = $('.hero');
    if (texto && hero) hero.appendChild(elem('p', 'aviso-consulta', texto));
  }

  /* =================================================== PORTADA DE IDIOMA */

  function mostrarPortada() {
    var portada = $('#portada');
    if (!portada) return;
    portada.classList.remove('oculto');
    document.body.style.overflow = 'hidden';

    $$('.portada-btn', portada).forEach(function (b) {
      b.addEventListener('click', function () {
        fijarIdioma(b.dataset.idioma);
        redibujar();
        portada.classList.add('cerrando');
        document.body.style.overflow = '';
        setTimeout(function () { portada.remove(); }, 360);
      });
    });
  }

  /* Vuelve a dibujar todo el menú en el idioma actual */
  function redibujar() {
    dibujarMenu();
    engancharNav();
    activarNavegacion();
    aplicarTextos();
    rellenarMarca();
    if (PEDIDOS) refrescarPedido();
  }

  /* enlaces del nav: desplazamiento con el offset correcto */
  function engancharNav() {
    $$('#navLista a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var destino = document.getElementById(a.getAttribute('href').slice(1));
        if (!destino) return;
        var margen = window.innerWidth >= 1080 ? 84 : 80;
        window.scrollTo({ top: destino.getBoundingClientRect().top + window.scrollY - margen, behavior: 'smooth' });
      });
    });
  }

  function activarPedido() {
    $('#btnAgregarDetalle').addEventListener('click', function () {
      var item = detalle.item;
      var variante = item.variantes ? item.variantes[detalle.variante].nombre : '';
      agregar(item, variante, precioDetalle(), detalle.cantidad);
      cerrarVelo($('#modalDetalle'));
    });

    $('#btnVerPedido').addEventListener('click', function () { abrirVelo($('#modalPedido')); });
    $('#btnWhatsapp').addEventListener('click', enviarWhatsapp);
    $('#btnVaciar').addEventListener('click', function () {
      pedido = {};
      refrescarPedido();
    });
  }

  /* ============================================================ ARRANQUE */

  var idiomaGuardado = leerIdiomaGuardado();
  fijarIdioma(idiomaGuardado || CONFIG.idiomaPorDefecto || 'es');

  dibujarMenu();
  engancharNav();
  rellenarMarca();
  activarNavegacion();
  activarBuscador();
  activarVelos();
  activarTema();
  aplicarTextos();

  if (PEDIDOS) {
    cargarPedido();     // el pedido guardado sigue ahí si se vuelven a prender
    refrescarPedido();
    activarPedido();
  } else {
    aplicarModoConsulta();
  }

  /* botón ES / EN de la barra */
  $('#btnIdioma').addEventListener('click', function () {
    fijarIdioma(IDIOMA === 'es' ? 'en' : 'es');
    redibujar();
  });

  /* La portada sólo sale si aún no se ha elegido idioma en este aparato */
  if (CONFIG.preguntarIdioma !== false && !idiomaGuardado) {
    mostrarPortada();
  } else {
    var portada = $('#portada');
    if (portada) portada.remove();
  }

})();
