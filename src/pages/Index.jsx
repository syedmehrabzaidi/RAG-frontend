
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  // Fetch documents list
  const fetchDocuments = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8000/list-doc');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (let file of files) {
      formData.append('files', file);
    }

    try {
      const response = await fetch('http://0.0.0.0:8000/upload-pdfs/', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        alert('Files uploaded successfully!');
        fetchDocuments(); // Refresh document list
        setFiles([]);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">PDF Chat App</h1>
      
      {/* File Upload Section */}
      <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Upload PDF Files</h2>
        <form onSubmit={handleFileUpload} className="space-y-4">
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="w-full p-2 border rounded"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload PDFs
          </button>
        </form>
      </div>

      {/* Document List Section */}
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
        {documents.length > 0 ? (
          <ul className="space-y-2">
            {documents.map((doc, index) => (
              <li 
                key={index}
                className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
              >
                <span>{doc.name || doc}</span>
                <button
                  onClick={() => navigate(`/chat/${doc.id || doc}`)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Chat
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No documents uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Index;
