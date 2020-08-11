import express from 'express';
import 'express-async-errors';
import bodyParser from "body-parser";
import * as path from "path";
import {notFoundError} from "./errors/not-found-error";
import {adminRoutes} from "./routes/admin";
import {shopRoutes} from "./routes/shop";

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundError);

export { app }
