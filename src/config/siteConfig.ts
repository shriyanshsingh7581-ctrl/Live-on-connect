export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  iconName: 'Camera' | 'Share2' | 'Film' | 'Compass' | 'Activity' | 'Sliders';
  benefits: string[];
  useCases: string[];
  technicalSpecs: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  availabilityNote: string;
  iconName:
    | 'Monitor'
    | 'Navigation'
    | 'PlaySquare'
    | 'BookOpen'
    | 'Globe'
    | 'Layers'
    | 'Radio'
    | 'Tv'
    | 'Cpu'
    | 'Code2'
    | 'ShieldCheck'
    | 'Headphones';
}

export interface StatCounterItem {
  id: string;
  label: string;
  targetValue: number;
  suffix: string;
  description: string;
}

export interface ProcessStepItem {
  stepNumber: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface SampleTestimonialItem {
  id: string;
  isSamplePlaceholder: true;
  clientName: string;
  roleOrCompany: string;
  eventContext: string;
  quote: string;
}

export interface ProjectHighlightItem {
  id: string;
  title: string;
  category: string;
  workflowSummary: string;
  technicalSetup: string;
}

export interface GalleryVideoItem {
  id: string;
  title: string;
  date: string;
  category:
    | 'Corporate Events'
    | 'Sports & Scorecards'
    | 'Conferences & Summits'
    | 'Cultural & Stage'
    | 'Educational Broadcasts';
  shortDescription: string;
  duration: string;
  resolution: string;
  thumbnail: string;
  thumbnailAlt: string;
  isSampleData: true;
  videoUrl?: string;
  streamType?: 'mp4' | 'hls';
  productionNotes: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const env = (typeof import.meta !== 'undefined' && import.meta.env) || ({} as Record<string, string>);

export const SITE_CONFIG = {
  brand: {
    name: 'YOUR MEDIA BRAND',
    tagline: 'Professional Live Broadcasting & Media Solutions',
    primaryEmail: 'hello@example.com',
    phone: '+91-00000-00000',
    address: 'Your Business Address, India',
    workingHours: 'Monday–Saturday, 9 AM–6 PM',
    productionDomain: env.VITE_APP_URL || 'https://example.com',
    /**
     * Optional verified WhatsApp number in international digits format (e.g., "919876543210").
     * When empty or placeholder, the WhatsApp quick-chat button is hidden or displays a configuration notice.
     */
    whatsappNumber: env.VITE_WHATSAPP_NUMBER || '',
    socialLinks: [
      { label: 'YouTube', href: 'https://youtube.com', handle: '@yourmediabrand' },
      { label: 'LinkedIn', href: 'https://linkedin.com', handle: 'your-media-brand' },
      { label: 'Instagram', href: 'https://instagram.com', handle: '@yourmediabrand' },
      { label: 'Facebook', href: 'https://facebook.com', handle: 'yourmediabrand' },
    ],
  },

  assets: {
    heroBroadcastControl: '/images/hero-broadcast-control.svg',
    aboutMulticamStage: '/images/about-multicam-stage.svg',
    serviceWirelessMulticam: '/images/service-wireless-multicam.svg',
    serviceSimulcastStreaming: '/images/service-simulcast-streaming.svg',
    serviceFilmProduction: '/images/service-film-production.svg',
    service360Live: '/images/service-360-live.svg',
    serviceLiveScorecard: '/images/service-live-scorecard.svg',
    servicePostProduction: '/images/service-post-production.svg',
  },

  /**
   * Statistics Configuration:
   * Never present invented figures as verified company statistics.
   * Site owners can toggle `showCounters` or set `isVerified: true` once real audited figures are entered.
   */
  statisticsConfig: {
    showCounters: true,
    isVerified: false,
    disclaimerText:
      'Configurable template counters shown for layout preview. Update values in src/config/siteConfig.ts with verified business metrics or disable counters prior to publication.',
    counters: [
      {
        id: 'satisfied-clients',
        label: 'Satisfied Clients',
        targetValue: 120,
        suffix: '+',
        description: 'Configurable placeholder metric for organizations served',
      },
      {
        id: 'completed-projects',
        label: 'Completed Projects',
        targetValue: 350,
        suffix: '+',
        description: 'Configurable placeholder metric for delivered broadcasts',
      },
      {
        id: 'ongoing-projects',
        label: 'Ongoing Projects',
        targetValue: 14,
        suffix: '',
        description: 'Configurable placeholder metric for active production schedules',
      },
      {
        id: 'expert-team',
        label: 'Expert Team Members',
        targetValue: 28,
        suffix: '+',
        description: 'Configurable placeholder metric for camera, audio & encoding crew',
      },
    ] as StatCounterItem[],
  },

  /**
   * App Download Section Configuration:
   * Hidden automatically when `googlePlayUrl` is empty so visitors never encounter a dead store link.
   */
  appDownloadConfig: {
    googlePlayUrl: env.VITE_GOOGLE_PLAY_URL || '',
    heading: 'Watch and Manage Your Broadcasts on the Go',
    description:
      'Monitor active streams, review event schedules, and share live broadcast links directly from your Android device.',
    features: [
      'Real-time stream status and schedule notifications',
      'Low-latency mobile HLS playback support',
      'Instant event link sharing for organizers and attendees',
    ],
  },

  /**
   * Live Stream Configuration:
   * Uses VITE_LIVE_STREAM_URL when configured. Never simulates a fake LIVE broadcast when empty.
   */
  liveStreamConfig: {
    defaultStreamUrl: env.VITE_LIVE_STREAM_URL || '',
    sampleTestStreamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    eventTitle: 'Main Auditorium Live Broadcast Feed',
    eventSubtitle: 'Multi-Camera Switched Program Output · 1080p HD Ready',
    eventDescription:
      'When a live event is active and configured with a valid HLS (.m3u8) or MP4 stream endpoint, the broadcast player initializes real-time playback automatically. Outside scheduled transmission windows, you can inspect our archived event productions in the Stream Gallery or load a technical test stream to verify player compatibility.',
    schedule: [
      {
        id: 'sched-1',
        time: '09:30 AM IST',
        title: 'Technical Line Check & Multi-Camera Color Matching',
        stage: 'Pre-Broadcast Engineering',
        status: 'Scheduled',
      },
      {
        id: 'sched-2',
        time: '10:00 AM IST',
        title: 'Opening Keynote & Executive Address',
        stage: 'Main Auditorium',
        status: 'Scheduled',
      },
      {
        id: 'sched-3',
        time: '02:00 PM IST',
        title: 'Panel Discussion & Interactive Audience Q&A',
        stage: 'Hall B · Simulcast Feed',
        status: 'Scheduled',
      },
    ],
  },

  featuredServices: [
    {
      id: 'wireless-multicam-live',
      slug: 'wireless-multicam-live',
      number: '01',
      title: 'Wireless Multicam Live',
      shortDescription:
        'Multi-camera live coverage with flexible camera positioning and professional switching.',
      fullDescription:
        'Deploy roaming and fixed broadcast cameras across large venues, stadiums, and convention halls without restrictive cable runs. Our wireless HD/SDI transmission workflow delivers synchronized multi-angle feeds to a central production switcher for dynamic real-time cutting.',
      image: '/images/service-wireless-multicam.svg',
      imageAlt: 'Wireless multi-camera broadcast switching hub diagram with four camera nodes',
      iconName: 'Camera',
      benefits: [
        'Cable-free roaming camera movement across stages, aisles, and outdoor arenas',
        'Hardware vision mixing with preview/program tally and camera shader matching',
        'Clean program feed output for both in-venue projectors and online streaming encoders',
      ],
      useCases: [
        'Corporate town halls and annual general meetings',
        'Large cultural festivals and concert stages',
        'Convocations, award ceremonies, and convention keynotes',
      ],
      technicalSpecs: [
        'Up to 4–8 SDI/HDMI camera inputs with hardware frame sync',
        'Zero-delay or low-latency 5GHz wireless video links (line-of-sight dependent)',
        'Redundant local ISO / program recording alongside live output',
      ],
    },
    {
      id: 'simulcast-live-streaming',
      slug: 'simulcast-live-streaming',
      number: '02',
      title: 'Simulcast Live Streaming',
      shortDescription:
        'Broadcast supported events to multiple platforms using a properly configured streaming workflow.',
      fullDescription:
        'Reach audiences wherever they watch by distributing your live program output simultaneously to YouTube Live, Facebook Live, LinkedIn Live, custom RTMP endpoints, and embedded website players through dedicated hardware and cloud restreaming pipelines.',
      image: '/images/service-simulcast-streaming.svg',
      imageAlt: 'Master broadcast encoder routing live video feeds to video platforms and web players',
      iconName: 'Share2',
      benefits: [
        'Single unified production feed distributed to multiple social and enterprise destinations',
        'Platform-specific bitrate and resolution formatting per destination requirements',
        'Continuous stream health monitoring across every active RTMP/SRT target',
      ],
      useCases: [
        'Product launches and public brand announcements',
        'Hybrid conferences with global remote attendees',
        'Public lectures, religious gatherings, and community broadcasts',
      ],
      technicalSpecs: [
        'RTMP / RTMPS / SRT / HLS output protocol compatibility',
        'Hardware encoding with bonded cellular or dual-WAN failover support when available',
        'Requires valid destination stream keys and platform broadcast permissions',
      ],
    },
    {
      id: 'film-production',
      slug: 'film-production',
      number: '03',
      title: 'Film Production',
      shortDescription:
        'Professional filming, storytelling, editing, and post-production for business and event content.',
      fullDescription:
        'From concept development and scripting to multi-camera location shoots, cinema lighting, and sound capture, we produce documentary films, corporate brand profiles, event highlight reels, and promotional video assets tailored for digital and broadcast release.',
      image: '/images/service-film-production.svg',
      imageAlt: 'Cinema camera viewfinder with 4K DCI frame guides and prime lens telemetry',
      iconName: 'Film',
      benefits: [
        'Structured pre-production planning, storyboarding, and location scouting',
        'Cinema-grade cameras, prime/zoom optics, and controlled lighting setups',
        'Dedicated dual-system field audio recording with wireless lavalier and boom mics',
      ],
      useCases: [
        'Corporate brand films and facility showcases',
        'Executive interviews and documentary features',
        'Event aftermovies and commercial campaign videos',
      ],
      technicalSpecs: [
        '4K UHD / DCI acquisition in high-bitrate log or broadcast color profiles',
        'Professional three-point LED and diffused softbox lighting packages',
        'Multi-track 24-bit / 48kHz location sound recording',
      ],
    },
    {
      id: '360-degree-live',
      slug: '360-degree-live',
      number: '04',
      title: '360 Degree Live',
      shortDescription:
        'Immersive panoramic event experiences using compatible cameras and streaming technology.',
      fullDescription:
        'Place remote viewers in the center of the action with equirectangular 360-degree video production. Viewers on compatible web browsers, mobile devices, and VR headsets can pan around the venue in real time or on-demand.',
      image: '/images/service-360-live.svg',
      imageAlt: 'Panoramic 360 degree equirectangular projection sphere for immersive live broadcast',
      iconName: 'Compass',
      benefits: [
        'Interactive look-around perspective for virtual venue tours and stage performances',
        'Real-time optical stitching workflow for live panoramic transmission',
        'Compatible with 360-enabled video platforms and WebXR players',
      ],
      useCases: [
        'Immersive concert and stage experiences',
        'Campus, museum, and industrial facility virtual showcases',
        'Experiential brand activations and keynote front-row feeds',
      ],
      technicalSpecs: [
        'Multi-lens panoramic camera rig with real-time equirectangular stitching',
        'High-bandwidth upstream network connection required for 4K 360 streaming',
        'Playback requires a 360-compatible browser player or VR headset',
      ],
    },
    {
      id: 'live-scorecard-and-graphics',
      slug: 'live-scorecard-and-graphics',
      number: '05',
      title: 'Live Scorecard and Graphics',
      shortDescription:
        'Custom scoreboards, event titles, lower thirds, statistics, and broadcast graphics.',
      fullDescription:
        'Elevate sports tournaments, quiz competitions, and conferences with real-time broadcast overlays. We design and operate custom lower thirds, live score bugs, player statistics, sponsor bugs, and full-screen leaderboard slates keyed directly into the live program feed.',
      image: '/images/service-live-scorecard.svg',
      imageAlt: 'Broadcast television screen showing live sports scorecard overlay and lower-third graphics',
      iconName: 'Activity',
      benefits: [
        'Real-time score, timer, and statistical updates operated by a dedicated CG controller',
        'Custom-branded broadcast package matching your tournament or corporate identity',
        'Picture-in-picture split screens, speaker nameplates, and live ticker bars',
      ],
      useCases: [
        'Cricket, football, badminton, and athletics tournaments',
        'Academic quiz bowls, esports, and televised competitions',
        'Conferences requiring speaker lower-thirds and agenda slates',
      ],
      technicalSpecs: [
        'HTML5 / Broadcast CG graphics engine with alpha channel key & fill or downstream keyer',
        'Custom scoreboard operator interface for instant point/over updates',
        'Supports sponsor logo loops, match summary cards, and replay wipes',
      ],
    },
    {
      id: 'post-production',
      slug: 'post-production',
      number: '06',
      title: 'Post Production',
      shortDescription:
        'Video editing, color correction, audio cleanup, transitions, and final delivery.',
      fullDescription:
        'Transform raw multi-camera recordings and field footage into polished, broadcast-ready masters. Our post-production suite handles multi-cam timeline assembly, primary and secondary color grading, dialogue noise reduction, motion titles, and multi-format mastering.',
      image: '/images/service-post-production.svg',
      imageAlt: 'Non-linear editing timeline and Lift Gamma Gain color grading wheels interface',
      iconName: 'Sliders',
      benefits: [
        'Tight narrative pacing and multi-camera angle synchronization',
        'Camera-to-camera color matching and calibrated Rec.709 color grading',
        'Broadcast loudness normalization (-14 LUFS / -23 LUFS) and spectral audio cleanup',
      ],
      useCases: [
        'On-demand conference session archives and educational course modules',
        'Highlight reels, social media cutdowns, and promotional trailers',
        'Documentary editing and corporate training series',
      ],
      technicalSpecs: [
        'Multi-cam timecode synchronization and proxy-to-master grading workflow',
        'Custom motion graphics intros, lower thirds, and subtitle caption burn-in / SRT files',
        'Delivery in ProRes, H.264/H.265 MP4, and VOD-ready streaming packages',
      ],
    },
  ] as ServiceItem[],

  advancedFeatures: [
    {
      id: 'led-video-wall',
      title: 'LED Video Wall',
      description:
        'High-brightness modular stage backdrops and side screens configured with live camera IMAG and presentation feeds.',
      availabilityNote: 'Dependent on venue rigging clearance, power capacity, and selected rental package.',
      iconName: 'Monitor',
    },
    {
      id: 'aerial-live-streaming',
      title: 'Aerial Live Streaming',
      description:
        'Elevated outdoor venue perspectives integrated into the live broadcast switcher via wireless ground station receivers.',
      availabilityNote: 'Subject to civil aviation regulations, weather conditions, and airspace permissions.',
      iconName: 'Navigation',
    },
    {
      id: 'video-on-demand',
      title: 'Video On Demand',
      description:
        'Post-event recording processing, chapter indexing, and cloud hosting setup for replay libraries.',
      availabilityNote: 'Requires a configured VOD hosting provider or storage bucket integration.',
      iconName: 'PlaySquare',
    },
    {
      id: 'online-courses',
      title: 'Online Courses',
      description:
        'Multi-angle instructional recording with synchronized slide capture and clean lapel audio for e-learning portals.',
      availabilityNote: 'Delivered as mastered video files or integrated with your existing LMS platform.',
      iconName: 'BookOpen',
    },
    {
      id: 'universal-content-delivery',
      title: 'Universal Content Delivery',
      description:
        'Standards-compliant HLS and MP4 packaging engineered for playback across desktop, iOS, Android, and smart TVs.',
      availabilityNote: 'Global edge caching performance depends on the selected CDN provider.',
      iconName: 'Globe',
    },
    {
      id: 'multi-bitrate-streaming',
      title: 'Multi-Bitrate Live Streaming',
      description:
        'Adaptive bitrate (ABR) transcoding profiles so viewers on varying network speeds experience smooth playback.',
      availabilityNote: 'Requires an ABR-capable cloud transcoding server or CDN ingest workflow.',
      iconName: 'Layers',
    },
    {
      id: 'remote-satellite-connectivity',
      title: 'Remote and Satellite Connectivity',
      description:
        'Bonded cellular multi-SIM routers and portable uplink integration for outdoor or remote event locations.',
      availabilityNote: 'Dependent on carrier coverage or third-party satellite uplink provisioning.',
      iconName: 'Radio',
    },
    {
      id: 'hd-video-streaming',
      title: 'HD Video Streaming',
      description:
        'Crisp 1080p Full HD broadcast pipelines with hardware H.264/HEVC encoding and balanced audio.',
      availabilityNote: 'Requires sustained upstream bandwidth at the event venue.',
      iconName: 'Tv',
    },
    {
      id: 'advanced-live-streaming',
      title: 'Advanced Live Streaming',
      description:
        'Picture-in-picture layouts, remote guest call-in integration, instant replay, and custom stinger transitions.',
      availabilityNote: 'Configured per production complexity and hardware switcher specification.',
      iconName: 'Cpu',
    },
    {
      id: 'website-player-embedding',
      title: 'Website Video Player Embedding',
      description:
        'Responsive HTML5 / HLS embed players configured for integration into your corporate or event microsite.',
      availabilityNote: 'Requires a valid public HLS stream URL and CORS-enabled streaming origin.',
      iconName: 'Code2',
    },
    {
      id: 'ad-free-streaming',
      title: 'Ad-Free Streaming Options',
      description:
        'Private or white-label CDN delivery workflows that eliminate third-party pre-roll advertisements.',
      availabilityNote: 'Requires a dedicated commercial streaming host rather than free consumer platforms.',
      iconName: 'ShieldCheck',
    },
    {
      id: 'technical-support',
      title: 'Technical Support',
      description:
        'On-site broadcast engineers and stream monitoring specialists managing audio, video, and network stability.',
      availabilityNote: 'Included with scheduled production packages during contracted event hours.',
      iconName: 'Headphones',
    },
  ] as FeatureItem[],

  workingProcess: [
    {
      stepNumber: '01',
      title: 'Planning',
      description:
        'Understand the event, target audience, objectives, equipment requirements, and streaming platforms.',
      deliverables: [
        'Venue site survey & camera placement floorplan',
        'Upstream network bandwidth & power assessment',
        'Destination platform & stream key checklist',
      ],
    },
    {
      stepNumber: '02',
      title: 'Testing',
      description:
        'Check cameras, audio, network quality, streaming settings, and destination platforms.',
      deliverables: [
        'Multi-camera SDI/wireless signal stability check',
        'Audio gain staging & PA feed isolation test',
        'Private test stream verification on target endpoints',
      ],
    },
    {
      stepNumber: '03',
      title: 'Creative Development',
      description:
        'Prepare visual identity, overlays, titles, transitions, graphics, and broadcast layouts.',
      deliverables: [
        'Custom lower thirds, nameplates & scorecard templates',
        'Holding slates, countdown timers & sponsor loops',
        'Picture-in-picture & multi-view layout presets',
      ],
    },
    {
      stepNumber: '04',
      title: 'Execute & Deliver',
      description:
        'Run the broadcast, monitor performance, resolve issues, and provide the agreed deliverables.',
      deliverables: [
        'Live vision mixing, CG operation & stream telemetry monitoring',
        'Failover management & real-time audio mastering',
        'Full-resolution program master recording & VOD handover',
      ],
    },
  ] as ProcessStepItem[],

  /**
   * Sample Testimonials & Project Highlights:
   * Clearly identified as sample placeholders so fictional reviews are never misrepresented as verified endorsements.
   */
  testimonialsConfig: {
    defaultMode: 'highlights' as 'highlights' | 'sample_testimonials',
    sampleDisclaimer:
      'Sample placeholder layout for development review. Replace with verified, authorized client feedback in src/config/siteConfig.ts before publishing.',
    sampleTestimonials: [
      {
        id: 'sample-1',
        isSamplePlaceholder: true,
        clientName: 'Sample Client Name (Placeholder)',
        roleOrCompany: 'Event Director · Sample Conference Organization',
        eventContext: 'Multi-Track Hybrid Summit Workflow',
        quote:
          '[Sample Placeholder Feedback] The multi-camera switching and synchronized slide overlays allowed our remote attendees to follow every keynote and panel session clearly.',
      },
      {
        id: 'sample-2',
        isSamplePlaceholder: true,
        clientName: 'Sample Organizer Name (Placeholder)',
        roleOrCompany: 'Tournament Coordinator · Sample Sports League',
        eventContext: 'Regional Tournament Live Scorecard Broadcast',
        quote:
          '[Sample Placeholder Feedback] Having real-time scorebugs, player statistics, and roaming wireless sideline cameras gave our tournament stream a clean broadcast presentation.',
      },
      {
        id: 'sample-3',
        isSamplePlaceholder: true,
        clientName: 'Sample Academic Lead (Placeholder)',
        roleOrCompany: 'Media Coordinator · Sample Educational Institution',
        eventContext: 'Annual Convocation Simulcast',
        quote:
          '[Sample Placeholder Feedback] Graduates and families watching from abroad were able to stream the entire ceremony reliably on both YouTube and our campus portal.',
      },
    ] as SampleTestimonialItem[],
    projectHighlights: [
      {
        id: 'highlight-1',
        title: 'Multi-Camera Conference & Keynote Architecture',
        category: 'Corporate & Institutional',
        workflowSummary:
          'Combines 3–4 SDI broadcast cameras with direct HDMI presentation capture for Picture-in-Picture speaker and slide layouts.',
        technicalSetup: 'Hardware Switcher · Wireless Lapel Feed · Dual RTMP Simulcast',
      },
      {
        id: 'highlight-2',
        title: 'Live Sports Tournament Scorecard & Replay Workflow',
        category: 'Sports & Athletics',
        workflowSummary:
          'Integrates manned boundary cameras, wireless field units, and a dedicated HTML5 CG graphics workstation for live score updates.',
        technicalSetup: 'Wireless SDI · Custom Scorebug Engine · 1080p60 High-Motion Encode',
      },
      {
        id: 'highlight-3',
        title: 'Stage Concert & Cultural Festival Production',
        category: 'Live Entertainment',
        workflowSummary:
          'Links front-of-house soundboard stems with roving gimbal cameras, jib perspectives, and IMAG LED wall routing.',
        technicalSetup: 'Multi-Track Audio Matrix · Low-Latency IMAG · ProRes Master Capture',
      },
    ] as ProjectHighlightItem[],
  },

  streamGalleryItems: [
    {
      id: 'gal-1',
      title: 'Annual Technology Leadership Summit — Multi-Camera Keynote Demo',
      date: '2026-09-18',
      category: 'Conferences & Summits',
      shortDescription:
        'Sample demonstration of a three-camera keynote broadcast with synchronized presentation slide picture-in-picture switching.',
      duration: '14:20',
      resolution: '1080p HD',
      thumbnail: '/images/hero-broadcast-control.svg',
      thumbnailAlt: 'Broadcast control room multi-view monitors showing keynote stage switching',
      isSampleData: true,
      videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      streamType: 'hls',
      productionNotes:
        'Sample HLS stream connected for player verification. Demonstrates adaptive bitrate playback and fullscreen controls.',
    },
    {
      id: 'gal-2',
      title: 'Regional Championship Finals — Live Scorecard & Graphics Demo',
      date: '2026-08-29',
      category: 'Sports & Scorecards',
      shortDescription:
        'Sample showcase illustrating real-time scoreboard overlays, lower-third player statistics, and wireless boundary camera switching.',
      duration: '22:45',
      resolution: '1080p60',
      thumbnail: '/images/service-live-scorecard.svg',
      thumbnailAlt: 'Live sports scoreboard and statistical broadcast graphics overlay',
      isSampleData: true,
      videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      streamType: 'hls',
      productionNotes:
        'Sample demonstration item with live HLS playback source enabled for testing scoreboard layout framing.',
    },
    {
      id: 'gal-3',
      title: 'Enterprise Town Hall & Global Simulcast Workflow',
      date: '2026-07-14',
      category: 'Corporate Events',
      shortDescription:
        'Sample architecture walkthrough of a multi-destination corporate webcast delivered simultaneously to internal portals and social channels.',
      duration: '18:10',
      resolution: '1080p HD',
      thumbnail: '/images/service-simulcast-streaming.svg',
      thumbnailAlt: 'Simulcast streaming encoder routing diagram',
      isSampleData: true,
      productionNotes:
        'Sample catalog entry without an external video file attached—demonstrates clean non-playable specification state.',
    },
    {
      id: 'gal-4',
      title: 'Symphony & Cultural Stage Performance — Wireless Multicam Setup',
      date: '2026-06-05',
      category: 'Cultural & Stage',
      shortDescription:
        'Sample production overview of roaming wireless stage cameras paired with direct digital console audio capture.',
      duration: '31:00',
      resolution: '4K UHD Master',
      thumbnail: '/images/about-multicam-stage.svg',
      thumbnailAlt: 'Broadcast cinema camera with wireless transmitter on stage',
      isSampleData: true,
      videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      streamType: 'hls',
      productionNotes:
        'Sample HLS stream connected to demonstrate stage lighting and audio sync playback controls.',
    },
    {
      id: 'gal-5',
      title: 'Interactive Medical & Engineering Lecture Series — VOD Package',
      date: '2026-05-21',
      category: 'Educational Broadcasts',
      shortDescription:
        'Sample instructional broadcast layout combining close-up demonstration cameras with high-resolution diagram overlays.',
      duration: '45:12',
      resolution: '1080p HD',
      thumbnail: '/images/service-post-production.svg',
      thumbnailAlt: 'Post-production editing timeline and color grading interface',
      isSampleData: true,
      productionNotes:
        'Sample archive entry illustrating educational post-production and chaptered VOD packaging.',
    },
    {
      id: 'gal-6',
      title: 'Immersive 360° Auditorium Showcase & Stage Walkthrough',
      date: '2026-04-11',
      category: 'Conferences & Summits',
      shortDescription:
        'Sample panoramic 360-degree capture workflow designed for virtual venue orientation and interactive front-row viewing.',
      duration: '09:50',
      resolution: '4K Equirectangular',
      thumbnail: '/images/service-360-live.svg',
      thumbnailAlt: '360 degree panoramic live video projection grid',
      isSampleData: true,
      productionNotes:
        'Sample catalog entry demonstrating 360° panoramic workflow documentation.',
    },
  ] as GalleryVideoItem[],

  faqs: [
    {
      id: 'faq-1',
      category: 'Technical & Network',
      question: 'What internet bandwidth is required at the venue for reliable HD live streaming?',
      answer:
        'For a single 1080p Full HD broadcast stream, we recommend a dedicated, wired ethernet connection with at least 15–25 Mbps of sustained upload bandwidth. For multi-platform simulcasting or venues without wired broadband, we can configure bonded cellular 4G/5G routers depending on local carrier signal strength.',
    },
    {
      id: 'faq-2',
      category: 'Production Workflow',
      question: 'How many cameras can be connected in a Wireless Multicam Live setup?',
      answer:
        'Our standard mobile production switcher configurations support between 2 and 8 cameras, combining wired SDI/fiber positions with zero-delay or low-latency wireless camera transmitters for roaming stage and audience coverage.',
    },
    {
      id: 'faq-3',
      category: 'Platforms & Delivery',
      question: 'Can you stream our event to YouTube, Facebook, LinkedIn, and our company website at the same time?',
      answer:
        'Yes. Using our Simulcast Live Streaming workflow, we encode the master program output and distribute it simultaneously to multiple RTMP/RTMPS destinations—including YouTube Live, Facebook Live, LinkedIn Live, and custom embedded HLS web players—provided your organization supplies valid stream keys or admin authorization.',
    },
    {
      id: 'faq-4',
      category: 'Graphics & Scorecards',
      question: 'Are live scorecards and lower-third graphics customized to our branding?',
      answer:
        'Yes. During Phase 03 (Creative Development), we prepare custom broadcast overlays matching your brand colors, typography, and sponsor logos. A dedicated graphics operator updates scores, timers, and speaker titles in real time during the broadcast.',
    },
    {
      id: 'faq-5',
      category: 'Recordings & Post-Production',
      question: 'Do we receive a recording of the live broadcast after the event concludes?',
      answer:
        'Every live production includes a high-bitrate master recording of the switched program feed. If you also require individual camera ISO recordings, color grading, audio mastering, or edited highlight cutdowns, our Post Production team can deliver edited packages.',
    },
  ] as FAQItem[],
};
