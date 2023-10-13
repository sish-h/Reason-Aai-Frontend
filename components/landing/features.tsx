'use client'

import { motion } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  LightBulbIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Deep Dive',
    description: 'Go beyond surface-level understanding to analyze, interpret, and synthesize information',
    color: 'primary',
    gradient: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: DocumentTextIcon,
    title: 'Research & Fact Check',
    description: 'Effortlessly verify information, uncover credible sources, and make decisions with confidence',
    color: 'accent',
    gradient: 'from-accent-500 to-accent-600',
    bgColor: 'bg-accent-50',
    iconColor: 'text-accent-600',
  },
  {
    icon: CheckCircleIcon,
    title: 'Reasoning',
    description: 'Think critically and solve problems step by step with AI-powered logical analysis',
    color: 'success',
    gradient: 'from-success-500 to-success-600',
    bgColor: 'bg-success-50',
    iconColor: 'text-success-600',
  },
  {
    icon: LightBulbIcon,
    title: 'Onespace',
    description: 'Be the first to step into the future of collaborative AI with advanced reasoning capabilities',
    color: 'warning',
    gradient: 'from-warning-500 to-warning-600',
    bgColor: 'bg-warning-50',
    iconColor: 'text-warning-600',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
            Discover the world while making sense of it
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Our AI-powered platform helps you navigate complex information with confidence, 
            providing deep insights and reliable analysis.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="card-hover p-8 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
                  <span>Learn more</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-200`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 lg:p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 mb-4">
                Advanced AI Reasoning
              </h3>
              <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
                Our platform combines multiple AI models to provide comprehensive analysis, 
                fact-checking, and reasoning capabilities that go beyond simple question-answering.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">99.9%</div>
                  <div className="text-sm text-secondary-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">10M+</div>
                  <div className="text-sm text-secondary-600">Sources Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success-600 mb-2">24/7</div>
                  <div className="text-sm text-secondary-600">Available</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
