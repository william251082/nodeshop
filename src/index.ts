import mongoose from "mongoose";
import {config} from "./config/dev";
import {app} from "./app";
import {User} from "./models/user";

const start = async () => {
    try {
      await mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
      const user  = await User.findOne();
      if (!user) {
          const user = new User({
          name: 'Will',
          email: 'test@test.com',
          cart: {
            items: []
          }
        });
        await user.save();
      }
      app.listen(3000, () => {
                console.log('Listening on port 3000, nodeshop')
            });
    } catch (err) {
        console.error(err);
        throw (err);
    }
    console.log('app started');
};

start();