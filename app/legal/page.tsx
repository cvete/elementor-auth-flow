'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function LegalPage() {
  return (
    <LegalPageLayout>
      {(t) => (
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.legal.title}</h1>

          <div className="space-y-4 text-gray-700">
            <p>{t.legal.owner}</p>
            <p>
              <strong>{t.legal.website}</strong> <a href="https://tvstanici.net" className="text-purple-600 hover:text-purple-800">https://tvstanici.net</a>
            </p>
            <p>
              <strong>{t.legal.email}</strong> <a href="mailto:contact@tvstanici.net" className="text-purple-600 hover:text-purple-800">contact@tvstanici.net</a>
            </p>

            <div className="mt-6">
              <p className="font-semibold">{t.legal.hosting}</p>
              <p>{t.legal.hostingAddress}</p>
              <p>{t.legal.dataLocation}</p>
            </div>
          </div>
        </div>
      )}
    </LegalPageLayout>
  );
}
