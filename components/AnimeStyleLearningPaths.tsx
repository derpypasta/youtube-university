"use client";

import React, { forwardRef, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Code, Compass, Gamepad2, Layers, Rocket, Video } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const CourseNode = forwardRef<
  HTMLDivElement,
  { 
    className?: string; 
    children?: React.ReactNode;
    title: string;
    description?: string;
    icon: React.ReactNode;
    color?: string;
  }
>(({ className, children, title, description, icon, color = "border-blue-500" }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex flex-col items-center justify-center rounded-xl border-2 bg-background p-4 shadow-[0_0_20px_-12px_rgba(0,0,0,0.5)]",
        color,
        className,
      )}
    >
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground">
        {icon}
      </div>
      <h3 className="text-center text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 text-center text-xs text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
});

CourseNode.displayName = "CourseNode";

export interface LearningPathProps {
  className?: string;
  title: string;
  description?: string;
  courses: {
    id: string;
    title: string;
    description?: string;
    icon: React.ReactNode;
    color?: string;
  }[];
  connections: {
    from: string;
    to: string;
    curvature?: number;
    reverse?: boolean;
  }[];
}

export function LearningPath({ 
  className, 
  title, 
  description, 
  courses, 
  connections 
}: LearningPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  // Initialize refs for each course
  courses.forEach(course => {
    if (!nodeRefs.current[course.id]) {
      nodeRefs.current[course.id] = React.createRef<HTMLDivElement>();
    }
  });

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      
      <div
        className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-6 md:shadow-xl"
        ref={containerRef}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {courses.map((course) => (
            <CourseNode
              key={course.id}
              ref={nodeRefs.current[course.id]}
              title={course.title}
              description={course.description}
              icon={course.icon}
              color={course.color}
              className="w-full max-w-[220px] transition-transform hover:scale-105"
            />
          ))}
        </div>

        {connections.map((connection, index) => (
          <AnimatedBeam
            key={index}
            containerRef={containerRef}
            fromRef={nodeRefs.current[connection.from]}
            toRef={nodeRefs.current[connection.to]}
            curvature={connection.curvature || 0}
            reverse={connection.reverse}
            gradientStartColor="#ff6b6b"
            gradientStopColor="#4834d4"
            pathWidth={3}
            duration={5}
          />
        ))}
      </div>
    </div>
  );
}

export function AnimeStyleLearningPaths() {
  const [activePath, setActivePath] = useState<string>("frontend");
  
  const paths = {
    frontend: {
      title: "Frontend Development Path",
      description: "Master the art of creating beautiful user interfaces",
      courses: [
        {
          id: "html-css",
          title: "HTML & CSS Basics",
          description: "Learn the fundamentals of web markup and styling",
          icon: <Code size={24} />,
          color: "border-pink-500"
        },
        {
          id: "javascript",
          title: "JavaScript Essentials",
          description: "Build interactive websites with JavaScript",
          icon: <Code size={24} />,
          color: "border-yellow-500"
        },
        {
          id: "react",
          title: "React Framework",
          description: "Create component-based UIs with React",
          icon: <Layers size={24} />,
          color: "border-blue-500"
        },
        {
          id: "animation",
          title: "Web Animation",
          description: "Add life to your websites with animations",
          icon: <Video size={24} />,
          color: "border-purple-500"
        },
        {
          id: "responsive",
          title: "Responsive Design",
          description: "Build websites that work on any device",
          icon: <Compass size={24} />,
          color: "border-green-500"
        },
        {
          id: "advanced",
          title: "Advanced Frontend",
          description: "Master advanced concepts and techniques",
          icon: <Rocket size={24} />,
          color: "border-red-500"
        }
      ],
      connections: [
        { from: "html-css", to: "javascript", curvature: 0 },
        { from: "javascript", to: "react", curvature: 0 },
        { from: "react", to: "animation", curvature: 50 },
        { from: "react", to: "responsive", curvature: -50 },
        { from: "animation", to: "advanced", curvature: 0 },
        { from: "responsive", to: "advanced", curvature: 0 }
      ]
    },
    gamedev: {
      title: "Game Development Path",
      description: "Create exciting games from scratch",
      courses: [
        {
          id: "programming",
          title: "Programming Basics",
          description: "Learn fundamental programming concepts",
          icon: <Code size={24} />,
          color: "border-blue-500"
        },
        {
          id: "game-design",
          title: "Game Design",
          description: "Master the principles of engaging game design",
          icon: <Gamepad2 size={24} />,
          color: "border-purple-500"
        },
        {
          id: "unity",
          title: "Unity Engine",
          description: "Build games with the Unity game engine",
          icon: <Layers size={24} />,
          color: "border-green-500"
        },
        {
          id: "3d-modeling",
          title: "3D Modeling",
          description: "Create 3D assets for your games",
          icon: <Compass size={24} />,
          color: "border-orange-500"
        },
        {
          id: "animation",
          title: "Game Animation",
          description: "Bring characters to life with animation",
          icon: <Video size={24} />,
          color: "border-pink-500"
        },
        {
          id: "publishing",
          title: "Game Publishing",
          description: "Learn how to publish and market your games",
          icon: <Rocket size={24} />,
          color: "border-red-500"
        }
      ],
      connections: [
        { from: "programming", to: "game-design", curvature: 0 },
        { from: "game-design", to: "unity", curvature: 0 },
        { from: "unity", to: "3d-modeling", curvature: 50 },
        { from: "unity", to: "animation", curvature: -50 },
        { from: "3d-modeling", to: "publishing", curvature: 0 },
        { from: "animation", to: "publishing", curvature: 0 }
      ]
    },
    anime: {
      title: "Anime Art Path",
      description: "Learn to create stunning anime-style artwork",
      courses: [
        {
          id: "basics",
          title: "Drawing Basics",
          description: "Master fundamental drawing techniques",
          icon: <BookOpen size={24} />,
          color: "border-blue-500"
        },
        {
          id: "character",
          title: "Character Design",
          description: "Create memorable anime characters",
          icon: <Compass size={24} />,
          color: "border-pink-500"
        },
        {
          id: "coloring",
          title: "Digital Coloring",
          description: "Learn digital coloring techniques",
          icon: <Layers size={24} />,
          color: "border-purple-500"
        },
        {
          id: "backgrounds",
          title: "Backgrounds & Scenes",
          description: "Create immersive anime environments",
          icon: <Video size={24} />,
          color: "border-green-500"
        },
        {
          id: "animation",
          title: "Animation Basics",
          description: "Bring your characters to life",
          icon: <Video size={24} />,
          color: "border-yellow-500"
        },
        {
          id: "portfolio",
          title: "Portfolio Building",
          description: "Create a professional anime art portfolio",
          icon: <Rocket size={24} />,
          color: "border-red-500"
        }
      ],
      connections: [
        { from: "basics", to: "character", curvature: 0 },
        { from: "character", to: "coloring", curvature: 0 },
        { from: "coloring", to: "backgrounds", curvature: 50 },
        { from: "coloring", to: "animation", curvature: -50 },
        { from: "backgrounds", to: "portfolio", curvature: 0 },
        { from: "animation", to: "portfolio", curvature: 0 }
      ]
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.keys(paths).map((path) => (
          <button
            key={path}
            onClick={() => setActivePath(path)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activePath === path 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted hover:bg-muted/80 text-foreground"
            )}
          >
            {paths[path].title}
          </button>
        ))}
      </div>

      <LearningPath
        title={paths[activePath].title}
        description={paths[activePath].description}
        courses={paths[activePath].courses}
        connections={paths[activePath].connections}
      />
    </div>
  );
}