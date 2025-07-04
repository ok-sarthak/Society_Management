import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SlideNavbar = ({ 
  navItems = [], 
  activeItem = null, 
  onItemClick = () => {},
  className = "",
  variant = "default" // default, glass, solid
}) => {
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Check scroll position and update button states
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    
    const handleResize = () => checkScrollButtons()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [navItems])

  useEffect(() => {
    if (activeItem) {
      const index = navItems.findIndex(item => item.id === activeItem || item.path === activeItem)
      if (index !== -1) {
        setActiveIndex(index)
        scrollToItem(index)
      }
    }
  }, [activeItem, navItems])

  const scrollToItem = (index) => {
    if (scrollContainerRef.current) {
      const item = scrollContainerRef.current.children[index]
      if (item) {
        item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const handleItemClick = (item, index) => {
    setActiveIndex(index)
    onItemClick(item, index)
    scrollToItem(index)
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/10 backdrop-blur-xl border border-white/20'
      case 'solid':
        return 'bg-gray-800 border border-gray-700'
      default:
        return 'bg-white/5 backdrop-blur-lg border border-white/10'
    }
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Left Scroll Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: canScrollLeft ? 1 : 0.3, 
          scale: canScrollLeft ? 1 : 0.8 
        }}
        whileHover={{ scale: canScrollLeft ? 1.1 : 0.8 }}
        whileTap={{ scale: canScrollLeft ? 0.95 : 0.8 }}
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={`absolute left-0 z-10 p-2 rounded-full shadow-lg transition-all duration-300 ${getVariantStyles()} ${
          canScrollLeft 
            ? 'hover:bg-white/20 cursor-pointer' 
            : 'cursor-not-allowed opacity-30'
        }`}
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </motion.button>

      {/* Navbar Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className={`flex items-center gap-10 overflow-x-auto scrollbar-hide mx-10 px-4 py-3 rounded-full ${getVariantStyles()} scroll-smooth`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = index === activeIndex
          
          return (
            <motion.button
              key={item.id || item.name || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleItemClick(item, index)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/50 to-indigo-500/50 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Icon */}
              {Icon && (
                <Icon className={`w-4 h-4 relative z-10 ${
                  isActive ? 'text-blue-200' : 'text-white/60'
                }`} />
              )}
              
              {/* Text */}
              <span className="text-sm font-medium relative z-10">
                {item.name}
              </span>
              
              {/* Badge (if provided) */}
              {item.badge && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full relative z-10">
                  {item.badge}
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Right Scroll Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: canScrollRight ? 1 : 0.3, 
          scale: canScrollRight ? 1 : 0.8 
        }}
        whileHover={{ scale: canScrollRight ? 1.1 : 0.8 }}
        whileTap={{ scale: canScrollRight ? 0.95 : 0.8 }}
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={`absolute right-0 z-10 p-2 rounded-full shadow-lg transition-all duration-300 ${getVariantStyles()} ${
          canScrollRight 
            ? 'hover:bg-white/20 cursor-pointer' 
            : 'cursor-not-allowed opacity-30'
        }`}
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </motion.button>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default SlideNavbar