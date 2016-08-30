var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    student:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:String
    },
    rating:Number,
    content:String,
    created:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Comment',commentSchema);