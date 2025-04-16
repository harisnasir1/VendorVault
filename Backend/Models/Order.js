const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Orderrecived:{
        type:Date
    },
    ordersend:{
        type:Date
    },
    items:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Item",
    },
    stockxitem:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:"StockxDatabase",
  },
  shopifycustomerid:{
    type:String,
    default:null,
  },
  cusid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer",
    default:null,
  },
  size:{
    type:String,
  },
  condition:{
    type:String,
  },
  stage: {
    type: String,
    enum: ["NewLead", "NeedToSource", "Offered", "WarmLead", "Won", "Lost"],
    default: "NewLead",
  },
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  }
  },
  { timestamps: true } 
);
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
