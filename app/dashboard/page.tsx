import DashboardLayout from "@/components/DashboardLayout";
import TVChannelList from "@/components/TVChannelList";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userEmail = session.user.email?.split('@')[0] || session.user.name || 'there';

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, {userEmail}!</h1>
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
}
