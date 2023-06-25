import MatchedStudents from "../models/matchedModel.js";

export const updateNotification = async (req, res) => {
  try {
    const  _id  = req.params.id;

    // Update the isNotification field to true for the matched student document
    const updatedMatchedStudent = await MatchedStudents.findOneAndUpdate(
      { _id },
      { $set: { isNotification: true } },
      { new: true }
    );

    if (!updatedMatchedStudent) {
      return res.status(404).json({ success: false, message: "Matched student not found" });
    }

    res.status(200).json({ success: true, message: "Notification sent successfully" });
  } catch (error) {
    console.error("Failed to send notification:", error);
    res.status(500).json({ success: false, message: "Failed to send notification" });
  }
};