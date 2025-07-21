// Chat.tsx
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const token = localStorage.getItem('access');
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${tripId}/?token=${token}`);
    socket.onmessage = (e) => setMessages(prev => [...prev, JSON.parse(e.data)]);
    setWs(socket);
    return () => socket.close();
  }, [tripId]);

  const send = () => {
    if (ws && input.trim()) {
      ws.send(JSON.stringify({ message: input }));
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`${m.sender === 'you' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-1 rounded ${m.sender === 'you' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
              {m.message}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white flex gap-2">
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
