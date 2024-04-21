import mongoose from "mongoose";

const PdfSchema=new mongoose.Schema({
    pdf: String,
    title: String,
    topic: String
}, {collection: "PdfDetails"})

export default mongoose.model("PdfDetails", PdfSchema);