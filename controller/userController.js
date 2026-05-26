import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
import axios from "axios";

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

export function createUser(req, res) {

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
        () => {
            res.json({
                message: "User Created Succesfully"
            })
        }
    ).catch(
        (err) => {
            res.json({
                message: "User Creation Failed", err
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
        (user) => {
            if (user == null) {
                res.status(404).json({
                    message: "Your Account Does Not Exist"
                })
            } else {
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
        (err) => {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error,Please Try Again",
            });
        }
    )
}

export async function getAllUser(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Forbidden" }); // ← return added
    }

    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed To get Users" });
    }
}

export async function blockOrUnblock(req, res) {
    if (!isAdmin(req)) {
        res.status(401).json({
            message: "Forbidden"
        })
        return;
    }

    if (req.user.email === req.params.email) {
        res.status(400).json({
            message: "You Can't Block Yourself"
        });
        return;
    }

    try {
        await User.updateOne(
            {
                email: req.params.email
            },
            {
                $set: {
                    isBlock: req.body.isBlock
                }
            }
        )
        res.json({
            message: "User Updated Successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed To Block or Unblokk User"
        })
    }
}

export async function googleLogin(req, res) {
    const token = req.body.token;

    if (token == null) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const googleUser = googleResponse.data;

        let user = await User.findOne({ email: googleUser.email });

        if (user == null) {
            user = new User({
                email: googleUser.email,
                firstName: googleUser.given_name,
                lastName: googleUser.family_name,
                password: "google-auth",
                phoneNumber: 0,
                isEmailVerified: googleUser.email_verified,
                image: googleUser.picture,
            });
            await user.save();
        } else {
            if (user.isBlock) {
                return res.status(403).json({
                    message: "Your Account Has Been Blocked. Please Contact Admin"
                });
            }
        }

        const jwtToken = jwt.sign(
            {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                image: user.image,
            },
            process.env.JWT_SECRET_KEY  // ← always same secret
        );

        res.json({
            message: "Login Successfully",
            token: jwtToken,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                image: user.image,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to login with Google" });
    }
}

export function isAdmin(req) {
    if ((req.user == "null")) {
        return false;
    }

    if (req.user.role != "admin") {
        return false
    }

    return true;
}

export function isUser(req) {
    if ((req.user == "null")) {
        return false;
    }

    if (req.user.role != "user") {
        return false
    }

    return true; s
}