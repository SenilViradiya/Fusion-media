import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import {
  Crown,
  Sparkles,
  PenTool,
  ArrowRight,
  Check,
  CheckCircle2,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  MessageSquare,
  MapPin,
  TrendingUp,
  Video,
  Layers,
  Compass,
  FileText,
  BarChart,
  User,
  IndianRupee,
  Globe,
  Calendar,
  X,
  Sparkle,
  BookOpen,
  Send,
  Zap,
  Radio,
  FileEdit,
  Sliders,
  TrendingDown,
  ShieldCheck,
  Clock,
  ExternalLink,
  Phone,
  Loader2,
  Star,
  Quote,
  ChevronDown,
  ChevronUp,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PricingPackage, GrowthStep, LeadSubmission } from "./types";
import { submitLeadForm, OWNER_EMAIL } from "./services/formService";
import { TESTIMONIALS_DATA } from "./data/testimonialsData";
import { InstagramTestimonialCard } from "./components/InstagramTestimonialCard";

// Premium Word & Char Splitter Component for elite sequential text reveal
const CascadingText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden"
        >
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={charIdx}
              initial={{ y: "115%", rotate: 6, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              transition={{
                duration: 0.85,
                delay: delay + wordIdx * 0.1 + charIdx * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block origin-bottom-left"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

export default function App() {
  // Navigation & Interactive Tabs
  const [scrolled, setScrolled] = useState(false);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<string>("Authority Builder");

  // Multi-step Concierge Intake Form States
  const [conciergeStep, setConciergeStep] = useState(1); // 1: Personality Details, 2: Positioning Archetype, 3: Story Intake
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [brandType, setBrandType] = useState("Founder / Executive");
  const [socialHandles, setSocialHandles] = useState("");
  const [clientStory, setClientStory] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [timelineProgress, setTimelineProgress] = useState(0);
  const [isNotFound, setIsNotFound] = useState(() => {
    if (typeof window === "undefined") return false;
    const path = window.location.pathname;
    return path !== "/" && path !== "" && path !== "/index.html";
  });

  // Mouse tilt parameters for card glare effects
  const [tiltRots, setTiltRots] = useState<{
    [key: string]: {
      rx: number;
      ry: number;
      gx: number;
      gy: number;
      o: number;
    };
  }>({
    premium: { rx: 0, ry: 0, gx: 0, gy: 0, o: 0 },
    bespoke: { rx: 0, ry: 0, gx: 0, gy: 0, o: 0 },
    authority: { rx: 0, ry: 0, gx: 0, gy: 0, o: 0 },
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Luxury Interactive Reference Video & Text Hover state indicators
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Testimonials view more state (initial 3, expand +2)
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  // Mobile slider refs & active indices
  const testimonialSliderRef = useRef<HTMLDivElement>(null);
  const pricingSliderRef = useRef<HTMLDivElement>(null);
  const whyUsSliderRef = useRef<HTMLDivElement>(null);
  const trustSliderRef = useRef<HTMLDivElement>(null);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [activePricingIdx, setActivePricingIdx] = useState(0);
  const [activeWhyUsIdx, setActiveWhyUsIdx] = useState(0);
  const [activeTrustIdx, setActiveTrustIdx] = useState(0);

  // Generic scroll handler for slider dot sync
  const handleSliderScroll = useCallback((ref: React.RefObject<HTMLDivElement | null>, setIdx: (i: number) => void) => {
    if (!ref.current) return;
    const el = ref.current;
    const children = el.children;
    if (!children.length) return;
    const childWidth = (children[0] as HTMLElement).offsetWidth + 16; // gap included
    const idx = Math.round(el.scrollLeft / childWidth);
    setIdx(Math.min(idx, children.length - 1));
  }, []);

  const scrollSliderTo = useCallback((ref: React.RefObject<HTMLDivElement | null>, idx: number) => {
    if (!ref.current) return;
    const children = ref.current.children;
    if (!children[idx]) return;
    (children[idx] as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, []);

  // Process timeline data mapping to cinematic layout nodes
  const steps: GrowthStep[] = [
    {
      stepNumber: "01",
      title: "Strategic Brand Research & Positioning",
      description:
        "We begin by understanding your industry, competitor gaps, and content deficits.",
      details:
        "Deep positioning includes a competitor blueprint, core authority pillars, hook formulation matrix, and target channel profile to structure native appeal.",
      iconName: "Compass",
    },
    {
      stepNumber: "02",
      title: "Creative Ideation & Scriptwriting",
      description:
        "We craft hooks, high-retention narratives, and structural scripts that retain attention.",
      details:
        'Scripts follow our signature "Attention Cascade Schema"—introducing psychological tension in the first 2 seconds accompanied by interactive storytelling guidelines.',
      iconName: "PenTool",
    },
    {
      stepNumber: "03",
      title: "High-End Production Studio Blueprint",
      description:
        "Full shoot guidance including lighting placement, custom acoustics, and performance coaching.",
      details:
        "Whether filming remote or in-studio, we specify lighting schemes (rim glows, key fills), lens selections for shallow depth-of-field, and cadence timing for confident presence.",
      iconName: "Video",
    },
    {
      stepNumber: "04",
      title: "Dynamic Post-Production & Color",
      description:
        "Editors implement swift narrative cuts, rich motion physics, text-overlays, and bespoke design.",
      details:
        "Cinematic pacing uses tailored sound design layers (swoshes, subtle risers), aesthetic color grading, visual overlays, and retention-focused patterns.",
      iconName: "Layers",
    },
    {
      stepNumber: "05",
      title: "Multi-Platform Distribution",
      description:
        "We customize and strategically format clips across YouTube, Instagram, and LinkedIn.",
      details:
        "Each short is delivered with specific titles, native metadata tags, optimized descriptions, and interactive comment primers customized for Native algorithms.",
      iconName: "Globe",
    },
    {
      stepNumber: "06",
      title: "Data-Driven Optimization Loops",
      description:
        "We continuously track analytics (CTR, retention ratios, exit marks) to refine future shoots.",
      details:
        "Monthly audit reports track drop-off curves, analyze video hooks on top-performing reels, and iterate scripts to maximize organic growth factors.",
      iconName: "BarChart",
    },
  ];

  // Initialize Lenis Smooth Scroll & Navbar shrink state
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Track active scrolling progress over timeline container
      if (timelineContainerRef.current) {
        const rect = timelineContainerRef.current.getBoundingClientRect();
        const viewportMiddle = window.innerHeight / 2;
        const totalHeight = rect.height;
        const relativeTop = rect.top;

        const scrolledAmount = (viewportMiddle - relativeTop) / totalHeight;
        const progress = Math.min(Math.max(scrolledAmount, 0), 1);
        setTimelineProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial calculation

    return () => {
      lenisInstance.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    cardId: string,
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Smooth 3D rotational mechanics
    const rx = (y / rect.height - 0.5) * -14;
    const ry = (x / rect.width - 0.5) * 14;

    setTiltRots((prev) => ({
      ...prev,
      [cardId]: { rx, ry, gx: x, gy: y, o: 0.65 },
    }));
  };

  const handleCardMouseLeave = (cardId: string) => {
    setTiltRots((prev) => ({
      ...prev,
      [cardId]: { rx: 0, ry: 0, gx: 0, gy: 0, o: 0 },
    }));
  };

  // Pricing plans in INR
  const prices = {
    growth: "₹13,000",
    authority: "₹17,000",
    elite: "₹27,000",
    suffix: "/month",
  };

  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert(
        "Kindly fill in all marked mandatory details (Name, Email, and Mobile Number) to lock your onboarding slot.",
      );
      return;
    }

    setIsSubmittingLead(true);

    const leadPayload = {
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      package: selectedPackage,
      brandType,
      socials: socialHandles,
      message: clientStory,
    };

    // Submit lead directly to owner email via FormSubmit
    await submitLeadForm(leadPayload);

    setIsSubmittingLead(false);
    setFormSubmitted(true);
  };

  const handleCloseSuccessModal = () => {
    setIsTalkModalOpen(false);
    setFormSubmitted(false);
    setConciergeStep(1);
  };

  const handleApplyPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setIsTalkModalOpen(true);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper matching Lucide Icons to custom blueprint keys
  const renderBlueprintIcon = (iconName: string) => {
    const commonStyle = "w-6 h-6 text-[#c4a47a]";
    switch (iconName) {
      case "Compass":
        return <Compass className={commonStyle} />;
      case "PenTool":
        return <PenTool className={commonStyle} />;
      case "Video":
        return <Video className={commonStyle} />;
      case "Layers":
        return <Layers className={commonStyle} />;
      case "Globe":
        return <Globe className={commonStyle} />;
      case "BarChart":
        return <BarChart className={commonStyle} />;
      default:
        return <Compass className={commonStyle} />;
    }
  };

  if (isNotFound) {
    return (
      <div className="min-h-screen bg-[#f4f3ef] text-[#1a1918] flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md p-8 bg-white rounded-3xl border border-[#c4a47a]/30 shadow-xl">
          <p className="text-xs font-bold font-mono tracking-widest text-[#a8854f] uppercase mb-2">
            404 Error
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1a1918] mb-3">
            Page Not Found
          </h1>
          <p className="text-stone-600 text-sm leading-relaxed mb-8 font-medium">
            The page you are looking for does not exist or has been relocated.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              onClick={() => {
                setIsNotFound(false);
                window.history.pushState({}, "", "/");
              }}
              className="px-6 py-3 bg-[#1a1918] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#a8854f] transition-all shadow-md"
            >
              Back to Home
            </a>
            <a
              href="/#services"
              onClick={() => {
                setIsNotFound(false);
                window.history.pushState({}, "", "/#services");
              }}
              className="px-6 py-3 border border-stone-300 text-stone-700 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-stone-100 transition-all"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f3ef] text-[#1a1918] selection:bg-[#c4a47a]/30 relative selection:text-[#1a1918] font-sans antialiased overflow-x-hidden">
      {/* LUXURY GLOW ACCENTS */}
      <div className="absolute top-0 inset-x-0 h-[1000px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#c4a47a]/5 rounded-full blur-[150px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#9c5a53]/3 rounded-full blur-[130px]" />
      </div>

      {/* FIXED NAVIGATION WITH DYNAMIC BACKGROUND ON SCROLL */}
      <nav
        id="nav-navbar"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 flex justify-center py-5`}
      >
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center justify-between px-6 md:px-10 rounded-full transition-all duration-500 ${
            scrolled
              ? "w-[90%] md:w-[78%] max-w-4xl h-14 md:h-16 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
              : "w-[94%] md:w-[88%] max-w-5xl h-16 md:h-18 bg-white/30 backdrop-blur-md border border-white/30 shadow-none"
          }`}
        >
          {/* Brand Logo Identity */}
          <a
            className="flex items-center hover:opacity-80 transition-opacity py-1 select-none cursor-pointer"
            href="#"
            aria-label="TheFusionMedia Homepage"
          >
            <img src="/logo.png" alt="TheFusionMedia Logo" className="h-8 md:h-10 object-contain" />
          </a>

          {/* Navigation items aligned like premium agencies */}
          <div className="hidden md:flex items-center gap-10 text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#1a1918]">
            <button
              onClick={() => scrollToId("intro")}
              className="hover:text-[#a8854f] transition-all relative group cursor-pointer"
            >
              TESTIMONIALS
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-[#a8854f] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToId("process")}
              className="hover:text-[#a8854f] transition-all relative group cursor-pointer"
            >
              STRATEGY
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-[#a8854f] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToId("services")}
              className="hover:text-[#a8854f] transition-all relative group cursor-pointer"
            >
              PRICING
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-[#a8854f] transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Luxury Intake Trigger Button */}
            <button
              id="nav-lets-talk-btn"
              onClick={() => setIsTalkModalOpen(true)}
              className="hidden sm:flex text-[10px] font-bold tracking-[0.16em] uppercase text-white bg-[#1a1918] hover:bg-[#a8854f] px-5 py-2.5 rounded-full transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(26,25,24,0.15)] hover:shadow-[0_8px_20px_rgba(168,133,79,0.35)] cursor-pointer items-center gap-1.5"
            >
              <span>LET'S TALK</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer compact-btn"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#1a1918]" />
              ) : (
                <Menu className="w-5 h-5 text-[#1a1918]" />
              )}
            </button>
          </div>
        </motion.div>
      </nav>

      {/* MOBILE MENU OVERLAY + PANEL */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div className={`mobile-menu-panel ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
            <img src="/logo.png" alt="TheFusionMedia Logo" className="h-6 object-contain" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-stone-100 transition-colors compact-btn"
            >
              <X className="w-5 h-5 text-stone-600" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-4 py-6">
            {[
              { label: 'Testimonials', id: 'intro' },
              { label: 'Strategy', id: 'process' },
              { label: 'Pricing', id: 'services' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { scrollToId(item.id); setIsMobileMenuOpen(false); }}
                className="text-left px-4 py-3.5 text-sm font-bold text-[#1a1918] hover:bg-[#a8854f]/10 rounded-xl transition-all cursor-pointer tracking-wide uppercase"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto px-6 pb-8">
            <button
              onClick={() => { setIsTalkModalOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full py-4 bg-[#1a1918] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#a8854f] transition-all cursor-pointer shadow-lg"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </div>

      {/* PREMIUM HERO LANDING STAGE */}
      <section
        id="hero-section"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6 overflow-hidden border-b border-[#1a1918]/5 select-none animate-bg-shift bg-gradient-to-br from-[#f4f3ef] via-[#FAF9F5] to-[#eae8e3]"
      >
        {/* Spot mouse tracking accent lamp */}
        <div
          className="absolute pointer-events-none rounded-full w-[450px] h-[450px] blur-[160px] transition-opacity duration-300 bg-[#c4a47a]/18 opacity-0 md:opacity-100 z-0 animate-pulse"
          style={{
            left: `${mousePos.x - 225}px`,
            top: `${mousePos.y - 225}px`,
          }}
        />

        {/* Diagonal aesthetic layout lines matching luxury prints */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="100%"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <line
              x1="100%"
              y1="0"
              x2="0"
              y2="100%"
              stroke="currentColor"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* Hero Copywriting Header Block */}
        <div className="relative text-center z-10 max-w-5xl mt-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[10px] md:text-xs tracking-[0.3em] text-[#a8854f] font-semibold mb-6 uppercase"
          >
            THE LUXURY PERSONAL BRANDING EXPERT FOR FOUNDERS
          </motion.p>

          <h1 className="text-[10vw] md:text-[8vw] lg:text-[6.8vw] leading-[1.02] tracking-tight text-[#1a1918] font-bold select-none font-heading mt-2 relative overflow-visible inline-block max-w-full px-6 py-2 transition-colors duration-300">
            <CascadingText text="Welcome to" delay={0.2} /> <br />
            <span className="font-heading italic font-light text-[#c4a47a] relative">
              <CascadingText text="TheFusionMedia" delay={0.4} />
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.4,
                  delay: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute -bottom-2.5 left-0 h-[2.5px] bg-[#c4a47a]/40 rounded-full"
              />
            </span>
            <span className="sr-only">
              {" "}
              - Personal Branding Agency in Surat
            </span>
          </h1>

          <div className="mt-14 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="text-stone-600 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed text-balance font-medium"
            >
              We help founders, creators, and experts turn their ideas,
              expertise, and story into a powerful personal brand that earns
              attention, trust, and influence.
            </motion.p>

            {/* Micro Animated Call to Action Targets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
              className="mt-12 flex flex-col sm:flex-row gap-5 items-center justify-center pointer-events-auto"
            >
              <button
                onClick={() => scrollToId("intro")}
                className="relative px-8 py-4.5 bg-[#1a1918] text-[#f4f3ef] text-[11px] tracking-[0.25em] font-semibold uppercase rounded-full overflow-hidden group transition-all duration-500 hover:scale-105 hover:shadow-[0_16px_36px_rgba(168,133,79,0.25)] cursor-pointer"
              >
                <span className="relative z-10 group-hover:text-[#1a1918] transition-colors duration-500">
                  Enter the Society
                </span>
                <div className="absolute top-0 left-0 w-[120%] h-full bg-[#c4a47a] -translate-x-[110%] skew-x-[-15deg] group-hover:-translate-x-2 transition-transform duration-500 ease-out z-0"></div>
                <div className="absolute top-0 left-0 w-[20px] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 -translate-x-[110%] skew-x-[-15deg] group-hover:translate-x-[360px] transition-all duration-1100 ease-in-out z-0"></div>
              </button>

              <button
                onClick={() => setIsTalkModalOpen(true)}
                className="px-8 py-4.5 text-[11px] tracking-[0.22em] font-bold uppercase transition-all duration-300 border border-[#1a1918]/20 bg-white/40 hover:text-[#a8854f] hover:border-[#a8854f]/60 hover:bg-white rounded-full cursor-pointer"
              >
                Book Intake Call
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll cues at base */}
      </section>

      {/* SECTION 1: CLIENT TESTIMONIALS & PROOF CARDS */}
      <section
        id="intro"
        className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden bg-white/10"
      >
        <div className="absolute top-1/2 left-[-10%] w-[380px] h-[380px] bg-[#c4a47a]/3 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
          {/* Muted Gold Crown Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full border border-[#c4a47a]/30 bg-[#c4a47a]/5 mb-10 hover:bg-[#c4a47a]/15 transition-all duration-300 cursor-pointer group"
          >
            <Star className="w-3.5 h-3.5 text-[#c4a47a] fill-[#c4a47a] group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-[9px] font-extrabold tracking-[0.25em] text-[#1a1918] uppercase">
              Client Testimonials & Authority Proof
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#1a1918] font-heading mb-6 tracking-tight leading-[1.25] text-center max-w-4xl">
            Trusted by Founders &amp; <br />
            <span className="italic text-[#c4a47a] relative inline-block group cursor-default">
              Industry Leaders.
              <span className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-[#c4a47a]/70 rounded" />
            </span>
          </h2>

          <p className="text-stone-600 text-sm md:text-lg max-w-2xl leading-relaxed mx-auto text-center text-balance font-medium mb-16 md:mb-20">
            Real founders, clinicians, and advisors who turned their knowledge
            into high-impact personal brands, engaged communities, and direct
            inbound opportunities.
          </p>

          {/* Testimonial Cards: Mobile Slider / Desktop Grid */}
          {/* Desktop grid */}
          <div className="w-full hidden lg:grid grid-cols-3 gap-7 items-stretch">
            {(showAllTestimonials
              ? TESTIMONIALS_DATA
              : TESTIMONIALS_DATA.slice(0, 3)
            ).map((item, idx) => (
              <InstagramTestimonialCard
                key={item.id}
                testimonial={item}
                index={idx}
              />
            ))}
          </div>

          {/* Mobile/Tablet horizontal slider */}
          <div className="w-full lg:hidden">
            <div
              ref={testimonialSliderRef}
              className="mobile-slider px-2"
              onScroll={() => handleSliderScroll(testimonialSliderRef, setActiveTestimonialIdx)}
            >
              {(showAllTestimonials
                ? TESTIMONIALS_DATA
                : TESTIMONIALS_DATA.slice(0, 3)
              ).map((item, idx) => (
                <div key={item.id} className="testimonial-slider-card">
                  <InstagramTestimonialCard
                    testimonial={item}
                    index={idx}
                  />
                </div>
              ))}
            </div>
            {/* Slider Dots */}
            <div className="slider-dots">
              {(showAllTestimonials ? TESTIMONIALS_DATA : TESTIMONIALS_DATA.slice(0, 3)).map((_, i) => (
                <button
                  key={i}
                  className={`slider-dot compact-btn ${activeTestimonialIdx === i ? 'active' : ''}`}
                  onClick={() => scrollSliderTo(testimonialSliderRef, i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* View More Button (Click to reveal 2 more testimonials) */}
          <div className="mt-12 flex flex-col items-center">
            <button
              onClick={() => setShowAllTestimonials(!showAllTestimonials)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1a1918] text-[#f4efe8] hover:bg-[#a8854f] hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-black/10 cursor-pointer group"
            >
              <span>
                {showAllTestimonials
                  ? "Show Fewer Testimonials"
                  : "View More Testimonials (+2 Creators)"}
              </span>
              {showAllTestimonials ? (
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
            <p className="text-[11px] text-stone-500 font-semibold tracking-wide uppercase mt-3.5">
              {showAllTestimonials
                ? "Displaying all 5 verified creator case studies"
                : "Displaying 3 of 5 verified creator case studies"}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: HIGH-END VERTICAL TIMELINE PROCESS STAGE */}
      <section
        id="process"
        className="py-24 md:py-32 bg-[#eae8e4]/50 border-y border-black/5 relative"
      >
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#c4a47a]/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-24 max-w-3xl mx-auto font-sans">
            <div className="px-4 py-1.5 rounded-full border border-[#a8854f]/35 bg-[#a8854f]/5 text-[#a8854f] text-[9.5px] font-bold tracking-[0.25em] uppercase mb-6 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" /> STAGE SYSTEM
              ARCHITECTURE
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-[#1a1918]">
              Our Strategic Content{" "}
              <span className="text-[#a8854f] italic">Growth Process</span>
            </h2>
            <p className="text-stone-500 text-xs md:text-sm uppercase tracking-widest font-extrabold mt-3 select-none">
              Built for Organic Growth &amp; Authority Creation
            </p>
            <p className="text-stone-600/95 text-sm md:text-base max-w-xl leading-relaxed mt-5">
              At Fusion Media, we follow a structured, multi-platform authority
              production loop engineered specifically to maintain long-term
              audience visibility and authority growth.
            </p>
          </div>

          {/* DYNAMIC SCROLL-REVEALING SCENIC TIMELINE BODY */}
          <div ref={timelineContainerRef} className="relative w-full">
            {/* Center Background Trace Vector */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-stone-300/60" />

            {/* Center Active Scroll line overlay */}
            <div
              className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#c4a47a] via-[#a8854f] to-amber-950 origin-top transition-transform duration-100"
              style={{ transform: `scaleY(${timelineProgress})` }}
            />

            <div className="space-y-16 md:space-y-24">
              {steps.map((st, idx) => {
                const isLeft = idx % 2 === 0;
                // Calculate if active scroll line has crossed this item's relative checkpoint
                const isPassed = timelineProgress >= idx / (steps.length - 0.5);

                return (
                  <div
                    key={st.stepNumber}
                    className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-0"
                  >
                    {/* Circle Node Indicator Point */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                      <motion.div
                        initial={{ scale: 0.85 }}
                        animate={{ scale: isPassed ? 1.15 : 0.95 }}
                        className={`w-10 h-10 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-500 font-mono text-[11px] font-bold ${
                          isPassed
                            ? "border-[#a8854f] text-[#a8854f] shadow-[0_0_15px_rgba(168,133,79,0.4)]"
                            : "border-stone-300 text-stone-400"
                        }`}
                      >
                        {st.stepNumber}
                      </motion.div>
                    </div>

                    {/* Timeline Card Column Structure */}
                    <div
                      className={`col-span-1 md:col-span-5 pl-14 md:pl-0 ${isLeft ? "md:col-start-1 md:text-right" : "md:col-start-8"}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 40, x: isLeft ? -45 : 45 }}
                        whileInView={{ opacity: 1, y: 0, x: 0 }}
                        viewport={{ once: true, margin: "-160px" }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                        className={`bg-white p-7 md:p-8 rounded-2xl border transition-all duration-300 relative shadow-sm ${
                          isPassed
                            ? "border-[#c4a47a]/50 shadow-md shadow-[#c4a47a]/4"
                            : "border-stone-200/60"
                        } hover:shadow-md hover:border-[#a8854f]`}
                      >
                        {/* Blueprint micro top bar */}
                        <div
                          className={`flex items-center gap-3.5 mb-5 ${isLeft ? "md:justify-end" : "justify-start"}`}
                        >
                          <div className="p-2 bg-[#fbfaf6] rounded-xl border border-stone-100">
                            {renderBlueprintIcon(st.iconName)}
                          </div>
                          <div>
                            <span className="text-[8px] font-bold tracking-[0.25em] text-[#a8854f] uppercase block">
                              Blueprint Phase {st.stepNumber}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-lg md:text-xl font-heading font-extrabold text-stone-900 mb-2 leading-snug">
                          {st.title}
                        </h3>

                        <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-medium mb-4">
                          {st.description}
                        </p>

                        <div
                          className={`p-4 rounded-xl bg-stone-50 border border-stone-100/80 text-left text-xs text-stone-500 leading-relaxed`}
                        >
                          <p className="font-semibold text-[8px] tracking-widest text-[#a8854f] uppercase mb-1.5 font-sans">
                            Execution Guideline
                          </p>
                          {st.details}
                        </div>
                      </motion.div>
                    </div>

                    {/* Stagger Empty spacing divider */}
                    <div className="hidden md:block md:col-span-2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TRANSPARENT INTENSIVE INVESTMENT PRICING */}
      <section
        id="services"
        className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden bg-transparent"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-[#c4a47a]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16 select-none">
            <div className="px-4 py-1.5 rounded-full border border-[#a8854f]/35 bg-[#a8854f]/10 text-[#a8854f] text-[9.5px] font-bold tracking-[0.25em] uppercase mb-4 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5" /> MONTHLY PARTNERSHIP PLANS
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1a1918] mb-4 font-heading leading-tight">
              Transparent <span className="text-[#a8854f] italic">Pricing</span>
            </h2>

            <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-6">
              Predictable, flat-rate monthly partnerships. Straightforward
              deliverables constructed on high aesthetics, narrative precision,
              and proven authority.
            </p>

            {/* Value assurance badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-stone-200/80 shadow-xs text-xs font-medium text-stone-700">
              <span className="inline-flex items-center gap-1.5 font-bold font-mono text-[#a8854f]">
                Flat Monthly Retainer
              </span>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <span className="text-stone-500">Month-to-Month</span>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <span className="text-stone-500">Zero Hidden Costs</span>
            </div>
          </div>

          {/* Pricing Cards: Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8 items-stretch pt-4">
            {/* INTAKE PACKAGE 01 - GROWTH */}
            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 text-left">
              <div>
                {/* Header info */}
                <div className="mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#a8854f] uppercase block mb-2">
                    TIER 01 · STARTER
                  </span>
                  <h3 className="text-2xl font-heading font-extrabold text-stone-900 mb-2">
                    Growth Accelerator
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed min-h-[38px]">
                    For emerging founders and scaling professionals ready to
                    initiate consistent brand presence.
                  </p>
                </div>

                {/* Price block */}
                <div className="pt-6 pb-6 border-y border-stone-100 my-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl lg:text-5xl font-extrabold font-heading text-stone-900 tracking-tight">
                      {prices.growth}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {prices.suffix}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1 font-medium">
                    Flat monthly retainer · Dedicated production pod
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-3 mb-8">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 font-mono mb-3">
                    Deliverables Included
                  </p>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>
                        <strong>10 High-Quality Reels / Shorts</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Focus Authority Script Formulation</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>1 Primary Platform Native Distribution</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Monthly Metrics &amp; Performance Review</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Standard 72-Hour Revision Cycle</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Dedicated WhatsApp / Email Channel</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Button anchored to bottom */}
              <button
                onClick={() => handleApplyPackage("Growth Accelerator")}
                className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1a1918] text-white hover:bg-[#a8854f] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md hover:shadow-lg mt-auto"
              >
                <span>Select Growth Plan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* INTAKE PACKAGE 02 - AUTHORITY (POPULAR) */}
            <div className="relative bg-gradient-to-b from-[#faf8f4] to-white rounded-2xl border-2 border-[#a8854f] shadow-[0_20px_50px_rgba(168,133,79,0.16)] p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_24px_60px_rgba(168,133,79,0.22)] lg:-translate-y-2 z-10 text-left">
              {/* Floating Pill Tag */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#a8854f] text-white text-[9.5px] font-extrabold tracking-[0.22em] uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3 h-3 animate-spin-slow" />
                <span>MOST POPULAR · RECOMMENDED</span>
              </div>

              <div>
                {/* Header info */}
                <div className="mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#a8854f] uppercase block mb-2">
                    TIER 02 · SCALE
                  </span>
                  <h3 className="text-2xl font-heading font-extrabold text-stone-900 mb-2">
                    Authority Builder
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed min-h-[38px] font-medium">
                    Our cornerstone luxury package designed for leaders ready to
                    systematically scale organic leverage.
                  </p>
                </div>

                {/* Price block */}
                <div className="pt-6 pb-6 border-y border-[#a8854f]/25 my-6 bg-[#a8854f]/5 -mx-8 lg:-mx-9 px-8 lg:px-9">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl lg:text-5xl font-extrabold font-heading text-stone-900 tracking-tight">
                      {prices.authority}
                    </span>
                    <span className="text-xs text-[#a8854f] font-bold">
                      {prices.suffix}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8e6e3c] mt-1 font-semibold">
                    Flat monthly retainer · Comprehensive scale model
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-3 mb-8">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a8854f] font-mono mb-3">
                    Deliverables Included
                  </p>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5 text-stone-800 text-xs md:text-sm font-medium">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>
                        <strong>15 High-Fidelity Reels / Shorts</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/15 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Attention Cascade Script Schema</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/15 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Multi-Platform Managed Distribution</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/15 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>
                        Bi-Weekly Strategic Growth &amp; Narrative Audits
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/15 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>
                        Priority 48-Hour Cinematic Color Grade &amp; Edits
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/15 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Dedicated Creative Strategist &amp; Lead</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Button anchored to bottom */}
              <button
                onClick={() => handleApplyPackage("Authority Builder")}
                className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#a8854f] text-white hover:bg-[#8e6e3c] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-[#a8854f]/30 hover:shadow-xl hover:shadow-[#a8854f]/40 mt-auto"
              >
                <span>Select Authority Plan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* INTAKE PACKAGE 03 - ELITE */}
            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 text-left">
              <div>
                {/* Header info */}
                <div className="mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#a8854f] uppercase block mb-2">
                    TIER 03 · ENTERPRISE
                  </span>
                  <h3 className="text-2xl font-heading font-extrabold text-stone-900 mb-2">
                    Elite Partnership
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed min-h-[38px]">
                    Built for key operators seeking dedicated content
                    infrastructure and absolute execution sync.
                  </p>
                </div>

                {/* Price block */}
                <div className="pt-6 pb-6 border-y border-stone-100 my-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl lg:text-5xl font-extrabold font-heading text-stone-900 tracking-tight">
                      {prices.elite}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {prices.suffix}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1 font-medium">
                    Flat monthly retainer · Executive omnichannel sync
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-3 mb-8">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 font-mono mb-3">
                    Deliverables Included
                  </p>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>
                        <strong>30 Bespoke Cinema Deliverables</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Bespoke Brand Voice Consulting Architecture</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Complete Multi-Channel Admin Publishing</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Weekly Executive Growth &amp; Content Sync</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Priority 24-Hour Turnaround &amp; Iterations</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-stone-700 text-xs md:text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Direct Executive Creative Direction</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Button anchored to bottom */}
              <button
                onClick={() => handleApplyPackage("Elite Partnership")}
                className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1a1918] text-white hover:bg-[#a8854f] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md hover:shadow-lg mt-auto"
              >
                <span>Select Elite Plan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Mobile Pricing Slider */}
          <div className="lg:hidden pt-4">
            <div
              ref={pricingSliderRef}
              className="mobile-slider px-2"
              onScroll={() => handleSliderScroll(pricingSliderRef, setActivePricingIdx)}
            >
              {/* GROWTH card mobile */}
              <div className="pricing-slider-card relative bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-7 flex flex-col justify-between text-left">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#a8854f] uppercase block mb-2">TIER 01 · STARTER</span>
                  <h3 className="text-xl font-heading font-extrabold text-stone-900 mb-2">Growth Accelerator</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">For emerging founders and scaling professionals ready to initiate consistent brand presence.</p>
                  <div className="pt-5 pb-5 border-y border-stone-100 my-5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold font-heading text-stone-900 tracking-tight">{prices.growth}</span>
                      <span className="text-xs text-stone-500 font-medium">{prices.suffix}</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 font-medium">Flat monthly retainer · Dedicated production pod</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {["10 High-Quality Reels / Shorts", "Focus Authority Script Formulation", "1 Primary Platform Distribution", "Monthly Performance Review", "Standard 72-Hour Revision Cycle", "Dedicated WhatsApp / Email Channel"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-stone-700 text-xs">
                        <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3 stroke-[3]" /></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => handleApplyPackage("Growth Accelerator")} className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1a1918] text-white hover:bg-[#a8854f] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md mt-auto">
                  <span>Select Growth Plan</span><ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* AUTHORITY card mobile */}
              <div className="pricing-slider-card relative bg-gradient-to-b from-[#faf8f4] to-white rounded-2xl border-2 border-[#a8854f] shadow-[0_20px_50px_rgba(168,133,79,0.16)] p-7 flex flex-col justify-between text-left">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#a8854f] text-white text-[9px] font-extrabold tracking-[0.22em] uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 animate-spin-slow" /><span>MOST POPULAR</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#a8854f] uppercase block mb-2 mt-2">TIER 02 · SCALE</span>
                  <h3 className="text-xl font-heading font-extrabold text-stone-900 mb-2">Authority Builder</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">Our cornerstone luxury package designed for leaders ready to systematically scale organic leverage.</p>
                  <div className="pt-5 pb-5 border-y border-[#a8854f]/25 my-5 bg-[#a8854f]/5 -mx-7 px-7">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold font-heading text-stone-900 tracking-tight">{prices.authority}</span>
                      <span className="text-xs text-[#a8854f] font-bold">{prices.suffix}</span>
                    </div>
                    <p className="text-[11px] text-[#8e6e3c] mt-1 font-semibold">Flat monthly retainer · Comprehensive scale model</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {["15 High-Fidelity Reels / Shorts", "Attention Cascade Script Schema", "Multi-Platform Managed Distribution", "Bi-Weekly Strategic Growth Audits", "Priority 48-Hour Cinematic Edits", "Dedicated Creative Strategist"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-stone-700 text-xs">
                        <div className="w-5 h-5 rounded-full bg-[#a8854f]/15 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3 stroke-[3]" /></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => handleApplyPackage("Authority Builder")} className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#a8854f] text-white hover:bg-[#8e6e3c] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-[#a8854f]/30 mt-auto">
                  <span>Select Authority Plan</span><ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* ELITE card mobile */}
              <div className="pricing-slider-card relative bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-7 flex flex-col justify-between text-left">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#a8854f] uppercase block mb-2">TIER 03 · ENTERPRISE</span>
                  <h3 className="text-xl font-heading font-extrabold text-stone-900 mb-2">Elite Partnership</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">Built for key operators seeking dedicated content infrastructure and absolute execution sync.</p>
                  <div className="pt-5 pb-5 border-y border-stone-100 my-5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold font-heading text-stone-900 tracking-tight">{prices.elite}</span>
                      <span className="text-xs text-stone-500 font-medium">{prices.suffix}</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 font-medium">Flat monthly retainer · Executive omnichannel sync</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {["30 Bespoke Cinema Deliverables", "Bespoke Brand Voice Consulting", "Complete Multi-Channel Publishing", "Weekly Executive Growth Sync", "Priority 24-Hour Turnaround", "Direct Executive Creative Direction"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-stone-700 text-xs">
                        <div className="w-5 h-5 rounded-full bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3 stroke-[3]" /></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => handleApplyPackage("Elite Partnership")} className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1a1918] text-white hover:bg-[#a8854f] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md mt-auto">
                  <span>Select Elite Plan</span><ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            {/* Pricing Slider Dots */}
            <div className="slider-dots">
              {[0, 1, 2].map((i) => (
                <button key={i} className={`slider-dot compact-btn ${activePricingIdx === i ? 'active' : ''}`} onClick={() => scrollSliderTo(pricingSliderRef, i)} aria-label={`Go to pricing plan ${i + 1}`} />
              ))}
            </div>
          </div>

          {/* Trust & Guarantee Strip */}
          {/* Desktop */}
          <div className="mt-14 pt-10 border-t border-stone-200/80 hidden md:grid grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-white/70 backdrop-blur-xs border border-stone-200/60 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-heading text-stone-900 uppercase tracking-wider">
                  Zero Lock-In Contract
                </h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Month-to-month flexibility. Upgrade, pause, or cancel anytime
                  with simple 14-day notice.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-white/70 backdrop-blur-xs border border-stone-200/60 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-heading text-stone-900 uppercase tracking-wider">
                  48-Hour Rapid Kickoff
                </h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Structured onboarding within 48 hours. First strategic content
                  batch delivered in 5 days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-white/70 backdrop-blur-xs border border-stone-200/60 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5 text-[#a8854f]" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-heading text-stone-900 uppercase tracking-wider">
                  100% Bespoke Cinema
                </h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Zero generic templates or outsourced low-grade work.
                  Handcrafted cinema tailored to you.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Trust Slider */}
          <div className="md:hidden mt-10 pt-8 border-t border-stone-200/80">
            <div
              ref={trustSliderRef}
              className="mobile-slider px-2"
              onScroll={() => handleSliderScroll(trustSliderRef, setActiveTrustIdx)}
            >
              <div className="trust-slider-card flex items-start gap-3.5 p-5 rounded-xl bg-white/70 backdrop-blur-xs border border-stone-200/60 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-xs font-bold font-heading text-stone-900 uppercase tracking-wider">Zero Lock-In Contract</h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">Month-to-month flexibility. Upgrade, pause, or cancel anytime with simple 14-day notice.</p>
                </div>
              </div>
              <div className="trust-slider-card flex items-start gap-3.5 p-5 rounded-xl bg-white/70 backdrop-blur-xs border border-stone-200/60 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0"><Clock className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-xs font-bold font-heading text-stone-900 uppercase tracking-wider">48-Hour Rapid Kickoff</h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">Structured onboarding within 48 hours. First strategic content batch delivered in 5 days.</p>
                </div>
              </div>
              <div className="trust-slider-card flex items-start gap-3.5 p-5 rounded-xl bg-white/70 backdrop-blur-xs border border-stone-200/60 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-[#a8854f]/10 text-[#a8854f] flex items-center justify-center shrink-0"><Crown className="w-5 h-5 text-[#a8854f]" /></div>
                <div>
                  <h4 className="text-xs font-bold font-heading text-stone-900 uppercase tracking-wider">100% Bespoke Cinema</h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">Zero generic templates or outsourced low-grade work. Handcrafted cinema tailored to you.</p>
                </div>
              </div>
            </div>
            <div className="slider-dots">
              {[0, 1, 2].map((i) => (
                <button key={i} className={`slider-dot compact-btn ${activeTrustIdx === i ? 'active' : ''}`} onClick={() => scrollSliderTo(trustSliderRef, i)} aria-label={`Trust item ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US EXPLAINER GRID */}
      <section className="py-24 bg-[#eae8e4] border-y border-black/5 select-none relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="px-4 py-1.5 rounded-full border border-[#a8854f]/30 bg-[#a8854f]/10 text-[#a8854f] text-[9.5px] font-bold tracking-[0.25em] uppercase mb-6 flex items-center gap-1.5">
              THE VALUE GAP <Sparkle className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1a1918] mb-5">
              Why Choose <span className="text-[#a8854f] italic">Us</span>
            </h2>
            <p className="text-stone-600 text-sm max-w-xl">
              We look past empty virality metrics to design absolute visual
              authority, establishing professional leverage that drives inbound
              opportunities.
            </p>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-3 gap-8 text-left">
            {/* VALUE ITEM 01 */}
            <div className="bg-white/80 border border-stone-200/50 p-8 rounded-2xl shadow-sm hover:-translate-y-2.5 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#a8854f]/10 text-[#a8854f] rounded-xl flex items-center justify-center mb-6">
                <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#1a1918] mb-3">Founder-Led Strategy</h3>
              <p className="text-xs md:text-sm text-stone-600/90 leading-relaxed">Every leader possesses unique perspectives. We understand your distinct professional tone first, ensuring content sounds confident and exact.</p>
            </div>
            {/* VALUE ITEM 02 */}
            <div className="bg-white/80 border border-stone-200/50 p-8 rounded-2xl shadow-sm hover:-translate-y-2.5 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#a8854f]/10 text-[#a8854f] rounded-xl flex items-center justify-center mb-6">
                <Crown className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#1a1918] mb-3">Premium Content With Purpose</h3>
              <p className="text-xs md:text-sm text-stone-600/90 leading-relaxed">High resolution video alone does not equate to value. Every reel we build starts with a core hooks model, focused metrics, and professional timing.</p>
            </div>
            {/* VALUE ITEM 03 */}
            <div className="bg-white/80 border border-stone-200/50 p-8 rounded-2xl shadow-sm hover:-translate-y-2.5 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#a8854f]/10 text-[#a8854f] rounded-xl flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#1a1918] mb-3">Consistency That Builds Authority</h3>
              <p className="text-xs md:text-sm text-stone-600/90 leading-relaxed">Authority requires predictable, systematic presence. We take full responsibility for distribution logistics to keep your strategy reliable.</p>
            </div>
          </div>

          {/* Mobile slider */}
          <div className="md:hidden">
            <div
              ref={whyUsSliderRef}
              className="mobile-slider px-2"
              onScroll={() => handleSliderScroll(whyUsSliderRef, setActiveWhyUsIdx)}
            >
              {[
                { icon: <User className="w-6 h-6" />, title: "Founder-Led Strategy", desc: "Every leader possesses unique perspectives. We understand your distinct professional tone first, ensuring content sounds confident and exact." },
                { icon: <Crown className="w-6 h-6" />, title: "Premium Content With Purpose", desc: "High resolution video alone does not equate to value. Every reel we build starts with a core hooks model, focused metrics, and professional timing." },
                { icon: <BarChart className="w-6 h-6" />, title: "Consistency That Builds Authority", desc: "Authority requires predictable, systematic presence. We take full responsibility for distribution logistics to keep your strategy reliable." },
              ].map((item, i) => (
                <div key={i} className="why-us-slider-card bg-white/80 border border-stone-200/50 p-7 rounded-2xl shadow-sm text-left">
                  <div className="w-12 h-12 bg-[#a8854f]/10 text-[#a8854f] rounded-xl flex items-center justify-center mb-5">{item.icon}</div>
                  <h3 className="text-lg font-bold font-heading text-[#1a1918] mb-3">{item.title}</h3>
                  <p className="text-xs text-stone-600/90 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="slider-dots">
              {[0, 1, 2].map((i) => (
                <button key={i} className={`slider-dot compact-btn ${activeWhyUsIdx === i ? 'active' : ''}`} onClick={() => scrollSliderTo(whyUsSliderRef, i)} aria-label={`Value item ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONCISE HIGH-END BRAND ENTRANCE ACTION */}
      <section className="py-16 md:py-24 bg-transparent px-4 md:px-8 focus-section select-none">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative shadow-xl border border-[#c4a47a]/30 bg-[#fbfaf6]">
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="50%"
                cy="50%"
                r="40%"
                stroke="black"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          <div className="py-24 px-6 md:px-12 text-center relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl lg:text-7.5vw font-bold mb-8 text-[#1a1918] font-heading tracking-tight leading-none">
              Ready to Start <br className="md:hidden" />{" "}
              <span className="italic text-[#a8854f]">Your Chapter?</span>
            </h2>
            <p className="text-stone-600 text-sm md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed text-balance font-medium">
              Let's turn your story, knowledge, and personality into content
              that feels real, looks premium, and makes people want to follow
              your journey.
            </p>

            <button
              onClick={() => {
                setSelectedPackage("Authority Builder");
                setIsTalkModalOpen(true);
              }}
              className="relative inline-flex items-center justify-center px-11 py-5 bg-[#1a1918] text-white rounded-full overflow-hidden group text-xs font-bold uppercase tracking-widest cursor-pointer shadow-lg hover:shadow-[#a8854f]/35 hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 font-sans">
                Start Consultation
              </span>
              <div className="absolute inset-0 bg-[#a8854f] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1]"></div>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER ACCENTS */}
      <footer className="bg-[#101010] text-[#f4f3ef] py-16 px-6 md:px-12 border-t border-zinc-900 select-none">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          {/* Logo & details */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img src="/logo.png" alt="TheFusionMedia Logo" className="h-10 md:h-12 object-contain brightness-0 invert opacity-90" />
            </div>
            <p className="text-zinc-400 text-xs mt-4 max-w-sm leading-relaxed mb-6 font-medium">
              Surat's premier personal branding, social media marketing, and
              organic growth agency. We build authentic digital authority for
              founders, doctors, CA professionals, and entrepreneurs.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/fusionnmedia.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-[#c4a47a] hover:bg-[#a8854f] hover:text-white transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/fusion-media-b9675a413/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-[#c4a47a] hover:bg-[#a8854f] hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.25em] font-extrabold text-stone-400 uppercase mb-4 font-mono">
              INTAKE OFFERS
            </h4>
            <ul className="space-y-3 text-xs text-zinc-400 font-medium">
              <li>
                <button
                  onClick={() => {
                    handleApplyPackage("Growth Accelerator");
                  }}
                  className="hover:text-white transition-all cursor-pointer"
                >
                  Growth Accelerator Plan
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleApplyPackage("Authority Builder");
                  }}
                  className="hover:text-white transition-all cursor-pointer"
                >
                  Authority Builder Plan
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleApplyPackage("Elite Partnership");
                  }}
                  className="hover:text-white transition-all cursor-pointer"
                >
                  Elite Partnership Blueprint
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.25em] font-extrabold text-stone-400 uppercase mb-4 font-mono">
              STUDIO LOCATION
            </h4>
            <div className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed font-sans font-medium mb-3">
              <MapPin className="w-4 h-4 text-[#a8854f] shrink-0 mt-0.5" />
              <address className="not-italic text-stone-300 text-xs leading-relaxed">
                702, Pavitraa Point, Yogichowk,
                <br />
                Opp BBC, Near Savaliya Circle,
                <br />
                Vrundavan Society, Yoginagar Society,
                <br />
                Surat, Gujarat 395011, India
              </address>
            </div>
            <p className="text-xs text-zinc-400 font-sans mt-2 font-medium">
              Email:{" "}
              <a
                href="mailto:info@fusionmedia.co"
                className="text-stone-300 hover:text-[#a8854f] transition-colors"
              >
                info@fusionmedia.co
              </a>
            </p>
            <p className="text-xs text-zinc-400 font-sans mt-1.5 font-medium flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#a8854f]" />
              <span>Mobile / WhatsApp:</span>
              <a
                href="tel:+919876543210"
                className="text-stone-300 hover:text-[#a8854f] transition-colors font-mono"
              >
                +91 98765 43210
              </a>
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-zinc-800/80 mt-12 pt-8 text-center md:flex md:justify-between items-center text-[11px] text-zinc-500 font-sans">
          <p>
            © 2026 TheFusionMedia. Personal Branding &amp; Social Media
            Marketing Agency. All Rights Reserved.
          </p>
          <div className="mt-2 md:mt-0 flex items-center justify-center gap-4">
            <span className="text-zinc-500 font-mono">
              Confidential Executive Onboarding
            </span>
          </div>
        </div>
      </footer>

      {/* FULL EXCLUSIVE CONSTRUCTIVE CONCIERGE MODAL DIALOG */}
      <AnimatePresence>
        {isTalkModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Dark glass backdrop element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTalkModalOpen(false)}
              className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
            />

            {/* Conversational Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#fcfbf9] w-full max-w-xl rounded-2xl border border-[#c4a47a]/45 shadow-2xl overflow-hidden relative z-10 p-8 text-left font-sans"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr from-transparent via-[#c4a47a]/8 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
                <div>
                  <span className="text-[9px] font-extrabold tracking-widest text-[#a8854f] uppercase flex items-center gap-1 font-mono">
                    <Sparkles className="w-3 h-3 text-[#a8854f]" /> Fusion Media
                    Conversational Intake
                  </span>
                  <h3 className="text-xl md:text-2xl font-heading font-black text-stone-900 mt-1">
                    Onboarding Priority Access
                  </h3>
                </div>
                <button
                  onClick={() => setIsTalkModalOpen(false)}
                  className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4 font-mono">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-stone-900 font-heading">
                    Intake Booking Confirmed
                  </h4>
                  <p className="text-xs text-stone-600 mt-1.5 max-w-sm mx-auto font-medium">
                    Thank you, {clientName}! Your onboarding details have been
                    safely received by the Fusion Media executive team.
                  </p>

                  {/* Clean Luxury Receipt Card */}
                  <div className="mt-5 w-full bg-white border border-stone-200 rounded-2xl p-4 text-left shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                      <span className="text-[10px] uppercase font-mono font-bold text-[#a8854f]">
                        Inquiry Registered
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                        Direct Agency Dispatch
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-stone-700">
                      <div>
                        <span className="text-[9.5px] uppercase text-stone-400 block">
                          Package
                        </span>
                        <strong className="text-stone-900">
                          {selectedPackage}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[9.5px] uppercase text-stone-400 block">
                          Archetype
                        </span>
                        <strong className="text-stone-900">{brandType}</strong>
                      </div>
                      <div>
                        <span className="text-[9.5px] uppercase text-stone-400 block">
                          Mobile Phone
                        </span>
                        <strong className="text-stone-900">
                          {clientPhone}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[9.5px] uppercase text-stone-400 block">
                          Email Address
                        </span>
                        <strong className="text-stone-900 truncate block">
                          {clientEmail}
                        </strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[10.5px] font-mono text-emerald-700 font-semibold">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        Inquiry dispatched to our executive desk ({OWNER_EMAIL})
                      </span>
                    </div>
                  </div>

                  {/* Direct WhatsApp Message Button */}
                  {clientPhone && (
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(
                        `Hi Fusion Media, I just submitted an intake inquiry for ${clientName} for the ${selectedPackage} package.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <span>Direct Message Agency on WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleCloseSuccessModal}
                    className="mt-3 px-8 py-2.5 bg-[#1a1918] hover:bg-[#a8854f] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md w-full sm:w-auto"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Step Progress Tracker */}
                  <div className="bg-stone-100 rounded-full h-[6px] overflow-hidden relative">
                    <div
                      className="bg-[#a8854f] h-full transition-all duration-500"
                      style={{
                        width: `${conciergeStep === 1 ? "33%" : conciergeStep === 2 ? "66%" : "100%"}`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-[8px] font-extrabold text-[#1a1918]/60 font-mono">
                    <span>CONCIERGE PROGRESS</span>
                    <span className="text-[#a8854f]">
                      STEP {conciergeStep} OF 3
                    </span>
                  </div>

                  {/* STEP 1: Basic Identity */}
                  {conciergeStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-1.5 font-mono">
                          Full Candidate Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#a8854f] text-stone-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-1.5 font-mono">
                          Direct Communication Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="founder@company.com"
                          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#a8854f] text-stone-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-1.5 font-mono">
                          Mobile / WhatsApp Number *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            required
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#a8854f] text-stone-900"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            if (!clientName || !clientEmail || !clientPhone) {
                              alert(
                                "Kindly supply your Name, Email, and Mobile Number first.",
                              );
                              return;
                            }
                            setConciergeStep(2);
                          }}
                          className="px-6 py-3 bg-[#1a1918] hover:bg-[#a8854f] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          Next Stage <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Archetype Sync */}
                  {conciergeStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-3 font-mono">
                          Select Intended Position Archetype *
                        </label>
                        <div className="grid grid-cols-1 gap-2.5">
                          {[
                            {
                              title: "Founder / Executive",
                              desc: "Seeking absolute industrial presence and leverage",
                            },
                            {
                              title: "Creator / Coach",
                              desc: "Focused on scaling communities and student flows",
                            },
                            {
                              title: "Expert / Doctor",
                              desc: "Establishing scientific credibility and trust vectors",
                            },
                          ].map((opt) => {
                            const isSelected = brandType === opt.title;
                            return (
                              <button
                                key={opt.title}
                                type="button"
                                onClick={() => setBrandType(opt.title)}
                                className={`p-4 rounded-xl text-left border cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-[#1a1918] text-white border-[#1a1918] shadow-md"
                                    : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                                }`}
                              >
                                <p className="text-xs font-bold leading-tight uppercase font-mono">
                                  {opt.title}
                                </p>
                                <p
                                  className={`text-[10px] mt-1 ${isSelected ? "text-amber-100" : "text-stone-400"}`}
                                >
                                  {opt.desc}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-2 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setConciergeStep(1)}
                          className="px-5 py-3 border border-stone-200 text-stone-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setConciergeStep(3)}
                          className="px-6 py-3 bg-[#1a1918] hover:bg-[#a8854f] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          Next <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Brand Details */}
                  {conciergeStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-1.5 font-mono">
                          Social Handles / Platforms (If any)
                        </label>
                        <input
                          type="text"
                          value={socialHandles}
                          onChange={(e) => setSocialHandles(e.target.value)}
                          placeholder="@handleon_instagram_linkedin"
                          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#a8854f] text-stone-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-1.5 font-mono">
                          Briefly Describe Your Story / Scaling Target Goal *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={clientStory}
                          onChange={(e) => setClientStory(e.target.value)}
                          placeholder="I want to convert my corporate background into cinematic content..."
                          className="w-full bg-white border border-stone-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#a8854f] text-stone-900"
                        />
                      </div>

                      <div className="pt-2 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setConciergeStep(2)}
                          className="px-5 py-3 border border-stone-200 text-stone-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmittingLead}
                          className="px-7 py-3.5 bg-[#1a1918] hover:bg-[#a8854f] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-lg hover:shadow-[#a8854f]/30 flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                          {isSubmittingLead ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>DISPATCHING INQUIRY...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>CONFIRM INTAKE BOOKING</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
