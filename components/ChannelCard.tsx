'use client';

import Link from 'next/link';
import { Channel } from '@/lib/channels';
import { Play } from 'lucide-react';

interface ChannelCardProps {
  channel: Channel;
  watchText: string;
  continueBadge: string;
  featured?: boolean;
}

const ChannelCard = ({ channel, watchText, continueBadge, featured = false }: ChannelCardProps) => {
  return (
    <div className="relative group">
      {featured && (
        <div className="absolute -top-3 -right-3 z-10">
          <span className="bg-slate-900 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
            {continueBadge}
          </span>
        </div>
      )}

      <div className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
        <div className="flex flex-col items-center">
          {/* Channel Logo */}
          <div className="w-28 h-28 mb-4 flex items-center justify-center">
            <img
              src={channel.logo}
              alt={channel.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Channel Name */}
          <h3 className="text-center text-base font-medium text-slate-900 mb-4">
            {channel.name}
          </h3>

          {/* Watch Button */}
          <Link
            href={`/channel/${channel.id}`}
            className="w-full"
          >
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200">
              <Play className="w-4 h-4" fill="white" />
              {watchText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
