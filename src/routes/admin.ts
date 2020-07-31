import express, {NextFunction, Request, Response} from 'express';
import * as path from "path";

const router = express.Router();

router.get('/add-product',  (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

router.post('/add-product', (req:Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.redirect('/');
});

export { router as adminRoutes }