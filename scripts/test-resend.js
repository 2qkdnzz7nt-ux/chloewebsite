
require('dotenv').config();
const { Resend } = require('resend');

// 使用 .env 里的 Key
const resend = new Resend(process.env.RESEND_API_KEY);

(async function () {
  console.log("Attempting to send email...");
  try {
    const data = await resend.emails.send({
      // Using subdomain for better deliverability
      from: 'Chloe Website <hello@mail.chloehuang.net>', 
      to: 'fionalau1977@outlook.com', 
      subject: 'Manual Test Email',
      html: '<h1>Hello Fiona!</h1><p>If you see this, Resend API is working perfectly with your new domain.</p>'
    });

    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
})();
