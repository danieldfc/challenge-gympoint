import { addMonths, parseISO } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async show(req, res) {
    const { id } = req.params;
    const enrollment = await Enrollment.findOne({
      where: { id },
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(enrollment);
  }

  async store(req, res) {
    const { student_id } = req.params;
    const { plan_id, start_date } = req.body;

    const checkStudent = await Student.findByPk(student_id);

    if (!checkStudent) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const checkPlan = await Plan.findByPk(plan_id);
    if (!checkPlan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const studentCheckEnrollment = await Enrollment.findOne({
      where: {
        student_id,
      },
    });
    if (studentCheckEnrollment) {
      return res
        .status(400)
        .json({ error: 'Student already enrolled in a plan' });
    }

    const end_date = addMonths(parseISO(start_date), checkPlan.duration);

    await Enrollment.create({
      plan_id,
      student_id,
      start_date,
      end_date,
      price: checkPlan.duration * checkPlan.price,
    });

    const { id, plan, student, price, active } = await Enrollment.findOne({
      where: {
        plan_id,
        student_id,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json({
      id,
      plan,
      student,
      price,
      active,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }

    const { plan_id, student_id, start_date } = req.body;
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);

    await enrollment.update({
      plan_id,
      student_id,
      start_date,
      end_date,
      price: plan.duration * plan.price,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }

    await enrollment.destroy();

    return res.send();
  }
}

export default new EnrollmentController();
