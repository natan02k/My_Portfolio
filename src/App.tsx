import { ReactLenis } from "lenis/react";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="relative min-h-screen w-full selection:bg-primary selection:text-black">
        {/* Global SVG Noise Filter */}
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-difference">
          <svg className="h-full w-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        <CustomCursor />
        <Navbar />

        <main className="w-full">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <footer className="w-full py-8 text-center text-sm text-foreground/50 border-t border-white/5">
          <p>&copy; {new Date().getFullYear()} Natan Kondler. Alle Rechte vorbehalten.</p>
        </footer>
      </div>
    </ReactLenis>
  );
}

export default App;
