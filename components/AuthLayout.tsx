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
              <h1 className="text-4xl font-bold mb-6">Macedonian TV Channels – Watch Live Online</h1>
              <p className="text-lg mb-4">
                Stream the most popular Macedonian TV channels in one place.
              </p>
              <p className="text-base mb-8">
                Stay connected with Macedonia through real-time news, political debates, entertainment shows, documentaries, and live broadcasts — anytime, anywhere.
              </p>
              <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
                <p className="text-white/90 font-medium mb-4">
                  Featured Channels:
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="https://tvstanici.net/wp-content/uploads/2023/11/sitel.webp"
                      alt="TV Sitel"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="https://tvstanici.net/wp-content/uploads/2023/11/Kanal-5.webp"
                      alt="Kanal 5"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="https://tvstanici.net/wp-content/uploads/2024/01/Telma.webp"
                      alt="Telma"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="https://tvstanici.net/wp-content/uploads/2023/11/Alfa.webp"
                      alt="Alfa"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="https://tvstanici.net/wp-content/uploads/2024/01/010-TV_24.png"
                      alt="24 Vesti"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="https://tvstanici.net/wp-content/uploads/2023/11/MRT1.webp"
                      alt="MRT 1"
                      className="max-h-full max-w-full object-contain"
                    />
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
