import { motion } from "framer-motion";

interface NotificationProps {
  description: string;
}

/**
 * Notification
 *
 * Displays a temporary alert message at the top of the viewport
 * Intended for global feedback
 *
 */
const Notification = ({ description }: NotificationProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -24,
      }}
      animate={{
        y: 96,
        opacity: 1,
      }}
      exit={{
        y: -24,
        opacity: 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className="fixed bg-card shadow-lg p-6 left-1/2 -translate-x-1/2"
      role="alert"
    >
      {description}
    </motion.div>
  );
};

export default Notification;
