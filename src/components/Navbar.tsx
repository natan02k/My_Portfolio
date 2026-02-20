import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useLenis } from "lenis/react";
import { cn } from "../lib/utils"; // Keep cn as it's used in the original return statement

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Renamed from isMenuOpen
    const [scrolled, setScrolled] = useState(false); // Renamed from isScrolled
    const [isDark, setIsDark] = useState(true); // Renamed from theme, now boolean
    const lenis = useLenis(); // New hook

    useEffect(() => {
        // Check initial dark mode preference
        const isDarkMode = document.documentElement.classList.contains("dark") ||
            (!document.documentElement.classList.contains("light") &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);
        setIsDark(isDarkMode);
        if (!isDarkMode) document.documentElement.classList.add("light"); // Ensure light class is added if not dark

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        }
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false); // Close menu on click
        if (lenis) {
            lenis.scrollTo(href, { offset: -80, duration: 1.2 });
        } else {
            // Fallback for when lenis is not available (e.g., during SSR or if not initialized)
            window.location.hash = href;
        }
    };

    const navItems = [
        { name: "Home", href: "#home" },
        { name: "Über mich", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projekte", href: "#projects" },
        { name: "Erfahrung", href: "#experience" },
        { name: "Kontakt", href: "#contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled ? "py-4 bg-background/80 backdrop-blur-md border-b border-white/5" : "py-6 bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <a
                    href="#home"
                    onClick={(e) => handleNavClick(e, "#home")}
                    className="text-2xl font-bold tracking-tighter"
                >
                    nk<span className="text-primary">.</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed inset-0 top-[72px] bg-background/95 backdrop-blur-xl border-t border-white/5"
                    >
                        <div className="flex flex-col items-center pt-20 gap-8 h-full">
                            {navItems.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
