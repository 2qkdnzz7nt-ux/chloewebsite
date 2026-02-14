
const { Resend } = require('resend');

// 使用 .env 里的 Key
const resend = new Resend('re_ZEftsDDp_PcRWxa3MneeX75RNMHPdEsqT');

(async function () {
  console.log("Attempting to send email...");
  try {
    const data = await resend.emails.send({
      from: 'Chloe Website <onboarding@resend.dev>',
      to: 'fionalau1977@outlook.com', // 必须是这个 Verify 过的邮箱
      subject: 'Manual Test Email',
      html: '<h1>Hello Fiona!</h1><p>If you see this, Resend API is working perfectly.</p>'
    });

    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
})();
