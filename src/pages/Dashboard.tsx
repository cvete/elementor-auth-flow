
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TVChannelList from "@/components/tv/TVChannelList";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (!data.session) {
          navigate("/login");
        } else {
          setUser(data.session.user);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
  }, [navigate]);
  
  // Redirect if user is not logged in
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!</h1>
              <p className="text-blue-100">Browse your favorite TV channels and shows</p>
            </div>
            <div className="mt-4 md:mt-0">
              <input
                type="search"
                placeholder="Search channels or shows..."
                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-blue-200 w-full md:w-60"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* TV Channel Lists */}
      <TVChannelList />
    </DashboardLayout>
  );
};

export default Dashboard;
