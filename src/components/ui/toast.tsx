'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
  variant?: 'default' | 'destructive' | 'success';
  onClose?: () => void;
}

const Toast = ({
  id,
  title,
  description,
  action,
  duration = 5000,
  variant = 'default',
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300); // Allow time for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variantClasses = {
    default: 'bg-white border border-gray-200 text-gray-900',
    destructive: 'bg-red-50 border-red-200 text-red-900',
    success: 'bg-green-50 border-green-200 text-green-900',
  };

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 max-w-md rounded-lg shadow-lg p-4 transform transition-all duration-300',
        variantClasses[variant],
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          {title && <div className="font-semibold">{title}</div>}
          {description && <div className="text-sm mt-1">{description}</div>}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export { Toast, type ToastProps };
