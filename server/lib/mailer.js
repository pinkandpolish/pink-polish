// Nodemailer configuration for Zoho Mail SMTP with timeouts
const nodemailer = require('nodemailer');

// Recommended timeouts to avoid hanging on network issues
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, // set in .env
    pass: process.env.EMAIL_PASS  // set in .env
  },
  // Connection timeouts (ms)
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
  tls: {
    // Allow self-signed certs if present in some environments; Zoho should have valid certs.
    rejectUnauthorized: false
  }
});

// Export a safe sendMail wrapper that returns a Promise
const sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error('sendmail_timeout'));
      }
    }, 20000);

    transporter.sendMail(mailOptions, (err, info) => {
      clearTimeout(timer);
      if (settled) return;
      settled = true;
      if (err) return reject(err);
      resolve(info);
    });
  });
};

module.exports = { sendMail, transporter };
