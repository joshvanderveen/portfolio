import type { projects } from './projects';

export interface Service {
  // Page address under /services/.
  slug: string;
  title: string;
  // One line for the home page cards.
  summary: string;
  // A longer line for the Services page.
  description: string;
  included: string[];
  cta: string;
  // Value sent with enquiries when this service is picked.
  enquiry: string;
  page: {
    seoTitle: string;
    metaDescription: string;
    h1: string;
    lead: string;
    intro: string[];
    features: { title: string; text: string }[];
    audience: string[];
    faqs: { question: string; answer: string }[];
    related: (keyof typeof projects)[];
  };
}

// Draft copy: review prices, timelines and promises before launch.
export const services: Service[] = [
  {
    slug: 'web-design',
    title: 'Website design and build',
    summary: 'Custom sites that load fast, rank well and are easy for your team to update.',
    description: 'Custom sites that load fast, rank well and are easy for your team to update, designed around how your customers decide.',
    included: ['Strategy, sitemap and copy guidance', 'Custom design for desktop and mobile', 'Pages your team can update', 'Analytics, SEO foundations and launch'],
    cta: 'Start a website project',
    enquiry: 'Website',
    page: {
      seoTitle: 'Website Design & Development Melbourne | JVDV Studio',
      metaDescription: 'Custom website design and development for Melbourne businesses. Fast, accessible sites your team can update, built and looked after by JVDV Studio.',
      h1: 'Website design and development in Melbourne',
      lead: 'Custom websites that load fast, rank well and turn visitors into enquiries, designed around how your customers actually decide.',
      intro: [
        'Your website is often the first conversation a customer has with your business. We design it around the questions people ask before they get in touch, then build it to be fast on every device and easy for your team to keep up to date.',
        'Every site is designed for your business rather than adapted from a template. We plan the structure with you, design real pages you can review, and handle the build, the launch and everything after it.',
      ],
      features: [
        { title: 'Strategy and structure', text: 'We map out the pages and messages your customers need, so the site answers their questions in the right order.' },
        { title: 'Custom design', text: 'Pages designed for your brand and your customers on desktop and mobile, reviewed with you before anything is built.' },
        { title: 'Fast by default', text: 'Lightweight pages and optimised images that load quickly on phones, which visitors and search engines both reward.' },
        { title: 'Pages you can edit', text: 'Change text, photos and posts yourself, without waiting on a developer.' },
        { title: 'Built for search', text: 'Clean structure, page titles, descriptions and structured data set up from day one.' },
        { title: 'Launch and care', text: 'We put the site live, set up analytics and keep it secure and up to date afterwards.' },
      ],
      audience: [
        'Service businesses that need more enquiries',
        'Businesses whose current site is slow, dated or hard to update',
        'New businesses that need to look established from day one',
        'Teams who want to own their content without a developer on call',
      ],
      faqs: [
        { question: 'How much does a new website cost?', answer: 'Every website gets a fixed quote after a free consult. The price depends on the number of pages, the features you need and how much content we help write, and you’ll know it before anything starts.' },
        { question: 'Will I be able to update the website myself?', answer: 'Yes. We set your site up so you can change text, images and posts, and we show your team how. Bigger changes are covered by a care plan or a quote.' },
        { question: 'Do you use templates or WordPress?', answer: 'We design every site for the business it’s for, and choose how to build it to suit the job. Many of our sites are fast, lightweight builds with a simple editor; if you need a platform like Shopify, we use that instead.' },
      ],
      related: ['foxwood'],
    },
  },
  {
    slug: 'e-commerce',
    title: 'E-Commerce stores',
    summary: 'New stores, migrations and custom themes designed to convert.',
    description: 'Shopify stores, migrations and custom themes that make your products look their best and make checkout effortless.',
    included: ['Store setup or migration from another platform', 'Custom theme design and development', 'Payments, shipping and apps configured', 'Product and collection page optimisation'],
    cta: 'Start a store project',
    enquiry: 'E-Commerce store',
    page: {
      seoTitle: 'Shopify & E-Commerce Development Melbourne | JVDV Studio',
      metaDescription: 'Shopify store design, development and migrations for Australian businesses. Custom themes, smooth checkout and a store your team can run day to day.',
      h1: 'Shopify and e-commerce stores',
      lead: 'Online stores that show your products at their best and make buying easy, from a new Shopify store to moving off an old platform.',
      intro: [
        'A good store does two jobs: it makes customers want the product, and it gets out of the way when they’re ready to buy. We design product and collection pages that sell, and set up payments, shipping and stock so orders run smoothly behind the scenes.',
        'We build mainly on Shopify, which gives you a reliable checkout and an admin your team can pick up quickly. When a stock theme or app can’t do what you need, we design a custom theme or build the feature.',
      ],
      features: [
        { title: 'New Shopify stores', text: 'Set up with your products, collections, payments, shipping and tax, ready to trade.' },
        { title: 'Custom themes', text: 'A design built for your brand, rather than a stock theme with your logo on it.' },
        { title: 'Migrations', text: 'Move from WooCommerce, an old theme or another platform without losing products, customers or search rankings.' },
        { title: 'Product pages that sell', text: 'Clear photos, details and calls to action, laid out around the questions buyers ask.' },
        { title: 'Apps and integrations', text: 'Connect reviews, email marketing, shipping, accounting and stock tools, and build custom features where apps fall short.' },
        { title: 'Ongoing support', text: 'Seasonal changes, new collections and performance tune-ups on a monthly plan.' },
      ],
      audience: [
        'Retailers starting to sell online',
        'Stores outgrowing a template or an old platform',
        'Brands that want a store as distinctive as their products',
        'Businesses that need stock, shipping or accounting to sync automatically',
      ],
      faqs: [
        { question: 'Why Shopify?', answer: 'Shopify handles the hard parts of selling online, like secure checkout, payments and hosting, and its admin is easy for your team to learn. That leaves your budget for the design and features that set your store apart.' },
        { question: 'Can you move my existing store to Shopify?', answer: 'Yes. We move your products, customers and order history where the platforms allow it, and redirect your old page addresses so you keep the search rankings you’ve built.' },
        { question: 'How long does a new store take?', answer: 'It depends on the number of products and custom features. Your quote includes a timeline, and you can follow progress on a preview store the whole way through.' },
      ],
      related: [],
    },
  },
  {
    slug: 'web-apps',
    title: 'Custom web apps',
    summary: 'Platforms, portals and dashboards built around how your business runs.',
    description: 'Platforms, client portals and dashboards built around the way your business actually runs.',
    included: ['Product discovery and scoping', 'Interface design and prototyping', 'Secure accounts, roles and data', 'Integrations with the tools you already use'],
    cta: 'Start a web app project',
    enquiry: 'Web app',
    page: {
      seoTitle: 'Custom Web App Development Melbourne | JVDV Studio',
      metaDescription: 'Custom web applications, client portals and dashboards for Australian businesses, designed around your workflow and built by a Melbourne studio.',
      h1: 'Custom web app development',
      lead: 'Platforms, portals and internal tools built around the way your business actually runs, not the other way around.',
      intro: [
        'Off-the-shelf software is built for the average business. When yours doesn’t fit, teams end up with spreadsheets, double handling and things slipping through the cracks. A custom web app replaces that with one system that works the way you do.',
        'We start by understanding the workflow, design the screens with the people who will use them, then build, test and launch in stages so you see working software early. After launch, we host it, support it and keep improving it.',
      ],
      features: [
        { title: 'Discovery and scoping', text: 'We map your workflow and agree what the first version needs to do, with a fixed scope and quote.' },
        { title: 'Interface design', text: 'Clear, fast screens designed with the people who will use them every day.' },
        { title: 'Secure accounts and roles', text: 'Logins, permissions and history, so each person sees and does only what they should.' },
        { title: 'Automations', text: 'Tasks, reminders and emails that trigger themselves when something changes, so work doesn’t rely on memory.' },
        { title: 'Integrations', text: 'Connect the tools you already use, from accounting and email to maps and payments, and open your data to AI tools through MCP.' },
        { title: 'Hosting and support', text: 'Reliable hosting, backups, monitoring and a team that already knows the system.' },
      ],
      audience: [
        'Businesses running key processes on spreadsheets',
        'Teams paying for software that only half fits',
        'Founders building a new platform or product',
        'Organisations that need a client or partner portal',
      ],
      faqs: [
        { question: 'How much does a custom web app cost?', answer: 'It depends on what the app needs to do. We scope the first version with you during a free consult and give you a fixed quote for it, so you can launch sooner and grow it from there.' },
        { question: 'Who owns the code?', answer: 'It depends on the agreement. Some projects are built for you to own outright, others run on our platform as an ongoing service. We agree how ownership works before any work starts and put it in writing.' },
        { question: 'Can it connect to the software we already use?', answer: 'Usually, yes. Most modern tools have an API, and we build the connections so data flows between systems without copying and pasting.' },
      ],
      related: ['homeward', 'trakkrr'],
    },
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile apps',
    summary: 'iOS and Android apps, from first design to App Store approval.',
    description: 'iOS and Android apps from one codebase, designed to feel at home on both and shipped through store review.',
    included: ['App design for iPhone and Android', 'Accounts, payments and notifications', 'App Store and Google Play submission', 'Updates and support after launch'],
    cta: 'Start an app project',
    enquiry: 'Mobile app',
    page: {
      seoTitle: 'iOS & Android App Development Melbourne | JVDV Studio',
      metaDescription: 'iOS and Android app design and development for Australian businesses, from first prototype to App Store and Google Play approval and support after launch.',
      h1: 'iOS and Android app development',
      lead: 'Apps your customers will actually keep on their phones, built once for iPhone and Android and shipped through both stores.',
      intro: [
        'A great app does one job really well, faster than a website could. We help you find that job, design the app around it and build it in React Native or Flutter, so one codebase runs smoothly on both iPhone and Android.',
        'We take care of the parts that usually slow launches down, from accounts and payments to push notifications and store review, and we stay on after launch to ship updates as your users ask for more.',
      ],
      features: [
        { title: 'Product design', text: 'We shape the core features and design every screen, then test them with real people before building.' },
        { title: 'One codebase, two platforms', text: 'Built with React Native or Flutter, so iPhone and Android stay in step and cost less to maintain.' },
        { title: 'Accounts and payments', text: 'Sign-up, logins, subscriptions and in-app payments handled securely.' },
        { title: 'Location and notifications', text: 'Maps, nearby results and push notifications that bring people back at the right moment.' },
        { title: 'Store submission', text: 'We prepare the listings, screenshots and builds, and see them through App Store and Google Play review.' },
        { title: 'Updates after launch', text: 'Bug fixes, new features and operating system updates, so your app keeps working as phones change.' },
      ],
      audience: [
        'Businesses whose customers are mostly on their phones',
        'Memberships, loyalty programs and booking services',
        'Products that need location, notifications or the camera',
        'Startups taking a first version to market',
      ],
      faqs: [
        { question: 'Do I need an app or a website?', answer: 'If customers use your service often, or it needs location, notifications or the camera, an app usually earns its place. If they visit occasionally, a fast mobile website is often the better investment. We’ll tell you honestly which fits.' },
        { question: 'Will the app work on both iPhone and Android?', answer: 'Yes. We build with React Native or Flutter, so one codebase runs on both, which keeps the cost of building and updating down.' },
        { question: 'Do you handle the App Store and Google Play?', answer: 'Yes. We prepare your store listings and builds, submit them, and make any changes the reviewers ask for.' },
      ],
      related: ['findCards'],
    },
  },
  {
    slug: 'seo',
    title: 'SEO',
    summary: 'Technical SEO, local search and content that brings in customers.',
    description: 'Get found by the people already searching for what you do, with work you can see in a monthly report.',
    included: ['Technical audit and fixes', 'Local search and Google Business Profile', 'Page speed and Core Web Vitals', 'Monthly reporting in plain English'],
    cta: 'Talk to us about SEO',
    enquiry: 'SEO',
    page: {
      seoTitle: 'Technical & Local SEO Services Melbourne | JVDV Studio',
      metaDescription: 'Technical and local SEO for Melbourne businesses: site fixes, page speed, Google Business Profile and monthly reports in plain English.',
      h1: 'SEO for Melbourne businesses',
      lead: 'Get found by the people already searching for what you do, with work you can see in a plain-English report every month.',
      intro: [
        'Most small business websites don’t have a content problem, they have a findability problem: slow pages, missing titles, thin service pages and a Google Business Profile nobody looks after. We fix the foundations first, because they make everything else work harder.',
        'Then we build on them month by month, improving the pages that bring in enquiries and tracking where your visitors come from. No jargon and no vanity metrics, just what changed and what it did for the business.',
      ],
      features: [
        { title: 'Technical audit', text: 'We crawl your site and fix what’s holding it back, from broken links and duplicate pages to missing titles and structured data.' },
        { title: 'Page speed', text: 'Faster pages and better Core Web Vitals, which help both rankings and the number of visitors who stay.' },
        { title: 'Local search', text: 'Your Google Business Profile set up and kept current, with consistent business details across the web.' },
        { title: 'Service and location pages', text: 'Pages that match what customers search for, written to answer their questions.' },
        { title: 'Search Console and analytics', text: 'Set up properly, so you can see which searches and pages bring in enquiries.' },
        { title: 'Monthly reporting', text: 'A short, plain-English report on what we did, what moved and what’s next.' },
      ],
      audience: [
        'Businesses that rely on local customers',
        'Sites that rank poorly despite good services',
        'Businesses that have just launched or rebuilt a website',
        'Owners who want to understand what their SEO spend does',
      ],
      faqs: [
        { question: 'How long does SEO take to work?', answer: 'Technical fixes can show up within weeks, but most businesses see steady gains over a few months. Every monthly report shows you what has moved.' },
        { question: 'Can you guarantee first place on Google?', answer: 'No one honestly can. We focus on the work that reliably improves rankings and enquiries, and we report on real results rather than promises.' },
        { question: 'Can you do SEO on a site you didn’t build?', answer: 'Yes. We start with an audit of your current site and tell you what can be fixed in place and what would be better rebuilt.' },
      ],
      related: ['foxwood'],
    },
  },
  {
    slug: 'hosting-maintenance',
    title: 'Hosting and maintenance',
    summary: 'Fast hosting, backups, updates and changes on one monthly plan.',
    description: 'Fast, secure hosting and a team on hand for changes, all on one monthly plan.',
    included: ['Fast hosting on a global network', 'Backups and security updates', 'Uptime monitoring', 'Small changes included each month'],
    cta: 'Ask about care plans',
    enquiry: 'Hosting and maintenance',
    page: {
      seoTitle: 'Website Hosting & Maintenance Plans | JVDV Studio',
      metaDescription: 'Fast, secure website hosting and maintenance plans: backups, security updates, uptime monitoring and small changes each month, from a Melbourne studio.',
      h1: 'Website hosting and maintenance',
      lead: 'Fast, secure hosting and a team on hand for changes, so your website keeps working while you get on with running the business.',
      intro: [
        'Websites aren’t set and forget. Software needs updating, backups need checking and small changes pile up. A care plan means it’s all handled by people who know your site, for one predictable monthly fee.',
        'We host on a fast global network, keep everything patched and backed up, and watch for problems so we can usually fix them before you notice. When you need a change, you email us and it gets done.',
      ],
      features: [
        { title: 'Fast global hosting', text: 'Your site is served from a worldwide network, so it loads quickly wherever your customers are.' },
        { title: 'Security updates', text: 'Software and dependencies kept up to date and patched.' },
        { title: 'Backups', text: 'Regular backups, so your site and content can be restored if anything goes wrong.' },
        { title: 'Uptime monitoring', text: 'We’re alerted if your site goes down and work to get it back up fast.' },
        { title: 'Small changes included', text: 'Text, image and page updates each month, without a new quote every time.' },
        { title: 'Check-ins and advice', text: 'A regular look at speed, security and what could work harder for you.' },
      ],
      audience: [
        'Businesses we’ve built a website, store or app for',
        'Owners whose current developer has moved on',
        'Sites that are slow or haven’t been updated in years',
        'Teams that want changes made without a quote each time',
      ],
      faqs: [
        { question: 'Can you host a website you didn’t build?', answer: 'Often, yes. We review it first and let you know whether it can move as it is, or needs some work before we take it on.' },
        { question: 'What happens if my site goes down?', answer: 'Our monitoring alerts us straight away and we work to get it back up. Because we host and maintain the site, we already know it and can act quickly.' },
        { question: 'Can I cancel my plan?', answer: 'Yes. What happens to your site when a plan ends depends on your agreement, and we set that out clearly before you sign up.' },
      ],
      related: ['foxwood'],
    },
  },
];

export const serviceBySlug = (slug: string) => services.find(service => service.slug === slug);

// The six cards on the home page. Cards with a matching service page link to it.
export const homeServices: { title: string; text: string; href?: string }[] = [
  { title: 'Website design and build', text: 'Fast, mobile-friendly sites that look sharp and turn visitors into enquiries.', href: '/services/web-design' },
  { title: 'Custom web apps', text: 'Booking systems, client portals, CRMs and referral tools built around how you work.', href: '/services/web-apps' },
  { title: 'Content you can edit', text: 'Easy editing so you can update text, photos and stories yourself without calling us.' },
  { title: 'Hosting, care and monitoring', text: 'We keep your site fast, secure and up to date, and we fix problems before you notice them.', href: '/services/hosting-maintenance' },
  { title: 'SEO foundations', text: 'Clean code, proper page titles and share images, and fast load times so Google and your customers can find you.', href: '/services/seo' },
  { title: 'Ongoing improvements', text: 'New pages, features and tweaks as your business grows.' },
];

export const steps = [
  { title: 'Free consult', text: 'We learn your goals, then send a clear scope and a fixed quote.' },
  { title: 'Design', text: 'You review real pages, not mood boards, and we refine them together.' },
  { title: 'Build', text: 'A private preview link updates as we go, so you see progress every week.' },
  { title: 'Launch and care', text: 'We go live, then keep it fast, secure and improving.' },
];

export const faqs = [
  { question: 'How much does a website cost?', answer: 'Every project gets a fixed quote after a free consult, so you know the cost before anything starts.' },
  { question: 'How long does a project take?', answer: 'It depends on the scope. Your quote includes a timeline, and you can follow progress on a preview link the whole way through.' },
  { question: 'Can I update the site myself?', answer: 'Yes. We set your site up so your team can change text, images and posts, and we show you how.' },
  { question: 'Do you work with businesses outside Melbourne?', answer: 'Yes. We’re based in Melbourne and work with businesses across Australia over video calls.' },
  { question: 'Can you take over a site someone else built?', answer: 'Usually, yes. We start with a review of what’s there, then recommend whether to maintain, improve or rebuild it.' },
];
