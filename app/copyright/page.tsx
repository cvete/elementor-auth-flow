'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function CopyrightPage() {
  return (
    <LegalPageLayout>
      {(t) => (
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.copyright.title}</h1>

          <p className="text-gray-700 mb-6">{t.copyright.intro}</p>

          <p className="text-gray-700 mb-2">{t.copyright.complaint}</p>
          <p className="text-purple-600 font-semibold mb-6">
            <a href="mailto:contact@tvstanici.net" className="hover:text-purple-800">
              {t.copyright.email}
            </a>
          </p>

          <p className="text-gray-700 font-semibold mb-3">{t.copyright.include}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            {t.copyright.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>

          <p className="text-gray-700 font-semibold">{t.copyright.response}</p>
        </div>
      )}
    </LegalPageLayout>
  );
}
