import DeliveryMan from '../models/DeliveryMan';

const yup = require('yup');

class DeliverController {
    async index(req, res) {
        const deliveries = await DeliveryMan.findAll();
        return res.json(deliveries);
    }

    async store(req, res) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup
                .string()
                .email()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const deliver = await DeliveryMan.create(req.body);

        return res.json(deliver);
    }

    async update(req, res) {
        const schema = yup.object().shape({
            name: yup.string(),
            email: yup
                .string()
                .email()
                .required(),
            newEmail: yup.string().email()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email, newEmail, name } = req.body;
        const deliveryMan = await DeliveryMan.findOne({ where: { email } });

        if (!deliveryMan) {
            return res.status(400).json({ error: 'user not exists' });
        }

        const emailExist = await DeliveryMan.findOne({
            where: { email: newEmail }
        });

        if (emailExist) {
            return res
                .status(400)
                .json({ error: 'Email is already registered' });
        }

        const user = await deliveryMan.update({
            name,
            email: newEmail
        });

        return res.json({
            name: user.name
        });
    }

    async delete(req, res) {
        const { email } = req.query;

        const checkDeliveryMan = await DeliveryMan.findOne({
            where: { email }
        });

        if (!checkDeliveryMan) {
            return res
                .status(400)
                .json({ error: 'Deliveryman is not registered' });
        }

        await DeliveryMan.destroy({ where: { email } });

        return res.json({ ok: true });
    }
}

export default new DeliverController();
