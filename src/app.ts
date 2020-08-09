import express from 'express';
import 'express-async-errors';
import bodyParser from "body-parser";
import {adminRoutes} from "./routes/admin";
import {shopRoutes} from "./routes/shop";
import * as path from "path";
import {notFoundError} from "./errors/not-found-error";
import {sequelize} from "./util/database";
import {Product} from "./models/product";
import {User} from "./models/user";

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundError);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
    .sync({ force: true }) // force ony on dev
    .then((result: any) => {
        console.log(result);
    })
    .catch((err: any) => {
        console.log(err)
    });

export { app }
