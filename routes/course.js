var express=require("express"),
    router = express.Router(),
    Course = require('../models/course'),
    User = require('../models/user'),
    Comment = require('../models/comment'),
    middleware = require('../middlewares'),
    mappingObject = require('../configs/mapping');
    


//define course creation route
router.get('/course/create',middleware.isLoggedIn,middleware.isTutor,function(req,res){
    res.render('course/create',{header:"Create your own course"});
})


router.post('/course',middleware.isLoggedIn,middleware.isTutor,function(req,res){
    var userId = req.user._id
    var courseData={
        'tutor.name'  :   req.user.local.fullname || req.user.facebook.name,
        'tutor.id'    :   userId,
        subject :   req.body.subject,
        name    :   req.body.name,
        desc    :   req.body.desc,
        date    :   req.body.date,
        price   :   req.body.price,
        level   :   req.body.class,
        location:   req.body.location,
        video   :   req.body.youtube,
        rating  :   0
    };
    Course.create(courseData,(err,course)=>{
        if(err) throw err;
        User.findById(userId,(err,user)=>{
            if (err) throw err;
            user.course.push(course);
            user.save((err,data)=>{
                if (err) throw err;
                res.redirect('/course/'+course.id);
            })
        })
    })
})

//define course management route
router.get('/course/manage',middleware.isLoggedIn,middleware.isTutor,function(req,res){
    var userId = req.user._id;
    User.findById(userId).populate('course').exec(function(err,course){
        if(err) throw err;
        res.render('course/manage',{header: 'Edit all of your course',data:course,mappingObject:mappingObject});
    })
})

router.delete('/course/:course_id/',middleware.isLoggedIn,middleware.checkCourseOwnership,function(req,res){
    var courseId=req.params.course_id;
    Course.findByIdAndRemove(courseId,function(err){
        if(err) throw err;
        req.flash('success','Successfully deleted your course');
        res.redirect('back');
    })
})

router.get('/course/:course_id/edit',middleware.isLoggedIn,middleware.checkCourseOwnership,function(req,res){
     var courseId=req.params.course_id;
     Course.findById(courseId,function(err,course){
         if (err) throw err;
         res.render('course/edit',{header:'Edit your course',data:course,mappingObject:mappingObject});
     })
})

router.put('/course/:course_id',middleware.isLoggedIn,middleware.checkCourseOwnership,function(req,res){
    var courseId=req.params.course_id;
    var courseData={
        name    :   req.body.name,
        desc    :   req.body.desc,
        date    :   req.body.date,
        price   :   req.body.price,
        level   :   req.body.class,
        location:   req.body.location,
        video   :   req.body.youtube,
    };
    Course.findByIdAndUpdate(courseId,courseData,function(err,foundCourse){
        if(err) throw err;
        req.flash('success','Successfully updated your course');
        res.redirect('/course/'+foundCourse.id);
    })
})

//define comment route
router.post('/course/:course_id/comment',middleware.isLoggedIn,function(req,res){
    var userId=req.user._id;
    var courseId=req.params.course_id;
    var commentData={
        'student.id':userId,
        'student.name':req.user.fullname || req.user.facebook.name,
        rating:req.body.ratinginput,
        content:req.body.review
    }
    Comment.create(commentData,function(err,comment){
        if (err) throw err;
        Course.findById(courseId).populate('comment').exec(function(err,course){
            if(err)throw err;
            course.comment.push(comment);
            
            //calculate course rating
            var sum = 0;
            course.comment.forEach(function(indComment){
                sum+=indComment.rating;
            })
            course.rating=sum/course.comment.length;
            
            course.save(function(err,data){
                if(err) throw err;
                req.flash('success','Successfully added a comment');
                res.redirect('/course/'+courseId);
            })
        })
    })
})

//define browsing course route
router.get("/course",function(req,res){
    var sub = req.query.subject;
    res.render("course/browse",{header: "Choose subject and location here",
    subject:sub,
    mappingObject:mappingObject});

});

    //api for browsing
    router.get("/course/api",function(req,res){
        var query={};
        var sub = req.query.subject;
        if(sub){
        query = {subject:sub};
        }
        Course.find(query).populate('tutor.id','profilepic facebook.profilepic gender').exec(function(err,data){
            // var courseData={
                
            // }
            if(err) throw err;
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.json(data);
        })
    })

router.get('/course/:course_id',function(req,res){
    var courseId=req.params.course_id;

    Course.findById(courseId).populate('comment').exec(function(err,course){
        if(err) throw err;
        var tutorId=course.tutor.id;
        User.findById(tutorId,function(err,user){
            if (err) throw err;
            var youtubeId='';
            if(course.video){
                youtubeId = course.video.substring(course.video.search('v=')+2,course.video.search('v=')+13);
            }
            res.render("course/show",{header: course.name+' by '+course.tutor.name,
            data:course,
            user:user,
            youtube:youtubeId,
            mappingObject:mappingObject
            });
        })
    })
})

module.exports=router;