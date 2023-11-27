import { useState, useEffect } from "react";

export default function useMousePos() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        }
        window.addEventListener("mousemove", handler);
        return () => {
            window.removeEventListener("mousemove", handler);
        }
    }, [])

    return [mousePos]
}