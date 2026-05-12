import mongoose from "mongoose";
import { type } from "node:os";
import { PassThrough } from "node:stream";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },password : {
        type : String,
        required : true 
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    role : {
        type:String,
        required : true,
        default: "user"
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    image : {
        type : String,
        default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }

});

const User = mongoose.model("User", userSchema);

export default User;