
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { docId } = useParams();
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId, setSessionId] = useState('');

  // Fetch chat history
  const fetchChatHistory = async () => {
    if (!sessionId) return;
    
    try {
      const response = await fetch(`http://0.0.0.0:8000/chat-sessions/${sessionId}/history`);
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  useEffect(() => {
    // Generate a session ID when component mounts
    setSessionId(crypto.randomUUID());
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchChatHistory();
    }
  }, [sessionId]);

  // Handle sending questions
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      const response = await fetch('http://0.0.0.0:8000/query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          session_id: sessionId
        }),
      });

      const data = await response.json();
      fetchChatHistory(); // Refresh chat history
      setQuestion('');
    } catch (error) {
      console.error('Error sending question:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Chat with Document</h1>

      {/* Chat History */}
      <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm h-96 overflow-y-auto">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Question Input */}
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the document..."
          className="flex-1 p-3 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
      
      <div className="mt-4">
        <a 
          href="/"
          className="text-blue-500 hover:text-blue-700"
        >
          ← Back to Documents
        </a>
      </div>
    </div>
  );
};

export default Chat;
