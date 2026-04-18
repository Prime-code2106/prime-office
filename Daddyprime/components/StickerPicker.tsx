import React, { useState, useEffect } from 'react';
import { Search, X, Clock, Smile } from 'lucide-react';
import { STICKER_PACKS, getRecentStickers, addRecentSticker, searchStickers, Sticker, StickerPack } from '../services/stickerData';

interface StickerPickerProps {
  onStickerSelect: (sticker: Sticker) => void;
  onClose: () => void;
}

export const StickerPicker: React.FC<StickerPickerProps> = ({ onStickerSelect, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Sticker[]>([]);
  const [recentStickers, setRecentStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    setRecentStickers(getRecentStickers());
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(searchStickers(searchQuery));
      setActiveTab('search');
    } else {
      setSearchResults([]);
      if (activeTab === 'search') {
        setActiveTab('recent');
      }
    }
  }, [searchQuery]);

  const handleStickerClick = (sticker: Sticker) => {
    addRecentSticker(sticker);
    setRecentStickers(getRecentStickers());
    onStickerSelect(sticker);
    onClose();
  };

  const renderStickerGrid = (stickers: Sticker[]) => (
    <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 p-3">
      {stickers.map(sticker => (
        <button
          key={sticker.id}
          onClick={() => handleStickerClick(sticker)}
          className="aspect-square flex items-center justify-center text-2xl sm:text-3xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative group"
          title={sticker.name}
        >
          {sticker.isAnimated && sticker.url ? (
            <img 
              src={sticker.url} 
              alt={sticker.name}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded"
            />
          ) : (
            <span className="group-hover:scale-110 transition-transform">
              {sticker.emoji}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  const tabs = [
    { id: 'recent', name: 'Recent', icon: Clock, emoji: '🕒', stickers: recentStickers },
    ...STICKER_PACKS.map(pack => ({
      id: pack.id,
      name: pack.name,
      icon: null as any,
      emoji: pack.preview,
      stickers: pack.stickers
    }))
  ];

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-[#2c2c2e] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 overflow-hidden animate-fade-in-up z-50">
      
      {/* Header with Search */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stickers..."
              className="w-full pl-9 pr-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#3390ec] dark:text-white placeholder-gray-500"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200 dark:border-gray-600">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 p-3 flex items-center justify-center min-w-[50px] transition-colors ${
              activeTab === tab.id 
                ? 'bg-[#3390ec]/10 text-[#3390ec] border-b-2 border-[#3390ec]' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={tab.name}
          >
            {tab.icon ? (
              <tab.icon size={20} />
            ) : (
              <span className="text-xl">{tab.emoji}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="h-64 overflow-y-auto">
        {searchQuery.trim() ? (
          searchResults.length > 0 ? (
            renderStickerGrid(searchResults)
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Smile size={32} className="mb-2 opacity-50" />
              <p className="text-sm">No stickers found</p>
            </div>
          )
        ) : (
          (() => {
            const currentTab = tabs.find(t => t.id === activeTab);
            if (!currentTab || currentTab.stickers.length === 0) {
              return (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Clock size={32} className="mb-2 opacity-50" />
                  <p className="text-sm">
                    {activeTab === 'recent' ? 'No recent stickers' : 'No stickers in this pack'}
                  </p>
                  <p className="text-xs mt-1">
                    {activeTab === 'recent' ? 'Send some stickers to see them here' : ''}
                  </p>
                </div>
              );
            }
            return renderStickerGrid(currentTab.stickers);
          })()
        )}
      </div>

      {/* Footer Info */}
      <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 text-center border-t border-gray-200 dark:border-gray-600">
        {searchQuery.trim() ? `${searchResults.length} results` : 
         activeTab === 'recent' ? `${recentStickers.length} recent stickers` :
         `${tabs.find(t => t.id === activeTab)?.stickers.length || 0} stickers`}
      </div>
    </div>
  );
};