import { useState } from "react";
import ChevronIcon from "../icons/ChevronIcon";
import { motion } from "framer-motion";

interface AccordionProps {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

/**
 * Accordion
 *
 * Collapsible content container with animated toggle
 * Manages its own open/closed state
 *
 * Accessibility:
 * - Uses button semantics
 * - Exposes expanded state via aria-expanded
 * - Associates trigger with content region
 *
 * @param label - the accordion title
 * @param children - a wrapper for the content
 * @param defaultOpen - User can decide if the accordion is open by default
 * @returns
 */
const Accordion = ({
  label,
  children,
  defaultOpen = false,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = `accordion-content-${label.replace(/\s+/g, "-")}`;
  return (
    <div className="w-full flex flex-col gap-3">
      <button
        className="flex justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="font-semibold text-base capitalize">{label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronIcon />
        </motion.div>
      </button>

      {/* Animated content */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
        role="region"
        id={contentId}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Accordion;
