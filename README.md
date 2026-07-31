# MIMC — Mi Menú Carta

Menús digitales con código QR para restaurantes. Cada menú es una carpeta
independiente: se abre con doble clic, sin servidor, sin compilar y sin
instalar nada.

```
mimc/
├── index.html          ← landing de MIMC (el producto)
├── zyncosoft.png       ← logo para el crédito del pie
├── plantilla/          ← ★ base para empezar un menú nuevo
├── elmolletero/        ← menú de El Molletero de Guadalajara
└── encholadas/         ← menú de Encholadas y Panvaso
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
