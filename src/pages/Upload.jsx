
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, FileText } from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { API_URL } from '@/config/api';

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const pdfFiles = droppedFiles.filter(file => file.type === 'application/pdf');
    setFiles(pdfFiles);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (let file of files) {
      formData.append('files', file);
    }

    try {
      const response = await fetch(`${API_URL}/upload-pdfs/`, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        toast.success('Files uploaded successfully!');
        setFiles([]);
        navigate('/documents');
      } else {
        toast.error('Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Error uploading files');
    }
  };

  return (
    <div className="container mx-auto p-8 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Upload Documents
          </CardTitle>
          <CardDescription className="text-white/70 text-lg">
            Drag and drop your PDF files or click to browse
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleFileUpload} className="space-y-6">
            <div 
              className={`flex flex-col items-center gap-4 p-8 border-2 border-dashed rounded-xl transition-colors duration-300 ${
                isDragging 
                  ? 'border-purple-400 bg-purple-400/10' 
                  : 'border-white/20 hover:border-purple-400/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                <UploadIcon className="w-8 h-8 text-purple-400" />
              </div>
              
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
                className="hidden"
                id="file-upload"
              />
              
              <label 
                htmlFor="file-upload"
                className="cursor-pointer text-white/70 hover:text-white transition-colors text-center"
              >
                <span className="font-semibold text-purple-400">Choose files</span>
                {' '}or drag them here
              </label>
            </div>

            {files.length > 0 && (
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/70">
                      <FileText className="w-4 h-4 text-purple-400" />
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6"
                >
                  Upload PDFs
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadPage;
