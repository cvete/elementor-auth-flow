'use client';

import { useEffect, useRef } from 'react';
import { Channel, channels } from '@/lib/channels';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Settings, Globe, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/lib/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { signOut } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import Script from 'next/script';
import ChannelCard from '@/components/ChannelCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

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
  const { language, setLanguage } = useLanguage();
  const t = getTranslation(language);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const backText = language === 'mk' ? 'Назад кон канали' : language === 'de' ? 'Zurück zu Kanälen' : 'Back to Channels';

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

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

  // Get other channels (exclude current channel)
  const otherChannels = channels.filter(c => c.id !== channel.id);
  const otherChannelsText = language === 'mk' ? 'Други канали' : language === 'de' ? 'Andere Kanäle' : 'Other Channels';

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"
        strategy="beforeInteractive"
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-5 max-w-7xl">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                    {/* TV Body */}
                    <rect x="10" y="20" width="80" height="60" rx="12" fill="#000" stroke="#000" strokeWidth="2"/>
                    <rect x="15" y="25" width="70" height="50" rx="8" fill="#fff"/>

                    {/* Play Button */}
                    <path d="M45 40 L45 60 L62 50 Z" fill="#000"/>

                    {/* TV Stand */}
                    <rect x="35" y="80" width="30" height="3" rx="1.5" fill="#000"/>
                    <rect x="47" y="75" width="6" height="8" rx="2" fill="#000"/>

                    {/* Antennas */}
                    <line x1="30" y1="20" x2="20" y2="5" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
                    <line x1="70" y1="20" x2="80" y2="5" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="20" cy="5" r="3" fill="#000"/>
                    <circle cx="80" cy="5" r="3" fill="#000"/>
                  </svg>
                </div>
                <span className="text-lg font-bold text-slate-900">tvstanici.net</span>
              </Link>

              {/* Right side buttons */}
              <div className="flex items-center gap-2">
                {/* Language Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="font-medium">{language.toUpperCase()}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleLanguageChange('en')}
                      className={language === 'en' ? 'bg-slate-100' : ''}
                    >
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleLanguageChange('mk')}
                      className={language === 'mk' ? 'bg-slate-100' : ''}
                    >
                      Македонски
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleLanguageChange('de')}
                      className={language === 'de' ? 'bg-slate-100' : ''}
                    >
                      Deutsch
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Account Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      {t.signOut}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 -ml-3 px-3 py-2 h-auto font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              {backText}
            </Button>
          </div>

          {/* Top Ad Placeholder */}
          <div className="mb-6 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center h-24">
            <span className="text-slate-400 text-sm font-medium">Advertisement</span>
          </div>

          {/* Video Player Section with Right Ad */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Video Player - Takes 3 columns on large screens */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Video Player */}
                <div className="relative bg-black" style={{ paddingTop: '56.25%' }}>
                  <div
                    ref={playerContainerRef}
                    className="absolute inset-0"
                  />
                </div>

                {/* Channel Info */}
                <div className="p-6 border-t border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
                      <img
                        src={channel.logo}
                        alt={channel.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-semibold text-slate-900 mb-1">{channel.name}</h1>
                      <p className="text-sm text-slate-500 font-medium mb-3">{channel.category}</p>
                      <p className="text-slate-600 leading-relaxed">{channel.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Ad Placeholder - Takes 1 column on large screens */}
            <div className="lg:col-span-1">
              <div className="bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center sticky top-6" style={{ minHeight: '400px' }}>
                <span className="text-slate-400 text-sm font-medium">Advertisement</span>
              </div>
            </div>
          </div>

          {/* Other Channels Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">{otherChannelsText}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {otherChannels.map(ch => (
                <ChannelCard
                  key={ch.id}
                  channel={ch}
                  watchText={t.watch}
                  continueBadge={t.continueBadge}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
