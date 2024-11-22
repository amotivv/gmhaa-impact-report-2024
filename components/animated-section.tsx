"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentRef = ref.current // Store ref value
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    })
  
    if (currentRef) {
      observer.observe(currentRef)
    }
  
    return () => {
      if (currentRef) {  // Use stored ref value
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      {children}
    </div>
  )
}

