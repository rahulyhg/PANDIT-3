var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    local       :{
        email       :   String,
        password    :   String
    },
    facebook    :{
        id          :   String,
        token       :   String,
        email       :   String,
        name        :   String,
        profilepic  :   String
    },
    
    type        :   String,
    tel         :   String,
    fullname    :   String,
    age         :   Number,
    gender      :   String,
    profilepic  :   String,
    idcard      :   String,
    graduate    :   String,
    introduce   :   String,
    created     :   {type: Date, default: Date.now},
    course      :   [{
                        type:mongoose.Schema.Types.ObjectId,
                        ref: "Course"
                    }]
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports=mongoose.model("User",UserSchema);