





// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Materials.css";

const Materials = () => {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [topics, setTopics] = useState([]);
    const [filesByTopic, setFilesByTopic] = useState({});

    const handleTopicSelection = async (topic) => {
        setSelectedTopic(topic);
        try {
            const result = await axios.get(`/get-files?topic=${topic}`);
            setFilesByTopic(result.data.data);
        } catch (error) {
            console.error("Error fetching files:", error);
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

    useEffect(() => {
        fetchDistinctTopics(); 
    }, []);

    const openPdfInNewTab = (pdfUrl) => {
        const fullPdfUrl = `http://localhost:8080/files/${pdfUrl}`;
        window.open(fullPdfUrl, "_blank");
    };

    const renderRows = () => {
        if (filesByTopic[selectedTopic]) {
            return filesByTopic[selectedTopic].map((file, index) => (
                <tr key={index}>
                    <td>{file.title}</td>
                    <td>
                        <button className="pdf" onClick={() => openPdfInNewTab(file.fileName)}>Download</button>
                    </td>
                </tr>
            ));
        }
        return (
            <tr>
                <td colSpan="2">No PDFs available for this topic.</td>
            </tr>
        );
    };

    return (
        <div className="main-divi">
            <h3>Select a Topic</h3>
            <div className="btns">
                {topics.map((topic) => (
                    <button key={topic} onClick={() => handleTopicSelection(topic)}>
                        <h4>{topic}</h4>
                    </button>
                ))}
            </div>

            {(selectedTopic) && (
                <div className="files">
                    <h2>{selectedTopic}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th className="download">PDF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows()}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Materials;







// // @ts-nocheck
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Materials.css";
// import MaterialModal from "./MaterialModal";

// const Materials = () => {
//     const [selectedTopic, setSelectedTopic] = useState(null);
//     const [topics, setTopics] = useState([]);
//     const [filesByTopic, setFilesByTopic] = useState({});
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleTopicSelection = async (topic) => {
//         setSelectedTopic(topic);
//         setIsModalOpen(true);
//         try {
//             const result = await axios.get(/get-files?topic=${topic});
//             setFilesByTopic(result.data.data);
//         } catch (error) {
//             console.error("Error fetching files:", error);
//         }
//     };


//     const fetchDistinctTopics = async () => {
//         try {
//             const response = await axios.get("/get-distinct-topics");
//             setTopics(response.data.topics);
//         } catch (error) {
//             console.error("Error fetching topics:", error);
//         }
//     };

//     useEffect(() => {
//         fetchDistinctTopics(); 
//     }, []);


//     return (
//         <div className="main-divi">
//             <h3>Select a Topic</h3>
//             <div className="btns">
//                 {topics.map((topic) => (
//                     <button key={topic} onClick={() => handleTopicSelection(topic)}>
//                         <h4>{topic}</h4>
//                     </button>
//                 ))}
//             </div>

//             {isModalOpen && (
//                 <MaterialModal
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                     topic={selectedTopic}
//                 />
//             )}
//         </div>
//     );
// };

// export default Materials;