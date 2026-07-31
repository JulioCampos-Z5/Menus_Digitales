/* =====================================================================
   MIMC — Mi Menú Carta · comportamiento de la página de presentación
   - El año del pie
   - Los códigos QR de cada menú de ejemplo
   ===================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------- año del pie */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------- códigos QR
     El QR se arma con la dirección real donde esté publicada la página,
     no con una escrita a mano: así funciona igual en la computadora,
     en el dominio de pruebas y en el definitivo, sin tocar nada.

     Los archivos abiertos con doble clic (file://) no sirven para un QR
     —esa ruta sólo existe en esa computadora—, así que ahí se avisa. */

  var contenedores = document.querySelectorAll('[data-qr]');
  if (!contenedores.length) return;

  var esArchivoLocal = location.protocol === 'file:';

  contenedores.forEach(function (caja) {
    var destino;
    try {
      destino = new URL(caja.dataset.qr, location.href).href;
    } catch (e) {
      destino = '';
    }

    if (esArchivoLocal || !destino || typeof QRCode === 'undefined') {
      avisar(caja);
      return;
    }

    try {
      new QRCode(caja, {
        text: destino,
        width: 320,
        height: 320,
        colorDark: '#11141a',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
      caja.setAttribute('role', 'img');
      caja.setAttribute('aria-label', 'Código QR de ' + (caja.dataset.qrNombre || destino));
    } catch (e) {
      avisar(caja);
    }
  });

  function avisar(caja) {
    caja.classList.add('qr-sin');
    caja.textContent = esArchivoLocal
      ? 'El QR aparece al publicar la página'
      : 'QR no disponible';
  }

})();
