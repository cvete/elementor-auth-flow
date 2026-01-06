'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Settings, Globe, User, LogOut, ChevronDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguage, Language } from "@/lib/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const DashboardHeader = () => {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const t = getTranslation(language);

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

  return (
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
  );
};

export default DashboardHeader;
