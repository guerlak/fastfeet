import User from '../models/User';

class UserController {
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        user = await User.create(req.body);

        return res.json(user);
    }
}

export default new UserController();
