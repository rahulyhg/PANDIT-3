var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
    tutor   :   {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:String
    },
    subject :   String,
    name    :   String,
    desc    :   String,
    date    :   Array,
    price   :   Number,
    level   :   String,
    location:   Array,
    video   :   String,
    rating   :   Number,
    comment :   [{
        type:   mongoose.Schema.Types.ObjectId,
        ref :   "Comment"
    }],
    created     :   {type: Date, default: Date.now}
    
});

module.exports = mongoose.model('Course',courseSchema);