import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const recipe = await Recipient.create(req.body);
        return res.json(recipe);
    }
}

export default new RecipientController();
