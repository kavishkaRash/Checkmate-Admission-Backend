import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from "dotenv";

dotenv.config();

export function getUser(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "Unauthorized"
        });
    } else {
        res.json(
            req.user
        )
    }
}

export function createUser(req,res){

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User(
        {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword,
        }
    )

    user.save().then(
        ()=>{
            res.json({
                message: "User Created Succesfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "User Creation Failed"
            });
        }
    );
}

export function loginUser(req, res) {
    User.findOne(
        {
            email: req.body.email
        }
    ).then(
        (user)=>{
            if (user == null) {
                res.status(404).json({
                    message: "Your Account Does Not Exist"
                })
            }else {
                if (user.isBlock) {
                    res.status(404).json({
                        message: "Your Account Has Been Blocked,Please Contact Admin"
                    })
                }
                const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password);
                if (isPasswordMatching) {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            phoneNumber: user.phoneNumber,
                            role: user.role,
                            isEmailVerified: user.isEmailVerified,
                            image: user.image,
                        },
                        process.env.JWT_SECRET_KEY
                    )
                    res.json({
                        message: "Login Successfull",
                        user: {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            phoneNumber: user.phoneNumber,
                            role: user.role,
                            isEmailVerified: user.isEmailVerified,
                            image: user.image,
                        },
                        token: token
                    });
                } else {
                    res.status(401).json({
                        message: "Incorrect Password"
                    });
                        
                    
                }
            }
        }
    ).catch(
        (err)=>{
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error,Please Try Again",
            });
        }
    )
}

export function isAdmin(req) {
    if ((req.user == "null")){
        return false;
    }

    if (req.user.role != "admin") {
        return false
    }

    return true;
}

export function isUser(req) {
    if ((req.user == "null")){
        return false;
    }

    if (req.user.role != "user") {
        return false
    }

    return true;s
}