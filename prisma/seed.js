const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const prisma = new PrismaClient();

async function main() {
  // 1. Create Admin User
  const email = "admin@chloehuang.net";
  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: "Chloe Huang",
    },
  });

  console.log({ user });

  // 2. Create Sample Posts
  const posts = [
    {
      title: "The Future of Digital Aesthetics",
      slug: "future-of-digital-aesthetics",
      excerpt: "Exploring how brutalism and minimalism are converging in modern web design trends.",
      content: "Brutalism and minimalism have long been at odds, but in 2024 we are seeing a convergence...",
      category: "Design",
      published: true,
    },
    {
      title: "Building Sustainable Design Systems",
      slug: "building-sustainable-design-systems",
      excerpt: "A guide to creating design systems that scale without losing their soul.",
      content: "Design systems are more than just component libraries. They are the language of your product...",
      category: "Development",
      published: true,
    },
    {
      title: "Why I Switched to Next.js",
      slug: "why-i-switched-to-nextjs",
      excerpt: "My journey from static HTML/CSS to a full-stack React framework and why it matters.",
      content: "Next.js has revolutionized how we build React applications. Server Components, Suspense...",
      category: "Tech",
      published: true,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log("Seeded posts");

  // 3. Create Sample Projects
  const projects = [
    {
      title: "Neon Dreams",
      description: "A collection of cyberpunk-inspired digital artworks.",
      category: "Digital Art",
      imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop",
      link: "https://example.com/neon-dreams",
    },
    {
      title: "EcoBrand Identity",
      description: "Complete brand identity for a sustainable fashion label.",
      category: "Branding",
      imageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2725&auto=format&fit=crop",
      link: "https://example.com/ecobrand",
    },
    {
      title: "Zen UI Kit",
      description: "A minimalist user interface kit for meditation apps.",
      category: "UI/UX Design",
      imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
      link: "https://example.com/zen-ui",
    },
    {
      title: "TechFlow Dashboard",
      description: "SaaS dashboard design focused on data visualization.",
      category: "Web Design",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      link: "https://example.com/techflow",
    },
  ];

  // We can't easy upsert projects without a unique field other than ID, so we'll just create if empty
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    for (const project of projects) {
      await prisma.project.create({ data: project });
    }
    console.log("Seeded projects");
  }

  // 4. Create Sample Products
  const products = [
    {
      name: "Minimalist Poster Pack",
      description: "A set of 3 high-resolution minimalist posters for your office.",
      price: 29.0,
      imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=2574&auto=format&fit=crop",
    },
    {
      name: "Designer Tote Bag",
      description: "100% organic cotton tote bag with custom typography.",
      price: 45.0,
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2574&auto=format&fit=crop",
    },
    {
      name: "Abstract Phone Case",
      description: "Durable phone case with abstract art print.",
      price: 25.0,
      imageUrl: "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=2158&auto=format&fit=crop",
    },
    {
      name: "Digital Asset Bundle",
      description: "Over 500+ vector icons, textures, and mockups.",
      price: 59.0,
      imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const productCount = await prisma.product.count();
  if (productCount === 0) {
    for (const product of products) {
      await prisma.product.create({ data: product });
    }
    console.log("Seeded products");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
