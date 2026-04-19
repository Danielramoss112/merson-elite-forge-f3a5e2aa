import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ResponseBadge({ hidden }: { hidden?: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const showT = setTimeout(() => setShow(true), 3000);
    const hideT = setTimeout(() => setShow(false), 9000);
    return () => {
      clearTimeout(showT);
      clearTimeout(hideT);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && !hidden && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.4 }}
          className="fixed z-[45]"
          style={{
            bottom: 92,
            right: 18,
            background: "#1a1a1a",
            border: "1px solid #c4953a",
            color: "#c4953a",
            fontSize: 11,
            padding: "5px 12px",
            borderRadius: 20,
            whiteSpace: "nowrap",
          }}
        >
          ⚡ Resposta em até 2h
        </motion.div>
      )}
    </AnimatePresence>
  );
}
