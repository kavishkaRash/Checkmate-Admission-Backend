import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    initials: {
      type: String,
      required: true,
      uppercase: true,
      maxlength: 2,
    },

    university: {
      type: String,
      required: true,
    },

    program: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    youtubeUrl: {
      type: String,
      required: true,
      trim: true,
    },

    quote: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      enum: ["blue", "indigo", "green", "purple"],
      default: "blue",
    },

    location: {
      type: String,
      default: "Seoul",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;