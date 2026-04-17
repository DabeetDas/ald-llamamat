"use client";

import { useState, useRef, useEffect } from "react";
import { type PaperData } from "@/app/lib/data-fetcher";

interface SourceChunk {
    source_id: string;
    source_type: "rag" | "wikipedia";
    title: string | null;
    url: string | null;
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
    planner_used: boolean;
    executed_steps: number;
    tool_calls: number;
    validation_status: "pass" | "warning" | "fail";
    validation_queries: string[];
}

interface PlanStep {
    step_id: string;
    step_type: "analysis" | "tool";
    title: string;
    objective: string;
    depends_on: string[];
    tool_name: string | null;
    arguments: Record<string, unknown>;
    expected_output: string;
}

interface AgentPlan {
    planner_summary: string;
    analysis: string;
    synthesis_goal: string;
    validation_focus: string[];
    steps: PlanStep[];
}

interface ExecutionArtifact {
    step_id: string;
    step_type: "analysis" | "tool";
    title: string;
    status: "completed" | "failed" | "skipped";
    tool_name: string | null;
    resolved_arguments: Record<string, unknown>;
    output_summary: string;
}

interface ValidationReport {
    factual_grounding: "pass" | "warning" | "fail";
    logical_consistency: "pass" | "warning" | "fail";
    cross_verification: "pass" | "warning" | "fail";
    issues: string[];
    summary: string;
    verdict: "pass" | "warning" | "fail";
    revised_answer: string | null;
}

interface ChatApiResponse {
    answer: string;
    sources: SourceChunk[];
    diagnostics: RetrievalDiagnostics;
    plan?: AgentPlan | null;
    execution?: ExecutionArtifact[];
    validation?: ValidationReport | null;
}

interface Message {
    id: number;
    role: "user" | "assistant";
    content: string;
    sources?: SourceChunk[];
    diagnostics?: RetrievalDiagnostics;
    plan?: AgentPlan | null;
    execution?: ExecutionArtifact[];
    validation?: ValidationReport | null;
    isError?: boolean;
}

const QUICK_ACTIONS = [
    "What are some common methods to deposit NiO?",
    "Mention the deposition conditions for MoSe2",
    "Describe the common characterization techniques used",
    "What are the precursors and coreactants used in deposition of NiO?",
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

function statusPill(status: "pass" | "warning" | "fail" | "completed" | "failed" | "skipped") {
    if (status === "pass" || status === "completed") {
        return "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20";
    }
    if (status === "warning" || status === "skipped") {
        return "bg-amber-500/10 text-amber-200 border border-amber-500/20";
    }
    return "bg-rose-500/10 text-rose-200 border border-rose-500/20";
}

/* ── Gemini-style sparkle SVG ── */
function GeminiSparkle({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
            <defs>
                <linearGradient id="gemini-g" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5eead4" />
                    <stop offset="1" stopColor="#c4b5fd" />
                </linearGradient>
            </defs>
            <path d="M14 2 C14 2 16.5 10 18.5 12.5 C20.5 15 28 14 28 14 C28 14 20.5 15 18.5 17.5 C16.5 20 14 28 14 28 C14 28 11.5 20 9.5 17.5 C7.5 15 0 14 0 14 C0 14 7.5 13 9.5 10.5 C11.5 8 14 2 14 2Z" fill="url(#gemini-g)" />
        </svg>
    );
}

function FormattedAnswer({ content }: { content: string }) {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let bulletBuffer: string[] = [];

    const flushBullets = () => {
        if (!bulletBuffer.length) return;
        elements.push(
            <ul key={`bullets-${elements.length}`} className="space-y-2 pl-5">
                {bulletBuffer.map((item, index) => (
                    <li key={`${item}-${index}`} className="text-[15px] leading-[1.75] text-slate-200 list-disc">
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
                    className="text-xs font-bold uppercase tracking-widest text-teal-400 mt-1"
                >
                    {line.slice(0, -1)}
                </p>
            );
            return;
        }

        elements.push(
            <p key={`paragraph-${index}`} className="text-[15px] leading-[1.75] text-slate-100">
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
    const sourceLabel = source.source_type === "wikipedia"
        ? source.title || "Wikipedia"
        : source.paper_id || "unknown paper";

    return (
        <details className="group rounded-2xl border border-slate-700/70 bg-black/50 open:border-teal-500/30">
            <summary className="list-none cursor-pointer p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] bg-teal-500/10 text-teal-300 border border-teal-500/20">
                                S{index + 1}
                            </span>
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-200">
                                {sourceLabel}
                            </span>
                            {source.source_type === "wikipedia" && (
                                <span className="text-[10px] uppercase tracking-wider text-sky-300">
                                    Background
                                </span>
                            )}
                            {source.source_type === "rag" && source.target_material && (
                                <span className="text-[10px] uppercase tracking-wider text-cyan-300">
                                    {source.target_material}
                                </span>
                            )}
                            {source.source_type === "rag" && source.process_type && (
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
                {source.url && (
                    <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                    >
                        Open source ↗
                    </a>
                )}
                <p className="mt-4 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
                    {source.excerpt}
                </p>
            </div>
        </details>
    );
}

function PlannerCard({ plan }: { plan: AgentPlan }) {
    return (
        <details className="group rounded-2xl border border-cyan-500/20 bg-black/50 open:border-cyan-400/40" open>
            <summary className="list-none cursor-pointer p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-cyan-400"> Strategic Agent</p>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-slate-200">{plan.planner_summary}</p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 whitespace-nowrap">
                        {plan.steps.length} planned
                    </span>
                </div>
            </summary>
            <div className="border-t border-slate-800/80 px-5 pb-5 pt-4 space-y-4">
                <div className="rounded-xl border border-slate-800/80 bg-neutral-900/40 p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Analysis</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{plan.analysis}</p>
                </div>
                <div className="space-y-3">
                    {plan.steps.map((step) => (
                        <div key={step.step_id} className="rounded-xl border border-slate-800/80 bg-neutral-900/35 p-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-200">
                                    {step.step_id}
                                </span>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${step.step_type === "tool" ? "bg-teal-500/10 text-teal-300 border border-teal-500/20" : "bg-violet-500/10 text-violet-300 border border-violet-500/20"}`}>
                                    {step.step_type}
                                </span>
                                {step.tool_name && (
                                    <span className="text-xs text-slate-400 font-medium">{step.tool_name}</span>
                                )}
                            </div>
                            <p className="mt-2.5 text-[15px] text-slate-100">{step.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.objective}</p>
                        </div>
                    ))}
                </div>
            </div>
        </details>
    );
}

function ExecutionTimeline({ execution }: { execution: ExecutionArtifact[] }) {
    return (
        <details className="group rounded-2xl border border-teal-500/20 bg-black/50 open:border-teal-400/40" open>
            <summary className="list-none cursor-pointer p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-teal-400">Executor</p>
                        <p className="mt-1.5 text-[15px] text-slate-200">ReWOO-style execution trace</p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20 whitespace-nowrap">
                        {execution.length} steps
                    </span>
                </div>
            </summary>
            <div className="border-t border-slate-800/80 px-5 pb-5 pt-4 space-y-3">
                {execution.map((step) => (
                    <div key={step.step_id} className="rounded-xl border border-slate-800/80 bg-neutral-900/35 p-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-200">
                                {step.step_id}
                            </span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusPill(step.status)}`}>
                                {step.status}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                                {step.tool_name || step.step_type}
                            </span>
                        </div>
                        <p className="mt-2.5 text-[15px] text-slate-100">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-300">{step.output_summary}</p>
                    </div>
                ))}
            </div>
        </details>
    );
}

function ValidationCard({ validation }: { validation: ValidationReport }) {
    return (
        <details className="group rounded-2xl border border-amber-500/20 bg-black/50 open:border-amber-400/40" open>
            <summary className="list-none cursor-pointer p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-400"> Validation Agent</p>
                        <p className="mt-1.5 text-[15px] text-slate-200">{validation.summary}</p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusPill(validation.verdict)}`}>
                        {validation.verdict}
                    </span>
                </div>
            </summary>
            <div className="border-t border-slate-800/80 px-5 pb-5 pt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusPill(validation.factual_grounding)}`}>
                        Grounding {validation.factual_grounding}
                    </span>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusPill(validation.logical_consistency)}`}>
                        Logic {validation.logical_consistency}
                    </span>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusPill(validation.cross_verification)}`}>
                        Cross-check {validation.cross_verification}
                    </span>
                </div>
                {validation.issues.length > 0 && (
                    <div className="rounded-xl border border-slate-800/80 bg-neutral-900/35 p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Observed Issues</p>
                        <div className="mt-3 space-y-2">
                            {validation.issues.map((issue, index) => (
                                <p key={`${issue}-${index}`} className="text-sm leading-relaxed text-slate-300">
                                    {issue}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </details>
    );
}

export default function ChatAssistant({ selectedPaper, onSelectPaper }: ChatAssistantProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: "assistant",
            content: "I’m connected to the ALD-GemaMat retrieval assistant. Ask for summaries, comparisons, deposition-specific insights.",
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
                plan: data.plan ?? null,
                execution: data.execution ?? [],
                validation: data.validation ?? null,
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
        <div className="flex flex-col h-full bg-white/[0.01] backdrop-blur-[40px]">
            {/* ── Header ── */}
            <div className="flex flex-col px-5 md:px-7 py-5 md:py-6 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4 mb-5">
                    <div>
                        <h1 className="text-xl font-black text-white tracking-tight">GemaMat</h1>
                        <p className="text-xs text-teal-400 font-semibold tracking-widest uppercase mt-0.5">Materials Science Intelligence</p>
                    </div>
                </div>

                {/* Paper Context Status */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 group">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${selectedPaper ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse' : 'bg-slate-600'}`}></div>
                        <div className="overflow-hidden">
                            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider leading-none mb-1">Target Context</p>
                            <p className="text-sm font-medium text-slate-200 truncate pr-4">
                                {selectedPaper ? selectedPaper.id.toUpperCase() : "Global Catalog Scope"}
                            </p>
                        </div>
                    </div>
                    {selectedPaper && (
                        <button
                            onClick={() => onSelectPaper(null)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 transition-all font-semibold"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>

            {/* ── Message Area ── */}
            <div className="flex-1 overflow-y-auto px-5 md:px-7 py-6 space-y-7 custom-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id}>
                        {msg.role === "user" ? (
                            /* ─ User bubble ─ */
                            <div className="flex justify-end">
                                <div className="max-w-[80%] px-5 py-3.5 rounded-3xl rounded-br-lg text-[15px] leading-relaxed font-semibold text-slate-950 shadow-md"
                                    style={{ background: "var(--gradient-accent)" }}>
                                    <FormattedAnswer content={msg.content} />
                                </div>
                            </div>
                        ) : (
                            /* ─ Assistant (Gemini-style) ─ */
                            <div className="flex items-start gap-3.5">
                                {/* Avatar */}
                                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-white/10 bg-slate-900/60">
                                    <GeminiSparkle size={16} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    {msg.isError ? (
                                        <div className="rounded-2xl px-5 py-4 bg-rose-950/40 border border-rose-500/20">
                                            <FormattedAnswer content={msg.content} />
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <FormattedAnswer content={msg.content} />
                                        </div>
                                    )}

                                    {/* Diagnostics pills */}
                                    {msg.diagnostics && (
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20">
                                                {msg.diagnostics.hyde_enabled ? "HyDE Active" : "Direct Query"}
                                            </span>
                                            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
                                                {msg.diagnostics.planner_used ? "Planner LLM" : "Fallback Plan"}
                                            </span>
                                            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                                Scope: {msg.diagnostics.scope}
                                            </span>
                                            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/80">
                                                {msg.diagnostics.reranked_count}/{msg.diagnostics.retrieved_count} kept
                                            </span>
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusPill(msg.diagnostics.validation_status)}`}>
                                                Validation {msg.diagnostics.validation_status}
                                            </span>
                                        </div>
                                    )}

                                    {/* Agent Execution Section */}
                                    {(msg.plan || (msg.execution && msg.execution.length > 0) || msg.validation) && (
                                        <div className="mt-5 space-y-4">
                                            <div className="flex items-center justify-between gap-3 px-1">
                                                <p className="text-xs uppercase font-bold text-slate-400 tracking-widest">
                                                    Agent Execution
                                                </p>
                                                {msg.diagnostics && (
                                                    <p className="text-xs text-slate-500 font-medium">
                                                        {msg.diagnostics.executed_steps} steps · {msg.diagnostics.tool_calls} tools
                                                    </p>
                                                )}
                                            </div>

                                            {msg.plan && <PlannerCard plan={msg.plan} />}
                                            {msg.execution && msg.execution.length > 0 && <ExecutionTimeline execution={msg.execution} />}
                                            {msg.validation && <ValidationCard validation={msg.validation} />}

                                            {msg.diagnostics && msg.diagnostics.validation_queries.length > 0 && (
                                                <div className="rounded-2xl border border-slate-800/80 bg-black/50 p-5">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Cross-Verification Queries</p>
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {msg.diagnostics.validation_queries.map((item, index) => (
                                                            <span
                                                                key={`${item}-${index}`}
                                                                className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900 text-slate-300 border border-slate-700/80"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Evidence / Sources */}
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-5 space-y-3">
                                            <div className="flex items-center justify-between gap-3 px-1">
                                                <p className="text-xs uppercase font-bold text-slate-400 tracking-widest">
                                                    Evidence Pack
                                                </p>
                                                <p className="text-xs text-slate-500 font-medium">
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
                        )}
                    </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                    <div className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 bg-slate-900/60">
                            <GeminiSparkle size={16} />
                        </div>
                        <div className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/5">
                            <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                            <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                {messages.length === 1 && !isTyping && (
                    <div className="flex flex-col gap-3 pt-4">
                        <p className="text-xs uppercase font-bold text-slate-500 tracking-widest mb-1 px-1">Discover Insights</p>
                        <div className="grid grid-cols-1 gap-2.5">
                            {QUICK_ACTIONS.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuickAction(action)}
                                    className="text-sm px-5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-slate-300 hover:border-teal-500/30 hover:text-teal-300 hover:bg-white/[0.06] transition-all text-left flex items-center justify-between group"
                                >
                                    {action}
                                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* ── Input Area ── */}
            <div className="px-5 md:px-7 py-5 bg-white/[0.02] border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
                <form onSubmit={handleFormSubmit} className="relative flex items-center">
                    <input
                        type="text"
                        placeholder={selectedPaper ? `Ask about ${selectedPaper.id}…` : "Ask GemaMat anything…"}
                        className="w-full bg-white/[0.04] border border-white/10 text-slate-100 rounded-2xl px-6 py-4 pr-14 text-[15px] focus:outline-none focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20 transition-all placeholder-slate-500 shadow-inner"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isTyping}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="absolute right-3 w-10 h-10 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 hover:text-teal-300 disabled:opacity-40 disabled:hover:bg-teal-500/10 transition-all"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    </button>
                </form>
                <div className="mt-3 flex items-center justify-center gap-3">
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-800"></span>
                    <span className="text-[11px] text-slate-500 font-semibold tracking-widest whitespace-nowrap">Planner · Executor · Synthesizer · Validator</span>
                    <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-800"></span>
                </div>
            </div>
        </div>
    );
}
