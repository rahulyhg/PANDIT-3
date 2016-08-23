var express=require("express"),
    router = express.Router();


//define subject routes
router.get("/browse",function(req,res){
    res.render("browse",{header: "Choose subject and location here"})
})


//defineAPI

module.exports=router;