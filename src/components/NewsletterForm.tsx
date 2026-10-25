import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { validateNewsletterInput } from '../utils/validation';

interface NewsletterFormProps {
  variant?: 'section' | 'compact';
}

export function NewsletterForm({ variant = 'section' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const validation = validateNewsletterInput(email, consent);
    if (!validation.valid) {
      setStatus('error');
      setErrorMessage(validation.errors.email || validation.errors.consent || 'Invalid input.');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent, honeypot }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus('error');
        setErrorMessage(
          data.error || 'Subscription could not be saved. Verify backend configuration.'
        );
        return;
      }

      setStatus('success');
      setReferenceId(data.referenceId || '');
      setSuccessMessage(data.message || 'Subscription saved.');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMessage(
        'Unable to reach the subscription server. Please check your connection and try again.'
      );
    }
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <input
          type="text"
          name="company_website_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <div>
          <label htmlFor="footer-newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="footer-newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder="Enter your email"
              disabled={status === 'loading'}
              className="flex-1 min-w-0 px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {status === 'loading' ? 'Saving...' : 'Subscribe'}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (status !== 'idle') setStatus('idle');
            }}
            className="mt-0.5 rounded border-slate-700 bg-slate-900 text-sky-600 focus:ring-sky-500"
          />
          <span>
            I agree to receive broadcast updates and accept the{' '}
            <Link to="/privacy-policy" className="text-sky-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {status === 'error' && (
          <div role="alert" className="flex items-start gap-2 text-xs text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}

        {status === 'success' && (
          <div role="status" className="flex items-start gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              {successMessage} {referenceId && `(${referenceId})`}
            </span>
          </div>
        )}
      </form>
    );
  }

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold text-sky-400 tracking-wide">Newsletter</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Stay Updated on Live Broadcast Workflows &amp; Schedules
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Subscribe to receive technical production checklists, upcoming public live stream
              schedules, and media engineering insights.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <input
              type="text"
              name="website_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="section-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="section-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Enter your work or personal email address"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                <span>{status === 'loading' ? 'Subscribing...' : 'Subscribe'}</span>
              </button>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (status !== 'idle') setStatus('idle');
                }}
                className="mt-0.5 rounded border-slate-700 bg-slate-950 text-sky-600 focus:ring-sky-500"
              />
              <span>
                I consent to having my email address stored for broadcast announcements in
                accordance with the{' '}
                <Link to="/privacy-policy" className="text-sky-400 hover:underline font-medium">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {status === 'error' && (
              <div
                role="alert"
                className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}

            {status === 'success' && (
              <div
                role="status"
                className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>
                  {successMessage} {referenceId && `Reference ID: ${referenceId}`}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
