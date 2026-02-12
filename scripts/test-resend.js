
require('dotenv').config();
const { Resend } = require('resend');

async function main() {
  console.log("Checking Resend configuration...");
  if (!process.env.RESEND_API_KEY) {
    console.error("ERROR: RESEND_API_KEY is not configured.");
    return;
  }
  
  console.log(`API Key found: ${process.env.RESEND_API_KEY.substring(0, 5)}...`);

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    console.log("Attempting to send test email via Resend...");
    const { data, error } = await resend.emails.send({
      from: 'Chloe Website <onboarding@resend.dev>',
      to: 'delivered@resend.dev', // Default test email for Resend
      subject: 'Test Email from Chloe Website',
      html: '<strong>It works!</strong>',
    });

    if (error) {
      console.error("Resend Error:", error);
      return;
    }

    console.log("Email sent successfully!");
    console.log("ID:", data.id);
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

main();
