import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class StudentHelpController {
  async index(req, res) {
    const helpOrder = await HelpOrder.findAll({
      where: {
        answer: null,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(helpOrder);
  }
}

export default new StudentHelpController();
