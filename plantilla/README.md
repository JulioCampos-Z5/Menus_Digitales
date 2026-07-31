# Plantilla — Mi Menú Carta

Punto de partida para el menú digital de un negocio nuevo. Trae tres
categorías de muestra para ver cómo queda todo funcionando; se borran y se
escribe el menú real encima.

## Cómo empezar un menú nuevo

1. **Copia esta carpeta** y renómbrala con el nombre del negocio, dentro de
   `mimc/` (por ejemplo `mimc/tacos-el-primo/`).
2. Abre `index.html` en el navegador: funciona tal cual, sin servidor ni
   instalar nada.
3. Ve cambiando lo que se indica abajo.

## Qué se cambia y dónde

### 1. El menú — `assets/js/datos.js`

Es el archivo principal. Ahí van el nombre del negocio, el WhatsApp, las
sucursales, las categorías y todos los platillos con sus precios.

```js
{
  nombre: 'Guacamole de la casa',
  precio: 95,
  desc: 'Aguacate, jitomate, cebolla y cilantro, con totopos.',
  img: 'guacamole',        // assets/img/platillos/guacamole.webp
  tags: ['veg']            // 'veg' o 'picante'
}
```

Productos con tamaños: se cambia `precio` por `variantes`.

```js
{
  nombre: 'Agua fresca del día',
  variantes: [
    { nombre: 'Vaso (400 ml)', precio: 45 },
    { nombre: 'Jarra (1 L)', precio: 85 }
  ]
}
```

⚠️ No olvides el WhatsApp real en `marca.whatsapp` (52 + número, sin
espacios). Con el de ejemplo, el botón de pedido no llega a ningún lado.

⚠️ Cambia también `config.almacen` por el nombre del negocio. Es el
nombre con el que se guardan el pedido, el idioma y el tema en el teléfono
del cliente: si dos menús publicados en el mismo dominio comparten ese
nombre, se mezclarían los pedidos entre ellos.

### 2. El inglés — `assets/js/idiomas.js`

Los textos de la interfaz ya vienen traducidos. Sólo hay que traducir el
menú del negocio, en la parte de abajo del archivo:

```js
'entradas/Guacamole de la casa': {
  nombre: 'House Guacamole',
  desc: 'Avocado, tomato, onion and cilantro, with tortilla chips.' },
```

La clave es `idDeLaCategoria/Nombre en español`. Si a un platillo le falta
su traducción, se muestra en español y el resto sigue funcionando.

¿El negocio no necesita inglés? Pon `preguntarIdioma: false` en `datos.js`.

### 3. Las calificaciones — correo al negocio

Al final del menú aparece el botón **Califícanos**: el cliente da de 1 a 5
estrellas, puede dejar un comentario y su correo, y todo le llega al dueño
por correo electrónico. Es el mismo mecanismo del formulario de contacto de
Zyncosoft: **Cloudflare Pages Function + Resend**.

La llave de Resend nunca viaja al navegador; el correo lo manda el servidor
desde `functions/api/calificacion.js`. Para que funcione, en el panel de
Cloudflare Pages → *Settings → Environment variables*:

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | La llave secreta de Resend |
| `CORREO_DESTINO` | A dónde llegan las calificaciones (el correo del negocio) |
| `CORREO_FROM` | Remitente verificado en Resend |
| `NOMBRE_NEGOCIO` | Sale en el asunto del correo |

El correo llega con las estrellas grandes y un color según la nota: verde si
es buena, ámbar si es regular y rojo si es mala, para verlo de un vistazo en
la bandeja. Si el cliente dejó su correo, se puede responder directamente
desde ahí.

Detalles ya resueltos: hay un campo trampa contra bots, el comentario y los
datos se recortan a un tamaño máximo, y a la misma persona no se le vuelve a
pedir calificación hasta 12 horas después.

Para quitar el botón: `calificaciones: false` en `datos.js`.

⚠️ Si el menú se publica en un hosting sin funciones (sólo archivos), el
botón aparece pero el envío falla y el cliente ve un aviso de error. O se
publica en Cloudflare Pages, o se apaga con `calificaciones: false`.

### 4. Las fotos — `assets/img/platillos/`

Un archivo `.webp` por platillo, con el mismo nombre que pusiste en `img`.
Recomendado: máximo 640 px de ancho, fondo recortado si se puede.

Los platillos sin foto salen con un monograma en rombo, así que se puede
publicar el menú antes de tener la sesión de fotos.

### 5. El logotipo y los textos de portada — `index.html`

Busca los comentarios `⚠️ CAMBIAR`. Son cuatro cosas: el título de la
página, el nombre en la barra de arriba, y el rombo del logotipo (arriba y
en el pie). Si el negocio tiene logotipo propio, se sustituye el `<svg>`
por `<img class="rombo" src="assets/img/logo.png" alt="...">`.

### 6. Los colores — `assets/css/estilos.css`

Al inicio del archivo, en `:root`. Ahí están el color del papel, la tinta y
el acento. Más abajo, en `:root[data-tema="oscuro"]`, los mismos colores
para el modo oscuro.

## Lo que ya viene resuelto

- Navegación por categorías: tira deslizable al pie en celular, barra
  lateral en escritorio, con resaltado automático de la sección visible.
- Buscador que ignora acentos y encuentra en español e inglés a la vez.
- Ficha ampliada al tocar un platillo, con tamaños y cantidad.
- Pedido con total en vivo, guardado en el teléfono y envío por WhatsApp.
- Se puede apagar el pedido y dejar el menú de sólo consulta
  (`pedidos: false`, o `index.html?pedidos=off`).
- Modo claro y oscuro.
- Pie con el crédito de Zyncosoft.

## Antes de publicar

- [ ] WhatsApp real en `datos.js`
- [ ] `config.almacen` con el nombre del negocio
- [ ] Variables de Resend en Cloudflare, si se usan las calificaciones
- [ ] Nombre, dirección y redes del negocio
- [ ] Precios revisados con el cliente
- [ ] Logotipo cambiado en `index.html` (arriba y en el pie)
- [ ] Título y descripción de la página (salen en Google y al compartir)
- [ ] Probado en un celular de verdad, no sólo en la computadora
