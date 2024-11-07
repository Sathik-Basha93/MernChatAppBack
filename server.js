import express from 'express';
import cors from 'cors'
import Connect from './db/connection.js';
import AuthRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import MessageRouter from './routes/message.js'


import {app, server} from './socket/socket.js'
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/chat/user',AuthRouter)
app.use('/chat/users',userRouter)
app.use('/chat/message',MessageRouter)


server.listen(process.env.PORT,()=>{
    Connect()
    console.log("server is running")
})