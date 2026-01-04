'use client';

import DashboardLayout from "@/components/DashboardLayout";
import ChannelCard from "@/components/ChannelCard";
import { channels } from "@/lib/channels";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

export default function DashboardClient() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full mb-6">
          <span className="text-sm font-medium">{t.heroTag}</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          <span className="text-slate-900">{t.heroTitle1}</span>
          <br />
          <span className="text-slate-900">
            {t.heroTitle2}
          </span>
        </h1>

        <p className="text-lg text-slate-600 mb-8">
          {t.heroSubtitle}
        </p>
      </div>

      {/* All Channels Section */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">{t.allChannels}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {channels.map(channel => (
            <ChannelCard key={channel.id} channel={channel} watchText={t.watch} continueBadge={t.continueBadge} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
