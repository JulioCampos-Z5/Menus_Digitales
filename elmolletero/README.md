# El Molletero — Menú digital

Menú web para escanear con código QR, construido a partir del PDF
`MENU QR COCTELERIA.pdf`. Reutiliza la lógica del menú de `../encholadas`
(navegación por categorías, carrito y envío por WhatsApp) con la identidad
visual de El Molletero: blanco, negro, rombos y tipografía editorial.

## Estructura

```
elmolletero/
├── index.html                  ← la página; casi no hay que tocarla
├── assets/
│   ├── css/
│   │   └── estilos.css         ← diseño (colores, tipografía, tarjetas)
│   ├── js/
│   │   ├── datos.js            ← ★ TODO el menú: platillos y precios
│   │   └── app.js              ← lógica (menú, buscador, pedido, tema)
│   └── img/
│       └── platillos/          ← 55 fotos recortadas del PDF (.webp)
├── MENU QR COCTELERIA.pdf      ← menú original de referencia
└── README.md
```

## Cómo verlo

Basta con abrir `index.html` en el navegador: no necesita servidor ni
instalación. Para probarlo en el celular desde la misma red:

```bash
npx serve .
```

## Qué se edita y dónde

### Cambiar precios o platillos

Todo el menú vive en **`assets/js/datos.js`**. Un platillo se ve así:

```js
{
  nombre: 'Tradicional',
  precio: 59,
  desc: 'Base de frijoles fritos gratinados con queso de la casa.',
  img: 'tradicional',        // assets/img/platillos/tradicional.webp
  tags: ['veg']              // 'veg' o 'picante'
}
```

Si un producto tiene tamaños, se cambia `precio` por `variantes`:

```js
{
  nombre: 'Café americano',
  variantes: [
    { nombre: 'Chico (350 ml)',  precio: 45 },
    { nombre: 'Grande (500 ml)', precio: 55 }
  ]
}
```

Los platillos que no traen foto en el menú impreso se dibujan con un
monograma en rombo, así la retícula se mantiene pareja.

### Prender y apagar los pedidos

Cuando los pedidos están apagados, el menú queda de **sólo consulta**: se
ocultan los botones de "Agregar", la barra del pedido y el envío por
WhatsApp. Las fotos, precios y descripciones se siguen viendo igual, y al
tocar un platillo se abre su ficha grande con el precio.

Hay dos formas de cambiarlo:

**1. Fija — en `assets/js/datos.js`**, arriba del todo:

```js
config: {
  pedidos: true,    // false = menú de sólo consulta
  avisoSinPedidos: 'Menú de consulta. Para ordenar, pídelo con tu mesero.'
}
```

**2. Rápida — desde el navegador**, sin abrir ningún archivo:

| Dirección | Qué hace |
|---|---|
| `index.html?pedidos=off` | Apaga los pedidos y lo recuerda |
| `index.html?pedidos=on`  | Los vuelve a prender |
| `index.html?pedidos=auto`| Olvida lo anterior y obedece a `datos.js` |

Lo que se elija por la dirección se guarda en ese teléfono o computadora y
manda sobre `datos.js`. Sirve para apagar los pedidos un rato (cocina
cerrada, se acabó el reparto) sin tocar el código, o para probar cómo se ve.
Ojo: es por dispositivo, no para todos los clientes a la vez — para eso se
usa la opción 1.

El pedido que un cliente hubiera armado **no se pierde** al apagar: queda
guardado y reaparece cuando se vuelve a prender.

### Número de WhatsApp

En `datos.js`, dentro de `marca`:

```js
whatsapp: '523300000000'   // ⚠️ pendiente: poner el número real
```

Formato: código de país (52 para México) + número, sin espacios ni signos.

### Agregar una categoría nueva

Se añade un objeto a `MENU.categorias`. El `id` es el ancla de la
navegación y `nav` el texto del botón; el resto se dibuja solo.

## Qué incluye

- Navegación por categorías con resaltado automático de la sección visible:
  - **En celular y tableta** va fija al pie, como una tira que se desliza en
    horizontal; el chip de la categoría en pantalla se centra solo. Respeta
    el área segura de los teléfonos con gesto de inicio.
  - **En escritorio** (a partir de 1080 px) pasa a barra lateral fija.
- Todo el contenido se apila en una sola columna vertical en celular: hero
  compacto, fichas con la foto arriba, extras en una columna y modales que
  suben desde abajo. La barra del pedido se coloca justo encima del nav y el
  contenido reserva ese espacio para que nada quede tapado.
- Buscador que filtra sobre nombre, descripción y categoría (ignora acentos).
- Ficha ampliada al tocar un platillo, con selector de tamaño y cantidad.
- Pedido con total en vivo, guardado en `localStorage` y envío por WhatsApp.
- Tema claro y oscuro, respeta la preferencia del sistema y recuerda la elección.
- Fotos en WebP con carga diferida (55 imágenes, ~1.1 MB en total).

## Sobre las imágenes

Se extrajeron del PDF conservando la transparencia original y se
exportaron a WebP a 640 px de ancho máximo. Para reemplazar una foto basta
con dejar un archivo con el mismo nombre en `assets/img/platillos/`.
