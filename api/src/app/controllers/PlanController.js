import User from '../models/User';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.provider) {
      return res
        .status(401)
        .json({ error: { message: "User isn't provider." } });
    }

    const plans = await Plan.findAll();

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

    const { title, duration, price } = await Plan.create(req.body);

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

    const { id } = req.params;
    const { title } = req.body;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: { message: 'Plan  not found' } });
    }

    if (title !== plan.title) {
      const checkPlan = await Plan.findOne({
        where: { title },
      });

      if (checkPlan) {
        return res
          .status(400)
          .json({ error: { message: 'Plan  already exists.' } });
      }
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

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: { message: 'Plan  not found.' } });
    }

    await plan.destroy();

    return res.json();
  }
}

export default new PlanController();