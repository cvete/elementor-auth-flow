
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-md">
        <div className="mb-6">
          <div className="h-20 w-20 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mx-auto flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Authentication Successful</h1>
        <p className="text-lg text-gray-600 mb-8">
          You've successfully logged into your account. This is your dashboard.
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="font-medium text-gray-800">Next Steps</h3>
            <p className="text-gray-600 text-sm">Start exploring the platform features or customize your profile.</p>
          </div>
          <div className="flex space-x-3 justify-center">
            <Button asChild variant="outline">
              <Link to="/login">Back to Login</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
              <Link to="#">Explore Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
