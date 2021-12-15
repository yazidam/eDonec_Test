const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://ahmed:ahmed@e-commerce.jyqpn.mongodb.net/eDonec_DB?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host} 😃`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
