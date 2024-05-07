





// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Table, Button } from "react-bootstrap";
import "./Materials.css";
import { baseUrl } from "../../Url";

const Materials = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const [filesByTopic, setFilesByTopic] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleTopicSelection = async (topic) => {
    setSelectedTopic(topic);
    try {
      const result = await axios.get(`/get-files?topic=${topic}`);
      setFilesByTopic(result.data.data);
      setShowModal(true);
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const openPdfInNewTab = (pdfUrl) => {
    const fullPdfUrl = `http://${baseUrl}/files/${pdfUrl}`;
    window.open(fullPdfUrl, "_blank");
  };

  const renderRows = () => {
    if (filesByTopic[selectedTopic]) {
      return filesByTopic[selectedTopic].map((file, index) => (
        <tr key={index}>
          <td>{file.title}</td>
          <td>
            <Button variant="outline-primary" className="btn-download" onClick={() => openPdfInNewTab(file.fileName)}>
              Download
            </Button>
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
      <div className="topic-buttons">
        {topics.map((topic) => (
          <Button key={topic} variant="info" className="btn-info" onClick={() => handleTopicSelection(topic)}>
            {topic}
          </Button>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
        <Modal.Header className="modal-header" >
          <Modal.Title>{selectedTopic}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive className="materials-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {renderRows()}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-close" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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