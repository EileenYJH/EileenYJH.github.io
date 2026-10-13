// Photos for the scrolling wall behind the home-page hero.
// Add a photo: drop a JPG (~520px wide) into public/images/wall/ and list it here.
export interface WallPhoto {
  src: string;
  alt: string;
}

export const wallPhotos: WallPhoto[] = [
  { src: '/images/wall/eileen-award.jpg', alt: 'Eileen holding her Student Excellence Award at UTP' },
  { src: '/images/wall/aria-node.jpg', alt: 'ARIA sensor node on perfboard' },
  { src: '/images/wall/sedic-team.jpg', alt: 'Team NEXA at SEDIC 2026' },
  { src: '/images/wall/nexa-dashboard.jpg', alt: 'NEXA tariff dashboard' },
  { src: '/images/wall/sedic-replay.jpg', alt: 'OMNI console spectrogram replay' },
  { src: '/images/wall/aws-setup.jpg', alt: 'AWS-IQ onboarding setup tracker' },
  { src: '/images/wall/aria-exploded.jpg', alt: 'ARIA node exploded view' },
  { src: '/images/wall/aws-dashboard.jpg', alt: 'AWS-IQ onboarding dashboard' },
  { src: '/images/wall/sedic-signal.jpg', alt: 'Signal analysis view of one radio window' },
  { src: '/images/wall/nexa-chatbot.jpg', alt: 'NEXA AI chatbot' },
];
