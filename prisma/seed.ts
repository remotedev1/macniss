import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const projectImage = (url: string, fileId: string) => ({ url, fileId });

const seedUser = {
  firstName: process.env.SEED_USER_FIRST_NAME || 'Macniss',
  lastName: process.env.SEED_USER_LAST_NAME || 'Admin',
  email: (process.env.SEED_USER_EMAIL || 'admin@macniss.local').toLowerCase(),
  phoneNumber: process.env.SEED_USER_PHONE || '9000000000',
  password: process.env.SEED_USER_PASSWORD || 'Macniss@Demo2026!',
};

const projects: Prisma.ProjectsCreateInput[] = [
  {
    projectName: 'Courtyard House',
    projectTagline: 'A climate-conscious family residence organised around light, landscape and privacy.',
    projectType: 'RESIDENTIAL',
    clientName: 'Private Residence',
    contractorName: 'Macniss',
    architectName: 'Design Coordination Team',
    location: 'Bengaluru, Karnataka',
    startDate: new Date('2024-02-01'),
    completionDate: new Date('2025-05-30'),
    estimatedCost: 18500000,
    overview: 'A contemporary urban home designed around a central courtyard, shaded transition spaces and a restrained material palette. The construction strategy prioritised natural light, cross ventilation, durable finishes and clear indoor-outdoor relationships.',
    objectives: [
      'Create privacy without compromising daylight and ventilation',
      'Coordinate structure, services and interiors through a single delivery team',
      'Use durable, low-maintenance finishes suited to Bengaluru weather'
    ],
    keyFeatures: [
      { title: 'Central courtyard', description: 'A landscaped void brings daylight and air deep into the plan.' },
      { title: 'Passive comfort', description: 'Shading, orientation and cross ventilation reduce dependence on mechanical cooling.' },
      { title: 'Integrated interiors', description: 'Architecture, fixed furniture and lighting were coordinated as one system.' }
    ],
    technologiesUsed: ['RCC framed structure', 'Waterproofing systems', 'Energy-efficient lighting', 'Rainwater management'],
    imageGallery: [projectImage('/hero.jpg', 'seed-courtyard-hero'), projectImage('/images/modern-house.jpg', 'seed-courtyard-02')],
    youtubeLinks: [],
    instagramLinks: [],
    status: 'COMPLETED',
    isArchived: false
  },
  {
    projectName: 'Verdant Villas',
    projectTagline: 'A low-density residential development shaped by landscape, privacy and long-term value.',
    projectType: 'RESIDENTIAL',
    clientName: 'Developer Demonstration Project',
    contractorName: 'Macniss',
    architectName: 'Project Design Team',
    location: 'Mysuru Road, Bengaluru',
    startDate: new Date('2025-01-15'),
    completionDate: new Date('2026-12-15'),
    estimatedCost: 42000000,
    overview: 'A boutique villa development planned as a cohesive neighbourhood rather than a collection of isolated houses. The development approach balances buildable efficiency with generous landscape buffers, pedestrian comfort and a consistent architectural language.',
    objectives: [
      'Create a recognisable development identity across multiple homes',
      'Standardise construction details while allowing plan flexibility',
      'Plan infrastructure and landscape early to reduce late-stage rework'
    ],
    keyFeatures: [
      { title: 'Development planning', description: 'Site circulation, services and building footprints are coordinated before vertical construction.' },
      { title: 'Repeatable quality', description: 'Standard details and inspection gates support consistent workmanship across units.' },
      { title: 'Landscape-first streetscape', description: 'Planting, setbacks and pedestrian edges are part of the development framework.' }
    ],
    technologiesUsed: ['BIM-assisted coordination', 'RCC framed structure', 'Site-wide drainage planning', 'LED common-area lighting'],
    imageGallery: [projectImage('/images/modern-house.jpg', 'seed-verdant-hero'), projectImage('/hero.jpg', 'seed-verdant-02')],
    youtubeLinks: [],
    instagramLinks: [],
    status: 'ACTIVE',
    isArchived: false
  },
  {
    projectName: 'Axis Business Centre',
    projectTagline: 'Flexible commercial space designed for efficient construction and adaptable occupancy.',
    projectType: 'COMMERCIAL',
    clientName: 'Commercial Client',
    contractorName: 'Macniss',
    architectName: 'Project Design Team',
    location: 'Whitefield, Bengaluru',
    startDate: new Date('2024-08-20'),
    completionDate: new Date('2026-03-31'),
    estimatedCost: 68000000,
    overview: 'A mid-scale commercial building with efficient floor plates, robust service coordination and a façade strategy designed to balance daylight, solar control and brand presence. The execution plan keeps future tenant flexibility in view.',
    objectives: [
      'Deliver flexible floor plates for changing tenant requirements',
      'Coordinate MEP pathways to protect ceiling heights and usable area',
      'Create a durable commercial façade with controlled solar gain'
    ],
    keyFeatures: [
      { title: 'Flexible floorplates', description: 'Planning supports multiple tenant configurations and future fit-outs.' },
      { title: 'Service coordination', description: 'MEP routes are integrated early to avoid clashes during execution.' },
      { title: 'Operational durability', description: 'High-contact materials are selected for maintenance and lifecycle performance.' }
    ],
    technologiesUsed: ['MEP coordination', 'Fire-safety systems', 'Energy-efficient glazing strategy', 'Access-control ready planning'],
    imageGallery: [projectImage('/hero.jpg', 'seed-axis-hero'), projectImage('/images/modern-house.jpg', 'seed-axis-02')],
    youtubeLinks: [],
    instagramLinks: [],
    status: 'ACTIVE',
    isArchived: false
  },
  {
    projectName: 'Coffee Estate Retreat',
    projectTagline: 'A contemporary estate home rooted in the terrain, climate and material character of Kodagu.',
    projectType: 'RESIDENTIAL',
    clientName: 'Private Estate',
    contractorName: 'Macniss',
    architectName: 'Design Coordination Team',
    location: 'Kodagu, Karnataka',
    startDate: new Date('2023-06-01'),
    completionDate: new Date('2024-11-15'),
    estimatedCost: 24000000,
    overview: 'A hillside retreat developed around existing vegetation and long views. The building uses deep overhangs, sheltered verandahs and robust material detailing suited to Kodagu rainfall while keeping interiors warm and contemporary.',
    objectives: [
      'Respond carefully to slope, drainage and heavy seasonal rainfall',
      'Preserve key trees and frame views toward the estate',
      'Create a low-maintenance home suitable for periodic occupation'
    ],
    keyFeatures: [
      { title: 'Terrain-led planning', description: 'The footprint follows the site rather than forcing a flat-building response.' },
      { title: 'Weather protection', description: 'Deep roof edges and considered drainage details respond to intense monsoon conditions.' },
      { title: 'Estate character', description: 'Natural textures and muted finishes connect the house to its landscape.' }
    ],
    technologiesUsed: ['Slope drainage', 'Waterproofing systems', 'Natural ventilation', 'Rainwater harvesting provision'],
    imageGallery: [projectImage('/images/modern-house.jpg', 'seed-estate-hero'), projectImage('/hero.jpg', 'seed-estate-02')],
    youtubeLinks: [],
    instagramLinks: [],
    status: 'COMPLETED',
    isArchived: false
  }
];

const solutions: Prisma.SolutionsCreateInput[] = [
  {
    title: 'Property Development',
    description: 'Development planning from site potential and feasibility through design coordination, approvals, construction and market-ready handover.',
    image: [projectImage('/hero.jpg', 'seed-solution-development')],
    isArchived: false
  },
  {
    title: 'Design & Build',
    description: 'One accountable delivery path aligning architecture, engineering, procurement, execution and finishes around a defined brief and budget.',
    image: [projectImage('/images/modern-house.jpg', 'seed-solution-design-build')],
    isArchived: false
  },
  {
    title: 'Residential Construction',
    description: 'Custom homes and multi-unit residential projects delivered with structured quality checks, transparent milestones and coordinated interiors.',
    image: [projectImage('/images/modern-house.jpg', 'seed-solution-residential')],
    isArchived: false
  },
  {
    title: 'Commercial Construction',
    description: 'Commercial buildings planned around operational efficiency, service coordination, durability and adaptable tenant requirements.',
    image: [projectImage('/hero.jpg', 'seed-solution-commercial')],
    isArchived: false
  },
  {
    title: 'Project Management',
    description: 'Programme, procurement, contractor and quality coordination that turns complex building decisions into controlled delivery milestones.',
    image: [projectImage('/hero.jpg', 'seed-solution-pm')],
    isArchived: false
  },
  {
    title: 'Interiors & Fit-Out',
    description: 'Interior execution integrated with architecture and services so materials, lighting, joinery and finishing details come together cleanly.',
    image: [projectImage('/images/modern-house.jpg', 'seed-solution-interiors')],
    isArchived: false
  }
];

const testimonials: Prisma.TestimonialsCreateInput[] = [
  {
    name: 'Residential Client',
    role: 'Homeowner · Bengaluru',
    image: '/placeholder.jpg',
    quote: 'What stood out was the clarity. We always knew what was being built, what decision was required next and how each change affected the programme.',
    isArchived: false
  },
  {
    name: 'Development Partner',
    role: 'Property Development · Karnataka',
    image: '/placeholder.jpg',
    quote: 'The team approached the project as a development, not just a structure. Coordination between planning, procurement and site execution made the process far more predictable.',
    isArchived: false
  },
  {
    name: 'Commercial Client',
    role: 'Business Owner · Bengaluru',
    image: '/placeholder.jpg',
    quote: 'Site decisions were documented and practical. The focus on services, durability and future maintenance helped us make better long-term choices.',
    isArchived: false
  }
];

const consultations: Prisma.ConsultationsCreateInput[] = [
  {
    name: 'Demo Residential Enquiry',
    email: 'homeowner@example.com',
    phone: '9000000001',
    state: 'Karnataka',
    details: 'Planning a 4-bedroom residence on a 40 x 60 site in Bengaluru. Looking for design-and-build support and an initial project roadmap.',
    status: 'PENDING'
  },
  {
    name: 'Demo Development Enquiry',
    email: 'developer@example.com',
    phone: '9000000002',
    state: 'Karnataka',
    details: 'Evaluating a small villa development and looking for feasibility, planning and turnkey construction support.',
    status: 'PENDING'
  }
];

async function main() {
  console.log('Seeding Macniss demo application data...');
  console.log('Existing sessions/tokens/audit/security-rate-limit records are preserved.');

  const passwordHash = await bcrypt.hash(seedUser.password, 12);
  const user = await prisma.users.upsert({
    where: { email: seedUser.email },
    update: {
      firstName: seedUser.firstName,
      lastName: seedUser.lastName,
      phoneNumber: seedUser.phoneNumber,
      password: passwordHash,
      emailVerified: new Date(),
      status: 'ACTIVE',
      isDeleted: false,
      mustChangePassword: false,
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
    create: {
      firstName: seedUser.firstName,
      lastName: seedUser.lastName,
      email: seedUser.email,
      phoneNumber: seedUser.phoneNumber,
      password: passwordHash,
      emailVerified: new Date(),
      status: 'ACTIVE',
      isDeleted: false,
      mustChangePassword: false,
      failedLoginAttempts: 0,
    },
  });

  await prisma.consultations.deleteMany();
  await prisma.testimonials.deleteMany();
  await prisma.solutions.deleteMany();
  await prisma.projects.deleteMany();
  await prisma.interiorGallery.deleteMany();

  for (const project of projects) await prisma.projects.create({ data: project });
  for (const solution of solutions) await prisma.solutions.create({ data: solution });
  for (const testimonial of testimonials) await prisma.testimonials.create({ data: testimonial });
  for (const consultation of consultations) await prisma.consultations.create({ data: consultation });

  await prisma.interiorGallery.create({
    data: {
      images: [
        projectImage('/images/modern-house.jpg', 'seed-interior-01'),
        projectImage('/hero.jpg', 'seed-interior-02'),
        projectImage('/images/modern-house.jpg', 'seed-interior-03'),
        projectImage('/hero.jpg', 'seed-interior-04'),
        projectImage('/images/modern-house.jpg', 'seed-interior-05')
      ]
    }
  });

  console.log(`Seeded CMS user: ${user.email}`);
  console.log(`Seeded ${projects.length} projects`);
  console.log(`Seeded ${solutions.length} services/solutions`);
  console.log(`Seeded ${testimonials.length} testimonials`);
  console.log(`Seeded ${consultations.length} sample consultations`);
  console.log('Seeded interior gallery');
  console.log('');
  console.log('Demo login');
  console.log(`  Email: ${seedUser.email}`);
  console.log(`  Password: ${seedUser.password}`);
  console.log('Override demo credentials with SEED_USER_EMAIL and SEED_USER_PASSWORD in .env.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
