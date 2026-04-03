"use client";

import { useState } from "react";
import Dashboard from "@/app/components/Dashboard";
import ChatAssistant from "@/app/components/ChatAssistant";
import { type PaperData } from "@/app/lib/data-fetcher";

interface ClientShellProps {
    initialPapers: PaperData[];
}

export default function ClientShell({ initialPapers }: ClientShellProps) {
    const [selectedPaperIndex, setSelectedPaperIndex] = useState<number | null>(null);

    return (
        <main className="flex h-screen overflow-hidden bg-[#0a0f1d]">
            {/* Left Pane: Chat Interaction */}
            <div className="w-[400px] xl:w-[450px] border-r border-slate-800/50 flex-shrink-0 bg-[#0f172a]/40 backdrop-blur-3xl overflow-hidden">
                <ChatAssistant
                    selectedPaper={selectedPaperIndex !== null ? initialPapers[selectedPaperIndex] : null}
                    onSelectPaper={(idx) => setSelectedPaperIndex(idx)}
                />
            </div>

            {/* Right Pane: Intelligence / Visualization */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                <Dashboard
                    papers={initialPapers}
                    selectedPaperIndex={selectedPaperIndex}
                    onSelectPaper={(idx) => setSelectedPaperIndex(idx)}
                />
            </div>
        </main>
    );
}
