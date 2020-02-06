import Recipients from '../models/Recipients';

class RecipientsController {
    async store(req, res) {
        const recipe = await Recipients.create(req.body);
        return res.json(recipe);
    }
}

export default new RecipientsController();
