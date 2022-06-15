import mongoose from "mongoose";

//DB connection config
export default () => mongoose.connect(
    "mongodb+srv://mskrpan:" +
      process.env.MONGO_ATLAS_PW +
      "@node-rest-shop.j2hmo.mongodb.net/myPlcDatabase?retryWrites=true&w=majority",
    { //useMongoClient: true 
  }
  );