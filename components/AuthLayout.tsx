import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-purple-600">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')"
          }}
        >
          <div className="h-full w-full bg-gradient-to-r from-purple-600/90 to-blue-500/80 flex flex-col justify-center items-center p-12">
            <div className="text-white max-w-md">
              <h1 className="text-4xl font-bold mb-6">Welcome to tvstanici</h1>
              <p className="text-lg mb-8">
                Join our community and access exclusive content, resources, and features.
              </p>
              <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
                <p className="text-white/90 italic">
                  "This platform has transformed how I manage my content. The tools are intuitive and powerful!"
                </p>
                <div className="mt-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-white/30"></div>
                  <div className="ml-3">
                    <p className="text-white font-medium">Sarah Johnson</p>
                    <p className="text-white/70 text-sm">Content Creator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
