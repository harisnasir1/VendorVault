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
    const orders = await Order.find().populate("items").populate("stockxitem");
    const columnOrder = [
      "NewLead",
      "NeedToSource",
      "Offered",
      "WarmLead",
      "Won",
      "Lost",
    ];
    const tasks={};
    const columns={}
    let tcounter=1;
 
    columnOrder.forEach(col => {
      columns[col]={
        id:col,
        title:col,
        taskIds:[]
      }
    });


    orders.forEach((data)=>{
      const counter=tcounter++;
      tasks[counter]={
        id:counter,
        _id:data._id,
        Name:data.Name,
        stockxitem:data.stockxitem,
        shopifycustomerid:data.shopifycustomerid,
        cusid:data.cusid,
        size:data.size,
        condition:data.condition,
        stage:data.stage,
        createdAt:data.createdAt,
      }

    
      const stage=data.stage || "NewLead";
      if(columns[stage])
      {
        columns[stage].taskIds.push(counter)
      }

    })

 
    const maporderdata={
      tasks,
      columns,
      columnOrder
    }


   
    



    res.status(200).json(maporderdata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getnumberofleads=async(req,res)=>{
try{
    const n=await Order.countDocuments({stage:{ $ne: 'Lost' }});
   
  
    res.status(201).json({data:n})
}
catch(err)
{
  res.json(500).json({message:"error in getting the numbers of leads"})
}
}

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

exports.UpdateStages=async(req,res)=>{
  const {taskid,newstage}=req.body;
     
  try{

  const re=await  Order.updateOne({_id:taskid._id},
      {
        $set:{
          stage:newstage
        }
      }
    )


    res.status(201).json({message:"ok on updating kanban order stage"})

  }
  catch{
    res.status(500).json({message:"error on updating kanban order stage"})
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};