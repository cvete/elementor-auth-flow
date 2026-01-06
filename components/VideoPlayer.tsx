'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  channelId: string;
  autoPlay?: boolean;
  height?: string;
  width?: string;
}

declare global {
  interface Window {
    Clappr: any;
    LevelSelector: any;
  }
}

export default function VideoPlayer({
  channelId,
  autoPlay = true,
  height = '400px',
  width = '100%',
}: VideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [streamUrl, setStreamUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch signed stream URL
  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`/api/stream/${channelId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch stream URL');
        }

        const data = await response.json();
        console.log('Stream URL received:', data.streamUrl);
        setStreamUrl(data.streamUrl);

        // Refresh the URL before it expires
        const refreshTimeout = setTimeout(() => {
          fetchStreamUrl();
        }, data.expiresIn - 30000); // Refresh 30 seconds before expiry

        return () => clearTimeout(refreshTimeout);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stream');
        setLoading(false);
      }
    };

    fetchStreamUrl();
  }, [channelId]);

  // Initialize Clappr player
  useEffect(() => {
    if (!streamUrl || !containerRef.current) return;

    // Wait for Clappr to be loaded
    const initPlayer = () => {
      if (typeof window !== 'undefined' && window.Clappr && containerRef.current) {
        // Destroy existing player if any
        if (playerRef.current) {
          playerRef.current.destroy();
        }

        // Create new player
        console.log('Initializing Clappr player with URL:', streamUrl);
        playerRef.current = new window.Clappr.Player({
          source: streamUrl,
          mimeType: 'application/x-mpegURL',
          autoPlay: autoPlay,
          height: '100%',
          width: '100%',
          parentId: `#${containerRef.current.id}`,
        });

        setLoading(false);
      } else {
        // Retry if Clappr is not loaded yet
        setTimeout(initPlayer, 100);
      }
    };

    initPlayer();

    // Cleanup on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [streamUrl, autoPlay, height, width]);

  if (error) {
    return (
      <div className="flex items-center justify-center bg-gray-900 text-white rounded-lg" style={{ height, width }}>
        <div className="text-center p-4">
          <p className="text-red-400 mb-2">Error loading stream</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-sm text-gray-400">Loading stream...</p>
          </div>
        </div>
      )}
      <div
        id={`player-${channelId}`}
        ref={containerRef}
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
}
