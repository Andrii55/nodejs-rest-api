const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

// const PORT = process.env.PORT || 3000;
const MONGO_CONNECTIONNS_STRING = process.env.MONGO_CONNECTIONNS_STRING;

mongoose
  .connect(MONGO_CONNECTIONNS_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((connection) => {
    mongoose.set("strictQuery", true);
    console.log(
      `Connection with BD is stablished: Host [${connection.connections[0].host}]`
    );
    app.listen(3000, () => {
      console.log(`Connection with DB is stablished. Host: 3000...`);
    });
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
