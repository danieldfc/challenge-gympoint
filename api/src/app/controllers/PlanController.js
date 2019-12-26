import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    if (!plans) {
      return res.status(400).json({ error: { message: 'Plans not found!' } });
    }

    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ error: { message: 'Plan not found.' } });
    }

    const { title, duration, price } = plan;

    return res.json({
      title,
      duration,
      price,
    });
  }

  async store(req, res) {
    const { title } = req.body;

    const plan = await Plan.findOne({ where: { title } });

    if (plan && title === plan.title) {
      return res.status(400).json({
        error: {
          message: 'Title already exists',
        },
      });
    }

    const { id, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const { id: id_plan } = req.params;
    const { title } = req.body;

    const plan = await Plan.findByPk(id_plan);

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

    const { id, duration, price } = plan;

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
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
