import express from 'express';
import bodyParser from "body-parser";
import {adminRoutes} from "./routes/admin";
import {shopRoutes} from "./routes/shop";

const app = express();

app.use(bodyParser.urlencoded());

app.use(adminRoutes);
app.use(shopRoutes);

export { app }
