import Nav from "@/components/ui/Nav";
import Footer from "@/components/sections/Footer";
import contentData from "./content.json";

export default function DocPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-slate-200">
      <div className="relative h-[68px] z-50 bg-[#0a0a0a] border-b border-zinc-800">
        <Nav />
      </div>
      <div className="flex flex-1 mx-auto w-full max-w-screen-2xl relative">
        <main className="flex-1 px-6 py-10 md:px-10 lg:px-12 max-w-4xl mx-auto">
          <a href="/docs" className="text-blue-400 hover:text-blue-300 text-sm flex items-center mb-8">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Manuals
          </a>
          <div className="docs-content" dangerouslySetInnerHTML={{ __html: contentData.html }} />
        </main>
      </div>
      <Footer />
    </div>
  );
}