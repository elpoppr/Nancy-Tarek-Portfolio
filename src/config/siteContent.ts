export type MediaKind = 'image' | 'video';

export type Project = {
  id: string;
  index: string;
  category: string;
  title: string;
  year: string;
  description: string;
  mediaPath: string;
  mediaKind: MediaKind;
  url?: string;
  tone: 'amber' | 'blue' | 'rose';
};

export type Service = {
  number: string;
  title: string;
  description: string;
  icon: 'arrow';
  url?: string;
};

export type SiteContent = {
  personal: {
    name: string;
    professionalTitle: string;
    location: string;
    practicePeriod: string;
    shortIntroduction: string;
    hero: {
      kicker: string;
      eyebrowSuffix: string;
      headline: { leading: string; emphasis: string; trailing: string };
      description: string;
      locationLabel: string;
    };
    about: {
      sectionTitle: string;
      titleLeading: string;
      titleEmphasis: string;
      largeDescription: string;
      description: string;
      ctaLabel: string;
    };
    contact: {
      eyebrow: string;
      headlineLeading: string;
      headlineEmphasis: string;
      description: string;
      email: string;
      instagramUrl: string;
      linkedinUrl: string;
    };
  };
  logo: { type: 'image'; src: string; alt: string };
  services: Service[];
  projects: Project[];
  developer: { name: string; company: string; url: string };
  copyrightYear: number;
};

/**
 * Main content file. Update identity, contact links, service descriptions, and project details here.
 * Place portfolio media in public/media/nancy-tarek/.
 */
const siteContent: SiteContent = {
  personal: {
    name: 'Nancy Tarek',
    professionalTitle: 'Visual Designer',
    location: 'Cairo, Egypt',
    practicePeriod: '2024—25',
    shortIntroduction: 'Visual identities, digital artwork, and motion-led stories.',
    hero: {
      kicker: 'Independent visual designer',
      eyebrowSuffix: 'selected work',
      headline: { leading: 'Ideas', emphasis: 'made', trailing: 'visible.' },
      description: 'Visual design, digital artwork, and motion with a clear point of view.',
      locationLabel: 'Cairo, Egypt',
    },
    about: {
      sectionTitle: 'About',
      titleLeading: 'Visual',
      titleEmphasis: 'designer.',
      largeDescription: 'I’m Nancy Tarek — a visual designer working across graphic design, digital imagery, and motion.',
      description: 'From visual concepts and editorial artwork to motion pieces and digital content, I shape ideas into clear, considered visuals.',
      ctaLabel: 'Start a conversation',
    },
    contact: {
      eyebrow: 'Have a project in mind?',
      headlineLeading: 'Let’s make',
      headlineEmphasis: 'it memorable.',
      description: 'For project inquiries, collaborations, and creative work, get in touch.',
      email: 'hello@nancytarek.com',
      instagramUrl: '',
      linkedinUrl: '',
    },
  },
  logo: {
    type: 'image',
    src: '/media/nancy-tarek/logo.svg',
    alt: 'Nancy Tarek monogram',
  },
  services: [
    { number: '01', title: 'Visual Communication', description: 'Clear, purposeful visuals that communicate an idea at a glance.', icon: 'arrow', url: '#contact' },
    { number: '02', title: 'Graphic Design', description: 'Posters, campaign artwork, layouts, and digital design assets.', icon: 'arrow', url: '#contact' },
    { number: '03', title: 'Motion Design', description: 'Animated visuals, short-form motion pieces, and visual transitions.', icon: 'arrow', url: '#contact' },
    { number: '04', title: 'Digital Illustration', description: 'Illustrated imagery and stylized digital artwork.', icon: 'arrow', url: '#contact' },
    { number: '05', title: '2D Animation', description: 'Character-led and graphic 2D animation.', icon: 'arrow', url: '#contact' },
    { number: '06', title: 'Video Editing', description: 'Edited visual content for digital platforms and social media.', icon: 'arrow', url: '#contact' },
    { number: '07', title: 'Creative Design', description: 'Concept-driven design that brings a distinct visual direction to a project.', icon: 'arrow', url: '#contact' },
  ],
  projects: [
    { id: '01', index: '01', category: 'Graphic Design', title: 'Spaghetti — Social Poster', year: '2026', description: 'Promotional poster artwork for a food-focused social creative.', mediaPath: '/media/nancy-tarek/spaghetti-social-poster.jpg', mediaKind: 'image', url: '', tone: 'amber' },
    { id: '02', index: '02', category: 'Graphic Design', title: 'Focus — Editorial Artwork', year: '2026', description: 'Portrait-led editorial poster design.', mediaPath: '/media/nancy-tarek/focus-editorial-poster.jpg', mediaKind: 'image', url: '', tone: 'blue' },
    { id: '03', index: '03', category: 'Visual Communication', title: 'Vogue — Editorial Study', year: '2026', description: 'Fashion-inspired editorial visual study.', mediaPath: '/media/nancy-tarek/vogue-editorial-artwork.png', mediaKind: 'image', url: '', tone: 'rose' },
    { id: '04', index: '04', category: 'Digital Illustration', title: 'Magical Gaze', year: '2026', description: 'Portrait-based digital artwork with editorial typography.', mediaPath: '/media/nancy-tarek/magical-gaze-artwork.png', mediaKind: 'image', url: '', tone: 'amber' },
    { id: '05', index: '05', category: 'Motion Design', title: 'Motion Study 01', year: '2026', description: 'Short-form motion design study.', mediaPath: '/media/nancy-tarek/motion-study-01.mp4', mediaKind: 'video', url: '', tone: 'blue' },
    { id: '06', index: '06', category: 'Motion Design', title: 'Motion Study 02', year: '2026', description: 'Short-form motion design study.', mediaPath: '/media/nancy-tarek/motion-study-02.mp4', mediaKind: 'video', url: '', tone: 'rose' },
    { id: '07', index: '07', category: 'Motion Design', title: 'Motion Study 03', year: '2026', description: 'Motion graphic for a digital communication concept.', mediaPath: '/media/nancy-tarek/motion-study-03.mp4', mediaKind: 'video', url: '', tone: 'amber' },
    { id: '08', index: '08', category: 'Motion Design', title: 'Motion Study 04', year: '2026', description: 'Short-form motion design study.', mediaPath: '/media/nancy-tarek/motion-study-04.mp4', mediaKind: 'video', url: '', tone: 'blue' },
    { id: '09', index: '09', category: 'Motion Design', title: 'Motion Study 05', year: '—', description: 'Short-form motion design study.', mediaPath: '/media/nancy-tarek/motion-study-05.mp4', mediaKind: 'video', url: '', tone: 'rose' },
    { id: '10', index: '10', category: '2D Animation', title: 'Character Animation 01', year: '2026', description: 'Character-focused animation study.', mediaPath: '/media/nancy-tarek/character-animation-01.mp4', mediaKind: 'video', url: '', tone: 'amber' },
    { id: '11', index: '11', category: 'Video Editing', title: 'Character Edit 01', year: '2026', description: 'Short-form character edit.', mediaPath: '/media/nancy-tarek/character-edit-01.mp4', mediaKind: 'video', url: '', tone: 'blue' },
    { id: '12', index: '12', category: 'Motion Design', title: 'Motion Study 06', year: '2026', description: 'Short-form motion design study.', mediaPath: '/media/nancy-tarek/motion-study-06.mp4', mediaKind: 'video', url: '', tone: 'rose' },
    { id: '13', index: '13', category: 'Motion Design', title: 'Motion Study 07', year: '2026', description: 'Short-form motion design study.', mediaPath: '/media/nancy-tarek/motion-study-07.mp4', mediaKind: 'video', url: '', tone: 'amber' },
    { id: '14', index: '14', category: 'Video Editing', title: 'Motion Study 08', year: '2026', description: 'Short-form video edit.', mediaPath: '/media/nancy-tarek/motion-study-08.mp4', mediaKind: 'video', url: '', tone: 'blue' },
    { id: '15', index: '15', category: 'Motion Design', title: 'Social Motion 01', year: '2026', description: 'Animated social-media visual.', mediaPath: '/media/nancy-tarek/social-motion-01.mp4', mediaKind: 'video', url: '', tone: 'rose' },
  ],
  developer: { name: 'محمد إيهاب محمد سنوسي', company: 'EXA Group', url: 'https://exa-group-m.netlify.app/' },
  copyrightYear: 2026,
};

export default siteContent;
