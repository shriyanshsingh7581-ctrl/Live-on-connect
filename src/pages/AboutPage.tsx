import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Tv,
  Radio,
  Shield,
  Sliders,
  Users,
  ArrowRight,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SEOHead } from '../components/SEOHead';
import { ResilientImage } from '../components/ResilientImage';

interface AboutPageProps {
  onOpenQuoteModal: (defaultService?: string) => void;
}

export function AboutPage({ onOpenQuoteModal }: AboutPageProps) {
  const crewSpecializations = [
    {
      role: 'Technical Directors & Vision Mixers',
      responsibility:
        'Operate multi-camera hardware switchers, manage preview/program transitions, and coordinate camera operators via full-duplex intercom.',
    },
    {
      role: 'RF & Multi-Camera Operators',
      responsibility:
        'Handle tripod-mounted broadcast zooms, roaming gimbal rigs, and 5GHz wireless SDI transmission across complex event venues.',
    },
    {
      role: 'Broadcast Graphics & Scorecard Controllers',
      responsibility:
        'Design and trigger real-time HTML5/CG lower thirds, tournament scorebugs, timer clocks, and speaker slates.',
    },
    {
      role: 'Streaming & Audio Mastering Engineers',
      responsibility:
        'Manage digital soundboard feeds, loudness normalization, hardware encoders, and multi-destination RTMP/SRT simulcast links.',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Broadcast-Grade Signal Chain',
      description:
        'We utilize dedicated SDI/HDMI hardware switchers, calibrated monitors, and hardware encoders rather than consumer webcam setups.',
      icon: Tv,
    },
    {
      title: 'Multi-Platform Simulcast Readiness',
      description:
        'Simultaneous distribution to YouTube, Facebook, LinkedIn, custom RTMP destinations, and embedded website players.',
      icon: Radio,
    },
    {
      title: 'Redundant Recording & Failover Planning',
      description:
        'Local program master capture runs continuously alongside live transmission so your archive is protected against venue network fluctuations.',
      icon: Shield,
    },
    {
      title: 'End-to-End Post-Production Suite',
      description:
        'Fast turnaround for edited session recordings, color grading, audio cleanup, and VOD packaging after the live event concludes.',
      icon: Sliders,
    },
  ];

  return (
    <div className="bg-white">
      <SEOHead
        title="About Our Broadcast Engineering & Media Production Team"
        description="Learn how our live broadcasting and video production engineers deliver multi-camera event coverage, simulcast streaming, and post-production."
        canonicalPath="/about"
      />

      {/* Page Hero & Breadcrumb */}
      <section className="bg-slate-950 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono-tech text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-sky-400">About Us</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight balance-text">
            Engineering Reliable Live Broadcasts for Every Stage
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {SITE_CONFIG.brand.name} combines multi-camera field production, real-time broadcast
            graphics, and resilient streaming workflows to connect live events with audiences
            everywhere.
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs font-semibold text-sky-600 tracking-wide">
                Company Introduction
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                We Bring Your Events to Life Through Technology
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Live events demand precision. A single dropped audio feed or uncalibrated camera
                angle can disrupt the experience for thousands of remote viewers. At{' '}
                {SITE_CONFIG.brand.name}, we approach every production—from corporate town halls and
                academic convocations to regional sports tournaments and cultural festivals—with
                structured broadcast engineering discipline.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Our portable production flypacks and wireless multi-camera rigs allow us to set up
                a complete television-style control room at your venue, integrating seamlessly with
                in-house PA audio systems, stage lighting, and LED video walls.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal()}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors"
                >
                  Request a Production Quote
                </button>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900"
                >
                  <span>Explore Service Capabilities</span>
                  <ArrowRight className="w-4 h-4 text-sky-600" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-[4/3]">
                <ResilientImage
                  src={SITE_CONFIG.assets.aboutMulticamStage}
                  alt="Professional broadcast cinema camera and wireless video transmitter setup"
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-xl bg-white border border-slate-200 space-y-3">
              <p className="text-xs font-mono-tech text-sky-600 font-semibold">01. OUR MISSION</p>
              <h2 className="text-xl font-bold text-slate-900">
                Accessible, Broadcast-Grade Live Production
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To equip event organizers, institutions, sports leagues, and enterprises with
                dependable multi-camera broadcasting, transparent technical planning, and clean
                visual storytelling across every viewing screen.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white border border-slate-200 space-y-3">
              <p className="text-xs font-mono-tech text-sky-600 font-semibold">02. OUR VISION</p>
              <h2 className="text-xl font-bold text-slate-900">
                Bridging Physical Venues and Global Digital Audiences
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To set the regional benchmark for live event transmission, real-time data graphics,
                and hybrid event engineering where remote viewers experience the same clarity and
                immediacy as the front row.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Production Workflow */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold text-sky-600 tracking-wide">
              Why Choose {SITE_CONFIG.brand.name}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Equipment &amp; Production Workflow Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Production Crew Specializations */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span>Production Crew Structure</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Specialized Broadcast Engineering Roles
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every live assignment is staffed with dedicated specialists per signal domain. Site
              owners can add individual team bios in <code className="font-mono-tech">siteConfig.ts</code> when desired.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crewSpecializations.map((unit) => (
              <div
                key={unit.role}
                className="p-6 rounded-xl bg-white border border-slate-200 space-y-2"
              >
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" aria-hidden="true" />
                  <h3>{unit.role}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{unit.responsibility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Ready to Plan Your Upcoming Broadcast?</h2>
            <p className="text-sm text-slate-400">
              Speak with our technical production desk for a tailored site assessment and quote.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-lg transition-colors"
            >
              Contact Production Desk
            </Link>
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
