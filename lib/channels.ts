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
    logo: 'https://tvstanici.net/wp-content/uploads/2023/11/sitel.webp',
    category: 'News & Entertainment',
    streamUrl: 'https://tvstanici.net/sitel-tv-livestream/',
    description: 'The most watched television in Macedonia. Founded in 1993, TV Sitel offers diverse programming including news, current affairs, entertainment shows, sports coverage, documentaries, and cultural programs. Broadcasting worldwide via satellite.'
  },
  {
    id: 'kanal5',
    name: 'Kanal 5',
    logo: 'https://tvstanici.net/wp-content/uploads/2023/11/kanal5.webp',
    category: 'Entertainment',
    streamUrl: 'https://tvstanici.net/kanal-5-tv-livestream/',
    description: 'Popular entertainment channel with series, movies, and reality shows'
  },
  {
    id: 'telma',
    name: 'Telma',
    logo: 'https://tvstanici.net/wp-content/uploads/2023/11/telma.webp',
    category: 'News',
    streamUrl: 'https://tvstanici.net/telma-tv-livestream/',
    description: 'News and political debates, documentaries, and current affairs'
  },
  {
    id: 'alfa',
    name: 'Alfa TV',
    logo: 'https://tvstanici.net/wp-content/uploads/2023/11/alfa.webp',
    category: 'News',
    streamUrl: 'https://tvstanici.net/alfa-tv-livestream/',
    description: 'News channel with live coverage and political analysis'
  },
  {
    id: '24vesti',
    name: '24 Vesti',
    logo: 'https://tvstanici.net/wp-content/uploads/2023/11/24vesti.webp',
    category: 'News',
    streamUrl: 'https://tvstanici.net/24-vesti-tv-livestream/',
    description: '24/7 news channel with breaking news and live reports'
  },
  {
    id: 'mrt1',
    name: 'MRT 1',
    logo: 'https://tvstanici.net/wp-content/uploads/2023/11/mrt1.webp',
    category: 'National',
    streamUrl: 'https://tvstanici.net/mrt-1-tv-livestream/',
    description: 'National public broadcaster with diverse programming'
  },
  {
    id: 'alsat',
    name: 'Alsat-M',
    logo: 'https://tvstanici.net/wp-content/uploads/2023/11/alsat.webp',
    category: 'News',
    streamUrl: 'https://tvstanici.net/alsat-m-tv-livestream/',
    description: 'Albanian-language news and entertainment channel'
  },
  {
    id: 'mrt2',
    name: 'MRT 2',
    logo: 'https://tvstanici.net/wp-content/uploads/2023/11/mrt2.webp',
    category: 'National',
    streamUrl: 'https://tvstanici.net/mrt-2-tv-livestream/',
    description: 'Second national channel with cultural and educational content'
  }
];

export const channelCategories = [
  'All',
  'News',
  'Entertainment',
  'National',
  'News & Entertainment'
];
