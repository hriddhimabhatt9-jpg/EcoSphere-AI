"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Send, Bot, User } from "lucide-react";

const INITIAL_CHAT = [
  { role: "ai", content: "Hi! I'm your EcoSphere AI Coach. I've analyzed your profile and I see you have a moderate transport footprint. Would you like some tips on reducing it?", time: "09:00 AM" },
];

/**
 * CoachChat component for AI interaction.
 */
export function CoachChat() {
  const [messages, setMessages] = useState(INITIAL_CHAT);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = { 
        role: "ai", 
        content: "That's a great question! Based on the latest data, switching to an electric vehicle or using an e-bike for commutes under 5 miles can reduce your transport footprint by up to 60%. Want me to calculate the exact impact for your 10-mile commute?", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card variant="elevated" className="flex-1 flex flex-col overflow-hidden relative">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 custom-scrollbar relative z-10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === "user" ? "bg-bg-tertiary" : "bg-gradient-ai text-white"
            }`}>
              {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[80%]`}>
              <div className={`p-4 rounded-2xl ${
                msg.role === "user" 
                  ? "bg-bg-tertiary text-text-primary rounded-tr-sm border border-border" 
                  : "bg-accent-purple-dim border border-accent-purple/30 text-text-primary rounded-tl-sm shadow-sm"
              }`}>
                <p className="text-sm md:text-base leading-relaxed">{msg.content}</p>
              </div>
              <span className="text-xs text-text-muted mt-2 px-1">{msg.time}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4 flex-row">
            <div className="w-10 h-10 rounded-full bg-gradient-ai text-white flex items-center justify-center shrink-0">
              <Bot size={20} />
            </div>
            <div className="bg-accent-purple-dim border border-accent-purple/30 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5 h-[52px]">
              <div className="w-2 h-2 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      <div className="px-4 md:px-6 pb-4 flex gap-2 overflow-x-auto no-scrollbar relative z-10">
        {["How can I reduce my meat consumption?", "Calculate my flight to NYC", "What are phantom loads?"].map((prompt, i) => (
          <button
            key={i}
            onClick={() => setInput(prompt)}
            className="whitespace-nowrap px-4 py-2 bg-bg-tertiary hover:bg-bg-secondary border border-border rounded-full text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="p-4 bg-bg-secondary border-t border-border relative z-10">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for advice, calculations, or tips..."
            className="w-full bg-bg-tertiary border border-border rounded-full h-14 pl-6 pr-14 text-sm focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="absolute right-2 h-10 w-10 rounded-full bg-accent-purple hover:bg-[#9333ea] border-none text-white"
            disabled={!input.trim() || isTyping}
          >
            <Send size={18} className="ml-1" />
          </Button>
        </form>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-hero-ai opacity-5 pointer-events-none blur-3xl z-0" />
    </Card>
  );
}
