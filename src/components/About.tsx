import { motion } from "framer-motion";
import { MapPin, GraduationCap, Calendar, Cake } from "lucide-react";

export const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants: any = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-background/50">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Über mich</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 50 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative aspect-square rounded-2xl overflow-hidden glass p-2 border border-white/10 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                            <img
                                src="https://picsum.photos/seed/natan/600/600.webp"
                                alt="Natan Kondler"
                                className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="text-3xl font-semibold text-white">Natan Kondler</h3>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                Ein 24-jähriger Computer Science Student an der Technischen Hochschule Mittelhessen. Seit ich 2023 meine
                                Leidenschaft für die Softwareentwicklung entdeckt habe, treibt mich die Faszination an, komplexe Probleme
                                durch eleganten Code zu lösen.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="text-2xl font-semibold text-white">Vielseitige Expertise</h3>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                Statt mich vorzeitig auf eine Nische zu beschränken, verfolge ich einen interdisziplinären Ansatz. Meine
                                Projekterfahrung erstreckt sich von Full-Stack-Webanwendungen und Game Development über systemnahe
                                C-Programmierung bis hin zu Data Science und Reinforcement Learning-Modellen.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center gap-3 p-4 glass rounded-xl border border-white/5">
                                <MapPin className="text-primary w-6 h-6" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Standort</p>
                                    <p className="font-medium">Wetzlar, Deutschland</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 glass rounded-xl border border-white/5">
                                <GraduationCap className="text-primary w-6 h-6" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Studium</p>
                                    <p className="font-medium">5. Semester Informatik (B.Sc.)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 glass rounded-xl border border-white/5">
                                <Cake className="text-primary w-6 h-6" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Alter</p>
                                    <p className="font-medium">24 Jahre alt</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 glass rounded-xl border border-white/5">
                                <Calendar className="text-primary w-6 h-6" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Studienbeginn</p>
                                    <p className="font-medium">Seit WS 23/24</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
