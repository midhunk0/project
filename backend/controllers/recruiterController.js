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
        const recruiter = await Recruiter.findOne({ name: req.body.name });
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

