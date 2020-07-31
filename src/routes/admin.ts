import express, {NextFunction, Request, Response} from 'express';

const router = express.Router();

router.get('/add-product',  (req: Request, res: Response) => {
    res.send(
        '<form action="/product" method="POST">' +
                    '<input type="text" name="title">' +
                    '<button type="submit">Submit</button>' +
              '</form>'
    )
});

router.post('/product', (req:Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.redirect('/');
});

export { router as adminRoutes }