const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.name = user.name;
    this.from = process.env.EMAIL_USER;
  }

  newTransport() {
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

		transport.use('compile', hbs({
			viewEngine: {
				extName: '.hbs',
				partialsDir: path.resolve(process.cwd(), 'templates'),
				defaultLayout: false,
			},
			viewPath: path.resolve(process.cwd(), 'templates'),
			extName: '.hbs',
		}));

    return transport;
  }

  async send(template, subject, context) {
    let mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      template: template,
      context: context, // sends variables to the template
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', '🎵 Welcome to Spotify 🎧', {
      name: this.name,
      loginUrl: `${process.env.DOMAIN}${process.env.PORT != '' ? ':'+process.env.PORT : ''}/login`,
      supportUrl: `${process.env.DOMAIN}${process.env.PORT != '' ? ':'+process.env.PORT : ''}/support`
    });
  }

  async sendResetToken(token) {
    await this.send('resetToken', 'Your password reset token (valid for only 10 minutes)', {
      name: this.name,
      resetUrl: `${process.env.DOMAIN}${process.env.PORT != '' ? ':'+process.env.PORT : ''}/resetPassword?token=${token}`,
    });
  }
};
