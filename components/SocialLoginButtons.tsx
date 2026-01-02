'use client';

import { Button } from "@/components/ui/button";
import { Mail, Facebook } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

const SocialLoginButtons = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
    try {
      await signIn(provider, {
        callbackUrl: "/dashboard"
      });
    } catch (error: any) {
      toast({
        title: t.error,
        description: t.tryAgain,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSocialLogin('google')}
      >
        <Mail className="mr-2 h-4 w-4" />
        {t.continueWithGoogle}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSocialLogin('facebook')}
      >
        <Facebook className="mr-2 h-4 w-4" />
        {t.continueWithFacebook}
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t.orContinueWith}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
