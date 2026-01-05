export interface Channel {
  id: string;
  name: string;
  logo: string;
  category: string;
  streamUrl: string;
  description: string;
}

export const channels: Channel[] = [
  {
    id: 'sitel',
    name: 'TV Sitel',
    logo: '/img/tv-logo/sitelHD.png',
    category: 'News & Entertainment',
    streamUrl: 'https://tvstanici.net/sitel-tv-livestream/',
    description: 'The most watched television in Macedonia. Founded in 1993, TV Sitel offers diverse programming including news, current affairs, entertainment shows, sports coverage, documentaries, and cultural programs. Broadcasting worldwide via satellite.'
  },
  {
    id: 'kanal5',
    name: 'Kanal 5',
    logo: '/img/tv-logo/005-Kanal_5.png',
    category: 'Entertainment',
    streamUrl: 'https://tvstanici.net/kanal-5-tv-livestream/',
    description: 'Popular entertainment channel with series, movies, and reality shows'
  },
  {
    id: 'telma',
    name: 'Telma',
    logo: '/img/tv-logo/telmaHD.png',
    category: 'News',
    streamUrl: 'https://tvstanici.net/telma-tv-livestream/',
    description: 'News and political debates, documentaries, and current affairs'
  },
  {
    id: 'tv21',
    name: 'TV 21',
    logo: '/img/tv-logo/tv21HD.png',
    category: 'News',
    streamUrl: 'https://tvstanici.net/tv21-tv-livestream/',
    description: 'News channel with live coverage and political analysis'
  },
  {
    id: 'tv24',
    name: 'TV 24',
    logo: '/img/tv-logo/010-TV_24.png',
    category: 'News',
    streamUrl: 'https://tvstanici.net/24-vesti-tv-livestream/',
    description: '24/7 news channel with breaking news and live reports'
  },
  {
    id: 'mrt1',
    name: 'MRT 1',
    logo: '/img/tv-logo/mrt1HD.png',
    category: 'National',
    streamUrl: 'https://tvstanici.net/mrt-1-tv-livestream/',
    description: 'National public broadcaster with diverse programming'
  },
  {
    id: 'alsat',
    name: 'Alsat-M',
    logo: '/img/tv-logo/alsatmHD.png',
    category: 'News',
    streamUrl: 'https://tvstanici.net/alsat-m-tv-livestream/',
    description: 'Albanian-language news and entertainment channel'
  },
  {
    id: 'mrt2',
    name: 'MRT 2',
    logo: '/img/tv-logo/mrt2HD.png',
    category: 'National',
    streamUrl: 'https://tvstanici.net/mrt-2-tv-livestream/',
    description: 'Second national channel with cultural and educational content'
  },
  {
    id: 'nasha',
    name: 'Nasha TV',
    logo: '/img/tv-logo/011-Nasha_TV.png',
    category: 'Entertainment',
    streamUrl: 'https://tvstanici.net/nasha-tv-livestream/',
    description: 'Entertainment and music channel'
  },
  {
    id: 'sonce',
    name: 'TV Sonce',
    logo: '/img/tv-logo/012-TV_Sonce.png',
    category: 'Entertainment',
    streamUrl: 'https://tvstanici.net/tv-sonce-livestream/',
    description: 'Family entertainment channel'
  },
  {
    id: 'mrt3',
    name: 'MRT 3',
    logo: '/img/tv-logo/013-MRT-3.png',
    category: 'National',
    streamUrl: 'https://tvstanici.net/mrt-3-tv-livestream/',
    description: 'Parliamentary channel with political coverage'
  }
];

export const channelCategories = [
  'All',
  'News',
  'Entertainment',
  'National',
  'News & Entertainment'
];
