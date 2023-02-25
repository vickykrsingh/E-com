import { hashedPassword } from "../helpers/authHelpers.js";
import userModel from "../models/userModel.js"


export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;
        // checking required fields not empty
        if(!name){
            return res.send({error:'name is required'})
        }
        if(!email){
            return res.send({error:'email is required'})
        }
        if(!password){
            return res.send({error:'password is required'})
        }
        if(!phone){
            return res.send({error:'phone number is required'})
        }
        if(!address){
            return res.send({error:'address is required'})
        }
        // check existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already registered Please Login'
            })
        }
        // register User
        const hashPassword = await hashedPassword(password);
        // save new user in Database
        const user = await new userModel({name,email,phone,address,password:hashPassword}).save()
        res.status(202).send({
            success:true,
            message:'User register successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in registration',
            error
        })
    }
}

