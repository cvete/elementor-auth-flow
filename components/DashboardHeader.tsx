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
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 leading-tight">tvstanici</span>
              <span className="text-xs font-medium text-slate-500 leading-tight">.net</span>
            </div>
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
