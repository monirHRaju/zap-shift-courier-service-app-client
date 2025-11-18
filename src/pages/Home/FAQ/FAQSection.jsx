// FAQSection.jsx
import React, { useState, useMemo, useEffect } from "react";

/*
Usage:
<FAQSection data={faqData} defaultOpenId={null} singleOpen={false} onOpen={(id)=>{}} />
*/

export default function FAQSection({
  data = [],
  defaultOpenId = null,
  singleOpen = false, // if true, only one panel open at a time (accordion)
  onOpen = () => {}, // optional analytics hook (id)
}) {
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState(() => (defaultOpenId ? [defaultOpenId] : []));

  useEffect(() => {
    // keep openIds in sync if singleOpen toggled or defaultOpenId changes
    if (defaultOpenId) setOpenIds([defaultOpenId]);
  }, [defaultOpenId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        (item.answerPlain && item.answerPlain.toLowerCase().includes(q)) ||
        (item.tags && item.tags.join(" ").toLowerCase().includes(q))
    );
  }, [data, query]);

  const toggle = (id) => {
    setOpenIds((prev) => {
      const exists = prev.includes(id);
      let next;
      if (singleOpen) {
        next = exists ? [] : [id];
      } else {
        next = exists ? prev.filter((x) => x !== id) : [...prev, id];
      }
      if (!exists) onOpen(id);
      return next;
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

      <div className="mb-6">
        <label className="sr-only" htmlFor="faq-search">Search FAQ</label>
        <input
          id="faq-search"
          type="search"
          placeholder="Search by question, answer, or tag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full"
          aria-label="Search frequently asked questions"
        />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-sm text-muted">No results. Try different keywords.</div>
        )}

        {filtered.map((item, idx) => {
          const isOpen = openIds.includes(item.id);
          const panelId = `faq-panel-${item.id}`;
          const btnId = `faq-btn-${item.id}`;

          return (
            <div key={item.id} className="collapse collapse-arrow border rounded-box">
              <button
                id={btnId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => toggle(item.id)}
                className="w-full text-left px-4 py-3 flex justify-between items-center"
              >
                <span>
                  <span className="font-medium">{item.question}</span>
                  {item.short && <span className="ml-2 text-sm text-gray-500"> — {item.short}</span>}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className={`px-4 pb-4 transition-all ${isOpen ? "block" : "hidden"}`}
              >
                {/* If answer is supplied as plain text */}
                {item.answer && <p className="text-sm leading-relaxed">{item.answer}</p>}

                {/* If richer content is supplied (JSX), render it directly */}
                {item.answerNode && <div className="mt-2">{item.answerNode}</div>}

                {item.tags && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {item.tags.map((t) => (
                      <span key={t} className="badge badge-outline badge-sm">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
