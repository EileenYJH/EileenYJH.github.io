// Eileen's timeline, oldest first. `img` is optional — leave it out for a text-only entry.
// kind sets the label colour: study, award, competition, event, now.
export type Kind = 'study' | 'award' | 'competition' | 'event' | 'now';

export interface Course {
  code: string;
  name: string;
  grade: string;
}

export interface Moment {
  year: number;
  date: string;
  kind: Kind;
  title: string;
  detail?: string;
  chips?: string[];
  img?: string;
  href?: string;
  /** Semester results: GPA, CGPA and the subjects taken. */
  gpa?: string;
  cgpa?: string;
  standing?: string;
  courses?: Course[];
  /** true = shown on the academic timeline; otherwise it appears under Highlights. */
  academic?: boolean;
}

/** Short note shown under a year marker on the academic timeline. */
export const yearNotes: Record<number, string> = {
  2025: 'Started the Bachelor of Electrical and Electronics Engineering with Honours, UTP',
};

export const timeline: Moment[] = [
  {
    year: 2024,
    date: '2024',
    kind: 'award',
    academic: true,
    title: 'PETRONAS Education Sponsorship (PESP) scholar',
    detail: 'Awarded the PETRONAS scholarship for Electrical / Instrumentation Engineering.',
    img: '/images/timeline/pesp.jpg',
  },
  {
    year: 2024,
    date: 'Sep 2024 – May 2025',
    kind: 'study',
    academic: true,
    title: 'Foundation in Electrical & Electronics Engineering, UTP',
    detail: '4.0 CGPA and the Dean’s List every semester, then the Student Excellence Award at the Foundation Studies Completion Ceremony (1 Oct 2025).',
    chips: ['Dean’s List · Sep 2024', 'Dean’s List · Jan 2025', 'Dean’s List · May 2025', 'Student Excellence Award · Oct 2025'],
    img: '/images/timeline/fscc.jpg',
  },
  {
    year: 2025,
    date: '17–21 May 2025',
    kind: 'event',
    title: '10th Northern Malaysia Mandarin Debate Tournament',
    detail: 'Hosted at Universiti Teknologi PETRONAS.',
    img: '/images/timeline/debate.jpg',
  },
  {
    year: 2025,
    date: '25 Jul 2025',
    kind: 'award',
    title: 'Best Integrated Concept, InPhyChem District',
    detail: '“Towards Sustainable Cities” project showcase, Chancellor Hall, UTP.',
    img: '/images/timeline/inphychem.jpg',
  },
  {
    year: 2025,
    date: '30 Jul 2025',
    kind: 'award',
    title: 'Story.AI Award Ceremony',
    detail: 'Data storytelling with AI for Mathematics II (FCM0035), recognised at the award ceremony.',
    img: '/images/timeline/storyai.jpg',
  },
  {
    year: 2025,
    date: 'Sep 2025',
    kind: 'study',
    academic: true,
    title: 'Degree semester 1',
    gpa: '3.97',
    cgpa: '3.97',
    standing: 'Dean’s List',
    courses: [
      { code: 'EFB1013', name: 'Circuit Theory', grade: 'A' },
      { code: 'EFB1023', name: 'Structured Programming and Interfacing', grade: 'A' },
      { code: 'FFM1013', name: 'Engineering Mathematics I', grade: 'A' },
      { code: 'HFB2152', name: 'Ethics and Integrity', grade: 'A' },
      { code: 'MPU3152', name: 'Penghayatan Etika & Peradaban', grade: 'A-' },
      { code: 'PFB1012', name: 'Introduction to Oil & Gas Industry and Sustainable Development', grade: 'A' },
    ],
  },
  {
    year: 2025,
    date: '15–16 Nov 2025',
    kind: 'event',
    title: 'Secure Nex Hackathon: organising committee (CNP)',
    detail: 'Served on the CNP committee for this cybersecurity hackathon by PETRONAS Group Security at NADI@UTP.',
    img: '/images/timeline/securenex.jpg',
  },
  {
    year: 2025,
    date: '29 Nov 2025',
    kind: 'competition',
    title: 'Semiconductor Hackathon',
    detail: 'Building the next-gen talent for advanced industries, Penang Science Cluster.',
    img: '/images/timeline/semicon.jpg',
  },
  {
    year: 2026,
    date: 'Jan 2026',
    kind: 'study',
    academic: true,
    title: 'Degree semester 2',
    gpa: '4.00',
    cgpa: '3.98',
    standing: 'Dean’s List',
    courses: [
      { code: 'CFB1032', name: 'Health, Safety and Environment', grade: 'A' },
      { code: 'EFB1031', name: 'Electrical Circuit Analysis Lab', grade: 'A' },
      { code: 'EFB1043', name: 'Signals & Systems', grade: 'A' },
      { code: 'EFB1054', name: 'Digital Electronics', grade: 'A' },
      { code: 'FFM1023', name: 'Engineering Mathematics II', grade: 'A' },
      { code: 'MPU3192', name: 'Falsafah dan Isu Semasa', grade: 'A' },
    ],
  },
  {
    year: 2026,
    date: 'May 2026',
    kind: 'study',
    academic: true,
    title: 'Degree semester 3',
    detail: 'Includes the cleanroom MOSFET fabrication lab in Microelectronic Physics & Devices.',
    gpa: '4.00',
    cgpa: '3.99',
    standing: 'Dean’s List',
    courses: [
      { code: 'EFB1063', name: 'Network Analysis', grade: 'A' },
      { code: 'EFB1074', name: 'Microelectronic Physics & Devices', grade: 'A' },
      { code: 'HFB1022', name: 'Scientific Inquiry', grade: 'A' },
      { code: 'KFC1051U', name: 'Drone Piloting', grade: 'A' },
      { code: 'LFB1042', name: 'Academic Writing', grade: 'A' },
      { code: 'MPU3272', name: 'Basic Japanese Communication', grade: 'A' },
    ],
  },
  {
    year: 2026,
    date: '2026',
    kind: 'competition',
    title: 'Makerthon 2026: ARIA',
    detail: 'Led a six-node ESP32 fire detection and evacuation system for the wireless communication & IoT challenge.',
    img: '/images/timeline/makerthon.jpg',
    href: '/projects/aria',
  },
  {
    year: 2026,
    date: '9 Jun 2026',
    kind: 'event',
    title: 'Penang Career Discovery Day 2026',
    detail: 'Met semiconductor and tech companies at St. Giles Wembley, Penang.',
    img: '/images/timeline/penang.jpg',
  },
  {
    year: 2026,
    date: 'Jun 2026',
    kind: 'award',
    title: 'Champion, Use Case 2: Jabil IT ECP Bootcamp 3.0',
    detail: 'NEXA, an AI-powered tariff calculation engine for Jabil’s trade compliance team.',
    img: '/images/timeline/jabil.jpg',
    href: '/projects/nexa',
  },
  {
    year: 2026,
    date: '28 Jun 2026',
    kind: 'award',
    title: '2nd Place, AWS x UTP GenAI Hackathon 2026',
    detail: 'AWS-IQ, a five-agent onboarding assistant on Amazon Bedrock.',
    img: '/images/timeline/aws.jpg',
    href: '/projects/nexa-aws',
  },
  {
    year: 2026,
    date: 'Sep 2026',
    kind: 'study',
    academic: true,
    title: 'Student exchange, University of Sheffield, UK',
    detail: 'Exchange year in Sheffield for 2026/27.',
  },
  {
    year: 2026,
    date: 'Oct 2026',
    kind: 'award',
    title: 'Track Winner, SEDIC 2026 RF/Signal Track',
    detail: 'Project Overwatch, an AI model that classifies radio signals, including jammers, from raw IQ data.',
    img: '/images/timeline/sedic.jpg',
    href: '/projects/sedic',
  },
  {
    year: 2026,
    date: 'Now',
    kind: 'now',
    title: 'Leading student societies at UTP',
    chips: [
      'Project Director, Electrical & Electronics Engineering Student Society (E3S2)',
      'Secretary, Open Computing Club (OCC)',
      'Newsletter Editor, IEEE UTP Student Branch',
    ],
  },
];
