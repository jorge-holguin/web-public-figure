import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Configurar el transporte de Nodemailer con Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Tu correo de Gmail
        pass: process.env.GMAIL_PASS, // Contraseña de aplicación de Gmail
      },
    });

    // Configurar el contenido del correo
    const mailOptions = {
      from: `"Formulario de Contacto" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_RECEIVER, // Correo que recibirá los mensajes
      subject: "Nuevo Mensaje de Contacto",
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje:\n${mensaje}`,
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
    return NextResponse.json({ error: "No se pudo enviar el correo" }, { status: 500 });
  }
}
