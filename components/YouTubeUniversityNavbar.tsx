"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Search, User, Home, BookOpen, Map, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: React.ElementType
}

interface YouTubeUniversityNavbarProps {
  className?: string
  defaultActive?: string
}

export function YouTubeUniversityNavbar({ 
  className, 
  defaultActive = "Home" 
}: YouTubeUniversityNavbarProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(defaultActive)
  const [isMobile, setIsMobile] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const items: NavItem[] = [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      name: "Courses",
      url: "/courses",
      icon: BookOpen,
    },
    {
      name: "Learning Paths",
      url: "/learning-paths",
      icon: Map,
    },
    {
      name: "My Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-5 left-0 right-0 z-[9999]">
      <div className="flex justify-center pt-6">
        <motion.div 
          className="flex items-center gap-3 bg-background/80 border border-border backdrop-blur-lg py-2 px-2 rounded-full shadow-lg relative w-full max-w-5xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <div className="flex items-center gap-2 pl-3">
            <div className="text-primary font-bold text-lg mr-2">
              <span className="text-red-500">YT</span>University
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.name
              const isHovered = hoveredTab === item.name

              return (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab(item.name)
                  }}
                  onMouseEnter={() => setHoveredTab(item.name)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300",
                    "text-foreground/70 hover:text-foreground",
                    isActive && "text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.03, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                      <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                      <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                      
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                        style={{
                          animation: "shine 3s ease-in-out infinite"
                        }}
                      />
                    </motion.div>
                  )}

                  <motion.span
                    className="hidden md:inline relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                  <motion.span 
                    className="md:hidden relative z-10"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} strokeWidth={2.5} />
                  </motion.span>
            
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 bg-foreground/10 rounded-full -z-10"
                      />
                    )}
                  </AnimatePresence>

                  {isActive && (
                    <motion.div
                      layoutId="anime-mascot"
                      className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="relative w-12 h-12">
                        <motion.div 
                          className="absolute w-10 h-10 bg-white rounded-full left-1/2 -translate-x-1/2"
                          animate={
                            hoveredTab ? {
                              scale: [1, 1.1, 1],
                              rotate: [0, -5, 5, 0],
                              transition: {
                                duration: 0.5,
                                ease: "easeInOut"
                              }
                            } : {
                              y: [0, -3, 0],
                              transition: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            }
                          }
                        >
                          <motion.div 
                            className="absolute w-2 h-2 bg-black rounded-full"
                            animate={
                              hoveredTab ? {
                                scaleY: [1, 0.2, 1],
                                transition: {
                                  duration: 0.2,
                                  times: [0, 0.5, 1]
                                }
                              } : {}
                            }
                            style={{ left: '25%', top: '40%' }}
                          />
                          <motion.div 
                            className="absolute w-2 h-2 bg-black rounded-full"
                            animate={
                              hoveredTab ? {
                                scaleY: [1, 0.2, 1],
                                transition: {
                                  duration: 0.2,
                                  times: [0, 0.5, 1]
                                }
                              } : {}
                            }
                            style={{ right: '25%', top: '40%' }}
                          />
                          <motion.div 
                            className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                            animate={{
                              opacity: hoveredTab ? 0.8 : 0.6
                            }}
                            style={{ left: '15%', top: '55%' }}
                          />
                          <motion.div 
                            className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                            animate={{
                              opacity: hoveredTab ? 0.8 : 0.6
                            }}
                            style={{ right: '15%', top: '55%' }}
                          />
                          
                          <motion.div 
                            className="absolute w-4 h-2 border-b-2 border-black rounded-full"
                            animate={
                              hoveredTab ? {
                                scaleY: 1.5,
                                y: -1
                              } : {
                                scaleY: 1,
                                y: 0
                              }
                            }
                            style={{ left: '30%', top: '60%' }}
                          />
                          <AnimatePresence>
                            {hoveredTab && (
                              <>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0 }}
                                  className="absolute -top-1 -right-1 w-2 h-2 text-yellow-300"
                                >
                                  ✨
                                </motion.div>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="absolute -top-2 left-0 w-2 h-2 text-yellow-300"
                                >
                                  ✨
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <motion.div
                          className="absolute -bottom-1 left-1/2 w-4 h-4 -translate-x-1/2"
                          animate={
                            hoveredTab ? {
                              y: [0, -4, 0],
                              transition: {
                                duration: 0.3,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }
                            } : {
                              y: [0, 2, 0],
                              transition: {
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                              }
                            }
                          }
                        >
                          <div className="w-full h-full bg-white rotate-45 transform origin-center" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2 pr-3">
            <motion.div 
              className={cn(
                "relative flex items-center rounded-full border border-border bg-background/50 px-3 py-1.5",
                isSearchFocused && "ring-2 ring-primary/50"
              )}
              whileTap={{ scale: 0.98 }}
            >
              <Search size={16} className="text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-24 md:w-32 lg:w-40 ml-2 text-foreground placeholder:text-muted-foreground"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </motion.div>
            
            <div className="flex items-center gap-2">
              <motion.button 
                className="px-3 py-1.5 text-sm font-medium text-foreground bg-background border border-border rounded-full hover:bg-muted transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button 
                className="px-3 py-1.5 text-sm font-medium text-background bg-primary rounded-full hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}