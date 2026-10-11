"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const expanded = index === open;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question} className={expanded ? "accordion-item is-open" : "accordion-item"}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                <span>{item.question}</span>
                <Plus aria-hidden="true" size={21} strokeWidth={1.5} />
              </button>
            </h3>
            <div
              id={panelId}
              className="accordion-panel"
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!expanded}
            >
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
