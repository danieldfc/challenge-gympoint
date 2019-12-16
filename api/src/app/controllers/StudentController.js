import Student from '../models/Student';

import WelcomeMail from '../jobs/WelcomeMail';
import Queue from '../../lib/Queue';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();

    return res.json(students);
  }

  async store(req, res) {
    const { email } = req.body;

    const checkStudent = await Student.findOne({ where: { email } });

    if (checkStudent) {
      return res
        .status(400)
        .json({ error: { message: 'Student already exists.' } });
    }

    const { id, name, age, weight, height } = await Student.create(req.body);

    await Queue.add(WelcomeMail.key, {
      student: {
        name,
        email,
      },
    });

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const { email } = req.body;
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: { message: 'Student not found.' } });
    }

    if (email !== student.email) {
      const checkStudent = await Student.findOne({ where: { email } });

      if (checkStudent) {
        return res.status(401).json({
          error: { message: 'Student already exists with this email.' },
        });
      }
    }

    const { id, name, weight, height } = await student.save(req.body);

    return res.json({
      id,
      name,
      email,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ error: { message: 'Student not found.' } });
    }

    await student.destroy();

    return res.json();
  }
}

export default new StudentController();
