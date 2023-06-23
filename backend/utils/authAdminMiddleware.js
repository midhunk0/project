//admin access
import students from "../models/studentModel.js";
export const authAdminMiddleware = async (req, res, next) => {
    try {
        const user = await students.findById(req.user._id);
        if (user.isAdmin) {
            next();
        } else {
            return res.status(401).send({
                success: false,
                message: "UnAuthorised Access",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Error in Admin middldeware",
            error,
        });
    }
};
