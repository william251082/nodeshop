import express, {Request, Response, NextFunction} from 'express';
import {addProductRouter} from "./routes/add-product";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(addProductRouter);

app.use('/product', (req:Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req:Request, res: Response) => {
    res.send('<h1>Hi from express</h1>')
});

export { app }
