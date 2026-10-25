import type { GalleryVideoItem } from '../config/siteConfig';

export interface ContactFormInput {
  fullName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  eventDate: string;
  eventLocation: string;
  platforms: string[];
  estimatedAudience: string;
  message: string;
  honeypot?: string;
}

export interface QuoteFormInput {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  serviceRequired: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  platforms: string[];
  estimatedAudience: string;
  additionalRequirements: string;
  honeypot?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d][\d\s\-()]{6,20}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(String(email || '').trim());
}

export function isValidPhone(phone: string): boolean {
  const trimmed = String(phone || '').trim();
  const digitsOnly = trimmed.replace(/\D/g, '');
  return PHONE_PATTERN.test(trimmed) && digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

export function validateNewsletterInput(email: string, consent: boolean): ValidationResult {
  const errors: Record<string, string> = {};
  if (!email || !email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address (e.g., name@company.com).';
  }

  if (!consent) {
    errors.consent = 'Please accept the privacy consent checkbox to subscribe.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateContactForm(input: ContactFormInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.form = 'Spam protection triggered.';
    return { valid: false, errors };
  }

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!input.email || !isValidEmail(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!input.phone || !isValidPhone(input.phone)) {
    errors.phone = 'Please enter a valid phone number (7–15 digits).';
  }

  if (!input.serviceRequired || input.serviceRequired.trim().length === 0) {
    errors.serviceRequired = 'Please select the primary service required.';
  }

  if (!input.eventLocation || input.eventLocation.trim().length < 2) {
    errors.eventLocation = 'Please enter the event venue or city.';
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Please describe your event requirements (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateQuoteForm(input: QuoteFormInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.form = 'Spam protection triggered.';
    return { valid: false, errors };
  }

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!input.email || !isValidEmail(input.email)) {
    errors.email = 'Please enter a valid business or personal email address.';
  }

  if (!input.phone || !isValidPhone(input.phone)) {
    errors.phone = 'Please enter a valid contact phone number.';
  }

  if (!input.serviceRequired || input.serviceRequired.trim().length === 0) {
    errors.serviceRequired = 'Please select a required broadcast service.';
  }

  if (!input.eventType || input.eventType.trim().length === 0) {
    errors.eventType = 'Please specify the event type.';
  }

  if (!input.eventLocation || input.eventLocation.trim().length < 2) {
    errors.eventLocation = 'Please specify the event city or venue.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStreamUrl(url: string): {
  isConfigured: boolean;
  isValidFormat: boolean;
  protocol: 'hls' | 'mp4' | 'unknown';
  errorMessage?: string;
} {
  const trimmed = String(url || '').trim();
  if (!trimmed) {
    return {
      isConfigured: false,
      isValidFormat: false,
      protocol: 'unknown',
    };
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return {
        isConfigured: true,
        isValidFormat: false,
        protocol: 'unknown',
        errorMessage: 'Stream URL must use HTTP or HTTPS protocol.',
      };
    }

    const lowerPath = parsed.pathname.toLowerCase();
    if (lowerPath.endsWith('.m3u8')) {
      return { isConfigured: true, isValidFormat: true, protocol: 'hls' };
    }
    if (lowerPath.endsWith('.mp4') || lowerPath.endsWith('.webm')) {
      return { isConfigured: true, isValidFormat: true, protocol: 'mp4' };
    }

    return {
      isConfigured: true,
      isValidFormat: true,
      protocol: 'hls',
    };
  } catch {
    return {
      isConfigured: true,
      isValidFormat: false,
      protocol: 'unknown',
      errorMessage: 'Invalid URL syntax. Provide a valid https:// stream endpoint (.m3u8 or .mp4).',
    };
  }
}

export function filterGalleryItems(
  items: GalleryVideoItem[],
  category: string,
  searchQuery: string
): GalleryVideoItem[] {
  const normalizedCategory = String(category || 'All').trim();
  const normalizedQuery = String(searchQuery || '').trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory =
      normalizedCategory === 'All' || item.category === normalizedCategory;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;
    const haystack = `${item.title} ${item.shortDescription} ${item.category} ${item.resolution}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export function isValidWhatsAppNumber(rawNumber: string): boolean {
  const trimmed = String(rawNumber || '').trim();
  if (!trimmed) return false;
  const digits = trimmed.replace(/\D/g, '');
  // Reject placeholder all-zeros numbers like 910000000000
  if (/^(\d{1,3})?0{6,}$/.test(digits)) return false;
  return digits.length >= 10 && digits.length <= 15;
}
