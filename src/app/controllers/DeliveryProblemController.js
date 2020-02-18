import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Mail from '../../lib/Mail';

class DeliveryProblemController {
    async index(req, res) {
        const deliveries = await DeliveryProblem.findAll();
        return res.json(deliveries);
    }

    async store(req, res) {
        const { delivery_id, description } = req.body;
        const deliveryProblem = await DeliveryProblem.create({
            delivery_id,
            description
        });

        return res.json(deliveryProblem);
    }

    async indexBydeliveryId(req, res) {
        const { id } = req.params;
        const deliveries = await DeliveryProblem.findAll({
            where: { delivery_id: id }
        });

        return res.json(deliveries);
    }

    async cancel(req, res) {
        const { id } = req.params;
        const problem = await DeliveryProblem.findByPk(id);
        const deliveryToCancel = await Delivery.findByPk(problem.delivery_id);

        if (deliveryToCancel.canceled_at) {
            return res
                .status(400)
                .json({ error: 'This delivery is already canceled.' });
        }

        deliveryToCancel.canceled_at = new Date();
        await deliveryToCancel.save();

        await Mail.sendMail({
            to: 'Support | Fastfeet <fastfeet@fastfeet.com.br>',
            subject: 'Delivered was canceled!',
            text: 'Hello, PLease check the details here to manage request.'
        });

        return res.json(deliveryToCancel);
    }
}

export default new DeliveryProblemController();
