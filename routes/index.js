var express=require("express"),
    router = express.Router();

//define landing page routes
router.get("/",function(req,res){
    res.render("landing",{header: "PANDIT"});
})

//define main routes
router.get("/main",function(req,res){
    res.render("main",{header: "Let's find my tutor"});
})

module.exports=router;