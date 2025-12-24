import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import InfoIcon from "../icons/InfoIcon";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "../icons/CloseIcon";
import { MODAL_LABELED_BY } from "../../constants";
import { useIsMobile } from "../../hooks";

/**
 * Header Info popover component
 *
 * Displays contextual information about the application,
 * including data source, technologies and design notes
 *
 * Interaction design:
 * - Triggered from an icon button
 * - Anchored animation based on trigger position
 * - Dismissible via backdrop click or Escape key
 *
 * Accessible notes:
 * - Uses dialog semantics (aria-modal, role='dialog')
 * - Restores focus to the trigger element on close
 * - Full focus trapping is intentionally omitted for this challenge
 */

interface InfoDetailsProps {
  title: string;
  content: React.ReactNode;
  isMainTitle?: boolean;
  titleId?: string;
}

/**
 *
 * Renders a labeled content block using semantic definition list markup
 * Used to structure informational sections inside the info popover
 */
const InfoDetails = ({
  title,
  content,
  isMainTitle = false,
  titleId,
}: InfoDetailsProps) => {
  const titleClasses = isMainTitle
    ? "font-bold text-xl"
    : "font-semibold text-lg";

  return (
    <dl className="flex flex-col gap-2">
      <dt id={titleId} className={titleClasses}>
        {title}
      </dt>
      <dd>{content}</dd>
    </dl>
  );
};

interface InfoPopoverContentProps {
  modalLabeledBy: string;
}
/**
 * Static content for the application info
 * Separated from modal behavior to keep logic and content concerns isolated
 */
const InfoPopoverContent = ({ modalLabeledBy }: InfoPopoverContentProps) => {
  return (
    <section className="flex flex-col gap-5">
      <InfoDetails
        isMainTitle
        title="About this app"
        content={
          <p>A SpaceX launch explorer focused on clarity and interaction.</p>
        }
        titleId={modalLabeledBy}
      />

      <InfoDetails
        title="Data"
        content={
          <a
            href="https://github.com/r-spacex/SpaceX-API/tree/master/docs"
            className="underline hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            SpaceX public API
          </a>
        }
      />

      <InfoDetails
        title="Built with"
        content={
          <ul className="list-disc pl-6">
            <li>React + Typescript</li>
            <li>Tailwind CSS (design tokens and responsive UI)</li>
            <li>Framer Motion (UI transitions)</li>
          </ul>
        }
      />

      <InfoDetails
        title="Design & Engineering Notes"
        content={
          <ul className="list-disc pl-6">
            <li>Responsive behavior designed mobile-first with Figma</li>
            <li>Component-first approach with reusable UI primitives</li>
          </ul>
        }
      />
      <InfoDetails
        title="Scope & constraints"
        content={
          <p>
            This project prioritizes UI structure and interaction patterns over
            exhaustive data modeling
          </p>
        }
      />

      <InfoDetails
        title="For curious minds"
        content={
          <a
            href="https://github.com/iritaca/spacex-app"
            className="underline hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            SpaceX repository
          </a>
        }
      />
    </section>
  );
};

/**
 * Controls the info popover state, positioning, and animations
 * Manages keyboard interactions and focus restoration.
 */
const InfoIconAndModal = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const isMobile = useIsMobile();

  //   Closes the popover when user press `Escape` key
  useEffect(() => {
    if (!showInfoModal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handler);
    // cleanup
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [showInfoModal]);

  const openModal = () => {
    lastFocusedRef.current = document.activeElement as HTMLElement;

    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
    setShowInfoModal(true);
  };

  const closeModal = () => {
    setShowInfoModal(false);
    lastFocusedRef.current?.focus();
  };

  return (
    <>
      <Button
        variant="custom"
        aria-label="App information"
        ref={buttonRef}
        icon={
          <InfoIcon
            size="md"
            className="hover:text-accent duration-150 transition-colors "
          />
        }
        onClick={openModal}
        className="hover:bg-card rounded-sm"
      />

      <AnimatePresence>
        {showInfoModal && buttonRect && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Popover */}
            <motion.div
              initial={{
                right: isMobile ? 16 : 32,
                top: 0,
                borderRadius: 6,
                opacity: 0,
              }}
              animate={{
                top: isMobile ? buttonRect.bottom + 8 : 96,
                opacity: 1,
              }}
              exit={{
                top: 0,
                opacity: 0,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="fixed
                        bg-card
                        w-[80vw]
                        max-w-[480px]
                        max-h-[80vh]
                        overflow-auto
                        shadow-xl
                        p-6
                        z-30"
              role="dialog"
              aria-modal="true"
              aria-labelledby={MODAL_LABELED_BY}
            >
              <Button
                variant="custom"
                aria-label="Close popover"
                icon={
                  <CloseIcon
                    size="sm"
                    className="hover:text-accent duration-150 transition-colors"
                  />
                }
                onClick={closeModal}
                className="hover:bg-card rounded-sm absolute right-4"
              />

              <InfoPopoverContent modalLabeledBy={MODAL_LABELED_BY} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InfoIconAndModal;
