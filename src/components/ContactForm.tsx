import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { validateContactForm, type ContactFormInput } from '../utils/validation';

const PLATFORM_OPTIONS = [
  'YouTube Live',
  'Facebook Live',
  'LinkedIn Live',
  'Custom Website Player (HLS)',
  'Zoom / Webinar Bridge',
  'In-Venue LED Screens Only',
];

const AUDIENCE_RANGES = [
  'Under 250 viewers',
  '250 – 1,000 viewers',
  '1,000 – 5,000 viewers',
  '5,000 – 25,000 viewers',
  '25,000+ viewers',
];

export function ContactForm() {
  const [form, setForm] = useState<ContactFormInput>({
    fullName: '',
    email: '',
    phone: '',
    serviceRequired: '',
    eventDate: '',
    eventLocation: '',
    platforms: [],
    estimatedAudience: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const togglePlatform = (platform: string) => {
    setForm((prev) => {
      const exists = prev.platforms.includes(platform);
      return {
        ...prev,
        platforms: exists
          ? prev.platforms.filter((p) => p !== platform)
          : [...prev.platforms, platform],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const validation = validateContactForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      setStatus('error');
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus('error');
        setServerError(data.error || 'Could not submit enquiry. Please verify your details.');
        return;
      }

      setStatus('success');
      setReferenceId(data.referenceId || '');
      setForm({
        fullName: '',
        email: '',
        phone: '',
        serviceRequired: '',
        eventDate: '',
        eventLocation: '',
        platforms: [],
        estimatedAudience: '',
        message: '',
        honeypot: '',
      });
    } catch {
      setStatus('error');
      setServerError('Network error while sending enquiry. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-900 space-y-4"
      >
        <div className="w-11 h-11 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Enquiry Received &amp; Logged</h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          Thank you for contacting {SITE_CONFIG.brand.name}. Your event details have been saved in
          our private production desk queue. Our broadcast coordinator will review your technical
          requirements and respond during working hours ({SITE_CONFIG.brand.workingHours}).
        </p>
        {referenceId && (
          <p className="text-xs font-mono-tech text-emerald-800">
            Submission Reference ID: {referenceId}
          </p>
        )}
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot field for spam protection */}
      <input
        type="text"
        name="contact_org_hp"
        value={form.honeypot}
        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="contact-fullName" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Full Name <span className="text-rose-600">*</span>
          </label>
          <input
            id="contact-fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => {
              setForm({ ...form, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            placeholder="Your full name"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none ${
              errors.fullName ? 'border-rose-500' : 'border-slate-300 focus:border-sky-600'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address <span className="text-rose-600">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder="name@company.com"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none ${
              errors.email ? 'border-rose-500' : 'border-slate-300 focus:border-sky-600'
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Phone Number <span className="text-rose-600">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => {
              setForm({ ...form, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            placeholder="+91 98765 43210"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none ${
              errors.phone ? 'border-rose-500' : 'border-slate-300 focus:border-sky-600'
            }`}
          />
          {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
        </div>

        {/* Service Required */}
        <div>
          <label htmlFor="contact-service" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Service Required <span className="text-rose-600">*</span>
          </label>
          <select
            id="contact-service"
            value={form.serviceRequired}
            onChange={(e) => {
              setForm({ ...form, serviceRequired: e.target.value });
              if (errors.serviceRequired) setErrors({ ...errors, serviceRequired: '' });
            }}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none ${
              errors.serviceRequired ? 'border-rose-500' : 'border-slate-300 focus:border-sky-600'
            }`}
          >
            <option value="">Select a service...</option>
            {SITE_CONFIG.featuredServices.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Custom End-to-End Broadcast Package">
              Custom End-to-End Broadcast Package
            </option>
          </select>
          {errors.serviceRequired && (
            <p className="mt-1 text-xs text-rose-600">{errors.serviceRequired}</p>
          )}
        </div>

        {/* Event Date */}
        <div>
          <label htmlFor="contact-date" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Event Date
          </label>
          <input
            id="contact-date"
            type="date"
            value={form.eventDate}
            onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-sky-600"
          />
        </div>

        {/* Event Location */}
        <div>
          <label htmlFor="contact-location" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Event Location (City / Venue) <span className="text-rose-600">*</span>
          </label>
          <input
            id="contact-location"
            type="text"
            value={form.eventLocation}
            onChange={(e) => {
              setForm({ ...form, eventLocation: e.target.value });
              if (errors.eventLocation) setErrors({ ...errors, eventLocation: '' });
            }}
            placeholder="e.g., Bengaluru Convention Center"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none ${
              errors.eventLocation ? 'border-rose-500' : 'border-slate-300 focus:border-sky-600'
            }`}
          />
          {errors.eventLocation && (
            <p className="mt-1 text-xs text-rose-600">{errors.eventLocation}</p>
          )}
        </div>
      </div>

      {/* Estimated Audience */}
      <div>
        <label htmlFor="contact-audience" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Estimated Online / In-Venue Audience
        </label>
        <select
          id="contact-audience"
          value={form.estimatedAudience}
          onChange={(e) => setForm({ ...form, estimatedAudience: e.target.value })}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-sky-600"
        >
          <option value="">Select estimated audience size...</option>
          {AUDIENCE_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      {/* Preferred Streaming Platforms */}
      <fieldset>
        <legend className="block text-xs font-semibold text-slate-700 mb-2">
          Preferred Streaming Platforms
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PLATFORM_OPTIONS.map((platform) => {
            const checked = form.platforms.includes(platform);
            return (
              <label
                key={platform}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                  checked
                    ? 'bg-sky-50 border-sky-600 text-slate-900 font-medium'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => togglePlatform(platform)}
                  className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span>{platform}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Event Details &amp; Message <span className="text-rose-600">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: '' });
          }}
          placeholder="Tell us about camera count, stage setup, live scorecard needs, or post-production deliverables..."
          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none ${
            errors.message ? 'border-rose-500' : 'border-slate-300 focus:border-sky-600'
          }`}
        />
        {errors.message && <p className="mt-1 text-xs text-rose-600">{errors.message}</p>}
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Submissions are stored privately on the backend server and never displayed publicly.
        </p>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          <span>{status === 'loading' ? 'Sending Enquiry...' : 'Submit Contact Enquiry'}</span>
        </button>
      </div>
    </form>
  );
}
