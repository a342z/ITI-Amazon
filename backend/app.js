require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
// const asyncHandler = require("express-async-handler");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("tiny"));

//CORS
 app.use(cors());
 app.use((request, response, next) => {
   response.header("Access-Control-Allow-Origin", "*");
   response.header(
     "Access-Control-Allow-Methods",
     "GET,POST,DELETE,PUT,OPTIONS"
  );
   response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
   next();
 });

//Connect to DB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("DB Error.");
  });

//Listen To port
app.listen(process.env.PORT_NUMBER);

//Import Routes
const authenticationRouter = require("./routes/authRouter");

const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const cartRouter = require("./routes/cartRouter");
const adminRouter = require("./routes/adminRouter");
const orderRouter = require("./routes/orderRouter");
const payRouter = require("./routes/payRouter");
// const message = require("./routes/messageRouter");

app.use("/payment", payRouter);
app.use(authenticationRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(cartRouter);
// app.use(message);


app.use("/orders", orderRouter);
app.use("/admin", adminRouter);

//Not found MW
app.use((request, response) => {
  response.status(404).json({ data: "Not Found" });
});

//Error MW
app.use((error, request, response, next) => {
  //JS  code function.length
  let status = error.status || 500;
  response.status(status).json({ Error: error + "" });
});
