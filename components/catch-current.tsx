"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export default function CatchCurrent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<Point>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const readPalette = () => {
      const styles = window.getComputedStyle(document.documentElement);
      const token = (name: string) => styles.getPropertyValue(name).trim();

      return {
        ring: token("--market-canvas-ring"),
        ringStrong: token("--market-canvas-ring-strong"),
        current: token("--market-canvas-current"),
        currentSignal: token("--market-canvas-current-signal"),
        fish: token("--market-canvas-fish"),
        scale: token("--market-canvas-scale"),
        scaleSignal: token("--market-canvas-scale-signal"),
        signal: token("--market-canvas-signal"),
        signalSoft: token("--market-canvas-signal-soft"),
        coordinates: token("--market-canvas-coordinates"),
      };
    };

    let palette = readPalette();

    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
      };
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const centerX = width * 0.53;
      const centerY = height * 0.46;
      const radius = Math.min(width, height) * 0.36;
      const driftX = (pointerRef.current.x - 0.5) * 16;
      const driftY = (pointerRef.current.y - 0.5) * 12;

      context.save();
      context.translate(driftX, driftY);

      for (let ring = 0; ring < 4; ring += 1) {
        context.beginPath();
        context.arc(centerX, centerY, radius * (0.43 + ring * 0.2), 0, Math.PI * 2);
        context.strokeStyle = ring === 3 ? palette.ringStrong : palette.ring;
        context.lineWidth = ring === 3 ? 1.4 : 1;
        context.setLineDash(ring === 3 ? [4, 8] : []);
        context.stroke();
      }
      context.setLineDash([]);

      for (let line = 0; line < 11; line += 1) {
        const yBase = centerY - radius * 0.75 + line * radius * 0.15;
        context.beginPath();
        for (let x = centerX - radius * 1.3; x <= centerX + radius * 1.3; x += 7) {
          const wave = Math.sin(x * 0.019 + line * 0.72 + frame * 0.012) * (5 + line * 0.28);
          const y = yBase + wave;
          if (x === centerX - radius * 1.3) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = line === 5 ? palette.currentSignal : palette.current;
        context.lineWidth = line === 5 ? 1.5 : 1;
        context.stroke();
      }

      const fishWidth = radius * 1.35;
      const fishHeight = radius * 0.55;
      context.save();
      context.translate(centerX, centerY);

      context.beginPath();
      context.moveTo(-fishWidth * 0.58, 0);
      context.bezierCurveTo(-fishWidth * 0.34, -fishHeight, fishWidth * 0.27, -fishHeight, fishWidth * 0.56, 0);
      context.bezierCurveTo(fishWidth * 0.27, fishHeight, -fishWidth * 0.34, fishHeight, -fishWidth * 0.58, 0);
      context.closePath();
      context.fillStyle = palette.fish;
      context.fill();

      context.beginPath();
      context.moveTo(-fishWidth * 0.54, 0);
      context.lineTo(-fishWidth * 0.86, -fishHeight * 0.72);
      context.lineTo(-fishWidth * 0.8, 0);
      context.lineTo(-fishWidth * 0.86, fishHeight * 0.72);
      context.closePath();
      context.fillStyle = palette.fish;
      context.fill();

      for (let row = -3; row <= 3; row += 1) {
        for (let column = -5; column <= 5; column += 1) {
          const px = column * fishWidth * 0.075 + Math.sin(row * 1.7) * 4;
          const py = row * fishHeight * 0.115;
          const normalizedX = px / (fishWidth * 0.58);
          const normalizedY = py / (fishHeight * 0.5);
          if (normalizedX * normalizedX + normalizedY * normalizedY > 0.76) continue;

          const pulse = 1 + Math.sin(frame * 0.025 + row + column * 0.8) * 0.55;
          context.beginPath();
          context.arc(px, py, Math.max(1.2, pulse), 0, Math.PI * 2);
          context.fillStyle = column > 2 ? palette.scaleSignal : palette.scale;
          context.fill();
        }
      }

      context.beginPath();
      context.arc(fishWidth * 0.39, -fishHeight * 0.08, 3.4, 0, Math.PI * 2);
      context.fillStyle = palette.signal;
      context.fill();
      context.restore();

      const orbitAngle = frame * 0.009;
      const orbitX = centerX + Math.cos(orbitAngle) * radius * 0.82;
      const orbitY = centerY + Math.sin(orbitAngle) * radius * 0.82;
      context.beginPath();
      context.arc(orbitX, orbitY, 4.5, 0, Math.PI * 2);
      context.fillStyle = palette.signal;
      context.fill();
      context.beginPath();
      context.arc(orbitX, orbitY, 10, 0, Math.PI * 2);
      context.strokeStyle = palette.signalSoft;
      context.stroke();

      context.restore();

      context.font = "600 10px 'DM Sans', sans-serif";
      context.letterSpacing = "1.5px";
      context.fillStyle = palette.coordinates;
      context.fillText("23.5941° N", 18, 26);
      context.fillText("90.2623° E", Math.max(18, width - 92), height - 20);

      frame += 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
    });

    observer.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    canvas.addEventListener("pointermove", handlePointer);
    resize();
    draw();

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointer);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="size-full touch-none" aria-hidden="true" />;
}
