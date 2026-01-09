'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function PrivacyPage() {
  return (
    <LegalPageLayout>
      {(t) => (
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.privacy.title}</h1>

          <p className="text-gray-700 mb-6">{t.privacy.intro}</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t.privacy.dataCollected}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">{t.privacy.dataTable.headers[0]}</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">{t.privacy.dataTable.headers[1]}</th>
                </tr>
              </thead>
              <tbody>
                {t.privacy.dataTable.rows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-2">{row[0]}</td>
                    <td className="border border-gray-300 px-4 py-2">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t.privacy.legalBasis}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {t.privacy.legalBasisItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t.privacy.processors}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">{t.privacy.processorsTable.headers[0]}</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">{t.privacy.processorsTable.headers[1]}</th>
                </tr>
              </thead>
              <tbody>
                {t.privacy.processorsTable.rows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-2">{row[0]}</td>
                    <td className="border border-gray-300 px-4 py-2">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t.privacy.retention}</h2>
          <p className="text-gray-700">{t.privacy.retentionText}</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t.privacy.rights}</h2>
          <p className="text-gray-700 mb-3">{t.privacy.rightsText}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {t.privacy.rightsList.map((right, index) => (
              <li key={index}>{right}</li>
            ))}
          </ul>
          <p className="text-gray-700 mt-4">
            <strong>{t.privacy.contact}</strong>
          </p>
        </div>
      )}
    </LegalPageLayout>
  );
}
