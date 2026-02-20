import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Github, Code } from "lucide-react";

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
    github?: string;
}

const projects: Project[] = [
    {
        title: "Infernum",
        description: "Pixel Art Open World RPG developed with Godot Engine. Explore a vast world, fight monsters, and solve quests.",
        image: "https://picsum.photos/seed/infernum/800/600.webp",
        tags: ["Godot", "GDScript", "Pixel Art"],
        link: "https://n02k.itch.io/infernum",
    },
    {
        title: "Escape Shadows",
        description: "2D Pixel Art Dungeon Crawler built with Godot Engine. Features stealth mechanics, complex puzzles, and atmospheric graphics.",
        image: "https://picsum.photos/seed/escapeshadows/800/600.webp",
        tags: ["Godot", "GDScript", "Dungeon Crawler"],
    },
    {
        title: "Atari Breakout AI",
        description: "Data Science project showcasing an AI agent learning to play Atari Breakout using Reinforcement Learning.",
        image: "https://picsum.photos/seed/atari/800/600.webp",
        tags: ["Python", "Reinforcement Learning"],
    },
    {
        title: "Recipe API",
        description: "Full-stack web application for recipe management. Uses a REST API, PostgreSQL database, and modern frontend UI.",
        image: "https://picsum.photos/seed/rezept/800/600.webp",
        tags: ["JavaScript", "PostgreSQL", "Vert.x", "Java"],
    },
    {
        title: "Tetris Clone",
        description: "Classic Tetris clone built from scratch with modern features, including score tracking, levels, and smooth animations.",
        image: "https://picsum.photos/seed/tetris/800/600.webp",
        tags: ["JavaScript", "HTML5 Canvas", "CSS3"],
    },
    {
        title: "Mandelbrot Server",
        description: "Interactive fractal viewer written in C. Allows infinite zooming into the Mandelbrot Set.",
        image: "https://picsum.photos/seed/mandelbrot/800/600.webp",
        tags: ["C", "Mathematics", "Fractals"],
    },
];

const ProjectCard = ({ project }: { project: Project }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="h-full w-[85vw] md:w-[60vw] lg:w-[45vw] flex items-center justify-center p-4 sm:p-8 shrink-0" style={{ perspective: 2000 }}>
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-[500px] md:h-[600px] rounded-3xl glass border border-white/10 overflow-hidden group cursor-pointer"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div
                    className="w-full h-1/2 overflow-hidden relative"
                    style={{ transform: "translateZ(50px)" }}
                >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                </div>

                <div
                    className="p-8 h-1/2 flex flex-col"
                    style={{ transform: "translateZ(80px)" }}
                >
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-foreground/70 mb-6 flex-grow text-lg">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs font-semibold px-4 py-1.5 bg-white/5 rounded-full text-foreground/90 border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-6 mt-auto">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors uppercase tracking-wider relative z-20"
                            >
                                <ExternalLink size={18} /> Live Demo
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors uppercase tracking-wider relative z-20"
                            >
                                <Github size={18} /> Repository
                            </a>
                        )}
                        {!project.link && !project.github && (
                            <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider relative z-20">
                                <Code size={18} /> Internal / Private
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const Projects = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

    return (
        <section id="projects" ref={targetRef} className="relative h-[500vh] bg-background">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Title Section pinned to the left */}
                <div className="absolute top-32 left-8 md:left-24 z-10 w-full pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <h2 className="text-5xl md:text-8xl font-black text-outline pointer-events-none leading-none">
                            Featured<br />Projects
                        </h2>
                    </motion.div>
                </div>

                <motion.div style={{ x }} className="flex pl-8 md:pl-32 gap-8 md:gap-16 pt-20">
                    {projects.map((project, idx) => (
                        <ProjectCard project={project} key={idx} />
                    ))}
                    {/* Add a spacer at the end for smooth scroll exit */}
                    <div className="w-[10vw] shrink-0" />
                </motion.div>

            </div>
        </section>
    );
};
