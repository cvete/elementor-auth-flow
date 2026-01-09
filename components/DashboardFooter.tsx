'use client';

import Link from "next/link";
import { useLanguage } from "@/lib/contexts/LanguageContext";

const DashboardFooter = () => {
  const { language } = useLanguage();

  const legalLinks = [
    { href: "/legal", label: language === 'en' ? 'Legal' : language === 'fr' ? 'Mentions' : language === 'de' ? 'Impressum' : 'Правна напомена' },
    { href: "/privacy", label: language === 'en' ? 'Privacy' : language === 'fr' ? 'Confidentialité' : language === 'de' ? 'Datenschutz' : 'Приватност' },
    { href: "/cookies", label: language === 'en' ? 'Cookies' : language === 'fr' ? 'Cookies' : language === 'de' ? 'Cookies' : 'Колачиња' },
    { href: "/terms", label: language === 'en' ? 'Terms' : language === 'fr' ? 'Conditions' : language === 'de' ? 'AGB' : 'Услови' },
    { href: "/copyright", label: 'Copyright' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} tvstanici.net - All rights reserved
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="text-sm text-gray-600">
            <a
              href="mailto:contact@tvstanici.net"
              className="hover:text-purple-600 transition-colors"
            >
              contact@tvstanici.net
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
