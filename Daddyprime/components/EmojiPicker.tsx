import React from 'react';
import { X } from 'lucide-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

const QUICK_EMOJIS = [
  '😀', '😂', '😍', '😘', '😊', '😉', '😎', '🤔', '😭', '😠',
  '👍', '👎', '👏', '🙏', '💪', '✌️', '👌', '🤝', '👋', '🔥',
  '❤️', '💕', '💯', '✨', '🎉', '🎊', '🌟', '⭐', '💫', '🌈',
  '🐶', '🐱', '🐵', '🦄', '🐸', '🐧', '🦋', '🌸', '🌺', '🌻',
  '🍕', '🍔', '🍟', '🍰', '🍪', '☕', '🍺', '🍷', '🥂', '🍾',
  '⚽', '🏀', '🎮', '🎵', '🎸', '📱', '💻', '🚗', '✈️', '🏠'
];

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, onClose }) => {
  return (
    <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-[#2c2c2e] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 p-3 animate-fade-in-up z-50 w-64">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Quick Emojis</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500"
        >
          <X size={14} />
        </button>
      </div>

      {/* Emoji Grid */}
      <div className="grid grid-cols-10 gap-1">
        {QUICK_EMOJIS.map((emoji, index) => (
          <button
            key={index}
            onClick={() => {
              onEmojiSelect(emoji);
              onClose();
            }}
            className="aspect-square flex items-center justify-center text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors hover:scale-110"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};