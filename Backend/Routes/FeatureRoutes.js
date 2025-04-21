const express = require("express")
const router= express.Router();
const {addlabel,getlabels} = require("../Controllers/LabelController")
router.post('/addlabel',addlabel)
router.post('/getlabels',getlabels)
module.exports=router