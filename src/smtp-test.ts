import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function main() {
  try {
    const info = await transporter.sendMail({
      from: `"Vivero Quilino" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,    // te enviás a vos misma para probar
      subject: "Prueba SMTP desde backend",
      text: "Hola Rocío, si recibís esto, SMTP funciona 🎉"
    });

    console.log("Email enviado:", info.messageId);
  } catch (err) {
    console.error("ERROR EN SMTP:", err);
  }
}

main();
