import type { ElementType } from 'react';

export interface ServiceBenefit {
  title: string;
  desc: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SubProduct {
  number: string;
  name: string;
  tagline?: string;
  desc: string;
  icon: ElementType;
}

export interface ServiceDetails {
  heroImage?: string;
  longDesc: string;
  features: string[];
  benefits: ServiceBenefit[];
  faq?: FaqItem[];
}

export interface ServiceData {
  id: string;
  title: string;
  subtitle?: string;
  desc: string;
  tags: string[];
  link: string;
  icon: ElementType;
  gradient: string;
  details: ServiceDetails;
  subProducts?: SubProduct[];
}

export interface NavLink {
  name: string;
  href: string;
}
