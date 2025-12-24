import { forwardRef } from "react";
import { DISABLED_STYLES } from "../../constants";

interface ButtonProps {
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: "default" | "custom";
  onClick?: () => void;
  isDisabled?: boolean;
}

/**
 * Button
 *
 * Reusable button supporting text, icons and custom styling
 * Designed to be composable and ref-forwarding friendly
 * for accessibility and focus management use cases
 * (e.g. popover, modals)
 * @param label - text or node displayed inside the button
 * @param icon - Optional icon rendered next to the label.
 * @param className - Optional additional styles
 * @param variant - Visual style variant of the button, default displays a rounded box button with `accent` color
 * @param onClick - Click handler
 * @param isDisabled - Disables the button
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { label, icon, className = "", variant = "default", onClick, isDisabled },
    ref
  ) => {
    const defaultClassNames =
      variant === "default"
        ? "font-semibold text-base rounded-sm bg-accent hover:bg-accent/60 min-h-11"
        : "";
    return (
      <button
        className={`transition-colors duration-300  ${className} ${defaultClassNames} ${
          isDisabled ? DISABLED_STYLES : ""
        }`}
        onClick={onClick}
        ref={ref}
      >
        <span>{label}</span>
        {icon && <span>{icon}</span>}
      </button>
    );
  }
);

export default Button;
