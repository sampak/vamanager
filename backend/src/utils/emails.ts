import { config } from 'src/config';

import * as sgMail from '@sendgrid/mail';

enum Templates {
  REGISTRATION_CODE = 'd-7c9eee9a83aa46e7bdf9cbd5a05ae505',
  INVITATION = 'd-d86084bdda824befb550150c895423a4',
}

sgMail.setApiKey(config.email.apikey);

const sendEmail = async <T>(to, templateId: Templates, data: T) => {
  const msg = {
    from: config.email.from,
    to: to,
    templateId: templateId,
    dynamicTemplateData: data,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email to: ` + to + ' template: ' + templateId + ' sended');
  } catch (e) {
    console.log(`Email Error: `, to, templateId, data, e);
    console.log(e.response.body);
  }
};
export default {
  Templates,
  sendEmail,
};
