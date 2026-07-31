# MIMC — Mi Menú Carta

Menús digitales con código QR para restaurantes. Cada menú es una carpeta
independiente: se abre con doble clic, sin servidor, sin compilar y sin
instalar nada.

```
mimc/
├── index.html                    ← landing de MIMC (el producto)
├── assets/
│   ├── css/estilos.css           ← estilos de la landing
│   ├── js/
│   │   ├── app.js                ← año del pie y códigos QR
│   │   └── vendor/qrcode.min.js  ← librería de QR (local, sin internet)
│   └── img/zyncosoft.png         ← logo del crédito del pie
├── plantilla/                    ← ★ base para empezar un menú nuevo
├── elmolletero/                  ← menú de El Molletero de Guadalajara
└── encholadas/                   ← menú de Encholadas y Panvaso
```

## La landing

`index.html` presenta el servicio: qué incluye, ejemplos reales y cómo
funciona. En la portada muestra el menú de Encholadas dentro de un
teléfono, cargado de verdad — así que **si ese menú cambia, la portada de
la landing cambia sola**. Para enseñar otro menú ahí, se cambia el `src`
del `<iframe>`.

El menú del teléfono se dibuja a 390 px (ancho real de un celular) y se
reduce con `transform:scale` para caber en el marco; si cambias el ancho
del marco, ajusta también `--escala` con la fórmula que está anotada en
el CSS.

Paleta propia: grafito azulado con acento champán. El naranja es de la
marca Zyncosoft y aquí no se usa, para que no compitan.

Los botones de contacto llevan al WhatsApp y al correo de Zyncosoft.

### Los códigos QR

Cada tarjeta de ejemplo lleva debajo su QR. **No son imágenes guardadas**:
se generan al abrir la página con la dirección real donde esté publicada
(`assets/js/app.js`). Así el mismo archivo funciona en la computadora, en
el dominio de pruebas y en el definitivo, sin tener que regenerar nada.

Para añadir el QR de otro menú, basta con poner el atributo en un div:

```html
<div class="qr-lienzo" data-qr="ruta/al/menu.html" data-qr-nombre="Nombre"></div>
```

Al abrir el archivo con doble clic (`file://`) el QR no aparece: esa ruta
sólo existe en esa computadora y no serviría al escanearla. En su lugar
sale el aviso "El QR aparece al publicar la página".

### El precio

Está en la sección `#precios` del `index.html`, escrito directamente en el
HTML: **$199 al mes con 3 menús incluidos y $10 al mes por menú extra**.
Los 3 menús son por cliente, repartibles entre cartas de un negocio o
entre negocios distintos. Si cambia la tarifa, se edita ahí y también el
texto del enlace de WhatsApp de ese botón, que menciona el monto.

## Empezar un menú nuevo

Copia `plantilla/`, renómbrala con el nombre del negocio y sigue el
[README de la plantilla](plantilla/README.md). Ahí está el detalle de qué
archivo se toca para cada cosa.

## Lo que comparten todos los menús

- Navegación por categorías, buscador y fichas con foto.
- Español e inglés, con portada para elegir al entrar.
- Pedido por WhatsApp, que se puede apagar para dejar el menú de sólo
  consulta.
- Modo claro y oscuro.
- Pie con el crédito **Desarrollado por Zyncosoft**, enlazado a
  zyncosoft.pages.dev, con el mismo formato que el sitio del Dr. Ricardo
  Estrada García.

## Publicar

Cada carpeta es estática: se sube tal cual a Cloudflare Pages, Netlify,
GitHub Pages o cualquier hosting. El QR se genera apuntando a la dirección
final del menú.
