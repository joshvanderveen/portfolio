export interface Service {
  id: string;
  title: string;
  // One line for the home page cards.
  summary: string;
  // A longer line for the Services page.
  description: string;
  included: string[];
  cta: string;
  // Value sent with enquiries when this service is picked.
  enquiry: string;
}

export const services: Service[] = [
  {
    id: 'websites',
    title: 'Website design and build',
    summary: 'Custom sites that load fast, rank well and are easy for your team to update.',
    description: 'Custom sites that load fast, rank well and are easy for your team to update, designed around how your customers decide.',
    included: ['Strategy, sitemap and copy guidance', 'Custom design for desktop and mobile', 'Pages your team can update', 'Analytics, SEO foundations and launch'],
    cta: 'Start a website project',
    enquiry: 'Website',
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce stores',
    summary: 'New stores, migrations and custom themes designed to convert.',
    description: 'Shopify stores, migrations and custom themes that make your products look their best and make checkout effortless.',
    included: ['Store setup or migration from another platform', 'Custom theme design and development', 'Payments, shipping and apps configured', 'Product and collection page optimisation'],
    cta: 'Start a store project',
    enquiry: 'E-Commerce store',
  },
  {
    id: 'web-apps',
    title: 'Custom web apps',
    summary: 'Platforms, portals and dashboards built around how your business runs.',
    description: 'Platforms, client portals and dashboards built around the way your business actually runs.',
    included: ['Product discovery and scoping', 'Interface design and prototyping', 'Secure accounts, roles and data', 'Integrations with the tools you already use'],
    cta: 'Start a web app project',
    enquiry: 'Web app',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile apps',
    summary: 'iOS and Android apps, from first design to App Store approval.',
    description: 'iOS and Android apps from one codebase, designed to feel at home on both and shipped through store review.',
    included: ['App design for iPhone and Android', 'Accounts, payments and notifications', 'App Store and Google Play submission', 'Updates and support after launch'],
    cta: 'Start an app project',
    enquiry: 'Mobile app',
  },
  {
    id: 'seo',
    title: 'SEO',
    summary: 'Technical SEO, local search and content that brings in customers.',
    description: 'Get found by the people already searching for what you do, with work you can see in a monthly report.',
    included: ['Technical audit and fixes', 'Local search and Google Business Profile', 'Page speed and Core Web Vitals', 'Monthly reporting in plain English'],
    cta: 'Talk to us about SEO',
    enquiry: 'SEO',
  },
  {
    id: 'hosting',
    title: 'Hosting and maintenance',
    summary: 'Fast hosting, backups, updates and changes on one monthly plan.',
    description: 'Fast, secure hosting and a team on hand for changes, all on one monthly plan.',
    included: ['Fast hosting on a global network', 'Backups and security updates', 'Uptime monitoring', 'Small changes included each month'],
    cta: 'Ask about care plans',
    enquiry: 'Hosting and maintenance',
  },
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
