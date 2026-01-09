'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function TermsPage() {
  return (
    <LegalPageLayout>
      {(t) => (
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.terms.title}</h1>

          <div className="space-y-4 text-gray-700">
            <p>{t.terms.ageRequirement}</p>
            <p>{t.terms.streams}</p>
            <p>{t.terms.responsibility}</p>
            <p>{t.terms.abuse}</p>
            <p className="font-semibold">{t.terms.jurisdiction}</p>
          </div>
        </div>
      )}
    </LegalPageLayout>
  );
}
