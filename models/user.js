var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    type:String,
    username:String,
    email:String,
    password:String,
    tel:String,
    fullname:String,
    age:Number,
    gender:String,
    profilepic:String,
    idcard:String,
    graduate:String,
    introduce:String,
    created: {type: Date, default: Date.now}
});

UserSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",UserSchema);