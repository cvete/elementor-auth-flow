'use client';

import { useState } from 'react';
import { legalTranslations } from '@/lib/legal-translations';
import Link from 'next/link';
import { ArrowLeft, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Language = 'en' | 'fr' | 'de' | 'mk';

interface LegalPageLayoutProps {
  children: (t: typeof legalTranslations.en, lang: Language) => React.ReactNode;
}

const languageNames = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  mk: 'Македонски',
};

export default function LegalPageLayout({ children }: LegalPageLayoutProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = legalTranslations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header matching dashboard style */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-5 max-w-7xl">
          <div className="flex justify-between items-center">
            {/* Logo and Back */}
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                    <rect x="10" y="20" width="80" height="60" rx="12" fill="#000" stroke="#000" strokeWidth="2"/>
                    <rect x="15" y="25" width="70" height="50" rx="8" fill="#fff"/>
                    <path d="M45 40 L45 60 L62 50 Z" fill="#000"/>
                    <rect x="35" y="80" width="30" height="3" rx="1.5" fill="#000"/>
                    <rect x="47" y="75" width="6" height="8" rx="2" fill="#000"/>
                    <line x1="30" y1="20" x2="20" y2="5" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
                    <line x1="70" y1="20" x2="80" y2="5" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="20" cy="5" r="3" fill="#000"/>
                    <circle cx="80" cy="5" r="3" fill="#000"/>
                  </svg>
                </div>
                <span className="text-lg font-bold text-slate-900">tvstanici.net</span>
              </Link>
            </div>

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 gap-2"
                >
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">{language.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-slate-100' : ''}
                >
                  {languageNames.en}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('mk')}
                  className={language === 'mk' ? 'bg-slate-100' : ''}
                >
                  {languageNames.mk}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('de')}
                  className={language === 'de' ? 'bg-slate-100' : ''}
                >
                  {languageNames.de}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('fr')}
                  className={language === 'fr' ? 'bg-slate-100' : ''}
                >
                  {languageNames.fr}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          {children(t, language)}
        </div>

        {/* Legal Links Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/legal"
              className="text-slate-600 hover:text-purple-600 font-medium transition-colors"
            >
              Legal
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/privacy"
              className="text-slate-600 hover:text-purple-600 font-medium transition-colors"
            >
              Privacy
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/cookies"
              className="text-slate-600 hover:text-purple-600 font-medium transition-colors"
            >
              Cookies
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/terms"
              className="text-slate-600 hover:text-purple-600 font-medium transition-colors"
            >
              Terms
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/copyright"
              className="text-slate-600 hover:text-purple-600 font-medium transition-colors"
            >
              Copyright
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
