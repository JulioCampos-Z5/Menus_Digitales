/**
 * Recibe la calificación del cliente y manda el correo con Resend.
 *
 * Vive en el servidor de Cloudflare, no en el navegador: por eso la llave
 * de Resend nunca queda expuesta en el código que descarga el visitante.
 * Es el mismo mecanismo que usa el formulario de contacto de Zyncosoft.
 *
 * Variables de entorno (panel de Cloudflare → Settings → Environment variables):
 *   RESEND_API_KEY   obligatoria, la llave secreta de Resend
 *   CORREO_DESTINO   a dónde llegan las calificaciones (el correo del negocio)
 *   CORREO_FROM      remitente verificado en Resend
 *   NOMBRE_NEGOCIO   sale en el asunto del correo
 *
 * Si el menú se publica en un hosting sin funciones (sólo archivos), este
 * archivo no se ejecuta y el botón de calificar avisa que no se pudo
 * enviar. Para que funcione hay que publicarlo en Cloudflare Pages.
 */

const MAX = {
  nombre: 120,
  correo: 160,
  comentario: 2000,
  platillo: 160,
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const limpiar = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Evita que alguien inyecte encabezados extra en el asunto del correo */
const unaLinea = (v) => v.replace(/[\r\n]+/g, ' ');

const escapar = (v) =>
  v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) {
    console.error('Falta la variable RESEND_API_KEY');
    return json({ ok: false, error: 'config' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'json' }, 400);
  }

  // Bot detectado: le respondemos "ok" para que no insista ni aprenda
  if (limpiar(body.website, 200)) return json({ ok: true });

  const estrellas = Number(body.estrellas);
  if (!Number.isInteger(estrellas) || estrellas < 1 || estrellas > 5) {
    return json({ ok: false, error: 'estrellas' }, 400);
  }

  const nombre = limpiar(body.nombre, MAX.nombre);
  const correo = limpiar(body.correo, MAX.correo);
  const comentario = limpiar(body.comentario, MAX.comentario);
  const platillo = limpiar(body.platillo, MAX.platillo);

  // El correo es opcional, pero si lo escriben debe ser válido
  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
    return json({ ok: false, error: 'correo' }, 400);
  }

  const negocio = env.NOMBRE_NEGOCIO || 'el menú';
  const destino = env.CORREO_DESTINO;
  if (!destino) {
    console.error('Falta la variable CORREO_DESTINO');
    return json({ ok: false, error: 'config' }, 500);
  }
  const remitente = env.CORREO_FROM || 'Calificaciones <onboarding@resend.dev>';

  const fecha = new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  }).format(new Date());

  const estrellasTexto = '★'.repeat(estrellas) + '☆'.repeat(5 - estrellas);
  const juicio = ['Muy mala', 'Mala', 'Regular', 'Buena', 'Excelente'][estrellas - 1];

  const filas = [
    ['Calificación', `${estrellas} de 5 — ${juicio}`],
    ['Quién califica', nombre || 'Prefirió no decirlo'],
    ['Correo', correo || 'No lo dejó'],
    ['Lo que más le gustó', platillo || 'No lo indicó'],
    ['Recibida', fecha],
  ];

  // Verde cuando es buena, ámbar si es regular, rojo si es mala:
  // así se ve de un vistazo en la bandeja
  const color = estrellas >= 4 ? '#1f9d55' : estrellas === 3 ? '#c8891a' : '#c0392b';

  const celdaEtiqueta =
    'padding:10px 16px 10px 0;color:#8a8a8a;font-size:13px;white-space:nowrap;vertical-align:top';
  const celdaValor = 'padding:10px 0;font-size:15px;color:#111';

  const html = `<!doctype html>
<html lang="es"><body style="margin:0;padding:24px 12px;background:#f2f2f2">
  <!-- Resumen que aparece en la bandeja, antes de abrir -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapar(
    `${estrellas}/5 — ${comentario || 'sin comentario'}`,
  ).slice(0, 140)}</div>

  <table role="presentation" width="100%" style="border-collapse:collapse">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;border-collapse:collapse;background:#fff;border-radius:14px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">

        <tr><td style="background:#16130f;padding:20px 28px">
          <p style="margin:0;color:${color};font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Nueva calificación</p>
          <p style="margin:4px 0 0;color:#fff;font-size:19px;font-weight:600">${escapar(negocio)}</p>
        </td></tr>

        <tr><td align="center" style="padding:26px 28px 6px">
          <p style="margin:0;font-size:34px;letter-spacing:4px;color:${color}">${estrellasTexto}</p>
          <p style="margin:6px 0 0;font-size:15px;color:#8a8a8a">${estrellas} de 5 · ${juicio}</p>
        </td></tr>

        <tr><td style="padding:18px 28px 8px">
          <table role="presentation" style="border-collapse:collapse;width:100%">
            ${filas
              .map(
                ([k, v], i) =>
                  `<tr${i ? ' style="border-top:1px solid #f0f0f0"' : ''}>
                     <td style="${celdaEtiqueta}">${k}</td>
                     <td style="${celdaValor}"><strong>${escapar(v)}</strong></td>
                   </tr>`,
              )
              .join('')}
          </table>
        </td></tr>

        <tr><td style="padding:16px 28px 0">
          <p style="margin:0 0 8px;color:#8a8a8a;font-size:13px">Su comentario</p>
          <div style="white-space:pre-wrap;padding:16px 18px;background:#fafafa;border-left:3px solid ${color};border-radius:0 8px 8px 0;font-size:15px;line-height:1.6;color:#111">${
            escapar(comentario) ||
            '<span style="color:#aaa">No escribió comentario.</span>'
          }</div>
        </td></tr>

        ${
          correo
            ? `<tr><td style="padding:24px 28px 28px">
          <a href="mailto:${escapar(correo)}?subject=${encodeURIComponent(
            `Gracias por tu comentario`,
          )}"
             style="display:inline-block;background:#16130f;color:#fff;font-weight:700;font-size:15px;text-decoration:none;padding:13px 26px;border-radius:999px">
            Agradecer${nombre ? ` a ${escapar(nombre.split(' ')[0])}` : ''}
          </a>
          <p style="margin:14px 0 0;color:#9a9a9a;font-size:12px;line-height:1.5">
            También puedes contestar este correo directamente: la respuesta le llega a ${escapar(correo)}.
          </p>
        </td></tr>`
            : `<tr><td style="padding:24px 28px 28px">
          <p style="margin:0;color:#9a9a9a;font-size:12px;line-height:1.5">
            No dejó correo, así que esta calificación no se puede responder.
          </p>
        </td></tr>`
        }
      </table>
    </td></tr>
  </table>
</body></html>`;

  // Versión en texto: mejora la entrega y es lo que se ve en relojes y modo sin imágenes
  const texto = [
    `NUEVA CALIFICACIÓN — ${negocio}`,
    '',
    `${estrellasTexto}  (${estrellas} de 5, ${juicio})`,
    '',
    ...filas.map(([k, v]) => `${k}: ${v}`),
    '',
    'Comentario:',
    comentario || '(no escribió comentario)',
  ].join('\n');

  const envio = {
    from: remitente,
    to: [destino],
    subject: `${estrellas}★ Calificación de ${unaLinea(nombre) || 'un cliente'} — ${unaLinea(negocio)}`,
    html,
    text: texto,
  };
  // Así, al responder el correo le contestas directo al cliente
  if (correo) envio.reply_to = correo;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(envio),
  });

  if (!res.ok) {
    console.error('Resend respondió', res.status, await res.text());
    return json({ ok: false, error: 'envio' }, 502);
  }

  return json({ ok: true });
}
