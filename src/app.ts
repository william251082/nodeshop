import express, {Request, Response} from 'express';
import 'express-async-errors';
import bodyParser from "body-parser";
import {adminRoutes} from "./routes/admin";
import {shopRoutes} from "./routes/shop";
import {NotFoundError} from "./errors/not-found-error";

const app = express();

app.use(bodyParser.urlencoded());

app.use(adminRoutes);
app.use(shopRoutes);

app.use('/', (req:Request, res: Response) => {
    const not_found_error = new NotFoundError();
    res.status(404).send(not_found_error.htmlErrors())
});

export { app }
