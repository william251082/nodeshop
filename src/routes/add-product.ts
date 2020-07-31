import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/add-product',  (req: Request, res: Response) => {
    console.log('in another the middleware');
    res.send('<h1>Add Product</h1>')
});

export { router as addProductRouter }