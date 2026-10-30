"use client";

import { useState, useEffect } from "react";

const SERVICES = [
  {
    id: "audit",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    title: "Audit & Assurance",
    // difficulty: "Medium",
    difficultyColor: "#f59e0b",
    description: "Statutory audit, tax audit (3CA/3CB-3CD), GST audit, internal audit, stock/bank audits, certifications. Requires UDIN, PI cover, and firm experience.",
    services: ["Statutory Audit", "Tax Audit (3CA/3CB-3CD)", "GST Audit", "Internal Audit", "Stock & Bank Audits", "Certifications & UDIN"],
  },
  {
    id: "direct-tax",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    title: "Direct Tax",
    // difficulty: "Low",
    difficultyColor: "#10b981",
    description: "Complete income tax services including ITR filing, advance tax planning, assessment representation, notices handling, TDS/TCS returns, and transfer pricing.",
    services: ["ITR Filing", "Advance Tax Planning", "Assessment Representation", "Notices & Appeals", "TDS/TCS Returns", "Transfer Pricing"],
  },
  {
    id: "indirect-tax",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    ),
    title: "Indirect Tax (GST)",
    // difficulty: "Low",
    difficultyColor: "#10b981",
    description: "End-to-end GST services from registration to refunds. Handles GST notices and annual return filing with accuracy and compliance.",
    services: ["GST Registration", "Return Filing (GSTR 1/3B)", "GST Refunds", "GST Notices", "Annual Return (GSTR-9)", "E-way Bill Compliance"],
  },
  {
    id: "accounting",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    title: "Accounting & Bookkeeping",
    // difficulty: "Low",
    difficultyColor: "#10b981",
    description: "Monthly accounting, payroll processing, MIS reporting, and Virtual CFO services. Provides steady recurring revenue and strong client retention.",
    services: ["Monthly Accounting", "Payroll Processing", "MIS Reports", "Virtual CFO", "Tally / Zoho Books", "Financial Statements"],
  },
  {
    id: "company-law",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
    title: "Company Law / ROC",
    // difficulty: "Low–Medium",
    difficultyColor: "#f59e0b",
    description: "Company incorporation, annual ROC filings, and ongoing regulatory compliance. Covers all MCA/ROC requirements for private and public companies.",
    services: ["Company Incorporation", "Annual ROC Filings", "MCA Compliance", "DIN & DSC", "Change in Directors", "Share Transfer"],
  },
  {
    id: "advisory",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
    title: "Advisory & Consulting",
    // difficulty: "Medium–High",
    difficultyColor: "#ef4444",
    description: "Business setup advisory, FEMA compliance, project reports, valuations, due diligence, and startup advisory. High-value engagements for premium clients.",
    services: ["Business Setup", "FEMA / RBI Compliance", "Project Reports", "Business Valuation", "Due Diligence", "Startup Advisory"],
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Free Consultation",
    description: "Schedule a free 30-minute consultation to discuss your requirements, current situation, and compliance needs.",
  },
  {
    number: "02",
    title: "Proposal & Engagement",
    description: "We provide a detailed engagement letter with scope of services, timeline, and transparent pricing — no hidden charges.",
  },
  {
    number: "03",
    title: "Document Collection",
    description: "Secure document sharing through our portal. We provide a checklist and guide you through every step.",
  },
  {
    number: "04",
    title: "Execution & Filing",
    description: "Expert handling of all filings, audits, and compliance work with quality checks at every stage.",
  },
  {
    number: "05",
    title: "Review & Handover",
    description: "Complete review of deliverables, filing confirmations, and ongoing advisory support for your business.",
  },
];

const STATS = [
  { value: "100+", label: "Clients Served" },
  { value: "₹50Cr+", label: "Tax Savings" },
  { value: "2+", label: "Years Experience" },
  { value: "100%", label: "Compliance Rate" },
];

const FAQS = [
  {
    q: "What types of clients do you primarily work with?",
    a: "We serve individuals, MSMEs, startups, and growing companies across sectors. Whether you need basic ITR filing or complex audit and advisory services, we tailor our approach to your specific needs and scale.",
  },
  {
    q: "How do you handle GST registration and return filing?",
    a: "We manage the complete GST lifecycle — from registration, monthly/quarterly GSTR-1 and GSTR-3B filing, reconciliations, to annual GSTR-9 return. We also handle GST notices and refund claims.",
  },
  {
    q: "What is included in the Virtual CFO service?",
    a: "Our Virtual CFO service covers monthly MIS reporting, cash flow management, financial analysis, budgeting, investor reporting, and strategic financial advisory — all without the cost of a full-time CFO.",
  },
  {
    q: "Do you handle income tax notices and assessments?",
    a: "Yes. We represent clients before Income Tax Authorities for scrutiny assessments, demand notices, appeals before CIT(A), and ITAT. Our experienced team ensures proper representation and resolution.",
  },
  {
    q: "What are your fees for tax filing services?",
    a: "Fees depend on the complexity of your return. Basic ITR for salaried individuals starts at ₹999. Business returns, audit cases, and advisory services are quoted based on scope. Contact us for a custom quote.",
  },
  {
    q: "How do you ensure data security and confidentiality?",
    a: "All client data is handled with strict confidentiality under professional ethics. We use encrypted portals for document sharing and follow CA Institute's Code of Ethics for data privacy.",
  },
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{faq.q}</span>
        <svg
          className="faq-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      {open && <div className="faq-answer"><p>{faq.a}</p></div>}
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <>
      {/* HEADER */}
      <header className={`ca-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="ca-nav-container">
          <a href="#home" className="ca-logo">
            <div className="ca-logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div>
              <span className="ca-logo-text">Taxation &amp; Associates</span>
              <span className="ca-logo-sub">Chartered Accountants</span>
            </div>
          </a>

          <nav>
            <ul className={`ca-nav-links ${isMenuOpen ? "open" : ""}`}>
              <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
              <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
              <li><a href="#process" onClick={() => setIsMenuOpen(false)}>Process</a></li>
              <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
              <li><a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a></li>
              <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>

          <div className="ca-nav-cta">
            <a href="#contact" className="ca-btn-primary">Free Consultation</a>
            <button className="ca-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              {isMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="ca-hero">
        <div className="ca-hero-bg" style={{ backgroundImage: "url('/ca_hero_bg.png')" }}></div>
        <div className="ca-hero-overlay"></div>
        <div className="ca-hero-particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="ca-particle" style={{ animationDelay: `${i * 0.4}s`, left: `${(i * 8) % 100}%` }}></div>
          ))}
        </div>
        <div className="ca-container">
          <div className="ca-hero-content">
            <div className="ca-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              ICAI Certified Chartered Accountants
            </div>
            <h1>
              Trusted CA Services for
              <span className="ca-hero-accent"> Your Financial Growth</span>
            </h1>
            <p className="ca-hero-desc">
              Expert taxation, audit, GST, and business advisory services tailored for individuals, MSMEs, and growing enterprises. Transparent pricing. No surprises.
            </p>
            <div className="ca-hero-ctas">
              <a href="#services" className="ca-btn-primary ca-btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                Explore Services
              </a>
              <a href="#contact" className="ca-btn-outline ca-btn-lg">
                Free Consultation
              </a>
            </div>
            <div className="ca-hero-stats">
              {STATS.map((s) => (
                <div key={s.label} className="ca-hero-stat">
                  <span className="ca-hero-stat-val">{s.value}</span>
                  <span className="ca-hero-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ca-hero-scroll">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="ca-trust-strip">
        <div className="ca-container">
          <div className="ca-trust-grid">
            <div className="ca-trust-item">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span>ICAI Registered Firm</span>
            </div>
            <div className="ca-trust-sep"></div>
            <div className="ca-trust-item">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>3+ Years Experience</span>
            </div>
            <div className="ca-trust-sep"></div>
            <div className="ca-trust-item">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>100% Compliance Track Record</span>
            </div>
            <div className="ca-trust-sep"></div>
            <div className="ca-trust-item">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <span>50+ Satisfied Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="ca-services-section">
        <div className="ca-container">
          <div className="ca-section-header">
            <div className="ca-section-tag">Our Expertise</div>
            <h2>Comprehensive CA Services</h2>
            <p>From basic tax filings to complex audits and strategic advisory — we handle everything with precision and professionalism.</p>
          </div>

          {/* Strategy tip banner */}
          <div className="ca-tip-banner">
            <div className="ca-tip-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <p>
              <strong>Pro Strategy:</strong> In year one, combine a recurring base (bookkeeping, GST, TDS) with seasonal high-value work (tax audits, ITRs) to smooth cash flow and build a stable client portfolio.
            </p>
          </div>

          {/* Services Table */}
          <div className="ca-services-table-wrapper">
            <table className="ca-services-table">
              <thead>
                <tr>
                  <th>Service Area</th>
                  <th>Typical Services</th>
                  {/* <th>Entry Level</th> */}
                </tr>
              </thead>
              <tbody>
                {[
                  { area: "Audit & Assurance", services: "Statutory audit, tax audit (3CA/3CB-3CD), GST audit, internal audit, stock/bank audits, certifications", level: "Medium", color: "#f59e0b" },
                  { area: "Direct Tax", services: "ITR filing, advance tax, assessments, notices, TDS/TCS returns, transfer pricing", level: "Low", color: "#10b981" },
                  { area: "Indirect Tax (GST)", services: "GST registration, return filing, refunds, notices, annual return (GSTR-9)", level: "Low", color: "#10b981" },
                  { area: "Accounting & Bookkeeping", services: "Monthly accounting, payroll, MIS reports, Virtual CFO services", level: "Low", color: "#10b981" },
                  { area: "Company Law / ROC", services: "Incorporation, annual filings, MCA compliance, DIN & DSC management", level: "Low–Medium", color: "#f59e0b" },
                  { area: "Advisory & Consulting", services: "Business setup, FEMA, project reports, valuation, due diligence, startup advisory", level: "Medium–High", color: "#ef4444" },
                ].map((row) => (
                  <tr key={row.area}>
                    <td className="ca-table-area">{row.area}</td>
                    <td className="ca-table-services">{row.services}</td>
                    {/* <td><span className="ca-difficulty-badge" style={{ color: row.color, borderColor: row.color + "40", background: row.color + "15" }}>{row.level}</span></td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Service Cards */}
          <div className="ca-services-grid">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                className={`ca-service-card ${activeService === svc.id ? "active" : ""}`}
                onClick={() => setActiveService(activeService === svc.id ? null : svc.id)}
              >
                <div className="ca-svc-icon">{svc.icon}</div>
                <div className="ca-svc-header">
                  <h3>{svc.title}</h3>
                  {/* <span className="ca-svc-difficulty" style={{ color: svc.difficultyColor, borderColor: svc.difficultyColor + "40", background: svc.difficultyColor + "18" }}>
                    {svc.difficulty}
                  </span> */}
                </div>
                <p className="ca-svc-desc">{svc.description}</p>
                <ul className="ca-svc-list">
                  {svc.services.map((s) => (
                    <li key={s}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {s}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="ca-svc-cta">Get a Quote →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="ca-about-section">
        <div className="ca-container">
          <div className="ca-about-grid">
            <div className="ca-about-content">
              <div className="ca-section-tag">About the Firm</div>
              <h2>Taxation &amp; Associates — Built on Trust &amp; Expertise</h2>
              <p>
                Taxation &amp; Associates is a professionally managed Chartered Accountancy firm focused on delivering high-quality, reliable, and timely financial and compliance services to our clients.
              </p>
              <p>
                Our team brings together expertise across direct and indirect taxation, audit, company law, and business advisory — making us a one-stop destination for all your financial and compliance needs.
              </p>
              <div className="ca-about-values">
                {[
                  { icon: "🎯", title: "Accuracy First", desc: "Zero-error policy on all filings and compliance work." },
                  { icon: "🔒", title: "Complete Confidentiality", desc: "Your financial data stays secure with us — always." },
                  { icon: "⚡", title: "Timely Delivery", desc: "Deadline-driven culture. No missed due dates, ever." },
                  { icon: "💬", title: "Transparent Communication", desc: "Plain-language updates. No jargon. Just clear answers." },
                ].map((v) => (
                  <div key={v.title} className="ca-value-item">
                    <span className="ca-value-icon">{v.icon}</span>
                    <div>
                      <h4>{v.title}</h4>
                      <p>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ca-about-visual">
              <div className="ca-about-card-stack">
                <div className="ca-about-stat-card">
                  <div className="ca-about-stat-val">500+</div>
                  <div className="ca-about-stat-lbl">Active Clients</div>
                </div>
                <div className="ca-about-stat-card accent">
                  <div className="ca-about-stat-val">₹50Cr+</div>
                  <div className="ca-about-stat-lbl">Tax Saved for Clients</div>
                </div>
                <div className="ca-about-stat-card">
                  <div className="ca-about-stat-val">10+</div>
                  <div className="ca-about-stat-lbl">Years of Excellence</div>
                </div>
                <div className="ca-about-stat-card accent">
                  <div className="ca-about-stat-val">6</div>
                  <div className="ca-about-stat-lbl">Core Service Areas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT PROCESS */}
      <section id="process" className="ca-process-section">
        <div className="ca-container">
          <div className="ca-section-header">
            <div className="ca-section-tag">How We Work</div>
            <h2>Our Engagement Process</h2>
            <p>A transparent, structured approach to every engagement — from first call to final filing.</p>
          </div>
          <div className="ca-process-steps">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.number} className="ca-process-step">
                <div className="ca-step-number">{step.number}</div>
                {i < PROCESS_STEPS.length - 1 && <div className="ca-step-connector"></div>}
                <div className="ca-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING NOTE */}
      <section className="ca-pricing-section">
        <div className="ca-container">
          <div className="ca-pricing-card">
            <div className="ca-pricing-left">
              <div className="ca-section-tag">Transparent Pricing</div>
              <h2>Simple, Fair, Honest Fees</h2>
              <p>No hidden charges. No surprise billing. Every engagement starts with a written proposal detailing the exact scope and fee.</p>
              <div className="ca-pricing-features">
                {[
                  "Written engagement letter for every project",
                  "Monthly retainer options for recurring services",
                  "Seasonal packages for ITR & audit season",
                  "Startup-friendly pricing for new businesses",
                  "Flexible payment terms for long-term clients",
                ].map((f) => (
                  <div key={f} className="ca-pricing-feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="ca-pricing-right">
              <div className="ca-pricing-packages">
                {[
                  { name: "ITR Filing", price: "₹999+", period: "per return", tag: "Individual" },
                  { name: "GST Returns", price: "₹1,499+", period: "per month", tag: "Popular" },
                  { name: "Bookkeeping", price: "₹3,999+", period: "per month", tag: "Business" },
                  { name: "Virtual CFO", price: "Custom", period: "monthly retainer", tag: "Enterprise" },
                ].map((pkg) => (
                  <div key={pkg.name} className={`ca-price-card ${pkg.tag === "Popular" ? "featured" : ""}`}>
                    <span className="ca-price-tag">{pkg.tag}</span>
                    <div className="ca-price-name">{pkg.name}</div>
                    <div className="ca-price-amount">{pkg.price}</div>
                    <div className="ca-price-period">{pkg.period}</div>
                  </div>
                ))}
              </div>
              <p className="ca-pricing-note">* Prices are indicative. Final fees depend on scope and complexity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="ca-faq-section">
        <div className="ca-container">
          <div className="ca-section-header">
            <div className="ca-section-tag">Common Questions</div>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know before engaging with our firm.</p>
          </div>
          <div className="ca-faq-grid">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="ca-contact-section">
        <div className="ca-container">
          <div className="ca-section-header">
            <div className="ca-section-tag">Get In Touch</div>
            <h2>Start Your Free Consultation</h2>
            <p>Reach out today. Our team responds within 24 hours on all working days.</p>
          </div>
          <div className="ca-contact-grid">
            {/* Contact Info */}
            <div className="ca-contact-info-card">
              <h3>Contact Details</h3>
              <div className="ca-contact-items">
                <div className="ca-contact-item">
                  <div className="ca-contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h4>Phone / WhatsApp</h4>
                    <a href="tel:+919315927173">+91 93159 27173</a>
                  </div>
                </div>
                <div className="ca-contact-item">
                  <div className="ca-contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:kg399203@gmail.com">kg399203@gmail.com</a>
                  </div>
                </div>
                <div className="ca-contact-item">
                  <div className="ca-contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <div>
                    <h4>Working Hours</h4>
                    <p>Mon–Sat: 9:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="ca-contact-social">
                <h4>Connect With Us</h4>
                <div className="ca-social-btns">
                  <a href="https://wa.me/919315927173" target="_blank" rel="noopener noreferrer" className="ca-social-btn whatsapp">
                    <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M19.11 17.23c-.29-.14-1.69-.83-1.95-.92-.26-.1-.45-.14-.64.14-.19.29-.73.92-.9 1.11-.16.19-.33.22-.62.08-.29-.14-1.22-.45-2.33-1.43-.86-.76-1.44-1.69-1.61-1.98-.17-.29-.02-.45.12-.59.13-.13.29-.33.43-.49.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.44 0 1.44 1.04 2.82 1.18 3.01.14.19 2.04 3.12 4.95 4.37.69.3 1.23.48 1.65.61.69.22 1.31.19 1.81.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z"/>
                      <path d="M16.03 3C8.85 3 3 8.79 3 15.94c0 2.53.74 4.98 2.14 7.08L3.75 29l6.14-1.61a13.07 13.07 0 0 0 6.14 1.55H16c7.18 0 13.03-5.79 13.03-12.94C29.03 8.79 23.18 3 16.03 3zm0 23.56c-1.94 0-3.84-.52-5.5-1.5l-.39-.23-3.64.95.97-3.55-.25-.41a10.48 10.48 0 0 1-1.61-5.57c0-5.79 4.71-10.5 10.5-10.5s10.5 4.71 10.5 10.5-4.71 10.31-10.58 10.31z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a href="mailto:kg399203@gmail.com" className="ca-social-btn email">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    Send Email
                  </a>
                </div>
              </div>

              <div className="ca-contact-callout">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p>First consultation is always <strong>free</strong>. No commitment required.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="ca-contact-form-card">
              <h3>Send an Inquiry</h3>
              {formSubmitted ? (
                <div className="ca-form-success">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <h4>Thank You!</h4>
                  <p>We&apos;ve received your inquiry. Our team will reach out within 24 working hours.</p>
                </div>
              ) : (
                <form className="ca-form" onSubmit={handleFormSubmit}>
                  <div className="ca-form-row">
                    <div className="ca-form-group">
                      <label htmlFor="cf-name">Full Name *</label>
                      <input
                        type="text"
                        id="cf-name"
                        required
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      />
                    </div>
                    <div className="ca-form-group">
                      <label htmlFor="cf-phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="cf-phone"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="ca-form-group">
                    <label htmlFor="cf-email">Email Address</label>
                    <input
                      type="email"
                      id="cf-email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                  <div className="ca-form-group">
                    <label htmlFor="cf-service">Service Required</label>
                    <select
                      id="cf-service"
                      value={contactForm.service}
                      onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                    >
                      <option value="">Select a service...</option>
                      <option>Audit &amp; Assurance</option>
                      <option>Direct Tax (ITR)</option>
                      <option>Indirect Tax (GST)</option>
                      <option>Accounting &amp; Bookkeeping</option>
                      <option>Company Law / ROC</option>
                      <option>Advisory &amp; Consulting</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="ca-form-group">
                    <label htmlFor="cf-message">Your Message</label>
                    <textarea
                      id="cf-message"
                      rows={4}
                      placeholder="Briefly describe your requirement..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    ></textarea>
                  </div>
                  <button type="submit" className="ca-btn-primary ca-btn-submit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ca-footer">
        <div className="ca-container ca-footer-top">
          <div className="ca-footer-brand">
            <div className="ca-logo">
              <div className="ca-logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <div>
                <span className="ca-logo-text">Taxation &amp; Associates</span>
                <span className="ca-logo-sub">Chartered Accountants</span>
              </div>
            </div>
            <p>Your trusted CA firm for taxation, audit, and business compliance. Accuracy, integrity, and client-first service — every time.</p>
          </div>
          <div className="ca-footer-links">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Audit &amp; Assurance</a></li>
              <li><a href="#services">Direct Tax</a></li>
              <li><a href="#services">GST Services</a></li>
              <li><a href="#services">Accounting &amp; MIS</a></li>
              <li><a href="#services">Company Law</a></li>
              <li><a href="#services">Advisory</a></li>
            </ul>
          </div>
          <div className="ca-footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#process">Our Process</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="ca-footer-contact">
            <h4>Reach Us</h4>
            <p>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +91 93159 27173
            </p>
            <p>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              kg399203@gmail.com
            </p>
            <p>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Mon–Sat: 9AM – 7PM
            </p>
          </div>
        </div>
        <div className="ca-footer-bottom">
          <div className="ca-container">
            <p>&copy; {new Date().getFullYear()} Taxation &amp; Associates, Chartered Accountants. All rights reserved.</p>
            <p>Designed for financial excellence &amp; client trust.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href="https://wa.me/919315927173" target="_blank" rel="noopener noreferrer" className="ca-whatsapp-float" aria-label="Chat on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor">
          <path d="M19.11 17.23c-.29-.14-1.69-.83-1.95-.92-.26-.1-.45-.14-.64.14-.19.29-.73.92-.9 1.11-.16.19-.33.22-.62.08-.29-.14-1.22-.45-2.33-1.43-.86-.76-1.44-1.69-1.61-1.98-.17-.29-.02-.45.12-.59.13-.13.29-.33.43-.49.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.44 0 1.44 1.04 2.82 1.18 3.01.14.19 2.04 3.12 4.95 4.37.69.3 1.23.48 1.65.61.69.22 1.31.19 1.81.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z"/>
          <path d="M16.03 3C8.85 3 3 8.79 3 15.94c0 2.53.74 4.98 2.14 7.08L3.75 29l6.14-1.61a13.07 13.07 0 0 0 6.14 1.55H16c7.18 0 13.03-5.79 13.03-12.94C29.03 8.79 23.18 3 16.03 3zm0 23.56c-1.94 0-3.84-.52-5.5-1.5l-.39-.23-3.64.95.97-3.55-.25-.41a10.48 10.48 0 0 1-1.61-5.57c0-5.79 4.71-10.5 10.5-10.5s10.5 4.71 10.5 10.5-4.71 10.31-10.58 10.31z"/>
        </svg>
      </a>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "AccountingService",
                "@id": "https://kgassociates.in/#organization",
                "name": "Taxation & Associates, Chartered Accountants",
                "description": "ICAI-registered CA firm offering audit, taxation, GST, bookkeeping, company law, and advisory services to individuals and businesses.",
                "telephone": "+91 93159 27173",
                "email": "kg399203@gmail.com",
                "priceRange": "₹999 - Custom",
              },
              {
                "@type": "FAQPage",
                "mainEntity": FAQS.map((f) => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": { "@type": "Answer", "text": f.a },
                })),
              },
            ],
          }),
        }}
      />
    </>
  );
}
