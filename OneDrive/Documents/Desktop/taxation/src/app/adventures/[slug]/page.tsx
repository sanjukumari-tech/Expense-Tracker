"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PACKAGES } from "../../data";
import { useState } from "react";


export default function AdventureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const pkg = PACKAGES.find((p) => p.slug === slug);

  const [activeTab, setActiveTab] = useState<"about" | "itinerary" | "pricing" | "inclusions">("about");

  if (!pkg) {
    return (
      <div className="adventure-not-found">
        <div className="container">
          <h1>Adventure Not Found</h1>
          <p>Sorry, we couldn&apos;t find the adventure you&apos;re looking for.</p>
          <Link href="/#packages" className="btn btn-primary">
            ← Back to Adventures
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "about" as const, label: "About" },
    { key: "itinerary" as const, label: "Itinerary" },
    { key: "pricing" as const, label: "Pricing" },
    { key: "inclusions" as const, label: "Inclusions" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="adv-hero">
        <div className="adv-hero-bg" style={{ backgroundImage: `url('${pkg.image}')` }}></div>
        <div className="adv-hero-overlay"></div>

        <div className="container adv-hero-content">
          <Link href="/#packages" className="adv-back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back to Adventures
          </Link>

          <div className="adv-hero-info">
            <div className="adv-hero-badges">
              <span className={`adv-badge ${pkg.category === "bungee" ? "adv-badge--orange" : ""}`}>
                {pkg.category === "bungee" ? "Extreme Adventure" : "Water Adventure"}
              </span>
              <span className="adv-badge adv-badge--outline">
                {pkg.difficulty}
              </span>
            </div>
            <h1>{pkg.name}</h1>
            <p className="adv-hero-desc">{pkg.description}</p>

            <div className="adv-hero-meta">
              <div className="adv-meta-chip">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {pkg.duration}
              </div>
              <div className="adv-meta-chip">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {pkg.distance}
              </div>
              <div className="adv-meta-chip adv-meta-chip--price">
                <span className="adv-meta-from">from</span>
                <span className="adv-meta-price">₹{pkg.price}</span>
                <span className="adv-meta-original">₹{pkg.originalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS + CONTENT */}
      <section className="adv-content-section">
        <div className="container">
          {/* Tab Navigation */}
          <div className="adv-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`adv-tab-btn ${activeTab === tab.key ? "adv-tab-btn--active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="adv-tab-panel">
            {/* ABOUT */}
            {activeTab === "about" && (
              <div className="adv-about animate-fade-in">
                <div className="adv-about-grid">
                  <div className="adv-about-text">
                    <h2>About This Adventure</h2>
                    <p>{pkg.about}</p>

                    <h3>Key Highlights</h3>
                    <ul className="adv-highlights-list">
                      {pkg.highlights.map((h, i) => (
                        <li key={i}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="adv-about-stats">
                    <div className="adv-stat-card">
                      <div className="adv-stat-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                      <div className="adv-stat-val">{pkg.duration}</div>
                      <div className="adv-stat-lbl">Duration</div>
                    </div>
                    <div className="adv-stat-card">
                      <div className="adv-stat-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div className="adv-stat-val">{pkg.distance}</div>
                      <div className="adv-stat-lbl">Distance / Height</div>
                    </div>
                    <div className="adv-stat-card">
                      <div className="adv-stat-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </div>
                      <div className="adv-stat-val">100%</div>
                      <div className="adv-stat-lbl">Safe Record</div>
                    </div>
                    <div className="adv-stat-card">
                      <div className="adv-stat-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </div>
                      <div className="adv-stat-val">10K+</div>
                      <div className="adv-stat-lbl">Happy Adventurers</div>
                    </div>
                  </div>
                </div>

                <div className="adv-features-row">
                  <h3>What Makes This Special</h3>
                  <div className="adv-features-chips">
                    {pkg.features.map((f, i) => (
                      <div key={i} className="adv-feature-chip">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ITINERARY */}
            {activeTab === "itinerary" && (
              <div className="adv-itinerary animate-fade-in">
                <h2>Your Day — Step by Step</h2>
                <p className="adv-itinerary-subtitle">Here&apos;s what a typical adventure day looks like with us.</p>
                <div className="adv-timeline">
                  {pkg.itinerary.map((step, i) => (
                    <div key={i} className="adv-timeline-item">
                      <div className="adv-timeline-marker">
                        <div className="adv-timeline-dot"></div>
                        {i < pkg.itinerary.length - 1 && <div className="adv-timeline-line"></div>}
                      </div>
                      <div className="adv-timeline-content">
                        <span className="adv-timeline-time">{step.time}</span>
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRICING */}
            {activeTab === "pricing" && (
              <div className="adv-pricing animate-fade-in">
                <h2>Transparent Pricing</h2>
                <p className="adv-pricing-subtitle">No hidden charges. What you see is what you pay.</p>

                <div className="adv-pricing-cards">
                  {pkg.pricing.map((item, i) => (
                    <div key={i} className={`adv-pricing-card ${i === 0 ? "adv-pricing-card--featured" : ""}`}>
                      {i === 0 && <span className="adv-pricing-badge">Best Value</span>}
                      <div className="adv-pricing-label">{item.label}</div>
                      <div className="adv-pricing-amount">{item.price}</div>
                      {item.note && <div className="adv-pricing-note">{item.note}</div>}
                    </div>
                  ))}
                </div>

                <div className="adv-pricing-info">
                  <div className="adv-pricing-info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <p>Weekend surcharge of ₹150/person applies on Saturday &amp; Sunday bookings.</p>
                  </div>
                  <div className="adv-pricing-info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <p>Group rates automatically apply for bookings of 5 or more persons.</p>
                  </div>
                </div>
              </div>
            )}

            {/* INCLUSIONS */}
            {activeTab === "inclusions" && (
              <div className="adv-inclusions animate-fade-in">
                <h2>What&apos;s Included &amp; What&apos;s Not</h2>
                <p className="adv-inclusions-subtitle">Full transparency on everything you get with this package.</p>

                <div className="adv-incl-grid">
                  <div className="adv-incl-card adv-incl-card--included">
                    <div className="adv-incl-header">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <h3>Included</h3>
                    </div>
                    <ul>
                      {pkg.inclusions.map((item, i) => (
                        <li key={i}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="adv-incl-card adv-incl-card--excluded">
                    <div className="adv-incl-header">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      <h3>Not Included</h3>
                    </div>
                    <ul>
                      {pkg.exclusions.map((item, i) => (
                        <li key={i}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STICKY BOOK NOW BAR */}
      <div className="adv-book-bar">
        <div className="container adv-book-bar-inner">
          <div className="adv-book-bar-info">
            <span className="adv-book-bar-name">{pkg.name}</span>
            <div className="adv-book-bar-price">
              <span className="adv-book-bar-from">from</span>
              <span className="adv-book-bar-amount">₹{pkg.price}</span>
              <span className="adv-book-bar-original">₹{pkg.originalPrice}</span>
              <span className="adv-book-bar-per">/person</span>
            </div>
          </div>
         <button
  className="btn btn-secondary animate-pulse-glow"
  onClick={() => router.push(`/booking?package=${encodeURIComponent(pkg.slug)}`)}
>
  Book Now
</button>
</div>
</div>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/918770572754"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="currentColor">
          <path d="M19.11 17.23c-.29-.14-1.69-.83-1.95-.92-.26-.1-.45-.14-.64.14-.19.29-.73.92-.9 1.11-.16.19-.33.22-.62.08-.29-.14-1.22-.45-2.33-1.43-.86-.76-1.44-1.69-1.61-1.98-.17-.29-.02-.45.12-.59.13-.13.29-.33.43-.49.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.44 0 1.44 1.04 2.82 1.18 3.01.14.19 2.04 3.12 4.95 4.37.69.3 1.23.48 1.65.61.69.22 1.31.19 1.81.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
          <path d="M16.03 3C8.85 3 3 8.79 3 15.94c0 2.53.74 4.98 2.14 7.08L3.75 29l6.14-1.61a13.07 13.07 0 0 0 6.14 1.55H16c7.18 0 13.03-5.79 13.03-12.94C29.03 8.79 23.18 3 16.03 3zm0 23.56c-1.94 0-3.84-.52-5.5-1.5l-.39-.23-3.64.95.97-3.55-.25-.41a10.48 10.48 0 0 1-1.61-5.57c0-5.79 4.71-10.5 10.5-10.5s10.5 4.71 10.5 10.5-4.71 10.31-10.58 10.31z" />
        </svg>
      </a>
    </>
  );
}
