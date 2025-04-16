import { useState, useEffect } from 'react';

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
      const response = await fetch(`http://0.0.0.0:8000/chat-sessions/${sessionId}/history`);
      if (!response.ok) throw new Error("Failed to fetch chat history");

      const data = await response.json();

      // ✅ Extract the correct fields from the response
      setMessages(data.messages || []);
      setSessionName(data.name || `Session ${sessionId}`);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Chat History</h1>
      <h2 className="text-muted-foreground mb-8">{sessionName}</h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-8 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">No chat history available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
