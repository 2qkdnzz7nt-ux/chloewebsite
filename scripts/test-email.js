
require('dotenv').config();
const nodemailer = require('nodemailer');

async function main() {
  console.log("Checking email configuration...");
  console.log(`HOST: ${process.env.EMAIL_SERVER_HOST}`);
  console.log(`PORT: ${process.env.EMAIL_SERVER_PORT}`);
  console.log(`USER: ${process.env.EMAIL_SERVER_USER}`);
  console.log(`FROM: ${process.env.EMAIL_FROM}`);

  if (!process.env.EMAIL_SERVER_HOST || process.env.EMAIL_SERVER_HOST === "smtp.example.com") {
    console.error("ERROR: EMAIL_SERVER_HOST is not configured or is using the default placeholder.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("SMTP Connection verified successfully!");

    console.log("Attempting to send test email...");
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_SERVER_USER, // Send to self for testing
      subject: "Test Email from Chloe Website",
      text: "If you see this, your email configuration is working correctly!",
      html: "<b>If you see this, your email configuration is working correctly!</b>",
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Email test passed!");
  } catch (error) {
    console.error("Email test failed!");
    console.error(error);
  }
}

main();
