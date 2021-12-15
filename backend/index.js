const express = require("express");
const app = express();

const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`serveur runnig in port ${PORT} 😆`));
// console.log("test ");
