import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity client – use same project as Studio: "TomasMensik" (org Jaroslav Triska)
// Set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET in Vercel / .env
export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '2mnybhg0',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Set to false for preview mode
});

// Safe fetch wrapper with error handling
export async function safeFetch<T>(query: string, params?: Record<string, any>): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params || {});
    return result || ([] as T);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    // Return empty array for array queries, null for single queries
    if (query.includes('[')) {
      return [] as T;
    }
    return null as T;
  }
}

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// TypeScript interfaces for Sanity documents
export interface SanityProperty {
  _id: string;
  title: string;
  slug: { current: string };
  status: 'forSale' | 'sold' | 'reserved';
  type: 'prodej' | 'pronajem';
  propertyType: 'byt' | 'dum' | 'pozemek' | 'komercni' | 'chata';
  location: string;
  address?: string;
  price: number;
  priceNote?: string;
  area?: number;
  disposition?: string;
  mainImage: SanityImageSource;
  images?: SanityImageSource[];
  videos?: Array<{
    url?: string;
    file?: { asset: { _ref: string } };
  }>;
  description?: string;
  parameters?: { label: string; value: string }[];
  featured?: boolean;
  order?: number;
}

export interface SanityService {
  _id: string;
  title: string;
  slug?: { current: string };
  description: string;
  detailedDescription?: Array<{
    _type: string;
    _key: string;
    style?: string;
    children?: Array<{
      _type: string;
      _key: string;
      text: string;
      marks?: Array<string | { _type: string; _key: string }>;
    }>;
    markDefs?: Array<{
      _type: string;
      _key: string;
      href?: string;
    }>;
    asset?: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;
  icon: 'home' | 'key' | 'chart' | 'chat' | 'search' | 'document';
  features?: string[];
  order?: number;
  gallery?: Array<{
    type: 'image' | 'video';
    image?: SanityImageSource;
    videoUrl?: string;
    videoFile?: { asset: { _ref: string } };
  }>;
}

export interface SanityTestimonial {
  _id: string;
  clientName: string;
  location?: string;
  text: string;
  serviceType?: string;
  date?: string;
  featured?: boolean;
  order?: number;
}

export interface SanityAbout {
  _id: string;
  name: string;
  subtitle?: string;
  bio: string;
  mainPhoto?: SanityImageSource;
  mainVideo?: {
    url?: string;
    file?: { asset: { _ref: string } };
  };
  photos?: SanityImageSource[];
  media?: Array<{
    type: 'image' | 'video';
    image?: SanityImageSource;
    videoUrl?: string;
    videoFile?: { asset: { _ref: string } };
  }>;
  interests?: string[];
  stats?: { number: string; label: string }[];
}

export interface SanityPartner {
  _id: string;
  name: string;
  description?: string;
  website: string;
  logo?: SanityImageSource;
  category?: string;
  order?: number;
}

export interface SanityNavLink {
  label?: string;
  href?: string;
}

export interface SanityFooterLink {
  label?: string;
  href?: string;
}

export interface SanitySiteSettings {
  _id: string;
  siteName: string;
  siteDescription?: string;
  logoImage?: SanityImageSource;
  logoAlt?: string;
  colorTheme?: 'green' | 'blue' | 'amber' | 'dark';
  fontVariant?: 'classic' | 'elegant' | 'modern';
  phone?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  address?: string;
  openingHours?: { days: string; hours: string }[];
  heroImage?: SanityImageSource;
  heroVideo?: {
    url?: string;
    file?: { asset: { _ref: string } };
  };
  heroTagline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaOffer?: string;
  heroCtaContact?: string;
  servicesSectionTitle?: string;
  servicesSectionDescription?: string;
  servicesCtaLabel?: string;
  propertiesSectionTitle?: string;
  propertiesSectionDescription?: string;
  propertiesCtaLabel?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  footerBrandName?: string;
  footerTagline?: string;
  copyrightText?: string;
  footerQuickLinks?: SanityFooterLink[];
  navLinks?: SanityNavLink[];
  careerTitle?: string;
  careerSubtitle?: string;
  cooperationTitle?: string;
  cooperationSubtitle?: string;
}

// GROQ Queries
export const queries = {
  // Properties
  allProperties: `*[_type == "property" && status == "forSale"] | order(order asc, _createdAt desc)`,
  soldProperties: `*[_type == "property" && status == "sold"] | order(order asc, _createdAt desc)`,
  featuredProperties: `*[_type == "property" && status == "forSale" && featured == true] | order(order asc)[0...6]`,
  propertyBySlug: `*[_type == "property" && slug.current == $slug][0]`,
  
  // Services
  allServices: `*[_type == "service"] | order(order asc)`,
  serviceBySlug: `*[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    detailedDescription,
    icon,
    features,
    order,
    gallery[]{
      type,
      image,
      videoUrl,
      videoFile
    }
  }`,
  
  // Testimonials
  allTestimonials: `*[_type == "testimonial"] | order(order asc)`,
  featuredTestimonials: `*[_type == "testimonial" && featured == true] | order(order asc)[0...6]`,
  
  // About
  about: `*[_type == "about"][0]`,
  // Partners
  allPartners: `*[_type == "partner"] | order(order asc, _createdAt asc)`,
  
  // Site Settings
  siteSettings: `*[_type == "siteSettings"][0]`,
};

// Helper function to format price in Czech format
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Get property status label
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    forSale: 'Na prodej',
    sold: 'Prodáno',
    reserved: 'Rezervováno',
  };
  return labels[status] || status;
}

// Get service type label
export function getServiceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    prodejBytu: 'Prodej bytu',
    prodejDomu: 'Prodej domu',
    nakupBytu: 'Nákup bytu',
    nakupDomu: 'Nákup domu',
    pronajem: 'Pronájem',
    odhad: 'Odhad',
    konzultace: 'Konzultace',
    prodejNakup: 'Prodej i nákup',
  };
  return labels[type] || type;
}
