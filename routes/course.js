var express=require("express"),
    router = express.Router();

//define course route
router.get("/course",function(req,res){
    res.render("course/browse",{header: "Choose subject and location here"})
})

router.get('/course/create',function(req,res){
    res.render('course/create',{header:"Create your own course"});
})


router.get('/course/:course_id',function(req,res){
    res.render("course/show",{header: "Sub"});
})

router.get('/course/:course_id/edit',function(req,res){
    res.render("course/edit",{header: "Edit your own course"});
})


module.exports=router;