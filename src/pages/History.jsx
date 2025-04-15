
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const [sessionId, setSessionId] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  
  useEffect(() => {
    // Generate a session ID when component mounts if none exists
    if (!sessionId) {
      setSessionId(crypto.randomUUID());
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchChatHistory();
    }
  }, [sessionId]);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`http://0.0.0.0:8000/chat-sessions/${sessionId}/history`);
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Chat History</h1>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {chatHistory.length === 0 && (
          <div className="text-center p-8 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">No chat history available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;

