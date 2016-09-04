var mongoose    =   require("mongoose");

var chatSchema = new mongoose.Schema({
    tutor   :   {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:String
    },
    student :{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:String
    },
    chatLog:[]
    // ,read:[]
})

module.exports = mongoose.model('Chat',chatSchema);