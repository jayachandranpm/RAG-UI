import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Plus, MessageSquare, Trash2, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHistoryProps {
  conversations?: {
    id: string;
    title: string;
    lastMessage: string;
    timestamp: string;
    isActive?: boolean;
  }[];
  onSelectChat?: (id: string) => void;
  className?: string;
}

const ChatHistory = ({
  conversations = [
    {
      id: "1",
      title: "React Discussion",
      lastMessage: "I have a question about React.",
      timestamp: new Date().toISOString(),
      isActive: true,
    },
    {
      id: "2",
      title: "TypeScript Help",
      lastMessage: "How do I type this component?",
      timestamp: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Styling Question",
      lastMessage: "What's the best way to style this?",
      timestamp: new Date().toISOString(),
    },
  ],
  onSelectChat = () => {},
  className,
}: ChatHistoryProps) => {
  return (
    <aside
      className={cn(
        "h-full bg-[#202123] flex flex-col",
        "transition-all duration-300 ease-in-out",
        className,
      )}
    >
      {/* Top Section */}
      <div className="flex-shrink-0 p-3 border-b border-gray-800">
        <Button
          className="w-full justify-start gap-2 bg-[#2D2E35] hover:bg-[#40414F] text-white transition-colors"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Search and Chat List */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 bg-[#2D2E35] text-gray-200 placeholder-gray-400 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 border-none transition-colors"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1 py-2">
            {conversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className="group w-full"
              >
                <div
                  className={cn(
                    "px-3 py-3 rounded-lg text-left transition-colors flex items-start gap-3",
                    "hover:bg-[#2D2E35]",
                    chat.isActive ? "bg-[#2D2E35]" : "text-gray-300",
                  )}
                >
                  <MessageSquare className="h-4 w-4 mt-1 flex-shrink-0 opacity-60" />
                  <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium truncate text-gray-200">
                        {chat.title}
                      </h3>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {chat.lastMessage}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle delete
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Bottom Section */}
      <div className="flex-shrink-0 border-t border-gray-800 p-3 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-gray-300 hover:bg-[#2D2E35] gap-2 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </aside>
  );
};

export default ChatHistory;
