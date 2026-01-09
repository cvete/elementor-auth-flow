import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Channel stream configurations
const channelConfigs: Record<string, { url: string; id: string; key: string }> = {
  'tv-sitel': {
    url: 'https://teve.mk/tvstanici/s1/playlist.m3u8',
    id: '5',
    key: 'EmaBojance4',
  },
  'kanal-5': {
    url: 'https://teve.mk/tvstanici/2/playlist.m3u8',
    id: '5',
    key: 'Bojance4',
  },
  'telma': {
    url: 'https://teve.mk/tvstanici/telma/playlist.m3u8',
    id: '5',
    key: 'Bojance4',
  },
  'alfa': {
    url: 'https://teve.mk/tvstanici/alfa/playlist.m3u8',
    id: '5',
    key: 'Bojance4',
  },
  'mrt1': {
    url: 'https://teve.mk/tvstanici/mrt1_360p/playlist.m3u8',
    id: '5',
    key: 'Bojance4',
  },
  // Add more channels here as needed
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ channelId: string }> }
) {
  const { channelId } = await params;

  const config = channelConfigs[channelId];

  if (!config) {
    return NextResponse.json(
      { error: 'Channel not found' },
      { status: 404 }
    );
  }

  // Generate the signed URL
  const today = new Date().toLocaleString('en-US', {
    timeZone: 'GMT',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  const validminutes = 7;
  const str2hash = config.id + config.key + today + validminutes;

  // Create MD5 hash
  const md5raw = crypto.createHash('md5').update(str2hash).digest();
  const base64hash = md5raw.toString('base64');

  const urlsignature = `server_time=${today}&hash_value=${base64hash}&validminutes=${validminutes}&id=${config.id}`;
  const base64urlsignature = Buffer.from(urlsignature).toString('base64');

  const signedurlwithvalidinterval = `${config.url}?wmsAuthSign=${base64urlsignature}`;

  return NextResponse.json({
    streamUrl: signedurlwithvalidinterval,
    expiresIn: validminutes * 60 * 1000, // in milliseconds
  });
}
