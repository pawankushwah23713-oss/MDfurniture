import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
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
} from "lucide-react";
import logo from "../assets/logo.png";

/* =========================================================
   CUSTOM CONFIGURATION
   ========================================================= */

// 1. Aapka Custom Logo (Yahan apni logo image ka link/path dalein)
const CUSTOM_LOGO_URL = logo; // Example: "https://your-website.com/logo.png"

// 2. Hero Background Slider Images
const HERO_BG_IMAGES = [
  "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1600&auto=format&fit=crop",
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
  "Home",
  "About Us",
  "Services",
  "Price List",
  "FAQ",
  "Testimonials",
  "Contact",
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

const QUICK_LINKS_1 = ["About us", "How it works", "Our Services", "Testimonials"];
const QUICK_LINKS_2 = ["Contact Us", "Privacy Policy", "Terms of Use", "App Terms & Condition"];

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

/* ---------- Header ---------- */

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-content">
        <Logo />

        <nav className="nav-desktop">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="nav-link">
              {link}
            </a>
          ))}
        </nav>

        <div className="header-actions-desktop">
          <button className="btn-book-header">Book Now</button>
        </div>

        <button className="menu-toggle-btn" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="mobile-nav-link">
              {link}
            </a>
          ))}
          <button className="btn-book-mobile">Book Now</button>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero with Sliding Background ---------- */

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
      {/* Background Image Carousel */}
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
          <h1 className="hero-heading">
            FRESHFOLD LAUNDRY SERVICE
          </h1>
          <p className="hero-subtext">
            We are professionals in the laundry and dry cleaning business, we
            always stay up to date on the latest technologies and solutions.
          </p>
          <div className="hero-buttons">
            <button className="store-btn">
              <span className="store-btn-text-sm">
                GET IT ON
                <br />
                <span className="store-btn-text-lg">Google Play</span>
              </span>
            </button>
            <button className="store-btn">
              <span className="store-btn-text-sm">
                Available on the
                <br />
                <span className="store-btn-text-lg">App Store</span>
              </span>
            </button>
            <button className="hero-cta-btn">Click Here — Book Now</button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 2 }}>
          <PhoneMock>
            <div className="hero-mock-header">The Freshfold</div>
            <div className="hero-mock-banner" />
            <div className="hero-mock-content">
              <p className="hero-mock-title">Select Services</p>
              <div className="hero-mock-services-grid">
                {["Wash & Fold", "Wash & Iron", "Premium Laundry", "Dry Clean"].map(
                  (s) => (
                    <div key={s} className="hero-mock-service-card">
                      {s}
                    </div>
                  )
                )}
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
    <section className="container about-section">
      <div>
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
      </div>

      <div className="about-mock-container">
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
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */

function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <div className="container how-it-works-header">
        <SectionEyebrow>Our Process</SectionEyebrow>
        <h2 className="how-it-works-heading">How it Works</h2>
        <div className="process-grid">
          {PROCESS_STEPS.map(({ icon: Icon, label }) => (
            <div key={label} className="process-card">
              <div className="process-icon-wrapper">
                <Icon size={30} />
              </div>
              <p className="process-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

function ServiceRow({ icon: Icon, name, price, unit, align }) {
  return (
    <div className={`service-row ${align === "right" ? "service-row-right" : ""}`}>
      <div className="service-icon-bg">
        <Icon size={22} />
      </div>
      <div>
        <p className="service-name">{name}</p>
        <p className="service-price-line">
          <span className="service-price">{price}</span> + tax{" "}
          <span className="service-unit">{unit}</span>
        </p>
      </div>
    </div>
  );
}

function Services() {
  const left = SERVICES.filter((_, i) => i % 2 === 0);
  const right = SERVICES.filter((_, i) => i % 2 === 1);
  return (
    <section className="container services-section">
      <SectionEyebrow>Our Services</SectionEyebrow>
      <h2 className="services-heading">
        Professional laundry &amp; dry cleaning Services
      </h2>
      <div className="services-grid">
        <div className="service-column">
          {left.map((s) => (
            <ServiceRow key={s.name} {...s} />
          ))}
        </div>
        <div className="services-img-container">
          <img
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=800&auto=format&fit=crop"
            alt="Folded clean clothes on shelf"
            className="services-img"
          />
        </div>
        <div className="service-column">
          {right.map((s) => (
            <ServiceRow key={s.name} {...s} align="right" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials Slider with Dynamic Changing Images ---------- */

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
    <section className="testimonials-section">
      <div className="container testimonials-grid">
        {/* Dynamic Image Column */}
        <div className="testimonial-left-col">
          <div className="testimonial-circle-frame">
            <img key={current.image} src={current.image} alt={current.name} />
          </div>

          {/* Interactive Thumbnails Grid */}
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
        </div>

        {/* Sliding Content Card */}
        <div className="testimonial-right-col">
          <SectionEyebrow>Testimonials</SectionEyebrow>
          <h2 className="testimonials-heading">What Our Clients Are Saying</h2>

          <div className="testimonial-card-slider">
            <div className="stars-row">
              {"★".repeat(current.stars)}
              {"☆".repeat(5 - current.stars)}
            </div>
            <p className="testimonial-text">{current.text}</p>
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
                  className="testimonial-nav-btn"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setActive((a) => (a + 1) % TESTIMONIALS.length)}
                  className="testimonial-nav-btn"
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
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  return (
    <section className="container contact-section">
      <div>
        <div className="contact-img-grid">
          <img
            src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=600&auto=format&fit=crop"
            alt="Modern high tech washing machines"
            className="contact-img"
          />
          <img
            src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=600&auto=format&fit=crop"
            alt="Neatly pressed dry cleaned shirts"
            className="contact-img"
          />
        </div>

        <div className="contact-info-list">
          {[
            { icon: MapPin, label: "Head Office Address", value: "Jhotwara, Jaipur, (Raj) 302012" },
            { icon: MapPin, label: "Operational Office Address", value: "Gurgaon (H.R.) 122003" },
            { icon: Mail, label: "Email", value: "care@thelaundrymachine.in" },
            { icon: Phone, label: "Customer Care Number", value: "78782-95542" },
            { icon: MessageCircle, label: "Whatsapp", value: "78782-95542" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="contact-info-item">
              <div className="contact-info-icon-bg">
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
      </div>

      <div>
        <SectionEyebrow>Contact Us Now</SectionEyebrow>
        <h2 className="contact-heading">Write a Message</h2>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="contact-form-row">
            <input type="text" placeholder="Name" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
          </div>
          <input type="text" placeholder="Mobile Number" className="form-input" />
          <textarea placeholder="Message" rows={5} className="form-textarea" />
          <button type="submit" className="btn-send-message">
            Send Message <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------- Download CTA ---------- */

function DownloadCTA() {
  return (
    <section className="download-cta-section">
      <h2 className="download-cta-heading">
        Download our App Today &amp; Experience Endless Possibilities
      </h2>
      <p className="download-cta-subtext">
        Our never ending streak of delivering customer satisfaction is what
        passionate us to keeping moving forward.
      </p>
      <div className="download-cta-buttons">
        <button className="store-btn">
          <span className="store-btn-text-sm">
            GET IT ON
            <br />
            <span className="store-btn-text-lg">Google Play</span>
          </span>
        </button>
        <button className="store-btn">
          <span className="store-btn-text-sm">
            Available on the
            <br />
            <span className="store-btn-text-lg">App Store</span>
          </span>
        </button>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <Logo />
          </div>
          <p className="footer-text">
            The Freshfold Provide Premium &amp; Affordable Washing,
            Ironing &amp; dry cleaning Services leveraging web &amp; mobile
            based technology.
          </p>
        </div>

        <div>
          <h3 className="footer-title">Quick Links</h3>
          <div className="footer-links-grid">
            {[...QUICK_LINKS_1, ...QUICK_LINKS_2].map((l) => (
              <a key={l} href="#" className="footer-link">
                {l}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="footer-title">Social Links</h3>
          <div className="footer-socials">
            {[Facebook, Twitter, Instagram, MessageCircle, MessageCircle].map(
              (Icon, i) => (
                <div key={i} className="social-icon-btn">
                  <Icon size={18} />
                </div>
              )
            )}
          </div>
        </div>
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
      className="whatsapp-float"
    >
      <MessageCircle size={28} />
    </a>
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
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(6, 182, 212, 0.35);
  transition: transform 0.2s;
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
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 700;
}

/* Hero Section Sliding Bg */
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
  border: none;
  font-weight: 700;
  padding: 0.9rem 1.75rem;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(6, 182, 212, 0.4);
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

.hero-mock-header {
  font-weight: 800;
  font-size: 0.85rem;
  text-align: center;
  color: #0B192C;
  margin-bottom: 8px;
}

.hero-mock-banner {
  height: 70px;
  background: linear-gradient(135deg, #06B6D4, #0284C7);
  border-radius: 12px;
  margin-bottom: 12px;
}

.hero-mock-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748B;
  margin-bottom: 8px;
}

.hero-mock-services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-bottom: 12px;
}

.hero-mock-service-card {
  background: #F1F5F9;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 8px 6px;
  border-radius: 8px;
  text-align: center;
  color: #1E293B;
}

.hero-mock-proceed-btn {
  width: 100%;
  background: #06B6D4;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 700;
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
}

/* About Section */
.about-section {
  padding: 6rem 1.5rem;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
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

.process-card {
  background: #FFFFFF;
  padding: 2.5rem 1.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  text-align: center;
  border: 1px solid #F1F5F9;
  transition: transform 0.3s;
}

.process-card:hover {
  transform: translateY(-8px);
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
  transition: all 0.2s;
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
}

/* Testimonials Slide Section */
.testimonials-section {
  background-color: #0B192C;
  color: white;
  padding: 6rem 0;
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
  transition: transform 0.2s;
}

.btn-send-message:hover {
  transform: translateY(-2px);
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
}
`;

/* ---------- Root Component ---------- */

export default function LaundryMachineApp() {
  return (
    <div className="app-container">
      <style>{modernStyles}</style>
      <Header />
      <Hero />
      <About />
      <HowItWorks />
      <Services />
      <Testimonials />
      <Contact />
      <DownloadCTA />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}