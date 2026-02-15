"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Reports & Papers", path: "/reports-and-papers" },
  { name: "Blog", path: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Branding (Spacer / Logo) */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="text-xl font-bold tracking-tighter hover:text-primary transition-colors">
            {/* Nirav Lekinwala, PhD */}
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
            >
              {item.name}
              {pathname === item.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Search & Tools */}
        <div className="flex-1 flex items-center justify-end gap-4">

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center relative group">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground group-hover:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-1.5 text-sm bg-secondary/50 border border-transparent hover:border-border focus:border-primary rounded-full w-32 focus:w-48 transition-all outline-none"
            />
          </div>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {/* Mobile Search */}
              <div className="relative mb-2">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-secondary/50 border border-transparent rounded-lg outline-none focus:border-primary"
                />
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium py-2 ${pathname === item.path ? "text-primary" : "text-muted-foreground"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
