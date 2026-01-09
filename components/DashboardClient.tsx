'use client';

import DashboardLayout from "@/components/DashboardLayout";
import ChannelCard from "@/components/ChannelCard";
import { AdSlot } from "@/components/AdSlot";
import { channels } from "@/lib/channels";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

export default function DashboardClient() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  // Split channels into two groups for ad insertion
  const firstHalfChannels = channels.slice(0, Math.ceil(channels.length / 2));
  const secondHalfChannels = channels.slice(Math.ceil(channels.length / 2));

  return (
    <DashboardLayout>
      {/* Top Banner Ad */}
      <AdSlot placement="dashboard_top" className="mb-6 min-h-[90px]" />

      {/* Hero Section */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1 rounded-full mb-3">
          <span className="text-sm font-medium">{t.heroTag}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
          <span className="text-slate-900">{t.heroTitle1}</span>
          <br />
          <span className="text-slate-900">
            {t.heroTitle2}
          </span>
        </h1>

        <p className="text-base text-slate-600 mb-4">
          {t.heroSubtitle}
        </p>
      </div>

      {/* All Channels Section with Ads */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-5">{t.allChannels}</h2>

        {/* First half of channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
          {firstHalfChannels.map(channel => (
            <ChannelCard key={channel.id} channel={channel} watchText={t.watch} continueBadge={t.continueBadge} />
          ))}
        </div>

        {/* Middle Ad - Full width between channel groups */}
        <AdSlot placement="dashboard_middle" className="mb-6 min-h-[250px]" />

        {/* Second half of channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
          {secondHalfChannels.map(channel => (
            <ChannelCard key={channel.id} channel={channel} watchText={t.watch} continueBadge={t.continueBadge} />
          ))}
        </div>

        {/* Bottom Ad - Full width */}
        <AdSlot placement="dashboard_sidebar" className="min-h-[250px]" />
      </div>
    </DashboardLayout>
  );
}
