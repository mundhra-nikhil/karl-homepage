"use client";

import Nav from "@/components/ui/Nav";
import Footer from "@/components/sections/Footer";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-150px 0px -60% 0px" }
    );

    const sections = ["getting-started", "product-info", "security-compliance"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-slate-300 selection:bg-blue-500/30 font-sans">
      {/* Header Container */}
      <div className="sticky top-0 h-[68px] z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <Nav />
      </div>

      <div className="flex flex-1 w-full max-w-7xl mx-auto relative">
        {/* Left Sidebar */}
        <aside className="hidden md:flex flex-col sticky top-[68px] h-[calc(100vh-68px)] w-[280px] shrink-0 overflow-y-auto py-8 px-6 border-r border-white/5 bg-black/50 backdrop-blur-xl">
          <div className="mb-8">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">Karl Docs</h2>
            <p className="text-xs text-slate-500 mt-1">v2.0.0-beta</p>
          </div>
          
          <nav className="flex flex-col gap-8">
            {/* Group 1 */}
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Getting Started
              </h4>
              <ul className="flex flex-col gap-1.5 border-l border-white/5 ml-1 pl-4 text-sm">
                <li><Link href="/docs/enablement-guide" className="block py-1 text-slate-400 hover:text-blue-400 transition-colors">Enablement Guide</Link></li>
                <li><Link href="/docs/trial-experience" className="block py-1 text-slate-400 hover:text-blue-400 transition-colors">Trial Experience</Link></li>
                <li><Link href="/docs/workload-enablement" className="block py-1 text-slate-400 hover:text-blue-400 transition-colors">Workload Enablement</Link></li>
                <li><Link href="/docs/user-guide" className="block py-1 text-slate-400 hover:text-blue-400 transition-colors">User Guide</Link></li>
              </ul>
            </div>

            {/* Group 2 */}
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                Product Info
              </h4>
              <ul className="flex flex-col gap-1.5 border-l border-white/5 ml-1 pl-4 text-sm">
                <li><Link href="/docs/whitepaper" className="block py-1 text-slate-400 hover:text-purple-400 transition-colors">The Insight Agent</Link></li>
                <li><Link href="/docs/vs-fabric" className="block py-1 text-slate-400 hover:text-purple-400 transition-colors">Karl vs Fabric</Link></li>
                <li><Link href="/docs/purchasing-flow" className="block py-1 text-slate-400 hover:text-purple-400 transition-colors">Purchasing Flow</Link></li>
                <li><Link href="/docs/pricing" className="block py-1 text-slate-400 hover:text-purple-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Group 3 */}
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                Security
              </h4>
              <ul className="flex flex-col gap-1.5 border-l border-white/5 ml-1 pl-4 text-sm">
                <li><Link href="/docs/security-document" className="block py-1 text-slate-400 hover:text-emerald-400 transition-colors">Security Overview</Link></li>
                <li><Link href="/docs/fabric-plan" className="block py-1 text-slate-400 hover:text-emerald-400 transition-colors">Fabric Plan</Link></li>
                <li><Link href="/docs/api-permissions" className="block py-1 text-slate-400 hover:text-emerald-400 transition-colors">API Permissions</Link></li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-6 py-12 md:px-12 lg:px-16 xl:px-24">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="relative mb-20 mt-8">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Karl <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Manuals</span></h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">
                Learn how to install, set up, configure, and use Karl products with this collection of in-depth user guides, whitepapers, and security documentation.
              </p>
            </div>

            {/* Section: Getting Started */}
            <section id="getting-started" className="mb-24 scroll-mt-28 relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-50">Getting Started</h2>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                
                <Link href="/docs/enablement-guide" className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-blue-500/50 hover:to-blue-500/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_-10px_rgba(59,130,246,0.3)]">
                  <div className="relative h-full flex flex-col rounded-[15px] bg-[#0A0A0A] p-6 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full group-hover:bg-blue-500/10 transition-all"></div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-blue-400 transition-colors">Karl Enablement Guide</h3>
                    <p className="text-sm text-slate-400 flex-1 leading-relaxed">Pre-requisite guide outlining the Workload Setup required for Guest Tenants before enabling Karl.</p>
                  </div>
                </Link>

                <Link href="/docs/trial-experience" className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-blue-500/50 hover:to-blue-500/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_-10px_rgba(59,130,246,0.3)]">
                  <div className="relative h-full flex flex-col rounded-[15px] bg-[#0A0A0A] p-6 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full group-hover:bg-blue-500/10 transition-all"></div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-blue-400 transition-colors">Trial Experience Document</h3>
                    <p className="text-sm text-slate-400 flex-1 leading-relaxed">Comprehensive Trial Experience Guide demonstrating the initial setup and expected flows during the trial period.</p>
                  </div>
                </Link>

                <Link href="/docs/workload-enablement" className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-blue-500/50 hover:to-blue-500/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_-10px_rgba(59,130,246,0.3)]">
                  <div className="relative h-full flex flex-col rounded-[15px] bg-[#0A0A0A] p-6 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full group-hover:bg-blue-500/10 transition-all"></div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-blue-400 transition-colors">Workload Enablement</h3>
                    <p className="text-sm text-slate-400 flex-1 leading-relaxed">Technical specifications and steps required for configuring workload enablement across environments.</p>
                  </div>
                </Link>

                <Link href="/docs/user-guide" className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-blue-500/50 hover:to-blue-500/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_-10px_rgba(59,130,246,0.3)]">
                  <div className="relative h-full flex flex-col rounded-[15px] bg-[#0A0A0A] p-6 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full group-hover:bg-blue-500/10 transition-all"></div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-blue-400 transition-colors">Product Docs - User Guide</h3>
                    <p className="text-sm text-slate-400 flex-1 leading-relaxed">A comprehensive user guide outlining the complete lifecycle from trial access to full product adoption.</p>
                  </div>
                </Link>

              </div>
            </section>

            {/* Section: Product Information */}
            <section id="product-info" className="mb-24 scroll-mt-28 relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-50">Product Information</h2>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                
                <Link href="/docs/whitepaper" className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-purple-500/50 hover:to-purple-500/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_-10px_rgba(168,85,247,0.3)]">
                  <div className="relative h-full flex flex-col rounded-[15px] bg-[#0A0A0A] p-6 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full group-hover:bg-purple-500/10 transition-all"></div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-purple-400 transition-colors">The Insight Agent</h3>
                    <p className="text-sm text-slate-400 flex-1 leading-relaxed">Deep dive whitepaper exploring the architecture, capabilities, and benefits of Karl as an Insight Agent.</p>
                  </div>
                </Link>

                <Link href="/docs/vs-fabric" className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-purple-500/50 hover:to-purple-500/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_-10px_rgba(168,85,247,0.3)]">
                  <div className="relative h-full flex flex-col rounded-[15px] bg-[#0A0A0A] p-6 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full group-hover:bg-purple-500/10 transition-all"></div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-purple-400 transition-colors">Karl vs Fabric Data Agent</h3>
                    <p className="text-sm text-slate-400 flex-1 leading-relaxed">A detailed comparison between Karl and the Microsoft Fabric Data Agent, highlighting key differentiators.</p>
                  </div>
                </Link>

                <Link href="/docs/purchasing-flow" className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-purple-500/50 hover:to-purple-500/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_-10px_rgba(168,85,247,0.3)]">
                  <div className="relative h-full flex flex-col rounded-[15px] bg-[#0A0A0A] p-6 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full group-hover:bg-purple-500/10 transition-all"></div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-purple-400 transition-colors">SaaS Purchasing Flow</h3>
                    <p className="text-sm text-slate-400 flex-1 leading-relaxed">Documentation explaining the SaaS purchasing workflow, onboarding steps, and provisioning for Karl.</p>
                  </div>
                </Link>

                <Link href="/docs/pricing" className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-purple-500/50 hover:to-purple-500/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_-10px_rgba(168,85,247,0.3)]">
                  <div className="relative h-full flex flex-col rounded-[15px] bg-[#0A0A0A] p-6 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full group-hover:bg-purple-500/10 transition-all"></div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-purple-400 transition-colors">Karl Pricing</h3>
                    <p className="text-sm text-slate-400 flex-1 leading-relaxed">Details on Pricing and Credits for Karl usage, including tier breakdowns and billing models.</p>
                  </div>
                </Link>

              </div>
            </section>

            {/* Section: Security & Compliance */}
            <section id="security-compliance" className="mb-24 scroll-mt-28 relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-50">Security & Compliance</h2>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                
                <Link href="/docs/security-document" className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-emerald-500/50 hover:to-emerald-500/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_-10px_rgba(16,185,129,0.3)]">
                  <div className="relative h-full flex flex-col rounded-[15px] bg-[#0A0A0A] p-6 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full group-hover:bg-emerald-500/10 transition-all"></div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-emerald-400 transition-colors">Karl Security Document</h3>
                    <p className="text-sm text-slate-400 flex-1 leading-relaxed">Comprehensive Security Document outlining compliance, infrastructure security, and data protection policies.</p>
                  </div>
                </Link>

                <Link href="/docs/fabric-plan" className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-emerald-500/50 hover:to-emerald-500/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_-10px_rgba(16,185,129,0.3)]">
                  <div className="relative h-full flex flex-col rounded-[15px] bg-[#0A0A0A] p-6 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full group-hover:bg-emerald-500/10 transition-all"></div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-emerald-400 transition-colors">Fabric Plan Documentation</h3>
                    <p className="text-sm text-slate-400 flex-1 leading-relaxed">Technical documentation covering the integration, deployment, and security of the Fabric Plan within Karl.</p>
                  </div>
                </Link>

                <Link href="/docs/api-permissions" className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-emerald-500/50 hover:to-emerald-500/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_-10px_rgba(16,185,129,0.3)] sm:col-span-2 lg:col-span-1">
                  <div className="relative h-full flex flex-col rounded-[15px] bg-[#0A0A0A] p-6 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full group-hover:bg-emerald-500/10 transition-all"></div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-emerald-400 transition-colors">API Permissions</h3>
                    <p className="text-sm text-slate-400 flex-1 leading-relaxed">Detailed security justification and data governance rules regarding API access and permission structures.</p>
                  </div>
                </Link>

              </div>
            </section>

          </div>
        </main>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden xl:block shrink-0 sticky top-[68px] h-[calc(100vh-68px)] w-[240px] overflow-y-auto py-12 px-6 border-l border-white/5">
          <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-6">On this page</h4>
          <nav className="relative flex flex-col gap-1 text-sm text-slate-400">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5"></div>
            
            <a href="#getting-started" className={`relative pl-4 py-1.5 transition-colors hover:text-slate-200 ${activeSection === 'getting-started' ? 'text-blue-400 font-medium' : ''}`}>
              {activeSection === 'getting-started' && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>}
              Getting Started
            </a>
            
            <a href="#product-info" className={`relative pl-4 py-1.5 transition-colors hover:text-slate-200 ${activeSection === 'product-info' ? 'text-purple-400 font-medium' : ''}`}>
              {activeSection === 'product-info' && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>}
              Product Info
            </a>
            
            <a href="#security-compliance" className={`relative pl-4 py-1.5 transition-colors hover:text-slate-200 ${activeSection === 'security-compliance' ? 'text-emerald-400 font-medium' : ''}`}>
              {activeSection === 'security-compliance' && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>}
              Security & Compliance
            </a>
          </nav>
          
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3 text-sm text-slate-500 hover:text-slate-300 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Edit this page
            </a>
            <a href="#" className="flex items-center gap-3 text-sm text-slate-500 hover:text-slate-300 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Request an update
            </a>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
