import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        indexNo: {
            type: String,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,

        },
        birthday: {
            type: String,
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

        },
        applyingProgram: {
            type: String,

        },
        applyingMajor: {
            type: String,

        },


        city: { type: String },
        postalCode: { type: String },
        address: { type: String },
        applicantPhone: { type: String },
        parentsPhone: { type: String },
        email: {
            type: String,
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
        entranceDate: { type: String },
        graduateDate: { type: String },



        ieltsScore: { type: String, default: "N/A" },
        showMoney: { type: String },
        incomeSources: { type: String },

        applyingMajor: {
            type: String,

        },

        applyingSemester: {
            type: String,
            enum: ["January", "March", "June", "September", "N/A"],
            default: "January"
        },

        applyingYear: {
            type: Number,
            min: 2020,
            max: 2100,
            default: () => new Date().getFullYear(),
        },
        refference: {
            type: String,
            enum: ["N/A", "CM", "H", "M", "R", "C1", "C2", "C3", "C4", "C5"],
            default: "N/A"
        },
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;