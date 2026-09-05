import { TestimonialItem } from '../types';

// Authentic SVG logo for FLERRO Beauty Products matching the exact brand avatar
const FLERRO_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" rx="100" fill="%23ffffff"/><circle cx="100" cy="100" r="90" fill="none" stroke="%23f6d7db" stroke-width="2.2"/><ellipse cx="100" cy="98" rx="58" ry="68" fill="none" stroke="%23e79ea5" stroke-width="1.8" stroke-dasharray="2,3"/><text x="100" y="105" font-family="'Brush Script MT', 'Great Vibes', 'Playfair Display', cursive, serif" font-size="35" font-weight="bold" fill="%23d87076" text-anchor="middle">flerro</text><text x="100" y="122" font-family="sans-serif" font-size="7.5" letter-spacing="2.2" font-weight="700" fill="%23b85d64" text-anchor="middle">BEAUTY PRODUCTS</text><circle cx="68" cy="80" r="3" fill="%23f2b6bc"/><circle cx="132" cy="78" r="2.5" fill="%23f2b6bc"/><path d="M96,62 Q100,56 104,62" fill="none" stroke="%23d87076" stroke-width="1.2"/><path d="M136,88 C141,84 145,88 143,94 C139,92 137,94 136,88 Z" fill="%23e89fa4"/></svg>`;

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  // 01: DR. KENIN JADVANI
  {
    id: 'kenin',
    handle: 'dr.kenin_jadvani01',
    name: 'Dr. Kenin Jadvani',
    profession: 'Skin Care Specialist',
    image: '/kenin.png',
    postsCount: '33',
    followersCount: '728',
    followingCount: '51',
    bioLines: [
      'Advance skin & laser clinic,',
      'Hairremoval,homeopathy ,skinglow,pimpls',
      'Founder of @luxe.skin.clinic.0702'
    ],
    quote: '"In just 1 month, our organic reach exploded to 12.4L views and 716 new followers through cinema-grade educational reels."',
    metricBadge: 'In 1 month: 12.4L Views • +98% Growth',
    subMetric: '+716 Followers',
    profileLink: 'https://www.instagram.com/dr.kenin_jadvani01',
    isVerified: true,
    insights: {
      period: '4 Aug-2 Sep',
      views: '12.4L',
      newFollowers: '716',
      growthPercentage: '+98%',
    },
  },

  // 02: DR. ISHA DOBARIYA
  {
    id: 'isha',
    handle: 'isha.physiofit',
    name: 'Dr. Isha Dobariya',
    profession: 'Physiotherapist',
    image: '/ish.png',
    postsCount: '18',
    followersCount: '877',
    followingCount: '2',
    bioLines: [
      'Physical Therapist',
      'Physiotherapy | Fitness | Health',
      'Pre & Post operation Physio care',
      'Managed by : @fusionnmedia.in'
    ],
    quote: '"In just 1 month, our organic reach crossed 20 Lakh views through structured physiotherapy education and high-retention video reels."',
    metricBadge: 'In 1 month: 20.0L (20 Lakh) Reach • +92% Growth',
    subMetric: '20L Reach',
    profileLink: 'https://www.instagram.com/isha.physiofit',
    isVerified: true,
    insights: {
      period: '1 Month Growth',
      views: '20.0L',
      newFollowers: '877',
      growthPercentage: '+92%',
    },
  },

  // 03: FLERRO COSMETICS (THIRD CLIENT)
  {
    id: 'flerro',
    handle: 'flerro.cosmetics',
    name: 'FLERRO',
    profession: 'Beauty, cosmetic & personal care',
    image: FLERRO_AVATAR,
    postsCount: '25',
    followersCount: '4,761',
    followingCount: '3',
    bioLines: [
      '✨ Premium skincare & personal care made for everyday confidence.',
      '🌿 Body Wash • Body Lotion • Face Wash • Shampoo',
      'IN Made in India',
      '🔗 flerro.in and 1 more'
    ],
    quote: '"In just 1 month, our organic reach crossed 25 Lakh views and we gained 4,755 followers through viral aesthetic beauty storytelling."',
    metricBadge: 'In 1 month: 25.0L (25 Lakh) Reach • +99% Growth',
    subMetric: '+4,755 Followers',
    profileLink: 'https://www.instagram.com/flerro.cosmetics',
    isVerified: true,
    insights: {
      period: '1 Month Growth',
      views: '25.0L',
      newFollowers: '4,755',
      growthPercentage: '+99%',
    },
  },

  // 04: SENIL VIRADIYA (AUTOMOBILE ENTHUSIAST)
  {
    id: 'senil',
    handle: 'senil.auto',
    name: 'Senil Viradiya',
    profession: 'Automobile Enthusiast',
    image: '/senil.png',
    postsCount: '57',
    followersCount: '436',
    followingCount: '7',
    bioLines: [
      'Automobile Knowledge Expert',
      '🚗 Automobile Industry Insights',
      'Managed by : @fusionnmedia.in',
      'Facebook: Senil auto'
    ],
    quote: '"In 2 months, our automobile breakdown videos reached over 5 Lakh viewers organically, turning complex car technology into viral, high-trust content."',
    metricBadge: 'In 2 months: 5.0L (5 Lakh) Reach • +84% Growth',
    subMetric: '5L Organic Reach',
    profileLink: 'https://www.instagram.com/senil.auto',
    isVerified: true,
    insights: {
      period: '2 Months Growth',
      views: '5.0L',
      newFollowers: '436',
      growthPercentage: '+84%',
    },
  },
];
