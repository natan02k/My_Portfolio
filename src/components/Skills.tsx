import { motion } from "framer-motion";
import { Code2, Laptop, Database, Wrench } from "lucide-react";

export const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
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

    const skillCategories = [
        {
            icon: <Code2 className="w-8 h-8 text-primary" />,
            title: "Programmiersprachen",
            skills: ["Java", "Python", "C", "GDScript", "C#", "SQL"],
        },
        {
            icon: <Laptop className="w-8 h-8 text-primary" />,
            title: "Web-Entwicklung",
            skills: ["JavaScript", "TypeScript", "HTML/CSS", "Node.js", "Vert.x", "REST APIs"],
        },
        {
            icon: <Database className="w-8 h-8 text-primary" />,
            title: "Datenbanken",
            skills: ["PostgreSQL", "MySQL", "MongoDB"],
        },
        {
            icon: <Wrench className="w-8 h-8 text-primary" />,
            title: "Tools & Technologien",
            skills: ["Git / GitLab", "Godot Engine", "Docker", "CI/CD Pipeline", "Game Dev", "iOS Shortcuts"],
        },
    ];

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col items-center mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Technologien</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                    <p className="mt-6 text-foreground/70 max-w-2xl text-lg">
                        Ein fokussiertes Toolkit aus modernsten und bewährten Technologien, um robuste und skalierbare Lösungen zu
                        bauen.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="glass p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-300 group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                                    {category.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className="px-4 py-2 bg-white/5 text-foreground/90 rounded-full text-sm font-medium border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
