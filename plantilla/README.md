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

### 3. Las fotos — `assets/img/platillos/`

Un archivo `.webp` por platillo, con el mismo nombre que pusiste en `img`.
Recomendado: máximo 640 px de ancho, fondo recortado si se puede.

Los platillos sin foto salen con un monograma en rombo, así que se puede
publicar el menú antes de tener la sesión de fotos.

### 4. El logotipo y los textos de portada — `index.html`

Busca los comentarios `⚠️ CAMBIAR`. Son cuatro cosas: el título de la
página, el nombre en la barra de arriba, y el rombo del logotipo (arriba y
en el pie). Si el negocio tiene logotipo propio, se sustituye el `<svg>`
por `<img class="rombo" src="assets/img/logo.png" alt="...">`.

### 5. Los colores — `assets/css/estilos.css`

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
- [ ] Nombre, dirección y redes del negocio
- [ ] Precios revisados con el cliente
- [ ] Logotipo cambiado en `index.html` (arriba y en el pie)
- [ ] Título y descripción de la página (salen en Google y al compartir)
- [ ] Probado en un celular de verdad, no sólo en la computadora
