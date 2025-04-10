const Order = require("../Models/Order");


exports.createOrder = async (req, res) => {
  try {
    const {newOrder} = req.body;
    //console(newOrder);
 
      const or=await Order.create({
        Name: newOrder.Name,
        stockxitem:newOrder.Stockxid,
        shopifycustomerid:newOrder.clientFrom=='shopify'?newOrder.customerid:null,
        cusid:newOrder.clientFrom=='mongodb'?newOrder.customerid:null,
        size:newOrder.size,
        condition:newOrder.Condition,   
     })

     
     //add here for the customers comming form the mongodb

   return  res.status(201).json({message:or});
 
   
  } catch (error) {
    //console(error)
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};