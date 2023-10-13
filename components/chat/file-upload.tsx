'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon, 
  DocumentTextIcon, 
  DocumentIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

interface FileUploadProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (files: File[]) => void
}

interface FileWithPreview extends File {
  id: string
  preview?: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export function FileUpload({ isOpen, onClose, onUpload }: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: FileWithPreview[] = acceptedFiles.map(file => ({
      ...file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending' as const,
    }))
    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  })

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    
    // Simulate upload process
    for (const file of files) {
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'uploading' } : f
      ))
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'success' } : f
      ))
    }

    // Call onUpload with successful files
    const successfulFiles = files.filter(f => f.status === 'success')
    onUpload(successfulFiles)
    
    setIsUploading(false)
    setFiles([])
    onClose()
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <PhotoIcon className="w-5 h-5 text-accent-600" />
    }
    if (file.type === 'application/pdf') {
      return <DocumentTextIcon className="w-5 h-5 text-error-600" />
    }
    if (file.type.includes('word') || file.type.includes('document')) {
      return <DocumentIcon className="w-5 h-5 text-primary-600" />
    }
    return <DocumentTextIcon className="w-5 h-5 text-secondary-600" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-200">
            <h2 className="text-xl font-semibold text-secondary-900">Upload Files</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <XMarkIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Drop Zone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragActive
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-secondary-300 hover:border-primary-400 hover:bg-secondary-50'
              }`}
            >
              <input {...getInputProps()} />
              <ArrowUpTrayIcon className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">
                {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
              </h3>
              <p className="text-secondary-600 mb-4">
                or click to select files
              </p>
              <div className="text-sm text-secondary-500">
                <p>Supported formats: PDF, DOCX, TXT, Images</p>
                <p>Max file size: 10MB</p>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-secondary-900 mb-3">
                  Selected Files ({files.length})
                </h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {files.map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg"
                    >
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-secondary-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.status === 'pending' && (
                          <div className="w-4 h-4 border-2 border-secondary-300 border-t-primary-600 rounded-full animate-spin" />
                        )}
                        {file.status === 'uploading' && (
                          <div className="w-4 h-4 border-2 border-secondary-300 border-t-primary-600 rounded-full animate-spin" />
                        )}
                        {file.status === 'success' && (
                          <CheckCircleIcon className="w-4 h-4 text-success-600" />
                        )}
                        {file.status === 'error' && (
                          <ExclamationTriangleIcon className="w-4 h-4 text-error-600" />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="text-secondary-500 hover:text-error-600"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-secondary-200 bg-secondary-50">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
              className="bg-primary-600 hover:bg-primary-700"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                `Upload ${files.length} file${files.length !== 1 ? 's' : ''}`
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
