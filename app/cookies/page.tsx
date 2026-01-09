'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function CookiesPage() {
  return (
    <LegalPageLayout>
      {(t) => (
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.cookies.title}</h1>

          <p className="text-gray-700 mb-4">{t.cookies.intro}</p>

          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            {t.cookies.purposes.map((purpose, index) => (
              <li key={index}>{purpose}</li>
            ))}
          </ul>

          <p className="text-gray-700 font-semibold">{t.cookies.nonEssential}</p>
        </div>
      )}
    </LegalPageLayout>
  );
}
