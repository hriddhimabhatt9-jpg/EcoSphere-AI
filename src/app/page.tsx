"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// ---- Animated Counter Component ----
function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ---- Feature Card Component ----
function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon} style={{ background: gradient }}>
        {icon}
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
    </div>
  );
}

// ---- Step Card Component ----
function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepNumber}>{number}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDesc}>{description}</p>
    </div>
  );
}

// ---- Testimonial Component ----
function TestimonialCard({
  quote,
  name,
  role,
  avatar,
}: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}) {
  return (
    <div className={styles.testimonialCard}>
      <p className={styles.testimonialQuote}>&ldquo;{quote}&rdquo;</p>
      <div className={styles.testimonialAuthor}>
        <div className={styles.testimonialAvatar}>{avatar}</div>
        <div>
          <p className={styles.testimonialName}>{name}</p>
          <p className={styles.testimonialRole}>{role}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Landing Page
// ============================================================
export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.landing}>
      {/* ---- Navigation ---- */}
      <nav
        className={`${styles.nav} ${isScrolled ? styles.navScrolled : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo} aria-label="EcoSphere AI Home">
            <span className={styles.logoIcon}>🌍</span>
            <span className={styles.logoText}>
              Eco<span className={styles.logoAccent}>Sphere</span> AI
            </span>
          </Link>

          <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ""}`}>
            <a href="#features" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Features
            </a>
            <a href="#how-it-works" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </a>
            <a href="#impact" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Impact
            </a>
            <a href="#testimonials" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Testimonials
            </a>
          </div>

          <div className={styles.navActions}>
            <Link href="/login" className={`btn btn-ghost ${styles.navBtn}`}>
              Sign In
            </Link>
            <Link href="/register" className={`btn btn-primary ${styles.navBtn}`}>
              Get Started
            </Link>
          </div>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ---- Hero Section ---- */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroGlow} />
        <div className={styles.heroGlowAlt} />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            AI-Powered Sustainability Platform
          </div>
          <h1 className={styles.heroTitle}>
            Understand Your Impact.
            <br />
            <span className={styles.heroTitleGreen}>Transform Your Future.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Track your carbon footprint with AI precision, get personalized
            coaching, compete in challenges, and join a global community
            committed to a greener planet.
          </p>
          <div className={styles.heroCTA}>
            <Link href="/register" className="btn btn-primary btn-lg">
              Start Your Journey
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <a href="#features" className="btn btn-secondary btn-lg">
              Explore Features
            </a>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>
                <AnimatedCounter end={50000} suffix="+" />
              </span>
              <span className={styles.heroStatLabel}>Active Users</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>
                <AnimatedCounter end={2} suffix="M+" />
              </span>
              <span className={styles.heroStatLabel}>kg CO₂ Saved</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>
                <AnimatedCounter end={120} suffix="+" />
              </span>
              <span className={styles.heroStatLabel}>Countries</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className={styles.heroVisual}>
          <div className={styles.dashboardPreview}>
            <div className={styles.previewHeader}>
              <div className={styles.previewDots}>
                <span /><span /><span />
              </div>
              <span className={styles.previewTitle}>Dashboard</span>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewScore}>
                <div className={styles.previewScoreRing}>
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border-subtle)" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke="url(#scoreGradient)" strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="327" strokeDashoffset="85"
                      transform="rotate(-90 60 60)"
                      className={styles.previewScoreCircle}
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(152, 68%, 52%)" />
                        <stop offset="100%" stopColor="hsl(180, 60%, 45%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className={styles.previewScoreValue}>74</span>
                </div>
                <span className={styles.previewScoreLabel}>Eco Score</span>
              </div>
              <div className={styles.previewCharts}>
                <div className={styles.previewBar} style={{ height: "60%" }} />
                <div className={styles.previewBar} style={{ height: "45%" }} />
                <div className={styles.previewBar} style={{ height: "80%" }} />
                <div className={styles.previewBar} style={{ height: "35%" }} />
                <div className={styles.previewBar} style={{ height: "65%" }} />
                <div className={styles.previewBar} style={{ height: "50%" }} />
                <div className={styles.previewBar} style={{ height: "70%" }} />
              </div>
              <div className={styles.previewCards}>
                <div className={styles.previewMiniCard}>
                  <span>🔥</span>
                  <div>
                    <span className={styles.previewMiniValue}>12 days</span>
                    <span className={styles.previewMiniLabel}>Streak</span>
                  </div>
                </div>
                <div className={styles.previewMiniCard}>
                  <span>🏆</span>
                  <div>
                    <span className={styles.previewMiniValue}>Level 7</span>
                    <span className={styles.previewMiniLabel}>Earth Guardian</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Features Section ---- */}
      <section className={styles.features} id="features">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Features</span>
            <h2 className="section-title text-center">
              Everything You Need for a<br />
              <span className={styles.heroTitleGreen}>Sustainable Lifestyle</span>
            </h2>
            <p className="section-subtitle text-center" style={{ margin: "0 auto" }}>
              Powered by AI, designed for impact. Our platform combines advanced
              technology with behavioral science to make sustainability
              accessible, engaging, and effective.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <FeatureCard
              icon="🧮"
              title="AI Carbon Calculator"
              description="Calculate your footprint across 8 categories with precision emission factors from EPA and IPCC databases."
              gradient="var(--gradient-eco)"
            />
            <FeatureCard
              icon="👥"
              title="AI Carbon Twin"
              description="See two futures side by side — your current path vs. a greener lifestyle with personalized recommendations."
              gradient="var(--gradient-ai)"
            />
            <FeatureCard
              icon="🤖"
              title="AI Sustainability Coach"
              description="Your personal AI coach provides daily goals, weekly plans, and actionable advice tailored to your lifestyle."
              gradient="var(--gradient-ai)"
            />
            <FeatureCard
              icon="📸"
              title="AI Image Scanner"
              description="Snap a photo of any product to instantly see its environmental impact and discover eco-friendly alternatives."
              gradient="var(--gradient-eco)"
            />
            <FeatureCard
              icon="📊"
              title="Smart Analytics"
              description="Track daily, weekly, and monthly emissions with interactive charts, goal tracking, and progress insights."
              gradient="var(--gradient-amber)"
            />
            <FeatureCard
              icon="🏆"
              title="Gamification & Rewards"
              description="Earn XP, unlock badges, maintain streaks, and collect Green Coins. 20 levels from Seedling to EcoSphere Legend."
              gradient="var(--gradient-amber)"
            />
            <FeatureCard
              icon="🍽️"
              title="AI Meal Planner"
              description="Get carbon-conscious meal plans that balance nutrition, budget, and environmental impact for the entire week."
              gradient="var(--gradient-eco)"
            />
            <FeatureCard
              icon="🗺️"
              title="Smart Travel Planner"
              description="Compare transport options by emissions, cost, and time. Always find the most sustainable way to travel."
              gradient="var(--gradient-rose)"
            />
            <FeatureCard
              icon="🎓"
              title="Education Hub"
              description="Interactive lessons on climate science, renewable energy, waste reduction, and sustainable living practices."
              gradient="var(--gradient-ai)"
            />
            <FeatureCard
              icon="🌐"
              title="Community & Leaderboards"
              description="Join groups, compete on leaderboards, participate in campus challenges, and connect with eco-minded peers."
              gradient="var(--gradient-eco)"
            />
            <FeatureCard
              icon="🛍️"
              title="Green Shopping"
              description="Search products, compare sustainability scores, and get AI-powered recommendations for greener alternatives."
              gradient="var(--gradient-amber)"
            />
            <FeatureCard
              icon="📋"
              title="Detailed Reports"
              description="Generate weekly and monthly reports with progress summaries, achievements, and downloadable insights."
              gradient="var(--gradient-rose)"
            />
          </div>
        </div>
      </section>

      {/* ---- How It Works ---- */}
      <section className={styles.howItWorks} id="how-it-works">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>How It Works</span>
            <h2 className="section-title text-center">
              Your Journey to a<br />
              <span className={styles.heroTitleGreen}>Greener Future</span>
            </h2>
          </div>

          <div className={styles.stepsGrid}>
            <StepCard
              number={1}
              title="Create Your Profile"
              description="Sign up and tell us about your lifestyle — transportation, diet, energy use, and shopping habits."
            />
            <StepCard
              number={2}
              title="Calculate Your Footprint"
              description="Our AI calculates your carbon footprint across 8 categories using real emission factor data."
            />
            <StepCard
              number={3}
              title="Get AI Coaching"
              description="Receive personalized recommendations, daily goals, and weekly plans from your AI sustainability coach."
            />
            <StepCard
              number={4}
              title="Track & Improve"
              description="Monitor your progress, complete challenges, earn rewards, and watch your impact decrease over time."
            />
          </div>
        </div>
      </section>

      {/* ---- Impact Stats Section ---- */}
      <section className={styles.impact} id="impact">
        <div className="container">
          <div className={styles.impactGrid}>
            <div className={styles.impactContent}>
              <span className={styles.sectionTag}>Our Impact</span>
              <h2 className="section-title">
                Making a Real<br />
                <span className={styles.heroTitleGreen}>Difference Together</span>
              </h2>
              <p className={styles.impactDesc}>
                Every action counts. Our community has collectively reduced
                millions of kilograms of CO₂ emissions through small daily
                changes that add up to massive impact.
              </p>
            </div>
            <div className={styles.impactStats}>
              <div className={styles.impactCard}>
                <span className={styles.impactIcon}>🌳</span>
                <span className={styles.impactValue}>
                  <AnimatedCounter end={285000} suffix="+" />
                </span>
                <span className={styles.impactLabel}>Trees Equivalent Saved</span>
              </div>
              <div className={styles.impactCard}>
                <span className={styles.impactIcon}>⚡</span>
                <span className={styles.impactValue}>
                  <AnimatedCounter end={1200000} suffix="+" />
                </span>
                <span className={styles.impactLabel}>kWh Energy Reduced</span>
              </div>
              <div className={styles.impactCard}>
                <span className={styles.impactIcon}>🏅</span>
                <span className={styles.impactValue}>
                  <AnimatedCounter end={890000} suffix="+" />
                </span>
                <span className={styles.impactLabel}>Challenges Completed</span>
              </div>
              <div className={styles.impactCard}>
                <span className={styles.impactIcon}>📚</span>
                <span className={styles.impactValue}>
                  <AnimatedCounter end={350000} suffix="+" />
                </span>
                <span className={styles.impactLabel}>Lessons Completed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- AI Preview Section ---- */}
      <section className={styles.aiPreview}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTagPurple}>AI-Powered</span>
            <h2 className="section-title text-center">
              Meet Your Personal<br />
              <span className={styles.heroTitlePurple}>AI Sustainability Coach</span>
            </h2>
            <p className="section-subtitle text-center" style={{ margin: "0 auto" }}>
              Powered by advanced AI, your coach understands your unique lifestyle
              and provides actionable, personalized advice to help you reduce
              your environmental impact.
            </p>
          </div>

          <div className={styles.aiChatPreview}>
            <div className={styles.aiChatWindow}>
              <div className={styles.aiChatHeader}>
                <div className={styles.aiChatHeaderIcon}>🤖</div>
                <div>
                  <p className={styles.aiChatHeaderTitle}>EcoSphere AI Coach</p>
                  <p className={styles.aiChatHeaderStatus}>
                    <span className={styles.onlineDot} /> Online
                  </p>
                </div>
              </div>
              <div className={styles.aiChatMessages}>
                <div className={styles.aiMsg}>
                  <p>
                    Good morning! 🌱 Based on your recent activity, I noticed
                    your transportation emissions increased by 15% this week.
                    Here are 3 quick wins:
                  </p>
                </div>
                <div className={styles.aiMsg}>
                  <p>
                    <strong>1.</strong> Try cycling for trips under 3km — saves ~0.5kg CO₂ per trip
                    <br />
                    <strong>2.</strong> Combine your Thursday errands into one trip
                    <br />
                    <strong>3.</strong> The subway route to your office saves 2.1kg CO₂ vs driving
                  </p>
                </div>
                <div className={styles.userMsg}>
                  <p>What about my food footprint? Any quick tips?</p>
                </div>
                <div className={styles.aiMsg}>
                  <p>
                    Great question! Your diet accounts for 32% of your footprint.
                    Swapping beef for chicken just twice a week would save
                    ~42kg CO₂ per month. Want me to create a meal plan? 🍽️
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Testimonials ---- */}
      <section className={styles.testimonials} id="testimonials">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Testimonials</span>
            <h2 className="section-title text-center">
              Loved by <span className={styles.heroTitleGreen}>Eco-Conscious</span> People
            </h2>
          </div>

          <div className={styles.testimonialGrid}>
            <TestimonialCard
              quote="EcoSphere AI completely changed how I think about my daily choices. The AI coach feels like having a sustainability expert in my pocket."
              name="Sarah Chen"
              role="Environmental Science Student"
              avatar="SC"
            />
            <TestimonialCard
              quote="The gamification is addictive in the best way. My roommates and I compete on the campus leaderboard every week. We've reduced our shared apartment's footprint by 40%!"
              name="Marcus Rivera"
              role="College Senior"
              avatar="MR"
            />
            <TestimonialCard
              quote="As a parent, I wanted to teach my kids about sustainability. The Education Hub made climate science accessible and fun. Now my 10-year-old tracks our family's carbon score daily."
              name="Priya Patel"
              role="Product Designer & Mom"
              avatar="PP"
            />
          </div>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} />
            <h2 className={styles.ctaTitle}>
              Ready to Make a Difference?
            </h2>
            <p className={styles.ctaDesc}>
              Join thousands of people who are already tracking, reducing, and
              transforming their environmental impact with EcoSphere AI.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/register" className="btn btn-primary btn-lg">
                Create Free Account
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
            <p className={styles.ctaNote}>
              Free forever. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className={styles.footer} role="contentinfo">
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.logo}>
                <span className={styles.logoIcon}>🌍</span>
                <span className={styles.logoText}>
                  Eco<span className={styles.logoAccent}>Sphere</span> AI
                </span>
              </Link>
              <p className={styles.footerBrandDesc}>
                AI-powered carbon footprint awareness and sustainable living
                platform. Making sustainability accessible, engaging, and
                impactful for everyone.
              </p>
            </div>

            <div className={styles.footerLinks}>
              <h4 className={styles.footerLinksTitle}>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <Link href="/register">Get Started</Link>
              <Link href="/login">Sign In</Link>
            </div>

            <div className={styles.footerLinks}>
              <h4 className={styles.footerLinksTitle}>Resources</h4>
              <a href="#impact">Impact</a>
              <a href="#testimonials">Community</a>
              <a href="#">Documentation</a>
              <a href="#">API</a>
            </div>

            <div className={styles.footerLinks}>
              <h4 className={styles.footerLinksTitle}>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
              <a href="#">GDPR</a>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© {new Date().getFullYear()} EcoSphere AI. All rights reserved.</p>
            <p className={styles.footerMadeWith}>
              Made with 💚 for the planet
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
