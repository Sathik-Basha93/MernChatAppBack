import express from 'express'
import verifyUser from '../middleware/verifyUser.js'
import Conversation from '../models/Conversation.js'

import Meassage from '../models/Message.js'
import { GetReceiverSocketId , io } from '../socket/socket.js'


const router = express.Router()


router.get('/read/:receiverId' , verifyUser ,async (req,res)=>{
    try {
        const {receiverId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all:[senderId, receiverId]}
        })

        if(!conversation){
            return res.status(404).json({message: "Not Found"})
        } 

        const message = await Meassage.find({
            ConversationId: conversation._id
        }).sort({createdAt: 1})

        return res.status(200).json(message)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
})


router.post('/send/:receiverId' , verifyUser ,async (req,res)=>{

    
try{
    const {receiverId} = req.params;
    const senderId = req.user._id;
    const {content} = req.body;


    let conversation = await Conversation.findOne({
        participants: {$all:[senderId, receiverId]}
    })

    if(!conversation){
        conversation = new Conversation({
            participants : [senderId , receiverId]
        })
        await conversation.save()
    }

    const newMessage = new Meassage({
        ConversationId: conversation._id , 
        sender : senderId ,
        content: content,
        createdAt: new Date()


    })

    await newMessage.save()

    const receiverSocketID = GetReceiverSocketId(receiverId)
    if(receiverSocketID){

        io.to(receiverSocketID).emit('newMessage',newMessage)
    }
    return res.json(newMessage)


} catch (error) {
    console.log(error)
    res.status(500).json(error)
}

})

export default router