import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';
import { config } from 'src/config';
enum Templates {
  REGISTRATION_CODE = 'registration-code.ejs',
}

const cvTemplatesPath = '../email-templates';

async function generateTemplate(templateName: Templates, data) {
  const pathToTemplate = path.resolve(
    __dirname,
    '../',
    cvTemplatesPath,
    templateName
  );
  const html = await ejs.renderFile(pathToTemplate, data);
  return html;
}

async function sendEmail(templateName, data, to, subject) {
  try {
    const template = await generateTemplate(templateName, data);

    let transporter = null;

    if (config.develop) {
      let testAccount = await nodemailer.createTestAccount();

      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    }

    if (!config.develop) {
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,

          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: config.email.from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: template, // plain text body
      html: template, // html body
    });
    console.log('Message sent: %s', info.messageId);
    if (config.develop) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default {
  Templates,
  generateTemplate,
  sendEmail,
};
