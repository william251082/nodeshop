import {app} from "./app";
import {Product} from "./models/product";
import {User} from "./models/user";
import {sequelize} from "./util/database";

const start = () => {
    console.log('app started');
};

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

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
        console.log(user);
        app.listen(3001, () => {
            console.log('Listening on port 3001, nodeshop')
        });
    })
    .catch((err: any) => {
        console.log(err)
    });

start();