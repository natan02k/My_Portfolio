import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useLenis } from "lenis/react";
import { Magnetic } from "./ui/Magnetic";

export const Hero = () => {
    const lenis = useLenis();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const headingText = "Natan Kondler";
    const name = Array.from(headingText);

    // Awwwards Style Text Masking Reveal
    const maskVariants: any = {
        hidden: { y: "100%" },
        visible: {
            y: 0,
            transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
        }
    };

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const letterVariants: any = {
        hidden: { y: "100%", opacity: 0, rotateZ: 5 },
        visible: {
            y: 0,
            opacity: 1,
            rotateZ: 0,
            transition: {
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
            },
        },
    };

    const itemVariants: any = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
            },
        },
    };

    return (
        <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Heavy Noise Overlay for texture */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-primary/40 rounded-full filter blur-[100px] md:blur-[140px] animate-pulse-slow"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-accent/30 rounded-full filter blur-[120px] md:blur-[160px] animate-pulse-slow"
                />
            </div>

            <div className="container mx-auto px-4 z-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-8"
                >
                    {/* Tagline masked reveal */}
                    <div className="overflow-hidden mb-2">
                        <motion.div variants={maskVariants} className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                            Portfolio 2026
                        </motion.div>
                    </div>

                    {/* Main Title with aggressive staggered masking */}
                    <div className="flex flex-col items-center">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter flex overflow-hidden py-2">
                            {name.map((letter, index) => (
                                <motion.span
                                    key={index}
                                    variants={letterVariants}
                                    className={letter === " " ? "w-4 md:w-8" : "inline-block origin-bottom"}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </h1>

                        <div className="overflow-hidden mt-6">
                            <motion.h2
                                variants={maskVariants}
                                className="text-xl md:text-3xl lg:text-4xl font-light text-foreground/80 max-w-2xl font-serif italic"
                            >
                                Frontend Developer & Designer
                            </motion.h2>
                        </div>
                    </div>

                    <motion.p
                        variants={itemVariants}
                        className="text-base md:text-lg text-foreground/60 max-w-xl mx-auto mt-4 font-medium"
                    >
                        Spezialisiert auf interaktive Web-Erlebnisse, saubere Architektur und modernes Design.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center gap-6 pt-8"
                    >
                        <Magnetic strength={0.4}>
                            <button
                                onClick={() => lenis?.scrollTo("#projects")}
                                className="group relative px-8 py-4 bg-primary text-[#0f172a] rounded-full font-bold text-lg overflow-hidden flex items-center gap-3 transition-transform hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <span className="relative z-10">Projekte ansehen</span>
                                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Magnetic>

                        <Magnetic strength={0.3}>
                            <a
                                href="/cv.pdf"
                                target="_blank"
                                className="group px-8 py-4 glass rounded-full font-bold text-lg flex items-center gap-3 hover:bg-white/10 transition-colors border border-white/10"
                            >
                                <span>Lebenslauf</span>
                                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </Magnetic>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
            >
                <span className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-semibold">Scroll</span>
                <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                    <motion.div
                        className="w-full h-1/2 bg-primary absolute top-0"
                        animate={{ y: ["0%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </section>
    );
};
