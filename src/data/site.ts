// Business details used across the site. Empty optional values are left off the page.
export const site = {
  name: 'JVDV Studio',
  shortName: 'JVDV',
  description: 'JVDV Studio is a Melbourne web design and development agency. We design, build and look after websites, web apps and Shopify stores for small businesses across Australia.',
  founder: 'Josh Van Der Veen',
  email: 'hello@joshvdv.com',
  phone: '0444 529 866',
  abn: '',
  location: 'Melbourne, Victoria',
  linkedin: 'https://www.linkedin.com/in/josh-van-der-veen',
  github: 'https://github.com/joshvanderveen',
};

// The phone number as a tel: link in international form (0444 529 866 becomes tel:+61444529866).
export const phoneHref = site.phone ? `tel:+61${site.phone.replace(/\s+/g, '').replace(/^0/, '')}` : '';

export const nav = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

// Shown on the home and About pages.
export const clients = ['FIND Foundation', 'Trakkrr', 'Foxwood Media'];

// Options for the contact page form.
export const budgets = ['Not sure yet', 'Under $5k', '$5k to $15k', '$15k to $40k', '$40k and up'];
export const timelines = ['Flexible', 'As soon as possible', 'In 1 to 3 months', 'In 3 to 6 months'];
