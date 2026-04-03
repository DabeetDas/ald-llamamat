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
        <main className="flex flex-col md:flex-row h-[100dvh] overflow-hidden bg-[#0a0f1d]">
            {/* Left Pane: Chat Interaction */}
            <div className="w-full md:w-[400px] xl:w-[450px] h-[45vh] md:h-full border-t md:border-t-0 md:border-r border-slate-800/50 flex-shrink-0 bg-[#0f172a]/40 backdrop-blur-3xl overflow-hidden flex flex-col order-last md:order-first">
                <ChatAssistant
                    selectedPaper={selectedPaperIndex !== null ? initialPapers[selectedPaperIndex] : null}
                    onSelectPaper={(idx) => setSelectedPaperIndex(idx)}
                />
            </div>

            {/* Right Pane: Intelligence / Visualization */}
            <div className="flex-1 h-[55vh] md:h-full overflow-y-auto custom-scrollbar relative order-first md:order-last">
                <Dashboard
                    papers={initialPapers}
                    selectedPaperIndex={selectedPaperIndex}
                    onSelectPaper={(idx) => setSelectedPaperIndex(idx)}
                />
            </div>
        </main>
    );
}
