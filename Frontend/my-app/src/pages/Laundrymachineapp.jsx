import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Menu,
  X,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogIn,
  CalendarCheck,
  ClipboardCheck,
  Users,
  Shirt,
  Sparkles,
  Droplets,
  ShieldCheck,
  WashingMachine,
  Send,
  ShoppingCart,
} from "lucide-react";
import logo from "../assets/logo.png";

/* =========================================================
   CUSTOM CONFIGURATION
   ========================================================= */

// 1. Aapka Custom Logo
const CUSTOM_LOGO_URL = logo;

// 2. Hero Background Slider Images
const HERO_BG_IMAGES = [
  "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1600&auto=format&fit=crop",
];

// 3. Hero Phone Mockup - top banner photo
const HERO_MOCK_BANNER_IMG =
  "https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=600&auto=format&fit=crop";

// 4. Hero Phone Mockup - Service chips
const HERO_MOCK_SERVICES = [
  { name: "Wash & Fold", icon: WashingMachine, active: false },
  { name: "Wash & Iron", icon: Droplets, active: true },
  { name: "Premium Laundry", icon: Sparkles, active: false },
  { name: "Dry Clean", icon: Shirt, active: false },
];

/* ---------- Custom Social SVG Icons ---------- */
function Facebook({ size = 24, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Twitter({ size = 24, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Instagram({ size = 24, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ---------- Data ---------- */

const NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "About Us", to: "/#about" },
  { name: "Services", to: "/#services" },
  { name: "Price List", to: "/pricelist" },
  { name: "FAQ", to: "/faq" },
  { name: "Testimonials", to: "/#testimonials" },
  { name: "Contact", to: "/#contact" },
];

const SERVICES = [
  { icon: Shirt, name: "Wash & Fold", price: "₹ 59", unit: "(per Kg)" },
  { icon: WashingMachine, name: "Wash & Iron", price: "₹ 89", unit: "(per Kg)" },
  { icon: Sparkles, name: "Premium Laundry", price: "₹ 149", unit: "(per Kg)" },
  {
    icon: Shirt,
    name: "Dry Cleaning (Household)",
    price: "₹ 23 - 270",
    unit: "(per Item)",
  },
  { icon: Droplets, name: "Fabric Softener", price: "₹ 5", unit: "(per Kg)" },
  {
    icon: Shirt,
    name: "Dry Cleaning (Men)",
    price: "₹ 45 - 540",
    unit: "(per Item)",
  },
  { icon: ShieldCheck, name: "Antiseptic Wash", price: "₹ 5", unit: "(per Kg)" },
  {
    icon: Shirt,
    name: "Dry Cleaning (Woolen)",
    price: "₹ 63 - 360",
    unit: "(per Item)",
  },
  {
    icon: Shirt,
    name: "Dry Cleaning (Women)",
    price: "₹ 54 - 405",
    unit: "(per Item)",
  },
  {
    icon: Shirt,
    name: "Dry Cleaning (Accessories)",
    price: "₹ 23 - 765",
    unit: "(per Item)",
  },
];

/* Official Price List Data from thelaundrymachine.in/price-list */
const PRICE_LIST_ITEMS = [
  { name: "Anarkali Suit Heavy (per item)", service: "Dry Clean", category: "Women", price: "₹ 450" },
  { name: "Anarkali Suit Heavy (per item)", service: "Steam Iron (Pcs)", category: "Women", price: "₹ 250" },
  { name: "Aprin (per item)", service: "Dry Clean", category: "Household", price: "₹ 110" },
  { name: "Baby Blanket (per item)", service: "Dry Clean", category: "Kids", price: "₹ 150" },
  { name: "Backpack (per item)", service: "Dry Clean", category: "Accessories", price: "₹ 300" },
  { name: "Bad Cover Double (per item)", service: "Dry Clean", category: "Household", price: "₹ 250" },
  { name: "Bad Cover Single (per item)", service: "Dry Clean", category: "Household", price: "₹ 150" },
  { name: "Bathrobe (per item)", service: "Dry Clean", category: "Household", price: "₹ 150" },
  { name: "Bedsheet Double (per item)", service: "Dry Clean", category: "Household", price: "₹ 149" },
  { name: "Bedsheet Single (per item)", service: "Dry Clean", category: "Household", price: "₹ 80" },
  { name: "Belt (per item)", service: "Dry Clean", category: "Accessories", price: "₹ 25" },
  { name: "Belt Big (per item)", service: "Dry Clean", category: "Accessories", price: "₹ 70" },
  { name: "Blanket Double (per item)", service: "Dry Clean", category: "Woolen", price: "₹ 350" },
  { name: "Blanket Double H (per item)", service: "Dry Clean", category: "Woolen", price: "₹ 399" },
  { name: "Blanket Exp. Services (per item)", service: "Dry Clean", category: "Woolen", price: "₹ 449" },
  { name: "Blanket Single (per item)", service: "Dry Clean", category: "Woolen", price: "₹ 299" },
  { name: "Blouse (per item)", service: "Dry Clean", category: "Women", price: "₹ 99" },
  { name: "Blouse (per item)", service: "Steam Iron (Pcs)", category: "Women", price: "₹ 25" },
  { name: "Blouse Fancy (per item)", service: "Dry Clean", category: "Women", price: "₹ 129" },
  { name: "Blouse Fancy (per item)", service: "Steam Iron (Pcs)", category: "Women", price: "₹ 49" },
  { name: "Blouse Fancy H (per item)", service: "Dry Clean", category: "Women", price: "₹ 149" },
  { name: "Cap (per item)", service: "Dry Clean", category: "Accessories", price: "₹ 99" },
  { name: "Carpet (Per sq ft) H (per Kg)", service: "Carpet/Dari Cleaning", category: "Household", price: "₹ 35" },
  { name: "Coat Blazer (per item)", service: "Dry Clean", category: "Men", price: "₹ 199" },
  { name: "Coat/Blazer (per item)", service: "Steam Iron (Pcs)", category: "Men", price: "₹ 99" },
  { name: "Comforter Double bed (per item)", service: "Dry Clean", category: "Woolen", price: "₹ 350" },
  { name: "Comforter Single Bed (per item)", service: "Dry Clean", category: "Woolen", price: "₹ 299" },
  { name: "curtain blind small (per item)", service: "Dry Clean", category: "Household", price: "₹ 199" },
  { name: "Shirt / T-Shirt (per item)", service: "Dry Clean", category: "Men", price: "₹ 99" },
  { name: "Shirt / T-Shirt (per item)", service: "Steam Iron (Pcs)", category: "Men", price: "₹ 25" },
  { name: "Shirt / T-Shirt (per Kg)", service: "Wash & Iron", category: "Men", price: "₹ 89" },
  { name: "Trouser / Jeans (per item)", service: "Dry Clean", category: "Men", price: "₹ 110" },
  { name: "Trouser / Jeans (per item)", service: "Steam Iron (Pcs)", category: "Men", price: "₹ 30" },
  { name: "Trouser / Jeans (per Kg)", service: "Wash & Fold", category: "Men", price: "₹ 59" },
  { name: "Suit (2 Pc) / Blazer (per item)", service: "Dry Clean", category: "Men", price: "₹ 350" },
  { name: "Suit (3 Pc) (per item)", service: "Dry Clean", category: "Men", price: "₹ 450" },
  { name: "Kurta / Pyjama (per item)", service: "Dry Clean", category: "Men", price: "₹ 99" },
  { name: "Sherwani (per item)", service: "Dry Clean", category: "Men", price: "₹ 450" },
  { name: "Saree Cotton (per item)", service: "Dry Clean", category: "Women", price: "₹ 180" },
  { name: "Saree Silk (per item)", service: "Dry Clean", category: "Women", price: "₹ 350" },
  { name: "Lehenga Heavy (per item)", service: "Dry Clean", category: "Women", price: "₹ 550" },
  { name: "Easy Wash (Woolen) (per Kg)", service: "Easy Wash (Woolen)", category: "Woolen", price: "₹ 149" },
  { name: "Wash & Fold (per Kg)", service: "Wash & Fold", category: "Laundry", price: "₹ 59" },
  { name: "Wash & Iron (per Kg)", service: "Wash & Iron", category: "Laundry", price: "₹ 89" },
  { name: "Premium Laundry (per Kg)", service: "Premium Laundry", category: "Laundry", price: "₹ 149" },
  { name: "Fabric Softener (per Kg)", service: "Add-on", category: "Laundry", price: "₹ 5" },
  { name: "Antiseptic Wash (per Kg)", service: "Add-on", category: "Laundry", price: "₹ 5" },
];

const PROCESS_STEPS = [
  { icon: LogIn, label: "Download the app" },
  { icon: CalendarCheck, label: "Schedule Pickup" },
  { icon: ClipboardCheck, label: "Process Order" },
  { icon: Users, label: "Delivered on Time" },
];

const EXACT_TESTIMONIAL_TEXT =
  "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const TESTIMONIALS = [
  {
    name: "Adrianne Hagans",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    text: EXACT_TESTIMONIAL_TEXT,
    stars: 5,
  },
  {
    name: "Delila Rayam",
    role: "Verified Client",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    text: EXACT_TESTIMONIAL_TEXT,
    stars: 5,
  },
  {
    name: "Terrilyn Werme",
    role: "Jaipur Resident",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop",
    text: EXACT_TESTIMONIAL_TEXT,
    stars: 5,
  },
  {
    name: "Kyle Demayo",
    role: "Gurgaon Resident",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    text: EXACT_TESTIMONIAL_TEXT,
    stars: 5,
  },
  {
    name: "Minta Hadad",
    role: "Happy Client",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    text: EXACT_TESTIMONIAL_TEXT,
    stars: 5,
  },
  {
    name: "Sherman Cibrian",
    role: "Verified User",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    text: EXACT_TESTIMONIAL_TEXT,
    stars: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: "How do I schedule a pickup?",
    a: "Just click Book Now, choose your address, pick a convenient pickup date and time slot, and confirm your order. Our executive will arrive within the selected slot.",
  },
  {
    q: "What is the turnaround time?",
    a: "Most orders are delivered back within 48 hours of pickup, depending on the service selected and item load.",
  },
  {
    q: "Which areas do you currently operate in?",
    a: "We are currently operational in Jaipur & Gurgaon. We're expanding to more cities soon.",
  },
  {
    q: "Do you use eco-friendly detergents?",
    a: "Yes, all our washing and dry-cleaning is done using high quality equipment and eco-friendly chemicals, including antiseptic wash and fabric softener options.",
  },
  {
    q: "How is pricing calculated?",
    a: "Wash & Fold, Wash & Iron and Premium Laundry are billed per Kg. Dry cleaning items are billed per item based on category — see our full Price List for details.",
  },
  {
    q: "What if I need to reschedule or cancel?",
    a: "You can reschedule or cancel your pickup any time before the assigned slot by contacting our support team on call or WhatsApp.",
  },
];

/* =========================================================
   ANIMATION HELPERS
   ========================================================= */

function Reveal({ children, className = "", delay = 0, as = "div", style = {}, id }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

/* ---------- Building Blocks ---------- */

function SectionEyebrow({ children }) {
  return <p className="section-eyebrow">{children}</p>;
}

function PhoneMock({ children }) {
  return (
    <div className="phone-mock">
      <div className="phone-mock-notch" />
      <div className="phone-mock-inner">{children}</div>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo-container">
      {CUSTOM_LOGO_URL ? (
        <img src={CUSTOM_LOGO_URL} alt="The Freshfold " className="custom-logo-img" />
      ) : (
        <div className="logo-icon-bg">
          <WashingMachine size={24} color="#FFFFFF" />
        </div>
      )}
      <div>
        <div className="logo-title">
          THE <span className="logo-title-accent">Freshfold</span>
        </div>
        <div className="logo-subtitle">
          Dry cleaning &amp; laundry services...
        </div>
      </div>
    </div>
  );
}

/* ---------- Scroll-to-hash handler ---------- */
function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      const t = setTimeout(scroll, 60);
      return () => clearTimeout(t);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
  }, [location]);

  return null;
}

/* ---------- Header ---------- */

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header fade-in-down">
      <div className="container header-content">
        <Link to="/" className="logo-link" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="nav-desktop">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.name}
              to={link.to}
              className="nav-link nav-link-anim"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="header-actions-desktop">
          <Link to="/booknow" className="btn-book-header pulse-soft">
            Book Now
          </Link>
        </div>

        <button className="menu-toggle-btn" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu menu-drop">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="mobile-nav-link"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/booknow" className="btn-book-mobile" onClick={() => setOpen(false)}>
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % HERO_BG_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      {HERO_BG_IMAGES.map((img, idx) => (
        <div
          key={img}
          className={`hero-bg-slide ${idx === bgIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="hero-overlay" />

      <div className="container hero-grid">
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="hero-heading fade-in-up" style={{ animationDelay: "100ms" }}>
            FRESHFOLD LAUNDRY SERVICE
          </h1>
          <p className="hero-subtext fade-in-up" style={{ animationDelay: "250ms" }}>
            We are professionals in the laundry and dry cleaning business, we
            always stay up to date on the latest technologies and solutions.
          </p>
          <div className="hero-buttons fade-in-up" style={{ animationDelay: "400ms" }}>
            <button className="store-btn btn-hover-lift">
              <span className="store-btn-text-sm">
                GET IT ON
                <br />
                <span className="store-btn-text-lg">Google Play</span>
              </span>
            </button>
            <button className="store-btn btn-hover-lift">
              <span className="store-btn-text-sm">
                Available on the
                <br />
                <span className="store-btn-text-lg">App Store</span>
              </span>
            </button>
            <Link to="/booknow" className="hero-cta-btn btn-hover-lift glow-pulse">
              Click Here — Book Now
            </Link>
          </div>
        </div>

        <div
          className="fade-in-scale"
          style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 2, animationDelay: "300ms" }}
        >
          <PhoneMock>
            <div className="hero-mock-topbar">
              <Menu size={16} />
              <span className="hero-mock-topbar-title">The Freshfold</span>
              <span className="hero-mock-cart">
                <ShoppingCart size={15} />
                <span className="hero-mock-cart-badge">1</span>
              </span>
            </div>
            <div
              className="hero-mock-banner-img"
              style={{ backgroundImage: `url(${HERO_MOCK_BANNER_IMG})` }}
            />
            <div className="hero-mock-content">
              <p className="hero-mock-title">Select Services</p>
              <div className="hero-mock-services-row">
                {HERO_MOCK_SERVICES.map(({ icon: Icon, name, active }, i) => (
                  <div
                    key={name}
                    className={`hero-mock-service-chip pop-in ${active ? "active" : ""}`}
                    style={{ animationDelay: `${600 + i * 100}ms` }}
                  >
                    <span className="hero-mock-service-icon">
                      <Icon size={18} />
                    </span>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
              <button className="hero-mock-proceed-btn">PROCEED</button>
              <p className="hero-mock-testimonial-label">Customer Testimonial</p>
              <div className="hero-mock-testimonial-card">
                <div className="hero-mock-avatar">C</div>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: "600", margin: 0 }}>chandni</p>
                  <p style={{ fontSize: "10px", color: "#F59E0B", margin: 0 }}>★★★★☆ (4.0)</p>
                </div>
              </div>
            </div>
          </PhoneMock>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  return (
    <section id="about" className="container about-section">
      <Reveal>
        <SectionEyebrow>About Us</SectionEyebrow>
        <h2 className="about-heading">
          Best laundry service according your requirement
        </h2>
        <p className="about-paragraph">
          The Freshfold Provide Premium &amp; Affordable Washing,
          Ironing &amp; dry cleaning Services leveraging web &amp; mobile
          based technology. We pick up you dirty clothes &amp; belongings
          form your Doorstep and deliver fresh, clean clothes back at your
          doorstep.
        </p>
        <p className="about-paragraph">
          The Freshfold provide convenient way of getting your wash,
          laundry and dry-clean done with prime quality. Our Quick pick up at
          a slot chosen by you with a turnaround time of 48 hours provides
          your laundry and dry cleaning with best quality and change your
          Laundry experience ever. The processing of washing laundry and dry
          cleaning is done in best class setups with Latest &amp; high
          quality equipment and eco-friendly chemicals. We also do laundry
          with antiseptic wash, fabric softener and hygienic detergents. We
          are currently operational in Jaipur &amp; Gurgaon.
        </p>
        <p className="about-paragraph">
          try The Freshfold by scheduling the pickup and get your
          laundry and dry clean at the one click on your convenient time, We
          also do carpet dry cleaning, Shoe dry Cleaning, Sofa cover dry
          cleaning and so on.
        </p>
      </Reveal>

      <Reveal className="about-mock-container" delay={150}>
        <PhoneMock>
          <div className="about-mock-header">
            <ChevronLeft size={16} /> Schedule Pickup
          </div>
          <div className="about-mock-body">
            <div className="about-mock-steps">
              <span>Location</span>
              <span>Date/Time</span>
              <span>Confirm Order</span>
              <span>Complete</span>
            </div>
            <p className="about-mock-label">Pickup Date</p>
            <div className="date-grid">
              {["01 VEN", "02 SAB", "03 DOM", "04 LUN"].map((d, i) => (
                <div
                  key={d}
                  className={`date-card ${i === 0 ? "date-card-active" : ""}`}
                >
                  {d}
                </div>
              ))}
            </div>
            <p className="about-mock-label">Pickup Time Slot</p>
            <div className="slot-grid">
              <div className="slot-card">12:00 AM - 2:00 PM</div>
              <div className="slot-card slot-card-active">
                7:00 PM - 9:00 PM
              </div>
            </div>
            <p className="about-mock-label">Delivery Date</p>
            <div className="date-grid">
              {["03 DOM", "04 LUN", "05 MAR", "06 MER"].map((d, i) => (
                <div
                  key={d}
                  className={`date-card ${i === 0 ? "date-card-active" : ""}`}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        </PhoneMock>
      </Reveal>
    </section>
  );
}

/* ---------- How it works ---------- */

function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <div className="container how-it-works-header">
        <Reveal>
          <SectionEyebrow>Our Process</SectionEyebrow>
          <h2 className="how-it-works-heading">How it Works</h2>
        </Reveal>
        <div className="process-grid">
          {PROCESS_STEPS.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 120} className="process-card-wrap">
              <div className="process-card card-hover-lift">
                <div className="process-icon-wrapper icon-bounce">
                  <Icon size={30} />
                </div>
                <p className="process-label">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

function ServiceRow({ icon: Icon, name, price, unit, align, delay }) {
  return (
    <Reveal delay={delay} className={`service-row ${align === "right" ? "service-row-right" : ""} card-hover-lift`}>
      <div className="service-icon-bg icon-bounce">
        <Icon size={22} />
      </div>
      <div>
        <p className="service-name">{name}</p>
        <p className="service-price-line">
          <span className="service-price">{price}</span> + tax{" "}
          <span className="service-unit">{unit}</span>
        </p>
      </div>
    </Reveal>
  );
}

function Services() {
  const left = SERVICES.filter((_, i) => i % 2 === 0);
  const right = SERVICES.filter((_, i) => i % 2 === 1);
  return (
    <section id="services" className="container services-section">
      <Reveal>
        <SectionEyebrow>Our Services</SectionEyebrow>
        <h2 className="services-heading">
          Professional laundry &amp; dry cleaning Services
        </h2>
      </Reveal>
      <div className="services-grid">
        <div className="service-column">
          {left.map((s, i) => (
            <ServiceRow key={s.name} {...s} delay={i * 90} />
          ))}
        </div>
        <Reveal className="services-img-container" delay={200}>
          <img
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=800&auto=format&fit=crop"
            alt="Folded clean clothes on shelf"
            className="services-img"
          />
        </Reveal>
        <div className="service-column">
          {right.map((s, i) => (
            <ServiceRow key={s.name} {...s} align="right" delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials Slider ---------- */

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container testimonials-grid">
        <Reveal className="testimonial-left-col">
          <div className="testimonial-circle-frame float-slow">
            <img key={current.image} src={current.image} alt={current.name} className="fade-in-key" />
          </div>

          <div className="testimonial-avatar-thumbnails">
            {TESTIMONIALS.map((t, idx) => (
              <img
                key={t.name}
                src={t.image}
                alt={t.name}
                onClick={() => setActive(idx)}
                className={`thumb-img ${idx === active ? "active" : ""}`}
              />
            ))}
          </div>
        </Reveal>

        <Reveal className="testimonial-right-col" delay={150}>
          <SectionEyebrow>Testimonials</SectionEyebrow>
          <h2 className="testimonials-heading">What Our Clients Are Saying</h2>

          <div className="testimonial-card-slider">
            <div className="stars-row">
              {"★".repeat(current.stars)}
              {"☆".repeat(5 - current.stars)}
            </div>
            <p className="testimonial-text fade-in-key" key={current.name}>{current.text}</p>
            <div className="testimonial-footer">
              <div>
                <p className="testimonial-author">{current.name}</p>
                <p className="testimonial-role">{current.role}</p>
              </div>

              <div className="testimonial-nav-btns">
                <button
                  onClick={() =>
                    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                  }
                  className="testimonial-nav-btn btn-hover-lift"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setActive((a) => (a + 1) % TESTIMONIALS.length)}
                  className="testimonial-nav-btn btn-hover-lift"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="testimonial-dots">
            {TESTIMONIALS.map((_, i) => (
              <span
                key={i}
                onClick={() => setActive(i)}
                className={`dot ${i === active ? "active" : ""}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  return (
    <section id="contact" className="container contact-section">
      <Reveal>
        <div className="contact-img-grid">
          <img
            src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=600&auto=format&fit=crop"
            alt="Modern high tech washing machines"
            className="contact-img img-hover-zoom"
          />
          <img
            src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=600&auto=format&fit=crop"
            alt="Neatly pressed dry cleaned shirts"
            className="contact-img img-hover-zoom"
          />
        </div>

        <div className="contact-info-list">
          {[
            { icon: MapPin, label: "Head Office Address", value: "Jhotwara, Jaipur, (Raj) 302012" },
            { icon: MapPin, label: "Operational Office Address", value: "Gurgaon (H.R.) 122003" },
            { icon: Mail, label: "Email", value: "care@thelaundrymachine.in" },
            { icon: Phone, label: "Customer Care Number", value: "78782-95542" },
            { icon: MessageCircle, label: "Whatsapp", value: "78782-95542" },
          ].map(({ icon: Icon, label, value }, i) => (
            <div key={label} className="contact-info-item slide-in-left" style={{ animationDelay: `${i * 90}ms` }}>
              <div className="contact-info-icon-bg icon-bounce">
                <Icon size={18} />
              </div>
              <div>
                <p className="contact-info-label">{label}</p>
                <p className="contact-info-val">{value}</p>
              </div>
            </div>
          ))}
          <p className="contact-hours">Operation Hours: 08 AM to 10 PM</p>
          <p className="contact-hours">Care Calling Hours: 08 AM to 10 PM</p>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <SectionEyebrow>Contact Us Now</SectionEyebrow>
        <h2 className="contact-heading">Write a Message</h2>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="contact-form-row">
            <input type="text" placeholder="Name" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
          </div>
          <input type="text" placeholder="Mobile Number" className="form-input" />
          <textarea placeholder="Message" rows={5} className="form-textarea" />
          <button type="submit" className="btn-send-message btn-hover-lift">
            Send Message <Send size={16} />
          </button>
        </form>
      </Reveal>
    </section>
  );
}

/* ---------- Download CTA ---------- */

function DownloadCTA() {
  return (
    <section className="download-cta-section">
      <Reveal>
        <h2 className="download-cta-heading">
          Download our App Today &amp; Experience Endless Possibilities
        </h2>
        <p className="download-cta-subtext">
          Our never ending streak of delivering customer satisfaction is what
          passionate us to keeping moving forward.
        </p>
        <div className="download-cta-buttons">
          <button className="store-btn btn-hover-lift">
            <span className="store-btn-text-sm">
              GET IT ON
              <br />
              <span className="store-btn-text-lg">Google Play</span>
            </span>
          </button>
          <button className="store-btn btn-hover-lift">
            <span className="store-btn-text-sm">
              Available on the
              <br />
              <span className="store-btn-text-lg">App Store</span>
            </span>
          </button>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <Reveal>
          <div style={{ marginBottom: "1rem" }}>
            <Logo />
          </div>
          <p className="footer-text">
            The Freshfold Provide Premium &amp; Affordable Washing,
            Ironing &amp; dry cleaning Services leveraging web &amp; mobile
            based technology.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h3 className="footer-title">Quick Links</h3>
          <div className="footer-links-grid">
            <Link to="/#about" className="footer-link">About us</Link>
            <Link to="/#services" className="footer-link">How it works</Link>
            <Link to="/#services" className="footer-link">Our Services</Link>
            <Link to="/#testimonials" className="footer-link">Testimonials</Link>
            <Link to="/#contact" className="footer-link">Contact Us</Link>
            <Link to="/pricelist" className="footer-link">Price List</Link>
            <Link to="/faq" className="footer-link">FAQ</Link>
            <Link to="/booknow" className="footer-link">Book Now</Link>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <h3 className="footer-title">Social Links</h3>
          <div className="footer-socials">
            {[Facebook, Twitter, Instagram, MessageCircle, MessageCircle].map(
              (Icon, i) => (
                <div key={i} className="social-icon-btn icon-bounce">
                  <Icon size={18} />
                </div>
              )
            )}
          </div>
        </Reveal>
      </div>
      <div className="container footer-bottom">
        ©The Freshfold 2022 | All rights reserved.
      </div>
    </footer>
  );
}

/* ---------- Floating WhatsApp ---------- */

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/917878295542"
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float pulse-ring"
    >
      <MessageCircle size={28} />
    </a>
  );
}

/* =========================================================
   PAGES
   ========================================================= */

/* ---------- Home Page ---------- */

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Services />
      <Testimonials />
      <Contact />
      <DownloadCTA />
    </>
  );
}

/* ---------- Book Now Page ---------- */

function BookNowPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <Reveal>
          <SectionEyebrow>Book Now</SectionEyebrow>
          <h1 className="page-heading">Schedule Your Pickup</h1>
          <p className="page-subtext">
            Fill in your details and we'll pick up your laundry at the slot
            you choose. Turnaround time is 48 hours.
          </p>
        </Reveal>

        <Reveal delay={150} className="booknow-card">
          {submitted ? (
            <div className="booknow-success">
              <ClipboardCheck size={40} />
              <h3>Pickup Request Received!</h3>
              <p>Our team will call you shortly to confirm your slot.</p>
              <button className="btn-send-message btn-hover-lift" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <input type="text" placeholder="Full Name" className="form-input" required />
                <input type="tel" placeholder="Mobile Number" className="form-input" required />
              </div>
              <input type="text" placeholder="Pickup Address" className="form-input" required />
              <div className="contact-form-row">
                <input type="date" className="form-input" required />
                <select className="form-input" required defaultValue="">
                  <option value="" disabled>Select Time Slot</option>
                  <option>08:00 AM - 10:00 AM</option>
                  <option>12:00 PM - 02:00 PM</option>
                  <option>05:00 PM - 07:00 PM</option>
                  <option>07:00 PM - 09:00 PM</option>
                </select>
              </div>
              <select className="form-input" required defaultValue="">
                <option value="" disabled>Select Service</option>
                {SERVICES.map((s) => (
                  <option key={s.name}>{s.name}</option>
                ))}
              </select>
              <textarea placeholder="Any special instructions (optional)" rows={4} className="form-textarea" />
              <button type="submit" className="btn-send-message btn-hover-lift">
                Confirm Pickup <Send size={16} />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Price List Page (Premium Modern UI Style) ---------- */

function PriceListPage() {
  const [activeService, setActiveService] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const services = [
    "Dry Clean",
    "Steam Iron",
    "Wash & Iron",
    "Wash & Fold",
    "Premium Laundry",
  ];

  // Filter items based on selected button & search query
  const filteredItems = PRICE_LIST_ITEMS.filter((item) => {
    const matchesService =
      !activeService ||
      item.service.toLowerCase().includes(activeService.toLowerCase()) ||
      item.name.toLowerCase().includes(activeService.toLowerCase());
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesService && matchesSearch;
  });

  // Sort items based on clicked table header
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortColumn) return 0;
    let valA = a[sortColumn].toString().toLowerCase();
    let valB = b[sortColumn].toString().toLowerCase();

    if (sortColumn === "price") {
      const numA = parseFloat(valA.replace(/[^0-9.]/g, "")) || 0;
      const numB = parseFloat(valB.replace(/[^0-9.]/g, "")) || 0;
      return sortDirection === "asc" ? numA - numB : numB - numA;
    }

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination calculation
  const totalEntries = sortedItems.length;
  const indexOfLastItem = currentPage * entriesPerPage;
  const indexOfFirstItem = indexOfLastItem - entriesPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;

  const handleSort = (colKey) => {
    if (sortColumn === colKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(colKey);
      setSortDirection("asc");
    }
  };

  const handleServiceClick = (srv) => {
    if (activeService === srv) {
      setActiveService(""); // toggle off to show all
    } else {
      setActiveService(srv);
    }
    setCurrentPage(1);
  };

  return (
    <section className="page-hero" style={{ padding: "4rem 1.5rem" }}>
      <div className="container" style={{ maxWidth: "1140px", margin: "0 auto" }}>
        
        {/* Header Title Section */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <SectionEyebrow>Price List</SectionEyebrow>
          <h1 className="page-heading" style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0B192C", marginBottom: "0.5rem" }}>
            Our Pricing &amp; Service Rates
          </h1>
          <p style={{ color: "#64748B", fontSize: "1rem", maxWidth: "600px", margin: "0 auto" }}>
            Transparent, affordable pricing across all laundry &amp; dry cleaning categories.
          </p>
        </div>

        {/* Modern Pill Filter Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "2.5rem" }}>
          <button
            onClick={() => { setActiveService(""); setCurrentPage(1); }}
            style={{
              background: activeService === "" ? "linear-gradient(135deg, #0B192C 0%, #1E293B 100%)" : "#F1F5F9",
              color: activeService === "" ? "#FFFFFF" : "#475569",
              border: activeService === "" ? "none" : "1px solid #E2E8F0",
              padding: "10px 24px",
              borderRadius: "9999px",
              fontSize: "0.925rem",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: activeService === "" ? "0 4px 14px rgba(11, 25, 44, 0.25)" : "none",
              transition: "all 0.25s ease",
            }}
          >
            All Services
          </button>
          {services.map((srv) => {
            const isActive = activeService === srv;
            return (
              <button
                key={srv}
                onClick={() => handleServiceClick(srv)}
                style={{
                  background: isActive ? "linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#334155",
                  border: isActive ? "none" : "1px solid #E2E8F0",
                  padding: "10px 24px",
                  borderRadius: "9999px",
                  fontSize: "0.925rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 4px 14px rgba(6, 182, 212, 0.35)" : "0 2px 6px rgba(0, 0, 0, 0.03)",
                  transition: "all 0.25s ease",
                }}
              >
                {srv}
              </button>
            );
          })}
        </div>

        {/* Styled Card Container for Data Table */}
        <div style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          border: "1px solid #F1F5F9",
          padding: "1.75rem",
          overflow: "hidden"
        }}>
          
          {/* DataTables Control Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem", color: "#64748B", fontSize: "0.9rem", fontWeight: "600" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  color: "#0B192C",
                  backgroundColor: "#F8FAFC",
                  fontWeight: "700",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>entries</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Search:</span>
              <input
                type="text"
                value={searchTerm}
                placeholder="Search item name..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  padding: "8px 14px",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  backgroundColor: "#F8FAFC",
                  color: "#0B192C",
                  outline: "none",
                  width: "220px",
                  transition: "all 0.2s"
                }}
              />
            </div>
          </div>

          {/* Table Element */}
          <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid #F1F5F9" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", color: "#334155", fontSize: "0.925rem" }}>
              <thead>
                <tr style={{ background: "#0B192C", color: "#FFFFFF", textAlign: "left" }}>
                  {[
                    { label: "Item Name", key: "name" },
                    { label: "Service", key: "service" },
                    { label: "Category", key: "category" },
                    { label: "Item Price", key: "price" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      style={{
                        padding: "14px 16px",
                        fontWeight: "700",
                        color: "#FFFFFF",
                        cursor: "pointer",
                        userSelect: "none",
                        fontSize: "0.9rem",
                        letterSpacing: "0.5px"
                      }}
                    >
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <span>{col.label}</span>
                        <span style={{ fontSize: "0.75rem", color: sortColumn === col.key ? "#06B6D4" : "#94A3B8" }}>
                          {sortColumn === col.key ? (sortDirection === "asc" ? "▲" : "▼") : "⇅"}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                        transition: "background 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ECFEFF"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#FFFFFF" : "#F8FAFC"}
                    >
                      <td style={{ padding: "12px 16px", fontWeight: "700", color: "#0B192C" }}>{item.name}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          display: "inline-block",
                          padding: "2px 10px",
                          borderRadius: "9999px",
                          backgroundColor: "#ECFEFF",
                          color: "#0891B2",
                          fontWeight: "700",
                          fontSize: "0.825rem"
                        }}>
                          {item.service}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#64748B", fontWeight: "600" }}>{item.category}</td>
                      <td style={{ padding: "12px 16px", fontWeight: "800", color: "#06B6D4", fontSize: "1rem" }}>{item.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ padding: "24px", textAlign: "center", color: "#64748B", fontWeight: "600" }}>
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer info & pagination */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem", fontSize: "0.875rem", color: "#64748B", fontWeight: "600" }}>
            <div>
              Showing {totalEntries === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalEntries)} of {totalEntries} entries
            </div>

            {totalPages > 1 && (
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  style={{
                    padding: "6px 14px",
                    border: "1px solid #E2E8F0",
                    background: currentPage === 1 ? "#F1F5F9" : "#FFFFFF",
                    color: currentPage === 1 ? "#94A3B8" : "#06B6D4",
                    fontWeight: "700",
                    borderRadius: "8px",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2)
                ).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{
                      padding: "6px 14px",
                      border: "none",
                      background: currentPage === pageNum ? "linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)" : "#F8FAFC",
                      color: currentPage === pageNum ? "#FFFFFF" : "#475569",
                      fontWeight: "700",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  style={{
                    padding: "6px 14px",
                    border: "1px solid #E2E8F0",
                    background: currentPage === totalPages ? "#F1F5F9" : "#FFFFFF",
                    color: currentPage === totalPages ? "#94A3B8" : "#06B6D4",
                    fontWeight: "700",
                    borderRadius: "8px",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

/* ---------- FAQ Page ---------- */

function FaqAccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button className="faq-question" onClick={onToggle}>
        <span>{item.q}</span>
        <ChevronDown size={18} className="faq-chevron" />
      </button>
      {isOpen && <p className="faq-answer">{item.a}</p>}
    </div>
  );
}

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="page-hero">
      <div className="container">
        <Reveal>
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h1 className="page-heading">Frequently Asked Questions</h1>
          <p className="page-subtext">
            Answers to the questions we get asked the most.
          </p>
        </Reveal>

        <Reveal delay={150} className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <FaqAccordionItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </Reveal>

        <Reveal delay={250} className="pricelist-cta">
          <p>Still have questions?</p>
          <Link to="/#contact" className="hero-cta-btn btn-hover-lift glow-pulse">
            Contact Us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Modern Fresh CSS Palette & Styles ---------- */

const modernStyles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  color: #334155;
  background-color: #FFFFFF;
  line-height: 1.6;
}

.app-container {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-eyebrow {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #06B6D4;
  background-color: #ECFEFF;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  margin-bottom: 0.75rem;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes fadeInKey {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-24px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes popIn {
  0% { opacity: 0; transform: scale(0.7); }
  70% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulseSoft {
  0%, 100% { box-shadow: 0 4px 14px rgba(6, 182, 212, 0.35); }
  50% { box-shadow: 0 4px 22px rgba(6, 182, 212, 0.6); }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 4px 18px rgba(6, 182, 212, 0.4); }
  50% { box-shadow: 0 6px 28px rgba(6, 182, 212, 0.75); }
}

@keyframes pulseRing {
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55); }
  70% { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}

.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.fade-in-down {
  animation: fadeInDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.fade-in-scale {
  opacity: 0;
  animation: fadeInScale 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.fade-in-key {
  animation: fadeInKey 0.6s ease both;
}

.slide-in-left {
  opacity: 0;
  animation: slideInLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.pop-in {
  opacity: 0;
  animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.menu-drop {
  animation: fadeInDown 0.35s ease both;
}

.nav-link-anim {
  opacity: 0;
  animation: fadeInDown 0.5s ease forwards;
}

.float-slow {
  animation: floatSlow 4.5s ease-in-out infinite;
}

.pulse-soft {
  animation: pulseSoft 2.4s ease-in-out infinite;
}

.glow-pulse {
  animation: glowPulse 2.4s ease-in-out infinite;
}

.pulse-ring {
  animation: pulseRing 2.2s infinite;
}

.icon-bounce {
  transition: transform 0.3s ease;
}

.icon-bounce:hover {
  animation: iconBounce 0.6s ease;
}

.btn-hover-lift {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.btn-hover-lift:hover {
  transform: translateY(-3px);
}

.card-hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.card-hover-lift:hover {
  transform: translateY(-6px);
}

.img-hover-zoom {
  overflow: hidden;
  transition: transform 0.5s ease, filter 0.5s ease;
}

.img-hover-zoom:hover {
  transform: scale(1.04);
  filter: brightness(1.05);
}

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #E2E8F0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo-link {
  text-decoration: none;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.custom-logo-img {
  max-height: 48px;
  width: auto;
  object-fit: contain;
}

.logo-icon-bg {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
}

.logo-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0B192C;
  line-height: 1.2;
}

.logo-title-accent {
  color: #06B6D4;
}

.logo-subtitle {
  font-size: 0.725rem;
  color: #64748B;
  font-weight: 500;
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.nav-link {
  text-decoration: none;
  color: #475569;
  font-weight: 600;
  font-size: 0.925rem;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #06B6D4;
}

.btn-book-header {
  background: linear-gradient(135deg, #06B6D4 0%, #0284C7 100%);
  color: #FFFFFF;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(6, 182, 212, 0.35);
  transition: transform 0.2s;
  display: inline-block;
}

.btn-book-header:hover {
  transform: translateY(-2px);
}

.menu-toggle-btn {
  display: none;
  background: none;
  border: none;
  color: #0B192C;
  cursor: pointer;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  gap: 1rem;
}

.mobile-nav-link {
  text-decoration: none;
  color: #0B192C;
  font-weight: 600;
}

.btn-book-mobile {
  background: #06B6D4;
  color: white;
  text-decoration: none;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 700;
  text-align: center;
}

/* Hero Section */
.hero-section {
  position: relative;
  color: #FFFFFF;
  padding: 6rem 0 7rem;
  overflow: hidden;
  min-height: 580px;
}

.hero-bg-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
}

.hero-bg-slide.active {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(11, 25, 44, 0.92) 0%, rgba(15, 23, 42, 0.85) 100%);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: center;
}

.hero-heading {
  font-size: 2.85rem;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  letter-spacing: -1px;
}

.hero-subtext {
  font-size: 1.1rem;
  color: #CBD5E1;
  margin-bottom: 2rem;
  max-width: 540px;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.store-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #FFFFFF;
  padding: 0.65rem 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.2s;
  text-align: left;
}

.store-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.store-btn-text-sm {
  font-size: 0.65rem;
  text-transform: uppercase;
  color: #94A3B8;
}

.store-btn-text-lg {
  font-size: 0.95rem;
  font-weight: 700;
  color: #FFFFFF;
}

.hero-cta-btn {
  background: linear-gradient(135deg, #06B6D4 0%, #0284C7 100%);
  color: white;
  text-decoration: none;
  border: none;
  font-weight: 700;
  padding: 0.9rem 1.75rem;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(6, 182, 212, 0.4);
  display: inline-block;
}

.phone-mock {
  width: 270px;
  background: #0B192C;
  border: 8px solid #1E293B;
  border-radius: 36px;
  padding: 10px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.phone-mock-notch {
  width: 90px;
  height: 16px;
  background: #1E293B;
  border-radius: 0 0 10px 10px;
  margin: 0 auto 10px;
}

.phone-mock-inner {
  background: #FFFFFF;
  border-radius: 24px;
  overflow: hidden;
  color: #0B192C;
  padding: 12px;
}

.hero-mock-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: linear-gradient(135deg, #0B192C 0%, #14304d 100%);
  color: #FFFFFF;
  padding: 12px 14px;
  margin: -12px -12px 0 -12px;
}

.hero-mock-topbar-title {
  font-weight: 800;
  font-size: 0.82rem;
  flex: 1;
  text-align: center;
}

.hero-mock-cart {
  position: relative;
  display: flex;
}

.hero-mock-cart-badge {
  position: absolute;
  top: -7px;
  right: -8px;
  background: #EF4444;
  color: #fff;
  font-size: 0.5rem;
  font-weight: 800;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.hero-mock-banner-img {
  height: 92px;
  margin: 0 -12px;
  background-size: cover;
  background-position: center;
}

.hero-mock-title {
  font-size: 0.8rem;
  font-weight: 800;
  color: #0B192C;
  margin: 12px 0 8px;
}

.hero-mock-services-row {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.hero-mock-service-chip {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  background: #F1F5F9;
  border-radius: 10px;
  padding: 8px 3px;
  font-size: 0.52rem;
  font-weight: 700;
  color: #334155;
  text-align: center;
  transition: background 0.3s, color 0.3s;
}

.hero-mock-service-chip.active {
  background: linear-gradient(135deg, #06B6D4 0%, #0284C7 100%);
  color: #FFFFFF;
}

.hero-mock-service-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #FFFFFF;
  color: #0891B2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.hero-mock-service-chip.active .hero-mock-service-icon {
  background: rgba(255, 255, 255, 0.22);
  color: #FFFFFF;
  box-shadow: none;
}

.hero-mock-proceed-btn {
  width: 100%;
  background: linear-gradient(135deg, #06B6D4 0%, #0284C7 100%);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  cursor: pointer;
}

.hero-mock-testimonial-label {
  font-size: 0.65rem;
  color: #64748B;
  font-weight: 600;
  margin-bottom: 6px;
}

.hero-mock-testimonial-card {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F8FAFC;
  padding: 6px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
}

.hero-mock-avatar {
  width: 24px;
  height: 24px;
  background: #F59E0B;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  flex-shrink: 0;
}

/* About Section */
.about-section {
  padding: 6rem 1.5rem;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
  scroll-margin-top: 100px;
}

.about-heading {
  font-size: 2.25rem;
  font-weight: 800;
  color: #0B192C;
  margin-bottom: 1.25rem;
  line-height: 1.25;
}

.about-paragraph {
  color: #475569;
  font-size: 0.975rem;
  margin-bottom: 1rem;
  line-height: 1.7;
}

.about-mock-container {
  display: flex;
  justify-content: center;
}

.about-mock-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.about-mock-steps {
  display: flex;
  justify-content: space-between;
  font-size: 0.55rem;
  color: #94A3B8;
  font-weight: 600;
  margin-bottom: 12px;
  border-bottom: 1px solid #F1F5F9;
  padding-bottom: 6px;
}

.about-mock-label {
  font-size: 0.65rem;
  font-weight: 700;
  color: #0B192C;
  margin: 8px 0 4px;
}

.date-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.date-card {
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 6px 2px;
  text-align: center;
  font-size: 0.6rem;
  font-weight: 600;
  color: #64748B;
  transition: background 0.3s, color 0.3s;
}

.date-card-active {
  background: #06B6D4;
  color: white;
  border-color: #06B6D4;
}

.slot-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-bottom: 8px;
}

.slot-card {
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 6px;
  text-align: center;
  font-size: 0.55rem;
  font-weight: 600;
  color: #64748B;
  transition: background 0.3s, color 0.3s;
}

.slot-card-active {
  background: #ECFEFF;
  border-color: #06B6D4;
  color: #0891B2;
}

/* How it works */
.how-it-works-section {
  background-color: #F8FAFC;
  padding: 5rem 0;
}

.how-it-works-header {
  text-align: center;
}

.how-it-works-heading {
  font-size: 2.25rem;
  font-weight: 800;
  color: #0B192C;
  margin-bottom: 3rem;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.process-card-wrap {
  height: 100%;
}

.process-card {
  background: #FFFFFF;
  padding: 2.5rem 1.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  text-align: center;
  border: 1px solid #F1F5F9;
  height: 100%;
}

.process-card:hover {
  border-color: #A5F3FC;
  box-shadow: 0 16px 34px rgba(6, 182, 212, 0.14);
}

.process-icon-wrapper {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%);
  color: #0891B2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
}

.process-label {
  font-weight: 700;
  font-size: 1.1rem;
  color: #0B192C;
}

/* Services */
.services-section {
  padding: 6rem 1.5rem;
  text-align: center;
  scroll-margin-top: 100px;
}

.services-heading {
  font-size: 2.25rem;
  font-weight: 800;
  color: #0B192C;
  margin-bottom: 3.5rem;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr 320px 1fr;
  gap: 2rem;
  align-items: center;
}

.service-column {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.service-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #FFFFFF;
  padding: 1rem;
  border-radius: 14px;
  border: 1px solid #F1F5F9;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  text-align: left;
}

.service-row:hover {
  border-color: #A5F3FC;
  box-shadow: 0 8px 25px rgba(6, 182, 212, 0.1);
}

.service-row-right {
  flex-direction: row-reverse;
  text-align: right;
}

.service-icon-bg {
  width: 46px;
  height: 46px;
  background: #ECFEFF;
  color: #0891B2;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.service-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: #0B192C;
}

.service-price-line {
  font-size: 0.8rem;
  color: #64748B;
}

.service-price {
  font-weight: 800;
  color: #06B6D4;
  font-size: 0.9rem;
}

.services-img-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.services-img {
  width: 100%;
  height: 480px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
}

.services-img-container:hover .services-img {
  transform: scale(1.03);
}

/* Testimonials */
.testimonials-section {
  background-color: #0B192C;
  color: white;
  padding: 6rem 0;
  scroll-margin-top: 80px;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 4rem;
  align-items: center;
}

.testimonial-circle-frame {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: 6px solid #06B6D4;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(6, 182, 212, 0.3);
  margin: 0 auto;
}

.testimonial-circle-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-in-out;
}

.testimonial-avatar-thumbnails {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.thumb-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.thumb-img.active, .thumb-img:hover {
  border-color: #06B6D4;
  opacity: 1;
  transform: scale(1.15);
}

.testimonial-card-slider {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  margin-top: 1rem;
  transition: box-shadow 0.4s ease;
}

.testimonial-card-slider:hover {
  box-shadow: 0 20px 45px rgba(6, 182, 212, 0.18);
}

.stars-row {
  color: #F59E0B;
  font-size: 1.2rem;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.testimonials-heading {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.testimonial-text {
  font-size: 1.05rem;
  color: #E2E8F0;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.testimonial-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.testimonial-author {
  font-size: 1.25rem;
  font-weight: 800;
  color: #06B6D4;
}

.testimonial-role {
  font-size: 0.85rem;
  color: #94A3B8;
}

.testimonial-nav-btns {
  display: flex;
  gap: 0.75rem;
}

.testimonial-nav-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.testimonial-nav-btn:hover {
  background: #06B6D4;
}

.testimonial-dots {
  display: flex;
  gap: 8px;
  margin-top: 1.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: #06B6D4;
  width: 24px;
  border-radius: 12px;
}

/* Contact */
.contact-section {
  padding: 6rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  scroll-margin-top: 100px;
}

.contact-img-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.contact-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}

.contact-info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-info-icon-bg {
  width: 40px;
  height: 40px;
  background: #ECFEFF;
  color: #0891B2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-info-label {
  font-size: 0.75rem;
  color: #64748B;
  font-weight: 600;
}

.contact-info-val {
  font-size: 0.925rem;
  font-weight: 700;
  color: #0B192C;
}

.contact-hours {
  font-size: 0.85rem;
  font-weight: 700;
  color: #0891B2;
  margin-top: 0.25rem;
}

.contact-heading {
  font-size: 2.25rem;
  font-weight: 800;
  color: #0B192C;
  margin-bottom: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 0.9rem 1.25rem;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.95rem;
  background-color: #F8FAFC;
  outline: none;
  transition: all 0.2s;
}

.form-input:focus, .form-textarea:focus {
  border-color: #06B6D4;
  background-color: #FFFFFF;
  box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.1);
}

.btn-send-message {
  background: linear-gradient(135deg, #06B6D4 0%, #0284C7 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(6, 182, 212, 0.35);
}

/* Download CTA */
.download-cta-section {
  background: #759d9a;
  color: white;
  padding: 5rem 1.5rem;
  text-align: center;
}

.download-cta-heading {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.download-cta-subtext {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.download-cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* Footer */
.footer {
  background-color: #0B192C;
  color: #f1f4f7;
  padding: 5rem 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.footer-text {
  font-size: 0.9rem;
  line-height: 1.7;
}

.footer-title {
  color: #FFFFFF;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.footer-links-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.footer-link {
  color: #94A3B8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #38BDF8;
}

.footer-socials {
  display: flex;
  gap: 0.75rem;
}

.social-icon-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.social-icon-btn:hover {
  background: #06B6D4;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
}

/* Floating WhatsApp */
.whatsapp-float {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #25D366;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
  z-index: 1000;
  transition: transform 0.2s;
}

.whatsapp-float:hover {
  transform: scale(1.1);
}

/* Page Styles */
.page-hero {
  padding: 5rem 1.5rem 6rem;
  min-height: 60vh;
}

.page-hero-inner {
  max-width: 900px;
}

.page-heading {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0B192C;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.page-subtext {
  font-size: 1.05rem;
  color: #64748B;
  max-width: 640px;
  margin-bottom: 2.5rem;
}

.booknow-card {
  background: #FFFFFF;
  border: 1px solid #F1F5F9;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 640px;
}

.booknow-success {
  text-align: center;
  color: #0891B2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.booknow-success h3 {
  color: #0B192C;
  font-size: 1.4rem;
}

.booknow-success p {
  color: #64748B;
  margin-bottom: 0.5rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin-bottom: 3rem;
}

.faq-item {
  background: #FFFFFF;
  border: 1px solid #F1F5F9;
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.faq-item.open {
  border-color: #A5F3FC;
  box-shadow: 0 8px 25px rgba(6, 182, 212, 0.08);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 1.25rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #0B192C;
  font-family: inherit;
}

.faq-chevron {
  flex-shrink: 0;
  color: #06B6D4;
  transition: transform 0.25s ease;
}

.faq-item.open .faq-chevron {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.25rem;
  color: #64748B;
  font-size: 0.95rem;
  line-height: 1.7;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-grid, .about-section, .services-grid, .testimonials-grid, .contact-section {
    grid-template-columns: 1fr;
  }
  .services-img-container {
    display: none;
  }
  .nav-desktop, .header-actions-desktop {
    display: none;
  }
  .menu-toggle-btn {
    display: block;
  }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .contact-form-row {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal, .fade-in-up, .fade-in-down, .fade-in-scale, .fade-in-key,
  .slide-in-left, .pop-in, .nav-link-anim, .float-slow, .pulse-soft,
  .glow-pulse, .pulse-ring, .shimmer, .icon-bounce:hover {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;

/* ---------- Root Component ---------- */

export default function LaundryMachineApp() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <style>{modernStyles}</style>
        <ScrollToHashElement />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booknow" element={<BookNowPage />} />
          <Route path="/pricelist" element={<PriceListPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
        <Footer />
        <WhatsAppFloat />
      </div>
    </BrowserRouter>
  );
}