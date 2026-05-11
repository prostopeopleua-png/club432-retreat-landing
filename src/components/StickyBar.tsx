"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div
            className="flex items-center gap-4 px-6 py-4 rounded-full"
            style={{
              background: "rgba(13,14,45,0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(253,209,111,0.2)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div>
              <p className="text-xs font-semibold" style={{ color: "#FDD16F", letterSpacing: "0.08em" }}>
                12–16 ЧЕРВНЯ · КАРПАТИ
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                Залишилось мало місць
              </p>
            </div>
            <a href="#pricing" className="btn-cta" style={{ padding: "12px 28px", fontSize: 13 }}>
              Забронювати
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
