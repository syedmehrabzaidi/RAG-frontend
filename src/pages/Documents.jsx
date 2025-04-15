
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare } from "lucide-react";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Documents</h1>
        <Button onClick={() => navigate('/upload')}>Upload New</Button>
      </div>

      <div className="grid gap-4">
        {documents.length > 0 ? (
          documents.map((doc, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{doc.name || doc}</span>
              </div>
              <Button variant="outline" onClick={() => navigate(`/chat/${doc.id || doc}`)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center p-8 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">No documents uploaded yet.</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/upload')}>
              Upload your first document
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;

