import React, { useState, useEffect } from 'react';
import { Check, CheckCheck, Clock, AlertCircle, Wifi, WifiOff } from 'lucide-react';

interface DeliveryStatus {
  messageId: string;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: Date;
  recipients: {
    userId: string;
    userName: string;
    status: 'sent' | 'delivered' | 'read';
    timestamp: Date;
  }[];
  retryCount?: number;
  error?: string;
}

interface MessageDeliveryTrackerProps {
  messageId: string;
  isGroup: boolean;
  onRetry?: () => void;
}

export const MessageDeliveryTracker: React.FC<MessageDeliveryTrackerProps> = ({ 
  messageId, 
  isGroup, 
  onRetry 
}) => {
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Simulate fetching delivery status
    // In a real app, this would come from your backend/Supabase
    const mockStatus: DeliveryStatus = {
      messageId,
      status: isOnline ? 'delivered' : 'sending',
      timestamp: new Date(),
      recipients: isGroup ? [
        {
          userId: '1',
          userName: 'Adebayo',
          status: 'read',
          timestamp: new Date(Date.now() - 30000)
        },
        {
          userId: '2',
          userName: 'Fatima',
          status: 'delivered',
          timestamp: new Date(Date.now() - 60000)
        },
        {
          userId: '3',
          userName: 'Chidi',
          status: 'sent',
          timestamp: new Date(Date.now() - 120000)
        }
      ] : [
        {
          userId: '1',
          userName: 'Recipient',
          status: isOnline ? 'delivered' : 'sent',
          timestamp: new Date()
        }
      ]
    };
    
    setDeliveryStatus(mockStatus);
  }, [messageId, isGroup, isOnline]);

  if (!deliveryStatus) {
    return (
      <div className="flex items-center gap-1 text-gray-400">
        <Clock size={12} className="animate-spin" />
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock size={12} className="text-gray-400 animate-pulse" />;
      case 'sent':
        return <Check size={12} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={12} className="text-blue-500" />;
      case 'read':
        return <CheckCheck size={12} className="text-blue-600" />;
      case 'failed':
        return <AlertCircle size={12} className="text-red-500" />;
      default:
        return <Clock size={12} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sending':
        return 'text-gray-400';
      case 'sent':
        return 'text-gray-500';
      case 'delivered':
        return 'text-blue-500';
      case 'read':
        return 'text-blue-600';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="relative">
      {/* Main Status Indicator */}
      <div 
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => isGroup && setShowDetails(!showDetails)}
      >
        {!isOnline && (
          <WifiOff size={10} className="text-orange-500" title="Offline - will send when connected" />
        )}
        {getStatusIcon(deliveryStatus.status)}
        <span className={`text-xs ${getStatusColor(deliveryStatus.status)}`}>
          {deliveryStatus.status === 'failed' && deliveryStatus.retryCount && (
            <span className="mr-1">({deliveryStatus.retryCount})</span>
          )}
          {deliveryStatus.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        
        {deliveryStatus.status === 'failed' && onRetry && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRetry();
            }}
            className="text-xs text-blue-500 hover:text-blue-700 ml-1"
          >
            Retry
          </button>
        )}
      </div>

      {/* Detailed Status for Group Messages */}
      {isGroup && showDetails && (
        <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-3 min-w-48 z-50">
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message Status
          </div>
          <div className="space-y-1">
            {deliveryStatus.recipients.map(recipient => (
              <div key={recipient.userId} className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400 truncate mr-2">
                  {recipient.userName}
                </span>
                <div className="flex items-center gap-1">
                  {getStatusIcon(recipient.status)}
                  <span className={getStatusColor(recipient.status)}>
                    {recipient.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 text-xs text-gray-500 dark:text-gray-400">
            {deliveryStatus.recipients.filter(r => r.status === 'read').length} read, {' '}
            {deliveryStatus.recipients.filter(r => r.status === 'delivered').length} delivered, {' '}
            {deliveryStatus.recipients.filter(r => r.status === 'sent').length} sent
          </div>
        </div>
      )}

      {/* Network Status Indicator */}
      {!isOnline && (
        <div className="absolute -top-6 right-0 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs px-2 py-1 rounded-md">
          <div className="flex items-center gap-1">
            <WifiOff size={10} />
            Offline
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Message Status Component for Chat Interface
export const EnhancedMessageStatus: React.FC<{
  message: any;
  isGroup: boolean;
  currentUserId: string;
}> = ({ message, isGroup, currentUserId }) => {
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
  
  if (message.senderId !== 'me' && message.senderId !== currentUserId) {
    return null; // Don't show status for other people's messages
  }

  return (
    <div className="relative">
      <MessageDeliveryTracker
        messageId={message.id}
        isGroup={isGroup}
        onRetry={() => {
          // Implement retry logic
          console.log('Retrying message:', message.id);
        }}
      />
    </div>
  );
};

// Connection Status Banner
export const ConnectionStatusBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBanner, setShowBanner] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      // Hide banner after 3 seconds
      setTimeout(() => setShowBanner(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 text-center text-sm font-medium transition-all duration-300 ${
      isOnline 
        ? 'bg-green-500 text-white' 
        : 'bg-orange-500 text-white'
    }`}>
      <div className="flex items-center justify-center gap-2">
        {isOnline ? (
          <>
            <Wifi size={16} />
            Connected - Messages syncing
          </>
        ) : (
          <>
            <WifiOff size={16} />
            No internet connection - Messages will send when reconnected
          </>
        )}
      </div>
    </div>
  );
};