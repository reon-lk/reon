const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const dbConnection = require("./config/db");

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/users/mypage", require("./routes/pageRoutes"));
app.use("/api/users/mypage", require("./routes/ownerRoutes"));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Node JS server started i port ${port}`));
