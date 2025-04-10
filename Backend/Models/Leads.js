const mongoose = require("mongoose");

const LeadsSchema = new mongoose.Schema(
  {
   NewLead:{
  type:[mongoose.Schema.Types.ObjectId],
   ref:"Order",
   },
   NeedtoSource:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"Order"
   },
   Offered:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"Order"
   },
   WarmLead:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'Order'
   },
   Won:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'Order'
   },
   Lost:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:''
   }

  },
  { timestamps: true } 
);
const Item = mongoose.model("Leads", LeadsSchema);
module.exports = Item;
