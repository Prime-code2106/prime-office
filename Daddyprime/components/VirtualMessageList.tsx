import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from '../types';
import { MessageSkeleton, LoadingSpinner } from './LoadingStates';

interface VirtualMessageListProps {
  messages: Message[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  renderMessage: (message: Message, index: number) => React.ReactNode;
  className?: string;
}

const ITEM_HEIGHT = 80; // Estimated height per message
const BUFFER_SIZE = 5; // Number of items to render outside viewport
const LOAD_MORE_THRESHOLD = 200; // Pixels from top to trigger load more

export const VirtualMessageList: React.FC<VirtualMessageListProps> = ({
  messages,
  hasMore,
  isLoading,
  onLoadMore,
  renderMessage,
  className = ''
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingMoreRef = useRef(false);

  // Calculate visible range
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_SIZE);
  const endIndex = Math.min(
    messages.length - 1,
    Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + BUFFER_SIZE
  );

  const visibleMessages = messages.slice(startIndex, endIndex + 1);

  // Handle scroll events
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollTop(target.scrollTop);

    // Load more when scrolling near the top
    if (
      target.scrollTop < LOAD_MORE_THRESHOLD &&
      hasMore &&
      !isLoading &&
      !isLoadingMoreRef.current
    ) {
      isLoadingMoreRef.current = true;
      onLoadMore();
    }
  }, [hasMore, isLoading, onLoadMore]);

  // Reset loading flag when loading completes
  useEffect(() => {
    if (!isLoading) {
      isLoadingMoreRef.current = false;
    }
  }, [isLoading]);

  // Measure container height
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Auto-scroll to bottom for new messages (unless user scrolled up)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const prevMessageCount = useRef(messages.length);

  useEffect(() => {
    if (containerRef.current && shouldAutoScroll && messages.length > prevMessageCount.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    prevMessageCount.current = messages.length;
  }, [messages.length, shouldAutoScroll]);

  // Track if user is near bottom for auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const isNearBottom = 
        container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      setShouldAutoScroll(isNearBottom);
    }
  }, [scrollTop]);

  const totalHeight = messages.length * ITEM_HEIGHT;
  const offsetY = startIndex * ITEM_HEIGHT;

  return (
    <div
      ref={containerRef}
      className={`overflow-y-auto ${className}`}
      onScroll={handleScroll}
      style={{ height: '100%' }}
    >
      {/* Loading indicator at top */}
      {isLoading && hasMore && (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
          <span className="ml-2 text-sm text-gray-500">Loading messages...</span>
        </div>
      )}

      {/* Virtual container */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleMessages.map((message, index) => (
            <div
              key={message.id}
              style={{ height: ITEM_HEIGHT }}
              className="flex items-start"
            >
              {renderMessage(message, startIndex + index)}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll to bottom button */}
      {!shouldAutoScroll && (
        <button
          onClick={() => {
            if (containerRef.current) {
              containerRef.current.scrollTop = containerRef.current.scrollHeight;
              setShouldAutoScroll(true);
            }
          }}
          className="fixed bottom-20 right-4 bg-nexus-mint hover:bg-nexus-mint-hover text-nexus-midnight p-3 rounded-full shadow-lg transition-all z-10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 14l5-5 5 5z" />
          </svg>
        </button>
      )}
    </div>
  );
};