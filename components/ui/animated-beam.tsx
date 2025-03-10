"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedBeamProps {
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  containerRef: React.RefObject<HTMLElement>;
  curvature?: number;
  pathWidth?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  duration?: number;
  reverse?: boolean;
}

export function AnimatedBeam({
  fromRef,
  toRef,
  containerRef,
  curvature = 0,
  pathWidth = 2,
  gradientStartColor = "#ff0080",
  gradientStopColor = "#7928ca",
  duration = 2,
  reverse = false,
}: AnimatedBeamProps) {
  const [path, setPath] = useState<string>("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const [points, setPoints] = useState({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });
  const id = useRef(`gradient-${Math.random().toString(36).slice(2, 11)}`);

  useEffect(() => {
    if (!fromRef.current || !toRef.current || !containerRef.current) return;

    const calculatePositions = () => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const fromRect = fromRef.current!.getBoundingClientRect();
      const toRect = toRef.current!.getBoundingClientRect();

      // Calculate centers relative to the container
      const fromCenter = {
        x: fromRect.left + fromRect.width / 2 - containerRect.left,
        y: fromRect.top + fromRect.height / 2 - containerRect.top,
      };

      const toCenter = {
        x: toRect.left + toRect.width / 2 - containerRect.left,
        y: toRect.top + toRect.height / 2 - containerRect.top,
      };

      // Set SVG dimensions to match container
      setSvgDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });

      // Update start and end points
      setPoints({
        start: reverse ? toCenter : fromCenter,
        end: reverse ? fromCenter : toCenter,
      });

      // Calculate control points for the curve
      const dx = toCenter.x - fromCenter.x;
      const dy = toCenter.y - fromCenter.y;
      const controlX = fromCenter.x + dx / 2;
      const controlY = fromCenter.y + dy / 2 - curvature;

      // Create the path
      const newPath = `M${fromCenter.x},${fromCenter.y} Q${controlX},${controlY} ${toCenter.x},${toCenter.y}`;
      setPath(newPath);
    };

    // Calculate initial positions
    calculatePositions();

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculatePositions);
    resizeObserver.observe(containerRef.current);

    // Clean up
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [fromRef, toRef, containerRef, curvature, reverse]);

  const pathLength = useRef(0);

  return (
    <svg
      className="absolute left-0 top-0 z-0 pointer-events-none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={id.current} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStopColor} />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${id.current})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        onUpdate={(latest) => {
          pathLength.current = latest.pathLength;
        }}
      />
      <motion.circle
        r={4}
        fill={gradientStartColor}
        filter="drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{
          duration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          offsetPath: `path("${path}")`,
        }}
      />
    </svg>
  );
}