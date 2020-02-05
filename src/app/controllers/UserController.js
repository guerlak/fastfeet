import User from '../models/User';

class UserController {
    async store(req, res) {
        const { email, name } = req.body;

        // await User.findOne({ where: { email } });

        return res.json({ email });
    }
}

export default new UserController();
