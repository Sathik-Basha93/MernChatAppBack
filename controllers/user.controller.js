import UserModel from "../models/user.js";


const users = async (req,res)=>{
    try {
        const loginUser = req.user._id;
        const allUsers = await UserModel.find({_id:{$ne:loginUser}}).select("-password")

        return res.status(200).json({msg:"success" , users:allUsers})
    } catch (error) {
        console.log("Error" , error.message)
        res.status(500).json({msg:error})
    }

}

export default users;