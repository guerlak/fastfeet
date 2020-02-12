import Deliver from '../models/Deliver';

const yup = require('yup');

class DeliverController {
    async index(req, res) {
        const deliveries = await Deliver.findAll();
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

        const deliver = await Deliver.create(req.body);

        return res.json(deliver);
    }
}

export default new DeliverController();
