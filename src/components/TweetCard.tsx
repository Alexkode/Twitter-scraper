import React from 'react';
import { Twitter } from 'lucide-react';

interface TweetCardProps {
  username: string;
  content: string;
  timestamp: string;
}

export const TweetCard: React.FC<TweetCardProps> = ({ username, content, timestamp }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <Twitter className="w-5 h-5 text-blue-500" />
        <span className="font-semibold text-gray-800">@{username}</span>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  );
}