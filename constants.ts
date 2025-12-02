import { LibraryCategory, LibraryItem, UserPlan } from './types';

export const APP_NAME = "THESOLOAUTOMATOR";

export const INITIAL_FREE_CREDITS = 10;

export const PLAN_CREDITS = {
  [UserPlan.FREE]: 10,
  [UserPlan.PRO]: 100,
  [UserPlan.BUSINESS]: Infinity
};

export const CRYPTO_CONFIG = {
  ETH: { name: 'Ethereum', symbol: 'ETH', network: 'ERC-20', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' },
  BTC: { name: 'Bitcoin', symbol: 'BTC', network: 'Bitcoin', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
  SOL: { name: 'Solana', symbol: 'SOL', network: 'Solana', address: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH' }
};

export const PLAN_FEATURES = {
  [UserPlan.FREE]: {
    name: 'Free',
    price: '$0',
    priceVal: 0,
    unlocks: 'Limited Access',
    credits: '10 credits',
    support: 'Community'
  },
  [UserPlan.PRO]: {
    name: 'Pro',
    price: '$29',
    priceVal: 29,
    unlocks: 'Full Access',
    credits: '100 credits',
    support: 'Email'
  },
  [UserPlan.BUSINESS]: {
    name: 'Business',
    price: '$99',
    priceVal: 99,
    unlocks: 'Full Access',
    credits: 'Unlimited',
    support: 'Priority 24/7'
  }
};

export const MOCK_LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: '1',
    title: 'Automated SEO Blog Generator',
    description: 'A complete workflow to generate, optimize, and publish blog posts using AI.',
    fullContent: '## Automated SEO Blog Generator Workflow\n\n1. **Keyword Research**: Use Semrush API to find low competition keywords.\n2. **Outline Generation**: Send keywords to Gemini to generate an outline.\n3. **Drafting**: Use Gemini to write the content section by section.\n4. **Optimization**: Check against SEO rules using a Python script.\n5. **Publishing**: Use WordPress REST API to draft the post.\n\n### Required Tools\n- Python 3.9+\n- Gemini API Key\n- WordPress Site',
    category: LibraryCategory.AUTOMATION,
    tags: ['SEO', 'Content', 'Python'],
    imageUrl: 'https://picsum.photos/seed/seo/400/300',
    isPremium: true
  },
  {
    id: '2',
    title: 'Micro-SaaS: niche Job Board',
    description: 'Idea validation and tech stack for a specialized job board.',
    fullContent: '## Micro-SaaS Idea: Niche Job Board\n\n**Target**: Remote React Developers in Europe.\n\n### Tech Stack\n- Next.js\n- Tailwind CSS\n- Supabase (Auth/DB)\n- Stripe (Payments)\n\n### Growth Strategy\n1. Scrape jobs from major boards using Python.\n2. Curate manually for quality.\n3. Reach out to hiring managers on LinkedIn.',
    category: LibraryCategory.STARTUP_IDEA,
    tags: ['SaaS', 'B2B', 'React'],
    imageUrl: 'https://picsum.photos/seed/saas/400/300',
    isPremium: false
  },
  {
    id: '3',
    title: 'Cold Email Outreach System',
    description: 'Set up a multi-domain cold email system that avoids spam folders.',
    fullContent: '## Cold Email Infrastructure\n\n1. Buy 3 secondary domains (e.g., get-company.com).\n2. Set up G-Suite for each.\n3. Configure SPF, DKIM, and DMARC records.\n4. Warm up inboxes for 14 days using Instantly.ai.\n5. Launch campaign with max 30 emails/day per inbox.',
    category: LibraryCategory.WORKFLOW,
    tags: ['Marketing', 'Sales', 'Email'],
    imageUrl: 'https://picsum.photos/seed/email/400/300',
    isPremium: true
  },
  {
    id: '4',
    title: 'AI Customer Support Agent',
    description: 'Code blueprint for a chatbot that handles 80% of support queries.',
    fullContent: '## Building an AI Support Agent\n\n**Architecture**:\n- Frontend: React Chat Widget\n- Backend: Node.js Express\n- LLM: Gemini 1.5 Flash\n- Knowledge Base: Pinecone (Vector DB)\n\n**Steps**:\n1. Embed documentation into vectors.\n2. On query, search relevant docs.\n3. Pass docs + query to Gemini.\n4. Return answer.',
    category: LibraryCategory.AI_TOOL,
    tags: ['Customer Support', 'AI', 'Chatbot'],
    imageUrl: 'https://picsum.photos/seed/support/400/300',
    isPremium: false
  },
  {
    id: '5',
    title: 'Newsletter Aggregator App',
    description: 'Mobile app idea to clean up personal inboxes.',
    fullContent: '## App Concept\n\nUsers forward newsletters to a custom email address. The app parses the HTML and presents it in a clean, reader-friendly mobile feed.\n\n**Monetization**: Freemium (3 newsletters free), $5/mo unlimited.',
    category: LibraryCategory.STARTUP_IDEA,
    tags: ['Mobile', 'Consumer', 'App'],
    imageUrl: 'https://picsum.photos/seed/news/400/300',
    isPremium: true
  },
  {
    id: '6',
    title: 'Social Media Content Repurposer',
    description: 'Turn one YouTube video into 10 Tweets and 3 LinkedIn posts automatically.',
    fullContent: '## Automation Steps\n\n1. Download YouTube transcript.\n2. Use Gemini to extract key insights.\n3. Format insights into threads for Twitter.\n4. Format insights into long-form for LinkedIn.\n5. Schedule via Buffer API.',
    category: LibraryCategory.AUTOMATION,
    tags: ['Social Media', 'Content', 'Growth'],
    imageUrl: 'https://picsum.photos/seed/social/400/300',
    isPremium: true
  }
];