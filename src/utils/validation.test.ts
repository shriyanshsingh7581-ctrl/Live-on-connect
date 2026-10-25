import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmail,
  isValidPhone,
  validateNewsletterInput,
  validateContactForm,
  validateQuoteForm,
  validateStreamUrl,
  filterGalleryItems,
  isValidWhatsAppNumber,
} from './validation';
import { SITE_CONFIG } from '../config/siteConfig';

test('email and phone validators accept valid inputs and reject invalid formats', () => {
  assert.equal(isValidEmail('producer@example.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('missing@tld'), false);

  assert.equal(isValidPhone('+91 98765 43210'), true);
  assert.equal(isValidPhone('123'), false);
  assert.equal(isValidPhone('abcdefg'), false);
});

test('newsletter validation requires both valid email and explicit privacy consent', () => {
  const missingConsent = validateNewsletterInput('user@example.com', false);
  assert.equal(missingConsent.valid, false);
  assert.ok(missingConsent.errors.consent);

  const invalidEmail = validateNewsletterInput('bad-email', true);
  assert.equal(invalidEmail.valid, false);
  assert.ok(invalidEmail.errors.email);

  const validSub = validateNewsletterInput('user@example.com', true);
  assert.equal(validSub.valid, true);
});

test('contact and quote form validators enforce required fields and spam honeypot check', () => {
  const emptyContact = validateContactForm({
    fullName: '',
    email: '',
    phone: '',
    serviceRequired: '',
    eventDate: '',
    eventLocation: '',
    platforms: [],
    estimatedAudience: '',
    message: 'short',
  });
  assert.equal(emptyContact.valid, false);
  assert.ok(emptyContact.errors.fullName);
  assert.ok(emptyContact.errors.email);
  assert.ok(emptyContact.errors.phone);
  assert.ok(emptyContact.errors.serviceRequired);
  assert.ok(emptyContact.errors.eventLocation);
  assert.ok(emptyContact.errors.message);

  const validQuote = validateQuoteForm({
    fullName: 'Aarav Menon',
    email: 'aarav@organization.org',
    phone: '+91 98765 43210',
    serviceRequired: 'Wireless Multicam Live',
    eventType: 'Corporate Conference',
    eventDate: '2026-11-15',
    eventLocation: 'Bengaluru, India',
    platforms: ['YouTube Live', 'LinkedIn Live'],
    estimatedAudience: '1,000 - 5,000',
    additionalRequirements: '4 cameras + live lower thirds',
  });
  assert.equal(validQuote.valid, true);
});

test('stream URL validator distinguishes unconfigured, invalid, and valid HLS/MP4 URLs', () => {
  const empty = validateStreamUrl('');
  assert.equal(empty.isConfigured, false);

  const badUrl = validateStreamUrl('not-a-url');
  assert.equal(badUrl.isConfigured, true);
  assert.equal(badUrl.isValidFormat, false);

  const validHls = validateStreamUrl('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  assert.equal(validHls.isConfigured, true);
  assert.equal(validHls.isValidFormat, true);
  assert.equal(validHls.protocol, 'hls');
});

test('gallery filtering matches category and search query deterministically', () => {
  const allItems = SITE_CONFIG.streamGalleryItems;
  assert.equal(filterGalleryItems(allItems, 'All', '').length, allItems.length);

  const sportsOnly = filterGalleryItems(allItems, 'Sports & Scorecards', '');
  assert.equal(sportsOnly.length, 1);
  assert.equal(sportsOnly[0].id, 'gal-2');

  const search360 = filterGalleryItems(allItems, 'All', '360°');
  assert.equal(search360.length, 1);
  assert.equal(search360[0].id, 'gal-6');
});

test('WhatsApp number validator rejects placeholder zeros and accepts valid numbers', () => {
  assert.equal(isValidWhatsAppNumber(''), false);
  assert.equal(isValidWhatsAppNumber('+91-00000-00000'), false);
  assert.equal(isValidWhatsAppNumber('919876543210'), true);
});
