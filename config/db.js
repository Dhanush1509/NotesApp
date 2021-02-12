const mongoose = require("mongoose");
const config = require("config");
const DB_CONNECT = async () => {
  try {
    mongoose.connect(
    config.get("mongoURI") ,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log("Database 😊");
  } catch (err) {
      console.error(err.message);
      process.exit(1);
  }
};
module.exports=DB_CONNECT;