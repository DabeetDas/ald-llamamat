"use client";

import { useEffect, useState } from "react";
import Dashboard from "@/app/components/Dashboard";
import ChatAssistant from "@/app/components/ChatAssistant";
import { type PaperData } from "@/app/lib/data-fetcher";

interface ClientShellProps {
    initialPapers: PaperData[];
}

export default function ClientShell({ initialPapers }: ClientShellProps) {
    const [papers, setPapers] = useState(initialPapers);
    const [selectedPaperIndex, setSelectedPaperIndex] = useState<number | null>(null);
    const [loadedPaperIds, setLoadedPaperIds] = useState<Set<string>>(() => new Set());

    useEffect(() => {
        if (selectedPaperIndex === null) {
            return;
        }

        const selectedPaper = papers[selectedPaperIndex];
        if (!selectedPaper || loadedPaperIds.has(selectedPaper.id)) {
            return;
        }

        const controller = new AbortController();

        async function loadPaperDetail() {
            try {
                const response = await fetch(`/api/papers/${encodeURIComponent(selectedPaper.id)}`, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Paper detail request failed with ${response.status}`);
                }

                const fullPaper = await response.json() as PaperData;
                setPapers((currentPapers) =>
                    currentPapers.map((paper) => paper.id === fullPaper.id ? fullPaper : paper)
                );
                setLoadedPaperIds((currentIds) => new Set(currentIds).add(fullPaper.id));
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("Failed to load paper detail", error);
                }
            }
        }

        loadPaperDetail();

        return () => controller.abort();
    }, [loadedPaperIds, papers, selectedPaperIndex]);

    return (
        <main className="flex flex-col md:flex-row h-[100dvh] overflow-hidden bg-black">
            {/* Left Pane: Chat Interaction */}
            <div className="w-full md:w-[400px] xl:w-[450px] h-[45vh] md:h-full border-t md:border-t-0 md:border-r border-white/5 flex-shrink-0 bg-white/[0.02] backdrop-blur-[40px] overflow-hidden flex flex-col order-last md:order-first">
                <ChatAssistant
                    selectedPaper={selectedPaperIndex !== null ? papers[selectedPaperIndex] : null}
                    onSelectPaper={(idx) => setSelectedPaperIndex(idx)}
                />
            </div>

            {/* Right Pane: Intelligence / Visualization */}
            <div className="flex-1 h-[55vh] md:h-full overflow-y-auto custom-scrollbar relative order-first md:order-last">
                <Dashboard
                    papers={papers}
                    selectedPaperIndex={selectedPaperIndex}
                    onSelectPaper={(idx) => setSelectedPaperIndex(idx)}
                />
            </div>
        </main>
    );
}
