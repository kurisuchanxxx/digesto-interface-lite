export type Role = "user" | "assistant";

export interface CallToAction {
  label: string;
  href: string;
}

export interface NavigationContent {
  mainLinks: CallToAction[];
  primaryAction: CallToAction;
  secondaryAction?: CallToAction;
}

export interface HeroContent {
  kicker: string;
  title: string;
  subtitle: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
}

export interface ChatContent {
  title: string;
  subtitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  sendButton: string;
  thinkingLabel: string;
  demoBadge: string;
  mockResponse: string;
  disclaimer: string;
  emptyState: string;
  errorNetwork: string;
}

export interface WorkflowItemContent {
  tag: string;
  title: string;
  description: string;
}

export interface WorkflowsContent {
  kicker: string;
  title: string;
  description: string;
  items: WorkflowItemContent[];
}

export interface FeatureItemContent {
  title: string;
  description: string;
}

export interface FeaturesContent {
  kicker: string;
  title: string;
  description: string;
  items: FeatureItemContent[];
}

export interface TestimonialCategoryContent {
  id: number;
  label: string;
}

export interface TestimonialItemContent {
  name: string;
  company: string;
  content: string;
  categories: number[];
}

export interface TestimonialsContent {
  title: string;
  description: string;
  categories: TestimonialCategoryContent[];
  items: TestimonialItemContent[];
}

export interface CtaContent {
  title: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
}

export interface FooterColumnContent {
  title: string;
  links: CallToAction[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "x" | "medium" | "github";
}

export interface FooterContent {
  columns: FooterColumnContent[];
  socials: SocialLink[];
  legal: {
    copyright: string;
    termsLabel: string;
    termsHref: string;
  };
}

export interface ContentSchema {
  brandName: string;
  siteTitle: string;
  siteDescription: string;
  navigation: NavigationContent;
  hero: HeroContent;
  chat: ChatContent;
  workflows: WorkflowsContent;
  features: FeaturesContent;
  testimonials: TestimonialsContent;
  cta: CtaContent;
  footer: FooterContent;
}
