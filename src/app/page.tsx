"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code, Database, Wind, CloudRainWind, Cpu, ChartCandlestick } from "lucide-react";
import { motion } from "framer-motion";
import HeroAnimation from "@/components/HeroAnimation";

export default function Home() {
  return (
    <div className="relative flex flex-col justify-center overflow-hidden min-h-screen pt-16">
      <HeroAnimation />

      <section className="container mx-auto px-4 z-10 py-20 md:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
              <Image
                src="/assets/images/photo_github.png"
                alt="Nirav Lekinwala"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 mb-8">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground flex flex-col md:flex-row items-center gap-3 md:gap-4 leading-none">
              Nirav Lekinwala
              <span className="inline-flex items-center justify-center text-4xl md:text-4xl font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 align-middle leading-none mt-1 md:mt-0">
                PhD
              </span>
            </h1>
            <span className="text-xl md:text-xl text-muted-foreground font-medium tracking-wide">
              (he/him)
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3 px-4 mb-8 max-w-3xl">
            {[
              { Icon: Cpu, text: "Tech. Enthusiast" },
              { Icon: ChartCandlestick, text: "Data Scientist" },
              { Icon: Code, text: "Python Programmer" },
              { Icon: CloudRainWind, text: "Air Quality Modeller" },
            ].map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-md border border-border text-sm font-medium text-foreground shadow-sm hover:scale-105 transition-transform duration-200"
              >
                <item.Icon className="w-5 h-5 text-primary" />
                <span className="text-base md:text-lg">{item.text}</span>
              </div>
            ))}
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            Quantifying Air Quality <br className="hidden md:block" />
            <span className="text-gradient">with Science & Data</span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            I combine atmospheric science with advanced data science and visualisations
            to decode air quality patterns and support evidence-based policy making.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25"
            >
              Explore My Work
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:bg-muted font-semibold text-lg hover:scale-105 transition-all"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
      </section>

      {/* <section className="container mx-auto px-4 py-24 z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Wind className="w-10 h-10 text-cyan-500" />,
              title: "Chemical Transport Models",
              desc: "Using WRF-CAMx to simulate air quality over India",
              color: "from-cyan-500/20 to-blue-500/5",
            },
            {
              icon: <Database className="w-10 h-10 text-purple-500" />,
              title: "Data Analysis",
              desc: "Processing ",
              color: "from-purple-500/20 to-pink-500/5",
            },
            {
              icon: <Code className="w-10 h-10 text-emerald-500" />,
              title: "ML Forecasting",
              desc: "Predicting air quality indices with high-precision neural networks.",
              color: "from-emerald-500/20 to-green-500/5",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl border border-white/10 bg-gradient-to-br ${item.color} backdrop-blur-md shadow-xl hover:-translate-y-2 transition-transform duration-300`}
            >
              <div className="mb-6 p-3 bg-white/10 rounded-2xl w-fit backdrop-blur-sm">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section> */}
    </div>
  );
}
