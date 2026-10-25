import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config/siteConfig';
import { SEOHead } from '../components/SEOHead';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export function LegalPage({ type }: LegalPageProps) {
  const isPrivacy = type === 'privacy';

  return (
    <div className="bg-white">
      <SEOHead
        title={isPrivacy ? 'Privacy Policy' : 'Terms and Conditions'}
        description={
          isPrivacy
            ? `Privacy Policy for ${SITE_CONFIG.brand.name} covering contact enquiries, quote requests, and newsletter subscriptions.`
            : `Terms and Conditions for ${SITE_CONFIG.brand.name} live broadcasting and media production services.`
        }
        canonicalPath={isPrivacy ? '/privacy-policy' : '/terms'}
      />

      <section className="bg-slate-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <nav aria-label="Breadcrumb" className="text-xs font-mono-tech text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-sky-400">
              {isPrivacy ? 'Privacy Policy' : 'Terms and Conditions'}
            </span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isPrivacy ? 'Privacy Policy' : 'Terms and Conditions'}
          </h1>
          <p className="text-sm text-slate-400">
            {SITE_CONFIG.brand.name} · {SITE_CONFIG.brand.address}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-sm text-slate-700 leading-relaxed">
          {isPrivacy ? (
            <>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
                <p>
                  When you submit a contact enquiry, request a broadcast production quote, or
                  subscribe to our newsletter on {SITE_CONFIG.brand.name}, we collect the
                  information you explicitly provide—such as your full name, email address, phone
                  number, event date, venue location, and technical production requirements.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">
                  2. How Enquiries Are Stored and Used
                </h2>
                <p>
                  Customer enquiries and quote requests are stored privately on our backend server
                  solely to prepare technical production estimates, schedule site assessments, and
                  communicate regarding your event. Submissions are never displayed on public pages
                  or sold to third parties.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">3. Contact &amp; Data Requests</h2>
                <p>
                  To request removal or correction of your contact details or newsletter
                  subscription, email{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.brand.primaryEmail}`}
                    className="text-sky-600 hover:underline font-medium"
                  >
                    {SITE_CONFIG.brand.primaryEmail}
                  </a>
                  .
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">
                  1. Scope of Broadcast &amp; Media Services
                </h2>
                <p>
                  All live broadcasting, multi-camera switching, simulcast streaming, live
                  scorecard graphics, and post-production deliverables are governed by the specific
                  written production agreement executed for your event.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">
                  2. Venue Infrastructure &amp; Third-Party Platforms
                </h2>
                <p>
                  Live streaming continuity depends on venue electrical power, local network or
                  cellular upstream bandwidth, and the operational status of third-party destination
                  platforms (such as YouTube, Facebook, LinkedIn, or custom CDN servers). Event
                  organizers are responsible for securing necessary venue permissions, music/content
                  licenses, and airspace approvals where applicable.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">3. Quotations &amp; Scheduling</h2>
                <p>
                  Estimates requested through this website are subject to equipment and crew
                  availability on your confirmed event dates. Contact{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.brand.primaryEmail}`}
                    className="text-sky-600 hover:underline font-medium"
                  >
                    {SITE_CONFIG.brand.primaryEmail}
                  </a>{' '}
                  for formal booking confirmation.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
