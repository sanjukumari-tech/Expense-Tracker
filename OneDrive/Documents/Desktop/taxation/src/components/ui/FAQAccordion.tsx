"use client";

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is the price of river rafting in Rishikesh with Karamyogi Vikram?",
      answer: "We offer three different river rafting stretches in Rishikesh depending on your experience: the 12km stretch from Brahmpuri for ₹700 per person, the 14km stretch from Shivpuri for ₹1000 per person, and the extreme 16km stretch from Marine Drive for ₹1200 per person."
    },
    {
      question: "How much does bungee jumping cost, and what is the platform height?",
      answer: "Our thrilling bungee jumping package in Rishikesh costs ₹2500 per jump. The leap takes place from a world-class, certified cantilever platform situated at a spectacular height of 85 meters, operated under strict international safety guidelines."
    },
    {
      question: "Can I book adventures for different dates?",
      answer: "Yes! Our booking widget allows you to select custom dates for any future adventure. You can choose different dates for group members and individual activities directly from our interactive date picker during checkout."
    },
    {
      question: "Is safety guaranteed during rafting and bungee jumps?",
      answer: "Absolute safety is our number one priority. Our river rafting trips are guided by certified white-water rescue professionals, and bungee jumps are operated under instructions from Australia-trained jump masters utilizing redundant safety harnesses and certified gear."
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '860px', margin: '0 auto', width: '100%' }}>
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            style={{
              border: `1px solid ${isOpen ? 'rgba(13, 148, 136, 0.4)' : 'rgba(255,255,255,0.08)'}`,
              background: 'rgba(13, 18, 31, 0.6)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'border-color 0.3s ease',
            }}
          >
            <button
              onClick={() => toggle(idx)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                textAlign: 'left',
                color: isOpen ? '#0d9488' : '#f8fafc',
                fontWeight: 600,
                fontSize: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                fontFamily: 'var(--font-outfit), sans-serif',
                gap: '1rem',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: 1 }}>
                <svg style={{ width: '20px', height: '20px', color: '#0d9488', flexShrink: 0, marginTop: '2px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {faq.question}
              </span>
              <svg
                style={{
                  width: '20px',
                  height: '20px',
                  color: isOpen ? '#0d9488' : '#94a3b8',
                  transition: 'transform 0.3s ease, color 0.2s ease',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  flexShrink: 0,
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              style={{
                maxHeight: isOpen ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.35s ease',
                borderTop: isOpen ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <p style={{
                padding: '1.25rem 1.5rem 1.25rem 3.25rem',
                color: '#94a3b8',
                lineHeight: '1.7',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-outfit), sans-serif',
              }}>
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
