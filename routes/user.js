var express=require("express"),
    router = express.Router();


//define register routes
router.get("/register",function(req,res){
    res.render("user/register",{header: "Register here!"})
})

router.get('/profile',function(req,res){
    res.render("user/profile",{header: "Your Profiles"})
})


module.exports=router;