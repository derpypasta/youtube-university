"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Cloud, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function CloudElement({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  opacity = 0.8,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -50,
        rotate: rotate - 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          x: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-white",
            "opacity-" + opacity,
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.2)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function AnimeLandingPage() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#87CEEB]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E90FF]/30 via-[#87CEEB] to-[#87CEEB]" />

      {/* Sun */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute top-24 right-24 z-10"
      >
        <Sun className="h-24 w-24 text-yellow-400 fill-yellow-400" />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden">
        {/* Distant storm clouds */}
        <CloudElement
          delay={0.3}
          width={300}
          height={80}
          rotate={5}
          opacity={0.6}
          className="left-[10%] top-[15%]"
        />

        <CloudElement
          delay={0.5}
          width={400}
          height={100}
          rotate={-8}
          opacity={0.7}
          className="right-[5%] top-[25%]"
        />

        <CloudElement
          delay={0.7}
          width={350}
          height={90}
          rotate={3}
          opacity={0.5}
          className="left-[20%] top-[35%]"
        />

        <CloudElement
          delay={0.4}
          width={250}
          height={70}
          rotate={-5}
          opacity={0.8}
          className="right-[15%] top-[40%]"
        />

        <CloudElement
          delay={0.6}
          width={200}
          height={60}
          rotate={10}
          opacity={0.6}
          className="left-[30%] top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 mb-8 backdrop-blur-sm"
          >
            <Cloud className="h-4 w-4 text-white" />
            <span className="text-sm text-white font-medium tracking-wide">
              Welcome to YouTube University
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Learn Anything
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white/90 to-blue-300">
                From YouTube
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 leading-relaxed font-medium tracking-wide max-w-xl mx-auto px-4">
              Your personalized learning platform that organizes educational YouTube content into structured courses.
              Start your learning journey today!
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"
            >
              Start Learning
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
            >
              Explore Courses
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Foreground clouds */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent backdrop-blur-sm" />
    </div>
  );
}

export { AnimeLandingPage };