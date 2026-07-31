/* =====================================================================
   EL MOLLETERO — Idiomas / Languages
   ---------------------------------------------------------------------
   Aquí vive TODO el inglés. El menú en español está en datos.js y no se
   toca: los precios, las fotos y el orden viven allá una sola vez.

   Cómo se enlazan las dos partes:
   · Los platillos se buscan por  'idDeLaCategoria/Nombre en español'
       'salados/Tradicional': { nombre: 'Traditional', desc: '...' }
     El id de la categoría es el campo "id" de datos.js (salados, dulces,
     huevos, cafe...). Se usa el id para que no se confundan dos platillos
     que se llaman igual en secciones distintas (por ejemplo "Tropical",
     que existe en Dulces y en Smoothies).
   · Lo demás (grupos, extras, tamaños) se busca por su texto en español,
     porque se repite igual en varias secciones.

   Si a un texto le falta su traducción, se muestra en español. Así se
   puede ir traduciendo poco a poco sin que nada se rompa.
   ===================================================================== */

window.IDIOMAS = {

  /* ================================================================
     1. TEXTOS DE LA PÁGINA (botones, avisos, títulos de la interfaz)
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
      intro: 'Molletes de birote fleyman tradicional de masa madre, gratinados con queso especial de la casa.',
      accionPedido: 'Toca cualquier platillo para verlo en grande y sumarlo a tu pedido.',
      accionConsulta: 'Toca cualquier platillo para verlo en grande.',
      resumen: ['Salados · Dulces', 'Desayunos', 'Barra de café', 'Coctelería'],
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
      firma: 'Menú digital · El Molletero®',
      // mensaje que se manda por WhatsApp
      waTitulo: '*Pedido — El Molletero*',
      waGracias: '¡Gracias!',
      // portada de bienvenida
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
      intro: 'Molletes on traditional sourdough birote fleyman bread, gratinated with our house special cheese.',
      accionPedido: 'Tap any dish to see it larger and add it to your order.',
      accionConsulta: 'Tap any dish to see it larger.',
      resumen: ['Savory · Sweet', 'Breakfast', 'Coffee bar', 'Cocktails'],
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
      firma: 'Digital menu · El Molletero®',
      waTitulo: '*Order — El Molletero*',
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
     2. EL MENÚ EN INGLÉS
     ================================================================ */
  en: {

    marca: {
      aviso: 'All our food is prepared to order, thank you for your patience.',
      avisoCombinacion: 'When combining two or more ingredients in your mollete, the higher price applies.'
    },

    config: {
      avisoSinPedidos: 'Browsing menu. To order, please ask your server.'
    },

    /* --- categorías: por su "id" en datos.js --- */
    categorias: {
      salados: {
        nav: 'Savory',
        titulo: 'Savory molletes',
        nota: 'Made with traditional sourdough birote fleyman bread. All gratinated with our house special cheese. Served as one piece, about 18 cm (may vary as it is artisanal bread).'
      },
      dulces: {
        nav: 'Sweet',
        titulo: 'Sweet molletes',
        nota: 'Made with traditional sourdough birote fleyman bread, butter base with sugar and cinnamon bits. Served as one piece, about 18 cm (may vary as it is artisanal bread).'
      },
      docenas: {
        nav: 'By the dozen',
        titulo: 'By the dozen',
        nota: 'To go and share. Made with the molletes from the matching section.'
      },
      huevos: {
        nav: 'Eggs',
        titulo: 'Eggs',
        nota: 'Dishes prepared to order.'
      },
      chilaquiles: { nav: 'Chilaquiles', titulo: 'Chilaquiles' },
      omelets:     { nav: 'Omelets',     titulo: 'Omelets' },
      wraps:       { nav: 'Panela & wraps', titulo: 'Panela · Wraps · Enfrijoladas' },
      postres:     { nav: 'Desserts',    titulo: 'Dessert dishes' },
      light:       { nav: 'Light',       titulo: 'Light' },
      infantil:    { nav: 'Kids',        titulo: "Kids' menu" },
      cafe: {
        nav: 'Coffee bar',
        titulo: 'Coffee bar',
        nota: 'All our drinks are made to order with 100% natural ingredients.'
      },
      bebidas: {
        nav: 'Drinks',
        titulo: 'Cold drinks',
        nota: 'All our drinks are made to order with 100% natural ingredients.'
      },
      smoothies: { nav: 'Smoothies', titulo: 'Smoothies' },
      cocteleria: {
        nav: 'Cocktails',
        titulo: 'Cocktails',
        nota: 'Service for guests 18 and over. Please drink responsibly.'
      }
    },

    /* --- títulos de grupo dentro de cada sección --- */
    grupos: {
      'Opciones sin carne': 'Meat-free options',
      'Opciones con carne': 'Options with meat',
      'Especiales': 'Specials',
      'Clásicos': 'Classics',
      'Docena': 'Dozen',
      'Media docena': 'Half dozen',
      'Coctelería y bebidas con alcohol': 'Cocktails and alcoholic drinks',
      'Coctelería sin alcohol': 'Alcohol-free cocktails',
      'Cervezas': 'Beers'
    },

    /* --- bloques de ingredientes extra --- */
    extras: {
      'Ingredientes extra salados': 'Savory extra ingredients',
      'Ingredientes extra dulces': 'Sweet extra ingredients',
      'Ingredientes extra platillos': 'Extra ingredients for dishes',
      'Extras de barra': 'Bar extras',

      'Ingrediente extra': 'Extra ingredient',
      'Ingrediente extra con guiso': 'Extra stewed ingredient',
      'Ingrediente extra especial': 'Special extra ingredient',
      'Ingrediente extra clásico': 'Classic extra ingredient',
      'Ingrediente especial': 'Special ingredient',
      'Leches y shots': 'Milks and shots',

      'Aguacate': 'Avocado',
      '1 huevo': '1 egg',
      'Jamón': 'Ham',
      'Champiñones': 'Mushrooms',
      'Espinacas': 'Spinach',
      'Queso de la casa': 'House cheese',
      'Queso panela': 'Panela cheese',
      'Tocino': 'Bacon',
      'Chorizo': 'Chorizo',
      'Pierna': 'Pork leg',
      'Pastor': 'Al pastor',
      'Chilaquiles': 'Chilaquiles',
      'Pollo a la plancha': 'Grilled chicken',
      'Rajas': 'Poblano rajas',
      'Arrachera': 'Skirt steak',
      'Pancita': 'Pork belly',
      'Benedictino': 'Benedictine',
      'Mexicano': 'Mexicano',
      'Camarón': 'Shrimp',
      'Milanesa de pollo': 'Breaded chicken',
      'Bistec': 'Steak',
      'Lechera': 'Condensed milk',
      'Natas': 'Milk cream',
      'Philadelphia': 'Philadelphia',
      'Cajeta': 'Cajeta caramel',
      'Guayabate': 'Guava',
      'Nuez': 'Walnut',
      'Mermelada': 'Jam',
      'Frutos rojos': 'Mixed berries',
      'Nutella': 'Nutella',
      'Plátano o fresa': 'Banana or strawberry',
      'Tropical': 'Tropical',
      'Plátano macho frito': 'Fried plantain',
      'Manzana canela': 'Apple cinnamon',
      'Leche deslactosada — $10': 'Lactose-free milk — $10',
      'Leche de almendras o coco — $15': 'Almond or coconut milk — $15',
      'Shot de leche entera — $10': 'Whole milk shot — $10',
      'Vaso de leche entera (600 ml) — $40': 'Glass of whole milk (600 ml) — $40',
      'Ingrediente extra licuados — $15': 'Extra shake ingredient — $15',
      'Shot de café — $15': 'Coffee shot — $15'
    },

    /* --- tamaños y presentaciones --- */
    variantes: {
      'Chico (350 ml)': 'Small (350 ml)',
      'Grande (500 ml)': 'Large (500 ml)',
      'Chico (400 ml)': 'Small (400 ml)',
      'Grande (1 L)': 'Large (1 L)',
      'Natural (400 ml)': 'Still (400 ml)',
      'Mineral (400 ml)': 'Sparkling (400 ml)',
      '355 ml': '355 ml',
      'Grande': 'Large'
    },

    /* --- platillos: 'idDeLaCategoria/Nombre en español' --- */
    platillos: {

      /* ---------------------------------------------------- salados */
      'salados/Tradicional': {
        nombre: 'Traditional',
        desc: 'Refried bean base gratinated with house cheese.' },
      'salados/Chilaquiles': {
        nombre: 'Chilaquiles',
        desc: 'Refried bean base with chilaquiles in spicy red, green or mixed sauce.' },
      'salados/Hawaiano': {
        nombre: 'Hawaiian',
        desc: 'Butter base with ham and pineapple chunks in syrup.' },
      'salados/Rajas': {
        nombre: 'Poblano Rajas',
        desc: 'Butter base with poblano pepper strips, cream, mushrooms and corn.' },
      'salados/Vegetariano': {
        nombre: 'Vegetarian',
        desc: 'Garlic butter base with mushrooms and spinach.' },
      'salados/Higos': {
        nombre: 'Figs',
        desc: 'Requesón cheese base with fig pieces, a touch of walnut and honey.' },
      'salados/Peperoni': {
        nombre: 'Pepperoni',
        desc: 'Butter base with pomodoro-style sauce and pepperoni.' },
      'salados/Ranchero': {
        nombre: 'Ranchero',
        desc: 'Refried bean base with chorizo.' },
      'salados/Pastor': {
        nombre: 'Al Pastor',
        desc: 'Refried bean base with al pastor pork stewed with pineapple, served with lime, cilantro and onion.' },
      'salados/Carne en su jugo': {
        nombre: 'Beef in Its Juices',
        desc: 'Refried bean base with beef in its juices, pot beans and bacon, served with broth, cilantro and onion.' },
      'salados/Pierna': {
        nombre: 'Pulled Pork Leg',
        desc: 'Refried bean base with pulled pork leg stewed in our special house adobo.' },
      'salados/Americano': {
        nombre: 'American',
        desc: 'Refried bean base with bacon and a fried egg.' },
      'salados/Ahogado': {
        nombre: 'Ahogado (Drowned)',
        desc: 'Refried bean base with carnitas drowned in our house tomato sauce.' },
      'salados/Bañado': {
        nombre: 'Bañado (Chipotle-Drenched)',
        desc: 'Refried bean base with pulled pork leg, drenched in creamy chipotle sauce with a touch of mustard dressing.' },
      'salados/Benedictino': {
        nombre: 'Benedictine',
        desc: 'Butter base with ham and a poached egg in hollandaise sauce.' },
      'salados/Mexicano': {
        nombre: 'Mexicano',
        desc: 'Refried bean base with beef prepared with tomato, onion and serrano pepper.' },
      'salados/Pancita': {
        nombre: 'Pork Belly',
        desc: 'Refried bean base with carnitas-style pork belly, stewed in our special house adobo.' },
      'salados/Arrachera': {
        nombre: 'Skirt Steak',
        desc: 'Refried bean base with grilled skirt steak, served with avocado slices.' },
      'salados/Gobernador': {
        nombre: 'Gobernador (Shrimp)',
        desc: 'Butter base with shrimp sautéed with bell pepper and spicy gobernador-style sauce.' },
      'salados/Español': {
        nombre: 'Spanish',
        desc: 'Butter base with serrano ham, cherry tomato, arugula and olives.' },
      'salados/Milanesa de pollo': {
        nombre: 'Breaded Chicken',
        desc: 'Refried bean base with a breaded chicken cutlet.' },
      'salados/Barbacoa': {
        nombre: 'Barbacoa',
        desc: 'Refried bean base with beef in barbacoa sauce, prepared with a blend of chiles and spices, served with broth, cilantro, onion and lime.' },

      /* ----------------------------------------------------- dulces */
      'dulces/Básico': {
        nombre: 'Basic',
        desc: 'Butter base with sugar and cinnamon bits.' },
      'dulces/Lechera': {
        nombre: 'Condensed Milk',
        desc: 'Drizzled with condensed milk, strawberry and walnut bits.' },
      'dulces/Natas': {
        nombre: 'Milk Cream',
        desc: 'Milk cream with strawberry pieces.' },
      'dulces/Mermelada': {
        nombre: 'Jam',
        desc: 'House-made artisanal strawberry or mixed berry jam.' },
      'dulces/Cajeta': {
        nombre: 'Cajeta Caramel',
        desc: 'Goat milk caramel with banana pieces and walnut.' },
      'dulces/Manzana canela': {
        nombre: 'Apple Cinnamon',
        desc: 'Apples sautéed with piloncillo cane sugar and cinnamon.' },
      'dulces/Guayabate': {
        nombre: 'Guava',
        desc: 'Milk cream base with guava cooked in cinnamon syrup.' },
      'dulces/Philadelphia mermelada': {
        nombre: 'Philadelphia & Jam',
        desc: 'Special Philadelphia frosting with house-made artisanal jam, mixed berry or strawberry.' },
      'dulces/Frutos rojos': {
        nombre: 'Mixed Berries',
        desc: 'Milk cream base with mixed berries topped with condensed milk.' },
      'dulces/Nutella': {
        nombre: 'Nutella',
        desc: 'Nutella topping with banana or strawberry pieces.' },
      'dulces/Banana': {
        nombre: 'Banana',
        desc: 'Milk cream base with fried plantain pieces, topped with condensed milk.' },
      'dulces/Tropical': {
        nombre: 'Tropical',
        desc: 'Milk cream base with mango, peach, kiwi and strawberry, topped with condensed milk.' },
      'dulces/Natas + mermelada': {
        nombre: 'Milk Cream & Jam',
        desc: 'Milk cream with house-made artisanal strawberry jam.' },
      'dulces/Pay de limón': {
        nombre: 'Key Lime Pie',
        desc: 'Creamy base made with a blend of milks, a touch of lime and María cookies.' },

      /* ---------------------------------------------------- docenas */
      'docenas/Salados sin carne': { nombre: 'Savory, meat-free' },
      'docenas/Salados con carne': { nombre: 'Savory with meat' },
      'docenas/Dulces clásicos':   { nombre: 'Sweet classics' },
      'docenas/Dulces':            { nombre: 'Sweet' },

      /* ----------------------------------------------------- huevos */
      'huevos/Huevos al gusto': {
        nombre: 'Eggs Your Way',
        desc: 'Scrambled or fried with 1 ingredient (ham, bacon, chorizo or a la mexicana), served with refried beans or a traditional mollete.' },
      'huevos/Huevos vegetarianos': {
        nombre: 'Vegetarian Eggs',
        desc: 'Scrambled with green beans, spinach and mushrooms, served with refried beans, a traditional mollete or salad.' },
      'huevos/Huevos motuleños': {
        nombre: 'Motuleño Eggs',
        desc: 'Two fried eggs over a crisp tortilla, a bed of beans, ham, peas and plantain, drenched in our very spicy house sauce.' },
      'huevos/Huevos rancheros': {
        nombre: 'Ranchero Eggs',
        desc: 'Two fried eggs over a crisp tortilla, drenched in spicy ranchera sauce with tomato, onion and serrano pepper, stewed in our spicy house sauce: red, green or mixed.' },
      'huevos/Huevos benedictinos': {
        nombre: 'Eggs Benedict',
        desc: 'Two poached eggs on our house birote fleyman bread over a bed of ham, in hollandaise sauce, served with refried beans or house salad.' },
      'huevos/Huevos pochados': {
        nombre: 'Poached Eggs',
        desc: 'Served on toasted house birote fleyman bread with bacon and asparagus cream, with refried beans or house salad.' },
      'huevos/Huevos montados': {
        nombre: 'Eggs over Steak',
        desc: 'Grilled steak with fried or scrambled eggs, drenched in spicy red or green sauce, served with refried beans or a traditional mollete.' },
      'huevos/Huevos al albañil': {
        nombre: 'Albañil Eggs',
        desc: 'Scrambled eggs drowned in house sauce (spicy red or green), served with a traditional mollete or refried beans.' },

      /* ------------------------------------------------ chilaquiles */
      'chilaquiles/Chilaquiles chipotle': {
        nombre: 'Chipotle Chilaquiles',
        desc: 'In spicy chipotle sauce with cream, red onion and cotija cheese, served with refried beans or a traditional mollete.' },
      'chilaquiles/Chilaquiles de la casa': {
        nombre: 'House Chilaquiles',
        desc: 'In spicy red, green or mixed sauce, with cream, red onion and cotija cheese, served with refried beans or a traditional mollete.' },
      'chilaquiles/Chilaquiles poblanos': {
        nombre: 'Poblano Chilaquiles',
        desc: 'Creamy poblano pepper sauce with cream, red onion and cotija cheese, served with refried beans or a traditional mollete.' },

      /* ---------------------------------------------------- omelets */
      'omelets/Omelet poblano': {
        nombre: 'Poblano Omelet',
        desc: 'Filled with spinach, mushrooms and cheese, in poblano sauce, topped with a grilled panela cheese slice, served with a traditional mollete or refried beans.' },
      'omelets/Omelet sencillo': {
        nombre: 'Simple Omelet',
        desc: 'Two eggs filled with house cheese and 1 ingredient of your choice: ham, bacon, spinach or mushrooms. Served with refried beans or a traditional mollete.' },
      'omelets/Omelet molletero': {
        nombre: 'Molletero Omelet',
        desc: 'Two eggs filled with bacon, ham and spinach with house cheese, topped with a grilled panela cheese slice, served with a traditional mollete or refried beans.' },
      'omelets/Omelet vegetariano': {
        nombre: 'Vegetarian Omelet',
        desc: 'Filled with spinach, green beans, mushrooms and cheese, topped with a panela cheese slice, served with a traditional mollete or refried beans.' },
      'omelets/Omelet primavera': {
        nombre: 'Primavera Omelet',
        desc: 'Set over a bed of green chilaquiles, filled with zucchini and cheese, in house red sauce, topped with a grilled panela cheese slice, served with a traditional mollete or refried beans.' },
      'omelets/Omelet de chilaquiles': {
        nombre: 'Chilaquiles Omelet',
        desc: 'Filled with red or green chilaquiles and special cheese, topped with a grilled panela cheese slice, served with a traditional mollete or refried beans.' },

      /* ------------------------------------------------------ wraps */
      'wraps/Panela asada': {
        nombre: 'Grilled Panela Cheese',
        desc: 'Served with bacon and grilled asparagus, drenched in spicy house sauce, red or green.' },
      'wraps/Panela con huevo': {
        nombre: 'Panela with Egg',
        desc: 'Egg whites or fried eggs with spinach over grilled panela cheese, spicy red house sauce and grilled asparagus.' },
      'wraps/Wrap arrachera': {
        nombre: 'Skirt Steak Wrap',
        desc: 'Flour tortilla with a bed of refried beans, filled with skirt steak, grilled onion and house cheese. Served with avocado and fresh tomato, refried beans and martajada salsa.' },
      'wraps/Wrap molletero': {
        nombre: 'Molletero Wrap',
        desc: 'Flour tortilla filled with scrambled egg and chorizo, grilled onion, spinach and house cheese. Served with avocado and fresh tomato, refried beans and martajada salsa.' },
      'wraps/Enfrijoladas': {
        nombre: 'Enfrijoladas',
        desc: 'Three corn tortillas filled with fresh panela cheese, bathed in bean sauce, with avocado, cream, cotija cheese and red onion.' },

      /* ---------------------------------------------------- postres */
      'postres/Torrejas': {
        nombre: 'Torrejas (French Toast)',
        desc: 'Our house birote fleyman bread French-toast style, drizzled with natural honey or maple, with a touch of seasonal fruit.' },
      'postres/Pancakes moras (3 pzas)': {
        nombre: 'Berry Pancakes (3 pcs)',
        desc: 'Homemade pancakes filled with berries, artisanal Philadelphia frosting and house-made mixed berry jam.' },
      'postres/Pancakes americano (3 pzas)': {
        nombre: 'American Pancakes (3 pcs)',
        desc: 'Plain homemade pancakes with maple syrup, served with bacon and eggs your way.' },
      'postres/Avena pancakes (3 pzas)': {
        nombre: 'Oat Pancakes (3 pcs)',
        desc: 'Homemade oat and banana pancakes, topped with seasonal fruit.' },
      'postres/Pancakes cinnamon (3 pzas)': {
        nombre: 'Cinnamon Pancakes (3 pcs)',
        desc: 'Homemade pancakes filled with brown sugar and cinnamon, with a special glaze, walnut pieces and berries.' },

      /* ------------------------------------------------------ light */
      'light/Parfait': {
        nombre: 'Parfait',
        desc: 'Mason jar of seasonal fruit with artisanal chia pudding and cookie crumble.' },
      'light/Bowl de fruta': {
        nombre: 'Fruit Bowl',
        desc: 'Seasonal fruit served with artisanal natural yogurt.' },
      'light/Single bowl': {
        nombre: 'Single Bowl',
        desc: 'Small bowl with a single fruit of your choice.' },

      /* --------------------------------------------------- infantil */
      'infantil/Pancakes kids': {
        nombre: "Kids' Pancakes",
        desc: 'Two plain pancakes with a bit of fruit and honey.' },
      'infantil/Huevitos kids': {
        nombre: "Kids' Eggs",
        desc: 'Two scrambled or fried eggs with one ingredient of your choice (ham, bacon, tomato, onion), served with refried beans.' },

      /* ------------------------------------------------------- café */
      'cafe/Café americano': {
        nombre: 'Americano',
        desc: 'Includes 1 refill.' },
      'cafe/Café de olla':        { nombre: 'Café de Olla' },
      'cafe/Expresso':            { nombre: 'Espresso' },
      'cafe/Expresso americano':  { nombre: 'Espresso Americano' },
      'cafe/Expresso cortado':    { nombre: 'Cortado' },
      'cafe/Capuccino':           { nombre: 'Cappuccino' },
      'cafe/Chocolate artesanal': { nombre: 'Artisanal Hot Chocolate' },
      'cafe/Cold brew': {
        nombre: 'Cold Brew',
        desc: 'Cold coffee extract served over ice cubes.' },
      'cafe/Latte brew': {
        nombre: 'Latte Brew',
        desc: 'Cold coffee extract served over ice cubes with whole milk.' },
      'cafe/Taro':         { nombre: 'Taro' },
      'cafe/Latte':        { nombre: 'Latte' },
      'cafe/Matcha latte': { nombre: 'Matcha Latte' },
      'cafe/Chai latte':   { nombre: 'Chai Latte' },
      'cafe/Mocha latte':  { nombre: 'Mocha Latte' },
      'cafe/Golden milk': {
        nombre: 'Golden Milk',
        desc: 'Turmeric infusion in dairy or plant-based milk.' },

      /* ---------------------------------------------------- bebidas */
      'bebidas/Chocomilk (400 ml)': { nombre: 'Chocolate Milk (400 ml)' },
      'bebidas/Chocomilk frappé':   { nombre: 'Chocolate Milk Frappé' },
      'bebidas/Tisanas': {
        nombre: 'Herbal Teas',
        desc: 'Hot or iced.' },
      'bebidas/Tisanas frappé': { nombre: 'Herbal Tea Frappé' },
      'bebidas/Jugos naturales': {
        nombre: 'Fresh Juices',
        desc: 'Orange or green.' },
      'bebidas/Licuados (400 ml)': {
        nombre: 'Milk Shakes (400 ml)',
        desc: 'Includes 1 ingredient: strawberry, banana, oats or papaya. Seasonal: mixed berries, mango.' },
      'bebidas/Limonada | Naranjada':          { nombre: 'Limeade | Orangeade' },
      'bebidas/Limonada de frutos rojos':      { nombre: 'Mixed Berry Limeade' },
      'bebidas/Limonada de mango maracuyá':    { nombre: 'Mango Passion Fruit Limeade' },
      'bebidas/Aguas frescas naturales': {
        nombre: 'Fresh Fruit Waters',
        desc: 'Oat (milk-based), cucumber-lime-mint, mango-passion fruit, orange-strawberry or mixed berries.' },
      'bebidas/Refresco (355 ml)':                 { nombre: 'Soft Drink (355 ml)' },
      'bebidas/Agua fresca gasificada':            { nombre: 'Sparkling Fruit Water' },
      'bebidas/Agua natural embotellada (355 ml)': { nombre: 'Bottled Water (355 ml)' },
      'bebidas/Agua mineral (355 ml)':             { nombre: 'Sparkling Water (355 ml)' },

      /* -------------------------------------------------- smoothies */
      'smoothies/Coco mango': {
        nombre: 'Coconut Mango',
        desc: 'Milk, coconut cream, mango, pineapple, toasted coconut and yogurt.' },
      'smoothies/Tropical': {
        nombre: 'Tropical',
        desc: 'Orange juice, strawberry, pineapple, banana and mint leaves.' },
      'smoothies/Fresa-plátano': {
        nombre: 'Strawberry-Banana',
        desc: 'Almond milk, banana, strawberry, granola and honey.' },
      'smoothies/Mix verde-piña': {
        nombre: 'Green Mix-Pineapple',
        desc: 'Orange juice, green mix and pineapple.' },
      'smoothies/Frutos amarillos': {
        nombre: 'Yellow Fruits',
        desc: 'Mango, pineapple and guava with coconut milk.' },

      /* ------------------------------------------------- coctelería */
      'cocteleria/Mimosa':       { nombre: 'Mimosa' },
      'cocteleria/Pink mimosa':  { nombre: 'Pink Mimosa' },
      'cocteleria/Carajillo': {
        nombre: 'Carajillo',
        desc: 'Coffee and Licor 43.' },
      'cocteleria/Canija': {
        nombre: 'Canija',
        desc: 'Coffee and Baileys.' },
      'cocteleria/Show fest': {
        nombre: 'Show Fest',
        desc: 'Baileys, Carnation, hazelnut liqueur (Frangelico) and vanilla ice cream.' },
      'cocteleria/Clericot':      { nombre: 'Clericot' },
      'cocteleria/Pink clericot': { nombre: 'Pink Clericot' },
      'cocteleria/Sangría':       { nombre: 'Sangria' },
      'cocteleria/Aperol spritz': { nombre: 'Aperol Spritz' },
      'cocteleria/Guayaba litchi': {
        nombre: 'Guava Lychee',
        desc: 'Guava purée, lychee syrup, lime and ginger soda.' },
      'cocteleria/Frutos rojos': {
        nombre: 'Mixed Berries',
        desc: 'Mixed berry syrup, orange juice, rosemary and tonic water.' },
      'cocteleria/Pepino - menta': {
        nombre: 'Cucumber - Mint',
        desc: 'Cucumber syrup, mint, lime and Sprite.' },
      'cocteleria/Jamaica fresh': {
        nombre: 'Hibiscus Fresh',
        desc: 'Hibiscus concentrate, cranberry juice, basil and grapefruit soda.' },
      'cocteleria/Corona, Victoria, Pacífico':      { nombre: 'Corona, Victoria, Pacífico' },
      'cocteleria/Modelo Especial, Negra Modelo':   { nombre: 'Modelo Especial, Negra Modelo' }

    }
  }
};
