import { CategoryInfo, User, Job, Offer, EscrowTransaction, DisputeRecord, ChatMessage } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'tuin',
    nameNl: 'Tuin & Buitenwerken',
    nameFr: 'Jardin & Extérieur',
    iconName: 'Trees',
    description: 'Snoeien, gras maaien, terrasreiniging, tuinaanleg en omheiningen.',
    exampleTasks: ['Hagen snoeien', 'Terras reinigen', 'Bomen vellen', 'Gazon verticuteren']
  },
  {
    id: 'schilder',
    nameNl: 'Schilder- & Behangwerk',
    nameFr: 'Peinture & Tapisserie',
    iconName: 'Paintbrush',
    description: 'Wanden, plafonds, deuren, buitengevels, plamuren en behangen.',
    exampleTasks: ['Woonkamer schilderen', 'Muren plamuren', 'Houtwerk lakken', 'Behangen']
  },
  {
    id: 'sanitair',
    nameNl: 'Sanitair & Loodgieterij',
    nameFr: 'Sanitaire & Plomberie',
    iconName: 'Wrench',
    description: 'Kranen vervangen, lekken opsporen, toilet herstellen en afvoeren.',
    exampleTasks: ['Keukenkraan vernieuwen', 'Afvoer ontstoppen', 'Toilet installeren', 'Kitranden']
  },
  {
    id: 'elektro',
    nameNl: 'Elektriciteit & Verlichting',
    nameFr: 'Électricité & Éclairage',
    iconName: 'Zap',
    description: 'Stopcontacten, zekeringskasten, lampen aansluiten en storingen zoeken.',
    exampleTasks: ['Stopcontacten bijplaatsen', 'Hanglamp monteren', 'Zekeringskast keuren', 'Kabelgoten']
  },
  {
    id: 'montage',
    nameNl: 'Montage & Meubels',
    nameFr: 'Montage & Meubles',
    iconName: 'Hammer',
    description: 'IKEA meubels monteren, maatkasten, tv-ophanging en timmerwerk.',
    exampleTasks: ['IKEA Pax kast bouwen', 'Tv-beugel muur', 'Deuren afhangen', 'Plank ophangen']
  },
  {
    id: 'vloeren',
    nameNl: 'Vloeren & Tegelwerk',
    nameFr: 'Sols & Carrelage',
    iconName: 'Grid',
    description: 'Laminaat, parket leggen, plinten plaatsen en wandtegels zetten.',
    exampleTasks: ['Laminaat leggen (slaapkamer)', 'Plinten plaatsen', 'Tegelreparatie spatwand']
  },
  {
    id: 'dieren',
    nameNl: 'Dierenverzorging & Hulp',
    nameFr: 'Soins des Animaux',
    iconName: 'Dog',
    description: 'Honden uitlaten, dierenverblijf bouwen, oppas aan huis en verzorging.',
    exampleTasks: ['Hondenuitlaatservice', 'Kippenhok timmeren', 'Kattenoppas tijdens vakantie']
  },
  {
    id: 'algemeen',
    nameNl: 'Algemene Klussen & Fixes',
    nameFr: 'Bricolage Général',
    iconName: 'Settings',
    description: 'Kleine herstellingen in en om het huis, boorwerk en gordijnroedes.',
    exampleTasks: ['Gordijnen ophangen', 'Scharnier herstellen', 'Rookmelders plaatsen', 'Zolder opruimen']
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'client-sarah',
    name: 'Sarah Peeters',
    email: 'sarah.peeters@gmail.com',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    phone: '+32 478 12 34 56',
    city: 'Antwerpen',
    postalCode: '2000',
    country: 'BE',
    idVerified: true,
    nationalRegisterNumber: '89.04.12-234.56',
    rating: 4.9,
    completedJobsCount: 8,
    walletBalance: 0,
    pendingEscrowBalance: 0,
    hasActiveSubscription: true,
    subscriptionExpiresAt: '2027-11-06'
  },
  {
    id: 'performer-dirk',
    name: 'Dirk Van Dijck',
    email: 'dirk.vandijck@telenet.be',
    role: 'performer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    phone: '+32 486 45 78 90',
    city: 'Mechelen',
    postalCode: '2800',
    country: 'BE',
    performerStatus: 'bijberoep',
    vatNumber: 'BE 0789.654.321',
    idVerified: true,
    nationalRegisterNumber: '78.09.23-112.44',
    bio: 'Ervaren elektricien en all-round vakman in bijberoep. Meer dan 12 jaar praktijkervaring. Punctueel, netjes opgeruimd en altijd conform de AREI-normen.',
    selectedCategories: ['elektro', 'sanitair', 'montage', 'algemeen'],
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.95,
    completedJobsCount: 34,
    walletBalance: 615,
    pendingEscrowBalance: 378
  },
  {
    id: 'performer-youssef',
    name: 'Youssef Benali',
    email: 'youssef.klusser@gmail.com',
    role: 'performer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    phone: '+32 499 87 65 43',
    city: 'Antwerpen',
    postalCode: '2018',
    country: 'BE',
    performerStatus: 'particulier',
    idVerified: true,
    nationalRegisterNumber: '92.11.05-321.78',
    bio: 'Gemotiveerde particulier in het officiële deeleconomiestelsel. Gespecialiseerd in tuinonderhoud, heggen snoeien, terrasreinigen en montagewerk.',
    selectedCategories: ['tuin', 'dieren', 'montage', 'algemeen'],
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592417817098-8f3d69104a49?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 4.88,
    completedJobsCount: 19,
    walletBalance: 240,
    pendingEscrowBalance: 0
  },
  {
    id: 'performer-marc',
    name: 'Marc Claes',
    email: 'info@claes-afwerking.be',
    role: 'performer',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    phone: '+32 475 33 22 11',
    city: 'Gent',
    postalCode: '9000',
    country: 'BE',
    performerStatus: 'hoofdberoep',
    vatNumber: 'BE 0456.123.789',
    idVerified: true,
    nationalRegisterNumber: '68.03.14-099.12',
    bio: 'Zelfstandig meester-schilder in hoofdberoep. Hoogwaardige afwerking van binnenmuren, trappenhuizen en lakwerk met milieuvriendelijke Sigma verven.',
    selectedCategories: ['schilder', 'vloeren'],
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'
    ],
    rating: 5.0,
    completedJobsCount: 52,
    walletBalance: 1250,
    pendingEscrowBalance: 420
  },
  {
    id: 'admin-luc',
    name: 'Luc Wouters (Admin)',
    email: 'admin@klusgarant.be',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    city: 'Brussel',
    postalCode: '1000',
    country: 'BE',
    idVerified: true,
    rating: 5.0,
    completedJobsCount: 0,
    walletBalance: 0,
    pendingEscrowBalance: 0
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    clientId: 'client-sarah',
    clientName: 'Sarah Peeters',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    clientRating: 4.9,
    title: 'Grote herfsttuinbeurt: hagen snoeien & bladeren afvoeren',
    category: 'tuin',
    description: 'We zoeken een ervaren tuinman om onze laurierhaag (ongeveer 35 meter lang, 2.2 meter hoog) strak terug te snoeien voor de winter. Ook moeten de takken en afgevallen bladeren netjes versnipperd of meegenomen worden. Eigen degelijk gereedschap vereist.',
    photos: [
      'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592417817098-8f3d69104a49?w=900&auto=format&fit=crop&q=80'
    ],
    city: 'Antwerpen (Zuid)',
    postalCode: '2000',
    exactAddressHidden: 'Kloosterstraat 42, 2000 Antwerpen',
    targetDate: 'Binnen 10 dagen',
    budgetEstimate: 180,
    status: 'open',
    createdAt: '2026-11-05T09:30:00Z'
  },
  {
    id: 'job-2',
    clientId: 'client-sarah',
    clientName: 'Sarah Peeters',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    clientRating: 4.9,
    title: 'Schilderen woonkamer & traphal (wanden + plafond strak wit)',
    category: 'schilder',
    description: 'Volledige woonkamer van ca. 45m² grondoppervlakte en de aansluitende traphal voorzien van twee dekkende lagen kwaliteitsverf (RAL 9010). Muren zijn reeds behangklaar gemaakt. Verf en tape zijn aanwezig of kunnen in overleg verrekend worden.',
    photos: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&auto=format&fit=crop&q=80'
    ],
    city: 'Gent',
    postalCode: '9000',
    exactAddressHidden: 'Vlaanderenstraat 18, 9000 Gent',
    targetDate: '15 november 2026',
    budgetEstimate: 420,
    status: 'in_escrow',
    createdAt: '2026-11-02T14:15:00Z',
    acceptedOfferId: 'offer-201',
    acceptedPerformerId: 'performer-marc',
    acceptedAmount: 420,
    escrowPaidAt: '2026-11-03T10:00:00Z'
  },
  {
    id: 'job-3',
    clientId: 'client-sarah',
    clientName: 'Sarah Peeters',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    clientRating: 4.9,
    title: 'Plaatsen 6 extra dubbele stopcontacten + uitbreiding zekeringskast',
    category: 'elektro',
    description: 'In onze bureaukamer en keuken moeten 6 dubbele stopcontacten worden bijgeplaatst en aangesloten op een nieuwe automaat in de zekeringskast. Werk is zojuist afgerond door Dirk en gekeurd!',
    photos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&auto=format&fit=crop&q=80'
    ],
    city: 'Hasselt',
    postalCode: '3500',
    exactAddressHidden: 'Koning Albertstraat 12, 3500 Hasselt',
    targetDate: 'Voltooid',
    budgetEstimate: 350,
    status: 'completed_pending_review',
    createdAt: '2026-11-01T11:00:00Z',
    acceptedOfferId: 'offer-301',
    acceptedPerformerId: 'performer-dirk',
    acceptedAmount: 350,
    escrowPaidAt: '2026-11-02T08:30:00Z',
    markedCompletedAt: '2026-11-06T04:00:00Z',
    // 72 hours from completion
    inspectionTimerExpiresAt: '2026-11-09T04:00:00Z'
  },
  {
    id: 'job-4',
    clientId: 'client-sarah',
    clientName: 'Sarah Peeters',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    clientRating: 4.9,
    title: 'Vervangen thermostatische douchekraan & kitvoegen badkamer',
    category: 'sanitair',
    description: 'Onze oude Grohe douchekraan lekte. Uitvoerder heeft een nieuwe kraan gemonteerd, maar de koppeling drupt nog na en de siliconen kitrand is niet overal sluitend.',
    photos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&auto=format&fit=crop&q=80'
    ],
    city: 'Leuven',
    postalCode: '3000',
    exactAddressHidden: 'Bondgenotenlaan 88, 3000 Leuven',
    targetDate: 'Met spoed',
    budgetEstimate: 160,
    status: 'disputed',
    createdAt: '2026-10-28T16:00:00Z',
    acceptedOfferId: 'offer-401',
    acceptedPerformerId: 'performer-dirk',
    acceptedAmount: 160,
    escrowPaidAt: '2026-10-29T10:00:00Z',
    markedCompletedAt: '2026-11-04T12:00:00Z',
    disputeReason: 'De douchekraan vertoont nog steeds druppellekkage bij de S-koppeling en de nieuwe kitnaad laat op twee plekken los. Graag herstel of teruggave.',
    disputeEvidencePhotos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'job-5',
    clientId: 'client-sarah',
    clientName: 'Sarah Peeters',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    clientRating: 4.9,
    title: 'IKEA Pax kledingkast monteren met schuifdeuren (2.50m breed)',
    category: 'montage',
    description: 'Drie corpussen van IKEA Pax moeten gemonteerd worden met glazen schuifdeuren en 6 lades. Alle pakketten staan reeds netjes in de slaapkamer op de 1e verdieping klaar.',
    photos: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&auto=format&fit=crop&q=80'
    ],
    city: 'Brussel (Elsene)',
    postalCode: '1050',
    exactAddressHidden: 'Avenue Louise 140, 1050 Elsene',
    targetDate: 'Zaterdag a.s.',
    budgetEstimate: 150,
    status: 'open',
    createdAt: '2026-11-06T08:00:00Z'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  // 3 blind offers for Job 1
  {
    id: 'offer-101',
    jobId: 'job-1',
    performerId: 'performer-youssef',
    performerName: 'Youssef Benali',
    performerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    performerStatus: 'particulier',
    performerRating: 4.88,
    performerCompletedJobs: 19,
    isIdVerified: true,
    amount: 170,
    durationEstimate: 'Ongeveer 4 uur',
    message: 'Dag Sarah, ik kan dit zaterdag al komen doen! Ik neem mijn professionele heggenschaar en bladblazer mee. Afval kan ik direct in bio-zakken stoppen of meenemen.',
    createdAt: '2026-11-05T11:20:00Z',
    status: 'pending',
    lifecycleStatus: 'gezien',
    seenAt: '2026-11-05T14:30:00Z'
  },
  {
    id: 'offer-102',
    jobId: 'job-1',
    performerId: 'performer-dirk',
    performerName: 'Dirk Van Dijck',
    performerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    performerStatus: 'bijberoep',
    performerVatNumber: 'BE 0789.654.321',
    performerRating: 4.95,
    performerCompletedJobs: 34,
    isIdVerified: true,
    amount: 195,
    durationEstimate: 'Halve dag (met aanhangwagen)',
    message: 'Beste Sarah, als zelfstandige in bijberoep verzorg ik dit inclusief officiële factuur en afvoer met gesloten aanhangwagen. Volledig netjes opgeruimd gegarandeerd.',
    createdAt: '2026-11-05T13:45:00Z',
    status: 'pending',
    lifecycleStatus: 'nieuw'
  },
  {
    id: 'offer-103',
    jobId: 'job-1',
    performerId: 'performer-marc',
    performerName: 'Marc Claes',
    performerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    performerStatus: 'hoofdberoep',
    performerVatNumber: 'BE 0456.123.789',
    performerRating: 5.0,
    performerCompletedJobs: 52,
    isIdVerified: true,
    amount: 220,
    durationEstimate: '1 werkdag met 2 man',
    message: 'Wij kunnen begin volgende week langskomen met 2 man om de haag grondig terug te zetten en alle snoeihout direct te verhakselen.',
    createdAt: '2026-11-05T16:10:00Z',
    status: 'pending',
    lifecycleStatus: 'nieuw'
  },
  // Accepted offer for Job 2
  {
    id: 'offer-201',
    jobId: 'job-2',
    performerId: 'performer-marc',
    performerName: 'Marc Claes',
    performerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    performerStatus: 'hoofdberoep',
    performerVatNumber: 'BE 0456.123.789',
    performerRating: 5.0,
    performerCompletedJobs: 52,
    isIdVerified: true,
    amount: 420,
    durationEstimate: '2 dagen',
    message: 'Vaste prijs voor 2 lagen afwerking inclusief afplakken en schoon opleveren.',
    createdAt: '2026-11-02T16:00:00Z',
    status: 'accepted',
    lifecycleStatus: 'geaccepteerd',
    seenAt: '2026-11-02T17:00:00Z'
  },
  // Completed offer for Job 3
  {
    id: 'offer-301',
    jobId: 'job-3',
    performerId: 'performer-dirk',
    performerName: 'Dirk Van Dijck',
    performerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    performerStatus: 'bijberoep',
    performerVatNumber: 'BE 0789.654.321',
    performerRating: 4.95,
    performerCompletedJobs: 34,
    isIdVerified: true,
    amount: 350,
    durationEstimate: '1 dag',
    message: 'Alles volgens AREI normen aangelegd en doorgemeten met aardingsmeter.',
    createdAt: '2026-11-01T14:00:00Z',
    status: 'accepted',
    lifecycleStatus: 'geaccepteerd',
    seenAt: '2026-11-01T15:00:00Z'
  },
  // Disputed offer for Job 4
  {
    id: 'offer-401',
    jobId: 'job-4',
    performerId: 'performer-dirk',
    performerName: 'Dirk Van Dijck',
    performerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    performerStatus: 'bijberoep',
    performerVatNumber: 'BE 0789.654.321',
    performerRating: 4.95,
    performerCompletedJobs: 34,
    isIdVerified: true,
    amount: 160,
    durationEstimate: '2 uur',
    message: 'Montage en afkitten douchekraan.',
    createdAt: '2026-10-28T18:00:00Z',
    status: 'accepted',
    lifecycleStatus: 'geaccepteerd',
    seenAt: '2026-10-28T19:00:00Z'
  },
  // Offer for Job 5
  {
    id: 'offer-501',
    jobId: 'job-5',
    performerId: 'performer-youssef',
    performerName: 'Youssef Benali',
    performerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    performerStatus: 'particulier',
    performerRating: 4.88,
    performerCompletedJobs: 19,
    isIdVerified: true,
    amount: 140,
    durationEstimate: '3 tot 4 uur',
    message: 'Ik heb al tientallen Pax kasten opgebouwd, inclusief schuifdeuren en dempers. Zaterdagmorgen ben ik beschikbaar!',
    createdAt: '2026-11-06T09:00:00Z',
    status: 'pending',
    lifecycleStatus: 'nieuw'
  }
];

export const INITIAL_TRANSACTIONS: EscrowTransaction[] = [
  {
    id: 'tx-201',
    jobId: 'job-2',
    jobTitle: 'Schilderen woonkamer & traphal',
    clientId: 'client-sarah',
    clientName: 'Sarah Peeters',
    performerId: 'performer-marc',
    performerName: 'Marc Claes',
    totalAmount: 420,
    platformFee: 42, // 10%
    performerPayout: 378, // 90%
    status: 'in_escrow',
    paidAt: '2026-11-03T10:00:00Z'
  },
  {
    id: 'tx-301',
    jobId: 'job-3',
    jobTitle: 'Plaatsen 6 extra dubbele stopcontacten',
    clientId: 'client-sarah',
    clientName: 'Sarah Peeters',
    performerId: 'performer-dirk',
    performerName: 'Dirk Van Dijck',
    totalAmount: 350,
    platformFee: 35, // 10%
    performerPayout: 315, // 90%
    status: 'in_escrow',
    paidAt: '2026-11-02T08:30:00Z'
  },
  {
    id: 'tx-401',
    jobId: 'job-4',
    jobTitle: 'Vervangen thermostatische douchekraan',
    clientId: 'client-sarah',
    clientName: 'Sarah Peeters',
    performerId: 'performer-dirk',
    performerName: 'Dirk Van Dijck',
    totalAmount: 160,
    platformFee: 16, // 10%
    performerPayout: 144, // 90%
    status: 'frozen_in_dispute',
    paidAt: '2026-10-29T10:00:00Z'
  }
];

export const INITIAL_DISPUTES: DisputeRecord[] = [
  {
    id: 'disp-401',
    jobId: 'job-4',
    jobTitle: 'Vervangen thermostatische douchekraan & kitvoegen badkamer',
    clientId: 'client-sarah',
    clientName: 'Sarah Peeters',
    performerId: 'performer-dirk',
    performerName: 'Dirk Van Dijck',
    amount: 160,
    reason: 'De douchekraan vertoont nog steeds druppellekkage bij de S-koppeling en de nieuwe kitnaad laat op twee plekken los. Graag herstel of teruggave.',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&auto=format&fit=crop&q=80'
    ],
    openedAt: '2026-11-04T15:30:00Z',
    status: 'open',
    adminNotes: 'In afwachting van reactie van Dirk Van Dijck over herstelbezoek binnen 48 uur.'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    jobId: 'job-3',
    senderId: 'client-sarah',
    senderName: 'Sarah Peeters',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    text: 'Dag Dirk, super bedankt voor de snelle reactie. We kijken uit naar zaterdag.',
    createdAt: '2026-11-02T09:00:00Z'
  },
  {
    id: 'msg-2',
    jobId: 'job-3',
    senderId: 'performer-dirk',
    senderName: 'Dirk Van Dijck',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    text: 'Met plezier Sarah! Ik breng de Niko stopcontacten en automaten mee. Tot zaterdag 8:30u!',
    createdAt: '2026-11-02T09:15:00Z'
  },
  {
    id: 'msg-3',
    jobId: 'job-3',
    senderId: 'system',
    senderName: 'KlusGarant Systeem',
    senderAvatar: '',
    text: '🔒 KlusGarant Escrow: Het bedrag van € 350,- staat veilig in depot. Na voltooiing heeft de klant 72 uur om het werk te inspecteren.',
    createdAt: '2026-11-02T09:16:00Z',
    isSystemMessage: true
  },
  {
    id: 'msg-4',
    jobId: 'job-3',
    senderId: 'performer-dirk',
    senderName: 'Dirk Van Dijck',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    text: 'Alles is afgewerkt en getest! Ik heb de klus als voltooid gemarkeerd in de app.',
    createdAt: '2026-11-06T04:00:00Z'
  }
];
