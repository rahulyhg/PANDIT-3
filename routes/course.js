var express=require("express"),
    router = express.Router();



//define course route
router.get('/course/:course_id',function(req,res){
    res.render("course/show",{header: "Sub"});
})

router.get('/course/:course_id/edit',function(req,res){
    res.render("course/edit",{header: "Edit your own course"});
})

router.get('/create_course',function(req,res){
    res.render('course/create',{header:"Create your own course"});
})


module.exports=router;