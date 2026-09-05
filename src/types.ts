export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  reelsCount: number;
}

export interface GrowthStep {
  stepNumber: string;
  title: string;
  description: string;
  details: string;
  iconName: string;
}

export interface BrandPillar {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

export interface FounderFact {
  label: string;
  value: string;
  description: string;
}

export interface LeadSubmission {
  name: string;
  email: string;
  phone?: string;
  brandType: string;
  socials: string;
  message: string;
}

export interface InstagramInsights {
  period: string;
  views: string;
  newFollowers: string;
  growthPercentage: string;
  contentShared?: string;
}

export interface TestimonialItem {
  id: string;
  handle: string;
  name: string;
  profession: string;
  image: string;
  postsCount: string;
  followersCount: string;
  followingCount: string;
  bioLines: string[];
  quote: string;
  metricBadge: string;
  subMetric: string;
  profileLink: string;
  isVerified?: boolean;
  insights?: InstagramInsights;
}
