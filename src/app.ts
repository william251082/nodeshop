import express, {Request, Response} from 'express';
import 'express-async-errors';
import bodyParser from "body-parser";
import {adminRoutes} from "./routes/admin";
import {shopRoutes} from "./routes/shop";
import * as path from "path";

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req:Request, res: Response) => {
    res.status(404).render('404', {pageTitle: 'Page not Found'});
});

export { app }
