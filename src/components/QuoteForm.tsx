import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { validateQuoteForm, type QuoteFormInput } from '../utils/validation';

interface QuoteFormProps {
  defaultService?: string;
  onSuccess?: (referenceId: string) => void;
}

const EVENT_TYPES = [
  'Corporate Conference / Town Hall',
  'Sports Tournament / Match Broadcast',
  'Concert / Cultural Stage Performance',
  'Academic Convocation / Seminar',
  'Product Launch / Hybrid Webcast',
  'Religious / Community Gathering',
  'Other Custom Event',
];

const PLATFORM_OPTIONS = [
  'YouTube Live',
  'Facebook Live',
  'LinkedIn Live',
  'Embedded Website Player',
  'Custom RTMP / SRT Destination',
  'In-Venue IMAG / LED Wall',
];

export function QuoteForm({ defaultService = '', onSuccess }: QuoteFormProps) {
  const [form, setForm] = useState<QuoteFormInput>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: defaultService,
    eventType: 'Corporate Conference / Town Hall',
    eventDate: '',
    eventLocation: '',
    platforms: ['YouTube Live'],
    estimatedAudience: '250 – 1,000 viewers',
    additionalRequirements: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    if (defaultService) {
      setForm((prev) => ({ ...prev, serviceRequired: defaultService }));
    }
  }, [defaultService]);

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

    const validation = validateQuoteForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      setStatus('error');
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus('error');
        setServerError(data.error || 'Could not submit quote request.');
        return;
      }

      setStatus('success');
      setReferenceId(data.referenceId || '');
      if (onSuccess) {
        onSuccess(data.referenceId || '');
      }
    } catch {
      setStatus('error');
      setServerError('Unable to reach server. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        className="p-6 sm:p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-900 space-y-4"
      >
        <div className="w-11 h-11 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Production Quote Request Registered
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          Your technical requirements have been securely recorded. Our production engineering desk
          will prepare a customized equipment and crew estimate and contact you at{' '}
          <span className="font-semibold">{form.email}</span>.
        </p>
        {referenceId && (
          <p className="text-xs font-mono-tech text-emerald-800">
            Quote Reference ID: {referenceId}
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setForm((prev) => ({
              ...prev,
              fullName: '',
              email: '',
              phone: '',
              eventLocation: '',
              additionalRequirements: '',
            }));
          }}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
        >
          Request Another Quote
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <input
        type="text"
        name="quote_hp"
        value={form.honeypot}
        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-fullName" className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name <span className="text-rose-600">*</span>
          </label>
          <input
            id="quote-fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => {
              setForm({ ...form, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            placeholder="Your full name"
            className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none ${
              errors.fullName ? 'border-rose-500' : 'border-slate-300 focus:border-sky-600'
            }`}
          />
          {errors.fullName && <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="quote-email" className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-600">*</span>
          </label>
          <input
            id="quote-email"
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder="name@organization.com"
            className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none ${
              errors.email ? 'border-rose-500' : 'border-slate-300 focus:border-sky-600'
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="quote-phone" className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-rose-600">*</span>
          </label>
          <input
            id="quote-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => {
              setForm({ ...form, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            placeholder="+91 98765 43210"
            className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none ${
              errors.phone ? 'border-rose-500' : 'border-slate-300 focus:border-sky-600'
            }`}
          />
          {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="quote-service" className="block text-xs font-semibold text-slate-700 mb-1">
            Required Service <span className="text-rose-600">*</span>
          </label>
          <select
            id="quote-service"
            value={form.serviceRequired}
            onChange={(e) => {
              setForm({ ...form, serviceRequired: e.target.value });
              if (errors.serviceRequired) setErrors({ ...errors, serviceRequired: '' });
            }}
            className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none ${
              errors.serviceRequired ? 'border-rose-500' : 'border-slate-300 focus:border-sky-600'
            }`}
          >
            <option value="">Select primary service...</option>
            {SITE_CONFIG.featuredServices.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Full Multi-Camera & Simulcast Package">
              Full Multi-Camera &amp; Simulcast Package
            </option>
          </select>
          {errors.serviceRequired && (
            <p className="mt-1 text-xs text-rose-600">{errors.serviceRequired}</p>
          )}
        </div>

        <div>
          <label htmlFor="quote-eventType" className="block text-xs font-semibold text-slate-700 mb-1">
            Event Type <span className="text-rose-600">*</span>
          </label>
          <select
            id="quote-eventType"
            value={form.eventType}
            onChange={(e) => setForm({ ...form, eventType: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-sky-600"
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quote-location" className="block text-xs font-semibold text-slate-700 mb-1">
            Event City &amp; Venue <span className="text-rose-600">*</span>
          </label>
          <input
            id="quote-location"
            type="text"
            value={form.eventLocation}
            onChange={(e) => {
              setForm({ ...form, eventLocation: e.target.value });
              if (errors.eventLocation) setErrors({ ...errors, eventLocation: '' });
            }}
            placeholder="City or venue name"
            className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none ${
              errors.eventLocation ? 'border-rose-500' : 'border-slate-300 focus:border-sky-600'
            }`}
          />
          {errors.eventLocation && (
            <p className="mt-1 text-xs text-rose-600">{errors.eventLocation}</p>
          )}
        </div>

        <div>
          <label htmlFor="quote-date" className="block text-xs font-semibold text-slate-700 mb-1">
            Tentative Event Date
          </label>
          <input
            id="quote-date"
            type="date"
            value={form.eventDate}
            onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-sky-600"
          />
        </div>

        <div>
          <label htmlFor="quote-audience" className="block text-xs font-semibold text-slate-700 mb-1">
            Approximate Audience Size
          </label>
          <input
            id="quote-audience"
            type="text"
            value={form.estimatedAudience}
            onChange={(e) => setForm({ ...form, estimatedAudience: e.target.value })}
            placeholder="e.g., 500 in-person + 2,000 online"
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-sky-600"
          />
        </div>
      </div>

      <fieldset>
        <legend className="block text-xs font-semibold text-slate-700 mb-1.5">
          Target Streaming Platforms
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PLATFORM_OPTIONS.map((platform) => {
            const checked = form.platforms.includes(platform);
            return (
              <label
                key={platform}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
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
                <span className="truncate">{platform}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="quote-requirements" className="block text-xs font-semibold text-slate-700 mb-1">
          Additional Production Requirements
        </label>
        <textarea
          id="quote-requirements"
          rows={3}
          value={form.additionalRequirements}
          onChange={(e) => setForm({ ...form, additionalRequirements: e.target.value })}
          placeholder="Number of cameras, LED wall size, live scorecard overlays, drone coverage, or multi-day schedule..."
          className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-sky-600"
        />
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          <span>{status === 'loading' ? 'Submitting Quote...' : 'Submit Quote Request'}</span>
        </button>
      </div>
    </form>
  );
}
