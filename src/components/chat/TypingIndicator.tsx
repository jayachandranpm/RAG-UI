import React from "react";

interface TypingIndicatorProps {
  isVisible?: boolean;
}

const TypingIndicator = ({ isVisible = true }: TypingIndicatorProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-2xl w-fit">
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
  );
};

export default TypingIndicator;
