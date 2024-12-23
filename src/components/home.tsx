import { useState } from "react";
import ChatHistory from "./chat/ChatHistory";
import MessageContainer from "./chat/MessageContainer";
import InputBar from "./chat/InputBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${content}". This is a simulated response.`,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-white">
      <div
        className={`flex-shrink-0 transition-[width] duration-300 ease-in-out ${isSidebarOpen ? "w-[280px]" : "w-0"} overflow-hidden`}
      >
        <div
          className={`w-[280px] h-full transition-transform duration-300 ease-in-out ${isSidebarOpen ? "" : "-translate-x-full"}`}
        >
          <ChatHistory className="h-full" />
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="fixed top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg border h-8 w-8 rounded-full hover:bg-gray-50 transition-all duration-300 ease-in-out"
        style={{
          left: isSidebarOpen ? "260px" : "20px",
        }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        )}
      </Button>

      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-shrink-0 h-14 bg-[#4285f4] flex items-center justify-between px-4">
          <div className="flex-1 text-center">
            <h1 className="text-lg font-medium text-white">
              Zia RAG Chatbot (Zoho CRM)
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 gap-2"
            onClick={() => {
              setMessages([]);
            }}
          >
            <Plus className="h-4 w-4" />
            New Conversation
          </Button>
        </div>

        <div className="flex-1 overflow-hidden">
          <MessageContainer messages={messages} isTyping={isTyping} />
        </div>

        <InputBar onSendMessage={handleSendMessage} isLoading={isTyping} />
      </main>
    </div>
  );
}

export default Home;
