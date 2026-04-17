"use client";

import { useState } from "react";

const fundingRows = [
  { label: "GPUs + AI Datacenter Build", amount: "$900M" },
  { label: "Geothermal Power Plant", amount: "$250-300M" },
  { label: "Sensors, MRV & Digital Stack", amount: "$30-50M" },
];

const financials = [
  { label: "Revenue per Site", value: "$345M - $440M/yr" },
  { label: "EBITDA Margin", value: "85 - 88%" },
  { label: "Payback Period", value: "~3.5 years" },
  { label: "Target IRR", value: "22 - 28%" },
];

const phases = [
  {
    quarter: "Q1",
    title: "Site Prep & Resource Confirmation",
    items: [
      "Geophysical surveys",
      "Drilling contractor mobilization",
      "Pad construction & access roads",
    ],
  },
  {
    quarter: "Q2",
    title: "Drilling Program",
    items: [
      "Drill 4-6 production wells",
      "Flow testing & reservoir confirmation",
      "Finalize power output curves",
    ],
  },
  {
    quarter: "Q3",
    title: "Geothermal Plant Build",
    items: [
      "Binary cycle plant foundations",
      "Heat exchangers + ORC installation",
      "Microgrid integration planning",
    ],
  },
  {
    quarter: "Q4",
    title: "Datacenter Construction",
    items: [
      "Modular racks + immersion cooling",
      "Power distribution & switchgear",
      "Fiber + network backbone",
    ],
  },
];

export default function InvestorSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="investors" className="py-24 px-6 relative">
      <div className="radial-glow absolute inset-0 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Toggle Button */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            For <span className="gradient-text">Investors</span>
          </h2>
          <p className="text-geo-muted max-w-2xl mx-auto mb-8">
            $1.2B to ignite Indonesia&apos;s sovereign AI backbone. Equity in a
            permanently low-cost, zero-carbon compute foundation powered by
            volcanic energy.
          </p>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-geo-lime/40 text-geo-lime hover:bg-geo-lime/10 transition-all duration-300 cursor-pointer font-medium"
          >
            {isOpen ? "Close" : "View"} Investment Details
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Expandable Content */}
        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            isOpen ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-12">
            {/* The Ask */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-geo-card border border-geo-border rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-2 gradient-text">
                  Capital Structure
                </h3>
                <p className="text-geo-muted text-sm mb-6">
                  Total raise: $1.2B (fully inclusive)
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-geo-darker rounded-lg">
                    <span className="text-sm text-geo-muted">Equity</span>
                    <span className="font-bold text-geo-lime">$700M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-geo-darker rounded-lg">
                    <span className="text-sm text-geo-muted">
                      Debt (ADB, JETP, Green Bonds)
                    </span>
                    <span className="font-bold text-geo-yellow">$500M</span>
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-geo-muted mb-3 uppercase tracking-wider">
                  Use of Funds
                </h4>
                <div className="space-y-2">
                  {fundingRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-400">{row.label}</span>
                      <span className="font-mono text-foreground">
                        {row.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-geo-card border border-geo-border rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-2 gradient-text">
                  Financial Projections
                </h3>
                <p className="text-geo-muted text-sm mb-6">Per datacenter site</p>
                <div className="space-y-4">
                  {financials.map((item) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="font-bold text-lg">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-geo-darker rounded-lg border border-geo-lime/20">
                  <p className="text-sm text-geo-muted">
                    Realistic{" "}
                    <span className="text-geo-lime font-bold">
                      4-5x exit
                    </span>{" "}
                    in 5-7 years based on AI infrastructure multiples
                  </p>
                </div>
              </div>
            </div>

            {/* Roadmap Timeline */}
            <div className="bg-geo-card border border-geo-border rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-8 gradient-text">
                Execution Roadmap
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {phases.map((phase, i) => (
                  <div key={phase.quarter} className="relative">
                    {i < phases.length - 1 && (
                      <div className="hidden md:block absolute top-4 left-full w-full h-px bg-gradient-to-r from-geo-lime/40 to-transparent z-0" />
                    )}
                    <div className="relative z-10">
                      <div className="w-8 h-8 rounded-full bg-geo-lime/20 border border-geo-lime/40 flex items-center justify-center text-geo-lime text-xs font-bold mb-3">
                        {phase.quarter}
                      </div>
                      <h4 className="font-semibold text-sm mb-2">
                        {phase.title}
                      </h4>
                      <ul className="space-y-1">
                        {phase.items.map((item) => (
                          <li
                            key={item}
                            className="text-xs text-geo-muted flex items-start gap-1.5"
                          >
                            <span className="text-geo-lime mt-0.5">-</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What Investors Get */}
            <div className="bg-geo-card border border-geo-border rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 gradient-text">
                What Investors Receive
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Equity in Sovereign AI Backbone",
                    desc: "Permanently low-cost, zero-carbon compute foundation using domestic volcanic energy.",
                  },
                  {
                    title: "Priority H100 Compute Access",
                    desc: "Guaranteed GPU capacity plus carbon-verified MRV flows and tokenized credits.",
                  },
                  {
                    title: "AI + Climate + Agriculture Flywheel",
                    desc: "Carbon modeling, food system optimization, and national LLM training increase utilization at zero marginal cost.",
                  },
                  {
                    title: "10-Site Replication Path",
                    desc: "Each site is a sovereign geothermal compute node. Site #1 is the template for national rollout.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-geo-lime mt-2 shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-geo-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-geo-lime hover:bg-geo-green text-geo-darker font-bold rounded-full transition-all duration-300"
              >
                Request Investment Deck
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
