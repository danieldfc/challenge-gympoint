import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const {
      student: { name, email },
    } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Welcome of Gympoint',
      template: 'WelcomeMail',
      context: {
        student: name,
      },
    });
  }
}

export default new WelcomeMail();
