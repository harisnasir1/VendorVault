const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const userRoutes= require("./Routes/UserRoute")
const OrderRoutes=require("./Routes/OrderRoutes")
const ItemRoutes=require("./Routes/ItemRoutes")
const CustomerRoutes=require("./Routes/CustomerRoutes")
const StockXRoutes=require("./Routes/StockxRoutes")
app.use(express.json()); 
app.use(cors({ origin: "*" }));
const DB_ConnectDB = require("./utils/DBconnect"); 

DB_ConnectDB();


app.use("/api/users", userRoutes);
app.use("/api/orders",OrderRoutes);
app.use("/api/item",ItemRoutes);
app.use("/api/customers",CustomerRoutes);
app.use("/api/Stockx/",StockXRoutes)
console.log(process.env.PORT)
const Port = process.env.PORT;
app.listen(Port, () => {
  console.log(`server is listing on ${Port}`);
});
