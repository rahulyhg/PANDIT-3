var express=require("express"),
    router = express.Router();

//define landing page routes
router.get("/",function(req,res){
    res.render("main",{header: "Let's find the tutor"});
})


module.exports=router;