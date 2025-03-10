import mongoose from "mongoose";


const userSchema = new mongoose.Schema({


    name:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},

},{minimize:false })       //mongoose neglect the property where we have an empty object so the cartData will not be m  created when the user is created  but we want the cartData to be created for that we use this minimize:false propety usding that it will craete the cartData usinng the empty object 

const userModel = mongoose.models.user || mongoose.model('user',userSchema)


export default userModel