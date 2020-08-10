import express, {NextFunction, Request, Response} from 'express';
import 'express-async-errors';
import bodyParser from "body-parser";
import {adminRoutes} from "./routes/admin";
import {shopRoutes} from "./routes/shop";
import * as path from "path";
import {notFoundError} from "./errors/not-found-error";
import {User} from './models/user';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req:any, res: Response, next: NextFunction) => {
    User.findByPk(1)
        .then((user: any) => {
            req.user = user;
            next();
        })
        .catch((err: any) => { console.log(err) });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundError);

export { app }
