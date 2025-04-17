const express = require("express")
const router= express.Router();
const {addlabel} = require("../Controllers/FeaturesController")
router.post('/addlabel',addlabel)

module.exports=router