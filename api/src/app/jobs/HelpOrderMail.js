import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { student, helpOrder } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Send help',
      template: 'HelpOrderMail',
      context: {
        username: student.name,
        description: helpOrder.question,
      },
    });
  }
}

export default new HelpOrderMail();
