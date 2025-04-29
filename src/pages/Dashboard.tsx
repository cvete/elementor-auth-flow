
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TVChannelList from "@/components/tv/TVChannelList";
import { Card, CardContent } from "@/components/ui/card";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!data.user) {
          // User is not logged in, redirect will happen below
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
  }, [supabase]);
  
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
