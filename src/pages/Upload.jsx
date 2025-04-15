
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

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
        setFiles([]);
        navigate('/documents');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Upload Documents</h1>
      
      <div className="max-w-xl mx-auto p-6 border rounded-lg bg-card shadow-sm">
        <form onSubmit={handleFileUpload} className="space-y-6">
          <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-lg">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Upload PDFs
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;

