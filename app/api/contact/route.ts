import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const CLIENT_TYPE_LABELS: Record<string, string> = {
  cliente: "Cliente",
  "no-cliente": "Aún no es cliente",
};

const PROFILE_TYPE_LABELS: Record<string, string> = {
  corporativo: "Corporativo",
  individuo: "Individuo",
  institucional: "Institucional",
};

interface ContactPayload {
  clientType: string;
  profileType: string;
  nombre: string;
  email: string;
  mensaje: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.nombre?.trim()) return "El nombre es requerido.";
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    return "El email es inválido.";
  if (!body.mensaje?.trim() || body.mensaje.trim().length < 10)
    return "El mensaje es requerido.";
  if (!body.clientType || !(body.clientType in CLIENT_TYPE_LABELS))
    return "El tipo de cliente es inválido.";
  if (!body.profileType || !(body.profileType in PROFILE_TYPE_LABELS))
    return "El perfil es inválido.";
  return null;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { clientType, profileType, nombre, email, mensaje } = body as ContactPayload;

  const fromEmail = process.env.SES_FROM_EMAIL;
  const toEmail = process.env.SES_TO_EMAIL;
  const region = process.env.AWS_REGION;

  if (!fromEmail || !toEmail || !region) {
    console.error("Faltan variables de entorno de SES (SES_FROM_EMAIL, SES_TO_EMAIL, AWS_REGION).");
    return NextResponse.json(
      { error: "El servicio de contacto no está configurado." },
      { status: 500 }
    );
  }

  const client = new SESClient({ region });

  const subject = `Nuevo contacto desde gritcg.com — ${nombre}`;
  const textBody = [
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    `¿Es cliente?: ${CLIENT_TYPE_LABELS[clientType]}`,
    `Perfil: ${PROFILE_TYPE_LABELS[profileType]}`,
    "",
    "Mensaje:",
    mensaje,
  ].join("\n");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #111;">
      <h2 style="margin-bottom: 16px;">Nuevo mensaje de contacto — GRIT Capital Group</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>¿Es cliente?:</strong> ${CLIENT_TYPE_LABELS[clientType]}</p>
      <p><strong>Perfil:</strong> ${PROFILE_TYPE_LABELS[profileType]}</p>
      <p><strong>Mensaje:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(mensaje)}</p>
    </div>
  `;

  try {
    await client.send(
      new SendEmailCommand({
        Source: fromEmail,
        Destination: { ToAddresses: [toEmail] },
        ReplyToAddresses: [email],
        Message: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: textBody, Charset: "UTF-8" },
            Html: { Data: htmlBody, Charset: "UTF-8" },
          },
        },
      })
    );
  } catch (err) {
    console.error("Error enviando email vía SES:", err);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Intentá de nuevo más tarde." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
