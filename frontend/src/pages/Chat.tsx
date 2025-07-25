// Chat.tsx
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

interface Message {
  sender: string;
  message: string;
  timestamp: string;
}

export default function Chat() {
  const { tripId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${tripId}/?token=${token}`);
    socket.onmessage = (e) => setMessages(prev => [...prev, JSON.parse(e.data)]);
    setWs(socket);
    return () => socket.close();
  }, [tripId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (ws && input.trim()) {
      ws.send(JSON.stringify({ message: input }));
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-100 rounded-xl shadow p-4">
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
            <span className={`inline-block px-4 py-2 rounded-2xl max-w-xs break-words
              ${m.sender === 'you' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
              {m.message}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
        />
        <button onClick={send} className="bg-green-600 text-white px-4 rounded">Send</button>
      </div>
    </div>
  );
}
