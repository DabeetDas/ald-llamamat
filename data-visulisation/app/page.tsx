import { getAllPapers } from "@/app/lib/data-fetcher";
import ClientShell from "@/app/components/ClientShell";

export default async function Home() {
  const papers = await getAllPapers();

  return <ClientShell initialPapers={papers} />;
}
