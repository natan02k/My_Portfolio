import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Send } from "lucide-react";

export const Contact = () => {
    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-background/50">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col items-center mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Talk</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                    <p className="mt-6 text-foreground/70 max-w-2xl text-lg">
                        Interested in working together or have any questions? Here you can find all
                        the ways to get in touch with me.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="flex items-start gap-6 p-6 glass rounded-2xl border border-foreground/10 group hover:border-primary/30 transition-colors">
                            <div className="p-4 bg-foreground/5 rounded-xl text-primary group-hover:bg-primary/10 transition-colors">
                                <Mail size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2 text-foreground">Email</h3>
                                <p className="text-foreground/70 mb-2">The best way to reach me.</p>
                                <a href="mailto:n.kondler@icloud.com" className="text-primary hover:underline text-lg font-medium">
                                    n.kondler@icloud.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 p-6 glass rounded-2xl border border-foreground/10 group hover:border-primary/30 transition-colors">
                            <div className="p-4 bg-foreground/5 rounded-xl text-primary group-hover:bg-primary/10 transition-colors">
                                <Phone size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2 text-foreground">Phone</h3>
                                <p className="text-foreground/70 mb-2">For urgent inquiries.</p>
                                <a href="tel:+491639268268" className="text-primary hover:underline text-lg font-medium">
                                    +49 163 9268268
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 p-6 glass rounded-2xl border border-foreground/10 group hover:border-primary/30 transition-colors">
                            <div className="p-4 bg-foreground/5 rounded-xl text-primary group-hover:bg-primary/10 transition-colors">
                                <MapPin size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2 text-foreground">Location</h3>
                                <p className="text-foreground/70 mb-2">Current residence and place of study.</p>
                                <span className="text-primary text-lg font-medium">Wetzlar, Germany</span>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <a
                                href="https://github.com/n02k"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 glass rounded-full hover:bg-white/10 transition-colors group border border-white/5"
                            >
                                <Github size={24} className="text-foreground/80 group-hover:text-white transition-colors" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/natan-kondler-aa1686198/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 glass rounded-full hover:bg-white/10 transition-colors group border border-white/5"
                            >
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-foreground/80 group-hover:text-white transition-colors">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Minimal Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass p-8 rounded-3xl border border-foreground/10"
                    >
                        <form className="space-y-6 flex flex-col h-full" onSubmit={(e) => { e.preventDefault(); window.location.href = "mailto:n.kondler@icloud.com"; }}>
                            <div>
                                <label className="text-sm font-medium text-foreground/80 mb-2 block">Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground/80 mb-2 block">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div className="flex-grow">
                                <label className="text-sm font-medium text-foreground/80 mb-2 block">Message</label>
                                <textarea
                                    rows={5}
                                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                                    placeholder="How can I help you?"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-primary text-[#0f172a] font-bold rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
                            >
                                <span>Send Message via Email</span>
                                <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
