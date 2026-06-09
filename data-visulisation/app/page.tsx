import { getCatalogPapers } from "@/app/lib/data-fetcher";
import ClientShell from "@/app/components/ClientShell";

export default async function Home() {
  const papers = await getCatalogPapers();

  return <ClientShell initialPapers={papers} />;
}
