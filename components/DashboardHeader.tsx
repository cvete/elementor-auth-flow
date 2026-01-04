'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Settings } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

const DashboardHeader = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const t = getTranslation(language);

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
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-slate-900">tvstanici.net</span>
          </Link>

          {/* Admin Button */}
          <Button
            variant="ghost"
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 gap-2"
            onClick={handleSignOut}
          >
            <Settings className="h-4 w-4" />
            {t.admin}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
