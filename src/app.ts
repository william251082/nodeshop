import express, {Request, Response} from 'express';
import 'express-async-errors';
import bodyParser from "body-parser";
import {adminRoutes} from "./routes/admin";
import {shopRoutes} from "./routes/shop";
import * as path from "path";
import {rootDir} from "./util/path";

const app = express();
console.log(__dirname)

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req:Request, res: Response) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

export { app }
