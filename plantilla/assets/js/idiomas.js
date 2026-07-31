/* =====================================================================
   MI MENÚ CARTA — Plantilla / Idiomas
   ---------------------------------------------------------------------
   Aquí vive TODO el inglés. El menú en español está en datos.js y no se
   toca: los precios, las fotos y el orden viven allá una sola vez.

   Cómo se enlazan las dos partes:
   · Los platillos se buscan por  'idDeLaCategoria/Nombre en español'
       'entradas/Sopa del día': { nombre: 'Soup of the Day', desc: '...' }
     El id de la categoría es el campo "id" de datos.js. Se usa el id para
     que no se confundan dos platillos que se llaman igual en secciones
     distintas.
   · Lo demás (grupos, extras, tamaños) se busca por su texto en español,
     porque se repite igual en varias secciones.

   Si a un texto le falta su traducción, se muestra en español. Así se
   puede publicar el menú aunque el inglés esté a medias.

   ¿No quieres inglés? Pon  preguntarIdioma: false  en datos.js. El botón
   ES/EN seguirá existiendo, así que si de plano no lo quieres, borra del
   index.html el botón con id="btnIdioma".
   ===================================================================== */

window.IDIOMAS = {

  /* ================================================================
     1. TEXTOS DE LA PÁGINA (botones, avisos, títulos de la interfaz)
        Esto ya viene traducido: normalmente no hay que tocarlo.
     ================================================================ */
  ui: {

    es: {
      idioma: 'Español',
      idiomaCorto: 'ES',
      cambiarIdioma: 'Cambiar idioma',
      buscar: 'Buscar platillo',
      buscarEtiqueta: 'Buscar en el menú',
      limpiarBusqueda: 'Limpiar búsqueda',
      cambiarTema: 'Cambiar tema',
      inicio: 'Inicio',
      menu: 'Menú',
      intro: 'Cocina hecha al momento, con ingredientes de temporada.',
      accionPedido: 'Toca cualquier platillo para verlo en grande y sumarlo a tu pedido.',
      accionConsulta: 'Toca cualquier platillo para verlo en grande.',
      resumen: ['Entradas', 'Platos fuertes', 'Bebidas'],
      sinResultadosTitulo: 'Sin coincidencias',
      sinResultadosTexto: 'Prueba con otro nombre o revisa las categorías del menú.',
      platillo: 'Platillo',
      agregar: 'Agregar',
      elegir: 'Elegir',
      desde: 'desde ',
      veg: 'Vegetariano',
      picante: 'Picante',
      producto: 'producto',
      productos: 'productos',
      verPedido: 'Ver pedido',
      tuPedido: 'Tu pedido',
      total: 'Total',
      enviarWhatsapp: 'Enviar pedido por WhatsApp',
      vaciarPedido: 'Vaciar pedido',
      pedidoVacio: 'Tu pedido está vacío. Toca un platillo para agregarlo.',
      cerrar: 'Cerrar',
      firma: 'Menú digital',
      waTitulo: '*Pedido*',
      waGracias: '¡Gracias!',
      portadaTitulo: 'Elige tu idioma',
      portadaBoton: 'Español',
      // calificación
      calificar: 'Califícanos',
      calificarTitulo: '¿Cómo te fue?',
      calificarIntro: 'Tu opinión llega directo al dueño y nos ayuda a mejorar.',
      calificarComentario: 'Cuéntanos (opcional)',
      calificarPlatillo: '¿Qué fue lo que más te gustó? (opcional)',
      calificarNombre: 'Tu nombre (opcional)',
      calificarCorreo: 'Tu correo (opcional)',
      calificarEnviar: 'Enviar calificación',
      calificarEnviando: 'Enviando…',
      calificarError: 'No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.',
      calificarCorreoMal: 'Ese correo no se ve bien. Revísalo o déjalo vacío.',
      calificarGraciasTitulo: '¡Gracias!',
      calificarGraciasTexto: 'Tu calificación ya va en camino. Nos ayuda muchísimo.',
      juicios: ['Muy mala', 'Mala', 'Regular', 'Buena', 'Excelente']
    },

    en: {
      idioma: 'English',
      idiomaCorto: 'EN',
      cambiarIdioma: 'Change language',
      buscar: 'Search dish',
      buscarEtiqueta: 'Search the menu',
      limpiarBusqueda: 'Clear search',
      cambiarTema: 'Toggle theme',
      inicio: 'Home',
      menu: 'Menu',
      intro: 'Food made to order with seasonal ingredients.',
      accionPedido: 'Tap any dish to see it larger and add it to your order.',
      accionConsulta: 'Tap any dish to see it larger.',
      resumen: ['Starters', 'Main courses', 'Drinks'],
      sinResultadosTitulo: 'No matches',
      sinResultadosTexto: 'Try another name or browse the menu categories.',
      platillo: 'Dish',
      agregar: 'Add',
      elegir: 'Choose',
      desde: 'from ',
      veg: 'Vegetarian',
      picante: 'Spicy',
      producto: 'item',
      productos: 'items',
      verPedido: 'View order',
      tuPedido: 'Your order',
      total: 'Total',
      enviarWhatsapp: 'Send order via WhatsApp',
      vaciarPedido: 'Clear order',
      pedidoVacio: 'Your order is empty. Tap a dish to add it.',
      cerrar: 'Close',
      firma: 'Digital menu',
      waTitulo: '*Order*',
      waGracias: 'Thank you!',
      portadaTitulo: 'Choose your language',
      portadaBoton: 'English',
      // calificación
      calificar: 'Rate us',
      calificarTitulo: 'How was everything?',
      calificarIntro: 'Your feedback goes straight to the owner and helps us get better.',
      calificarComentario: 'Tell us more (optional)',
      calificarPlatillo: 'What did you like the most? (optional)',
      calificarNombre: 'Your name (optional)',
      calificarCorreo: 'Your email (optional)',
      calificarEnviar: 'Send rating',
      calificarEnviando: 'Sending…',
      calificarError: "Couldn't send it. Check your connection and try again.",
      calificarCorreoMal: "That email doesn't look right. Fix it or leave it empty.",
      calificarGraciasTitulo: 'Thank you!',
      calificarGraciasTexto: 'Your rating is on its way. It helps us a lot.',
      juicios: ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent']
    }

  },

  /* ================================================================
     2. EL MENÚ EN INGLÉS  ← esto sí se cambia con cada negocio
     ================================================================ */
  en: {

    marca: {
      aviso: 'All our food is prepared to order, thank you for your patience.',
      avisoCombinacion: 'Prices include tax.'
    },

    config: {
      avisoSinPedidos: 'Browsing menu. To order, please ask your server.'
    },

    /* --- categorías: por su "id" en datos.js --- */
    categorias: {
      entradas: {
        nav: 'Starters',
        titulo: 'Starters',
        nota: 'To start and share.'
      },
      fuertes: {
        nav: 'Main courses',
        titulo: 'Main courses',
        nota: 'All served with your choice of side.'
      },
      bebidas: {
        nav: 'Drinks',
        titulo: 'Drinks'
      }
    },

    /* --- títulos de grupo dentro de cada sección --- */
    grupos: {
      'De la parrilla': 'From the grill',
      'Del mar': 'From the sea'
    },

    /* --- bloques de ingredientes o servicios extra --- */
    extras: {
      'Guarniciones extra': 'Extra sides',
      'Guarnición': 'Side',
      'Papas a la francesa': 'French fries',
      'Arroz': 'Rice',
      'Ensalada': 'Salad',
      'Verduras al vapor': 'Steamed vegetables'
    },

    /* --- tamaños y presentaciones --- */
    variantes: {
      'Vaso (400 ml)': 'Glass (400 ml)',
      'Jarra (1 L)': 'Pitcher (1 L)'
    },

    /* --- platillos: 'idDeLaCategoria/Nombre en español' --- */
    platillos: {

      'entradas/Guacamole de la casa': {
        nombre: 'House Guacamole',
        desc: 'Avocado, tomato, onion and cilantro, with freshly made tortilla chips.' },
      'entradas/Queso fundido': {
        nombre: 'Melted Cheese',
        desc: 'Melted cheese with chorizo, served with flour tortillas.' },
      'entradas/Sopa del día': {
        nombre: 'Soup of the Day',
        desc: "Ask your server about today's preparation." },

      'fuertes/Arrachera': {
        nombre: 'Skirt Steak',
        desc: 'Grilled cut with spring onions and charro beans.' },
      'fuertes/Pollo al carbón': {
        nombre: 'Charcoal Chicken',
        desc: 'Half chicken marinated in citrus and spices.' },
      'fuertes/Pescado a la plancha': {
        nombre: 'Grilled Fish',
        desc: 'Fillet with chile de árbol sauce and white rice.' },
      'fuertes/Camarones al ajillo': {
        nombre: 'Garlic Shrimp',
        desc: 'Sautéed with garlic and guajillo pepper.' },

      'bebidas/Agua fresca del día': {
        nombre: 'Fruit Water of the Day' },
      'bebidas/Refresco': {
        nombre: 'Soft Drink' },
      'bebidas/Café americano': {
        nombre: 'Americano Coffee' }

    }
  }
};
