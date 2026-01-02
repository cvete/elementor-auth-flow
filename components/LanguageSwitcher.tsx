'use client';

import { useLanguage, Language } from '@/lib/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronDown, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languageNames: Record<Language, string> = {
  en: 'English',
  mk: 'Македонски',
  de: 'Deutsch',
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 min-w-[140px] justify-between hover:bg-gray-50 text-gray-900 hover:text-gray-900"
        >
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">{languageNames[language]}</span>
          </div>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={`cursor-pointer ${language === 'en' ? 'bg-purple-100 text-purple-700' : 'text-gray-900'}`}
        >
          <span className="text-sm">English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('mk')}
          className={`cursor-pointer ${language === 'mk' ? 'bg-purple-100 text-purple-700' : 'text-gray-900'}`}
        >
          <span className="text-sm">Македонски</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('de')}
          className={`cursor-pointer ${language === 'de' ? 'bg-purple-100 text-purple-700' : 'text-gray-900'}`}
        >
          <span className="text-sm">Deutsch</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
