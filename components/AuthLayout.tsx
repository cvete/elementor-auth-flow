'use client';

import { ReactNode } from "react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";
import LanguageSwitcher from "./LanguageSwitcher";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>
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
              <h1 className="text-4xl font-bold mb-6">{t.heroTitle}</h1>
              <p className="text-lg mb-4">
                {t.heroSubtitle1}
              </p>
              <p className="text-base mb-8">
                {t.heroSubtitle2}
              </p>
              <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
                <p className="text-white/90 font-medium mb-4">
                  {t.featuredChannels}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="/img/tv-logo/sitelHD.png"
                      alt="TV Sitel"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="/img/tv-logo/005-Kanal_5.png"
                      alt="Kanal 5"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="/img/tv-logo/telmaHD.png"
                      alt="Telma"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="/img/tv-logo/tv21HD.png"
                      alt="TV 21"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="/img/tv-logo/010-TV_24.png"
                      alt="TV 24"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="bg-white/90 rounded-lg p-2 flex items-center justify-center h-16">
                    <img
                      src="/img/tv-logo/mrt1HD.png"
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
