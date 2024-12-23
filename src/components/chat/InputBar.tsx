import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputBarProps {
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const InputBar = ({
  onSendMessage = () => {},
  isLoading = false,
  placeholder = "Type a message...",
}: InputBarProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceRecording = () => {
    if (!isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setIsRecording(true);
        })
        .catch((err) => {
          console.error("Error accessing microphone:", err);
        });
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="flex-shrink-0 bg-gradient-to-t from-white via-white to-transparent pb-4 lg:pb-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative flex items-end gap-2 bg-white rounded-xl border shadow-lg p-2">
          <Button
            onClick={toggleVoiceRecording}
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 flex-shrink-0 hover:bg-gray-100",
              "hidden sm:flex",
              isRecording && "text-red-500",
            )}
          >
            {isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>

          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className="min-h-[20px] max-h-[200px] resize-none border-0 focus-visible:ring-0 px-3 py-2 text-sm"
            rows={1}
          />

          <Button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            size="icon"
            className={cn(
              "h-8 w-8 flex-shrink-0",
              !message.trim() && "opacity-50 cursor-not-allowed",
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-center text-gray-500 mt-2 px-2">
          <span className="hidden sm:inline">
            Free Research Preview. ChatGPT may produce inaccurate information
            about people, places, or facts.
          </span>
          <span className="sm:hidden">
            ChatGPT may produce inaccurate information.
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputBar;
