const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");

dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/users", userRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`serveur runnig in port ${PORT} 😆`));
// console.log("test ");
