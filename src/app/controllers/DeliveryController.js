import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Mail from '../../lib/Mail';

class DeliveryController {
    async index(req, res) {
        return res.json({ ok: true });
    }

    async indexByDeliveryMan(req, res) {
        const { id } = req.params;

        const deliveries = await Delivery.findAll({
            where: {
                deliveryman_id: id,
                start_date: {
                    [Op.not]: null
                }
            }
        });
        if (!deliveries.length) {
            return res.status(400).json({ error: 'No deliveries found' });
        }

        return res.json(deliveries);
    }

    async store(req, res) {
        // const { recipient_id, deliveryman_id, product, start_date } = req.body;

        const delivery = await Delivery.create(req.body);

        await Mail.sendMail({
            to: 'Guerlak | Fastfeet <fastfeet@fastfeet.com.br>',
            subject: 'An order was created!',
            text: 'order created text text'
        });

        return res.json(delivery);
    }

    async update(req, res) { }

    async delete(req, res) { }
}

export default new DeliveryController();
