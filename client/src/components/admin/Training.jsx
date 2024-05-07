// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Training.css";

const Training = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [topics, setTopics] = useState([]);

    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic);
    };

    const submitFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        formData.append("topic", selectedTopic);

        try {
            const result = await axios.post("/upload-files", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log(result);
            document.getElementById("title").value="";
            document.getElementById("filename").value="";
            setSelectedTopic("");
            alert("File uploaded successfully!!")
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const fetchDistinctTopics = async () => {
        try {
            const response = await axios.get("/get-distinct-topics");
            setTopics(response.data.topics);
        } catch (error) {
            console.error("Error fetching topics:", error);
        }
    };

    const addNewTopic = (newTopic) => {
        setTopics([...topics, newTopic]); // Add new topic to topics list
        setSelectedTopic(newTopic); // Select the newly added topic
    };

    useEffect(() => {
        fetchDistinctTopics(); 
    }, []);

    const handleAddNewTopic = (e) => {
        e.preventDefault(); // Prevent form submission
        const newTopic = document.getElementById("newTopicInput").value.trim();
        if (newTopic) {
            addNewTopic(newTopic); // Add the new topic
            document.getElementById("newTopicInput").value = ""; // Clear the input field
        }
    };

    return (
        <div className="main-div">
            <h3>Upload Materials</h3>
            <form onSubmit={submitFile} className="addForm">
                <div className="inputs">
                    <input type="text" id="title" placeholder="Enter file name" required onChange={(e) => setTitle(e.target.value)} />
                    <input type="file" id="filename" accept="application/pdf" required onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <details open>
                    <summary>Select a topic</summary>
                    <div>
                        {topics.map((option) => (
                            <div key={option}>
                                <input type="radio" id={option.toLowerCase().replace(/\s/g, '-')} name="topic" value={option} checked={selectedTopic === option} onChange={() => handleTopicSelection(option)} />
                                <label htmlFor={option.toLowerCase().replace(/\s/g, '-')}>{option}</label>
                            </div>
                        ))}
                        <div className="newTopic">
                            <input type="text" className="topic" placeholder="Add new topic" id="newTopicInput" />
                            <button
                                onClick={handleAddNewTopic} 
                                className="addBtn"
                            >
                                Add New
                            </button>
                        </div>
                    </div>
                </details>
                <button className="submitBtn" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Training;