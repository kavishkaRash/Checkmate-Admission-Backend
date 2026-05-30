import Appointment from "../models/appointment.js";
import Review from "../models/review.js";
import Student from "../models/student.js";

export async function getDashboardData(req, res) {
    try {
        const totalAppointments = await Appointment.countDocuments();
        const totalStudents = await Student.countDocuments();
        const totalReviews = await Review.countDocuments();

        const reviews = await Review.find();

        const averageRating =
            reviews.length > 0
                ? reviews.reduce((total, review) => total + review.rating, 0) /
                  reviews.length
                : 0;

        const confirmedAppointments = await Appointment.countDocuments({
            status: "approved",
        });

        const completionRate = 
            totalAppointments > 0
                ? ((confirmedAppointments / totalAppointments) * 100).toFixed(1) 
                : 0;

        const recentAppointments = await Appointment.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const recentStudents = await Student.find()
            .sort({ createdAt: -1 })
            .limit(5);
        
        const recentReviews = await Review.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const monthlyAnalytics = await Appointment.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" }, 
                    count: { $sum: 1 } 
                }
            },
            { $sort: { "_id": 1 } } 
        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const analytics = monthlyAnalytics.map(item => ({
            month: monthNames[item._id - 1],
            count: item.count
        }));

        res.json({
            state: {
                totalAppointments,
                totalStudents,
                totalReviews,
                averageRating,
                completionRate,
            },
            analytics, 
            recentAppointments,
            recentStudents,
            recentReviews,
        });
            
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to load dashboard data",
        });
    }
}