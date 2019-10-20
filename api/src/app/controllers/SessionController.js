import User from '../models/User';

class SessionController {
  async store(req, res) {
    // const { email } = req.body;

    // const checkEmail = await User.findOne({ where: { email } });

    // if (!checkEmail) {
    //   return res.status(400).json({ error: { message: 'User not found.' } });
    // }

    // const { id, name, provider } = await User.create(req.body);

    return res.json({
      token: true,
    });
  }
}

export default new SessionController();
