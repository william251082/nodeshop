import express from 'express';
import 'express-async-errors';
import bodyParser from "body-parser";
import * as path from "path";
import {notFoundError} from "./errors/not-found-error";
import {adminRoutes} from "./routes/admin";
import {shopRoutes} from "./routes/shop";
import {User} from "./models/user";
import {findUserById} from "./repositories/user";

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req: any, res: any, next: any) => {
  findUserById('5f324859304e0885afa09536')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundError);

export { app }
