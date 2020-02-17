import DeliveryProblem from '../models/DeliveryProblem';

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
}

export default new DeliveryProblemController();
