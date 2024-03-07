const mongoose = require("mongoose");

const talksSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  additionalDetails: String,
  pdfPath: String, // Store the file path in the database
});

module.exports = mongoose.model("Talks", talksSchema);
