import mongoose, { mongo } from "mongoose";
// import Conversation from "./Conversation";

const messageSchema = new mongoose.Schema({
    ConversationId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Coversation',
        required:true
    },
    sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true
    },
    content : {
        type: String,
        required:true
    },
}, {
    timestamps : true,
});

const Meassage = mongoose.model('Message', messageSchema);

export default Meassage