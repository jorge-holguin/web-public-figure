"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { MessageSquare, Send, X } from "lucide-react";
import bot from "../../assets/bot.png";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy el asistente virtual de Héctor Valer. Estoy aquí para brindarte información sobre su labor como Congresista de la República. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Generar un sessionId único al cargar el componente
  useEffect(() => {
    const generateSessionId = () => {
      return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    };
    
    // Intentar recuperar el sessionId del localStorage primero
    const storedSessionId = localStorage.getItem('chat_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      // Si no existe, crear uno nuevo
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      localStorage.setItem('chat_session_id', newSessionId);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");
    setIsThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ 
          message: newMessage,
          sessionId: sessionId // Enviamos el sessionId al backend
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      setIsThinking(false);

      if (data.response) {
        const botMessage: Message = {
          id: messages.length + 2,
          text: data.response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        
        // Opcional: Actualizar el historial local con el proporcionado por el backend
        // Esto solo es necesario si el backend modifica el historial de alguna manera
        // console.log("Historial actualizado desde el servidor:", data.conversationHistory);
      }
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      setIsThinking(false);
      
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Lo siento, parece que hay un problema de conexión. Por favor, intenta nuevamente en unos momentos.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const ThinkingIndicator = () => (
    <div className="flex items-start mb-4">
      <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 max-w-[80%] shadow-sm">
        <div className="relative w-6 h-6 rounded-full overflow-hidden mr-1">
          <Image src={bot} alt="Asistente de Héctor Valer" layout="fill" objectFit="cover" />
        </div>
        <div className="flex space-x-1">
          <span className="animate-bounce delay-0">.</span>
          <span className="animate-bounce delay-150">.</span>
          <span className="animate-bounce delay-300">.</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatContainerRef}>
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col w-80 sm:w-96 h-[450px] border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-somos-blue p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                <Image src={bot} alt="Héctor Valer" layout="fill" objectFit="cover" />
              </div>
              <div>
                <h3 className="text-white font-medium">Asistente Virtual</h3>
                <p className="text-blue-100 text-xs">Oficina de Héctor Valer</p>
              </div>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200 transition-colors" aria-label="Cerrar chat">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                {!message.isUser && (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden mr-1 flex-shrink-0 mt-1">
                    <Image src={bot} alt="Héctor Valer" layout="fill" objectFit="cover" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-3 max-w-[80%] ${
                    message.isUser
                      ? "bg-somos-blue text-white shadow-md"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
                  }`}
                  style={{
                    borderRadius: message.isUser ? "18px 18px 0 18px" : "0 18px 18px 18px",
                  }}
                >
                  {/* Usamos ReactMarkdown para interpretar Markdown */}
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    <ReactMarkdown>
                      {message.text}
                    </ReactMarkdown>
                  </div>
                  <p className={`text-xs mt-1 ${message.isUser ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            {isThinking && <ThinkingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-somos-blue dark:bg-gray-700 dark:text-white text-sm"
                disabled={isThinking}
              />
              <button
                type="submit"
                className={`${isThinking ? "bg-gray-400" : "bg-somos-red hover:bg-somos-blue"} text-white p-3 rounded-lg transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]`}
                aria-label="Enviar mensaje"
                disabled={isThinking}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-somos-red hover:bg-somos-blue text-white p-4 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center"
          aria-label="Abrir chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}