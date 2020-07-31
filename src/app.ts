import express, {Request, Response, NextFunction} from 'express';
import {addProductRouter} from "./routes/add-product";

const app = express();

app.use('/', (req:Request, res: Response, next: NextFunction) => {
   console.log('This always runs');
   next();
});

app.use(addProductRouter);

app.use('/', (req:Request, res: Response) => {
   console.log('in another the middleware');
    res.send('<h1>Hi from express</h1>')
});

export { app }
