import { useState } from "react";
import { BlockTitle } from 'konsta/react';
interface IProps {
    children: React.ReactNode,
    title?:string
}
export const AccordionSpan = ({children, title}:IProps) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div>
      <BlockTitle className="flex justify-between gap-2" onClick={() => setAccordionOpen(!accordionOpen)}>
        <div>{title}</div>
        <div>
          <button title="Desplegar o cerrar" onClick={() => setAccordionOpen(!accordionOpen)} className="flex justify-between w-full text-md-light-primary pe-3 py-1 k-text-title">
            <svg fill="currentColor" className="shrink-0 ml-8" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <rect y="7" width="16" height="2" rx="1"
                className={`transform origin-center transition duration-200 ease-out ${
                  accordionOpen && "rotate-180!"
                }`}
              />
              <rect y="7" width="16" height="2" rx="1"
                className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                  accordionOpen && "rotate-180!"
                }`}
              />
            </svg>
          </button>
        </div>
      </BlockTitle>
      <div
        className={`grid overflow-hidden transition-all duration-150 ease-in-out text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-4 pt-4">
            {children}
        </div>
      </div>
    </div>
  );
};