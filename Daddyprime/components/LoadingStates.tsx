import React from 'react';
import { Loader2, MessageSquare, Users, Wifi, WifiOff } from 'lucide-react';
import { Logo } from './Logo';

// Generic loading spinner
export const LoadingSpinner: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "text-nexus-mint" 
}) => (
  <Loader2 size={size} className={`animate-spin ${className}`} />
);

// Full screen loading
export const FullScreenLoading: React.FC<{ message?: string }> = ({ 
  message = "Loading..." 
}) => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-white dark:bg-nexus-dark">
    <div className="flex flex-col items-center space-y-4">
      <Logo className="w-16 h-16 animate-pulse" />
      <LoadingSpinner size={32} />
      <p className="text-gray-500 dark:text-gray-400 text-lg">{message}</p>
    </div>
  </div>
);

// Message loading skeleton
export const MessageSkeleton: React.FC = () => (
  <div className="flex items-start space-x-3 p-4 animate-pulse">
    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

// Chat list loading skeleton
export const ChatListSkeleton: React.FC = () => (
  <div className="space-y-1 p-2">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex items-center space-x-3 p-3 animate-pulse">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
      </div>
    ))}
  </div>
);

// Connection status indicator
export const ConnectionStatus: React.FC<{ isOnline: boolean }> = ({ isOnline }) => (
  <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
    isOnline 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  }`}>
    {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
    {isOnline ? 'Connected' : 'Offline'}
  </div>
);

// Typing indicator
export const TypingIndicator: React.FC<{ users: string[] }> = ({ users }) => {
  if (users.length === 0) return null;

  const displayText = users.length === 1 
    ? `${users[0]} is typing...`
    : users.length === 2
    ? `${users[0]} and ${users[1]} are typing...`
    : `${users[0]} and ${users.length - 1} others are typing...`;

  return (
    <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span>{displayText}</span>
    </div>
  );
};

// Empty state component
export const EmptyState: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center h-64 text-center p-8">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm">{description}</p>
    {action}
  </div>
);

// Retry component for failed operations
export const RetryComponent: React.FC<{
  onRetry: () => void;
  error?: string;
  isLoading?: boolean;
}> = ({ onRetry, error, isLoading }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
      <WifiOff className="w-6 h-6 text-red-600 dark:text-red-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      Something went wrong
    </h3>
    <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
      {error || "Unable to load content. Please check your connection and try again."}
    </p>
    <button
      onClick={onRetry}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-nexus-mint hover:bg-nexus-mint-hover disabled:opacity-50 disabled:cursor-not-allowed text-nexus-midnight font-semibold rounded-lg transition-colors"
    >
      {isLoading ? <LoadingSpinner size={16} className="text-nexus-midnight" /> : null}
      Try Again
    </button>
  </div>
);