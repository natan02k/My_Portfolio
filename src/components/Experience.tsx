import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, HeartHandshake } from "lucide-react";

interface TimelineItem {
    date: string;
    title: string;
    subtitle: string;
    description: string;
    bullets: string[];
    icon: React.ReactNode;
}

const experiences: TimelineItem[] = [
    {
        date: "10/2023 - Heute",
        title: "Studium der Informatik",
        subtitle: "Technische Hochschule Mittelhessen",
        description: "Bachelor of Science in Informatik mit Fokus auf Softwareentwicklung und Datenbanksysteme.",
        bullets: [
            "Vielseitige Projekte in Game Development, Data Science und Full Stack",
            "Praktische Erfahrung mit modernen Entwicklungstools",
            "Aktuell im 5. Semester mit voraussichtlichem Abschluss in 2 Semestern"
        ],
        icon: <GraduationCap className="w-6 h-6 text-[#0f172a]" />
    },
    {
        date: "04/2023 - 10/2023",
        title: "E-Commerce Mitarbeiter",
        subtitle: "Familienbetrieb",
        description: "Vertrieb von Waren über Online-Plattformen mit Fokus auf Digitalisierung.",
        bullets: [
            "Bestellabwicklung und Versandmanagement",
            "Optimierung von Produktanzeigen und Präsentationen",
            "Kundenkommunikation und Support"
        ],
        icon: <Briefcase className="w-6 h-6 text-[#0f172a]" />
    },
    {
        date: "2020 - 2023",
        title: "Vielseitige praktische Erfahrungen",
        subtitle: "Sozial & Ehrenamtlich",
        description: "Engagement in verschiedenen Bereichen vor dem Studium.",
        bullets: [
            "Ausbildung zum Pflegefachmann (Uniklinikum Gießen/Marburg)",
            "Ehrenamtliche Tätigkeit beim Malteser Hilfsdienst",
            "Auslandsaufenthalt für Freiwilligenarbeit in Thailand"
        ],
        icon: <HeartHandshake className="w-6 h-6 text-[#0f172a]" />
    },
    {
        date: "08/2018 - 06/2020",
        title: "Fachhochschulreife",
        subtitle: "Theodor-Heuss-Schule Wetzlar",
        description: "Erreichung der Fachhochschulreife mit Schwerpunkt Wirtschaft und Verwaltung.",
        bullets: [
            "Grundlagen in Betriebswirtschaft und Verwaltung",
            "Business-Englisch und kommunikative Kompetenzen"
        ],
        icon: <GraduationCap className="w-6 h-6 text-[#0f172a]" />
    }
];

export const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="experience" className="py-24 relative overflow-hidden bg-background">
            <div className="container mx-auto px-4 max-w-5xl relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col items-center mb-24 text-center"
                >
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            className="text-5xl md:text-7xl font-black mb-4 tracking-tight"
                        >
                            Werdegang
                        </motion.h2>
                    </div>
                    <p className="text-foreground/60 max-w-2xl text-lg font-medium mt-6">
                        Mein Weg von ersten ehrenamtlichen Erfahrungen bis zum Informatikstudium.
                    </p>
                </motion.div>

                <div ref={containerRef} className="relative">
                    {/* Animated SVG Timeline drawn in center (desktop) / left (mobile) */}
                    <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 h-full z-0 pointer-events-none">
                        {/* Background Track */}
                        <div className="absolute inset-0 bg-white/5 w-full h-full rounded-full" />

                        {/* Drawing Line */}
                        <motion.div
                            style={{ scaleY: pathLength, transformOrigin: "top" }}
                            className="absolute top-0 left-0 w-full bg-primary rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                        />
                    </div>

                    <div className="space-y-16 md:space-y-24">
                        {experiences.map((item, idx) => {
                            const isEven = idx % 2 === 0;

                            return (
                                <div key={idx} className="relative flex items-center md:items-start flex-col md:flex-row w-full group">

                                    {/* Icon Point (Center) */}
                                    <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 top-[32px] md:top-[12px] z-10">
                                        <motion.div
                                            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-transform duration-500 group-hover:scale-110"
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                    </div>

                                    {/* Desktop Layout Helper Left */}
                                    <div className={`hidden md:block w-1/2 pr-12 text-right ${!isEven && "md:invisible"}`}>
                                        {isEven && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -50 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ duration: 0.7, ease: "easeOut" }}
                                            >
                                                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                                <h4 className="text-foreground/70 text-lg mb-2 font-medium">{item.subtitle}</h4>
                                                <span className="inline-block py-1 px-3 glass rounded-full text-sm font-bold text-primary mb-4 border border-primary/20">{item.date}</span>
                                                <p className="text-foreground/60 leading-relaxed mb-4">{item.description}</p>
                                                <ul className="space-y-2 inline-block text-left">
                                                    {item.bullets.map((b, i) => (
                                                        <li key={i} className="text-sm text-foreground/50 flex items-start gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                                            <span>{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Desktop Layout Helper Right / Mobile Full Width */}
                                    <div className={`w-full pl-[72px] md:w-1/2 md:pl-12 ${isEven && "md:hidden"}`}>
                                        {(!isEven || window.innerWidth < 768) && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 50 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ duration: 0.7, ease: "easeOut" }}
                                            >
                                                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                                <h4 className="text-foreground/70 text-lg mb-2 font-medium">{item.subtitle}</h4>
                                                <span className="inline-block py-1 px-3 glass rounded-full text-sm font-bold text-primary mb-4 border border-primary/20">{item.date}</span>
                                                <p className="text-foreground/60 leading-relaxed mb-4">{item.description}</p>
                                                <ul className="space-y-2">
                                                    {item.bullets.map((b, i) => (
                                                        <li key={i} className="text-sm text-foreground/50 flex items-start gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                                            <span>{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
