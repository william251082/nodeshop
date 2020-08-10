import {app} from "./app";
import {Product} from "./models/product";
import {User} from "./models/user";
import {sequelize} from "./util/database";
import {Cart} from "./models/cart";
import {CartItem} from "./models/cart-item";
import {Order} from "./models/order";
import {OrderItem} from "./models/order-item";

const start = () => {
    console.log('app started');
};

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    // .sync({ force: true }) // force only on dev
    .sync()
    .then((result: any) => {
        // console.log(result);
        return User.findByPk(1);
    })
    .then((user: any) => {
        if(!user) {
            return User.create({ name: 'Max', email: "test@test.com" })
        }
        return user;
    })
    .then((user: any) => {
        return user.getCart();
    })
    .then((user: any) => {
        app.listen(3001, () => {
            console.log('Listening on port 3001, nodeshop')
        });
    })
    .catch((err: any) => {
        console.log(err)
    });

start();