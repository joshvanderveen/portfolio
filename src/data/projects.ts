import type { ImageMetadata } from 'astro';
import fcHome from '../assets/work/find-cards/home.png';
import fcExplore from '../assets/work/find-cards/explore.png';
import fcDeal from '../assets/work/find-cards/deal-redeem.png';
import fcCharity from '../assets/work/find-cards/charity.png';
import fcMap from '../assets/work/find-cards/map.png';
import fcPortal from '../assets/work/find-cards/portal.png';
import fwHome from '../assets/work/foxwood-media/home-desktop.jpg';
import fwCard from '../assets/work/foxwood-media/home-card.jpg';
import fwStory from '../assets/work/foxwood-media/story-desktop.jpg';
import fwGallery from '../assets/work/foxwood-media/gallery-mobile.jpg';
import fwWedding from '../assets/work/foxwood-media/wedding-mobile.jpg';
import fwEnquire from '../assets/work/foxwood-media/enquire-mobile.jpg';
import hwToday from '../assets/work/homeward/today.png';
import hwBoard from '../assets/work/homeward/seller-board.png';
import hwContact from '../assets/work/homeward/contact.png';
import hwListings from '../assets/work/homeward/listings.png';

export type Category = 'websites' | 'web-apps' | 'mobile-apps' | 'e-commerce' | 'seo';

export interface Screen {
  image: ImageMetadata;
  alt: string;
}

// Screenshots of the FIND Cards app (captured on an Android emulator against staging data) and its web portal.
export const findCardsScreens = {
  home: { image: fcHome, alt: 'FIND Cards home screen with today’s picked deal, saved offers ending soon and giveaways' },
  explore: { image: fcExplore, alt: 'FIND Cards Explore screen with categories, businesses and popular deals' },
  deal: { image: fcDeal, alt: 'A FIND Cards deal for a quiche special at Cafe One88, showing the was and now prices, validity and a Redeem button' },
  charity: { image: fcCharity, alt: 'FIND Cards Support organisation screen, where members vote for the charity their membership supports' },
  map: { image: fcMap, alt: 'FIND Cards map of offers across Australia with deal cards underneath' },
  portal: { image: fcPortal, alt: 'A business owner’s Deals page in the FIND Cards portal, listing each deal’s original and deal price, dates and status' },
} satisfies Record<string, Screen>;

// Screenshots of the live foxwoodmedia.com.au.
export const foxwoodScreens = {
  home: { image: fwHome, alt: 'Foxwood Media home page: “Capturing love, life & the in-between” over a wedding ceremony video' },
  card: { image: fwCard, alt: 'Foxwood Media home page with a wedding ceremony video behind the headline' },
  story: { image: fwStory, alt: 'A Foxwood Media story page for Sophie & Alex’s couples session, opening a gallery of their photos' },
  gallery: { image: fwGallery, alt: 'Foxwood Media’s stories gallery on a phone, opening with Caleb & Hannah’s wedding' },
  wedding: { image: fwWedding, alt: 'Foxwood Media’s Melbourne wedding photography service page on a phone' },
  enquire: { image: fwEnquire, alt: 'Foxwood Media’s enquiry form on a phone, starting with “It starts with your story”' },
} satisfies Record<string, Screen>;

// Screenshots of Homeward running locally on made-up demo data.
export const homewardScreens = {
  today: { image: hwToday, alt: 'Homeward’s Today screen: overdue calls and follow-ups, automatic tasks for new listings and lease ends, and authorities and leases coming up' },
  board: { image: hwBoard, alt: 'Homeward’s seller pipeline board, with sellers grouped from 6–12 months out to listed, each card showing temperature, address and next task' },
  contact: { image: hwContact, alt: 'A Homeward contact record with three open journeys for one person: landlord, buyer and seller' },
  listings: { image: hwListings, alt: 'Homeward’s listings table of the agency’s own and competitors’ listings, with price guide, status, days on market and authority end' },
} satisfies Record<string, Screen>;

export interface Project {
  name: string;
  summary: string;
  tags: string[];
  categories: Category[];
  // Shown in the empty image slot until a real screenshot is added.
  shot: string;
  screens?: Screen[];
  // A single wide screenshot, used instead of `screens`.
  cover?: Screen;
  // Path of the case study page, if there is one.
  href?: string;
}

export const categories: { id: Category; label: string }[] = [
  { id: 'websites', label: 'Websites' },
  { id: 'web-apps', label: 'Web apps' },
  { id: 'mobile-apps', label: 'Mobile apps' },
  { id: 'e-commerce', label: 'E-Commerce' },
  { id: 'seo', label: 'SEO' },
];

export const projects = {
  findCards: {
    name: 'FIND Cards',
    summary: 'A membership app that puts local deals in members’ pockets. Members browse and redeem offers from nearby businesses and support a charity, while each business runs its offers from its own portal.',
    tags: ['Mobile app', 'Business portal'],
    categories: ['mobile-apps', 'web-apps'],
    shot: 'FIND Cards app screens',
    screens: [findCardsScreens.home, findCardsScreens.deal, findCardsScreens.map],
    href: '/work/find-cards',
  },
  trakkrr: {
    name: 'Trakkrr',
    summary: 'GPS asset tracking with telemetry built in. Fleet operators see live location and condition for vehicles, machinery, trailers and plant, with alerts, geofences and utilisation reports.',
    tags: ['Web platform', 'Website'],
    categories: ['web-apps', 'websites'],
    shot: 'Trakkrr live fleet map',
  },
  foxwood: {
    name: 'Foxwood Media',
    summary: 'A website for a Melbourne wedding and family photography team that they update themselves.',
    tags: ['Website', 'SEO', 'Hosting'],
    categories: ['websites', 'seo'],
    shot: 'Foxwood Media homepage',
    cover: foxwoodScreens.card,
    href: '/work/foxwood-media',
  },
  homeward: {
    name: 'Homeward',
    summary: 'A CRM built for a Melbourne real estate agent. Every contact’s selling, buying and leasing plans sit on their own pipeline, and the follow-ups create themselves.',
    tags: ['Web app', 'MCP integration'],
    categories: ['web-apps'],
    shot: 'Homeward seller pipeline',
    cover: homewardScreens.board,
    href: '/work/homeward',
  },
} satisfies Record<string, Project>;
