// ─────────────────────────────────────────────────────────────
//  Single source of truth for portfolio content.
//  Edit this file to update the site — no other changes needed.
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'MD Faruk Al Mahmud',
  title: 'Project Lead & Senior Backend Engineer',
  company: 'SOFOF Tech',
  location: 'Dhaka, Bangladesh',
  email: 'towhid139@gmail.com',
  github: 'https://github.com/MechaMahmud71',
  githubHandle: 'MechaMahmud71',
  linkedin: 'https://www.linkedin.com/in/almahmud71/',
  linkedinHandle: 'almahmud71',
  resume: 'resume.pdf', // drop your PDF next to index.html with this name
  roles: [
    'Project Lead',
    'Senior Backend Engineer',
    'Microservices Architect',
    'Database Optimizer',
    'Real-time Systems Builder',
    'Full-Stack Developer',
  ],
  summary:
    'Software engineer with 5+ years of experience building scalable backend systems and full-stack applications. ' +
    'Specialized in microservices architecture, database optimization and real-time notification systems. ' +
    'Achieved a 200% query performance improvement on 10+ million records through strategic indexing and caching.',
};

// Jobs from the CV, plus newer roles added from LinkedIn (SOFOF Tech).
//   roles → several titles held at the same company (newest first)
//   mode / type → optional work arrangement / employment type
export const EXPERIENCE = [
  {
    company: 'SOFOF Tech',
    role: 'Project Lead',
    // Project Lead bullets are from Faruk; Senior Backend Engineer bullets are still a DRAFT.
    roles: [
      {
        title: 'Project Lead',
        period: 'Sep 2026 — Present',
        points: [
          'Lead and manage the software development team, ensuring effective task distribution, collaboration and team performance.',
          'Plan, prioritize and oversee project activities to ensure timely delivery within defined scope and requirements.',
          'Provide technical leadership by guiding architecture, technology selection, database design and engineering best practices.',
          'Establish and maintain SDLC processes, including requirement analysis, technical documentation, development, testing, code review and deployment.',
          'Ensure code quality, application security, scalability, performance and maintainability through effective engineering standards and reviews.',
          'Coordinate with Project Managers, business stakeholders, UI/UX designers and QA teams to align technical execution with business objectives.',
          'Mentor developers, resolve technical challenges, manage project risks and continuously improve team productivity and delivery processes.',
        ],
      },
      {
        title: 'Senior Backend Engineer',
        period: 'Jun 2026 — Present',
        points: [
          'Own backend architecture and system design for the platform’s microservices.',
          'Run containerized services on AWS ECS Fargate, with SQS for async messaging and Lambda for event-driven jobs.',
          'Use MinIO for S3-compatible object storage across environments.',
        ],
      },
    ],
    period: 'Jun 2026 — Present',
    location: 'Rajshahi, Bangladesh',
    mode: 'Remote',
    type: 'Full-time',
    current: true,
    stack: ['Node.js', 'NestJS', 'TypeScript', 'Microservices', 'AWS ECS Fargate', 'AWS SQS', 'AWS Lambda', 'MinIO', 'Docker', 'PostgreSQL', 'Redis', 'Jira'],
    points: [],
  },
  {
    company: 'As Sunnah Foundation',
    role: 'Senior Backend Engineer',
    period: 'Apr 2025 — Feb 2026',
    location: 'Dhaka, Bangladesh',
    stack: ['Node.js', 'MongoDB', 'PostgreSQL', 'Redis', 'BullMQ', 'Python', 'FastAPI'],
    points: [
      'Optimized MongoDB aggregation pipelines and implemented strategic indexes, achieving 200% query performance improvement on 10M+ records.',
      'Designed scheduled caching strategies for analytics data, reducing dashboard load times to sub-second response.',
      'Built a donation analytics platform with complex aggregation queries, timezone-aware reporting and real-time metrics.',
      'Redesigned authentication and notification services, improving reliability and reducing maintenance overhead.',
      'Developed ETL pipelines using Python and FastAPI for automated data processing and migration workflows.',
      'Implemented distributed job queues with Redis and BullMQ for background processing and data synchronization.',
      'Architected scalable PostgreSQL and MongoDB data models in collaboration with product stakeholders.',
    ],
  },
  {
    company: 'Mind Orbital Technologies',
    role: 'Software Engineer',
    period: 'Mar 2024 — Apr 2024',
    location: 'Dhaka, Bangladesh',
    stack: ['TypeScript', 'Node.js', 'Angular', 'PostgreSQL', 'MongoDB'],
    points: [
      'Developed and maintained web applications using TypeScript, Node.js and Angular with a focus on code quality.',
      'Architected efficient PostgreSQL and MongoDB structures, improving query performance and data integrity.',
      'Implemented caching strategies and horizontal scaling techniques to handle increased load.',
      'Collaborated with product owners, designers and cross-functional teams to deliver on schedule.',
      'Identified and resolved software issues, reducing downtime and improving stability.',
    ],
  },
  {
    company: 'Zaynax Health',
    role: 'Software Engineer',
    period: 'Oct 2022 — Feb 2024',
    location: 'Dhaka, Bangladesh',
    stack: ['Node.js', 'NestJS', 'Microservices', 'WebSocket', 'Redis', 'MongoDB'],
    points: [
      'Architected microservices-based solutions, enabling seamless scalability and modular development.',
      'Designed and built a real-time notification service using WebSockets for instant user communication.',
      'Developed security layers — rate limiting and threat detection — to stop spam and malicious traffic.',
      'Optimized database servers and implemented monitoring tools, improving performance and observability.',
      'Implemented Redis caching and load balancing for high-availability systems.',
      'Refactored the legacy codebase, reducing technical debt and improving maintainability.',
      'Collaborated with frontend, mobile and stakeholders to deliver features within deadlines.',
    ],
  },
  {
    company: 'Kalpas Innovations',
    role: 'Software Engineer',
    period: 'Apr 2022 — Oct 2022',
    location: 'Karnataka, India',
    stack: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    points: [
      'Developed responsive user interfaces using React, HTML5, CSS3 and JavaScript.',
      'Optimized page performance through lazy loading, image optimization and request minimization.',
      'Worked with UX designers to ship pixel-perfect designs and smoother interactions.',
      'Ensured cross-browser compatibility and mobile responsiveness across all applications.',
      'Applied frontend best practices including component reusability and state management.',
    ],
  },
  {
    company: 'NETSOFTUK Limited',
    role: 'Full Stack Developer',
    period: 'Jul 2021 — Mar 2022',
    location: 'Newcastle, United Kingdom',
    stack: ['Node.js', 'Express', 'SQL', 'NoSQL'],
    points: [
      'Designed and developed RESTful APIs and server-side applications using Node.js and Express.',
      'Created and maintained SQL and NoSQL databases with optimized queries and strong data integrity.',
      'Implemented end-to-end features from database design to frontend implementation.',
      'Improved web performance through code optimization and caching strategies.',
    ],
  },
  {
    company: 'Manaknightdigital',
    role: 'Full Stack Developer',
    period: 'Apr 2021 — May 2022',
    location: 'Ontario, Canada',
    stack: ['Node.js', 'Express', 'REST'],
    points: [
      'Developed and maintained RESTful APIs using Node.js and Express for client applications.',
      'Refactored legacy code, improving readability and reducing technical debt.',
      'Wrote clean, documented and tested code; collaborated across multiple time zones.',
    ],
  },
  {
    company: 'SoftLab IT',
    role: 'Software Engineer',
    period: 'Feb 2021 — Apr 2021',
    location: 'Dhaka, Bangladesh',
    stack: ['Node.js', 'REST'],
    points: [
      'Designed and built RESTful APIs using Node.js for client-facing applications.',
      'Collaborated with frontend and backend developers to deliver integrated solutions.',
      'Maintained legacy systems and provided technical support for existing clients.',
    ],
  },
];

// Software teams worked with (internships excluded) — used in stats, boot log and 3D tooltip
export const TEAM_COUNT = EXPERIENCE.filter((j) => j.type !== 'Internship').length;

// ⚠ Verify these URLs — they were not in the resume text.
export const PROJECTS = [
  {
    name: 'Zaynax Health',
    slug: 'zaynax-health',
    kicker: 'HealthTech platform',
    url: 'https://zaynax.health',
    description:
      'A healthcare platform streamlining patient–doctor interactions and digital health records, with real-time tracking and a high-performance search engine.',
    highlights: ['Real-time WebSocket notifications', 'Typesense-powered search', 'Rate limiting & OTP abuse protection'],
    stack: ['Node.js', 'NestJS', 'React', 'MongoDB', 'Typesense', 'Redis', 'Docker', 'AWS'],
  },
  {
    name: 'HishabPati',
    slug: 'hishabpati',
    kicker: 'FinTech · smart ledger',
    url: 'https://hishabpati.com',
    description:
      'A digital transaction and book-keeping platform that helps small to mid-range traders manage daily business — across desktop and mobile, online or offline.',
    highlights: ['Offline-first, multi-device ledger', 'Transaction & book-keeping engine', 'Built for small traders'],
    stack: ['Node.js', 'NestJS', 'Angular', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
  },
  {
    name: 'As Sunnah Foundation',
    slug: 'as-sunnah-foundation',
    kicker: 'Non-profit · analytics',
    url: 'https://assunnahfoundation.org',
    description:
      'Platform for a non-profit dedicated to education, disaster relief, clean water and skills training — with donation analytics at its core.',
    highlights: ['200% faster aggregations on 10M+ records', 'Timezone-aware donation analytics', 'BullMQ job queues & Python ETL'],
    stack: ['Node.js', 'NestJS', 'React', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker'],
  },
];

export const SKILL_CATEGORIES = {
  backend: { label: 'Back-end', color: '#00f0ff' },
  data: { label: 'Data & Search', color: '#ff2bd6' },
  frontend: { label: 'Front-end', color: '#39ff88' },
  infra: { label: 'DevOps', color: '#ffb800' },
  lang: { label: 'Languages', color: '#9d8cff' },
  lead: { label: 'Leadership', color: '#ffd166' },
  craft: { label: 'Architecture', color: '#ff7a59' },
  tools: { label: 'Tooling', color: '#7fb2ff' },
};

// node: true → appears as a live node in the 3D graph
export const SKILLS = [
  { label: 'Node.js', cat: 'backend', node: true, info: 'Primary runtime since 2021 — REST APIs, workers and real-time services.' },
  { label: 'NestJS', cat: 'backend', node: true, info: 'Modular microservices behind Zaynax Health, HishabPati and As Sunnah.' },
  { label: 'Express', cat: 'backend', info: 'RESTful APIs for clients in the UK and Canada.' },
  { label: 'FastAPI', cat: 'backend', node: true, info: 'Python ETL pipelines for automated data processing and migration.' },
  { label: 'WebSocket', cat: 'backend', node: true, info: 'Real-time notification service at Zaynax Health.' },
  { label: 'BullMQ', cat: 'backend', node: true, info: 'Distributed job queues for background tasks and data sync.' },
  { label: 'Microservices', cat: 'backend', node: true, info: 'Service-oriented backends at Zaynax Health and SOFOF Tech.' },
  { label: 'REST APIs', cat: 'backend', info: 'API design across every role since 2021.' },
  { label: 'Laravel', cat: 'backend', info: 'PHP back-end framework.' },
  { label: 'MongoDB', cat: 'data', node: true, info: 'Aggregation pipelines + strategic indexes → 200% faster on 10M+ records.' },
  { label: 'PostgreSQL', cat: 'data', node: true, info: 'Relational modelling for scalable, integrity-first data.' },
  { label: 'Redis', cat: 'data', node: true, info: 'Caching, rate limiting and the backbone of job queues.' },
  { label: 'Typesense', cat: 'data', node: true, info: 'High-performance search engine for Zaynax Health.' },
  { label: 'Elasticsearch', cat: 'data', node: true, info: 'Full-text search and analytics.' },
  { label: 'MySQL', cat: 'data', info: 'Relational database work across client projects.' },
  { label: 'MinIO', cat: 'data', info: 'S3-compatible object storage.' },
  { label: 'React', cat: 'frontend', node: true, info: 'Responsive, component-driven UIs.' },
  { label: 'Next.js', cat: 'frontend', node: true, info: 'Server-rendered React applications.' },
  { label: 'Angular', cat: 'frontend', node: true, info: 'Enterprise front-ends with TypeScript (HishabPati, Mind Orbital).' },
  { label: 'AngularJS', cat: 'frontend', info: 'Legacy front-ends at SoftLab IT.' },
  { label: 'Redux', cat: 'frontend', info: 'Predictable state management for React apps.' },
  { label: 'Docker', cat: 'infra', node: true, info: 'Containerized services from dev to production.' },
  { label: 'AWS', cat: 'infra', node: true, info: 'Cloud infrastructure for production workloads.' },
  { label: 'ECS Fargate', cat: 'infra', node: true, info: 'Serverless containers on AWS — no servers to manage.' },
  { label: 'SQS', cat: 'infra', node: true, info: 'AWS message queues for decoupled, async services.' },
  { label: 'Lambda', cat: 'infra', node: true, info: 'Event-driven serverless functions on AWS.' },
  { label: 'Nginx', cat: 'infra', node: true, info: 'Reverse proxy and load balancing.' },
  { label: 'Linux', cat: 'infra', node: true, info: 'Home turf for servers and tooling.' },
  { label: 'CI/CD', cat: 'infra', info: 'Automated build, test and deploy pipelines.' },
  { label: 'TypeScript', cat: 'lang', node: true, info: 'Default language for typed, maintainable Node.js and Angular code.' },
  { label: 'Python', cat: 'lang', node: true, info: 'ETL, data processing and FastAPI services.' },
  { label: 'JavaScript', cat: 'lang', info: 'Where it all started.' },
  { label: 'PHP', cat: 'lang', info: 'Laravel back-ends.' },
  { label: 'C/C++', cat: 'lang', info: 'Foundations from engineering school.' },
  { label: 'Technical Leadership', cat: 'lead', node: true, info: 'Guiding architecture, technology selection, database design and engineering best practices as Project Lead at SOFOF Tech.' },
  { label: 'Project Management', cat: 'lead', info: 'Planning, prioritizing and overseeing delivery within scope and on time.' },
  { label: 'SDLC', cat: 'lead', info: 'Requirement analysis, documentation, development, testing, code review and deployment.' },
  { label: 'Agile / Scrum', cat: 'lead', info: 'Sprint planning, stand-ups and retrospectives.' },
  { label: 'Stakeholder Management', cat: 'lead', info: 'Aligning PMs, business stakeholders, UI/UX and QA with technical execution.' },
  { label: 'Risk Management', cat: 'lead', info: 'Spotting and managing project risks before they hit delivery.' },
  { label: 'Mentoring', cat: 'lead', info: 'Mentoring developers and resolving technical challenges.' },
  { label: 'Code Review', cat: 'lead', info: 'Engineering standards for quality, security, performance and maintainability.' },
  { label: 'System Design', cat: 'craft', node: true, info: 'Designing services, data flow and scaling strategy before writing code.' },
  { label: 'Software Architecture', cat: 'craft', info: 'Clear boundaries and dependency direction — no circular dependencies.' },
  { label: 'Database Design', cat: 'craft', info: 'Schemas and indexes built for the queries that matter.' },
  { label: 'Clean Code', cat: 'craft', info: 'Readable, well-documented and resilient code.' },
  { label: 'Git', cat: 'tools', info: 'Version control, every day.' },
  { label: 'GitLab', cat: 'tools', info: 'Repos and CI at NETSOFTUK.' },
  { label: 'Bitbucket', cat: 'tools', info: 'Repos at Mind Orbital.' },
  { label: 'Jira', cat: 'tools', info: 'Sprint planning and issue tracking.' },
];

export const EDUCATION = {
  school: 'Military Institute of Science and Technology (MIST)',
  degree: 'B.Sc. in Mechanical Engineering',
  period: '2017 — 2021',
  location: 'Dhaka, Bangladesh',
};

export const ACHIEVEMENTS = [
  {
    title: 'Employee of the Month',
    org: 'Zaynax Health',
    date: 'Jan 2023',
    detail: 'Security layers that stopped OTP API spam (and cut its cost) + a redesigned real-time push notification service.',
  },
  { title: '3rd Place', org: 'MIST Intra-Department Project Showcase', date: '2019' },
  { title: 'Finalist', org: 'MIST Robolution — Line Follower', date: '2018' },
];

// "Follow the request" scroll story — one hop per layer of the stack.
// Every claim maps to a CV bullet; edit freely.
export const FLOW = [
  {
    stage: 'edge',
    tech: 'Nginx · rate limiting · threat detection',
    title: 'Stop abuse at the edge',
    story: 'Security layers in front of open OTP APIs stopped spam traffic and cut its cost — the work behind my Employee of the Month award.',
    metric: 'OTP spam blocked',
    where: 'Zaynax Health',
    color: '#ffb800',
  },
  {
    stage: 'services',
    tech: 'NestJS · microservices · load balancing',
    title: 'Route it to the right service',
    story: 'Microservices let each domain scale and ship on its own, behind load-balanced, high-availability infrastructure.',
    metric: 'independently scalable',
    where: 'Zaynax Health',
    color: '#00f0ff',
  },
  {
    stage: 'cache',
    tech: 'Redis · scheduled caching',
    title: 'Answer from memory first',
    story: 'Scheduled caching for heavy analytics means most dashboard requests never touch the database.',
    metric: 'sub-second dashboards',
    where: 'As Sunnah Foundation',
    color: '#ff5a5a',
  },
  {
    stage: 'database',
    tech: 'MongoDB · PostgreSQL · indexing',
    title: 'Make 10M rows feel small',
    story: 'Rewrote aggregation pipelines and added strategic indexes for the queries that matter most.',
    metric: '200% faster on 10M+ records',
    where: 'As Sunnah Foundation',
    color: '#39ff88',
  },
  {
    stage: 'queue',
    tech: 'BullMQ · Redis · Python ETL',
    title: 'Move slow work off the request',
    story: 'Distributed job queues and ETL pipelines handle background processing and data sync, so users never wait on them.',
    metric: 'async background jobs',
    where: 'As Sunnah Foundation',
    color: '#9d8cff',
  },
  {
    stage: 'realtime',
    tech: 'WebSocket · notification service',
    title: 'Push the result back',
    story: 'A real-time notification service delivers updates the instant they happen — no polling.',
    metric: 'instant push',
    where: 'Zaynax Health',
    color: '#ff2bd6',
  },
  {
    stage: 'team',
    tech: 'project lead · SDLC · code review · mentoring',
    title: 'Ship it as a team',
    story: 'Every hop above is built by people. As project lead I run the SDLC end to end — planning, architecture, code review and deployment — and keep the team shipping secure, scalable software on time.',
    metric: 'Project Lead',
    where: 'SOFOF Tech',
    color: '#ffd166',
  },
];

// Quick view (recruiter summary) — the five lines a recruiter should see first.
export const HIGHLIGHTS = [
  '<b>200% faster</b> MongoDB queries on <b>10M+ records</b> through aggregation rewrites and strategic indexing (As Sunnah Foundation).',
  '<b>Sub-second</b> analytics dashboards through scheduled caching.',
  'Leads the development team and SDLC as <b>Project Lead</b> at SOFOF Tech.',
  'Built a real-time WebSocket notification service and an OTP anti-spam layer — <b>Employee of the Month</b>, Zaynax Health.',
  'Shipped with engineering teams across <b>Bangladesh, India, the UK and Canada</b>.',
];

// Writing. Replace `url` with the article's own link when you have it.
export const ARTICLES = [
  {
    title: 'Circular dependency is a major flaw in software architecture',
    platform: 'LinkedIn',
    summary: 'Why circular dependencies (A → B → C → A) signal a design flaw — and how drawing a class diagram first exposes dependency direction and ownership boundaries before any code is written.',
    tags: ['SoftwareArchitecture', 'CleanCode', 'SystemDesign', 'BackendDevelopment'],
    url: 'https://www.linkedin.com/in/almahmud71/recent-activity/articles/',
  },
];

// Before software: robotics & IoT at MIST. Hardware details are described
// generally — edit `what` / `tags` to match the real builds.
export const ORIGIN_PATH = [
  { year: '2017', label: 'Mechanical Engineering', sub: 'MIST' },
  { year: '2018', label: 'Robotics & IoT', sub: 'Robolution finalist' },
  { year: '2021', label: 'First software role', sub: 'Node.js APIs' },
  { year: '2026', label: 'Project Lead', sub: 'SOFOF Tech' },
];

export const ORIGIN = [
  {
    id: 'line',
    name: 'Line follower robot',
    badge: 'Finalist · MIST Robolution 2018',
    what: 'An array of line sensors reads the track, and a feedback control loop corrects the motors continuously to stay on it.',
    from: 'Sensor feedback loop',
    to: 'Observability, alerting & self-correcting services',
    tags: ['line sensors', 'feedback control', 'motor drivers'],
  },
  {
    id: 'sumo',
    name: 'Autonomous sumo bots',
    badge: 'University robotics',
    what: 'Sensors find the opponent and the ring edge; a state machine decides — search, attack, evade — in real time, with no human in the loop.',
    from: 'Real-time state machine',
    to: 'Event-driven services with tight latency budgets',
    tags: ['distance sensors', 'edge detection', 'state machine'],
  },
  {
    id: 'voice',
    name: 'Voice-controlled car',
    badge: 'University robotics',
    what: 'Spoken commands are recognised, parsed and dispatched to the motors — a request pipeline you can drive.',
    from: 'Command → parse → actuate',
    to: 'Request → route → queue → worker',
    tags: ['speech commands', 'command parsing', 'motor control'],
  },
  {
    id: 'iot',
    name: 'IoT systems',
    badge: 'Connected devices',
    what: 'Networked devices stream sensor readings to a server that stores them and acts on them.',
    from: 'Device telemetry',
    to: 'Real-time data pipelines & WebSockets',
    tags: ['sensors', 'networked devices', 'telemetry'],
  },
];

// Products shipped at SOFOF Tech. Descriptions come from each product's public site.
// (My Coiffeur's site shows only its app navigation — refine that description if you like.)
export const SOFOF_PROJECTS = [
  {
    name: 'Radd',
    ar: '',
    kicker: 'AI customer service · SaaS',
    description: 'AI-first customer service for Arabic businesses — WhatsApp, website chat and voice in one inbox, with AI that hands off to a human when needed.',
    platforms: ['Web app', 'Arabic-first'],
    url: 'https://radd-ai.com/',
  },
  {
    name: 'Mehad',
    ar: 'مهاد',
    kicker: 'EdTech · tutoring',
    description: 'Matches students in Saudi Arabia with private tutors, online or in person — with a sign-up flow for tutors.',
    platforms: ['Web', 'Arabic'],
    url: 'https://mehadedu.com/',
  },
  {
    name: 'My Coiffeur',
    ar: 'ماي كوافير',
    kicker: 'Bookings · web app',
    description: 'Arabic web app for discovering services and managing bookings.',
    platforms: ['Web app', 'Arabic'],
    url: 'https://web.mycoifeur.com.sa',
  },
  {
    name: 'Qatarat',
    ar: 'قطرات',
    kicker: 'Charity · on-demand delivery',
    description: 'Order and track water delivery to mosques in Makkah, from anywhere, through the app.',
    platforms: ['iOS', 'Android', 'Web'],
    url: 'https://qataratapp.com/',
  },
];

// link the products to the SOFOF Tech experience entry
const sofofJob = EXPERIENCE.find((j) => j.company === 'SOFOF Tech');
if (sofofJob) sofofJob.products = SOFOF_PROJECTS;

// Analytics — cookieless, so no consent banner is needed. Tracking stays OFF until an ID is set.
//   Umami Cloud:  sign up at umami.is → add website "farukalmahmud.online" → paste its Website ID below.
//   GoatCounter:  set provider: 'goatcounter' and goatcounter: 'https://YOURCODE.goatcounter.com/count'.
export const ANALYTICS = {
  provider: 'umami',          // 'umami' | 'goatcounter'
  id: '',                     // Umami Website ID (a UUID)
  goatcounter: '',
  domains: ['farukalmahmud.online'], // never count localhost / previews
};
