import { ReactNode } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 to-blue-700">
      <DashboardHeader />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
