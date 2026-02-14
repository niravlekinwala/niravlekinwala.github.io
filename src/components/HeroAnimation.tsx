"use client";

import { motion } from "framer-motion";

export default function HeroAnimation() {
    const colors = [
        "rgba(119, 0, 255, 0.5)",   // Deep Purple
        "rgba(51, 0, 255, 0.5)",    // Blue
        "rgba(6, 182, 212, 0.5)",   // Cyan
        "rgba(0, 198, 73, 0.5)",    // Emerald
        "rgba(255, 0, 43, 0.5)",    // Red/Rose
        "rgba(255, 153, 0, 0.5)",   // Orange
        "rgba(255, 0, 255, 0.5)",   // Magenta
        "rgba(0, 255, 225, 0.5)",  // Teal
        "rgba(255, 0, 132, 0.5)", // Pink
        "rgba(255, 204, 0, 0.5)",  // Yellow
    ];

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute w-full h-full"
            >
                {/* Colorful floating orbs */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full blur-[80px] opacity-50 will-change-transform"
                        initial={{
                            x: Math.random() * 100 - 50 + "vw",
                            y: Math.random() * 100 - 50 + "vh",
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            x: [
                                Math.random() * 100 - 50 + "vw",
                                Math.random() * 100 - 50 + "vw",
                                Math.random() * 100 - 50 + "vw",
                            ],
                            y: [
                                Math.random() * 100 - 50 + "vh",
                                Math.random() * 100 - 50 + "vh",
                                Math.random() * 100 - 50 + "vh",
                            ],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear",
                        }}
                        style={{
                            width: Math.random() * 40 + 20 + "vw",
                            height: Math.random() * 40 + 20 + "vw",
                            background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 40%)`
                        }}
                    />
                ))}

                {/* Moving particles (Sensors/Data points) */}
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={`p-${i}`}
                        className="absolute w-2 h-2 bg-primary/40 rounded-full"
                        initial={{
                            x: Math.random() * 100 + "vw",
                            y: Math.random() * 100 + "vh",
                        }}
                        animate={{
                            y: [null, Math.random() * 100 - 50 + "vh"],
                            x: [null, Math.random() * 100 - 50 + "vw"],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
