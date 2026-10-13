// Eileen's timeline, oldest first. `img` is optional; leave it out for a text-only entry.
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
  /** Eileen's own LinkedIn post about this, if she wrote one. */
  post?: string;
  /** true = shown on the academic timeline; otherwise it appears under Highlights. */
  academic?: boolean;
}

/** Milestone shown under a year marker on the academic timeline. */
export const yearNotes: Record<number, { label: string; title: string; place: string }> = {
  2025: {
    label: 'Degree begins · Sep 2025',
    title: 'Bachelor of Electrical and Electronics Engineering with Honours',
    place: 'Universiti Teknologi PETRONAS (UTP)',
  },
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
    date: 'Sep 2024 to May 2025',
    kind: 'study',
    academic: true,
    title: 'Foundation in Electrical & Electronics Engineering, UTP',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7379504396746805248/',
    detail: '4.0 CGPA and the Dean’s List every semester, then the Student Excellence Award at the Foundation Studies Completion Ceremony (1 Oct 2025).',
    chips: ['Dean’s List · Sep 2024', 'Dean’s List · Jan 2025', 'Dean’s List · May 2025', 'Student Excellence Award · Oct 2025'],
    img: '/images/timeline/fscc.jpg',
  },
  {
    year: 2024,
    date: 'Dec 2024',
    kind: 'event',
    title: 'DevFest George Town 2024',
    detail: 'My first DevFest, with a hands-on workshop on AI-driven image creation.',
  },
  {
    year: 2025,
    date: '17 to 21 May 2025',
    kind: 'event',
    title: '10th Northern Malaysia Mandarin Debate Tournament: adjudication committee',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7332580205426868224/',
    detail: 'Invited and assigned judges, ran adjudication briefings and managed scoring data for this national tournament hosted at UTP.',
    img: '/images/timeline/debate.jpg',
  },
  {
    year: 2025,
    date: '25 Jul 2025',
    kind: 'award',
    title: 'Best Integrated Concept, InPhyChem District',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7354877127487361025/',
    detail: '“Towards Sustainable Cities” project showcase, Chancellor Hall, UTP.',
    img: '/images/timeline/inphychem.jpg',
  },
  {
    year: 2025,
    date: '30 Jul 2025',
    kind: 'award',
    title: 'Story.AI Award Ceremony',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7356315769674063872/',
    detail: 'Data storytelling with AI for Mathematics II (FCM0035), recognised at the award ceremony.',
    img: '/images/timeline/storyai.jpg',
  },
  {
    year: 2025,
    date: '21 to 24 Aug 2025',
    kind: 'event',
    title: '2nd ASEAN + Inter-University Networking Games 2025: liaison officer',
    img: '/images/timeline/asean-games.jpg',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7397117282692448256/',
    detail: 'Looked after the team from China University of Petroleum-Beijing, using my Mandarin to help them settle in and get around Malaysia.',
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
    date: 'Nov 2025',
    kind: 'event',
    title: 'DevFest Singapore 2025, Google Asia-Pacific HQ',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7398554337892995072/',
    detail: 'Workshops on AI agents with Google ADK, Firebase with Gemini, and GKE-hosted image generation. Joined with the UTP Open Computing Club.',
    img: '/images/timeline/devfest-sg.jpg',
  },
  {
    year: 2025,
    date: '15 to 16 Nov 2025',
    kind: 'event',
    title: 'Secure Nex Hackathon 2025: Ceremony & Protocol (CNP) committee',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7397483444286492672/',
    detail: 'Slide Master for the opening and closing ceremonies, cueing music, live slide changes and screen switches with the control room. Organised by PETRONAS Group Security, UTP Department of Computing, CeRDaS and UTP SYNTECH.',
    img: '/images/timeline/securenex.jpg',
  },
  {
    year: 2025,
    date: '29 Nov 2025',
    kind: 'event',
    title: 'Semiconductor Hackathon 2025',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7400773036355936256/',
    detail: 'Industry forums with Intel, MSIA, Keysight, PSDC and USM, plus Coffee Connect sessions with IC design, test and process engineers. Organised by HEYA Inc at Penang Science Cluster.',
    img: '/images/timeline/semicon.jpg',
  },
  {
    year: 2026,
    date: 'Jan 2026',
    kind: 'competition',
    title: 'NexG GodamLah! 2.0: MyMULA',
    detail: 'Team VeriTech. A digital legal guardian protocol that lets parents approve forms for minors with biometric signing, and verifies age or income status without exposing personal data.',
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
    date: 'Jun 2026',
    kind: 'competition',
    title: 'USM IEEE Makerthon 2026: ARIA',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7460617463857074176/',
    detail: 'Team INTERA. ARIA (Adaptive Room Intelligence & Alert) fuses five sensors to tell cooking smoke from a real fire, links ESP32 nodes over ESP-NOW and reroutes LED evacuation paths around fire and crowds.',
    img: '/images/timeline/makerthon.jpg',
    href: '/projects/aria',
  },
  {
    year: 2026,
    date: '9 Jun 2026',
    kind: 'event',
    title: 'Penang Career Discovery Day 2026: Assistant Project Director',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7470078965467058176/',
    detail: 'Brought 80 UTP students to meet 19 semiconductor and engineering companies at St. Giles Wembley, Penang.',
    img: '/images/timeline/penang.jpg',
  },
  {
    year: 2026,
    date: 'Jun 2026',
    kind: 'award',
    title: 'Champion, Jabil IT ECP Bootcamp 3.0: Data & AI Innovation',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7478788671337410560/',
    detail: 'Team NEXA, one of 11 teams shortlisted from 50+. Our AI tariff calculation engine for Jabil’s trade compliance team (Use Case 2) was judged by Jabil senior management.',
    img: '/images/timeline/jabil.jpg',
    href: '/projects/nexa',
  },
  {
    year: 2026,
    date: '28 Jun 2026',
    kind: 'award',
    title: '2nd Place, AWS x UTP GenAI Hackathon 2026',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7477550199008325632/',
    detail: 'Team NEXA. AWS-IQ, an onboarding platform of six coordinating agents on Amazon Bedrock, designed and built in a three-hour window.',
    img: '/images/timeline/aws-team.jpg',
    href: '/projects/nexa-aws',
  },
  {
    year: 2026,
    date: 'Jul 2026',
    kind: 'event',
    title: 'EMAX 2026 industrial visit: Project Director',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7486668541983789056/',
    detail: 'Led the E3S2 visit to Malaysia’s largest electronics and semiconductor manufacturing expo, six hours of booth-to-booth conversations on automation and precision equipment.',
    img: '/images/timeline/emax.jpg',
  },
  {
    year: 2026,
    date: 'Sep 2026',
    kind: 'study',
    academic: true,
    title: 'Student exchange, University of Sheffield, UK',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7513341285953359872/',
    detail: 'Semester exchange at the University of Sheffield, from September 2026.',
  },
  {
    year: 2026,
    date: '7 Oct 2026',
    kind: 'award',
    title: 'Track Winner, Project Overwatch (Track 1), SEDIC 2026',
    detail: 'Team NEXA. An offline AI system that classifies civilian comms, military radar and jamming from raw IQ data, even when they overlap. Presented at MITEC alongside CyberDSA.',
    img: '/images/timeline/sedic-team.jpg',
    href: '/projects/sedic',
  },
  {
    year: 2026,
    date: 'Now',
    kind: 'now',
    title: 'Leading student societies at UTP',
    chips: [
      'Secretary, Open Computing Club (OCC)',
      'Newsletter Editor, IEEE UTP Student Branch',
      'Project Director, E3S2 industrial visit to EMAX 2026',
      'Assistant Project Director, Penang Career Discovery Day 2026 (E3S2)',
      'Project Director, E3S2 benchmarking visit to IEEE MMU',
      'Project Director, OCC Robotics Workshop',
      'Assistant Project Director III, ASEAN Student Forum 2026 (UTP-ASEAN Student Association)',
      'Head of Public Relations, ElectroRun',
      'Public Relations committee, Electrical & Electronics Engineering Student Society (E3S2) and UTP PETROBOTS',
      'Admin Officer & Master Trainer, AI Ready ASEAN (2025)',
      'Technical committee, GDSC-UTP (2025)',
    ],
  },
];
