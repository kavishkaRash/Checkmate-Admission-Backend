import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        indexNo: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        birthday: {
            type: String, // or Date if you want to parse it
            required: true,
        },
        passportNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

       
        applyingUniversity: {
            type: String,
            required: true,
        },
        applyingProgram: {
            type: String,
            required: true,
        },
        applyingMajor: {
            type: String,
            required: true,
        },

        
        city: { type: String },
        postalCode: { type: String },
        address: { type: String },
        applicantPhone: { type: String },
        parentsPhone: { type: String },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        
        sponsorName: { type: String },
        sponsorRelation: { type: String },

       
        instituteCategory: { type: String },
        schoolName: { type: String },
        results: { type: String },
        gpa: { type: String },
        entranceDate: { type: String }, // or Date
        graduateDate: { type: String }, // or Date


        
        ieltsScore: { type: String, default: "N/A" },
        showMoney: { type: String },
        incomeSources: { type: String },

        applyingMajor: {
            type: String,
            required: true,
        },
        
        applyingSemester: {
            type: String,
            enum: ["January", "March", "June", "September", "N/A"],
            default: "January"
        },
    },
    {
        timestamps: true, 
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;