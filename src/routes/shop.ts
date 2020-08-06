import express, {Request, Response} from 'express';
import * as adminData from './admin';

const router = express.Router();

router.get('/', (req:Request, res: Response) => {
    const products = adminData.products;
    res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'});
});


export { router as shopRoutes }