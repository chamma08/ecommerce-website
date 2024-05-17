import { mongooseConnect } from "@/lib/mongoose";
import { Content } from "@/models/Content";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Content.findOne({ _id: req.query.id }));
        } else {
            res.json(await Content.find());
        }
    }

    if (method === 'POST') {
        const { title, body, images } = req.body;
        const contentDoc = await Content.create({
            title, body, images
        });
        res.json(contentDoc);
    }

    if (method === 'PUT') {
        const { title, body, images, _id } = req.body;
        await Content.updateOne({ _id }, { title, body, images });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Content.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }
}