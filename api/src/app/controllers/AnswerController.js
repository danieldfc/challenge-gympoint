import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import User from '../models/User';

import Mail from '../../lib/Mail';

class AnswerController {
  async store(req, res) {
    const { help_order_id } = req.params;

    const helpOrder = await HelpOrder.findByPk(help_order_id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(400).json({
        error: 'Help Order does not exists!',
      });
    }

    if (helpOrder.answer !== null) {
      return res.status(400).json({
        error: 'Help Order already answered!',
      });
    }

    const { answer } = req.body;
    await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    const user = await User.findByPk(req.userId);

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: `RE: ${helpOrder.question}`,
      template: 'AnswerMail',
      context: {
        student_name: helpOrder.student.name,
        description: helpOrder.question,
        provider: user.name,
        answer: helpOrder.answer,
      },
    });

    return res.json(helpOrder);
  }
}

export default new AnswerController();
