import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../lib/utils";

export const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const innerSpringConfig = { damping: 20, stiffness: 400, mass: 0.2 };
    const innerCursorXSpring = useSpring(cursorX, innerSpringConfig);
    const innerCursorYSpring = useSpring(cursorY, innerSpringConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className={cn(
                    "fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden md:block",
                    isHovering ? "scale-150 bg-primary/10" : "scale-100"
                )}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            />
            <motion.div
                className={cn(
                    "fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden md:block",
                    isHovering ? "scale-0" : "scale-100"
                )}
                style={{
                    x: innerCursorXSpring,
                    y: innerCursorYSpring,
                    translateX: "12px",
                    translateY: "12px",
                }}
            />
        </>
    );
};
