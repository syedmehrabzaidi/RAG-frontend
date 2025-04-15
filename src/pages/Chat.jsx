
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";

const Chat = () => {
  const { docId } = useParams();
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, []);

  const fetchChatHistory = async () => {
    if (!sessionId) return;
    
    try {
      const response = await fetch(`http://0.0.0.0:8000/chat-sessions/${sessionId}/history`);
      const data = await response.json();
      setChatHistory(data);
      
      // Scroll to bottom after history updates
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchChatHistory();
    }
  }, [sessionId]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

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

      if (response.ok) {
        await fetchChatHistory();
        setQuestion('');
      }
    } catch (error) {
      console.error('Error sending question:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/documents">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Chat with Document</h1>
        </div>

        <div className="border rounded-lg bg-card shadow-sm">
          <div 
            ref={chatContainerRef}
            className="h-[600px] overflow-y-auto p-4 space-y-4"
          >
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
          </div>

          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about the document..."
                className="flex-1 px-4 py-2 border rounded-md bg-background"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

