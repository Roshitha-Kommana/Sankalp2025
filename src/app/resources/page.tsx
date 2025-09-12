"use client";
import Navbar from "@/components/global/nav";
import Footer from "@/components/global/footer";
import Link from "next/link";

export default function LinksPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#141414] text-[#fcf2e8] flex flex-col items-center justify-center px-4 py-16">
        <section className="w-full max-w-7xl flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-black text-center mb-8 tracking-tight" style={{letterSpacing: "-2px"}}>Links</h1>
          <div className="flex flex-col sm:flex-row gap-8 w-full sm:overflow-x-auto pb-4 justify-center items-center sm:items-stretch">
            {/* Registration Link Card */}
            <div className="w-full sm:min-w-[320px] sm:max-w-[350px] sm:w-full rounded-2xl p-5 md:p-8 bg-[#c5ffc9] text-[#141414] flex flex-col gap-3 shadow-xl border border-[#b2e6d3]">
              <div className="mb-1">
                <span className="inline-block bg-[#141414] text-[#fcf2e8] px-3 py-1.5 rounded-full text-sm font-medium">
                  Registration Link
                </span>
              </div>
              <span className="font-extrabold text-base px-4 py-2 rounded-xl bg-[#ffffff33] text-[#141414] text-center select-none" style={{backdropFilter:'blur(2px)'}}>
                Registrations Closed
              </span>
            </div>
            {/* PPT Template Card */}
            <div className="w-full sm:min-w-[320px] sm:max-w-[350px] sm:w-full rounded-2xl p-5 md:p-8 bg-[#f9ffa5] text-[#141414] flex flex-col gap-3 shadow-xl border border-[#e6e6b2]">
              <div className="mb-1">
                <span className="inline-block bg-[#141414] text-[#fcf2e8] px-3 py-1.5 rounded-full text-sm font-medium">
                  PPT Template
                </span>
              </div>
              <a
                href="/assets/round1ppt.pptx"
                download
                className="font-extrabold text-sm px-3 py-1 rounded-full border border-[#00C853] bg-white text-[#00C853] hover:bg-[#00C853] hover:text-white active:bg-[#00C853] active:text-white transition-colors duration-200 w-fit"
                style={{letterSpacing: '1px', textDecoration: 'none', display: 'inline-block'}}>
                Download PPT Template
              </a>
            </div>
            {/* Round 1 Submission Card */}
            <div className="w-full sm:min-w-[320px] sm:max-w-[350px] sm:w-full rounded-2xl p-5 md:p-8 bg-[#feaac0] text-[#141414] flex flex-col gap-3 shadow-xl border border-[#f7c2d2]">
              <div className="mb-1">
                <span className="inline-block bg-[#141414] text-[#fcf2e8] px-3 py-1.5 rounded-full text-sm font-medium">
                  Round 1 PPT Submission
                </span>
              </div>
              <span className="font-extrabold text-base px-4 py-2 rounded-xl bg-[#ffffff33] text-[#141414] text-center select-none" style={{backdropFilter:'blur(2px)'}}>
                Submissions Closed
              </span>
            </div>
          </div>
        </section>
      </main>
  {/* Footer intentionally removed as per user request */}
    </>
  );
}
