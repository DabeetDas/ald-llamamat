"use client";

import { useState, useRef, useEffect } from "react";
import { type PaperData } from "@/app/lib/data-fetcher";

interface Message {
    id: number;
    role: "user" | "assistant";
    content: string;
}

const QUICK_ACTIONS = [
    "Summarize current paper",
    "Compare growth temperatures",
    "What are common precursors?",
    "Analyze film density trends",
];

interface ChatAssistantProps {
    selectedPaper: PaperData | null;
    onSelectPaper: (index: number | null) => void;
}

export default function ChatAssistant({ selectedPaper, onSelectPaper }: ChatAssistantProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: "assistant",
            content: "Hello! I'm the ALD-LLaMat Agentic Assistant. I can help you analyze the materials catalog, compare deposition conditions, or deep-dive into specific paper data. How can I help you today?",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const sendMessage = (content: string) => {
        const newUserMsg: Message = {
            id: Date.now(),
            role: "user",
            content: content.trim(),
        };

        setMessages((prev) => [...prev, newUserMsg]);
        setIsTyping(true);

        // Placeholder simulated response
        setTimeout(() => {
            setIsTyping(false);
            const botMsg: Message = {
                id: Date.now() + 1,
                role: "assistant",
                content: selectedPaper
                    ? `Analyzing "${selectedPaper.id}"... I see ${selectedPaper.target_material.target_material.chemical_formula} is the target. The ${selectedPaper.summary.process_type} process was used at ${selectedPaper.deposition_conditions.deposition_temperature_C || 'various'}°C. What specific metric should I clarify from this paper?`
                    : `I'm currently scanning the global catalog for "${content}". Once the RAG pipeline is active, I'll be able to compare all 19 papers at once! Selection a paper from the right to narrow my focus.`,
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 1200);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        sendMessage(inputValue);
        setInputValue("");
    };

    const handleQuickAction = (action: string) => {
        sendMessage(action);
    };

    return (
        <div className="flex flex-col h-full bg-[#0f172a]/20 backdrop-blur-3xl">
            {/* Header */}
            <div className="flex flex-col px-6 py-8 border-b border-slate-800/60 bg-[#0f172a]/40">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-teal-500/20" style={{ background: "var(--gradient-accent)" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2a10 10 0 0 1 0 20" /><path d="M12 2a10 10 0 0 0 0 20" /><line x1="2" y1="12" x2="22" y2="12" /></svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-white tracking-tight">LLaMat AI</h1>
                        <p className="text-[10px] text-teal-400 font-bold tracking-[0.2em] uppercase mt-0.5">Quantum Intelligence Hub</p>
                    </div>
                </div>

                {/* Paper Context Status */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 group">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${selectedPaper ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse' : 'bg-slate-600'}`}></div>
                        <div className="overflow-hidden">
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Target Context</p>
                            <p className="text-sm font-medium text-slate-200 truncate pr-4">
                                {selectedPaper ? selectedPaper.id.toUpperCase() : "Global Catalog Scope"}
                            </p>
                        </div>
                    </div>
                    {selectedPaper && (
                        <button
                            onClick={() => onSelectPaper(null)}
                            className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 transition-all font-bold uppercase"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col max-w-[90%] ${msg.role === "user" ? "self-end items-end" : "self-start items-start"}`}
                    >
                        <div
                            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                    ? "rounded-br-sm text-slate-900 font-medium"
                                    : "rounded-bl-sm text-slate-100 border border-slate-800/80"
                                }`}
                            style={{
                                background: msg.role === "user" ? "var(--gradient-accent)" : "rgba(30, 41, 59, 0.4)",
                            }}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="self-start flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm border border-slate-800/80 shadow-sm" style={{ background: "rgba(30, 41, 59, 0.4)" }}>
                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                )}

                {/* Suggested Actions if no activity */}
                {messages.length === 1 && !isTyping && (
                    <div className="flex flex-col gap-3 pt-4">
                        <p className="text-[10px] uppercase font-black text-slate-600 tracking-[0.2em] mb-1 px-1">Discover Insights</p>
                        <div className="grid grid-cols-1 gap-2">
                            {QUICK_ACTIONS.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuickAction(action)}
                                    className="text-xs px-4 py-3 rounded-xl bg-slate-900/40 border border-slate-800/80 text-slate-400 hover:border-teal-500/40 hover:text-teal-300 hover:bg-slate-800/40 transition-all text-left flex items-center justify-between group"
                                >
                                    {action}
                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-[#0f172a]/60 border-t border-slate-800/60 shadow-[0_-12px_24px_rgba(0,0,0,0.2)]">
                <form onSubmit={handleFormSubmit} className="relative flex items-center">
                    <input
                        type="text"
                        placeholder={selectedPaper ? `Ask about ${selectedPaper.id}...` : "Analyze catalog..."}
                        className="w-full bg-slate-900/80 border border-slate-800/80 text-slate-100 rounded-2xl px-5 py-4 pr-14 text-sm focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all placeholder-slate-600 shadow-inner"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="absolute right-2.5 w-10 h-10 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 hover:text-teal-300 disabled:opacity-50 disabled:hover:bg-teal-500/10 transition-all"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    </button>
                </form>
                <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-800"></span>
                    <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em] whitespace-nowrap">Neural Engine v1.02</span>
                    <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-800"></span>
                </div>
            </div>
        </div>
    );
}
