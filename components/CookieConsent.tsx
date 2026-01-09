'use client';

import { useState, useEffect } from 'react';
import { legalTranslations } from '@/lib/legal-translations';

type Language = 'en' | 'fr' | 'de' | 'mk';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const saved = JSON.parse(consent);
        if (saved.preferences) {
          setPreferences(saved.preferences);
        }
      } catch {
        // Invalid JSON (e.g., old "accepted" string), show banner again
        localStorage.removeItem('cookieConsent');
        setShowBanner(true);
      }
    }

    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (['en', 'fr', 'de', 'mk'].includes(browserLang)) {
      setLanguage(browserLang as Language);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      advertising: true,
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
    setShowBanner(false);
    setShowPreferences(false);

    // Initialize tracking scripts here
    initializeTracking(allAccepted);
  };

  const handleReject = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      advertising: false,
    };
    setPreferences(onlyEssential);
    saveConsent(onlyEssential);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setShowBanner(false);
    setShowPreferences(false);

    // Initialize only allowed tracking
    initializeTracking(preferences);
  };

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      preferences: prefs,
      timestamp: new Date().toISOString(),
    }));
  };

  const initializeTracking = (prefs: typeof preferences) => {
    if (prefs.analytics) {
      // Initialize Google Analytics
      console.log('Analytics enabled');
      // Add your GA initialization code here
    }
    if (prefs.advertising) {
      // Initialize advertising pixels
      console.log('Advertising enabled');
      // Add your Meta Pixel and other ad tracking here
    }
  };

  const t = legalTranslations[language].cookieBanner;

  if (!showBanner) return null;

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md text-white p-6 shadow-2xl z-50 border-t border-purple-500">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm md:text-base">{t.message}</p>
              <a
                href="/cookies"
                className="text-purple-400 hover:text-purple-300 text-sm underline mt-2 inline-block"
              >
                Learn more
              </a>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
              >
                {t.acceptAll}
              </button>
              <button
                onClick={handleReject}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
              >
                {t.reject}
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="px-6 py-2 bg-transparent border border-white hover:bg-white/10 rounded-lg font-semibold transition-colors"
              >
                {t.manage}
              </button>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex gap-2 mt-4 justify-center md:justify-start">
            {(['en', 'fr', 'de', 'mk'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 text-xs rounded ${
                  language === lang
                    ? 'bg-purple-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                } transition-colors`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Cookie Preferences
              </h2>

              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Essential Cookies
                      </h3>
                      <p className="text-sm text-gray-600">
                        Required for the website to function. Cannot be disabled.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="w-5 h-5"
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Analytics Cookies
                      </h3>
                      <p className="text-sm text-gray-600">
                        Help us understand how visitors use our website (Google Analytics).
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          analytics: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-purple-600"
                    />
                  </div>
                </div>

                {/* Advertising Cookies */}
                <div className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Advertising Cookies
                      </h3>
                      <p className="text-sm text-gray-600">
                        Used to show personalized ads (Meta Pixel, ad partners).
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.advertising}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          advertising: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-purple-600"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
