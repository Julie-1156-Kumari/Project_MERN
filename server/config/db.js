const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {});

const connection = mongoose.connection; // Establish the connection to the database

connection.on("connected", () => {
  console.log("Database connected successfully to Mongodb");
});
