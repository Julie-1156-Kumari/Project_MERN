const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const { SENDGRID_API_KEY } = process.env;

function replaceContent(content, creds) {
  let allKeysArr = Object.keys(creds);
  allKeysArr.forEach(function (key) {
    content = content.replace(`#{${key}}`, creds[key]);
  });
  return content;
}

async function EmailHelper(templateName, receiverEmail, creds) {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    let content = await fs.promises.readFile(templatePath, "utf-8");
    const emailDetails = {
      to: receiverEmail,
      from: "kumari1990julie@gmail.com",
      subject: "Mail from BMS Shows",
      text: `Hi ${creds.name}, this is your reset otp ${creds.otp}`,
      html: replaceContent(content, creds),
    };

    const transportDetails = {
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      requireTLS: true,
      tls: {
        rejectUnauthorized: false, // <-- allow self-signed certs
      },
      auth: {
        user: "apikey",
        pass: SENDGRID_API_KEY,
      },
    };
    
    
    const transporter = nodemailer.createTransport(transportDetails);
    await transporter.sendMail(emailDetails);
  } catch (err) {
    console.log(err);
  }
}

module.exports = EmailHelper;
