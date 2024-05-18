import { mongooseConnect } from "@/lib/mongoose";
import { cards } from "@/models/cards";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
  
    switch (method) {
      case 'GET':
        if (req.query?.id) {
          res.json(await cards.findOne({ _id: req.query.id }));
        } else {
          res.json(await cards.find());
        }
        break;
      case 'DELETE':
        if (req.query?.id) {
          await cards.deleteOne({ _id: req.query.id });
          res.json({ message: 'Order deleted successfully' });
        } else {
          res.status(400).json({ message: 'No order id provided' });
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }