import { notFound, redirect } from 'next/navigation';
import { channels } from '@/lib/channels';
import { auth } from '@/lib/auth';
import ChannelWatchClient from '@/components/ChannelWatchClient';

interface ChannelPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;
  const channel = channels.find(c => c.id === id);

  if (!channel) {
    notFound();
  }

  return <ChannelWatchClient channel={channel} />;
}

export async function generateStaticParams() {
  return channels.map((channel) => ({
    id: channel.id,
  }));
}
