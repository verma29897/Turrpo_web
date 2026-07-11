"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type NetworkFlowProps = {
    className?: string;
    /** approximate nodes per 100,000 px² of canvas, default 6 */
    density?: number;
};

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Pulse = { a: number; b: number; t: number; speed: number };

const LINK_DIST = 150;
const MAX_PULSES = 14;

export function NetworkFlow({ className, density = 6 }: NetworkFlowProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        let raf = 0;
        let width = 0;
        let height = 0;
        let nodes: Node[] = [];
        let pulses: Pulse[] = [];

        const seed = () => {
            const target = Math.min(
                90,
                Math.round(((width * height) / 100000) * density),
            );
            nodes = Array.from({ length: target }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1.1,
                vy: (Math.random() - 0.5) * 1.1,
                r: 1.2 + Math.random() * 1.6,
            }));
            pulses = [];
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < LINK_DIST) {
                        const alpha = (1 - dist / LINK_DIST) * 0.25;
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            for (const node of nodes) {
                ctx.fillStyle = "rgba(125, 211, 252, 0.7)";
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
                ctx.fill();
            }

            for (const pulse of pulses) {
                const a = nodes[pulse.a];
                const b = nodes[pulse.b];
                if (!a || !b) continue;
                const x = a.x + (b.x - a.x) * pulse.t;
                const y = a.y + (b.y - a.y) * pulse.t;
                ctx.save();
                ctx.shadowColor = "rgba(56, 189, 248, 0.9)";
                ctx.shadowBlur = 8;
                ctx.fillStyle = "rgba(186, 230, 253, 0.95)";
                ctx.beginPath();
                ctx.arc(x, y, 2.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        };

        const step = () => {
            for (const node of nodes) {
                node.x += node.vx;
                node.y += node.vy;
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;
            }

            pulses = pulses.filter((p) => (p.t += p.speed) < 1);

            if (pulses.length < MAX_PULSES && Math.random() < 0.15) {
                const a = Math.floor(Math.random() * nodes.length);
                const near: number[] = [];
                for (let j = 0; j < nodes.length; j++) {
                    if (j === a || !nodes[a] || !nodes[j]) continue;
                    const dist = Math.hypot(
                        nodes[a].x - nodes[j].x,
                        nodes[a].y - nodes[j].y,
                    );
                    if (dist < LINK_DIST) near.push(j);
                }
                if (near.length > 0) {
                    pulses.push({
                        a,
                        b: near[Math.floor(Math.random() * near.length)],
                        t: 0,
                        speed: 0.025 + Math.random() * 0.03,
                    });
                }
            }

            draw();
            raf = requestAnimationFrame(step);
        };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            width = rect.width;
            height = rect.height;
            canvas.width = Math.max(1, Math.round(rect.width * dpr));
            canvas.height = Math.max(1, Math.round(rect.height * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed();
            if (reduceMotion) draw();
        };

        const observer = new ResizeObserver(resize);
        observer.observe(canvas);
        resize();

        if (!reduceMotion) raf = requestAnimationFrame(step);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [density]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={cn(
                "absolute inset-0 h-full w-full pointer-events-none",
                className,
            )}
        />
    );
}
