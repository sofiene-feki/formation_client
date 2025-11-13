import { motion } from "framer-motion";
import { Card as BaseCard } from "@/components/ui/card";

export function MotionCard({ children, className, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(109,74,255,0.3)" }}
      transition={{ duration: 0.4 }}
      className={className}
      {...props}
    >
      <BaseCard>{children}</BaseCard>
    </motion.div>
  );
}
