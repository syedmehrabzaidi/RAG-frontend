import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from '@/config/api';

const HistoryPage = () => {
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionName, setSessionName] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setSessionId("abc-123"); // Static for now
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchChatHistory();
    }
  }, [sessionId]);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/chat-sessions/${sessionId}/history`);
      if (!response.ok) throw new Error("Failed to fetch chat history");

      const data = await response.json();
      setMessages(data.messages || []);
      setSessionName(data.name || `Session ${sessionId}`);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      toast.error("Failed to fetch chat history");
    }
  };

  const handleDeleteHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/chat-sessions-delete/${sessionId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error("Failed to delete chat history");
      
      toast.success("Chat history deleted successfully");
      setMessages([]);
    } catch (error) {
      console.error('Error deleting chat history:', error);
      toast.error("Failed to delete chat history");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Chat History</h1>
          <h2 className="text-muted-foreground mt-2">{sessionName}</h2>
        </div>
        {messages.length > 0 && (
          <Button
            variant="outline"
            onClick={handleDeleteHistory}
            className="border-red-200 hover:border-red-300 hover:bg-red-50 gap-2"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
            Delete History
          </Button>
        )}
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg shadow-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                    : 'bg-white border border-gray-100'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 text-right ${
                  message.role === 'user' ? 'text-purple-200' : 'text-gray-400'
                }`}>
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-12 border rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50">
            <p className="text-lg text-muted-foreground">No chat history available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
