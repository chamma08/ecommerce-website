import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handle(req,res){
    const {method} = req;
    await mongooseConnect();

    if(method === 'GET'){
        if (req.query?.id) {
            res.json(await Order.findOne({id:req.query.id}));
        }else{
            res.json(await Order.find());
        }
        
    }
    

    if (method === 'DELETE'){
        if (req.query?.id){
            await Order.deleteOne({id:req.query?.id});
            res.json(true);
        }
    }
}