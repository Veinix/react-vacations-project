import { motion, useSpring } from "framer-motion";
import { useEffect, useRef } from 'react'

const largeSize = 90;
const smallsize = 15;
const perPx = 0.3;

function Dot({ mousePos }: { mousePos: { x: number, y: number } }): JSX.Element {

    const size = useSpring(smallsize, {damping: 30, stiffness: 200})
    const dotRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if (!dotRef.current) return;
        const {x, y} = mousePos;
        const {x: dotX, y: dotY} = dotRef.current.getBoundingClientRect();

        // Pythagorean theorum to get hypotenuse aka distance
        const distance = Math.sqrt(Math.pow(Math.abs(x - dotX), 2) + Math.pow(Math.abs(y - dotY), 2))

        size.set(Math.max(largeSize - perPx * distance, smallsize))
    }, [mousePos, size])

    return (
        <div ref={dotRef} className="relative">
            <motion.div
                className="bg-indigo-500 rounded-full absolute -translate-y-1/2 -translate-x-1/2"
                style={{width: size, height: size}}
            />
        </div>
    )
}

export default Dot