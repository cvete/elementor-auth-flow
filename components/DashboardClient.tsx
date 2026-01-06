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
      <AdSlot placement="dashboard_top" className="mb-8 min-h-[90px]" />

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

      {/* All Channels Section with Ads */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">{t.allChannels}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content - channels */}
          <div className="lg:col-span-3">
            {/* First half of channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-8">
              {firstHalfChannels.map(channel => (
                <ChannelCard key={channel.id} channel={channel} watchText={t.watch} continueBadge={t.continueBadge} />
              ))}
            </div>

            {/* Middle Ad - Full width between channel groups */}
            <AdSlot placement="dashboard_middle" className="mb-8 min-h-[250px]" />

            {/* Second half of channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {secondHalfChannels.map(channel => (
                <ChannelCard key={channel.id} channel={channel} watchText={t.watch} continueBadge={t.continueBadge} />
              ))}
            </div>
          </div>

          {/* Sidebar Ad - Sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <AdSlot placement="dashboard_sidebar" className="min-h-[600px]" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
