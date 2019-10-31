import User from '../models/User';
import PlanManagement from '../models/PlanManagement';

class PlanManagementController {
  async index(req, res) {
    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.provider) {
      return res
        .status(401)
        .json({ error: { message: "User isn't provider." } });
    }

    const plans = await PlanManagement.findAll();

    if (!plans) {
      return res.status(400).json({ error: { message: 'Plans not found!' } });
    }

    return res.json(plans);
  }

  async store(req, res) {
    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.provider) {
      return res
        .status(401)
        .json({ error: { message: "User isn't provider." } });
    }

    const { title, duration, price } = await PlanManagement.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.provider) {
      return res
        .status(401)
        .json({ error: { message: "User isn't provider." } });
    }

    const { id } = req.body;

    const plan = await PlanManagement.findByPk(id);

    if (!plan) {
      return res
        .status(400)
        .json({ error: { message: 'Plan management not found' } });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.provider) {
      return res
        .status(401)
        .json({ error: { message: "User isn't provider." } });
    }

    const { id } = req.params;

    const plan = await PlanManagement.findByPk(id);

    if (!plan) {
      return res
        .status(400)
        .json({ error: { message: 'Plan management not found.' } });
    }

    await plan.destroy();

    return res.json();
  }
}

export default new PlanManagementController();
