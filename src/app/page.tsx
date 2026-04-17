import InvestorSection from "@/components/InvestorSection";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import { VolcanoHero, Embers, Experimental } from "@/components/ClientScenes";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Image from "next/image";

const stats = [
  { value: "50", suffix: " MW", label: "Geothermal Baseload", sub: "per site" },
  { value: "28", suffix: "K", label: "GPU Cluster", sub: "H100-class" },
  { value: "99.99", suffix: "%", label: "Uptime", sub: "zero-carbon" },
  { value: "88", suffix: "%", label: "EBITDA Margin", sub: "per datacenter" },
];

const problems = [
  {
    icon: "~",
    title: "No AI Sovereignty",
    desc: "100% dependence on foreign cloud. No domestic GPU baseload for national AI workloads.",
  },
  {
    icon: "!",
    title: "Energy Instability",
    desc: "70% coal dependency, 10-20% grid outage rate. Rural areas lack reliable power infrastructure.",
  },
  {
    icon: "#",
    title: "Carbon Market Gap",
    desc: "World's largest carbon sinks with zero MRV infrastructure to tokenize credits legally.",
  },
];

const solutions = [
  {
    title: "Sovereign AI Compute",
    desc: "Geothermal-powered, export-control independent datacenters running national LLMs, MRV, climate models, and food security AI.",
    highlight: "Off-grid. Zero-carbon. 24/7 baseload.",
  },
  {
    title: "Immersion-Cooled GPU Clusters",
    desc: "24,000-28,000 H100-class GPUs per site with liquid immersion cooling achieving PUE 1.05-1.15 — powered directly by volcanic heat exchange.",
    highlight: "Earth's mass as a 1000x faster thermal conductor.",
  },
  {
    title: "Carbon MRV Engine",
    desc: "Full-stack measurement, reporting, and verification. Real, auditable, non-synthetic carbon flows from soil sensor to tokenized credit.",
    highlight: "Article 6-compliant. Blockchain-verified.",
  },
  {
    title: "National Sensor Grid",
    desc: "Millions of low-cost agricultural sensors across farmland. Continuous environmental, crop, and supply chain telemetry verified at source.",
    highlight: "DePIN infrastructure. Cryptographically anchored.",
  },
];

const advantages = [
  {
    number: "01",
    title: "Own the Power Source",
    desc: "Others rent cloud on weak grids. We own volcano-powered AI with standalone microgrids and zero transmission loss.",
  },
  {
    number: "02",
    title: "End-to-End Traceability",
    desc: "From soil sensor to drone to satellite to geothermal AI to tokenized carbon. No one else has this complete chain.",
  },
  {
    number: "03",
    title: "Geothermal Abundance",
    desc: "Indonesia controls 40% of global geothermal potential — 24 GW of untapped reserves across the Ring of Fire.",
  },
  {
    number: "04",
    title: "Scalable Blueprint",
    desc: "Each site is a replicable sovereign compute node. One template, 10 sites, 50 sites — national infrastructure at scale.",
  },
];

const revenueStreams = [
  {
    title: "AI Compute Leasing",
    amount: "$280-340M/yr",
    share: "77.5%",
    desc: "Zero-carbon sovereign H100 compute for hyperscalers, enterprises, and government AI programs.",
  },
  {
    title: "Tokenized Compute Credits",
    amount: "$25-40M/yr",
    share: "8.1%",
    desc: "Prepaid GPU access for enterprise and developer ecosystems.",
  },
  {
    title: "Power Efficiency Capture",
    amount: "$20-30M/yr",
    share: "6.3%",
    desc: "Geothermal baseload + immersion cooling dramatically reduces OPEX.",
  },
  {
    title: "Internal AI Demand",
    amount: "$20-30M/yr",
    share: "8.1%",
    desc: "Agriculture MRV, carbon modeling, and LLM workloads drive utilization at zero marginal cost.",
  },
];

const pipeline = [
  {
    step: "01",
    title: "Geothermal Wells",
    desc: "50 MW baseload from volcanic heat at 90% capacity factor",
  },
  {
    step: "02",
    title: "ORC Power Plant",
    desc: "Binary cycle conversion with zero grid dependency",
  },
  {
    step: "03",
    title: "Standalone Microgrid",
    desc: "Direct power delivery — no transmission loss",
  },
  {
    step: "04",
    title: "Immersion Cooling",
    desc: "Liquid-cooled GPU racks at PUE 1.05-1.15",
  },
  {
    step: "05",
    title: "AI Inference",
    desc: "24-28K GPUs serving sovereign compute workloads",
  },
];

export default function Home() {
  return (
    <main className="grid-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-geo-darker/80 backdrop-blur-xl border-b border-geo-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-dark.png"
              alt="Geoforce"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-geo-muted">
            <a href="#problem" className="hover:text-foreground transition">
              Problem
            </a>
            <a href="#solution" className="hover:text-foreground transition">
              Solution
            </a>
            <a href="#infrastructure" className="hover:text-foreground transition">
              Infrastructure
            </a>
            <a href="#investors" className="hover:text-foreground transition">
              Investors
            </a>
            <a
              href="mailto:chris@gogwf.com?subject=Geoforce.ai%20Inquiry"
              className="px-4 py-2 bg-geo-lime hover:bg-geo-green text-geo-darker rounded-full text-sm font-medium transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — with 3D volcano + ember particles */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <VolcanoHero />
        <Embers />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-geo-darker/30 to-geo-darker pointer-events-none z-[2]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <AnimatedSection delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-geo-border bg-geo-darker/60 backdrop-blur-sm text-xs text-geo-muted mb-8">
              <span className="w-2 h-2 rounded-full bg-geo-lime animate-pulse" />
              Sovereign AI Infrastructure — Indonesia
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 tracking-tight">
              Volcano-Powered
              <br />
              <span className="gradient-text">AI Compute</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.6}>
            <p className="text-lg md:text-xl text-geo-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Zero-carbon, sovereign GPU infrastructure powered by Indonesia&apos;s
              geothermal reserves. From the Earth&apos;s core to your AI workloads.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="mailto:chris@gogwf.com?subject=Compute%20Access%20Request"
                className="px-8 py-4 bg-geo-lime hover:bg-geo-green text-geo-darker font-bold rounded-full transition-all duration-300 text-sm"
              >
                Request Compute Access
              </a>
              <a
                href="#solution"
                className="px-8 py-4 border border-geo-border hover:border-geo-lime/40 text-foreground rounded-full transition-all duration-300 text-sm backdrop-blur-sm"
              >
                Learn More
              </a>
            </div>
          </AnimatedSection>

          {/* Stats Row — with count-up */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto" staggerDelay={0.15}>
            {stats.map((stat) => (
              <StaggerItem
                key={stat.label}
              >
                <div className="bg-geo-card/60 backdrop-blur-sm border border-geo-border rounded-xl p-5 text-center">
                  <CountUp
                    value={stat.value + stat.suffix}
                    className="text-2xl md:text-3xl font-bold gradient-text"
                  />
                  <div className="text-sm text-foreground font-medium mt-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-geo-muted">{stat.sub}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="glow-line" />

      {/* Problem */}
      <section id="problem" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/coal-crisis.png"
            alt=""
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-geo-darker/80" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="gradient-text">Crisis</span>
            </h2>
            <p className="text-geo-muted max-w-xl mx-auto">
              Indonesia faces multiple national-security level challenges
              simultaneously. The window to act is now.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {problems.map((p) => (
              <StaggerItem key={p.title}>
                <div className="bg-geo-card border border-geo-border rounded-2xl p-8 hover:border-geo-lime/30 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-geo-lime/10 border border-geo-lime/20 flex items-center justify-center text-geo-lime font-mono font-bold text-lg mb-4">
                    {p.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-geo-muted leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="glow-line" />

      {/* Solution */}
      <section id="solution" className="py-24 px-6 relative">
        <div className="radial-glow absolute inset-0 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="gradient-text">Solution</span>
            </h2>
            <p className="text-geo-muted max-w-2xl mx-auto">
              A fully integrated geothermal AI supercompute platform. Sovereign,
              sustainable, and scalable across Indonesia&apos;s volcanic belt.
            </p>
          </AnimatedSection>
          {/* Hero image */}
          <AnimatedSection className="mb-12">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-geo-border">
              <Image
                src="/images/hero-volcano.png"
                alt="Geothermal power plant at the base of a volcano in Indonesia"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 1152px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-geo-darker/60 via-transparent to-transparent" />
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.12}>
            {solutions.map((s) => (
              <StaggerItem key={s.title}>
                <div className="bg-geo-card border border-geo-border rounded-2xl p-8 hover:border-geo-lime/30 transition-all duration-300 group h-full">
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-sm text-geo-muted leading-relaxed mb-4">
                    {s.desc}
                  </p>
                  <div className="text-xs font-mono text-geo-lime bg-geo-lime/5 px-3 py-2 rounded-lg border border-geo-lime/10 inline-block">
                    {s.highlight}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="glow-line" />

      {/* Infrastructure / How it Works */}
      <section id="infrastructure" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From <span className="gradient-text">Magma to Model</span>
            </h2>
            <p className="text-geo-muted max-w-2xl mx-auto">
              A complete vertical stack — from geothermal wells to GPU inference.
              Each layer engineered for sovereign, zero-carbon operation.
            </p>
          </AnimatedSection>

          {/* Image row */}
          <AnimatedSection className="mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-geo-border">
                <Image
                  src="/images/geothermal-plant.png"
                  alt="Kamojang geothermal power plant in Indonesian rainforest"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-geo-darker/50 via-transparent to-transparent" />
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-geo-border">
                <Image
                  src="/images/datacenter-gpus.png"
                  alt="High-density H100 GPU datacenter with immersion cooling"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-geo-darker/50 via-transparent to-transparent" />
              </div>
            </div>
          </AnimatedSection>

          {/* Pipeline visualization */}
          <StaggerContainer
            className="flex flex-col md:flex-row items-stretch gap-4 mb-16"
            staggerDelay={0.1}
          >
            {pipeline.map((item, i, arr) => (
              <StaggerItem key={item.step} className="flex-1 flex items-stretch">
                <div className="bg-geo-card border border-geo-border rounded-xl p-5 flex-1 hover:border-geo-lime/30 transition-all">
                  <div className="text-geo-lime font-mono text-xs mb-2">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-geo-muted">{item.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:flex items-center px-1 text-geo-lime/40">
                    &rarr;
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Competitive Advantages */}
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {advantages.map((a) => (
              <StaggerItem key={a.number}>
                <div className="flex gap-5 items-start">
                  <div className="text-3xl font-bold text-geo-lime/20 font-mono shrink-0">
                    {a.number}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{a.title}</h4>
                    <p className="text-sm text-geo-muted">{a.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="glow-line" />

      {/* Revenue Model */}
      <section className="py-24 px-6 relative">
        <div className="radial-glow absolute inset-0 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">4 Revenue Streams</span>
            </h2>
            <p className="text-geo-muted max-w-xl mx-auto">
              High-margin, investor-ready. $345M - $440M total revenue per
              datacenter site.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.12}>
            {revenueStreams.map((r) => (
              <StaggerItem key={r.title}>
                <div className="bg-geo-card border border-geo-border rounded-2xl p-6 hover:border-geo-lime/30 transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold">{r.title}</h3>
                    <span className="text-xs text-geo-muted font-mono bg-geo-darker px-2 py-1 rounded">
                      {r.share}
                    </span>
                  </div>
                  <div className="text-2xl font-bold gradient-text mb-2">
                    {r.amount}
                  </div>
                  <p className="text-sm text-geo-muted">{r.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="glow-line" />

      {/* Investor Section (Expandable) */}
      <InvestorSection />

      <div className="glow-line" />

      {/* Contact / CTA */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="radial-glow absolute inset-0 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="gradient-text">Build the Future</span>?
            </h2>
            <p className="text-geo-muted mb-10 max-w-xl mx-auto">
              Whether you&apos;re looking for sovereign AI compute, investing in
              climate infrastructure, or exploring partnership opportunities —
              let&apos;s talk.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15} className="mb-8">
            <div className="relative aspect-[3/1] rounded-2xl overflow-hidden border border-geo-border">
              <Image
                src="/images/indonesia-map.png"
                alt="Indonesia geothermal sites map showing exploration and production permits"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-geo-darker/70 via-geo-darker/20 to-transparent" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="bg-geo-card border border-geo-border rounded-2xl p-8 md:p-12 text-center space-y-8">
              <div className="space-y-4">
                <p className="text-geo-muted">
                  Reach out directly — we respond within 24 hours.
                </p>
                <a
                  href="mailto:chris@gogwf.com?subject=Geoforce.ai%20Inquiry"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-geo-lime hover:bg-geo-green text-geo-darker font-bold rounded-full transition-all duration-300 text-lg"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  chris@gogwf.com
                </a>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-geo-border">
                <a
                  href="mailto:chris@gogwf.com?subject=Compute%20Access%20Request"
                  className="py-3 px-4 border border-geo-border rounded-lg text-sm text-geo-muted hover:text-foreground hover:border-geo-lime/30 transition-all text-center"
                >
                  AI Compute
                </a>
                <a
                  href="mailto:chris@gogwf.com?subject=Investment%20Inquiry%20-%20Geoforce.ai"
                  className="py-3 px-4 border border-geo-border rounded-lg text-sm text-geo-muted hover:text-foreground hover:border-geo-lime/30 transition-all text-center"
                >
                  Investment
                </a>
                <a
                  href="mailto:chris@gogwf.com?subject=Partnership%20Inquiry%20-%20Geoforce.ai"
                  className="py-3 px-4 border border-geo-border rounded-lg text-sm text-geo-muted hover:text-foreground hover:border-geo-lime/30 transition-all text-center"
                >
                  Partnership
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="glow-line" />

      {/* Experimental Visual Lab */}
      <Experimental />

      {/* Footer */}
      <footer className="border-t border-geo-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-dark.png"
              alt="Geoforce"
              width={120}
              height={34}
              className="h-6 w-auto"
            />
          </div>
          <p className="text-xs text-geo-muted">
            They&apos;re renting clouds. We&apos;re owning volcanoes.
          </p>
          <p className="text-xs text-geo-muted">
            &copy; {new Date().getFullYear()} Geoforce.ai — All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
