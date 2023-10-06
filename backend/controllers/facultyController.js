import Faculty from "../models/facultyModel.js"

export const registerfacultyController = async (req, res, next) => {
    try {
        const { facultyID, name } = req.body;
        console.log(facultyID, name);
        // Check if the student with the provided student ID already exists
        const existingfaculty = await Faculty.findOne({ facultyID });
        if (existingfaculty) {
            return res.status(409).json({ error: "faculty already exists" });
        }

        // Create a new student instance
        const faculty = new Faculty({
            username: req.body.name,
            password: "",
            email: "",
            facultyID: req.body.facultyID,
        });

        // Save the student to the database
        await faculty.save();

        res.status(201).json({ message: "Faculty registered successfully" });
    } catch (error) {
        next(error);
        // res.status(500).json({ error: "An error occurred" });
    }
};