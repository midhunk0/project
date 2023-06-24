import Recruiter from "../models/recruiterModel.js"

export const registerRecruiterController = async (req, res, next) => {
    try {
        const {
            companyName,
            natureOfBusiness,
            homePage,
            contactPerson,
            designation,
            fax,
            telephoneNo,
            email,
            jobDescription,
            address,
            eligibilityCriteria,
            branchesEligible,
            payPackage,
            recruitmentSchedule,
            selectionProcedure,
        } = req.body;

        // Create a new recruiter instance
        const recruiter = new Recruiter({
            companyName,
            natureOfBusiness,
            homePage,
            contactPerson,
            designation,
            fax,
            telephoneNo,
            email,
            jobDescription,
            address,
            eligibilityCriteria,
            branchesEligible,
            payPackage,
            recruitmentSchedule,
            selectionProcedure,
        });

        // Save the recruiter to the database
        await recruiter.save();

        res.status(201).json({ message: "Recruiter registered successfully" });
    } catch (error) {
        next(error);
    }
}

export const loginRecruiterController = async (req, res) => {
    try {
        const recruiter = await Recruiter.findOne({ companyName: req.body.companyName });
        if (!recruiter) {
            return next(createError(404, "no recruiter with this name"))
        }
        if (req.body.password !== recruiter.password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", recruiter });
    } catch (error) {

    }
};

export const changePasswordStudentController = async (req, res, next) => {
    try {
        const recruiterID = req.params.id;
        const { newPassword } = req.body;

        await Recruiter.findByIdAndUpdate(recruiterID, { password: newPassword });

        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        console.log(err);
        next(err);
        // res.status(500).json({ error: "An error occurred" });
    }
};

export const getProfileRecruiterController = async (req, res) => {
    try {
        const recruiterID = req.params.id;

        // Find the student with the provided student ID
        const recruiter = await Recruiter.findById(recruiterID);
        if (!recruiter) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(recruiter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
};

export const updateProfileRecruiterController = async (req, res) => {
    try {
        const recruiterID = req.params.id;
        const {
            designation,
            fax,
            telephoneNo,
            email,
        } = req.body;
        console.log(recruiterID, req.body);

        // Find the student with the provided student ID
        await Recruiter.findByIdAndUpdate(recruiterID, {
            designation: designation,
            email: email,
            telephoneNo: telephoneNo,
            fax:fax
        });

        // Update the student profile

        // Save the updated student profile

        res.status(200).json({
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
};