import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

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

    return res.json(helpOrder);
  }
}

export default new AnswerController();
