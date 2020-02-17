import { parseISO, getHours } from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';

class StartEndDeliveryController {
    async start(req, res) {
        const { id, start_date } = req.body;
        const delivery = await Delivery.findByPk(id);
        const parsedStartDate = parseISO(start_date);
        const dateHours = getHours(parseISO(start_date));
        const availableStartHour = 8;
        const availableEndHour = 20;

        if (!delivery) {
            return res.status(400).json({ error: 'Delivery not exist' });
        }

        if (delivery.start_date) {
            return res
                .status(400)
                .json({ error: 'Delivery has already started' });
        }

        const numberOfOrdersDay = await Delivery.count({
            where: {
                start_date: {
                    [Op.not]: null
                },
                end_date: {
                    [Op.is]: null
                }
            }
        });

        if (numberOfOrdersDay > 5) {
            return res.status(400).json({
                error: 'Only five Orders can be started only per day'
            });
        }

        if (dateHours > availableEndHour || dateHours < availableStartHour) {
            return res.json({
                error: 'Delivery can be started from 8am to 6pm.'
            });
        }

        delivery.start_date = new Date();

        const responseDelivery = await delivery.save();

        return res.json(responseDelivery);
    }

    async end(req, res) {
        const { id } = req.params;

        const delivery = await Delivery.findByPk(id);

        if (!delivery) {
            return res.status(400).json({ error: 'No delivery found.' });
        }
        if (!delivery.start_date) {
            return res.status(400).json({ error: 'Delivery hasnt started.' });
        }

        const date = new Date();
        delivery.end_date = date;
        delivery.delivery = await delivery.save();

        return res.json(delivery);
    }
}

export default new StartEndDeliveryController();
