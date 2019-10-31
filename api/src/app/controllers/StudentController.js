import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const { email } = req.body;

    const checkStudent = await Student.findOne({ where: { email } });

    if (checkStudent) {
      return res
        .status(400)
        .json({ error: { message: 'Student already exists.' } });
    }

    const { id, name, age, weight, height } = await Student.create(req.body);

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

    if (email) {
      const checkStudent = await Student.findOne({ where: { email } });

      if (checkStudent) {
        return res.status(401).json({
          error: { message: 'Student already exists with this email.' },
        });
      }
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: { message: 'Student not found.' } });
    }

    await student.save(req.body);

    return res.json(student);
  }
}

export default new StudentController();
