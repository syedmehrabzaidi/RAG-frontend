
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8000/documents/');
      if (!response.ok) throw new Error("Failed to fetch documents");
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error("Failed to fetch documents");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (docId) => {
    try {
      const response = await fetch(`http://0.0.0.0:8000/documents/${docId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error("Failed to delete document");
      
      toast.success("Document deleted successfully");
      fetchDocuments(); // Refresh the list
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error("Failed to delete document");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Your Documents</h1>
          <p className="text-muted-foreground mt-2">Manage and chat with your uploaded documents</p>
        </div>
        <Button onClick={() => navigate('/upload')} className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
          Upload New
        </Button>
      </div>

      <div className="grid gap-4">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div 
              key={doc.doc_id}
              className="flex items-center justify-between p-6 border rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <span className="font-medium text-lg">{doc.filename}</span>
                  <span
                    className={`ml-3 text-sm px-3 py-1 rounded-full ${
                      doc.status === 'indexed'
                        ? 'bg-green-100 text-green-700'
                        : doc.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/chat/${doc.doc_id}`)}
                  disabled={doc.status !== 'indexed'}
                  className="border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                >
                  <MessageSquare className="mr-2 h-4 w-4 text-purple-600" />
                  Chat
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(doc.doc_id)}
                  className="border-red-200 hover:border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-12 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
            <FileText className="h-12 w-12 mx-auto text-purple-400 mb-4" />
            <p className="text-lg text-muted-foreground mb-4">No documents uploaded yet.</p>
            <Button 
              onClick={() => navigate('/upload')}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            >
              Upload your first document
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
