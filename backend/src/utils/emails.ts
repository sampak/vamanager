import { config } from 'src/config';

import * as sgMail from '@sendgrid/mail';

enum Templates {
  REGISTRATION_CODE = 'd-7c9eee9a83aa46e7bdf9cbd5a05ae505',
  INVITATION = 'd-d86084bdda824befb550150c895423a4',
  IN_REVIEW_PIREP = 'd-1e22b273991b4ab5b5a729784d364f40',
  ACCEPTED_PIREP = 'd-92de9fa7e472408e84dad7c4525dc26f',
  REJECTED_PIREP = 'd-936d2d74b02c41bda4faa4b75fdbbf93',
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
