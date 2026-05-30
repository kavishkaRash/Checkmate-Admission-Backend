import express from "express";
import { createReview, deleteReview, getReviewById, getReviews, updateReview } from "../controller/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getReviews);
reviewRouter.post("/", createReview);

reviewRouter.get("/:id", getReviewById);
reviewRouter.put("/:id", updateReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;