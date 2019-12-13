import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { user, student, helpOrder } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Send help',
      template: 'HelpOrderMail',
      context: {
        username: user.name,
        student_name: student.name,
        description: helpOrder.question,
      },
    });
  }
}

export default new HelpOrderMail();
