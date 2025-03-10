"use client";

import { motion } from "framer-motion";
import { AnimeStyleCourseCard } from "@/components/AnimeStyleCourseCard";

const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals: HTML, CSS & JavaScript",
    instructor: "Sarah Johnson",
    category: "Web Dev",
    progress: 45,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000",
    duration: "4h 30m",
  },
  {
    id: 2,
    title: "Python for Data Science and Machine Learning",
    instructor: "Michael Chen",
    category: "Data Science",
    progress: 78,
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2000",
    duration: "8h 15m",
  },
  {
    id: 3,
    title: "Complete React Developer Course",
    instructor: "Emma Rodriguez",
    category: "Frontend",
    progress: 12,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000",
    duration: "10h 45m",
  },
  {
    id: 4,
    title: "Game Development with Unity",
    instructor: "Alex Morgan",
    category: "Game Dev",
    progress: 34,
    thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=2000",
    duration: "12h 20m",
  },
  {
    id: 5,
    title: "UI/UX Design Principles for Modern Applications",
    instructor: "Nina Patel",
    category: "Design",
    progress: 65,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000",
    duration: "6h 40m",
  },
  {
    id: 6,
    title: "Node.js: Complete Backend Development",
    instructor: "Carlos Santos",
    category: "Backend",
    progress: 23,
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2000",
    duration: "9h 15m",
  },
];

export default function CoursesPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 md:px-6">
      <div className="absolute inset-0 bg-[#87CEEB] -z-10" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Learn Anything on YouTube
          </motion.h1>
          <motion.p 
            className="max-w-2xl text-base md:text-lg text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover a curated selection of courses from the best YouTube educators, organized just for you.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <AnimeStyleCourseCard
                title={course.title}
                instructor={course.instructor}
                category={course.category}
                progress={course.progress}
                thumbnail={course.thumbnail}
                duration={course.duration}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}