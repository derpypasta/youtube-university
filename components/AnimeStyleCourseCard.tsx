import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimeStyleCourseCardProps {
  title: string;
  instructor: string;
  category: string;
  progress: number;
  thumbnail: string;
  duration: string;
  className?: string;
}

export function AnimeStyleCourseCard({
  title,
  instructor,
  category,
  progress,
  thumbnail,
  duration,
  className,
}: AnimeStyleCourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "group relative h-[320px] w-[280px] overflow-hidden rounded-xl border border-border bg-background transition-all duration-300",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
    >
      <div className="relative h-[160px] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
          <Clock size={12} />
          <span>{duration}</span>
        </div>
        <motion.div
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play size={16} className="ml-0.5" />
        </motion.div>
        <div className="absolute bottom-0 left-0 h-1 w-full bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: `${progress}%` }}
            animate={{ width: isHovered ? `${progress + 5}%` : `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="flex flex-col p-4">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {category}
          </span>
          <span className="text-xs text-muted-foreground">
            {progress}% complete
          </span>
        </div>
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 overflow-hidden rounded-full bg-muted">
              <img
                src={`https://ui-avatars.com/api/?name=${instructor}&background=random`}
                alt={instructor}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm text-muted-foreground">{instructor}</span>
          </div>
          <motion.div
            className="flex cursor-pointer items-center gap-1 text-xs font-medium text-primary"
            whileHover={{ x: 3 }}
          >
            <BookOpen size={14} />
            <span>Continue</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}