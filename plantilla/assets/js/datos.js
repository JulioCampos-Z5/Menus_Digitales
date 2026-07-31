/* =====================================================================
   MI MENÚ CARTA — Plantilla / Datos del menú
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar para cambiar el negocio,
   los precios, las descripciones y las fotos. No se toca ni el HTML ni
   el CSS ni el JS.

   Los textos en inglés van aparte, en assets/js/idiomas.js.

   Estructura de un platillo:
     {
       nombre: 'Tradicional',
       precio: 59,                       // número, sin el signo $
       desc:   'Base de frijoles...',    // opcional
       img:    'tradicional',            // archivo en assets/img/platillos/
                                         // SIN la extensión .webp
       tags:   ['veg', 'picante'],       // opcional
       variantes: [                      // opcional: sustituye a "precio"
         { nombre: 'Chico (350 ml)', precio: 45 },
         { nombre: 'Grande (500 ml)', precio: 55 }
       ]
     }

   Los platillos sin foto se dibujan con un monograma en rombo, así que
   se puede publicar el menú completo antes de tener las fotografías.
   ===================================================================== */

window.MENU = {

  /* ------------------------------------------------------- CONFIGURACIÓN */
  config: {
    // true  → los clientes pueden armar su pedido y mandarlo por WhatsApp.
    // false → el menú queda de sólo consulta: se ocultan los botones de
    //         "Agregar", la barra del pedido y el envío por WhatsApp.
    //
    // También se puede prender y apagar sin tocar este archivo, abriendo:
    //   index.html?pedidos=off   → apaga los pedidos y lo recuerda
    //   index.html?pedidos=on    → los vuelve a prender
    //   index.html?pedidos=auto  → olvida lo anterior y obedece a este archivo
    pedidos: true,

    // Aviso que se muestra cuando los pedidos están apagados (déjalo vacío
    // con '' si prefieres que no aparezca ninguno).
    avisoSinPedidos: 'Menú de consulta. Para ordenar, pídelo con tu mesero.',

    // --- Idioma ---------------------------------------------------------
    // El inglés vive en assets/js/idiomas.js; aquí sólo se configura.
    // true  → al abrir sale la portada preguntando Español / English.
    // false → entra directo en el idioma de abajo (se puede cambiar igual
    //         con el botón ES/EN de la barra de arriba).
    preguntarIdioma: true,
    idiomaPorDefecto: 'es',         // 'es' o 'en'

    // ⚠️ CAMBIAR: nombre con el que se guardan el pedido, el idioma y el
    // tema en el navegador del cliente. Ponle el del negocio: si publicas
    // varios menús en el mismo dominio, así no se mezclan entre ellos.
    almacen: 'tunegocio'
  },

  /* --------------------------------------------------------------- MARCA */
  marca: {
    nombre: 'Nombre del negocio',
    lema: 'giro o especialidad',
    desde: 'Est. 2020',
    web: 'www.tunegocio.com',
    correo: 'contacto@tunegocio.com',
    social: 'Tu negocio en redes',
    // ⚠️ WhatsApp del negocio: 52 = México, sin espacios ni signos
    whatsapp: '523300000000',
    sucursales: [
      'Calle y número, Colonia, Ciudad, Estado.'
    ],
    aviso: 'Todos nuestros alimentos son preparados al momento, agradecemos tu paciencia.',
    avisoCombinacion: 'Los precios incluyen IVA.'
  },

  /* ---------------------------------------------------------- CATEGORÍAS */
  categorias: [

    {
      // El id es el ancla de la navegación: sin espacios ni acentos.
      id: 'entradas',
      nav: 'Entradas',              // texto del botón de navegación
      titulo: 'Entradas',           // título grande de la sección
      nota: 'Para empezar y compartir.',
      grupos: [
        {
          // Un grupo sin "titulo" no dibuja separador. Útil cuando la
          // sección no necesita subdivisiones.
          items: [
            { nombre: 'Guacamole de la casa', precio: 95, tags: ['veg'],
              desc: 'Aguacate, jitomate, cebolla y cilantro, con totopos recién hechos.' },
            { nombre: 'Queso fundido', precio: 110,
              desc: 'Queso derretido con chorizo, servido con tortillas de harina.' },
            { nombre: 'Sopa del día', precio: 75,
              desc: 'Pregunta a tu mesero la preparación de hoy.' }
          ]
        }
      ]
    },

    {
      id: 'fuertes',
      nav: 'Platos fuertes',
      titulo: 'Platos fuertes',
      nota: 'Todos se sirven con guarnición a elegir.',
      grupos: [
        {
          titulo: 'De la parrilla',
          items: [
            { nombre: 'Arrachera', precio: 240,
              desc: 'Corte a la parrilla con cebollitas y frijoles charros.' },
            { nombre: 'Pollo al carbón', precio: 175,
              desc: 'Media pieza marinada en cítricos y especias.' }
          ]
        },
        {
          titulo: 'Del mar',
          items: [
            { nombre: 'Pescado a la plancha', precio: 210, tags: ['picante'],
              desc: 'Filete con salsa de chile de árbol y arroz blanco.' },
            { nombre: 'Camarones al ajillo', precio: 235,
              desc: 'Salteados con ajo y guajillo.' }
          ]
        }
      ],
      // Bloque opcional de ingredientes o servicios extra
      extras: {
        titulo: 'Guarniciones extra',
        columnas: [
          { titulo: 'Guarnición', precio: 45,
            lista: ['Papas a la francesa', 'Arroz', 'Ensalada', 'Verduras al vapor'] }
        ]
      }
    },

    {
      id: 'bebidas',
      nav: 'Bebidas',
      titulo: 'Bebidas',
      grupos: [
        {
          items: [
            {
              // Ejemplo de producto con tamaños: se omite "precio" y se
              // usan "variantes"; en la ficha se muestra "desde $X".
              nombre: 'Agua fresca del día',
              variantes: [
                { nombre: 'Vaso (400 ml)', precio: 45 },
                { nombre: 'Jarra (1 L)', precio: 85 }
              ]
            },
            { nombre: 'Refresco', precio: 45 },
            { nombre: 'Café americano', precio: 40 }
          ]
        }
      ]
    }

  ]
};
