"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

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

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    React.useEffect(() => {
        if (!mounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = isMobile ? 50 : 125;

        const resizeCanvas = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;
            mass: number;

            constructor() {
                this.radius = Math.random() * 5 + 1;
                this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
                this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.mass = 1;
                const isDark = resolvedTheme === "dark";
                this.color = isDark
                    ? `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
                    : `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }

            update(particles: Particle[]) {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                    this.vx = -this.vx;
                }
                if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                    this.vy = -this.vy;
                }

                for (const particle of particles) {
                    if (this === particle) continue;
                    const dx = this.x - particle.x;
                    const dy = this.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < this.radius + particle.radius) {
                        resolveCollision(this, particle);
                    }
                }

                this.draw();
            }
        }

        function rotate(velocity: { x: number, y: number }, angle: number) {
            return {
                x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
                y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
            };
        }

        function resolveCollision(particle: Particle, otherParticle: Particle) {
            const xVelocityDiff = particle.vx - otherParticle.vx;
            const yVelocityDiff = particle.vy - otherParticle.vy;
            const xDist = otherParticle.x - particle.x;
            const yDist = otherParticle.y - particle.y;

            if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
                const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);
                const m1 = particle.mass;
                const m2 = otherParticle.mass;
                const u1 = rotate({ x: particle.vx, y: particle.vy }, angle);
                const u2 = rotate({ x: otherParticle.vx, y: otherParticle.vy }, angle);
                const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
                const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };
                const vFinal1 = rotate(v1, -angle);
                const vFinal2 = rotate(v2, -angle);
                particle.vx = vFinal1.x;
                particle.vy = vFinal1.y;
                otherParticle.vx = vFinal2.x;
                otherParticle.vy = vFinal2.y;
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update(particles);
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mounted, resolvedTheme, isMobile]);

    const orbCount = isMobile ? 8 : 15;
    const blurAmount = isMobile ? "blur-[40px]" : "blur-[80px]";

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Background Orbs */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute w-full h-full"
            >
                {mounted && [...Array(orbCount)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${blurAmount} opacity-40 will-change-transform`}
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
                            width: isMobile ? Math.random() * 30 + 15 + "vw" : Math.random() * 40 + 20 + "vw",
                            height: isMobile ? Math.random() * 30 + 15 + "vw" : Math.random() * 40 + 20 + "vw",
                            background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 40%)`
                        }}
                    />
                ))}
            </motion.div>

            {/* Particle Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
        </div>
    );
}
