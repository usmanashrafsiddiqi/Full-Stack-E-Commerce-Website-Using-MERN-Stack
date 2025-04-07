import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import validator from "validator";
import jwt from 'jsonwebtoken'


const createToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET)
}



//Route for user Login
const userLogin = async (req, res) => {


    try {

        const { email, password } = req.body;

        //checking if the user does'nt exits 

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does'nt exists" });
        }

        //here the first password will be the user that enter the pssword during login and second will be the pasword that os stored in the database
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){

            const token = createToken(user._id);
            res.json({success:true,token})


        }
        else{
            res.json({success:false,message:"invalid credientaials"})
        }


    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
    }


}

//Route for user register
const userRegister = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        //checking user already exists or not 

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        //validating email format and strong password

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong passsword" })
        }

        //hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)



        //creating the new user


        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        //addding that to data base


        const user = await newUser.save();
        const token = createToken(user._id);


        res.json({ success: true, token })

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })
    }


}

//Route for  admin Login 
const adminLogin = async (req,res) => {
try {
    const {email,password} = req.body
    if (email === process.env.ADMIN_EMAIL && password===  process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})
        
    }else{
        res.json({success:false,message:"inavalid credentials"})
    }
} catch (error) {
    
    console.log(error);
    res.json({ success: false, message: error.message })
}
}

export { userLogin, userRegister, adminLogin };
