"use client";

import { useState, useRef, useEffect } from "react";
import { type PaperData } from "@/app/lib/data-fetcher";

interface SourceChunk {
    source_id: string;
    paper_id: string | null;
    target_material: string | null;
    process_type: string | null;
    excerpt: string;
    retrieval_score: number | null;
    rerank_score: number | null;
}

interface RetrievalDiagnostics {
    scope: string;
    hyde_enabled: boolean;
    retrieved_count: number;
    reranked_count: number;
    hyde_preview: string | null;
}

interface ChatApiResponse {
    answer: string;
    sources: SourceChunk[];
    diagnostics: RetrievalDiagnostics;
}

interface Message {
    id: number;
    role: "user" | "assistant";
    content: string;
    sources?: SourceChunk[];
    diagnostics?: RetrievalDiagnostics;
    isError?: boolean;
}

const QUICK_ACTIONS = [
    "Summarize current paper",
    "Compare growth temperatures",
    "What are common precursors?",
    "Analyze film density trends",
];

const RAG_API_URL =
    process.env.NEXT_PUBLIC_RAG_API_URL?.replace(/\/$/, "") || "http://127.0.0.1:8000";

interface ChatAssistantProps {
    selectedPaper: PaperData | null;
    onSelectPaper: (index: number | null) => void;
}

function formatScore(score: number | null | undefined) {
    if (typeof score !== "number" || Number.isNaN(score)) return null;
    return score.toFixed(3);
}

function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trimEnd()}...`;
}

function FormattedAnswer({ content }: { content: string }) {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let bulletBuffer: string[] = [];

    const flushBullets = () => {
        if (!bulletBuffer.length) return;
        elements.push(
            <ul key={`bullets-${elements.length}`} className="space-y-2 pl-4">
                {bulletBuffer.map((item, index) => (
                    <li key={`${item}-${index}`} className="text-sm leading-relaxed text-slate-200 list-disc">
                        {item}
                    </li>
                ))}
            </ul>
        );
        bulletBuffer = [];
    };

    lines.forEach((rawLine, index) => {
        const line = rawLine.trim();

        if (!line) {
            flushBullets();
            return;
        }

        if (line.startsWith("- ") || line.startsWith("* ")) {
            bulletBuffer.push(line.slice(2).trim());
            return;
        }

        flushBullets();

        if (line.endsWith(":") && line.length < 40) {
            elements.push(
                <p
                    key={`heading-${index}`}
                    className="text-[11px] font-black uppercase tracking-[0.18em] text-teal-300"
                >
                    {line.slice(0, -1)}
                </p>
            );
            return;
        }

        elements.push(
            <p key={`paragraph-${index}`} className="text-sm leading-relaxed text-slate-100">
                {line}
            </p>
        );
    });

    flushBullets();

    return <div className="space-y-3">{elements}</div>;
}

function SourceCard({
    source,
    index,
}: {
    source: SourceChunk;
    index: number;
}) {
    const excerptPreview = truncateText(source.excerpt, 200);

    return (
        <details className="group rounded-2xl border border-slate-700/70 bg-slate-950/45 open:border-teal-500/30">
            <summary className="list-none cursor-pointer p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] bg-teal-500/10 text-teal-300 border border-teal-500/20">
                                S{index + 1}
                            </span>
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-200">
                                {source.paper_id || "unknown paper"}
                            </span>
                            {source.target_material && (
                                <span className="text-[10px] uppercase tracking-wider text-cyan-300">
                                    {source.target_material}
                                </span>
                            )}
                            {source.process_type && (
                                <span className="text-[10px] uppercase tracking-wider text-amber-300">
                                    {source.process_type}
                                </span>
                            )}
                        </div>
                        <p className="text-xs leading-relaxed text-slate-300">
                            {excerptPreview}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="text-right space-y-1">
                            {formatScore(source.rerank_score) && (
                                <p className="text-[10px] text-teal-300 font-bold uppercase tracking-wider">
                                    Rerank {formatScore(source.rerank_score)}
                                </p>
                            )}
                            {formatScore(source.retrieval_score) && (
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                    Fusion {formatScore(source.retrieval_score)}
                                </p>
                            )}
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.16em] group-open:text-teal-300">
                            Expand
                        </span>
                    </div>
                </div>
            </summary>
            <div className="px-4 pb-4 pt-0 border-t border-slate-800/80">
                <p className="mt-4 text-xs leading-relaxed text-slate-200 whitespace-pre-wrap">
                    {source.excerpt}
                </p>
            </div>
        </details>
    );
}

export default function ChatAssistant({ selectedPaper, onSelectPaper }: ChatAssistantProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: "assistant",
            content: "I’m connected to the ALD-LLaMat retrieval assistant. Ask for summaries, comparisons, precursor trends, deposition windows, or paper-specific insights and I’ll answer from Pinecone-backed evidence.",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const sendMessage = async (content: string) => {
        const trimmedContent = content.trim();
        if (!trimmedContent) return;

        const newUserMsg: Message = {
            id: Date.now(),
            role: "user",
            content: trimmedContent,
        };

        const conversationForRequest = [...messages, newUserMsg]
            .filter((message) => message.role === "user" || message.role === "assistant")
            .slice(-8)
            .map((message) => ({
                role: message.role,
                content: message.content,
            }));

        setMessages((prev) => [...prev, newUserMsg]);
        setIsTyping(true);

        try {
            const response = await fetch(`${RAG_API_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: trimmedContent,
                    conversation: conversationForRequest,
                    scope_paper_id: selectedPaper?.id ?? null,
                }),
            });

            let payload: ChatApiResponse | { detail?: string } | null = null;
            try {
                payload = await response.json();
            } catch {
                payload = null;
            }

            if (!response.ok) {
                const detail =
                    payload && "detail" in payload && payload.detail
                        ? payload.detail
                        : `The RAG backend returned status ${response.status}.`;
                throw new Error(detail);
            }

            const data = payload as ChatApiResponse;
            const botMsg: Message = {
                id: Date.now() + 1,
                role: "assistant",
                content: data.answer,
                sources: data.sources,
                diagnostics: data.diagnostics,
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "The chat request failed before the RAG response was returned.";
            const botMsg: Message = {
                id: Date.now() + 1,
                role: "assistant",
                content:
                    `I couldn’t reach the agentic RAG backend.\n\n${errorMessage}\n\n` +
                    `Make sure \`uvicorn agentic_rag_pipeline.main:app --reload --port 8000\` is running and that \`NEXT_PUBLIC_RAG_API_URL\` points to it.`,
                isError: true,
            };
            setMessages((prev) => [...prev, botMsg]);
        } finally {
            setIsTyping(false);
        }
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
            <div className="flex flex-col px-4 md:px-6 py-4 md:py-8 border-b border-slate-800/60 bg-[#0f172a]/40">
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
                                background: msg.role === "user"
                                    ? "var(--gradient-accent)"
                                    : msg.isError
                                        ? "rgba(127, 29, 29, 0.35)"
                                        : "rgba(30, 41, 59, 0.4)",
                            }}
                        >
                            <FormattedAnswer content={msg.content} />

                            {msg.diagnostics && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-300 border border-teal-500/20">
                                        {msg.diagnostics.hyde_enabled ? "HyDE Active" : "Direct Query"}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                        Scope: {msg.diagnostics.scope}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800/80 text-slate-300 border border-slate-700/80">
                                        {msg.diagnostics.reranked_count}/{msg.diagnostics.retrieved_count} kept
                                    </span>
                                </div>
                            )}

                            {msg.sources && msg.sources.length > 0 && (
                                <div className="mt-4 space-y-3">
                                    <div className="flex items-center justify-between gap-3 px-1">
                                        <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">
                                            Evidence Pack
                                        </p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                                            {msg.sources.length} chunks
                                        </p>
                                    </div>
                                    {msg.sources.map((source, index) => (
                                        <SourceCard
                                            key={`${msg.id}-${source.source_id}`}
                                            source={source}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            )}
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
                        disabled={isTyping}
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
                    <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em] whitespace-nowrap">HyDE + Rerank Pipeline</span>
                    <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-800"></span>
                </div>
            </div>
        </div>
    );
}
