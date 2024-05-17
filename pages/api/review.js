import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";

export default async function handle(req,res){
    const { method } = req;
    await mongooseConnect();
  
    switch (method) {
      case 'GET':
        if (req.query?.id) {
          res.json(await Review.findOne({ _id: req.query.id }));
        } else {
          res.json(await Review.find());
        }
        break;
      case 'DELETE':
        if (req.query?.id) {
          await Review.deleteOne({ _id: req.query.id });
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