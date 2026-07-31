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
  var RUTA_IMG = 'assets/img/platillos/';
  var LLAVE_PEDIDO  = 'molletero:pedido';
  var LLAVE_TEMA    = 'molletero:tema';
  var LLAVE_PEDIDOS = 'molletero:pedidos';

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

  var NOMBRE_TAG = { veg: 'Vegetariano', picante: 'Picante' };

  /* ==================================================== DIBUJAR EL MENÚ */

  var indice = [];   // todos los items, para el buscador y el modal de detalle

  function dibujarMenu() {
    var contenedor = $('#secciones');
    var navLista   = $('#navLista');

    MENU.categorias.forEach(function (cat) {
      /* --- entrada en la navegación --- */
      var li = elem('li');
      var a  = elem('a', null, cat.nav || cat.titulo);
      a.href = '#' + cat.id;
      li.appendChild(a);
      navLista.appendChild(li);

      /* --- sección --- */
      var sec = elem('section', 'seccion');
      sec.id = cat.id;

      var cab = elem('div', 'seccion-cab');
      cab.appendChild(elem('h2', null, cat.titulo));
      if (cat.nota) cab.appendChild(elem('p', 'nota', cat.nota));
      cab.appendChild(elem('div', 'filete'));
      sec.appendChild(cab);

      cat.grupos.forEach(function (grupo) {
        if (grupo.titulo) {
          var gt = elem('div', 'grupo-titulo');
          gt.appendChild(elem('span', null, grupo.titulo));
          sec.appendChild(gt);
        }
        var rejilla = elem('div', 'rejilla');
        grupo.items.forEach(function (item) {
          item._id = indice.length;
          item._cat = cat.titulo;
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
    art.dataset.id = item._id;
    art.dataset.buscar = normalizar(item.nombre + ' ' + (item.desc || '') + ' ' + item._cat);

    /* foto o monograma */
    var foto = elem('div', 'ficha-foto');
    if (item.img) {
      var img = new Image();
      img.src = RUTA_IMG + item.img + '.webp';
      img.alt = item.nombre;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = function () { foto.replaceChildren(monograma(item.nombre)); };
      foto.appendChild(img);
    } else {
      foto.classList.add('sin-foto');
      foto.appendChild(monograma(item.nombre));
    }
    art.appendChild(foto);

    /* cuerpo */
    var cuerpo = elem('div', 'ficha-cuerpo');

    var linea = elem('div', 'ficha-linea');
    linea.appendChild(elem('h3', null, item.nombre));
    linea.appendChild(elem('div', 'puntos'));
    var precio = elem('div', 'precio');
    if (item.variantes) {
      precio.appendChild(elem('small', null, 'desde '));
      precio.appendChild(document.createTextNode(dinero(precioBase(item))));
    } else {
      precio.textContent = dinero(precioBase(item));
    }
    linea.appendChild(precio);
    cuerpo.appendChild(linea);

    if (item.desc) cuerpo.appendChild(elem('p', 'ficha-desc', item.desc));

    if (item.tags && item.tags.length) {
      var tags = elem('div', 'etiquetas');
      item.tags.forEach(function (t) {
        tags.appendChild(elem('span', 'etiqueta ' + t, NOMBRE_TAG[t] || t));
      });
      cuerpo.appendChild(tags);
    }

    if (PEDIDOS) {
      var pie = elem('div', 'ficha-pie');
      var btn = elem('button', 'btn-agregar', item.variantes ? 'Elegir' : 'Agregar');
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
    caja.appendChild(elem('h3', null, extras.titulo));
    var cols = elem('div', 'extras-cols');
    extras.columnas.forEach(function (col) {
      var c = elem('div', 'extras-col');
      var h = elem('h4');
      h.appendChild(document.createTextNode(col.titulo + ' '));
      if (col.precio) h.appendChild(elem('b', null, dinero(col.precio)));
      c.appendChild(h);
      var ul = elem('ul');
      col.lista.forEach(function (x) { ul.appendChild(elem('li', null, x)); });
      c.appendChild(ul);
      cols.appendChild(c);
    });
    caja.appendChild(cols);
    return caja;
  }

  /* ================================================= NAVEGACIÓN ACTIVA */

  function activarNavegacion() {
    var enlaces = $$('#navLista a');
    var mapa = {};
    enlaces.forEach(function (a) { mapa[a.getAttribute('href').slice(1)] = a; });

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

    $('#tituloDetalle').textContent = item._cat;

    var foto = elem('div', 'detalle-foto');
    if (item.img) {
      var img = new Image();
      img.src = RUTA_IMG + item.img + '.webp';
      img.alt = item.nombre;
      img.onerror = function () { foto.replaceChildren(monograma(item.nombre)); };
      foto.appendChild(img);
    } else {
      foto.appendChild(monograma(item.nombre));
    }
    cuerpo.appendChild(foto);

    cuerpo.appendChild(elem('h3', 'detalle-nombre', item.nombre));
    if (item.desc) cuerpo.appendChild(elem('p', 'detalle-desc', item.desc));

    if (item.tags && item.tags.length) {
      var tags = elem('div', 'etiquetas');
      tags.style.marginBottom = '18px';
      item.tags.forEach(function (t) {
        tags.appendChild(elem('span', 'etiqueta ' + t, NOMBRE_TAG[t] || t));
      });
      cuerpo.appendChild(tags);
    }

    /* Sin pedidos: sólo se informa el precio, no hay nada que elegir */
    if (!PEDIDOS) {
      var precios = elem('div', 'variantes solo-lectura');
      if (item.variantes) {
        item.variantes.forEach(function (v) {
          var p = elem('span', 'variante');
          p.appendChild(document.createTextNode(v.nombre));
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
        b.appendChild(document.createTextNode(v.nombre));
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
      'Agregar · ' + dinero(precioDetalle() * detalle.cantidad);
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

  function agregar(nombre, variante, precio, cantidad) {
    var clave = nombre + '||' + (variante || '');
    if (!pedido[clave]) pedido[clave] = { nombre: nombre, variante: variante || '', precio: precio, cantidad: 0 };
    pedido[clave].precio = precio;
    pedido[clave].cantidad += cantidad;
    refrescarPedido();
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
    $('#palabraPiezas').textContent = t.piezas === 1 ? 'producto' : 'productos';
    $('#totalBarra').textContent = dinero(t.total);
    var mostrar = PEDIDOS && t.piezas > 0;
    $('#barraPedido').classList.toggle('visible', mostrar);
    // con pedido activo el contenido necesita más aire abajo (móvil)
    document.body.classList.toggle('con-pedido', mostrar);

    var lista = $('#listaPedido');
    lista.replaceChildren();

    var claves = Object.keys(pedido);
    if (!claves.length) {
      lista.appendChild(elem('p', 'vacio', 'Tu pedido está vacío. Toca un platillo para agregarlo.'));
    }

    claves.forEach(function (clave) {
      var it = pedido[clave];
      var fila = elem('div', 'renglon');

      var nombre = elem('div', 'renglon-nombre', it.nombre);
      if (it.variante) nombre.appendChild(elem('small', null, it.variante));
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
      return '• ' + it.cantidad + ' × ' + it.nombre +
             (it.variante ? ' (' + it.variante + ')' : '') +
             ' — ' + dinero(it.cantidad * it.precio);
    }).join('\n');

    var texto = '*Pedido — El Molletero*\n\n' + lineas +
                '\n\n*Total: ' + dinero(t.total) + ' MXN*\n\n¡Gracias!';

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
    MARCA.sucursales.forEach(function (s) { suc.appendChild(elem('p', null, s)); });

    $$('[data-marca="aviso"]').forEach(function (n) { n.textContent = '“' + MARCA.aviso + '”' ; });
    $('[data-marca="avisoCombinacion"]').textContent = '*' + MARCA.avisoCombinacion + '*';
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
    if (accion) accion.textContent = 'Toca cualquier platillo para verlo en grande.';

    var texto = CONFIG.avisoSinPedidos;
    var hero = $('.hero');
    if (texto && hero) hero.appendChild(elem('p', 'aviso-consulta', texto));
  }

  /* ============================================================ ARRANQUE */

  dibujarMenu();
  rellenarMarca();
  activarNavegacion();
  activarBuscador();
  activarVelos();
  activarTema();

  if (PEDIDOS) {
    cargarPedido();     // el pedido guardado sigue ahí si se vuelven a prender
    refrescarPedido();
    activarPedido();
  } else {
    aplicarModoConsulta();
  }

  function activarPedido() {
    $('#btnAgregarDetalle').addEventListener('click', function () {
      var item = detalle.item;
      var variante = item.variantes ? item.variantes[detalle.variante].nombre : '';
      agregar(item.nombre, variante, precioDetalle(), detalle.cantidad);
      cerrarVelo($('#modalDetalle'));
    });

    $('#btnVerPedido').addEventListener('click', function () { abrirVelo($('#modalPedido')); });
    $('#btnWhatsapp').addEventListener('click', enviarWhatsapp);
    $('#btnVaciar').addEventListener('click', function () {
      pedido = {};
      refrescarPedido();
    });
  }

  /* enlaces del nav: desplazamiento con el offset correcto */
  $$('#navLista a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var destino = document.getElementById(a.getAttribute('href').slice(1));
      if (!destino) return;
      var margen = window.innerWidth >= 1080 ? 84 : 80;
      window.scrollTo({ top: destino.getBoundingClientRect().top + window.scrollY - margen, behavior: 'smooth' });
    });
  });

})();
