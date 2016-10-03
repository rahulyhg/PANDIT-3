var express=require("express"),
    router = express.Router(),
    middleware = require('../middlewares'),
    User = require('../models/user'),
    Chat = require('../models/chat');


router.get('/chat',middleware.isLoggedIn,function(req,res){
    var roomId=req.query.id;

    if(roomId=='' || roomId===undefined){
        res.render('chat',{header:"Let's Chat",init:''});
        return;
    }
    
    Chat.findOne({_id:roomId},function(err,chat){
        if (err){
            console.log(err);
            return;
        }
        if(!chat){
            req.flash('error','Chat room not found!');
            req.redirect('/');
            return;
        }
        
        if (chat.student.id.equals(req.user._id) || chat.tutor.id.equals(req.user._id)){
            req.flash('success','This is your chat room');
            res.render('chat',{header:"Let's Chat",init:chat._id});
        }else{
            req.flash('error','That is not your chat room');
            res.redirect('/');
        }
        
    })
})

//define api routes

//creating chat
router.get('/chat/api/create',middleware.isLoggedIn,middleware.isStudent,function(req,res){
    var tutorId=req.query.tutor;
    var tutorName=req.query.name;
    var studentId=req.user._id;
    var studentName = req.user.fullname || req.user.facebook.name;
    
    Chat.findOne({'tutor.id':tutorId,'student.id':studentId},function(err,chatLog){
        if(err) throw err;
        if(chatLog){
            //redirect to chat window
            res.redirect('/chat?id='+chatLog._id);
        }else{
            //create new one
            Chat.create({'tutor.id':tutorId,
            'tutor.name':tutorName,
            'student.id':studentId,
            'student.name':studentName},function(err,newChat){
                if(err) throw err;
                User.findById(tutorId,function(err,tutor){
                    if(err) throw err;
                    tutor.chat.push(newChat);
                    tutor.save(function(err,dataTutor){
                        if(err) throw err;
                        User.findById(studentId,function(err,student){
                            if(err) throw err;
                            student.chat.push(newChat);
                            student.save(function(err,dataStudent){
                                if(err) throw err;
                                res.redirect('/chat?id='+newChat._id);
                            })
                        })
                    })
                })
            })
        }
    })
})

//load chat list
router.get('/chat/api/chatlist',middleware.isLoggedIn,function(req,res){
    var userId=req.user._id;
    var typeUser=req.user.type;
    

    
    User.findById(userId).populate('chat').exec(function(err,user){
        if(err) throw err;
        var temp=[];
        user.chat.forEach(function(chat){
            
            var tempObj={_id:chat._id};

            if(typeUser=='student'){
                tempObj['id']=chat.tutor.id;
                tempObj['name']=chat.tutor.name;
            }

            if(typeUser=='tutor'){
                tempObj['id']=chat.student.id;
                tempObj['name']=chat.student.name;
            }
            temp.push(tempObj);
        })
        res.json(temp);
    })
})


//load chat log
router.get('/chat/api/chatlog',middleware.isLoggedIn,function(req,res){
    var roomId=req.query.roomid;
    
    Chat.findById(roomId,function(err,chat){
        if(err) throw err;
        res.json(chat);
    })
})


module.exports=router;