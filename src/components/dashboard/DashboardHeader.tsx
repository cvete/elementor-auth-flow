
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tv } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      
      // Manually navigate to login page after successful sign out
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Tv className="h-8 w-8" />
            <Link to="/dashboard" className="text-2xl font-bold">
              tvstanici
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="hover:text-blue-200">Home</Link>
            <Link to="/channels" className="hover:text-blue-200">Channels</Link>
            <Link to="/favorites" className="hover:text-blue-200">Favorites</Link>
            <Link to="/guide" className="hover:text-blue-200">TV Guide</Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-blue-700"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
