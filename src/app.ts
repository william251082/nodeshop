import express from 'express';
import 'express-async-errors';
import bodyParser from "body-parser";
import {adminRoutes} from "./routes/admin";
import {shopRoutes} from "./routes/shop";
import * as path from "path";
import {notFoundError} from "./errors/not-found-error";
import {pool_promise} from "./util/database";

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

pool_promise.execute('SELECT * FROM products')
    .then((result: any) => { console.log(result) })
    .catch((err: any) => { console.log(err) });

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundError);

export { app }
