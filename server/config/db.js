const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const connection = mongoose.connection;
  
  connection.on("connected", () => {
    console.log(
      `MongoDB Connection Successfull!!    Database => ${process.env.DB}`
    );
  });

  connection.on("error", () => {
    console.log("MongoDB Connection Error");
  });

}
connectDB();

module.exports = mongoose;
