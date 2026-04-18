import React, { useState, useEffect, useRef } from 'react';
import { Chat, Message, Attachment } from '../types';
import { 
  Send, ArrowLeft, MoreVertical, Paperclip, CheckCheck, 
  Phone, Video, Smile, Share, Search, Clock, CalendarClock, 
  X, Reply, Image as ImageIcon, MapPin, FileText, User, 
  Trash2, Edit2, CornerUpRight, Sparkles, Sticker
} from 'lucide-react';
import { summarizeChat } from '../services/geminiService';
import { 
  sendTypingEvent, subscribeToTypingEvents, getCurrentUser, 
  toggleReaction, editMessage, deleteMessage, playSendSound
} from '../services/supabaseClient';
import { validateMessage } from '../utils/validation';
import { LoadingSpinner } from './LoadingStates';
import { ChatInfoSidebar } from './ChatInfoSidebar';
import { ForwardModal } from './ForwardModal';
import { StickerPicker } from './StickerPicker';
import { EmojiPicker } from './EmojiPicker';
import { VirtualMessageList } from './VirtualMessageList';
import { usePagination } from '../hooks/usePagination';
import { performanceMonitor } from '../utils/performance';
import { EnhancedMessageStatus, ConnectionStatusBanner } from './MessageDeliveryTracker';
import { Sticker as StickerType } from '../services/stickerData';

interface ChatInterfaceProps {
  chat: Chat;
  onBack: () => void;
  onSendMessage: (text: string, scheduledDate?: Date, replyTo?: any, media?: Attachment) => void;
  onCallStart: (isVideo: boolean) => void;
}

const REACTION_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ chat, onBack, onSendMessage, onCallStart }) => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [currentUserId, setCurrentUserId] = useState<string>('');
  
  // Performance monitoring
  const renderMeasure = performanceMonitor.measureRender('ChatInterface');
  
  // Pagination for messages
  const {
    items: paginatedMessages,
    hasMore,
    loadMore,
    isLoading: isLoadingMore,
    reset: resetPagination
  } = usePagination(chat.messages, 50);
  
  // UI States
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);
  const [forwardingMessage, setForwardingMessage] = useState<string | null>(null);
  const [activeReactionMessageId, setActiveReactionMessageId] = useState<string | null>(null);
  const [activeContextMenuId, setActiveContextMenuId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scheduledTime, setScheduledTime] = useState<string>('');
  const [showScheduleInput, setShowScheduleInput] = useState(false);
  
  // Action States
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [editingMessageState, setEditingMessageState] = useState<Message | null>(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Attachment | null>(null);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Performance monitoring for component lifecycle
  useEffect(() => {
    renderMeasure.start();
    return () => renderMeasure.end();
  });

  useEffect(() => {
    getCurrentUser().then(u => u && setCurrentUserId(u.id));
  }, []);

  useEffect(() => {
    // Reset pagination when chat changes
    resetPagination();
    
    scrollToBottom();
    // Reset transient states when chat changes
    setSummary(null);
    setIsSummarizing(false);
    setShowInfoSidebar(false);
    setIsSearching(false);
    setSearchQuery('');
    setTypingUsers(new Set()); 
    setReplyingTo(null);
    setEditingMessageState(null);
    setSelectedMedia(null);
    setShowAttachMenu(false);
    setShowStickerPicker(false);
    setShowEmojiPicker(false);
    
    const unsubscribe = subscribeToTypingEvents(chat.id, (userId, isTyping) => {
      if (userId === currentUserId) return;

      setTypingUsers(prev => {
        const next = new Set(prev);
        if (isTyping) {
          next.add(userId);
        } else {
          next.delete(userId);
        }
        return next;
      });
      setTimeout(scrollToBottom, 100);
    });

    return () => {
      unsubscribe();
    };
  }, [chat.id, currentUserId]);

  useEffect(() => {
    if (!isSearching) scrollToBottom();
  }, [chat.messages, isSearching]);

  // Handle Editing State
  useEffect(() => {
    if (editingMessageState) {
      setInputText(editingMessageState.text);
      inputRef.current?.focus();
    } else {
      // Only clear if we were editing
      if (inputText && chat.messages.find(m => m.text === inputText && m.id === editingMessageState?.id)) {
        setInputText('');
      }
    }
  }, [editingMessageState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);

    if (currentUserId) {
      sendTypingEvent(chat.id, currentUserId, true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        sendTypingEvent(chat.id, currentUserId, false);
      }, 2000);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedMedia({
          type: file.type.startsWith('image') ? 'image' : 'file',
          url: ev.target?.result as string,
          name: file.name,
          size: file.size
        });
        setShowAttachMenu(false);
        inputRef.current?.focus();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStickerSelect = (sticker: StickerType) => {
    const stickerAttachment: Attachment = {
      type: 'sticker',
      url: sticker.url || sticker.emoji,
      name: sticker.name,
      stickerPack: sticker.id,
      isAnimated: sticker.isAnimated
    };

    onSendMessage('', undefined, replyingTo ? {
      id: replyingTo.id,
      text: replyingTo.text,
      senderName: replyingTo.senderId === 'me' ? 'You' : chat.name,
      previewMedia: replyingTo.media?.type === 'image' ? replyingTo.media.url : undefined
    } : undefined, stickerAttachment);

    playSendSound();
    setReplyingTo(null);
    setShowStickerPicker(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputText(prev => prev + emoji);
    inputRef.current?.focus();
  };

  const handleSend = async () => {
    if ((!inputText.trim() && !selectedMedia) || isSending) return;
    
    // Performance monitoring for message send
    const sendTimer = performanceMonitor.time('message_send', async () => {
      // Validate message content
      if (inputText.trim()) {
        const validation = validateMessage(inputText);
        if (!validation.isValid) {
          setSendError(validation.error || 'Invalid message');
          return;
        }
      }

      setIsSending(true);
      setSendError(null);
      
      if (currentUserId) {
        sendTypingEvent(chat.id, currentUserId, false);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      }

      try {
        // IF EDITING
        if (editingMessageState) {
          const validation = validateMessage(inputText);
          if (!validation.isValid) {
            setSendError(validation.error || 'Invalid message');
            return;
          }
          
          await editMessage(editingMessageState.id, validation.sanitized || inputText);
          setEditingMessageState(null);
          setInputText('');
          return;
        }
        
        // IF SENDING NEW
        let scheduledDate: Date | undefined;
        if (scheduledTime) {
          scheduledDate = new Date(scheduledTime);
        }

        const replyContext = replyingTo ? {
          id: replyingTo.id,
          text: replyingTo.text,
          senderName: replyingTo.senderId === 'me' ? 'You' : chat.name, 
          previewMedia: replyingTo.media?.type === 'image' ? replyingTo.media.url : undefined
        } : undefined;

        const messageText = inputText.trim() ? (validateMessage(inputText).sanitized || inputText) : '';
        
        await onSendMessage(messageText, scheduledDate, replyContext, selectedMedia || undefined);
        
        // Play send sound
        playSendSound();
        
        setInputText('');
        setScheduledTime('');
        setShowScheduleInput(false);
        setReplyingTo(null);
        setSelectedMedia(null);
      } catch (error) {
        console.error('Failed to send message:', error);
        setSendError('Failed to send message. Please try again.');
      } finally {
        setIsSending(false);
      }
    });
    
    await sendTimer;
  };

  const handleDelete = async (msgId: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteMessage(msgId);
      setActiveContextMenuId(null);
    }
  };

  const onReactionClick = async (msgId: string, emoji: string) => {
    await toggleReaction(chat.id, msgId, currentUserId, emoji);
    setActiveReactionMessageId(null);
  };

  const handleSummarize = async () => {
    if (chat.messages.length === 0) return;
    setIsSummarizing(true);
    const text = await summarizeChat(chat.messages);
    setSummary(text);
    setIsSummarizing(false);
  };

  const isSomeoneTyping = typingUsers.size > 0;

  const filteredMessages = chat.messages.filter(m => {
    if (!searchQuery) return true;
    const dateStr = new Date(m.timestamp).toLocaleDateString();
    return m.text.toLowerCase().includes(searchQuery.toLowerCase()) || dateStr.includes(searchQuery);
  });

  return (
    <div className="flex flex-row h-full w-full overflow-hidden relative bg-[#87aadd] dark:bg-[#0f0f0f]">
      {/* Connection Status Banner */}
      <ConnectionStatusBanner />
      
      <div className="flex-1 flex flex-col h-full relative min-w-0">
        
        {/* TELEGRAM WALLPAPER PATTERN (CSS) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-[#1c1c1d] border-b border-gray-200 dark:border-black shadow-sm sticky top-0 z-20">
          {isSearching ? (
             <div className="flex-1 flex items-center gap-2 animate-fade-in-down">
               <button onClick={() => { setIsSearching(false); setSearchQuery(''); }} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-[#2c2c2e] rounded-full text-gray-500">
                 <ArrowLeft size={20} />
               </button>
               <div className="flex-1 relative">
                 <input 
                   autoFocus
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search messages..."
                   className="w-full bg-gray-100 dark:bg-[#2c2c2e] rounded-full py-2 pl-4 pr-10 text-[15px] outline-none dark:text-white placeholder-gray-500"
                 />
                 {searchQuery && (
                   <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-gray-400">
                     <X size={16} />
                   </button>
                 )}
               </div>
             </div>
          ) : (
            <>
              <div className="flex items-center gap-4 cursor-pointer" onClick={() => setShowInfoSidebar(!showInfoSidebar)}>
                <button onClick={onBack} className="md:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2c2c2e] p-2 rounded-full -ml-2">
                  <ArrowLeft size={22} />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${chat.isGroup ? 'bg-gradient-to-br from-orange-400 to-pink-500' : 'bg-gradient-to-br from-blue-400 to-cyan-500'}`}>
                    {chat.name ? chat.name[0].toUpperCase() : '?'}
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-black dark:text-white leading-tight">{chat.name || 'Unknown Chat'}</h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">
                      {isSomeoneTyping ? <span className="text-[#3390ec]">typing...</span> : 
                       chat.isGroup ? `${chat.participants?.length || 0} members` : 
                       chat.participants.length > 0 ? (
                         chat.participants[0]?.status === 'online' ? 'online' :
                         chat.participants[0]?.status === 'away' ? 'away' :
                         chat.participants[0]?.status === 'busy' ? 'busy' : 'last seen recently'
                       ) : 'last seen recently'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <button onClick={handleSummarize} disabled={isSummarizing} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#2c2c2e] rounded-full transition-colors text-[#3390ec]" title="Summarize Chat">
                  {isSummarizing ? <div className="w-5 h-5 border-2 border-[#3390ec] border-t-transparent rounded-full animate-spin" /> : <Sparkles size={22} />}
                </button>
                <button onClick={() => setIsSearching(true)} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#2c2c2e] rounded-full transition-colors">
                  <Search size={22} />
                </button>
                <button onClick={() => onCallStart(false)} className="hidden sm:block p-2.5 hover:bg-gray-100 dark:hover:bg-[#2c2c2e] rounded-full transition-colors">
                    <Phone size={22} />
                </button>
                <button onClick={() => onCallStart(true)} className="hidden sm:block p-2.5 hover:bg-gray-100 dark:hover:bg-[#2c2c2e] rounded-full transition-colors">
                    <Video size={22} />
                </button>
                <button 
                  onClick={() => setShowInfoSidebar(!showInfoSidebar)}
                  className={`p-2.5 rounded-full transition-colors ${showInfoSidebar ? 'bg-gray-100 dark:bg-[#2c2c2e]' : 'hover:bg-gray-100 dark:hover:bg-[#2c2c2e]'}`}
                >
                  <MoreVertical size={22} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* SUMMARY BANNER */}
        {summary && (
          <div className="bg-blue-50 dark:bg-[#2b5278]/20 border-b border-blue-100 dark:border-[#2b5278]/50 p-3 flex items-start gap-3 relative z-10">
            <Sparkles className="text-[#3390ec] shrink-0 mt-0.5" size={18} />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-[#3390ec] mb-1">AI Summary</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{summary}</p>
            </div>
            <button onClick={() => setSummary(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <X size={16} />
            </button>
          </div>
        )}

        {/* MESSAGES AREA */}
        <div 
          className="flex-1 overflow-hidden relative z-0"
          onClick={() => {
            setActiveReactionMessageId(null);
            setActiveContextMenuId(null);
            setShowAttachMenu(false);
            setShowStickerPicker(false);
            setShowEmojiPicker(false);
          }}
        >
          <VirtualMessageList
            messages={filteredMessages}
            currentUserId={currentUserId}
            chat={chat}
            onReactionClick={onReactionClick}
            onReplyClick={setReplyingTo}
            onEditClick={setEditingMessageState}
            onDeleteClick={handleDelete}
            onForwardClick={setForwardingMessage}
            activeReactionMessageId={activeReactionMessageId}
            setActiveReactionMessageId={setActiveReactionMessageId}
            activeContextMenuId={activeContextMenuId}
            setActiveContextMenuId={setActiveContextMenuId}
            hasMore={hasMore}
            onLoadMore={loadMore}
            isLoadingMore={isLoadingMore}
          />
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div className="p-2 bg-white dark:bg-[#1c1c1d] border-t border-gray-200 dark:border-black relative z-30">
          
          {/* Error Message */}
          {sendError && (
            <div className="px-4 py-2 mb-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-between">
              <span className="text-red-600 dark:text-red-400 text-sm">{sendError}</span>
              <button 
                onClick={() => setSendError(null)}
                className="text-red-400 hover:text-red-600 dark:hover:text-red-300"
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          {/* Reply/Edit Context */}
          {(replyingTo || editingMessageState) && (
             <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-black mb-1">
               <div className="flex items-center gap-3 overflow-hidden">
                 <Reply size={20} className="text-[#3390ec]" />
                 <div className="flex-1 min-w-0">
                   <div className="text-[#3390ec] font-bold text-sm truncate">
                     {editingMessageState ? 'Edit Message' : `Reply to ${replyingTo?.senderId === 'me' ? 'You' : (chat.name || 'Unknown')}`}
                   </div>
                   <div className="text-gray-500 text-sm truncate">
                     {editingMessageState ? editingMessageState.text : replyingTo?.text}
                   </div>
                 </div>
               </div>
               <button onClick={() => { setReplyingTo(null); setEditingMessageState(null); setInputText(''); }} className="p-2 hover:bg-gray-100 dark:hover:bg-[#2c2c2e] rounded-full">
                 <X size={20} className="text-gray-500" />
               </button>
             </div>
          )}

          <div className="flex items-end gap-2 max-w-4xl mx-auto px-2 relative">
            <button 
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="p-3 text-gray-500 hover:text-[#3390ec] hover:bg-gray-100 dark:hover:bg-[#2c2c2e] rounded-full transition-colors"
            >
              <Paperclip size={24} />
            </button>
            
            <div className="flex-1 bg-transparent flex items-center py-2">
               <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message"
                className="w-full bg-transparent border-none outline-none text-[16px] text-black dark:text-white placeholder-gray-500"
               />
            </div>
            
            <button 
              onClick={() => setShowStickerPicker(!showStickerPicker)}
              className={`p-3 text-gray-500 hover:text-[#3390ec] hover:bg-gray-100 dark:hover:bg-[#2c2c2e] rounded-full transition-colors ${
                showStickerPicker ? 'text-[#3390ec] bg-gray-100 dark:bg-[#2c2c2e]' : ''
              }`}
            >
              <Sticker size={24} />
            </button>

            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`p-3 text-gray-500 hover:text-[#3390ec] hover:bg-gray-100 dark:hover:bg-[#2c2c2e] rounded-full transition-colors relative ${
                showEmojiPicker ? 'text-[#3390ec] bg-gray-100 dark:bg-[#2c2c2e]' : ''
              }`}
            >
              <Smile size={24} />
              
              {/* Emoji Picker */}
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiSelect={handleEmojiSelect}
                  onClose={() => setShowEmojiPicker(false)}
                />
              )}
            </button>

            {inputText.trim() ? (
              <button 
                onClick={handleSend}
                disabled={isSending}
                className="p-3 text-[#3390ec] hover:bg-blue-50 dark:hover:bg-[#2c2c2e] rounded-full transition-colors animate-fade-in-up disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? <LoadingSpinner size={24} /> : <Send size={24} />}
              </button>
            ) : (
              <button className="p-3 text-gray-500 hover:text-[#3390ec] hover:bg-gray-100 dark:hover:bg-[#2c2c2e] rounded-full transition-colors">
                <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center">
                   <div className="w-0.5 h-3 bg-current rounded-full"></div>
                </div>
              </button>
            )}

            {/* Sticker Picker */}
            {showStickerPicker && (
              <StickerPicker
                onStickerSelect={handleStickerSelect}
                onClose={() => setShowStickerPicker(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR (SLIDEOUT) */}
      {showInfoSidebar && (
        <ChatInfoSidebar 
          chat={chat} 
          onClose={() => setShowInfoSidebar(false)} 
          onLeave={() => {
            setShowInfoSidebar(false);
            onBack();
          }}
        />
      )}

      {/* FORWARD MODAL */}
      {forwardingMessage && (
        <ForwardModal 
          messageText={forwardingMessage} 
          onClose={() => setForwardingMessage(null)}
          onForwardSuccess={() => {
             setForwardingMessage(null);
          }}
        />
      )}
    </div>
  );
};