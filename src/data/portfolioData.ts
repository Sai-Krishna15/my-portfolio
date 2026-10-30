export const personalInfo = {
  name: "Sai Krishna Siginamsetty",
  fullName: "Mohan Mani Sai Krishna Siginamsetty",
  role: "Software Engineer",
  tagline: "Full-Stack Engineer specializing in React.js, Node.js, Knowledge Graphs & Real-Time Systems",
  email: "saikrishna152002@gmail.com",
  location: "Hyderabad, India",
  hometown: "Narasaraopet, India",
  linkedin: "https://www.linkedin.com/in/mohanmanisaikrishna",
  github: "https://github.com/Sai-Krishna15",
  devAtlasLive: "https://knowledge-graph-1-892j.onrender.com/",
  summary:
    "Full-stack developer specializing in React.js and Node.js, with hands-on experience shipping production features for real-time messaging, analytics dashboards, and AI-integrated platforms. Comfortable owning a feature end-to-end — from component architecture and state management to API integration, graph modeling, and query optimization. Currently seeking a full-time role to bring this to a team building scalable, user-facing products.",
  metrics: [
    { value: "5,000+", label: "Active Users Served", desc: "Across real-time feed & chat platforms" },
    { value: "50-60%", label: "SQL Query Speedup", desc: "Via index strategies & stored procedure optimizations" },
    { value: "30-40%", label: "Latency Reduction", desc: "Through Redis caching on large analytics datasets" },
    { value: "10+", label: "Integrated Data Sources", desc: "Automated cron pipelines syncing every 5 mins" },
  ],
};

export interface ProjectItem {
  id: string;
  title: string;
  category: "Knowledge Graph" | "Full-Stack SaaS" | "Mobile & Real-Time" | "Social & Messaging" | "AI Integration";
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  techStack: string[];
  metrics: string;
  badge: string;
  liveUrl?: string;
  githubUrl?: string;
  useCase?: string;
  architectureDetails?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "devatlas",
    title: "DevAtlas · Developer Knowledge Graph Platform",
    category: "Knowledge Graph",
    organization: "Independent Engineering Architecture",
    period: "2024 — Present",
    description:
      "A developer knowledge graph platform designed to explore engineering knowledge and organizational data through interconnected relationships rather than complex relational joins.",
    highlights: [
      "Models interconnected software engineering entities (developers, projects, tech stacks, repositories, teams, and companies) as a high-performance knowledge graph.",
      "Solves the fundamental limitation of traditional relational databases by treating relationships as first-class citizens, enabling instant multi-hop graph traversals without expensive multi-table JOIN operations.",
      "Implements shortest relationship path algorithms between developers and technology nodes to identify collaboration patterns and engineering expertise.",
      "Powers technology ecosystem exploration, allowing engineering leaders to visualize tech stack adoptions and cross-team dependencies in real time.",
      "Deployed and fully operational with live interactive graph exploration.",
    ],
    techStack: ["React.js", "Node.js", "Graph Database", "TypeScript", "RESTful APIs", "Render Cloud"],
    metrics: "Instant multi-hop traversals · Zero relational JOIN overhead",
    badge: "Flagship Innovation",
    liveUrl: "https://knowledge-graph-1-892j.onrender.com/",
    githubUrl: "https://github.com/Sai-Krishna15",
    useCase:
      "Finding developers with specific technology expertise, discovering collaboration networks, exploring project tech stacks, and computing shortest relationship paths.",
    architectureDetails:
      "Traditional SQL requires recursive, expensive joins for deep networks. DevAtlas stores nodes and directional edges natively, guaranteeing O(1) pointer-hop traversals.",
  },
  {
    id: "analytics-saas",
    title: "SaaS Analytics & Multi-Source Ads Platform",
    category: "Full-Stack SaaS",
    organization: "Hyperspace Retail Labs Pvt Ltd",
    period: "Feb 2024 — Mar 2025",
    description:
      "Architected and deployed an end-to-end multi-tenant analytics dashboard consolidating high-volume advertising and sales data into actionable, unified business insights.",
    highlights: [
      "Aggregated and synchronized performance metrics from Google Ads, Amazon Ads, WooCommerce, and Shopify into a single dashboard.",
      "Optimized complex PostgreSQL queries, indexing patterns, and stored procedures, reducing average query response time by 50–60%.",
      "Engineered Redis in-memory caching layers for high-frequency queries, cutting API response times by 30–40%.",
      "Built resilient cron-based data pipelines syncing every 5 minutes across 10+ integrated sources.",
      "Integrated React Query on the frontend for intelligent client-side caching and state deduplication.",
    ],
    techStack: ["React.js", "Node.js", "TypeORM", "PostgreSQL", "Redis", "React Query", "Shadcn UI", "Tailwind CSS"],
    metrics: "50-60% faster SQL queries · 10+ live data sources",
    badge: "Core Enterprise Platform",
    githubUrl: "https://github.com/Sai-Krishna15",
  },
  {
    id: "shipping-platform",
    title: "Cross-Platform Shipping & Order Tracking Platform",
    category: "Mobile & Real-Time",
    organization: "Hyperspace Retail Labs Pvt Ltd",
    period: "2024",
    description:
      "Developed a unified cross-platform mobile application that centralizes logistics and provides real-time tracking across major courier networks.",
    highlights: [
      "Consolidated multi-carrier tracking across XpressBees, Ecom Express, and Amazon Shipping into an intuitive mobile interface.",
      "Implemented live interactive order tracking with map-based location features using React Native.",
      "Architected scalable mobile state management using Redux, preventing unnecessary rerenders.",
      "Diagnosed and resolved critical edge-case production bugs, substantially boosting app stability and user trust.",
    ],
    techStack: ["React Native", "Expo", "Redux", "JavaScript (ES6+)", "RESTful APIs", "Map SDKs"],
    metrics: "Unified 3 major courier carriers into 1 app",
    badge: "Mobile Production App",
    githubUrl: "https://github.com/Sai-Krishna15",
  },
  {
    id: "realtime-feed-chat",
    title: "Real-Time Social Feed & Messaging Platform",
    category: "Social & Messaging",
    organization: "Reelon Technologies",
    period: "Jun 2025 — Sep 2025",
    description:
      "Owned end-to-end development of the Feed and Profile modules and built real-time WebSocket messaging infrastructure serving thousands of active users.",
    highlights: [
      "Shipped Feed and Profile modules using React.js and Tailwind CSS, supporting over 5,000 active users.",
      "Integrated Socket.IO for real-time bi-directional messaging, enabling instant chat notifications and live user presence.",
      "Designed and documented reusable, accessible UI components in a 6-engineer team to eliminate duplicate frontend code.",
      "Leveraged React Query for server-state synchronization, eliminating redundant API roundtrips and streamlining error handling.",
    ],
    techStack: ["React.js", "Tailwind CSS", "Socket.IO", "React Query", "Node.js", "Git/GitHub"],
    metrics: "5,000+ active users · Sub-second messaging",
    badge: "Social & Chat Platform",
    githubUrl: "https://github.com/Sai-Krishna15",
  },
  {
    id: "ai-analytics-chat",
    title: "Natural-Language AI Analytics Query Engine",
    category: "AI Integration",
    organization: "Hyperspace Retail Labs Pvt Ltd",
    period: "2024 — 2025",
    description:
      "Integrated Generative AI into the core analytics suite, allowing executives and non-technical stakeholders to query complex data sets using conversational English.",
    highlights: [
      "Integrated OpenAI's API with a Python-based microservice to translate natural language prompts into structured analytics queries.",
      "Designed real-time conversational chat interfaces over business data with streaming responses.",
      "Implemented security boundaries and validation to ensure AI queries adhered to user authorization scopes.",
    ],
    techStack: ["OpenAI API", "Python", "Node.js", "React.js", "Shadcn UI", "RESTful APIs"],
    metrics: "Instant conversational data queries",
    badge: "AI-Powered Feature",
    githubUrl: "https://github.com/Sai-Krishna15",
  },
];

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  team: string;
  summary: string;
  points: string[];
  techStack: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    company: "Reelon Technologies",
    role: "Software Engineer",
    period: "06/2025 — 09/2025",
    location: "Hyderabad, India",
    team: "Core Product Engineering Team",
    summary:
      "Full-stack engineer building scalable user-facing features, real-time communication modules, and modular component architectures.",
    points: [
      "Built and shipped the Feed and Profile modules end-to-end using React.js and Tailwind CSS, supporting a platform with approximately 5,000 active users.",
      "Implemented real-time chat functionality using Socket.IO, enabling instant messaging and live interactions across the platform.",
      "Developed reusable, responsive UI components as part of a 6-engineer team, improving cross-device compatibility and reducing duplicate frontend code.",
      "Used React Query for server-state management and data fetching, reducing redundant API calls and simplifying caching, loading, and error handling on the frontend.",
      "Collaborated in an Agile/Scrum environment, participating in sprint planning, feature development, and code reviews.",
      "Used Git/GitHub for version control and collaborative development workflows.",
    ],
    techStack: ["React.js", "Tailwind CSS", "Socket.IO", "React Query", "Node.js", "Git/GitHub", "Agile/Scrum"],
  },
  {
    company: "Hyperspace Retail Labs Pvt Ltd",
    role: "Software Developer",
    period: "02/2024 — 03/2025",
    location: "Hyderabad, India",
    team: "Analytics & Logistics Product Engineering",
    summary:
      "Full-stack developer responsible for architecting SaaS analytics dashboards, database performance tuning, and mobile cross-platform logistics apps.",
    points: [
      "Architected a scalable SaaS analytics platform using React.js, Node.js, and TypeORM, aggregating data from Google Ads, Amazon Ads, WooCommerce, and Shopify into a unified dashboard.",
      "Integrated OpenAI's API with a Python-based service to enable natural-language queries and real-time chat over analytics data.",
      "Built reusable frontend components with Shadcn as part of a 4-engineer team, improving UI/UX consistency across the platform.",
      "Integrated React Query for data fetching and caching on the frontend, reducing unnecessary re-renders and API calls for large analytics datasets.",
      "Optimized complex SQL queries, indexing strategies, and stored procedures, reducing average query response time by an estimated 50-60% for large analytics datasets.",
      "Implemented Redis caching for frequently accessed analytics data, reducing API response time by an estimated 30-40% and easing database load.",
      "Built real-time processing pipelines with cron-based sync every 5 minutes, keeping dashboards updated with near-live data across 10+ integrated data sources.",
      "Developed and deployed cross-platform mobile apps using React Native and Expo, unifying shipment tracking across 3 major courier partners (XpressBees, Ecom Express, and Amazon Shipping).",
      "Implemented real-time order tracking with map-based location features in React Native and Redux state architecture.",
    ],
    techStack: [
      "React.js",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "TypeORM",
      "React Query",
      "React Native",
      "Expo",
      "OpenAI API",
      "Python",
      "Shadcn UI",
    ],
  },
];

export interface SkillCategory {
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  skills: {
    id: string;
    name: string;
    level: string;
    note: string;
    usedIn: string[];
    connections: string[];
    proficiencyScore: number; // 0 - 100
  }[];
}

export const skillsCategories: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    shortTitle: "Frontend",
    description: "Component architecture, state management & reactive interfaces",
    iconName: "layout",
    skills: [
      {
        id: "react",
        name: "React.js",
        level: "Advanced",
        note: "Hooks, Concurrent Mode, Virtual DOM, Custom Hooks",
        usedIn: ["DevAtlas", "Analytics SaaS", "Feed & Profile"],
        connections: ["javascript", "tailwind", "react-query", "redux"],
        proficiencyScore: 95,
      },
      {
        id: "javascript",
        name: "JavaScript (ES6+)",
        level: "Advanced",
        note: "Async/Await, Closures, Event Loop, Prototypes",
        usedIn: ["All Platforms", "DevAtlas", "Node.js Services"],
        connections: ["react", "node", "react-native"],
        proficiencyScore: 94,
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        level: "Advanced",
        note: "Design Tokens, Fluid Layouts, Dark Themes",
        usedIn: ["DevAtlas", "Reelon Feed & Profile", "Analytics Platform"],
        connections: ["react", "html-css"],
        proficiencyScore: 95,
      },
      {
        id: "react-query",
        name: "React Query",
        level: "Advanced",
        note: "Server-State Caching, Stale-While-Revalidate, Deduping",
        usedIn: ["Hyperspace Analytics", "Reelon Feed"],
        connections: ["react", "rest-apis"],
        proficiencyScore: 92,
      },
      {
        id: "redux",
        name: "Redux",
        level: "Proficient",
        note: "Centralized Predictable State Architecture",
        usedIn: ["Shipping Management App", "Order Tracking"],
        connections: ["react", "react-native"],
        proficiencyScore: 88,
      },
      {
        id: "html-css",
        name: "HTML5 & CSS3",
        level: "Advanced",
        note: "Semantic Structure, WCAG A11y, Modern Layouts",
        usedIn: ["All Projects"],
        connections: ["react", "tailwind"],
        proficiencyScore: 96,
      },
      {
        id: "shadcn",
        name: "Shadcn UI",
        level: "Advanced",
        note: "Accessible, Styled UI Components, Radix Primitives",
        usedIn: ["Analytics SaaS", "DevAtlas"],
        connections: ["react", "tailwind"],
        proficiencyScore: 90,
      },
    ],
  },
  {
    title: "Backend & Systems",
    shortTitle: "Backend",
    description: "RESTful APIs, database optimization & real-time messaging",
    iconName: "server",
    skills: [
      {
        id: "node",
        name: "Node.js",
        level: "Advanced",
        note: "Event-Driven Runtime, Async I/O, Microservices",
        usedIn: ["DevAtlas Backend", "Analytics Platform", "Reelon Chat"],
        connections: ["javascript", "express", "postgres", "redis"],
        proficiencyScore: 92,
      },
      {
        id: "express",
        name: "Express.js",
        level: "Advanced",
        note: "Middleware Architecture, Error Handling, Routing",
        usedIn: ["Analytics API", "Auth Services"],
        connections: ["node", "rest-apis"],
        proficiencyScore: 90,
      },
      {
        id: "postgres",
        name: "PostgreSQL",
        level: "Advanced",
        note: "Query Optimization, Indexing Patterns, Stored Procedures",
        usedIn: ["Analytics SaaS (50-60% Query Speedup)"],
        connections: ["node", "typeorm"],
        proficiencyScore: 92,
      },
      {
        id: "redis",
        name: "Redis",
        level: "Proficient",
        note: "In-Memory Caching, 30-40% Latency Reduction",
        usedIn: ["Analytics Cache Layer", "Session Stores"],
        connections: ["node", "postgres"],
        proficiencyScore: 88,
      },
      {
        id: "socket-io",
        name: "Socket.IO",
        level: "Proficient",
        note: "Bi-Directional WebSockets, Sub-Second Messaging",
        usedIn: ["Reelon Live Chat (5,000+ Users)"],
        connections: ["node", "react"],
        proficiencyScore: 90,
      },
      {
        id: "typeorm",
        name: "TypeORM",
        level: "Proficient",
        note: "Relational Mapping, Migrations, QueryBuilder",
        usedIn: ["Hyperspace Retail Labs SaaS"],
        connections: ["postgres", "node"],
        proficiencyScore: 86,
      },
      {
        id: "rest-apis",
        name: "RESTful APIs",
        level: "Advanced",
        note: "API Contract Design, Validation, Rate Limiting",
        usedIn: ["All Production Services"],
        connections: ["express", "node"],
        proficiencyScore: 94,
      },
      {
        id: "graph-db",
        name: "Graph Modeling",
        level: "Advanced",
        note: "Multi-Hop Traversals, Relationship Discovery",
        usedIn: ["DevAtlas Knowledge Graph"],
        connections: ["node", "react"],
        proficiencyScore: 90,
      },
    ],
  },
  {
    title: "Mobile & AI Integration",
    shortTitle: "Mobile & AI",
    description: "Cross-platform mobile apps & LLM-assisted workflows",
    iconName: "smartphone",
    skills: [
      {
        id: "react-native",
        name: "React Native",
        level: "Proficient",
        note: "Cross-Platform Mobile Apps, Native Bridges",
        usedIn: ["Shipping Management App"],
        connections: ["react", "expo", "redux"],
        proficiencyScore: 86,
      },
      {
        id: "expo",
        name: "Expo",
        level: "Proficient",
        note: "Rapid Mobile Build & Over-The-Air Deployments",
        usedIn: ["Shipping Platform Deployment"],
        connections: ["react-native"],
        proficiencyScore: 88,
      },
      {
        id: "openai",
        name: "OpenAI API",
        level: "Proficient",
        note: "Natural Language to Analytics Queries & Chat",
        usedIn: ["Hyperspace AI Query Engine"],
        connections: ["python", "node"],
        proficiencyScore: 85,
      },
      {
        id: "python",
        name: "Python",
        level: "Familiar",
        note: "AI Microservice & Data Transformation Scripts",
        usedIn: ["AI Query Engine Service"],
        connections: ["openai"],
        proficiencyScore: 80,
      },
    ],
  },
  {
    title: "Cloud & Tooling",
    shortTitle: "Cloud",
    description: "Cloud hosting, automated pipelines & team collaboration",
    iconName: "cloud",
    skills: [
      {
        id: "render",
        name: "Render Cloud",
        level: "Proficient",
        note: "Production Web Service & Background Worker Hosting",
        usedIn: ["DevAtlas Live Deployment"],
        connections: ["node", "git"],
        proficiencyScore: 88,
      },
      {
        id: "aws",
        name: "AWS",
        level: "Working Knowledge",
        note: "EC2, S3 & Cloud Architecture Fundamentals",
        usedIn: ["Cloud Storage & Deployments"],
        connections: ["render"],
        proficiencyScore: 78,
      },
      {
        id: "git",
        name: "Git & GitHub",
        level: "Advanced",
        note: "Feature Branching, Code Reviews, PR Workflows",
        usedIn: ["All Teams (Reelon, Hyperspace)"],
        connections: ["jira"],
        proficiencyScore: 94,
      },
      {
        id: "postman",
        name: "Postman",
        level: "Advanced",
        note: "API Integration Testing, Mocking & Validation",
        usedIn: ["API Engineering"],
        connections: ["rest-apis"],
        proficiencyScore: 92,
      },
      {
        id: "jira",
        name: "JIRA & Agile/Scrum",
        level: "Proficient",
        note: "Sprint Planning, Backlog Grooming, Standups",
        usedIn: ["Reelon & Hyperspace Product Teams"],
        connections: ["git"],
        proficiencyScore: 90,
      },
    ],
  },
];
