import { useState, useRef, useEffect } from "react";

// ─── LOGO ───
const LOGO = "data:image/png;base64,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";

// ─── TOKENS ───
const c = {
  bg: "#0a0a0a",
  panel: "#101010",
  panelHover: "#171717",
  white: "#f5f5f3",
  grey: "#9a9a94",
  greyDim: "#4a4a46",
  purple: "#8b5cf6",
  purpleSoft: "rgba(139,92,246,0.14)",
  border: "rgba(245,245,243,0.09)",
};

const display = "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const body = "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const mono = "'Geist Mono', ui-monospace, 'SF Mono', monospace";

// ─── GLOBAL CSS ───
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; }
    ::selection { background: ${c.purple}; color: #fff; }

    @keyframes wordUp {
      0% { opacity: 0; transform: translateY(110%) rotate(2deg); }
      100% { opacity: 1; transform: translateY(0) rotate(0deg); }
    }
    @keyframes fadeUp {
      0% { opacity: 0; transform: translateY(24px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
    @keyframes lineDraw {
      0% { transform: scaleY(0); transform-origin: top; }
      45% { transform: scaleY(1); transform-origin: top; }
      55% { transform: scaleY(1); transform-origin: bottom; }
      100% { transform: scaleY(0); transform-origin: bottom; }
    }

    .link-slide { position: relative; }
    .link-slide::after {
      content: ''; position: absolute; left: 0; bottom: -3px;
      width: 100%; height: 1px; background: ${c.white};
      transform: scaleX(0); transform-origin: right;
      transition: transform 0.4s cubic-bezier(0.6,0,0.2,1);
    }
    .link-slide:hover::after { transform: scaleX(1); transform-origin: left; }

    .btn-fill { position: relative; overflow: hidden; z-index: 1; }
    .btn-fill::before {
      content: ''; position: absolute; inset: 0; z-index: -1;
      background: ${c.purple};
      transform: translateY(101%);
      transition: transform 0.45s cubic-bezier(0.6,0,0.2,1);
      border-radius: inherit;
    }
    .btn-fill:hover::before { transform: translateY(0); }
    .btn-fill-light:hover { color: ${c.white} !important; }

    .hamburger { display: none; }
    .svc-item { transition: background 0.3s, padding-left 0.4s cubic-bezier(0.2,0.7,0.2,1); }
    .svc-item:hover { background: rgba(245,245,243,0.02); padding-left: 14px; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }

    /* ── MOBILE RESPONSIVE OVERRIDES ── */
    @media (max-width: 768px) {
      .nav-links { display: none !important; }
      .hamburger { display: flex !important; }
      .nav-cta-mobile { padding: 9px 18px !important; font-size: 12.5px !important; }
      .hero-corner { display: none !important; }
      .hero-rule { display: none !important; }
      .section-pad { padding-top: 72px !important; padding-bottom: 72px !important; }
      .section-pad-lg { padding-top: 88px !important; padding-bottom: 88px !important; }
      .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      .faq-sticky { position: static !important; top: auto !important; }
      .cap-row-grid { grid-template-columns: 1fr auto !important; padding: 26px 4px !important; }
      .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
      .testi-grid { grid-template-columns: 1fr !important; }
      .email-row { flex-direction: column !important; }
      .email-input { border-radius: 99px !important; border-right: 1px solid rgba(245,245,243,0.09) !important; width: 100% !important; box-sizing: border-box !important; flex: none !important; padding: 13px 22px !important; font-size: 14px !important; }
      .email-btn { border-radius: 99px !important; margin-top: 10px; width: 100% !important; box-sizing: border-box !important; flex: none !important; padding: 13px 22px !important; font-size: 14px !important; }
    }

    @media (max-width: 480px) {
      .hero-eyebrow-hide { font-size: 10px !important; }
    }
  `}</style>
);

// ─── HERO WORD REVEAL ───
function WordReveal({ text, baseDelay = 0, style }) {
  return (
    <span style={{ display: "inline" }}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <span style={{
            display: "inline-block",
            animation: `wordUp 1.3s cubic-bezier(0.2,0.8,0.2,1) ${baseDelay + i * 0.11}s both`,
            ...style,
          }}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}

// ─── SCROLL REVEAL ───
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.9s cubic-bezier(0.2,0.7,0.2,1) ${delay}s, transform 0.9s cubic-bezier(0.2,0.7,0.2,1) ${delay}s`,
      pointerEvents: "all",
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
}

// Cal.com inline embed, dark themed
function CalEmbed() {
  useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal; let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {}; cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1]; api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    window.Cal("init", "strategy", { origin: "https://app.cal.com" });
    window.Cal.config = window.Cal.config || {};
    window.Cal.config.forwardQueryParams = true;
    window.Cal.ns.strategy("inline", {
      elementOrSelector: "#cal-inline-strategy",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "dark" },
      calLink: "brian-kan/strategy",
    });
    window.Cal.ns.strategy("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
  }, []);

  return (
    <div style={{
      maxWidth: 900, margin: "0 auto",
      border: `1px solid ${c.border}`, borderRadius: 12,
      overflow: "hidden", background: "#0a0a0a",
    }}>
      <div id="cal-inline-strategy" style={{ width: "100%", minHeight: 700, overflow: "auto" }} />
    </div>
  );
}

// scroll-driven phase block for the services page
function PhaseBlock({ svc, index }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.6)));
      setProgress(p);
      setVisible(r.top < vh * 0.72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ease = "cubic-bezier(0.2, 0.7, 0.2, 1)";

  return (
    <div ref={ref} style={{ position: "relative", padding: "110px 0 120px", borderTop: `1px solid ${c.border}`, overflow: "hidden" }}>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56 }}>
        {/* left: phase intro */}
        <div>
          <span style={{
            fontFamily: mono, fontSize: 12, color: c.purple, letterSpacing: 3,
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.7s ${ease}, transform 0.7s ${ease}`,
          }}>
            PHASE {svc.n}
          </span>
          <h3 style={{
            fontFamily: display, fontSize: "clamp(44px, 7vw, 76px)",
            fontWeight: 500, letterSpacing: -2, margin: "14px 0 6px", lineHeight: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: `opacity 0.8s ${ease} 0.06s, transform 0.8s ${ease} 0.06s`,
          }}>
            {svc.title}
          </h3>
          <p style={{
            fontFamily: display, fontSize: 18, color: c.purple,
            fontWeight: 500, margin: "0 0 26px", letterSpacing: -0.2,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.8s ${ease} 0.12s, transform 0.8s ${ease} 0.12s`,
          }}>
            {svc.tagline}
          </p>

          {/* progress hairline */}
          <div style={{ width: 180, height: 1, background: c.border, marginBottom: 26, overflow: "hidden" }}>
            <div style={{
              height: "100%", background: c.purple,
              width: `${Math.round(progress * 100)}%`,
              transition: "width 0.15s linear",
            }} />
          </div>

          <p style={{
            color: c.grey, fontSize: 15.5, lineHeight: 1.85, margin: 0, maxWidth: 440,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transition: `opacity 0.8s ${ease} 0.18s, transform 0.8s ${ease} 0.18s`,
          }}>
            {svc.para}
          </p>
        </div>

        {/* right: deliverables */}
        <div style={{ alignSelf: "end" }}>
          <span style={{
            fontFamily: mono, fontSize: 11, color: c.greyDim,
            letterSpacing: 2.5, textTransform: "uppercase",
            display: "block", marginBottom: 6,
            opacity: visible ? 1 : 0,
            transition: `opacity 0.7s ${ease} 0.2s`,
          }}>
            What we do
          </span>
          {svc.items.map((item, ii) => (
            <div key={ii} className="svc-item" style={{
              display: "flex", alignItems: "baseline", gap: 16,
              padding: "19px 0",
              borderBottom: ii < svc.items.length - 1 ? `1px solid ${c.border}` : "none",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transition: `opacity 0.7s ${ease} ${0.24 + ii * 0.09}s, transform 0.7s ${ease} ${0.24 + ii * 0.09}s, background 0.3s, padding-left 0.4s ${ease}`,
            }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: c.purple, flexShrink: 0 }}>
                {String(ii + 1).padStart(2, "0")}
              </span>
              <span style={{ color: "rgba(245,245,243,0.85)", fontSize: 15, lineHeight: 1.6 }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCROLL-LIT STATEMENT ───
// Lines are fully hidden until scrolled to. Each fades in as it rises from
// the lower third of the viewport, peaks at center, then dims once passed.
function LitStatement({ children }) {
  const ref = useRef(null);
  const [state, setState] = useState({ opacity: 0, y: 40 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const mid = rect.top + rect.height / 2;

      // Position of line center as fraction of viewport height (0 = top, 1 = bottom)
      const pos = mid / vh;

      let opacity, y;
      if (pos > 0.88) {
        // Below the reveal threshold — completely hidden
        opacity = 0;
        y = 44;
      } else if (pos > 0.5) {
        // Rising from lower third toward center — fade in
        const t = (0.88 - pos) / 0.38; // 0 → 1
        opacity = t;
        y = (1 - t) * 44;
      } else if (pos > 0.12) {
        // At / above center — fully lit, gently dim as it moves up
        const t = (pos - 0.12) / 0.38; // 1 at center → 0 near top
        opacity = 0.3 + t * 0.7;
        y = 0;
      } else {
        // Near top of viewport — resting dim
        opacity = 0.3;
        y = 0;
      }
      setState({ opacity, y });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p
      ref={ref}
      style={{
        fontFamily: display,
        fontSize: "clamp(24px, 4.5vw, 44px)",
        fontWeight: 500,
        lineHeight: 1.3,
        letterSpacing: -0.8,
        margin: "0 0 26vh",
        color: c.white,
        opacity: state.opacity,
        transform: `translateY(${state.y}px)`,
        transition: "opacity 0.25s cubic-bezier(0.2,0.7,0.2,1), transform 0.25s cubic-bezier(0.2,0.7,0.2,1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </p>
  );
}

// ─── MAIN ───
function HomePage({ navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const encode = (data) =>
    Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");

  const submitEmail = async () => {
    if (!email.includes("@") || submitting) return;
    setSubmitting(true);
    setError(false);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", email }),
      });
      setSent(true);
    } catch (err) {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const go = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (id === "services") { navigate("/services"); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const [openCap, setOpenCap] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const capabilities = [
    { title: "Document Chasing & Collection", desc: "Every file stalls on missing documents. We chase, collect and organise client paperwork automatically, following up politely and persistently until everything is in." },
    { title: "Lead Response & Qualification", desc: "Every enquiry answered in under a minute, qualified against your criteria, and booked straight into your calendar. No lead waits, no lead slips." },
    { title: "Client Communication & Follow-up", desc: "Follow-ups, reminders and status updates that go out on time, every time, across WhatsApp and email, trained on your tone and protocols." },
    { title: "Admin & Data Operations", desc: "Data entry and reporting handled automatically, so your team stops re-keying information between CRM, calendar and inbox." },
  ];

  const testimonials = [
    {
      name: "Ryan",
      role: "Real Estate Agency",
      text: "We were losing deals purely from slow replies. Now every lead gets qualified and booked within minutes of coming in. My team gets back around 15 hours a week, and our show-up rate went from roughly 60% to over 80%.",
    },
    {
      name: "Mario",
      role: "Insurance Firm",
      text: "Quote follow-ups used to take my producers two or three days, and half of them never happened. The system now follows up within five minutes and keeps chasing politely until there is an answer. We bound about 20% more policies last quarter.",
    },
    {
      name: "Nicole",
      role: "Recruitment Firm",
      text: "We screen close to 300 applications a week. What used to take two consultants their entire morning now lands as a ranked shortlist by 9am. Our time-to-submit dropped from three days to same day.",
    },
  ];

  const faqs = [
    { q: "Do I need to migrate away from my current software?", a: "Not at all. We build our AI systems to wrap around your existing stack, including your CRM, calendar and WhatsApp, so you don't have to learn a new tool or migrate any data." },
    { q: "How long does it take to deploy?", a: "Typical timeline from workflow audit to full deployment is 2–3 weeks, depending on complexity." },
    { q: "What if the AI gives the wrong answer?", a: "We strictly guardrail our AI using your specific business logic. It only answers what it's explicitly trained on and escalates complex issues to your team." },
    { q: "Is it compliant with data protection laws?", a: "Absolutely. Built with strict data privacy in mind. We comply with PDPA and ensure sensitive client information is handled securely." },
    { q: "Do I have to pay per-message or per-user fees?", a: "No. Transparent, predictable pricing based on the system build and maintenance, regardless of how many leads you capture." },
  ];

  return (
    <div style={{ background: c.bg, color: c.white, fontFamily: body, minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyle />

      {/* film grain */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 300, pointerEvents: "none",
        opacity: 0.028, mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "14px 28px" : "24px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: `1px solid ${scrolled ? c.border : "transparent"}`,
        transition: "all 0.5s cubic-bezier(0.2,0.7,0.2,1)",
      }}>
        {/* scroll progress */}
        <div style={{
          position: "absolute", bottom: -1, left: 0, height: 2,
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${c.purple}, rgba(139,92,246,0.5))`,
          transition: "width 0.1s linear",
          opacity: scrolled ? 1 : 0,
        }} />
        <span style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={LOGO} alt="Rizeon AI" style={{ height: 24, width: "auto", display: "block" }} />
          <span style={{ fontFamily: display, fontSize: 15, fontWeight: 600, letterSpacing: 2.5 }}>RIZEON AI</span>
        </span>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <a href="/services" onClick={go("services")} className="link-slide" style={{ color: c.grey, fontSize: 13, textDecoration: "none", fontWeight: 500, cursor: "pointer" }}>Services</a>
          <a href="#contact" onClick={go("contact")} className="btn-fill btn-fill-light nav-cta-mobile" style={{
            color: c.bg, background: c.white, textDecoration: "none",
            fontFamily: display, fontSize: 13, fontWeight: 600,
            padding: "11px 24px", borderRadius: 99, cursor: "pointer",
            whiteSpace: "nowrap",
          }}>
            Get in touch
          </a>
        </div>

        {/* hamburger — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            background: "none", border: "none", cursor: "pointer",
            flexDirection: "column", justifyContent: "center", gap: 5,
            padding: 8, marginLeft: 8,
          }}
        >
          <span style={{
            display: "block", width: 22, height: 1.5, background: c.white,
            transform: menuOpen ? "translateY(3.25px) rotate(45deg)" : "none",
            transition: "transform 0.35s cubic-bezier(0.2,0.7,0.2,1)",
          }} />
          <span style={{
            display: "block", width: 22, height: 1.5, background: c.white,
            transform: menuOpen ? "translateY(-3.25px) rotate(-45deg)" : "none",
            transition: "transform 0.35s cubic-bezier(0.2,0.7,0.2,1)",
          }} />
        </button>
      </nav>

      {/* mobile menu panel */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 99,
        paddingTop: 76,
        background: "rgba(10,10,10,0.97)",
        backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${c.border}`,
        transform: menuOpen ? "translateY(0)" : "translateY(-105%)",
        transition: "transform 0.5s cubic-bezier(0.2,0.7,0.2,1)",
      }}>
        <div style={{ padding: "12px 28px 32px", display: "flex", flexDirection: "column" }}>
          {[
            ["Services", "services"],
            ["Get in touch", "contact"],
          ].map(([label, id], i) => (
            <a key={id} href={"#" + id} onClick={go(id)} style={{
              fontFamily: display, fontSize: 26, fontWeight: 500,
              color: c.white, textDecoration: "none",
              padding: "16px 0",
              borderBottom: i < 1 ? `1px solid ${c.border}` : "none",
              letterSpacing: -0.5,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.4s ease ${0.1 + i * 0.06}s, transform 0.4s ease ${0.1 + i * 0.06}s`,
            }}>
              {label}
              <span style={{ color: c.purple, marginLeft: 8, fontSize: 20 }}>→</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        padding: "130px 20px 64px",
        maxWidth: 1280, margin: "0 auto", width: "100%",
        position: "relative",
        textAlign: "center",
      }}>
        {/* hairline vertical rules — architectural detail */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 28, width: 1,
          background: "rgba(245,245,243,0.05)", pointerEvents: "none",
        }} className="hero-rule" />
        <div style={{
          position: "absolute", top: 0, bottom: 0, right: 28, width: 1,
          background: "rgba(245,245,243,0.05)", pointerEvents: "none",
        }} className="hero-rule" />

        <h1 style={{
          fontFamily: display,
          fontSize: "clamp(44px, 9vw, 108px)",
          fontWeight: 400, lineHeight: 1.0, letterSpacing: -3.2,
          margin: "0 0 52px", maxWidth: 1080,
          position: "relative",
          color: c.white,
        }}>
          <WordReveal text="We don't just build AI." baseDelay={0.3} />
          <br />
          <span>
            {"We transform operations.".split(" ").map((word, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span style={{
                  display: "inline-block",
                  fontWeight: 500,
                  animation: `wordUp 1.3s cubic-bezier(0.2,0.8,0.2,1) ${0.85 + i * 0.14}s both`,
                }}>{word}&nbsp;</span>
              </span>
            ))}
          </span>
        </h1>

        <p style={{
          fontSize: "clamp(15px, 2.2vw, 17px)", color: c.grey, lineHeight: 1.85,
          maxWidth: 480, margin: "0 auto 64px",
          animation: "fadeUp 1.2s cubic-bezier(0.2,0.8,0.2,1) 1.6s both",
          position: "relative",
          fontWeight: 400,
        }}>
          We uncover the inefficiencies slowing your business down and build AI infrastructure around how you actually work, without new tools or replatforming.
        </p>

        <div style={{
          animation: "fadeUp 1.2s cubic-bezier(0.2,0.8,0.2,1) 1.9s both",
          position: "relative",
        }}>
          <a href="#contact" onClick={go("contact")} className="btn-fill btn-fill-light" style={{
            background: c.white, color: c.bg,
            fontFamily: display, padding: "18px 52px", borderRadius: 99,
            fontSize: 15, fontWeight: 500, letterSpacing: 0.2,
            textDecoration: "none", display: "inline-block", cursor: "pointer",
          }}>
            Get in touch
          </a>
        </div>

        {/* corner metadata — bottom left */}
        <div className="hero-corner" style={{
          position: "absolute", bottom: 40, left: 52,
          fontFamily: mono, fontSize: 10.5, color: c.greyDim, letterSpacing: 2.5,
          textTransform: "uppercase", textAlign: "left", lineHeight: 2,
          animation: "fadeUp 1.2s cubic-bezier(0.2,0.8,0.2,1) 2.2s both",
        }}>
          Est. 2025<br />Singapore
        </div>

        {/* corner metadata — bottom right */}
        <div className="hero-corner" style={{
          position: "absolute", bottom: 40, right: 52,
          fontFamily: mono, fontSize: 10.5, color: c.greyDim, letterSpacing: 2.5,
          textTransform: "uppercase", textAlign: "right", lineHeight: 2,
          animation: "fadeUp 1.2s cubic-bezier(0.2,0.8,0.2,1) 2.2s both",
        }}>
          AI Infrastructure<br />For Operations
        </div>

        {/* drawn-line scroll cue */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          width: 1, height: 48, overflow: "hidden",
          animation: "fadeUp 1.2s cubic-bezier(0.2,0.8,0.2,1) 2.4s both",
        }}>
          <div style={{
            width: "100%", height: "100%",
            background: "rgba(245,245,243,0.35)",
            animation: "lineDraw 2.6s cubic-bezier(0.6,0,0.4,1) 2.8s infinite",
          }} />
        </div>
      </section>

      {/* ── PROBLEM NARRATIVE ── */}
      <section className="section-pad-lg" style={{ padding: "30vh 28px 20vh", maxWidth: 880, margin: "0 auto" }}>
        <span style={{ fontFamily: mono, fontSize: 12, color: c.purple, letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: "18vh", fontWeight: 500 }}>
          01 — The problem
        </span>
        <LitStatement>You invested in AI to improve efficiency and accelerate growth.</LitStatement>
        <LitStatement>Months later, the tools are underused, your team isn't adopting them, and the expected ROI never arrived.</LitStatement>
        <LitStatement>This is where most AI initiatives lose momentum.</LitStatement>
        <LitStatement>Not because of the technology, but because AI was never <span style={{ color: c.purple }}>embedded into the way the business operates.</span></LitStatement>
      </section>

      {/* ── CAPABILITIES ── */}
      <section id="capabilities" className="section-pad" style={{ borderTop: `1px solid ${c.border}`, padding: "130px 28px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: mono, fontSize: 12, color: c.purple, letterSpacing: 3, textTransform: "uppercase", fontWeight: 500 }}>02 — What we build</span>
            <h2 style={{ fontFamily: display, fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 500, letterSpacing: -1.8, margin: "22px 0 20px", lineHeight: 1.05, maxWidth: 700 }}>
              AI infrastructure, built around your business.
            </h2>
            <p style={{ color: c.grey, fontSize: 16, lineHeight: 1.75, maxWidth: 520, margin: "0 0 72px" }}>
              Not off-the-shelf software. We architect systems around your specific workflows, protocols, and bottlenecks.
            </p>
          </Reveal>

          <div>
            {capabilities.map((cap, i) => {
              const open = openCap === i;
              return (
                <Reveal key={cap.title} delay={i * 0.08}>
                  <div
                    onClick={() => setOpenCap(open ? null : i)}
                    style={{
                      borderTop: `1px solid ${c.border}`,
                      borderBottom: i === capabilities.length - 1 ? `1px solid ${c.border}` : "none",
                      cursor: "pointer",
                      background: open ? "rgba(139,92,246,0.03)" : "transparent",
                      transition: "background 0.4s",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = "rgba(245,245,243,0.02)"; }}
                    onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = "transparent"; }}
                  >
                    {/* Header row */}
                    <div className="cap-row-grid" style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: 24, alignItems: "center",
                      padding: "38px 8px",
                    }}>
                      <h3 style={{
                        fontFamily: display,
                        fontSize: open ? "clamp(26px, 4vw, 40px)" : "clamp(20px, 3vw, 30px)",
                        fontWeight: 600, margin: 0, letterSpacing: -0.5,
                        color: open ? c.white : "rgba(245,245,243,0.65)",
                        transition: "font-size 0.45s cubic-bezier(0.2,0.7,0.2,1), color 0.4s",
                      }}>
                        {cap.title}
                      </h3>
                      <span style={{
                        fontFamily: display, fontSize: 26, fontWeight: 300,
                        color: c.purple, display: "flex", alignItems: "center",
                        transform: open ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.4s cubic-bezier(0.2,0.7,0.2,1)",
                        flexShrink: 0,
                      }}>+</span>
                    </div>
                    {/* Expanded content */}
                    <div style={{
                      maxHeight: open ? 300 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.55s cubic-bezier(0.2,0.7,0.2,1)",
                    }}>
                      <div style={{ padding: "0 8px 44px", maxWidth: 680 }}>
                        <p style={{ color: c.grey, fontSize: 15.5, lineHeight: 1.85, margin: "0 0 24px" }}>
                          {cap.desc}
                        </p>
                        <span style={{ color: c.purple, fontSize: 13, fontFamily: mono, letterSpacing: 1 }}>
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (static grid) ── */}
      <section className="section-pad" style={{ borderTop: `1px solid ${c.border}`, padding: "130px 28px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: mono, fontSize: 12, color: c.purple, letterSpacing: 3, textTransform: "uppercase", fontWeight: 500 }}>03 — Clients</span>
            <h2 style={{ fontFamily: display, fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 500, letterSpacing: -1.8, margin: "22px 0 72px", lineHeight: 1.05 }}>
              What clients<br />are saying.
            </h2>
          </Reveal>
          <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 20 }}>
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div style={{
                  background: c.panel,
                  border: `1px solid ${c.border}`, borderRadius: 10,
                  padding: "38px 32px 32px",
                  height: "100%", boxSizing: "border-box",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  transition: "border-color 0.4s, transform 0.4s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,245,243,0.25)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div>
                    <span style={{ fontFamily: display, fontSize: 40, lineHeight: 0.5, color: c.purple, display: "block", marginBottom: 22 }}>"</span>
                    <p style={{ fontFamily: body, color: "rgba(245,245,243,0.82)", fontSize: 15, lineHeight: 1.8, margin: "0 0 30px" }}>
                      {t.text}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${c.border}`, paddingTop: 22 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "rgba(245,245,243,0.05)", border: `1px solid rgba(245,245,243,0.15)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: display, fontSize: 12, fontWeight: 500, color: c.grey,
                    }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div style={{ fontFamily: display, fontSize: 13.5, fontWeight: 600, color: c.white }}>{t.name}</div>
                      <div style={{ fontFamily: body, fontSize: 12, color: c.grey }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            {/* placeholder: next client */}
            <Reveal delay={0.24}>
              <div
                onClick={go("contact")}
                style={{
                  border: `1px dashed rgba(245,245,243,0.18)`, borderRadius: 10,
                  padding: "38px 32px 32px",
                  height: "100%", boxSizing: "border-box",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", textAlign: "center",
                  cursor: "pointer", gap: 14,
                  transition: "border-color 0.4s, transform 0.4s, background 0.4s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.background = "rgba(139,92,246,0.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,245,243,0.18)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontFamily: mono, fontSize: 11, color: c.greyDim, letterSpacing: 2.5, textTransform: "uppercase" }}>
                  Reserved
                </span>
                <p style={{ fontFamily: display, fontSize: 20, fontWeight: 500, color: c.white, margin: 0, letterSpacing: -0.4, lineHeight: 1.35 }}>
                  This space is waiting<br />for your firm.
                </p>
                <span style={{ fontFamily: display, fontSize: 13.5, fontWeight: 500, color: c.purple }}>
                  Start with an audit →
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section-pad" style={{ borderTop: `1px solid ${c.border}`, padding: "130px 28px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
          <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }}>
            <Reveal>
              <div className="faq-sticky" style={{ position: "sticky", top: 120 }}>
                <span style={{ fontFamily: mono, fontSize: 12, color: c.purple, letterSpacing: 3, textTransform: "uppercase", fontWeight: 500 }}>04 — FAQ</span>
                <h2 style={{ fontFamily: display, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, letterSpacing: -1.5, margin: "22px 0 20px", lineHeight: 1.05 }}>
                  Questions,<br />answered.
                </h2>
                <p style={{ color: c.grey, fontSize: 15, lineHeight: 1.7, maxWidth: 320 }}>
                  Anything else? Reach out and we'll get back to you within the day.
                </p>
              </div>
            </Reveal>
            <div>
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <Reveal key={i} delay={i * 0.05}>
                    <div style={{ borderBottom: `1px solid ${c.border}` }}>
                      <button
                        onClick={() => setOpenFaq(open ? null : i)}
                        style={{
                          width: "100%", padding: "26px 0", background: "none", border: "none",
                          color: open ? c.white : "rgba(245,245,243,0.7)",
                          fontFamily: display, fontSize: 17, fontWeight: 500, textAlign: "left",
                          cursor: "pointer", display: "flex", justifyContent: "space-between",
                          alignItems: "center", gap: 16, letterSpacing: -0.2,
                          transition: "color 0.3s",
                        }}
                        onMouseEnter={(e) => { if (!open) e.currentTarget.style.color = c.white; }}
                        onMouseLeave={(e) => { if (!open) e.currentTarget.style.color = "rgba(245,245,243,0.7)"; }}
                      >
                        {f.q}
                        <span style={{
                          color: c.purple, fontSize: 24, fontWeight: 300, flexShrink: 0,
                          transform: open ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform 0.4s cubic-bezier(0.2,0.7,0.2,1)",
                        }}>+</span>
                      </button>
                      <div style={{
                        maxHeight: open ? 240 : 0, overflow: "hidden",
                        transition: "max-height 0.5s cubic-bezier(0.2,0.7,0.2,1)",
                      }}>
                        <p style={{ padding: "0 0 26px", margin: 0, color: c.grey, fontSize: 14.5, lineHeight: 1.8 }}>
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section id="contact" style={{
        borderTop: `1px solid ${c.border}`,
        padding: "180px 28px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }} className="section-pad-lg">
        <div style={{
          position: "absolute", bottom: "-45%", left: "50%", transform: "translateX(-50%)",
          width: 800, height: 800, borderRadius: "50%",
          background: `radial-gradient(circle, ${c.purpleSoft} 0%, transparent 60%)`,
          pointerEvents: "none",
        }} />
        <Reveal>
          <h2 style={{
            fontFamily: display,
            fontSize: "clamp(42px, 9vw, 96px)", fontWeight: 400,
            letterSpacing: -2.5, margin: "0 0 30px", lineHeight: 1.02, position: "relative",
          }}>
            Your business,<br />
            running <span style={{ color: c.purple }}>without you.</span>
          </h2>
          <p style={{ color: c.grey, fontSize: 17, margin: "0 auto 52px", maxWidth: 460, lineHeight: 1.75, position: "relative" }}>
            A 30-minute audit call to map where your operation is losing time and revenue. No commitment, no pitch.
          </p>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
            <a
              href="/audit"
              onClick={(e) => { e.preventDefault(); navigate("/audit"); }}
              className="btn-fill btn-fill-light"
              style={{
                display: "inline-block",
                background: c.white, color: c.bg, textDecoration: "none",
                fontFamily: display, padding: "19px 46px",
                borderRadius: 99, fontSize: 16, fontWeight: 500,
                cursor: "pointer", letterSpacing: -0.2,
              }}
            >
              Book your audit call
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${c.border}` }}>
        <div className="footer-grid" style={{
          maxWidth: 1160, margin: "0 auto",
          padding: "72px 28px 56px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 48,
        }}>
          <div>
            <span style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <img src={LOGO} alt="Rizeon AI" style={{ height: 22, width: "auto", display: "block" }} />
              <span style={{ fontFamily: display, fontSize: 14, fontWeight: 600, letterSpacing: 2.5 }}>RIZEON AI</span>
            </span>
            <p style={{ color: c.grey, fontSize: 13.5, lineHeight: 1.8, margin: 0, maxWidth: 280 }}>
              An AI consultancy in Singapore building AI infrastructure for professional service firms.
            </p>
          </div>
          <div>
            <span style={{ fontFamily: mono, fontSize: 10.5, color: c.greyDim, letterSpacing: 2.5, textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              Index
            </span>
            {[
              ["Services", "services"],
              ["What we build", "capabilities"],
              ["FAQ", "faq"],
            ].map(([label, id]) => (
              <a key={label} href={id === "services" ? "/services" : "#" + id} onClick={go(id)} className="link-slide" style={{
                display: "block", width: "fit-content",
                color: c.grey, fontSize: 13.5, textDecoration: "none",
                marginBottom: 14, fontWeight: 400, cursor: "pointer",
              }}>{label}</a>
            ))}
          </div>
          <div>
            <span style={{ fontFamily: mono, fontSize: 10.5, color: c.greyDim, letterSpacing: 2.5, textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              Contact
            </span>
            <a href="mailto:hello@rizeonai.com" className="link-slide" style={{
              display: "block", width: "fit-content",
              color: c.grey, fontSize: 13.5, textDecoration: "none", marginBottom: 14,
            }}>hello@rizeonai.com</a>
          </div>
          <div>
            <span style={{ fontFamily: mono, fontSize: 10.5, color: c.greyDim, letterSpacing: 2.5, textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              Legal
            </span>
            <a href="/privacy" onClick={(e) => { e.preventDefault(); navigate("/privacy"); }} className="link-slide" style={{
              display: "block", width: "fit-content",
              color: c.grey, fontSize: 13.5, textDecoration: "none", marginBottom: 14, cursor: "pointer",
            }}>Privacy Policy</a>
            <a href="/terms" onClick={(e) => { e.preventDefault(); navigate("/terms"); }} className="link-slide" style={{
              display: "block", width: "fit-content",
              color: c.grey, fontSize: 13.5, textDecoration: "none", marginBottom: 14, cursor: "pointer",
            }}>Terms of Service</a>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${c.border}` }}>
          <div style={{
            maxWidth: 1160, margin: "0 auto",
            padding: "24px 28px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 12,
          }}>
            <p style={{ color: c.greyDim, fontSize: 11.5, margin: 0, fontFamily: mono, letterSpacing: 1 }}>© 2026 RIZEON AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


// ─── SERVICES PAGE (/services) ───
function ServicesPage({ navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const encode = (data) =>
    Object.keys(data).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])).join("&");

  const submitEmail = async () => {
    if (!email.includes("@") || submitting) return;
    setSubmitting(true); setError(false);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", email }),
      });
      setSent(true);
    } catch (e) { setError(true); } finally { setSubmitting(false); }
  };

  const goHome = (hash) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate("/", hash);
  };

  return (
    <div style={{ background: c.bg, color: c.white, fontFamily: body, minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyle />

      {/* film grain */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 300, pointerEvents: "none",
        opacity: 0.028, mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "14px 28px" : "24px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,0.8)" : "rgba(10,10,10,0.5)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? c.border : "transparent"}`,
        transition: "all 0.5s cubic-bezier(0.2,0.7,0.2,1)",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }}
          onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <img src={LOGO} alt="Rizeon AI" style={{ height: 24, width: "auto", display: "block" }} />
          <span style={{ fontFamily: display, fontSize: 15, fontWeight: 600, letterSpacing: 2.5 }}>RIZEON AI</span>
        </span>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <a href="/services" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="link-slide" style={{ color: c.white, fontSize: 13, textDecoration: "none", fontWeight: 500, cursor: "pointer" }}>Services</a>
          <a href="/#contact" onClick={goHome("contact")} className="btn-fill btn-fill-light nav-cta-mobile" style={{
            color: c.bg, background: c.white, textDecoration: "none",
            fontFamily: display, fontSize: 13, fontWeight: 600,
            padding: "11px 24px", borderRadius: 99, cursor: "pointer", whiteSpace: "nowrap",
          }}>Get in touch</a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", justifyContent: "center", gap: 5, padding: 8, marginLeft: 8 }}>
          <span style={{ display: "block", width: 22, height: 1.5, background: c.white, transform: menuOpen ? "translateY(3.25px) rotate(45deg)" : "none", transition: "transform 0.35s cubic-bezier(0.2,0.7,0.2,1)" }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: c.white, transform: menuOpen ? "translateY(-3.25px) rotate(-45deg)" : "none", transition: "transform 0.35s cubic-bezier(0.2,0.7,0.2,1)" }} />
        </button>
      </nav>

      {/* mobile menu */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 99, paddingTop: 76,
        background: "rgba(10,10,10,0.97)", backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${c.border}`,
        transform: menuOpen ? "translateY(0)" : "translateY(-105%)",
        transition: "transform 0.5s cubic-bezier(0.2,0.7,0.2,1)",
      }}>
        <div style={{ padding: "12px 28px 32px", display: "flex", flexDirection: "column" }}>
          {[["Services", "services"], ["Get in touch", "contact"]].map(([label, id], i) => (
            <a key={id} href={id === "services" ? "/services" : "/#contact"}
              onClick={id === "services" ? (e) => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); } : goHome("contact")}
              style={{
                fontFamily: display, fontSize: 26, fontWeight: 500, color: c.white, textDecoration: "none",
                padding: "16px 0", borderBottom: i < 1 ? `1px solid ${c.border}` : "none", letterSpacing: -0.5,
                opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.4s ease ${0.1 + i * 0.06}s, transform 0.4s ease ${0.1 + i * 0.06}s`,
              }}>
              {label}<span style={{ color: c.purple, marginLeft: 8, fontSize: 20 }}>→</span>
            </a>
          ))}
        </div>
      </div>

      {/* SERVICES CONTENT */}
      <section className="section-pad" style={{ padding: "170px 28px 120px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: mono, fontSize: 12, color: c.purple, letterSpacing: 3, textTransform: "uppercase", fontWeight: 500 }}>Services</span>
            <h1 style={{
              fontFamily: display, fontSize: "clamp(42px, 9vw, 104px)",
              fontWeight: 400, letterSpacing: -3, margin: "26px 0 22px", lineHeight: 1.0,
            }}>
              Audit. Build.<br />
              <span style={{ fontWeight: 500 }}>Launch<span style={{ color: c.purple }}>.</span></span>
            </h1>
            <p style={{ color: c.grey, fontSize: 17, lineHeight: 1.7, maxWidth: 460, margin: "0 0 110px" }}>
              Three phases. One system, built around how your business already runs.
            </p>
          </Reveal>

          {[
            {
              n: "01",
              title: "Audit",
              tagline: "Find what's leaking.",
              para: "We map how work actually flows through your business and put a dollar figure on every delay and manual handoff. You get a clear picture of what inefficiency is costing you before anything gets built.",
              items: [
                "Full workflow and response-time diagnostic",
                "Revenue-leak analysis, quantified in dollars",
                "Diagnostic report of key findings",
                "Fixed-price build roadmap",
              ],
            },
            {
              n: "02",
              title: "Build",
              tagline: "Systems shaped around you.",
              para: "We architect AI infrastructure around your business logic, trained on your protocols and tone. It plugs into the tools you already use and is fully tested before it touches a real customer.",
              items: [
                "Custom infrastructure architecture around your workflows",
                "AI trained on your protocols and policies",
                "Integration with your CRM, calendar and WhatsApp",
                "Sandbox testing before anything goes live",
              ],
            },
            {
              n: "03",
              title: "Launch",
              tagline: "Live, without disruption.",
              para: "We deploy in phases inside your live environment with zero disruption to your team. After launch we stay on to monitor, tune and iterate as your business changes.",
              items: [
                "Phased rollout into your live workflows",
                "Team onboarding and handover documentation",
                "Performance monitoring and weekly tuning",
                "Ongoing support and iteration",
              ],
            },
          ].map((svc, si) => (
            <PhaseBlock key={svc.n} svc={svc} index={si} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad-lg" style={{
        borderTop: `1px solid ${c.border}`, padding: "160px 28px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", bottom: "-45%", left: "50%", transform: "translateX(-50%)",
          width: 800, height: 800, borderRadius: "50%",
          background: `radial-gradient(circle, ${c.purpleSoft} 0%, transparent 60%)`, pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          <h2 style={{ fontFamily: display, fontSize: "clamp(36px, 7vw, 72px)", fontWeight: 400, letterSpacing: -2, margin: "0 0 28px", lineHeight: 1.04 }}>
            Ready to start with<br />an <span style={{ color: c.purple }}>audit?</span>
          </h2>
          <p style={{ color: c.grey, fontSize: 16, margin: "0 auto 48px", maxWidth: 440, lineHeight: 1.75 }}>
            A 30-minute audit call to map where your operation is losing time and revenue. No commitment, no pitch.
          </p>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
            <a
              href="/audit"
              onClick={(e) => { e.preventDefault(); navigate("/audit"); }}
              className="btn-fill btn-fill-light"
              style={{
                display: "inline-block",
                background: c.white, color: c.bg, textDecoration: "none",
                fontFamily: display, padding: "19px 46px",
                borderRadius: 99, fontSize: 16, fontWeight: 500,
                cursor: "pointer", letterSpacing: -0.2,
              }}
            >
              Book your audit call
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${c.border}` }}>
        <div className="footer-grid" style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 28px 56px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48 }}>
          <div>
            <span style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <img src={LOGO} alt="Rizeon AI" style={{ height: 22, width: "auto", display: "block" }} />
              <span style={{ fontFamily: display, fontSize: 14, fontWeight: 600, letterSpacing: 2.5 }}>RIZEON AI</span>
            </span>
            <p style={{ color: c.grey, fontSize: 13.5, lineHeight: 1.8, margin: 0, maxWidth: 280 }}>
              An AI consultancy in Singapore building AI infrastructure for professional service firms.
            </p>
          </div>
          <div>
            <span style={{ fontFamily: mono, fontSize: 10.5, color: c.greyDim, letterSpacing: 2.5, textTransform: "uppercase", display: "block", marginBottom: 20 }}>Index</span>
            <a href="/services" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="link-slide" style={{ display: "block", width: "fit-content", color: c.grey, fontSize: 13.5, textDecoration: "none", marginBottom: 14, fontWeight: 400, cursor: "pointer" }}>Services</a>
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="link-slide" style={{ display: "block", width: "fit-content", color: c.grey, fontSize: 13.5, textDecoration: "none", marginBottom: 14, fontWeight: 400, cursor: "pointer" }}>Home</a>
          </div>
          <div>
            <span style={{ fontFamily: mono, fontSize: 10.5, color: c.greyDim, letterSpacing: 2.5, textTransform: "uppercase", display: "block", marginBottom: 20 }}>Contact</span>
            <a href="mailto:hello@rizeonai.com" className="link-slide" style={{ display: "block", width: "fit-content", color: c.grey, fontSize: 13.5, textDecoration: "none", marginBottom: 14 }}>hello@rizeonai.com</a>
          </div>
          <div>
            <span style={{ fontFamily: mono, fontSize: 10.5, color: c.greyDim, letterSpacing: 2.5, textTransform: "uppercase", display: "block", marginBottom: 20 }}>Legal</span>
            <a href="/privacy" onClick={(e) => { e.preventDefault(); navigate("/privacy"); }} className="link-slide" style={{ display: "block", width: "fit-content", color: c.grey, fontSize: 13.5, textDecoration: "none", marginBottom: 14, cursor: "pointer" }}>Privacy Policy</a>
            <a href="/terms" onClick={(e) => { e.preventDefault(); navigate("/terms"); }} className="link-slide" style={{ display: "block", width: "fit-content", color: c.grey, fontSize: 13.5, textDecoration: "none", marginBottom: 14, cursor: "pointer" }}>Terms of Service</a>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${c.border}` }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ color: c.greyDim, fontSize: 11.5, margin: 0, fontFamily: mono, letterSpacing: 1 }}>© 2026 RIZEON AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


// ─── LEGAL PAGES (/privacy, /terms) ───
const LEGAL = {
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: July 2026",
    sections: [
      ["Who we are", "Rizeon AI (\"we\", \"us\") is an AI consultancy based in Singapore. This policy explains how we collect, use and protect personal data in line with Singapore's Personal Data Protection Act (PDPA)."],
      ["What we collect", "When you submit your email through our website, we collect your email address and the time of submission. If you engage us for services, we may also collect your name, company details and information about your business operations needed to deliver our work."],
      ["How we use it", "We use your data to respond to your enquiry, provide our services, and occasionally share relevant updates about our work. We do not sell, rent or trade your personal data to third parties."],
      ["Storage and security", "Data submitted through our website is stored securely with our hosting and form providers. We take reasonable security measures to protect it against unauthorised access, disclosure or loss."],
      ["Third-party services", "Our website and operations rely on trusted third-party providers (such as hosting, form handling and analytics). These providers process data only as needed to deliver their services to us."],
      ["Your rights", "Under the PDPA, you may request access to, correction of, or deletion of your personal data. To do so, contact us at hello@rizeonai.com and we will respond within a reasonable timeframe."],
      ["Retention", "We keep personal data only as long as needed for the purposes above, or as required by law, after which it is securely deleted."],
      ["Changes", "We may update this policy from time to time. The latest version will always be available on this page."],
      ["Contact", "For any privacy-related questions or requests, email us at hello@rizeonai.com."],
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "Last updated: July 2026",
    sections: [
      ["Agreement", "By accessing this website or engaging Rizeon AI for services, you agree to these terms. If you do not agree, please do not use this website."],
      ["Our services", "Rizeon AI provides AI consultancy and builds AI infrastructure for businesses. The specific scope, deliverables, timeline and fees for any engagement are set out in a separate written agreement or proposal."],
      ["Website content", "Content on this website is provided for general information only. It does not constitute professional advice, and outcomes described (including client results) are illustrative and not a guarantee of results for your business."],
      ["Intellectual property", "All content on this website, including text, design and branding, belongs to Rizeon AI unless otherwise stated. You may not reproduce it without our written permission. Intellectual property arising from client engagements is governed by the relevant service agreement."],
      ["Acceptable use", "You agree not to misuse this website, attempt to gain unauthorised access to it, or use it in any way that violates applicable laws."],
      ["Limitation of liability", "To the maximum extent permitted by law, Rizeon AI is not liable for any indirect or consequential loss arising from your use of this website. Liability in relation to services is governed by the applicable service agreement."],
      ["Third-party links", "This website may reference third-party tools or websites. We are not responsible for their content or practices."],
      ["Governing law", "These terms are governed by the laws of Singapore, and any disputes are subject to the exclusive jurisdiction of the Singapore courts."],
      ["Contact", "Questions about these terms can be sent to hello@rizeonai.com."],
    ],
  },
};

function LegalPage({ navigate, kind }) {
  const doc = LEGAL[kind];
  useEffect(() => { window.scrollTo(0, 0); }, [kind]);

  return (
    <div style={{ background: c.bg, color: c.white, fontFamily: body, minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyle />
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${c.border}`,
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }}
          onClick={() => navigate("/")}>
          <img src={LOGO} alt="Rizeon AI" style={{ height: 24, width: "auto", display: "block" }} />
          <span style={{ fontFamily: display, fontSize: 15, fontWeight: 600, letterSpacing: 2.5 }}>RIZEON AI</span>
        </span>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="link-slide"
          style={{ color: c.grey, fontSize: 13, textDecoration: "none", fontWeight: 500, cursor: "pointer" }}>
          ← Back to home
        </a>
      </nav>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "160px 28px 120px" }}>
        <h1 style={{ fontFamily: display, fontSize: "clamp(34px, 6vw, 54px)", fontWeight: 500, letterSpacing: -1.5, margin: "0 0 10px" }}>
          {doc.title}
        </h1>
        <p style={{ fontFamily: mono, fontSize: 12, color: c.greyDim, letterSpacing: 1.5, margin: "0 0 56px" }}>
          {doc.updated}
        </p>
        {doc.sections.map(([h, p], i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: display, fontSize: 19, fontWeight: 600, letterSpacing: -0.3, margin: "0 0 12px", color: c.white }}>
              {h}
            </h2>
            <p style={{ color: c.grey, fontSize: 15, lineHeight: 1.85, margin: 0 }}>
              {p}
            </p>
          </div>
        ))}
      </main>

      <footer style={{ borderTop: `1px solid ${c.border}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: c.greyDim, fontSize: 11.5, margin: 0, fontFamily: mono, letterSpacing: 1 }}>© 2026 RIZEON AI</p>
        </div>
      </footer>
    </div>
  );
}


// ─── AUDIT PAGE (/audit) ───
function AuditPage({ navigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: c.bg, color: c.white, fontFamily: body, minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyle />
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${c.border}`,
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }}
          onClick={() => navigate("/")}>
          <img src={LOGO} alt="Rizeon AI" style={{ height: 24, width: "auto", display: "block" }} />
          <span style={{ fontFamily: display, fontSize: 15, fontWeight: 600, letterSpacing: 2.5 }}>RIZEON AI</span>
        </span>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="link-slide"
          style={{ color: c.grey, fontSize: 13, textDecoration: "none", fontWeight: 500, cursor: "pointer" }}>
          ← Back to home
        </a>
      </nav>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "150px 28px 120px", textAlign: "center" }}>
        <span style={{ fontFamily: mono, fontSize: 12, color: c.purple, letterSpacing: 3, textTransform: "uppercase", fontWeight: 500 }}>
          Book your audit
        </span>
        <h1 style={{
          fontFamily: display, fontSize: "clamp(36px, 6.5vw, 64px)",
          fontWeight: 500, letterSpacing: -1.8, margin: "22px 0 18px", lineHeight: 1.05,
        }}>
          Let's find what's leaking<span style={{ color: c.purple }}>.</span>
        </h1>
        <p style={{ color: c.grey, fontSize: 16, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 64px" }}>
          A 30-minute call to walk through your operation and see exactly where AI fits. No commitment, no pitch.
        </p>

        <CalEmbed />

      </main>

      <footer style={{ borderTop: `1px solid ${c.border}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: c.greyDim, fontSize: 11.5, margin: 0, fontFamily: mono, letterSpacing: 1 }}>© 2026 RIZEON AI</p>
        </div>
      </footer>
    </div>
  );
}

// ─── ROUTER ───
export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  const navigate = (to, hash) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, "", to);
      setPath(to);
    }
    if (hash) {
      // wait for home to render, then scroll to the section
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const titles = {
      "/": "Rizeon AI",
      "/services": "Rizeon AI | Services",
      "/audit": "Rizeon AI | Book a Call",
      "/privacy": "Rizeon AI | Privacy Policy",
      "/terms": "Rizeon AI | Terms of Service",
    };
    document.title = titles[path] || "Rizeon AI";
  }, [path]);

  if (path === "/audit") return <AuditPage navigate={navigate} />;
  if (path === "/services") return <ServicesPage navigate={navigate} />;
  if (path === "/privacy") return <LegalPage navigate={navigate} kind="privacy" />;
  if (path === "/terms") return <LegalPage navigate={navigate} kind="terms" />;
  return <HomePage navigate={navigate} />;
}
