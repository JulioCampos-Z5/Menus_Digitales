/* =====================================================================
   EL MOLLETERO DE GUADALAJARA — Datos del menú
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar para cambiar precios,
   descripciones, platillos o fotos. No se toca ni el HTML ni el JS.

   Estructura de un platillo:
     {
       nombre: 'Tradicional',
       precio: 59,                       // número, sin el signo $
       desc:   'Base de frijoles...',    // opcional
       img:    'tradicional',            // nombre del archivo en
                                         // assets/img/platillos/ SIN .webp
       tags:   ['veg', 'picante'],       // opcional
       variantes: [                      // opcional: sustituye a "precio"
         { nombre: 'Chico (350 ml)', precio: 45 },
         { nombre: 'Grande (500 ml)', precio: 55 }
       ]
     }
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
    pedidos: false,

    // Aviso que se muestra cuando los pedidos están apagados (déjalo vacío
    // con '' si prefieres que no aparezca ninguno).
    avisoSinPedidos: 'Menú de consulta. Para ordenar, pídelo con tu mesero.'
  },

  marca: {
    nombre: 'El Molletero',
    lema: 'de Guadalajara',
    desde: 'Est. 2016',
    web: 'www.elmolletero.com',
    correo: 'contacto@elmolletero.com',
    social: 'El molletero de guadalajara',
    // ⚠️ CAMBIAR por el WhatsApp real del negocio (52 = México, sin espacios)
    whatsapp: '523300000000',
    sucursales: [
      'Av. La Paz 2121-C, Col. Americana, Guadalajara, Jalisco.',
      'Av. Guadalupe 4688, Col. Camino Real, Zapopan, Jalisco.'
    ],
    aviso: 'Todos nuestros alimentos son preparados al momento, agradecemos tu paciencia.',
    avisoCombinacion: 'En combinaciones de dos o más ingredientes en tu mollete, se cobrará el de mayor precio.'
  },

  categorias: [

    /* ---------------------------------------------------------- SALADOS */
    {
      id: 'salados',
      nav: 'Salados',
      titulo: 'Molletes salados',
      nota: 'Hechos con birote fleyman tradicional de masa madre. Todos gratinados con queso especial de la casa. La presentación es de una pieza, tamaño aproximado 18 cm (puede variar por ser un pan artesanal).',
      grupos: [
        {
          titulo: 'Opciones sin carne',
          items: [
            { nombre: 'Tradicional', precio: 59, img: 'tradicional', desc: 'Base de frijoles fritos gratinados con queso de la casa.' },
            { nombre: 'Chilaquiles', precio: 59, img: 'chilaquiles', desc: 'Base de frijoles fritos con chilaquiles en salsa picante roja, verde o divorciados.' },
            { nombre: 'Hawaiano', precio: 59, img: 'hawaiano', desc: 'Base de mantequilla, jamón con trozos de piña en almíbar.' },
            { nombre: 'Rajas', precio: 59, img: 'rajas', tags: ['veg'], desc: 'Base de mantequilla, rajas poblanas con crema, champiñones y elote.' },
            { nombre: 'Vegetariano', precio: 59, img: 'vegetariano', tags: ['veg'], desc: 'Base de mantequilla al ajo, champiñón y espinacas.' },
            { nombre: 'Higos', precio: 59, img: 'higos', tags: ['veg'], desc: 'Base de requesón con trozos de higo y un toque de nuez y miel de abeja.' },
            { nombre: 'Peperoni', precio: 75, img: 'peperoni', desc: 'Base de mantequilla con salsa estilo pomodoro, con peperoni.' }
          ]
        },
        {
          titulo: 'Opciones con carne',
          items: [
            { nombre: 'Ranchero', precio: 75, img: 'ranchero', desc: 'Base de frijoles fritos con chorizo.' },
            { nombre: 'Pastor', precio: 75, img: 'pastor', desc: 'Base de frijoles fritos con carne al pastor guisado con piña, acompañado con limón, cilantro y cebolla.' },
            { nombre: 'Carne en su jugo', precio: 75, img: 'carne-en-su-jugo', desc: 'Base de frijoles fritos, carne de res en su jugo con frijoles de la olla y tocino, servida con consomé, cilantro y cebolla.' },
            { nombre: 'Pierna', precio: 75, img: 'pierna', desc: 'Base de frijoles fritos con pierna deshebrada guisada en adobo especial de la casa.' },
            { nombre: 'Americano', precio: 75, img: 'americano', desc: 'Base de frijoles fritos con tocino y huevo estrellado.' },
            { nombre: 'Ahogado', precio: 75, img: 'ahogado', desc: 'Base de frijoles fritos con carnitas bañados en salsa de jitomate de la casa.' }
          ]
        },
        {
          titulo: 'Especiales',
          items: [
            { nombre: 'Bañado', precio: 79, img: 'banado', desc: 'Base de frijoles fritos con pierna deshebrada, bañado en salsa cremosa de chile chipotle y un toque de aderezo de mostaza.' },
            { nombre: 'Benedictino', precio: 79, img: 'benedictino', desc: 'Base de mantequilla con jamón, huevo escalfado bañado en salsa holandesa.' },
            { nombre: 'Mexicano', precio: 79, img: 'mexicano', tags: ['picante'], desc: 'Base de frijoles fritos con carne de res preparada con jitomate, cebolla y chile serrano.' },
            { nombre: 'Pancita', precio: 89, img: 'pancita', desc: 'Base de frijoles fritos con pancita de cerdo al estilo carnitas, guisadas en adobo especial de la casa.' },
            { nombre: 'Arrachera', precio: 89, img: 'arrachera', desc: 'Base de frijoles fritos con arrachera a la plancha, acompañados de rebanadas de aguacate.' },
            { nombre: 'Gobernador', precio: 89, img: 'gobernador', tags: ['picante'], desc: 'Base de mantequilla y camarón, guisado con pimiento morrón y salsa picante estilo gobernador.' },
            { nombre: 'Español', precio: 89, img: 'espanol', desc: 'Base de mantequilla, jamón serrano, jitomate cherry, arúgula y aceitunas.' },
            { nombre: 'Milanesa de pollo', precio: 89, img: 'milanesa-pollo', desc: 'Base de frijoles fritos con milanesa de pollo empanizado.' },
            { nombre: 'Barbacoa', precio: 89, img: 'barbacoa', desc: 'Base de frijoles fritos con carne de res en salsa de barbacoa, preparada con una mezcla de chiles y especias, acompañado de consomé, cilantro, cebolla y limón.' }
          ]
        }
      ],
      extras: {
        titulo: 'Ingredientes extra salados',
        columnas: [
          { titulo: 'Ingrediente extra', precio: 20, lista: ['Aguacate', '1 huevo', 'Jamón', 'Champiñones', 'Espinacas', 'Queso de la casa', 'Queso panela', 'Tocino'] },
          { titulo: 'Ingrediente extra con guiso', precio: 30, lista: ['Chorizo', 'Pierna', 'Pastor', 'Chilaquiles', 'Pollo a la plancha', 'Rajas'] },
          { titulo: 'Ingrediente extra especial', precio: 40, lista: ['Arrachera', 'Pancita', 'Benedictino', 'Mexicano', 'Camarón', 'Milanesa de pollo'] }
        ]
      }
    },

    /* ----------------------------------------------------------- DULCES */
    {
      id: 'dulces',
      nav: 'Dulces',
      titulo: 'Molletes dulces',
      nota: 'Hechos con birote fleyman tradicional de masa madre, base de mantequilla con azúcar y trocitos de canela. La presentación es de una pieza, tamaño aproximado 18 cm (puede variar por ser un pan artesanal).',
      grupos: [
        {
          titulo: 'Clásicos',
          items: [
            { nombre: 'Básico', precio: 50, img: 'basico', desc: 'Base de mantequilla con azúcar y trocitos de canela.' },
            { nombre: 'Lechera', precio: 55, img: 'lechera', desc: 'Bañado de lechera, fresa y trocitos de nuez.' },
            { nombre: 'Natas', precio: 55, img: 'natas', desc: 'Nata de leche con trozos de fresa.' },
            { nombre: 'Mermelada', precio: 55, img: 'mermelada', desc: 'Mermelada artesanal de fresa o de frutos rojos hecha en casa.' },
            { nombre: 'Cajeta', precio: 55, img: 'cajeta', desc: 'Cajeta de leche con trozos de plátano y nuez.' },
            { nombre: 'Manzana canela', precio: 55, img: 'manzana-canela', desc: 'Manzanas salteadas con piloncillo y canela.' },
            { nombre: 'Guayabate', precio: 55, img: 'guayabate', desc: 'Base de nata con trozos de guayaba cocida en almíbar con canela.' }
          ]
        },
        {
          titulo: 'Especiales',
          items: [
            { nombre: 'Philadelphia mermelada', precio: 70, img: 'philadelphia-mermelada', desc: 'Betún especial de Philadelphia con mermelada artesanal hecha en casa, de frutos rojos o de fresa.' },
            { nombre: 'Frutos rojos', precio: 70, img: 'frutos-rojos', desc: 'Base de nata de leche con frutos rojos cubiertos de lechera.' },
            { nombre: 'Nutella', precio: 70, img: 'nutella', desc: 'Cubierta de Nutella con trozos de plátano o fresa.' },
            { nombre: 'Banana', precio: 70, img: 'banana', desc: 'Base de nata de leche con trozos de plátano macho frito, cubierto de lechera.' },
            { nombre: 'Tropical', precio: 70, img: 'tropical', desc: 'Base de nata de leche con trozos de mango, durazno, kiwi y fresa, cubierto de lechera.' },
            { nombre: 'Natas + mermelada', precio: 70, img: 'natas-mermelada', desc: 'Nata de leche con mermelada artesanal de fresa hecha en casa.' },
            { nombre: 'Pay de limón', precio: 70, desc: 'Base cremosa hecha con una mezcla de leches, un toque de limón y galletas Marías.' }
          ]
        }
      ],
      extras: {
        titulo: 'Ingredientes extra dulces',
        columnas: [
          { titulo: 'Ingrediente extra clásico', precio: 15, lista: ['Lechera', 'Natas', 'Philadelphia', 'Cajeta', 'Guayabate', 'Nuez'] },
          { titulo: 'Ingrediente extra especial', precio: 30, lista: ['Mermelada', 'Frutos rojos', 'Nutella', 'Plátano o fresa', 'Tropical', 'Plátano macho frito', 'Manzana canela'] }
        ]
      }
    },

    /* ---------------------------------------------------------- DOCENAS */
    {
      id: 'docenas',
      nav: 'Docenas',
      titulo: 'Docenas',
      nota: 'Para llevar y compartir. Se arman con los molletes de la sección correspondiente.',
      grupos: [
        {
          titulo: 'Docena',
          items: [
            { nombre: 'Salados sin carne', precio: 670, img: 'docena' },
            { nombre: 'Salados con carne', precio: 820 },
            { nombre: 'Dulces clásicos', precio: 580 }
          ]
        },
        {
          titulo: 'Media docena',
          items: [
            { nombre: 'Salados sin carne', precio: 320 },
            { nombre: 'Salados con carne', precio: 405 },
            { nombre: 'Dulces', precio: 285 }
          ]
        }
      ]
    },

    /* ----------------------------------------------------------- HUEVOS */
    {
      id: 'huevos',
      nav: 'Huevos',
      titulo: 'Huevos',
      nota: 'Platillos preparados al momento.',
      grupos: [
        {
          items: [
            { nombre: 'Huevos al gusto', precio: 105, img: 'huevos-al-gusto', desc: 'Revueltos o estrellados con 1 ingrediente (jamón, tocino, chorizo o a la mexicana), acompañados con frijoles fritos o mollete tradicional.' },
            { nombre: 'Huevos vegetarianos', precio: 115, img: 'huevos-vegetarianos', tags: ['veg'], desc: 'Revueltos con ejote, espinacas y champiñones, acompañados de frijoles fritos, mollete tradicional o ensalada.' },
            { nombre: 'Huevos motuleños', precio: 149, img: 'huevos-motulenos', tags: ['picante'], desc: 'Dos huevos estrellados montados sobre una tortilla dorada, una cama de frijol, jamón, chícharo y plátano macho, bañados en salsa muy picante de la casa.' },
            { nombre: 'Huevos rancheros', precio: 130, img: 'huevos-rancheros', tags: ['picante'], desc: 'Dos huevos estrellados montados sobre tortilla dorada, bañados en salsa picante ranchera, jitomate, cebolla y chile serrano, guisados en salsa de la casa picante roja, verde o divorciado.' },
            { nombre: 'Huevos benedictinos', precio: 149, desc: 'Dos huevos ponchados montados en birote fleyman de la casa, sobre una cama de jamón, bañados en salsa holandesa, acompañados de frijoles fritos o ensalada de la casa.' },
            { nombre: 'Huevos pochados', precio: 149, img: 'huevos-pochados', desc: 'Servidos sobre birote fleyman tostado de la casa, con tocino y crema de espárragos, acompañados de frijoles fritos o ensalada de la casa.' },
            { nombre: 'Huevos montados', precio: 149, desc: 'Bistec a la plancha con huevos estrellados o revueltos, bañados en salsa picante roja o verde, acompañados de frijoles fritos o mollete tradicional.' },
            { nombre: 'Huevos al albañil', precio: 105, desc: 'Huevos revueltos ahogados en salsa de la casa (roja picante o verde), acompañado de mollete tradicional o frijoles fritos.' }
          ]
        }
      ]
    },

    /* ------------------------------------------------------ CHILAQUILES */
    {
      id: 'chilaquiles',
      nav: 'Chilaquiles',
      titulo: 'Chilaquiles',
      grupos: [
        {
          items: [
            { nombre: 'Chilaquiles chipotle', precio: 125, img: 'chilaquiles-chipotle', desc: 'En salsa picante de chile chipotle con crema, cebolla morada y queso cotija, acompañados con frijoles fritos o mollete tradicional.' },
            { nombre: 'Chilaquiles de la casa', precio: 115, img: 'chilaquiles-casa', tags: ['picante'], desc: 'En salsa picante roja, verde o divorciados, con crema, cebolla morada y queso cotija, acompañados con frijoles fritos o mollete tradicional.' },
            { nombre: 'Chilaquiles poblanos', precio: 125, desc: 'Salsa cremosa de chile poblano con crema, cebolla morada y queso cotija, acompañados con frijoles fritos o mollete tradicional.' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------- OMELETS */
    {
      id: 'omelets',
      nav: 'Omelets',
      titulo: 'Omelets',
      grupos: [
        {
          items: [
            { nombre: 'Omelet poblano', precio: 125, img: 'omelet-poblano', desc: 'Relleno de espinacas, champiñones y queso, bañado en salsa poblana, decorado con una rebanada de panela a la plancha, acompañado de mollete tradicional o frijoles fritos.' },
            { nombre: 'Omelet sencillo', precio: 125, img: 'omelet-sencillo', desc: '2 huevos rellenos con queso de la casa y 1 ingrediente a elegir: jamón, tocino, espinacas o champiñones. Acompañados con frijoles fritos o mollete tradicional.' },
            { nombre: 'Omelet molletero', precio: 135, desc: '2 huevos rellenos de tocino, jamón y espinacas con queso de la casa, decorado con una rebanada de panela a la plancha, acompañado de mollete tradicional o frijoles fritos.' },
            { nombre: 'Omelet vegetariano', precio: 135, tags: ['veg'], desc: 'Relleno de espinacas, ejotes, champiñones y queso, decorado con una rebanada de panela, acompañado de mollete tradicional o frijoles fritos.' },
            { nombre: 'Omelet primavera', precio: 135, desc: 'Montado en una cama de chilaquiles verdes, relleno de calabacitas y queso, bañado en salsa roja de la casa, decorado con una rebanada de panela a la plancha, acompañado de mollete tradicional o frijoles fritos.' },
            { nombre: 'Omelet de chilaquiles', precio: 135, desc: 'Relleno de chilaquiles rojos o verdes y queso especial, decorado con una rebanada de panela a la plancha, acompañado de mollete tradicional o frijoles fritos.' }
          ]
        }
      ]
    },

    /* --------------------------------------- PANELA · WRAPS · ENFRIJOLADAS */
    {
      id: 'wraps',
      nav: 'Panela y wraps',
      titulo: 'Panela · Wraps · Enfrijoladas',
      grupos: [
        {
          items: [
            { nombre: 'Panela asada', precio: 155, img: 'panela-asada', tags: ['picante'], desc: 'Acompañada de tocino y espárragos asados, bañados en salsa picante de la casa roja o verde.' },
            { nombre: 'Panela con huevo', precio: 155, tags: ['picante'], desc: 'Claras o huevos estrellados con espinaca sobre panela asada, salsa roja picante de la casa y espárragos asados.' },
            { nombre: 'Wrap arrachera', precio: 155, img: 'wrap-arrachera', desc: 'Tortilla de harina con una cama de frijoles fritos, rellena de arrachera, cebolla a la plancha y queso de la casa. Se sirve con guarniciones de aguacate y jitomate fresco, acompañado de frijoles fritos y salsa martajada.' },
            { nombre: 'Wrap molletero', precio: 145, desc: 'Tortilla de harina rellena de huevo revuelto con chorizo, cebolla a la plancha, espinacas y queso de la casa. Se sirve con guarniciones de aguacate y jitomate fresco, acompañado de frijoles fritos y salsa martajada.' },
            { nombre: 'Enfrijoladas', precio: 125, img: 'enfrijoladas', desc: 'Tres tortillas de maíz rellenas de panela fresca, bañadas en salsa de frijol, aguacate, crema, queso cotija y cebolla morada.' }
          ]
        }
      ],
      extras: {
        titulo: 'Ingredientes extra platillos',
        columnas: [
          { titulo: 'Ingrediente extra', precio: 20, lista: ['Aguacate', '1 huevo', 'Jamón', 'Champiñones', 'Espinacas', 'Queso de la casa', 'Queso panela'] },
          { titulo: 'Ingrediente extra', precio: 35, lista: ['Pollo a la plancha', 'Pierna', 'Chorizo', 'Bistec', 'Chilaquiles', 'Tocino'] },
          { titulo: 'Ingrediente especial', precio: 45, lista: ['Arrachera', 'Pancita'] }
        ]
      }
    },

    /* ---------------------------------------------------------- POSTRES */
    {
      id: 'postres',
      nav: 'Postres',
      titulo: 'Platillos de postre',
      grupos: [
        {
          items: [
            { nombre: 'Torrejas', precio: 120, img: 'torrejas', desc: 'Birote fleyman de la casa al estilo francés, bañado con miel natural o maple, con un toque de fruta de temporada.' },
            { nombre: 'Pancakes moras (3 pzas)', precio: 125, img: 'pancakes-moras', desc: 'Hot cakes caseros rellenos de moras, betún artesanal de Philadelphia y mermelada artesanal de frutos rojos hecha en casa.' },
            { nombre: 'Pancakes americano (3 pzas)', precio: 120, desc: 'Hot cakes caseros naturales bañados en miel maple, acompañados de tocino y huevo natural al gusto.' },
            { nombre: 'Avena pancakes (3 pzas)', precio: 115, desc: 'Hot cakes caseros hechos de avena con plátano, decorados con fruta de temporada.' },
            { nombre: 'Pancakes cinnamon (3 pzas)', precio: 125, desc: 'Hot cakes caseros rellenos de azúcar mascabado y canela, bañados de un glaseado especial con trozos de nuez y frutos rojos.' }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------ LIGHT */
    {
      id: 'light',
      nav: 'Light',
      titulo: 'Light',
      grupos: [
        {
          items: [
            { nombre: 'Parfait', precio: 85, tags: ['veg'], desc: 'Mason de fruta de temporada, acompañado de pudín artesanal de chía y galleta molida.' },
            { nombre: 'Bowl de fruta', precio: 85, tags: ['veg'], desc: 'Fruta de temporada acompañada de yogurt natural artesanal.' },
            { nombre: 'Single bowl', precio: 70, tags: ['veg'], desc: 'Bowl pequeño con una sola fruta a elegir.' }
          ]
        }
      ]
    },

    /* --------------------------------------------------------- INFANTIL */
    {
      id: 'infantil',
      nav: 'Infantil',
      titulo: 'Menú infantil',
      grupos: [
        {
          items: [
            { nombre: 'Pancakes kids', precio: 70, img: 'pancakes-kids', desc: 'Dos hotcakes sencillos con trocito de fruta y miel.' },
            { nombre: 'Huevitos kids', precio: 70, desc: 'Dos huevitos revueltos o estrellados con un ingrediente a elegir (jamón, tocino, jitomate, cebolla), acompañado de frijolitos fritos.' }
          ]
        }
      ]
    },

    /* -------------------------------------------------------------- CAFÉ */
    {
      id: 'cafe',
      nav: 'Barra de café',
      titulo: 'Barra de café',
      nota: 'Todas nuestras bebidas son preparadas al momento con ingredientes 100% naturales.',
      grupos: [
        {
          items: [
            {
              nombre: 'Café americano', img: 'barra-cafe', desc: 'Incluye 1 refil.',
              variantes: [{ nombre: 'Chico (350 ml)', precio: 45 }, { nombre: 'Grande (500 ml)', precio: 55 }]
            },
            {
              nombre: 'Café de olla',
              variantes: [{ nombre: 'Chico (350 ml)', precio: 50 }, { nombre: 'Grande (500 ml)', precio: 60 }]
            },
            { nombre: 'Expresso', precio: 45 },
            { nombre: 'Expresso americano', precio: 55 },
            { nombre: 'Expresso cortado', precio: 55 },
            {
              nombre: 'Capuccino',
              variantes: [{ nombre: 'Chico (350 ml)', precio: 50 }, { nombre: 'Grande (500 ml)', precio: 70 }]
            },
            {
              nombre: 'Chocolate artesanal',
              variantes: [{ nombre: 'Chico (350 ml)', precio: 65 }, { nombre: 'Grande (500 ml)', precio: 80 }]
            },
            { nombre: 'Cold brew', precio: 70, desc: 'Extracto de café frío acompañado con cubos de hielo.' },
            { nombre: 'Latte brew', precio: 60, desc: 'Extracto de café frío acompañado con cubos de hielo y leche entera.' },
            { nombre: 'Taro', precio: 70 },
            { nombre: 'Latte', precio: 70 },
            { nombre: 'Matcha latte', precio: 70 },
            { nombre: 'Chai latte', precio: 70 },
            { nombre: 'Mocha latte', precio: 70 },
            { nombre: 'Golden milk', precio: 70, desc: 'Infusión de cúrcuma en leche animal o vegetal.' }
          ]
        }
      ],
      extras: {
        titulo: 'Extras de barra',
        columnas: [
          { titulo: 'Leches y shots', lista: ['Leche deslactosada — $10', 'Leche de almendras o coco — $15', 'Shot de leche entera — $10', 'Vaso de leche entera (600 ml) — $40', 'Ingrediente extra licuados — $15', 'Shot de café — $15'] }
        ]
      }
    },

    /* ---------------------------------------------------------- BEBIDAS */
    {
      id: 'bebidas',
      nav: 'Bebidas',
      titulo: 'Bebidas frías',
      nota: 'Todas nuestras bebidas son preparadas al momento con ingredientes 100% naturales.',
      grupos: [
        {
          items: [
            { nombre: 'Chocomilk (400 ml)', precio: 60, img: 'bebidas-frappe' },
            { nombre: 'Chocomilk frappé', precio: 70 },
            { nombre: 'Tisanas', precio: 65, desc: 'Caliente o fría.' },
            { nombre: 'Tisanas frappé', precio: 75 },
            { nombre: 'Jugos naturales', precio: 65, img: 'jugos', desc: 'Naranja o verde.' },
            { nombre: 'Licuados (400 ml)', precio: 75, desc: 'Incluye 1 ingrediente: fresa, plátano, avena o papaya. Por temporada: frutos rojos, mango.' },
            {
              nombre: 'Limonada | Naranjada',
              variantes: [{ nombre: 'Natural (400 ml)', precio: 55 }, { nombre: 'Mineral (400 ml)', precio: 65 }]
            },
            { nombre: 'Limonada de frutos rojos', precio: 65 },
            { nombre: 'Limonada de mango maracuyá', precio: 65 },
            {
              nombre: 'Aguas frescas naturales',
              desc: 'Avena (a base de leche), pepino-limón-menta, mango-maracuyá, naranja-fresa o frutos rojos.',
              variantes: [{ nombre: 'Chico (400 ml)', precio: 65 }, { nombre: 'Grande (1 L)', precio: 85 }]
            },
            { nombre: 'Refresco (355 ml)', precio: 50 },
            {
              nombre: 'Agua fresca gasificada',
              variantes: [{ nombre: '355 ml', precio: 70 }, { nombre: 'Grande', precio: 90 }]
            },
            { nombre: 'Agua natural embotellada (355 ml)', precio: 40 },
            { nombre: 'Agua mineral (355 ml)', precio: 50 }
          ]
        }
      ]
    },

    /* -------------------------------------------------------- SMOOTHIES */
    {
      id: 'smoothies',
      nav: 'Smoothies',
      titulo: 'Smoothies',
      grupos: [
        {
          items: [
            { nombre: 'Coco mango', precio: 70, img: 'smoothie', desc: 'Leche, crema de coco, mango, piña, coco tostado y yogurt.' },
            { nombre: 'Tropical', precio: 70, desc: 'Jugo de naranja, fresa, piña, plátano y hojas de menta.' },
            { nombre: 'Fresa-plátano', precio: 70, desc: 'Leche de almendra, plátano, fresa, granola y miel de abeja.' },
            { nombre: 'Mix verde-piña', precio: 70, desc: 'Jugo de naranja, mix verde y piña.' },
            { nombre: 'Frutos amarillos', precio: 70, desc: 'Mango, piña y guayaba con leche de coco.' }
          ]
        }
      ]
    },

    /* ------------------------------------------------------- COCTELERÍA */
    {
      id: 'cocteleria',
      nav: 'Coctelería',
      titulo: 'Coctelería',
      nota: 'Servicio para mayores de 18 años. Evita el exceso.',
      grupos: [
        {
          titulo: 'Coctelería y bebidas con alcohol',
          items: [
            { nombre: 'Mimosa', precio: 110 },
            { nombre: 'Pink mimosa', precio: 120 },
            { nombre: 'Carajillo', precio: 120, desc: 'Café y Licor 43.' },
            { nombre: 'Canija', precio: 120, desc: 'Café y Baileys.' },
            { nombre: 'Show fest', precio: 120, desc: 'Baileys, Carnation, licor de avellana (Frangélico) y helado de vainilla.' },
            { nombre: 'Clericot', precio: 120 },
            { nombre: 'Pink clericot', precio: 120 },
            { nombre: 'Sangría', precio: 120 },
            { nombre: 'Aperol spritz', precio: 120 }
          ]
        },
        {
          titulo: 'Coctelería sin alcohol',
          items: [
            { nombre: 'Guayaba litchi', precio: 115, desc: 'Puré de guayaba, jarabe de litchi, limón y soda de jengibre.' },
            { nombre: 'Frutos rojos', precio: 115, desc: 'Syrup de frutos rojos, jugo de naranja, romero y agua tónica.' },
            { nombre: 'Pepino - menta', precio: 115, desc: 'Jarabe de pepino, menta, limón y Sprite.' },
            { nombre: 'Jamaica fresh', precio: 115, desc: 'Concentrado de jamaica, jugo de arándano, albahaca y refresco de toronja.' }
          ]
        },
        {
          titulo: 'Cervezas',
          items: [
            { nombre: 'Corona, Victoria, Pacífico', precio: 45 },
            { nombre: 'Modelo Especial, Negra Modelo', precio: 55 }
          ]
        }
      ]
    }

  ]
};
