import express, {Request, Response} from 'express';
import * as path from "path";

const router = express.Router();

router.get('/', (req:Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});


export { router as shopRoutes }