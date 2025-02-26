// @ts-nocheck
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import studentModel from "../models/studentModel";
import { createError } from "../utils/error.js";



export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new studentModel({
           ...req.body,
            password: hash,
        })
        await newUser.save();
        res.status(200).send("user has been created");
    } catch (err) {
        next(err)
    }
}


export const login = async (req, res, next) => {
    try {
        const user = await studentModel.findOne({ username: req.body.username });
        if (!user) {
            return next(createError(404, "no user with this username"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(404, "wrong password or username"))
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
        const { password, isAdmin, ...otherDetails } = user._doc;

        res.cookie("access_token",token,{httpOnly:true}).status(200).json({jwt:token,details:{...otherDetails},isAdmin})
    } catch (err) {
        next(err)
    }
}

const authMe=async(){
    
}