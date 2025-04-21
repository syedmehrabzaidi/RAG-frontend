import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from '@/config/api';

const Ask = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      const response = await fetch(`${API_URL}/query/`, {
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
        const newMessage = { role: 'user', content: question };
        setMessages(prev => [...prev, newMessage]);
        setQuestion('');
        
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
        scrollToBottom();
      } else {
        toast.error("Failed to get response");
      }
    } catch (error) {
      console.error('Error sending question:', error);
      toast.error("Failed to send question");
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-white">Ask Anything</h1>
        </div>

        <div
          ref={chatContainerRef}
          className="h-[600px] overflow-y-auto p-6 space-y-6"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-purple-600' 
                    : 'bg-white/10'
                }`}>
                  {message.role === 'user' 
                    ? <User className="w-4 h-4 text-white" />
                    : <Bot className="w-4 h-4 text-white" />
                  }
                </div>
                <div
                  className={`p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button 
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ask;
