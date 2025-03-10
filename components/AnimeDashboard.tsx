"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDimensions } from "@/components/hooks/use-debounced-dimensions";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Settings, 
  LogOut, 
  Play, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Clock
} from "lucide-react";

interface CourseCardProps {
  title: string;
  instructor: string;
  progress?: number;
  completed?: boolean;
  recommended?: boolean;
  thumbnail: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor,
  progress = 0,
  completed = false,
  recommended = false,
  thumbnail,
}) => {
  return (
    <motion.div 
      className="bg-background border border-border rounded-lg overflow-hidden flex flex-col"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-36">
        <Image 
          src={thumbnail} 
          alt={title} 
          fill 
          className="object-cover"
        />
        {recommended && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>Recommended</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">by {instructor}</p>
        
        {!completed && !recommended && (
          <>
            <div className="h-2 bg-muted rounded-full mb-2 mt-auto">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{progress}% complete</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Continue
              </span>
            </div>
          </>
        )}
        
        {completed && (
          <div className="mt-auto flex items-center text-green-500 text-sm">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            <span>Completed</span>
          </div>
        )}
        
        {recommended && (
          <div className="mt-auto">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 text-sm flex items-center justify-center gap-2 transition-colors">
              <Play className="h-4 w-4" />
              Start Learning
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  icon,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);

  const circleSize = React.useMemo(
    () => Math.max(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  );

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden h-full bg-background border border-border rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 overflow-hidden blur-2xl">
        {colors.map((color, index) => (
          <svg
            key={index}
            className="absolute animate-background-gradient"
            style={
              {
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 50}%`,
                "--background-gradient-speed": `${20}s`,
                "--tx-1": Math.random() - 0.5,
                "--ty-1": Math.random() - 0.5,
                "--tx-2": Math.random() - 0.5,
                "--ty-2": Math.random() - 0.5,
                "--tx-3": Math.random() - 0.5,
                "--ty-3": Math.random() - 0.5,
                "--tx-4": Math.random() - 0.5,
                "--ty-4": Math.random() - 0.5,
              } as React.CSSProperties
            }
            width={circleSize * (Math.random() * 0.5 + 0.5)}
            height={circleSize * (Math.random() * 0.5 + 0.5)}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill={color}
              className="opacity-30 dark:opacity-[0.15]"
            />
          </svg>
        ))}
      </div>
      <div className="relative z-10 p-4 text-foreground backdrop-blur-sm h-full flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-background/50 rounded-md">
            {icon}
          </div>
          <h3 className="text-sm text-foreground">{title}</h3>
        </div>
        <p className="text-2xl font-medium mb-1 text-foreground">{value}</p>
        {subtitle && (
          <p className="text-xs text-foreground/80">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

export function AnimeDashboard() {
  const [open, setOpen] = useState(false);
  
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <LayoutDashboard className="text-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "My Courses",
      href: "#",
      icon: <BookOpen className="text-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Learning Path",
      href: "#",
      icon: <GraduationCap className="text-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Achievements",
      href: "#",
      icon: <Award className="text-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <Settings className="text-foreground h-5 w-5 flex-shrink-0" />,
    },
  ];

  const inProgressCourses = [
    {
      title: "Advanced JavaScript Animation",
      instructor: "Miyazaki Sensei",
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "React Hooks Mastery",
      instructor: "Takahashi Sensei",
      progress: 32,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "CSS Animation Techniques",
      instructor: "Suzuki Sensei",
      progress: 78,
      thumbnail: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const completedCourses = [
    {
      title: "HTML & CSS Fundamentals",
      instructor: "Yamamoto Sensei",
      completed: true,
      thumbnail: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=2069&auto=format&fit=crop",
    },
    {
      title: "JavaScript Basics",
      instructor: "Nakamura Sensei",
      completed: true,
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop",
    },
  ];

  const recommendedCourses = [
    {
      title: "TypeScript for React Developers",
      instructor: "Tanaka Sensei",
      recommended: true,
      thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Next.js Full Stack Development",
      instructor: "Watanabe Sensei",
      recommended: true,
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-background border-r border-border p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 bg-blue-500 rounded-md flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">YT University</h1>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-blue-500">
              <Image 
                src="https://i.pravatar.cc/100" 
                alt="User avatar" 
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Anime Student</h3>
              <p className="text-xs text-muted-foreground">Level 7 Scholar</p>
            </div>
          </div>
          
          <div className="h-2 bg-muted rounded-full mb-1">
            <div className="h-full bg-blue-500 rounded-full w-[70%]" />
          </div>
          <p className="text-xs text-muted-foreground">70% to Level 8</p>
        </div>
        
        <nav className="space-y-1 mb-8">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
            >
              {link.icon}
              <span className="text-sm">{link.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto">
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="text-foreground h-5 w-5 flex-shrink-0" />
            <span className="text-sm">Logout</span>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back, Anime Student!</h1>
            <p className="text-muted-foreground">Continue your learning journey today.</p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatsCard
              title="Learning Streak"
              value="7 days"
              subtitle="Keep it up!"
              colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
              icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
            />
            <StatsCard
              title="Hours Learned"
              value="42.5"
              subtitle="This month"
              colors={["#F59E0B", "#FBBF24", "#FCD34D"]}
              icon={<Clock className="h-5 w-5 text-amber-500" />}
            />
            <StatsCard
              title="Courses Completed"
              value="5"
              subtitle="2 this month"
              colors={["#10B981", "#34D399", "#6EE7B7"]}
              icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
            />
          </div>
          
          {/* In Progress Courses */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Play className="h-5 w-5 mr-2 text-blue-500" />
              In Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressCourses.map((course, idx) => (
                <CourseCard key={idx} {...course} />
              ))}
            </div>
          </div>
          
          {/* Completed Courses */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              Completed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedCourses.map((course, idx) => (
                <CourseCard key={idx} {...course} />
              ))}
            </div>
          </div>
          
          {/* Recommended Courses */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-amber-500" />
              Recommended For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedCourses.map((course, idx) => (
                <CourseCard key={idx} {...course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}