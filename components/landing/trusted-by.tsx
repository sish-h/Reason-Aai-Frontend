'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const institutions = [
  { name: 'Stanford University', logo: 'Stanford' },
  { name: 'Massachusetts Institute of Technology', logo: 'MIT' },
  { name: 'Harvard University', logo: 'Harvard' },
  { name: 'University of California, Berkeley', logo: 'UC Berkeley' },
  { name: 'Carnegie Mellon University', logo: 'CMU' },
  { name: 'Yale University', logo: 'Yale' },
]

export function TrustedBy() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % institutions.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">
            Trusted by researchers and analysts worldwide
          </h2>
          
          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-6 gap-8 items-center">
            {institutions.map((institution, index) => (
              <motion.div
                key={institution.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center p-4 bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-200"
              >
                <span className="text-xl font-bold text-secondary-600">
                  {institution.logo}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center p-6 bg-white rounded-xl shadow-soft"
            >
              <span className="text-2xl font-bold text-secondary-600">
                {institutions[currentIndex].logo}
              </span>
            </motion.div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-4">
              {institutions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-primary-600 w-6' 
                      : 'bg-secondary-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-sm text-secondary-600">Active Researchers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">1M+</div>
              <div className="text-sm text-secondary-600">Papers Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600 mb-2">99.9%</div>
              <div className="text-sm text-secondary-600">Satisfaction Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
