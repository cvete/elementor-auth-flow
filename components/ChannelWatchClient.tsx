'use client';

import { useEffect, useRef } from 'react';
import { Channel } from '@/lib/channels';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { signOut } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import Script from 'next/script';

interface ChannelWatchClientProps {
  channel: Channel;
}

declare global {
  interface Window {
    Clappr: any;
  }
}

export default function ChannelWatchClient({ channel }: ChannelWatchClientProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const t = getTranslation(language);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const backText = language === 'mk' ? 'Назад кон канали' : language === 'de' ? 'Zurück zu Kanälen' : 'Back to Channels';
  const nowWatchingText = language === 'mk' ? 'Сега гледате' : language === 'de' ? 'Jetzt ansehen' : 'Now Watching';

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      toast({
        title: t.signedOut,
        description: t.signedOutDesc,
      });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: t.errorSigningOut,
        description: t.tryAgain,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Initialize player when Clappr is loaded
    const initPlayer = () => {
      if (window.Clappr && playerContainerRef.current && !playerRef.current) {
        playerRef.current = new window.Clappr.Player({
          source: channel.streamUrl,
          parent: playerContainerRef.current,
          width: '100%',
          height: '100%',
          autoPlay: true,
          mute: false,
          poster: channel.logo,
        });
      }
    };

    // Check if Clappr is already loaded
    if (window.Clappr) {
      initPlayer();
    } else {
      // Wait for Clappr to load
      const checkClappr = setInterval(() => {
        if (window.Clappr) {
          clearInterval(checkClappr);
          initPlayer();
        }
      }, 100);

      return () => clearInterval(checkClappr);
    }

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [channel]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"
        strategy="beforeInteractive"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
                <span className="text-xl font-semibold text-gray-900">tvstanici.net</span>
              </Link>

              {/* Admin Button */}
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 gap-2"
                onClick={handleSignOut}
              >
                <Settings className="h-4 w-4" />
                {t.admin}
              </Button>
            </div>
          </div>
        </header>

        {/* Breadcrumb / Back Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 max-w-7xl">
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              {backText}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Now Watching Badge */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{nowWatchingText}</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Video Player */}
            <div className="relative bg-black" style={{ paddingTop: '56.25%' }}>
              <div
                ref={playerContainerRef}
                className="absolute inset-0"
              />
            </div>

            {/* Channel Info */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={channel.logo}
                  alt={channel.name}
                  className="h-16 w-16 object-contain rounded-lg"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{channel.name}</h1>
                  <p className="text-sm text-purple-600 font-medium mb-4">{channel.category}</p>
                  <p className="text-gray-700 leading-relaxed">{channel.description}</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center text-sm text-gray-600">
              <p>© {new Date().getFullYear()} tvstanici.net</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
