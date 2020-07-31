import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/add-product',  (req: Request, res: Response) => {
    res.send(
        '<form action="/product" method="POST">' +
                    '<input type="text" name="title">' +
                    '<button type="submit">Submit</button>' +
              '</form>'
    )
});

export { router as addProductRouter }