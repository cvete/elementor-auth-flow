
import { Button } from "@/components/ui/button";
import { Mail, Facebook, Github } from "lucide-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "@/components/ui/use-toast";

const SocialLoginButtons = () => {
  const supabase = useSupabaseClient();

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/home`
        }
      });

      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
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
        Continue with Google
      </Button>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSocialLogin('facebook')}
      >
        <Facebook className="mr-2 h-4 w-4" />
        Continue with Facebook
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
