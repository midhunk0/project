
import jaf from "../models/jaf.js";
export const postJafController = async (req, res, next) => {
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

        // Create a new jaf instance
        const Jaf = new jaf({
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

        // Save the jaf to the database
        await Jaf.save();

        res.status(201).json({ message: "JAF posted successfully" });
    } catch (error) {
        next(error);
    }
}

export const getJafController = async (req, res, next) => {
    try {
        const jafID = req.params.id;

        const Jaf = await jaf.findById(jafID);
        if (!Jaf) {
            return res.status(404).json({ error: "jaf not found" });
        }

        res.status(200).json(Jaf);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }

}