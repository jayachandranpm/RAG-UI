import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypingIndicator from "./TypingIndicator";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface MessageContainerProps {
  messages?: Message[];
  isTyping?: boolean;
}

const MessageContainer = ({
  messages = [],
  isTyping = false,
}: MessageContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bot className="w-8 h-8 text-[#4285f4]" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            How can I help you today?
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            I'm your AI assistant for Zoho CRM. Ask me anything about customer
            data, sales pipelines, or CRM integration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="pb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("py-6", message.isUser ? "bg-white" : "bg-gray-50")}
          >
            <div className="max-w-3xl mx-auto flex gap-4 items-start px-4">
              <Avatar className="w-8 h-8 rounded-lg border border-gray-100 shadow-sm flex-shrink-0">
                {message.isUser ? (
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                ) : (
                  <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=bot" />
                )}
                <AvatarFallback>{message.isUser ? "U" : "B"}</AvatarFallback>
              </Avatar>

              <div className="flex-1 prose prose-slate prose-p:leading-relaxed prose-pre:bg-gray-800 max-w-none overflow-hidden">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="py-6 bg-gray-50">
            <div className="max-w-3xl mx-auto flex gap-4 items-start px-4">
              <Avatar className="w-8 h-8 rounded-lg border border-gray-100 shadow-sm flex-shrink-0">
                <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=bot" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageContainer;
