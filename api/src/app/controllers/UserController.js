class UserController {
  async store(req, res) {
    return res.json({ id: true });
  }
}

export default new UserController();
