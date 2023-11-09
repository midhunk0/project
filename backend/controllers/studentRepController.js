import StudentRep from "../models/studentRepModel.js";
import studentModel from "../models/studentModel.js";

export const registerStudentRep = async(req, res, next) => {
    try{
        const { repCollegeId, password } = req.body;
        const existingStudentRep = await StudentRep.findOne({repCollegeId});
        if(existingStudentRep){
            return res.status(409).json({
                error: "Student representative already exists"
            })
        }

        const studentRep = new StudentRep({
            username: "",
            email: "",
            password: req.body.password,
            repCollegeId: req.body.repCollegeId,
            stream: "",
            department: ""
        }) 

        await studentRep.save();
        res.status(201).json({
            message: "Student representative registration successfull"
        })

    }
    catch(error){
        next(error)
    }   
};

export const loginStudentRep = async(req, res) => {
    try{
        const { repCollegeId, password } = req.body;
        const studentRep = await StudentRep.findOne({ repCollegeId });
        if(!studentRep){
            return res.status(404).json({
                error: "Student representative not found"
            })
        }
        if(password !== studentRep.password){
            return res.status(401).json({
                error: "Invalid password"
            })
        }
        res.status(200).json({
            message: "Login successfull",
            studentRep
        })
    }
    catch(error){
        res.status(500).json({
            error: "An error occured"
        })
    }
};

export const profileStudentRep = async (req, res) => {
    try{
        const repId = req.params.id;
        const studentRep = await StudentRep.findById(repId);
        if(!studentRep){
            return res.status(404).json({
                error: "Student representative not found"
            })
        }
        res.status(200).json(studentRep);
    }
    catch(error){
        res.status(500).json({
            error: "An error occured"
        })
    }
}

export const updateProfile = async (req, res) => {
    try{
        const repId = req.params.id;
        const {
            username,
            email,
            password,
            repCollegeId,
            stream,
            department
        } = req.body;
        await StudentRep.findByIdAndUpdate(repId, {
            username: username,
            email: email,
            password: password,
            repCollegeId: repCollegeId,
            stream: stream,
            department: department
        })
        res.status(200).json({
            message: "Profile updated successfully"
        })
    }
    catch(error){
        res.status(500).json({
            error: "An error occured"
        })
    }
}

export const studentsByStudentRep = async (req, res) => {
    const studentRepId = req.query.studentRep;

    try {
        const studentRep = await StudentRep.findById(studentRepId);

        if (!studentRep) {
            return res.status(404).json({
                message: "Student representative not found"
            });
        }
        const students = await studentModel.find({ department: studentRep.department });

        if (students.length === 0) {
            return res.status(404).json({
                message: "No students found in the same department"
            });
        }

        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred"
        });
    }
};
