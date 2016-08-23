var express=require("express"),
    router = express.Router();


//define chat routes
router.get("/chat",function(req,res){
    res.render("chat",{header: "Let's chat!"})
})



module.exports=router;