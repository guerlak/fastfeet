import User from '../models/User';

const yup = require('yup');

class UserController {
    async store(req, res) {
        const schema = yup.object().shape({
            email: yup
                .string()
                .email()
                .required(),
            password: yup
                .string()
                .required()
                .min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
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
