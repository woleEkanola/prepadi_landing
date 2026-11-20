import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sparkles,
  Wifi,
  WifiOff,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  GraduationCap,
  Building2,
  BookOpen,
  Zap,
  RotateCcw,
  Award,
  ShieldCheck,
  Check,
  Copy,
  Layers,
  TrendingUp,
  Keyboard,
  Users,
  FileCheck,
  Play,
  Terminal,
  Sun,
  Moon,
  BarChart3,
  Database,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Radio,
  Cpu,
  Eye
} from 'lucide-react';

// ============================================================================
// SHARED CURATED NIGERIAN EXAM DATA (JAMB, WAEC, NECO)
// ============================================================================
const EXAM_CARDS = [
  {
    id: 'physics',
    tabLabel: 'JAMB Physics',
    badge: 'JAMB UTME • 2024',
    paperCode: 'PHY-204',
    topic: 'Projectile Motion',
    questionNumber: 'Q.14 of 40',
    question:
      'A ball is projected horizontally from the top of a hill with a velocity of 30 m/s. If it reaches the ground in 4 seconds, what is the height of the hill? [g = 10 m/s²]',
    options: [
      { id: 'A', text: '60 m' },
      { id: 'B', text: '80 m' },
      { id: 'C', text: '120 m' },
      { id: 'D', text: '160 m' }
    ],
    correct: 'B',
    explanation: 'Using h = ½gt² → h = 0.5 × 10 × (4)² = 5 × 16 = 80m.'
  },
  {
    id: 'chemistry',
    tabLabel: 'WAEC Chemistry',
    badge: 'WASSCE • 2024',
    paperCode: 'CHM-108',
    topic: 'Gas Laws & Stoichiometry',
    questionNumber: 'Q.08 of 50',
    question:
      'What volume of oxygen at S.T.P is required to completely burn 100 cm³ of methane (CH₄) according to the equation: CH₄ + 2O₂ → CO₂ + 2H₂O?',
    options: [
      { id: 'A', text: '100 cm³' },
      { id: 'B', text: '150 cm³' },
      { id: 'C', text: '200 cm³' },
      { id: 'D', text: '400 cm³' }
    ],
    correct: 'C',
    explanation: 'By Gay-Lussac’s law, 1 vol of CH₄ reacts with 2 vols of O₂ → 100 × 2 = 200 cm³.'
  },
  {
    id: 'english',
    tabLabel: 'WAEC English',
    badge: 'WASSCE • 2024',
    paperCode: 'ENG-109',
    topic: 'Lexis & Opposite in Meaning',
    questionNumber: 'Q.22 of 60',
    question:
      'Choose the word that is nearly OPPOSITE in meaning to the underlined word: The bursar was commended for his FRUGAL handling of school funds.',
    options: [
      { id: 'A', text: 'Prudent' },
      { id: 'B', text: 'Extravagant' },
      { id: 'C', text: 'Transparent' },
      { id: 'D', text: 'Reluctant' }
    ],
    correct: 'B',
    explanation: '“Frugal” means economical or sparing; its direct antonym is “Extravagant”.'
  },
  {
    id: 'maths',
    tabLabel: 'NECO Maths',
    badge: 'NECO SSCE • 2024',
    paperCode: 'MTH-302',
    topic: 'Logarithms & Indices',
    questionNumber: 'Q.09 of 50',
    question: 'Find the value of x for which 2^(2x + 1) = 32.',
    options: [
      { id: 'A', text: 'x = 1.5' },
      { id: 'B', text: 'x = 2.0' },
      { id: 'C', text: 'x = 2.5' },
      { id: 'D', text: 'x = 3.0' }
    ],
    correct: 'B',
    explanation: 'Since 32 = 2⁵, 2x + 1 = 5 → 2x = 4 → x = 2.0.'
  }
];

const STORY_STEPS = [
  {
    id: 0,
    number: '01',
    title: 'Pick a Seeded Paper',
    shortDesc: 'Select from 45,000+ syllabus-verified WAEC, JAMB & NECO papers or teacher-assigned mocks.',
    tag: 'CURATED SYLLABUS BANK',
    stat: '100% Vetted',
    previewItems: [
      { code: 'JAMB-PHY-2024', title: 'UTME Physics Standard Mock', count: '40 Qs • 45 Mins', badge: 'Verified' },
      { code: 'WAEC-CHM-2023', title: 'WASSCE Chemistry Objective', count: '50 Qs • 60 Mins', badge: 'Verified' },
      { code: 'SCH-SS3-MOCK', title: 'Lagoon Secondary SS3 Joint Mock', count: '60 Qs • 50 Mins', badge: 'School Assigned' }
    ]
  },
  {
    id: 1,
    number: '02',
    title: 'Practice Under Real Timing',
    shortDesc: 'Build calm exam-day muscle memory with 8-key JAMB shortcuts and zero-data offline auto-save.',
    tag: 'DISTRACTION-FREE ENGINE',
    stat: '0 KB/s Offline',
    previewItems: [
      { code: 'KEY [A-D]', title: 'Instant Option Selection', count: 'Zero mouse lag', badge: 'Active' },
      { code: 'KEY [N / P]', title: 'Next & Previous Question Jump', count: 'Matches JAMB centres', badge: 'Active' },
      { code: 'OFFLINE-SYNC', title: 'Local IndexedDB Vault', count: 'Survives network drops', badge: 'Protected' }
    ]
  },
  {
    id: 2,
    number: '03',
    title: 'Spot Weak Topics Instantly',
    shortDesc: 'See step-by-step explanations and topic mastery rings the second you submit.',
    tag: 'PRECISION DIAGNOSTICS',
    stat: '+34% Score Lift',
    previewItems: [
      { code: '88% MASTERY', title: 'Mechanics & Projectile Motion', count: '14/16 Correct', badge: 'Strong' },
      { code: '82% MASTERY', title: 'Gas Laws & Stoichiometry', count: '9/11 Correct', badge: 'Strong' },
      { code: '46% FOCUS', title: 'Electromagnetic Induction', count: 'Recommended 10-min drill', badge: 'Needs Review' }
    ]
  }
];

// ============================================================================
// VERSION 1: CLEAN MODERN SAAS BENTO (PREPADI BLUE & ORANGE)
// ============================================================================
function VersionOneSaaSBento() {
  const [heroMode, setHeroMode] = useState('student'); // 'student' | 'school'
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState({ 0: 'B' });
  const [isOfflineSim, setIsOfflineSim] = useState(false);
  const [bentoOfflineTest, setBentoOfflineTest] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2685); // 44:45
  const [signupModal, setSignupModal] = useState(false);
  const heroRef = useRef(null);
  const progressRef = useRef(0);
  const [simReveal, setSimReveal] = useState(0); // 0 = card hidden, image fully visible; 1 = card fully layered over image

  // Scroll-locked reveal: page scroll pauses at the hero pin point while wheel
  // input drives the CBT card up over the static image + text. Unlocks at full reveal.
  useEffect(() => {
    const WHEEL_PER_REVEAL = 700; // wheel px needed for a full reveal
    const setLock = (locked) => {
      document.body.style.overflow = locked ? 'hidden' : '';
    };
    const advance = (delta) => {
      const node = heroRef.current;
      if (!node) return false;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (rect.top > 0) {
        // hero hasn't reached the pin point: keep card hidden, never hijack
        if (progressRef.current !== 0) {
          progressRef.current = 0;
          setSimReveal(0);
        }
        return false;
      }
      if (rect.bottom <= vh * 0.4) {
        // hero long past: keep card fully shown, never hijack
        if (progressRef.current !== 1) {
          progressRef.current = 1;
          setSimReveal(1);
        }
        setLock(false);
        return false;
      }
      const p = progressRef.current;
      if (delta > 0 && p < 1) {
        progressRef.current = Math.min(1, p + delta / WHEEL_PER_REVEAL);
        setSimReveal(progressRef.current);
        const done = progressRef.current >= 1;
        setLock(!done);
        return !done;
      }
      if (delta < 0 && p > 0) {
        progressRef.current = Math.max(0, p + delta / WHEEL_PER_REVEAL);
        setSimReveal(progressRef.current);
        const done = progressRef.current <= 0;
        setLock(!done);
        return !done;
      }
      setLock(false);
      return false;
    };

    const onWheel = (e) => {
      if (e.ctrlKey || e.metaKey) return; // let pinch-zoom through
      if (advance(e.deltaY)) e.preventDefault();
    };
    let lastTouchY = null;
    const onTouchStart = (e) => {
      lastTouchY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (lastTouchY == null) return;
      const delta = (lastTouchY - e.touches[0].clientY) * 2;
      lastTouchY = e.touches[0].clientY;
      if (advance(delta)) e.preventDefault();
    };
    const onScroll = () => {
      // init / edge sync only; wheel drives the reveal while locked
      if (document.body.style.overflow === 'hidden') return;
      advance(0);
    };

    onScroll();
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
      setLock(false);
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 2700));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatClock = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const activeQ = EXAM_CARDS[questionIdx];
  const userPick = selectedAns[questionIdx];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0000FE] selection:text-white">
      {/* Subtle Top Mesh Glow */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-tr from-[#0000FE]/15 via-[#FF6600]/10 to-[#FF6600]/10 blur-3xl rounded-full"
        />

        {/* Navbar */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 sm:px-6 py-3.5 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/prepadi_logo.png"
                alt="Prepadi logo"
                className="w-10 h-10 rounded-xl object-cover shadow-sm"
              />
              <div>
                <span className="font-bold text-slate-900 text-lg tracking-tight block leading-none">
                  Prepadi
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  CBT prep for Nigerian learners
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#v1-simulator" className="hover:text-[#0000FE] transition-colors">
                Simulator
              </a>
              <a href="#v1-bento" className="hover:text-[#0000FE] transition-colors">
                Platform Features
              </a>
              <a href="#v1-workflow" className="hover:text-[#0000FE] transition-colors">
                For Schools
              </a>
              <a href="#v1-pricing" className="hover:text-[#0000FE] transition-colors">
                Pricing
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSignupModal(true)}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2"
              >
                Login
              </button>
              <button
                onClick={() => setSignupModal(true)}
                className="bg-[#0000FE] hover:bg-[#0000CC] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-[#0000FE]/20 transition-all flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section: copy left, image + layered CBT card right */}
        <section ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32 md:pb-44">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Streamlined Copy (Cut by ~60%) */}
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                {heroMode === 'student' ? (
                  <>
                    Ace the exam.{' '}
                    <span className="bg-gradient-to-r from-[#0000FE] to-[#FF6600] bg-clip-text text-transparent">
                      Skip the panic.
                    </span>
                  </>
                ) : (
                  <>
                    Run school mocks.{' '}
                    <span className="bg-gradient-to-r from-[#0000FE] to-[#FF6600] bg-clip-text text-transparent">
                      Skip the grading.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Real JAMB &amp; WAEC timed practice for students. One-click CBT exams for Nigerian schools—online or offline.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  onClick={() => setSignupModal(true)}
                  className="bg-[#0000FE] hover:bg-[#0000CC] text-white font-semibold px-6 py-3.5 rounded-xl shadow-md shadow-[#0000FE]/20 transition-all flex items-center gap-2"
                >
                  <span>
                    {heroMode === 'student'
                      ? 'Start Practising for Free'
                      : 'Set Up Your School Workspace'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setHeroMode(heroMode === 'student' ? 'school' : 'student')}
                  className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-3.5 rounded-xl border border-slate-200 shadow-2xs transition-all flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-[#0000FE]" />
                  <span>
                    {heroMode === 'student' ? 'Preview School Mode' : 'Preview Student CBT'}
                  </span>
                </button>
              </div>

              {/* Editorial Proof Strip (V3 messaging) */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">45k+</div>
                  <div className="text-xs font-semibold text-slate-500">
                    Seeded Past Questions
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0000FE]">100%</div>
                  <div className="text-xs font-semibold text-slate-500">Offline Auto-Save</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#FF6600]">Instant</div>
                  <div className="text-xs font-semibold text-slate-500">Class Broadsheets</div>
                </div>
              </div>
            </div>

            {/* Right Column: image base with CBT card layered on top */}
            <div id="v1-simulator" className="lg:col-span-6">
              <div className="relative">
                <img
                  src="/01.jpeg"
                  alt="Nigerian students practising CBT together on a laptop in a bright classroom"
                  loading="lazy"
                  className="w-full h-[380px] sm:h-[440px] lg:h-[500px] object-cover rounded-3xl border border-slate-200 shadow-lg"
                />
                <p className="text-[11px] text-slate-500 pt-2">
                  Real classroom CBT practice — Prepadi works on laptops and phones.
                </p>
                <div
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/10 p-5 sm:p-6 space-y-5 absolute left-3 right-3 sm:left-6 sm:right-6 lg:-left-10 lg:right-10 -bottom-24 sm:-bottom-28 will-change-transform"
                  style={{
                    transform: `translateY(${(1 - simReveal) * 160}px) scale(${0.94 + simReveal * 0.06})`,
                    opacity: simReveal,
                    pointerEvents: simReveal < 0.1 ? 'none' : 'auto',
                  }}
                >
                {/* Simulator Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div className="bg-slate-100 p-1 rounded-xl inline-flex items-center text-xs font-semibold">
                    <button
                      onClick={() => setHeroMode('student')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                        heroMode === 'student'
                          ? 'bg-white text-[#0000FE] shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Student CBT</span>
                    </button>
                    <button
                      onClick={() => setHeroMode('school')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                        heroMode === 'school'
                          ? 'bg-white text-[#0000FE] shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>School Admin</span>
                    </button>
                  </div>

                  {/* Interactive Offline Toggle Pill */}
                  <button
                    onClick={() => setIsOfflineSim(!isOfflineSim)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      isOfflineSim
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-[#0000FE]/10 border-[#0000FE]/40 text-[#0000CC]'
                    }`}
                  >
                    {isOfflineSim ? (
                      <>
                        <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                        <span>Offline Mode • Saved Locally</span>
                      </>
                    ) : (
                      <>
                        <Wifi className="w-3.5 h-3.5 text-[#0000FE]" />
                        <span>Low-Data Sync Active</span>
                      </>
                    )}
                  </button>
                </div>

                {heroMode === 'student' ? (
                  <div className="space-y-4">
                    {/* Subject Switcher + Timer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {EXAM_CARDS.slice(0, 2).map((c, idx) => (
                          <button
                            key={c.id}
                            onClick={() => setQuestionIdx(idx)}
                            className={`text-xs font-bold px-3 py-1 rounded-lg transition-colors ${
                              questionIdx === idx
                                ? 'bg-[#0000FE] text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {c.tabLabel}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-[#0000FE]" />
                        <span>{formatClock(timeLeft)}</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0000FE] h-full w-3/4 rounded-full transition-all" />
                    </div>

                    {/* Question Box */}
                    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#0000FE]">
                        <span>{activeQ.badge} • {activeQ.topic}</span>
                        <span>{activeQ.questionNumber}</span>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                        {activeQ.question}
                      </p>

                      {/* Clickable Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {activeQ.options.map((opt) => {
                          const picked = userPick === opt.id;
                          const isCorrect = opt.id === activeQ.correct;

                          let cls =
                            'bg-white hover:border-[#FF6600] border-slate-200 text-slate-800';
                          if (userPick) {
                            if (picked && isCorrect) {
                              cls = 'bg-[#0000FE]/10 border-[#0000FE] text-[#0000FE]';
                            } else if (picked && !isCorrect) {
                              cls = 'bg-rose-50 border-rose-400 text-rose-900';
                            } else if (isCorrect) {
                              cls = 'bg-[#0000FE]/10 border-[#FF6600] text-[#0000FE]';
                            }
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() =>
                                setSelectedAns((prev) => ({ ...prev, [questionIdx]: opt.id }))
                              }
                              className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold flex items-center justify-between transition-all ${cls}`}
                            >
                              <span className="flex items-center gap-2.5">
                                <span
                                  className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center ${
                                    picked
                                      ? 'bg-[#0000FE] text-white'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {opt.id}
                                </span>
                                {opt.text}
                              </span>
                              {userPick && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-[#0000FE] shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {userPick && (
                        <div className="text-xs bg-[#0000FE]/15 border border-[#0000FE]/25 text-[#000066] rounded-xl p-2.5 flex items-center justify-between">
                          <span>
                            <strong className="text-[#0000CC]">Instant Review:</strong>{' '}
                            {activeQ.explanation}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom 2 Mini Highlight Cards inside Hero */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-900 text-white rounded-2xl p-4">
                        <div className="text-[11px] font-medium text-[#FF6600] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Performance view</span>
                        </div>
                        <div className="font-bold text-sm mt-1">Stronger review</div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Spot weak topics and score trends immediately.
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                        <div className="text-[11px] font-semibold text-[#0000FE] flex items-center gap-1.5">
                          <Wifi className="w-3.5 h-3.5" />
                          <span>Low-data ready</span>
                        </div>
                        <div className="font-bold text-slate-900 text-sm mt-1">Offline support</div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Keep practising even when network drops.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* School Admin Preview Mode */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-[#0000FE]/15 border border-[#0000FE]/25 rounded-2xl p-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0000FE]">
                          SCHOOL ASSESSMENT HUB
                        </span>
                        <h3 className="text-base font-bold text-slate-900">
                          SS3 Mock UTME — Physics &amp; Chemistry
                        </h3>
                      </div>
                      <span className="bg-[#0000FE] text-white text-xs font-bold px-3 py-1 rounded-full">
                        82% Class Avg
                      </span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { student: 'Chidera Nwosu (SS3A)', status: 'Submitted', score: '88%' },
                        { student: 'Femi Adeyemi (SS3A)', status: 'Submitted', score: '84%' },
                        { student: 'Zainab Bello (SS3B)', status: 'Offline Synced', score: '79%' }
                      ].map((item) => (
                        <div
                          key={item.student}
                          className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-slate-900">{item.student}</div>
                            <div className="text-slate-500">{item.status}</div>
                          </div>
                          <span className="font-mono font-bold text-sm text-[#0000FE] bg-[#0000FE]/10 px-2.5 py-1 rounded-lg">
                            {item.score}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Consolidated 4-Card Asymmetric Bento Grid (Replaces 10 repetitive white cards) */}
      <section id="v1-bento" className="py-24 md:py-32 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0000FE]">
              HOW PREPADI FITS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Structured prep in three calm steps.
            </h2>
            <p className="text-slate-600 text-base">
              No cluttered menus or unverified questions. Everything flows from curated papers to instant mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Bento 1 (7 Cols): Timed CBT Practice */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#0000FE] text-white flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 pt-1">
                  Practice Under Real Timing
                </h3>
                <p className="text-sm text-slate-600 max-w-lg">
                  Students practise with real exam timers, question palettes, and authentic JAMB 8-key navigation so exam day feels effortless.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {['A', 'B', 'C', 'D', 'N', 'P', 'S'].map((k) => (
                    <span
                      key={k}
                      className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 font-mono text-xs font-bold flex items-center justify-center text-slate-700"
                    >
                      {k}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#0000FE]">
                  Keyboard Shortcuts Built-In
                </span>
              </div>
            </div>

            {/* Bento 2 (5 Cols): Seeded & Controlled Content */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#0000FE]/20 border border-[#FF6600]/30 text-[#FF6600] flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold pt-1">Pick a Seeded Paper</h3>
                <p className="text-sm text-slate-300">
                  Select from 45,000+ syllabus-verified WAEC, JAMB &amp; NECO papers or teacher-assigned mocks. No messy unverified uploads.
                </p>
              </div>

              <div className="space-y-2">
                <div className="bg-white/10 border border-white/10 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs">
                  <span>JAMB UTME 2010–2024</span>
                  <span className="text-[#FF6600] font-semibold">✓ Seeded &amp; Verified</span>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs">
                  <span>WAEC &amp; NECO SSCE Papers</span>
                  <span className="text-[#FF6600] font-semibold">✓ Seeded &amp; Verified</span>
                </div>
              </div>
            </div>

            {/* Bento 3 (5 Cols): Offline-First Resilience */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#0000FE] text-white flex items-center justify-center">
                  <Wifi className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 pt-1">
                  Offline-Ready Support
                </h3>
                <p className="text-sm text-slate-600">
                  Built for Nigerian connectivity. Papers cache locally so students never lose progress during fluctuating network moments.
                </p>
              </div>

              <img
                src="/04.jpg"
                alt="Student holding low-battery phone in classroom showing offline study need"
                loading="lazy"
                className="w-full h-52 object-cover rounded-2xl border border-slate-200"
              />

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {bentoOfflineTest ? 'Network Disconnected' : 'Connection Active'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {bentoOfflineTest
                      ? 'Auto-saving answers to browser vault'
                      : 'Click button to test offline resilience'}
                  </div>
                </div>
                <button
                  onClick={() => setBentoOfflineTest(!bentoOfflineTest)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    bentoOfflineTest
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {bentoOfflineTest ? 'Restore Network' : 'Test Network Drop'}
                </button>
              </div>
            </div>

            {/* Bento 4 (7 Cols): School Operations & Analytics */}
            <div
              id="v1-workflow"
              className="lg:col-span-7 bg-[#0000FE] text-white rounded-3xl p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold pt-1">
                  Built for Schools &amp; Tutorial Centres
                </h3>
                <p className="text-sm text-white/80 max-w-lg">
                  Assign seeded past papers or custom school assessments. Students join with a 6-digit code and results export to Excel/PDF.
                </p>
              </div>

              <img
                src="/05.jpg"
                alt="Nigerian teacher reviewing broadsheet results with students behind"
                loading="lazy"
                className="w-full h-56 object-cover rounded-2xl border border-white/20"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { topic: 'Mechanics', pct: '86%', status: 'Strong' },
                  { topic: 'Organic Chem', pct: '74%', status: 'On Track' },
                  { topic: 'Electromagnetism', pct: '48%', status: 'Needs Review' }
                ].map((stat) => (
                  <div
                    key={stat.topic}
                    className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-3.5"
                  >
                    <div className="text-xs text-white/80">{stat.topic}</div>
                    <div className="text-xl font-extrabold mt-0.5">{stat.pct}</div>
                    <div className="text-[11px] text-white/70 mt-0.5">{stat.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* V1 Pricing — V3 naira plans in brand style */}
      <section id="v1-pricing" className="py-24 md:py-32 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0000FE]">
              SIMPLE NAIRA PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Start free. Scale when ready.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 px-3 py-1 rounded-full bg-white border border-slate-200">
                    FOR INDIVIDUAL LEARNERS
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0000FE]">
                    FREE TO START
                  </span>
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">₦0</span>
                  <span className="text-xs font-semibold text-slate-500">
                    / daily seeded papers (₦1,500/mo Unlimited)
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  Everything a candidate needs to practise WAEC, JAMB &amp; NECO papers calmly.
                </p>
                <ul className="space-y-2.5 pt-2 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0000FE] shrink-0" />
                    <span>Timed CBT simulator with 8-key JAMB shortcuts</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0000FE] shrink-0" />
                    <span>Instant step-by-step explanations &amp; topic breakdown</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0000FE] shrink-0" />
                    <span>Low-data offline mode for uninterrupted practice</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setSignupModal(true)}
                className="w-full bg-[#0000FE] hover:bg-[#0000CC] text-white font-bold text-sm py-3.5 rounded-xl shadow-sm transition-all"
              >
                Create Free Student Account →
              </button>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FF6600] text-white">
                    FOR SCHOOLS &amp; TUTORIALS
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6600]">
                    14-DAY FREE TRIAL
                  </span>
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-4xl sm:text-5xl font-extrabold">₦25,000</span>
                  <span className="text-xs font-semibold text-slate-400">
                    / term per school workspace
                  </span>
                </div>
                <p className="text-sm text-slate-300">
                  Run unlimited internal mocks, class assignments, and CBT drills across JSS1–SS3.
                </p>
                <ul className="space-y-2.5 pt-2 text-sm font-medium text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6600] shrink-0" />
                    <span>Assign seeded WAEC/JAMB papers or custom teacher exams</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6600] shrink-0" />
                    <span>Instant class broadsheets (PDF/CSV) &amp; weak-topic alerts</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6600] shrink-0" />
                    <span>Works in school computer labs even when internet drops</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setSignupModal(true)}
                className="w-full bg-[#FF6600] hover:brightness-95 text-white font-bold text-sm py-3.5 rounded-xl shadow-sm transition-all"
              >
                Launch School Workspace →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA Banner matching original screenshot's bottom card but sharper */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#090D16] text-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 sm:p-12 flex flex-col justify-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6600]">
              START NOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Give students a cleaner way to prepare.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Whether practising solo or running assessments for a school, Prepadi keeps exam prep structured and calm.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => setSignupModal(true)}
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-6 py-3.5 rounded-full transition-all"
              >
                Create Account
              </button>
              <button
                onClick={() => setSignupModal(true)}
                className="bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm px-6 py-3.5 rounded-full transition-all"
              >
                Log In
              </button>
            </div>
          </div>
          <img
            src="/06.jpg"
            alt="Nigerian students celebrating exam success outside school"
            loading="lazy"
            className="w-full h-72 md:h-full object-cover -scale-x-100"
          />
        </div>
      </section>

      {/* Simple Modal for V1 */}
      {signupModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#0000FE]">
                Get Started on Prepadi
              </span>
              <button
                onClick={() => setSignupModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Create your free account</h3>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
            />
            <button
              onClick={() => setSignupModal(false)}
              className="w-full bg-[#0000FE] hover:bg-[#0000CC] text-white font-bold py-3 rounded-xl text-sm"
            >
              Continue to Practice Workspace →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// VERSION 2: ARCHITECTURAL PRECISION GRID (OBSIDIAN DARK & WARM PAPER BRUTALIST)
// ============================================================================
function VersionTwoArchitecturalGrid() {
  const [surfaceMode, setSurfaceMode] = useState('obsidian'); // 'obsidian' | 'paper'
  const [stageTab, setStageTab] = useState('student'); // 'student' | 'school'
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({ 0: 'B' });
  const [networkKilled, setNetworkKilled] = useState(false);
  const [speedDrillActive, setSpeedDrillActive] = useState(false);
  const [timer, setTimer] = useState(60);
  const [schoolGraded, setSchoolGraded] = useState(false);

  const isDark = surfaceMode === 'obsidian';

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation for A, B, C, D and N / P
  useEffect(() => {
    const handleKey = (e) => {
      if (stageTab !== 'student') return;
      const k = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(k)) {
        setAnswers((prev) => ({ ...prev, [qIndex]: k }));
      } else if (k === 'N') {
        setQIndex((prev) => (prev + 1) % EXAM_CARDS.length);
      } else if (k === 'P') {
        setQIndex((prev) => (prev - 1 + EXAM_CARDS.length) % EXAM_CARDS.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [stageTab, qIndex]);

  const currentQ = EXAM_CARDS[qIndex];
  const picked = answers[qIndex];

  return (
    <div
      className={`min-h-screen transition-colors duration-200 font-sans ${
        isDark ? 'bg-[#090A0F] text-[#F9FAFB]' : 'bg-[#F4F1EA] text-[#111827]'
      }`}
    >
      {/* Top Telemetry Bar */}
      <div
        className={`border-b ${
          isDark ? 'border-white/10 bg-[#0D0F17]' : 'border-black/15 bg-[#EAE5D9]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              PREPADI_OS v3.4
            </span>
            <span className="hidden sm:inline opacity-60">
              BANK: 45,200+ SEEDED PAPERS [WAEC • JAMB • NECO]
            </span>
          </div>

          {/* Sub-Theme Toggle: Obsidian Dark vs Warm Paper Brutalist */}
          <button
            onClick={() => setSurfaceMode(isDark ? 'paper' : 'obsidian')}
            className={`px-2.5 py-1 rounded-sm border font-mono text-[10px] font-bold uppercase flex items-center gap-1.5 transition-colors ${
              isDark
                ? 'border-white/20 bg-white/5 hover:bg-white/10 text-emerald-400'
                : 'border-black/30 bg-black text-white'
            }`}
          >
            {isDark ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3" />}
            <span>{isDark ? 'Switch to Warm Paper' : 'Switch to Obsidian Dark'}</span>
          </button>
        </div>
      </div>

      {/* Architectural Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <header
          className={`border-x border-b py-4 px-5 flex items-center justify-between ${
            isDark ? 'border-white/10' : 'border-black/15'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 text-black font-mono font-extrabold flex items-center justify-center text-sm">
              P_
            </div>
            <span className="font-bold tracking-tight text-lg">PREPADI.ONLINE</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStageTab(stageTab === 'student' ? 'school' : 'student')}
              className={`px-3.5 py-2 text-xs font-mono font-bold uppercase border ${
                isDark
                  ? 'border-white/15 hover:bg-white/5'
                  : 'border-black/20 hover:bg-black/5'
              }`}
            >
              {stageTab === 'student' ? '[View School Console]' : '[View Student Terminal]'}
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs uppercase px-4 py-2.5">
              LAUNCH SIMULATOR →
            </button>
          </div>
        </header>

        {/* Architectural Hero with Crosshair Markers */}
        <section
          className={`relative border-x border-b py-20 md:py-28 px-5 sm:px-10 ${
            isDark ? 'border-white/10' : 'border-black/15'
          }`}
        >
          <span className="absolute top-2 left-2 font-mono text-xs opacity-30">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs opacity-30">+</span>

          <div className="max-w-4xl space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs uppercase">
              <Terminal className="w-3.5 h-3.5" />
              <span>ZERO-FLUFF CBT INFRASTRUCTURE FOR NIGERIA</span>
            </div>

            {/* 9-Word Hero Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.98]">
              Pass JAMB &amp; WAEC.{' '}
              <span className="text-emerald-500">Run school exams without chaos.</span>
            </h1>

            {/* 12-Word Subheadline */}
            <p
              className={`text-lg sm:text-xl font-mono max-w-2xl ${
                isDark ? 'text-zinc-400' : 'text-zinc-700'
              }`}
            >
              Timed past papers for students. Instant CBT grading for schools. Works offline.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSpeedDrillActive(true);
                  setTimer(60);
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs sm:text-sm uppercase px-6 py-4 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Start 60s Speed Drill</span>
              </button>
              <button
                onClick={() => setStageTab('school')}
                className={`font-mono font-bold text-xs sm:text-sm uppercase px-6 py-4 border ${
                  isDark
                    ? 'border-white/20 hover:bg-white/5 text-white'
                    : 'border-black/30 hover:bg-black/5 text-black'
                }`}
              >
                Deploy School Portal
              </button>
            </div>
          </div>

          <div className="max-w-5xl mt-12 md:mt-16">
            <img
              src="/02.jpg"
              alt="Nigerian student focused on computer in dark school lab"
              loading="lazy"
              className={`w-full h-80 md:h-[420px] object-cover ${
                isDark ? 'border border-white/15' : 'border border-black/20'
              }`}
            />
            <div className="font-mono text-[11px] opacity-60 pt-2">
              // LIVE LAB — JAMB-STYLE TERMINAL SESSION IN PROGRESS
            </div>
          </div>
        </section>

        {/* Split-Mode Interactive Command Stage */}
        <section
          className={`border-x border-b ${
            isDark ? 'border-white/10 bg-[#12141D]' : 'border-black/15 bg-white'
          }`}
        >
          {/* Command Stage Mode Bar */}
          <div
            className={`border-b px-5 py-3 flex flex-wrap items-center justify-between gap-3 ${
              isDark ? 'border-white/10 bg-[#0D0F17]' : 'border-black/15 bg-[#EAE5D9]'
            }`}
          >
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setStageTab('student')}
                className={`px-3.5 py-1.5 font-bold uppercase transition-colors ${
                  stageTab === 'student'
                    ? 'bg-emerald-500 text-black'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                01 // STUDENT_CBT_SIMULATOR
              </button>
              <button
                onClick={() => setStageTab('school')}
                className={`px-3.5 py-1.5 font-bold uppercase transition-colors ${
                  stageTab === 'school'
                    ? 'bg-amber-500 text-black'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                02 // SCHOOL_COMMAND_CENTER
              </button>
            </div>

            {/* Kill Internet Connection Test Switch */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <button
                onClick={() => setNetworkKilled(!networkKilled)}
                className={`px-3 py-1 border font-bold uppercase flex items-center gap-1.5 ${
                  networkKilled
                    ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                    : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                }`}
              >
                {networkKilled ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>NET_DOWN: INDEXED_DB_ACTIVE</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5" />
                    <span>KILL INTERNET CONNECTION</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stage Body */}
          {stageTab === 'student' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left 8 Cols: Active Question Terminal */}
              <div
                className={`lg:col-span-8 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r ${
                  isDark ? 'border-white/10' : 'border-black/15'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-emerald-500 font-bold">
                    {currentQ.badge} // {currentQ.paperCode}
                  </span>
                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                    TIMER: 00:{String(timer).padStart(2, '0')}s
                  </span>
                </div>

                <p className="text-xl sm:text-2xl font-bold leading-snug">{currentQ.question}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((opt) => {
                    const isPicked = picked === opt.id;
                    const isRight = opt.id === currentQ.correct;

                    let borderCls = isDark
                      ? 'border-white/15 hover:border-emerald-500/60'
                      : 'border-black/20 hover:border-black';
                    if (picked) {
                      if (isPicked && isRight) borderCls = 'border-emerald-500 bg-emerald-500/15';
                      else if (isPicked && !isRight) borderCls = 'border-rose-500 bg-rose-500/15';
                      else if (isRight) borderCls = 'border-emerald-500/50 bg-emerald-500/5';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => setAnswers((prev) => ({ ...prev, [qIndex]: opt.id }))}
                        className={`p-4 border text-left font-mono text-sm flex items-center justify-between transition-all ${borderCls}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-emerald-500 text-black font-bold text-xs flex items-center justify-center">
                            {opt.id}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {picked && isRight && (
                          <span className="text-[10px] uppercase text-emerald-400 font-bold">
                            [CORRECT]
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Keyboard bar */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 font-mono text-xs">
                  <span className="opacity-70">
                    KEYBOARD SHORTCUTS: PRESS [A-D] TO ANSWER • [N / P] TO NAVIGATE
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setQIndex((prev) => (prev - 1 + EXAM_CARDS.length) % EXAM_CARDS.length)
                      }
                      className="px-3 py-1.5 border border-white/20 hover:bg-white/5"
                    >
                      [P] PREV
                    </button>
                    <button
                      onClick={() => setQIndex((prev) => (prev + 1) % EXAM_CARDS.length)}
                      className="px-3 py-1.5 bg-emerald-500 text-black font-bold"
                    >
                      [N] NEXT
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4 Cols: Telemetry & Explanation */}
              <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 font-mono text-xs">
                <div className="space-y-4">
                  <div className="text-emerald-500 font-bold uppercase">
                    // REAL-TIME DIAGNOSTICS
                  </div>
                  <div className="p-4 border border-white/10 space-y-2">
                    <div className="opacity-60">ACTIVE TOPIC</div>
                    <div className="text-sm font-bold">{currentQ.topic}</div>
                  </div>

                  {picked && (
                    <div className="p-4 border border-emerald-500/40 bg-emerald-500/10 space-y-1.5">
                      <div className="font-bold text-emerald-400">VERIFIED SOLUTION:</div>
                      <p className="leading-relaxed">{currentQ.explanation}</p>
                    </div>
                  )}
                </div>

                <div className="p-4 border border-white/10 space-y-2">
                  <div className="flex justify-between">
                    <span className="opacity-60">PACKET_SIZE:</span>
                    <span className="text-emerald-400">14.2 KB (CACHED)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">SYNC_STATE:</span>
                    <span className="text-amber-400">
                      {networkKilled ? 'LOCAL_VAULT_LOCKED' : 'ONLINE_SYNCED'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* School Command Center View */
            <div className="p-6 sm:p-8 space-y-6 font-mono">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-amber-400 font-bold">
                    // LIVE INVIGILATION STREAM • SS3 JOINT MOCK UTME
                  </div>
                  <h3 className="text-2xl font-bold mt-1">142 Candidates Connected</h3>
                </div>
                <button
                  onClick={() => setSchoolGraded(!schoolGraded)}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase px-5 py-3"
                >
                  {schoolGraded ? '✓ RESULTS PUBLISHED TO BROADSHEET' : 'AUTO-GRADE & PUBLISH RESULTS'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {[
                  { id: 'CAND-019', name: 'Okafor Chinedu', progress: '40/40', score: '312 / 400' },
                  { id: 'CAND-042', name: 'Adebayo Timilehin', progress: '40/40', score: '294 / 400' },
                  { id: 'CAND-088', name: 'Ibrahim Halima', progress: '39/40 (Offline)', score: '278 / 400' }
                ].map((c) => (
                  <div key={c.id} className="p-4 border border-white/15 space-y-2">
                    <div className="flex justify-between opacity-60">
                      <span>{c.id}</span>
                      <span>{c.progress}</span>
                    </div>
                    <div className="font-bold text-sm">{c.name}</div>
                    <div className="text-emerald-400 font-bold">
                      {schoolGraded ? `SCORE: ${c.score}` : 'STATUS: READY_TO_GRADE'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 3-Column Architectural Feature Matrix */}
        <section
          className={`grid grid-cols-1 md:grid-cols-3 border-x border-b ${
            isDark ? 'border-white/10' : 'border-black/15'
          }`}
        >
          {[
            {
              num: '01',
              title: 'SEEDED & CONTROLLED',
              desc: 'Zero crowdsourced junk. Every WAEC, JAMB, and NECO paper is vetted before going live.',
              img: '/05.jpg',
              alt: 'Teacher reviewing broadsheet in classroom'
            },
            {
              num: '02',
              title: 'OFFLINE-FIRST ENGINE',
              desc: 'Fluctuating Nigerian mobile data never interrupts an active timed exam session.',
              img: '/04.jpg',
              alt: 'Low-battery phone showing offline resilience need'
            },
            {
              num: '03',
              title: 'SCHOOL BROADSHEETS',
              desc: 'Schedule class assessments and export graded PDF/Excel results in one click.',
              img: '/06.jpg',
              alt: 'Students celebrating school success'
            }
          ].map((f, i) => (
            <div
              key={f.num}
              className={`p-7 md:p-8 space-y-3 md:space-y-4 ${
                i < 2
                  ? isDark
                    ? 'border-b md:border-b-0 md:border-r border-white/10'
                    : 'border-b md:border-b-0 md:border-r border-black/15'
                  : ''
              }`}
            >
              <img src={f.img} alt={f.alt} loading="lazy" className="w-full h-44 object-cover" />
              <span className="font-mono text-xs text-emerald-500 font-bold">// {f.num}</span>
              <h3 className="text-lg font-extrabold tracking-tight">{f.title}</h3>
              <p className="text-sm opacity-75 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>
        <div className="h-16 md:h-24" />
      </div>
    </div>
  );
}

// ============================================================================
// VERSION 3: NEO-EDITORIAL TACTILE STUDY CLUB (WARM ALABASTER & FOREST INK)
// ============================================================================
function VersionThreeTactileStudyClub() {
  // Persona Toggle: 'student' | 'school'
  const [persona, setPersona] = useState('student');

  // Flash-Card Stack State
  const [activeTab, setActiveTab] = useState(0); // 0, 1, 2 for cards, 3 for 'school-sheet'
  const [selectedAnswers, setSelectedAnswers] = useState({ 0: 'B' });
  const [isOfflineStamped, setIsOfflineStamped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(2510); // 41:50

  // 3-Step Horizontal Storybook State
  const [activeStep, setActiveStep] = useState(0);

  // School Mock Code Generator Widget State
  const [mockCode, setMockCode] = useState('PRP-849');
  const [mockPublished, setMockPublished] = useState(true);
  const [submissionsCount, setSubmissionsCount] = useState(118);
  const [copiedCode, setCopiedCode] = useState(false);

  // Pricing Billing Toggle
  const [pricingTab, setPricingTab] = useState('student'); // 'student' | 'school'

  // Quick Signup Modal
  const [modalOpen, setModalOpen] = useState(null); // null | 'student' | 'school'

  // Countdown clock for tactile exam card
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 2510));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live student submissions rolling in when school mock is published
  useEffect(() => {
    if (!mockPublished) return;
    const subTimer = setInterval(() => {
      setSubmissionsCount((prev) => (prev < 142 ? prev + 1 : 114));
    }, 2800);
    return () => clearInterval(subTimer);
  }, [mockPublished]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentCard = EXAM_CARDS[activeTab] || EXAM_CARDS[0];
  const currentChoice = selectedAnswers[activeTab] || null;

  const handleSelectOption = useCallback(
    (optId) => {
      setSelectedAnswers((prev) => ({ ...prev, [activeTab]: optId }));
    },
    [activeTab]
  );

  // Keyboard support for A, B, C, D on the active flashcard
  useEffect(() => {
    const onKeyDown = (e) => {
      if (modalOpen || activeTab === 3) return;
      const k = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(k)) {
        handleSelectOption(k);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen, activeTab, handleSelectOption]);

  const handleNextCard = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setActiveTab((prev) => (prev + 1) % 3);
      setIsFlipping(false);
    }, 180);
  };

  const generateNewMockCode = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setMockCode(`PRP-${randomNum}`);
    setMockPublished(true);
    setSubmissionsCount(94);
  };

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  // Switch role persona & sync hero view
  const handlePersonaSwitch = (role) => {
    setPersona(role);
    if (role === 'school') {
      setActiveTab(3);
      setPricingTab('school');
    } else {
      setActiveTab(0);
      setPricingTab('student');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#14281D] font-sans selection:bg-[#F4B942] selection:text-[#14281D] overflow-x-hidden">
      {/* FLOATING PILL NAVIGATION */}
      <div className="sticky top-14 z-30 px-4 sm:px-6 lg:px-8 pt-3">
        <header className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md border-2 border-[#14281D] rounded-full px-3 sm:px-5 py-2.5 tactile-shadow flex items-center justify-between gap-2">
          {/* Left: Tactile Brand Badge */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#E04F33] border-2 border-[#14281D] flex items-center justify-center text-white font-serif-editorial font-bold text-lg tactile-shadow-sm group-hover:bg-[#F4B942] group-hover:text-[#14281D] transition-colors">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-serif-editorial font-bold text-lg leading-none tracking-tight">
                Prepadi
              </span>
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#2A6F4E]">
                CBT Study Club
              </span>
            </div>
          </a>

          {/* Center: Quick Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#14281D]/80">
            <a href="#flashcard-stage" className="hover:text-[#E04F33] transition-colors">
              Interactive CBT
            </a>
            <a href="#how-it-works" className="hover:text-[#E04F33] transition-colors">
              How It Works
            </a>
            <a href="#classroom-split" className="hover:text-[#E04F33] transition-colors">
              For Schools
            </a>
            <a href="#pricing" className="hover:text-[#E04F33] transition-colors">
              Pricing
            </a>
          </nav>

          {/* Right: Instant Role Persona Switcher + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              role="group"
              aria-label="Persona Switcher"
              className="bg-[#F3EDE2] border-2 border-[#14281D] rounded-full p-1 flex items-center text-xs font-bold"
            >
              <button
                onClick={() => handlePersonaSwitch('student')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  persona === 'student'
                    ? 'bg-[#14281D] text-[#FBF8F3] shadow-xs'
                    : 'text-[#14281D]/75 hover:text-[#14281D]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>I&apos;m a Student</span>
              </button>
              <button
                onClick={() => handlePersonaSwitch('school')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  persona === 'school'
                    ? 'bg-[#E04F33] text-white shadow-xs'
                    : 'text-[#14281D]/75 hover:text-[#14281D]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>I run a School</span>
              </button>
            </div>

            <button
              onClick={() => setModalOpen(persona)}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#F4B942] hover:bg-[#f2ae29] text-[#14281D] font-bold text-xs sm:text-sm px-4 py-2 rounded-full tactile-btn"
            >
              <span>{persona === 'school' ? 'Create School Portal' : 'Start Free'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>
      </div>

      {/* HERO SECTION + TACTILE FLASH-CARD STACK */}
      <main id="top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left 6 Columns: Editorial Pitch & Role-Adaptive Actions */}
          <div className="lg:col-span-6 space-y-7 md:space-y-9">
            {/* Sticker Pill Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 bg-[#F4B942] border-2 border-[#14281D] rounded-full px-3.5 py-1 text-xs font-mono-code font-bold uppercase tracking-wider tactile-shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                WAEC • JAMB • NECO • SCHOOL CBT
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#2A6F4E]/15 border border-[#2A6F4E] text-[#14281D] rounded-full px-3 py-1 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2A6F4E] animate-ping" />
                Offline-Ready Engine
              </span>
            </div>

            {/* Expressive Editorial Headline with Hand-Drawn SVG Underline */}
            <div className="space-y-3">
              <h1 className="font-serif-editorial text-5xl sm:text-6xl lg:text-[66px] font-bold tracking-tight leading-[1.03] text-[#14281D]">
                {persona === 'student' ? (
                  <>
                    Ace the exam.{' '}
                    <span className="relative inline-block text-[#E04F33] italic">
                      Skip the panic.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#F4B942]"
                        viewBox="0 0 240 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 10.5C62 2.5 154 -0.5 237 9.5"
                          stroke="currentColor"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </>
                ) : (
                  <>
                    Run school mocks.{' '}
                    <span className="relative inline-block text-[#2A6F4E] italic">
                      Skip the grading.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#E04F33]"
                        viewBox="0 0 240 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 10.5C62 2.5 154 -0.5 237 9.5"
                          stroke="currentColor"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </h1>

              <p className="text-lg sm:text-xl text-[#14281D]/80 font-medium leading-relaxed max-w-xl pt-2">
                Real JAMB &amp; WAEC timed practice for students. One-click CBT exams for Nigerian schools—online or offline.
              </p>
            </div>

            {/* Tactile Offset CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => setModalOpen(persona)}
                className="bg-[#E04F33] hover:bg-[#c94127] text-white font-bold text-base px-7 py-4 rounded-full tactile-btn flex items-center gap-2.5"
              >
                <span>
                  {persona === 'student'
                    ? 'Start Practising for Free'
                    : 'Set Up Your School Workspace'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  const nextRole = persona === 'student' ? 'school' : 'student';
                  handlePersonaSwitch(nextRole);
                }}
                className="bg-white hover:bg-[#F3EDE2] text-[#14281D] font-bold text-base px-6 py-4 rounded-full tactile-btn flex items-center gap-2"
              >
                {persona === 'student' ? (
                  <>
                    <Building2 className="w-4 h-4 text-[#E04F33]" />
                    <span>Preview School Mode</span>
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-4 h-4 text-[#2A6F4E]" />
                    <span>Preview Student CBT</span>
                  </>
                )}
              </button>
            </div>

            {/* Compact Editorial Proof Strip */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg border-t-2 border-[#14281D]/15">
              <div>
                <div className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#14281D]">
                  45k+
                </div>
                <div className="text-xs font-semibold text-[#14281D]/70">
                  Seeded Past Questions
                </div>
              </div>
              <div>
                <div className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#2A6F4E]">
                  100%
                </div>
                <div className="text-xs font-semibold text-[#14281D]/70">
                  Offline Auto-Save
                </div>
              </div>
              <div>
                <div className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#E04F33]">
                  Instant
                </div>
                <div className="text-xs font-semibold text-[#14281D]/70">
                  Class Broadsheets
                </div>
              </div>
            </div>

            <figure>
              <img
                src="/03.jpg"
                alt="Nigerian student studying calmly at home with phone and notebook"
                loading="lazy"
                className="w-full h-64 sm:h-72 object-cover rounded-3xl border-2 border-[#14281D] tactile-shadow"
              />
              <figcaption className="text-xs font-mono-code text-[#14281D]/60 pt-2">
                Calm home practice — low-data, offline-ready.
              </figcaption>
            </figure>
          </div>

          {/* Right 6 Columns: Tactile 3D-Layered Flash-Card Interactive Exam Stack */}
          <div id="flashcard-stage" className="lg:col-span-6 relative">
            {/* Decorative Back Cards for 3D Physical Stack Feel */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute inset-0 translate-x-5 translate-y-5 rounded-3xl bg-[#F4B942] border-2 border-[#14281D] rotate-2 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="hidden sm:block absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-3xl bg-[#2A6F4E] border-2 border-[#14281D] -rotate-1 pointer-events-none"
            />

            {/* Main Physical Index Card Container */}
            <div
              className={`relative bg-white border-2 border-[#14281D] rounded-3xl tactile-shadow-lg overflow-hidden transition-transform duration-200 ${
                isFlipping ? 'scale-[0.98] -rotate-1' : 'scale-100 rotate-0'
              }`}
            >
              {/* Index-Card Top Folder Tabs */}
              <div className="bg-[#F3EDE2] border-b-2 border-[#14281D] px-3 pt-3 flex items-center justify-between gap-1 overflow-x-auto">
                <div className="flex items-center gap-1.5">
                  {EXAM_CARDS.slice(0, 3).map((card, idx) => (
                    <button
                      key={card.id}
                      onClick={() => setActiveTab(idx)}
                      className={`px-3.5 py-2 rounded-t-xl font-bold text-xs border-t-2 border-x-2 transition-all whitespace-nowrap ${
                        activeTab === idx
                          ? 'bg-white border-[#14281D] text-[#14281D] -mb-[2px] pb-2.5'
                          : 'bg-[#E6DEC8]/70 border-transparent text-[#14281D]/70 hover:bg-white/60'
                      }`}
                    >
                      {card.tabLabel}
                    </button>
                  ))}
                  <button
                    onClick={() => setActiveTab(3)}
                    className={`px-3.5 py-2 rounded-t-xl font-bold text-xs border-t-2 border-x-2 transition-all whitespace-nowrap flex items-center gap-1 ${
                      activeTab === 3
                        ? 'bg-[#14281D] border-[#14281D] text-[#FBF8F3] -mb-[2px] pb-2.5'
                        : 'bg-[#E04F33]/15 border-transparent text-[#E04F33] hover:bg-[#E04F33]/25'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>School Sheet</span>
                  </button>
                </div>

                {/* Clickable Low-Data / Offline Stamp Switch */}
                <button
                  onClick={() => setIsOfflineStamped(!isOfflineStamped)}
                  title="Simulate Network Drop"
                  className={`mb-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-code font-bold border border-[#14281D] flex items-center gap-1.5 transition-all shrink-0 ${
                    isOfflineStamped
                      ? 'bg-[#F4B942] text-[#14281D]'
                      : 'bg-white text-[#2A6F4E] hover:bg-[#F3EDE2]'
                  }`}
                >
                  {isOfflineStamped ? (
                    <>
                      <WifiOff className="w-3 h-3" />
                      <span>Offline Test: ON</span>
                    </>
                  ) : (
                    <>
                      <Wifi className="w-3 h-3" />
                      <span>Test Offline Drop</span>
                    </>
                  )}
                </button>
              </div>

              {/* Card Body */}
              {activeTab !== 3 ? (
                <div className="p-6 sm:p-7 space-y-5 relative">
                  {isOfflineStamped && (
                    <div className="bg-[#F4B942]/25 border-2 border-dashed border-[#14281D] rounded-xl px-3.5 py-2 flex items-center justify-between text-xs font-mono-code font-bold text-[#14281D]">
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#2A6F4E]" />
                        SAVED LOCALLY • ZERO DATA USED
                      </span>
                      <span className="text-[10px] uppercase bg-white px-2 py-0.5 rounded-sm border border-[#14281D]">
                        Sync Queued
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#F3EDE2] border border-[#14281D] font-mono-code text-xs font-bold">
                        {currentCard.badge}
                      </span>
                      <span className="text-xs font-bold text-[#2A6F4E]">
                        {currentCard.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#14281D] text-[#FBF8F3] px-3 py-1 rounded-full font-mono-code text-xs font-bold">
                      <Clock className="w-3.5 h-3.5 text-[#F4B942]" />
                      <span>{formatTimer(secondsLeft)}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-xs font-mono-code font-bold uppercase text-[#14281D]/60">
                      {currentCard.questionNumber} • PAPER {currentCard.paperCode}
                    </div>
                    <p className="font-serif-editorial text-xl sm:text-2xl font-bold text-[#14281D] leading-snug">
                      {currentCard.question}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {currentCard.options.map((opt) => {
                      const isPicked = currentChoice === opt.id;
                      const isRight = opt.id === currentCard.correct;

                      let btnStyle =
                        'bg-[#FBF8F3] hover:bg-[#F3EDE2] border-2 border-[#14281D] text-[#14281D]';
                      if (currentChoice) {
                        if (isPicked && isRight) {
                          btnStyle =
                            'bg-[#2A6F4E] text-white border-2 border-[#14281D] tactile-shadow-sm';
                        } else if (isPicked && !isRight) {
                          btnStyle =
                            'bg-[#E04F33] text-white border-2 border-[#14281D] tactile-shadow-sm';
                        } else if (isRight) {
                          btnStyle =
                            'bg-[#2A6F4E]/15 text-[#14281D] border-2 border-[#2A6F4E]';
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(opt.id)}
                          className={`p-3.5 rounded-2xl text-left font-bold text-sm flex items-center justify-between transition-all ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-lg font-mono-code text-xs font-bold flex items-center justify-center border border-[#14281D] ${
                                isPicked
                                  ? 'bg-[#F4B942] text-[#14281D]'
                                  : 'bg-white text-[#14281D]'
                              }`}
                            >
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </div>

                          {currentChoice && isRight && (
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 ${
                                isPicked ? 'text-[#F4B942]' : 'text-[#2A6F4E]'
                              }`}
                            />
                          )}
                          {currentChoice && isPicked && !isRight && (
                            <XCircle className="w-4 h-4 text-white shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t-2 border-[#14281D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs leading-relaxed">
                      {currentChoice ? (
                        <div className="flex items-start gap-2">
                          <span className="px-2 py-0.5 rounded-sm bg-[#F4B942] border border-[#14281D] font-mono-code font-bold text-[10px] uppercase shrink-0 mt-0.5">
                            {currentChoice === currentCard.correct ? 'Spot On!' : 'Review'}
                          </span>
                          <span className="font-medium text-[#14281D]/90">
                            {currentCard.explanation}
                          </span>
                        </div>
                      ) : (
                        <span className="font-mono-code text-[#14281D]/60">
                          Tap an option (or press A, B, C, D) to check your answer.
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleNextCard}
                      className="bg-[#F4B942] hover:bg-[#e5aa32] text-[#14281D] font-bold text-xs px-4 py-2.5 rounded-full tactile-btn shrink-0 flex items-center justify-center gap-1.5"
                    >
                      <span>Next Card</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-7 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono-code font-bold uppercase text-[#E04F33]">
                        LIVE SCHOOL INVIGILATION SHEET
                      </span>
                      <h3 className="font-serif-editorial text-2xl font-bold">
                        SS3 Mock UTME — Physics
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#2A6F4E]/15 border border-[#2A6F4E] text-[#2A6F4E] font-mono-code text-xs font-bold">
                      118 Submitted
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { name: 'Adesua Okafor', code: 'SS3-A', score: '92%', tag: 'Top 1%' },
                      { name: 'Tunde Bakare', code: 'SS3-A', score: '85%', tag: 'Passed' },
                      { name: 'Ngozi Eze', code: 'SS3-B', score: '78%', tag: 'Offline Synced' }
                    ].map((row) => (
                      <div
                        key={row.name}
                        className="p-3 rounded-2xl bg-[#FBF8F3] border-2 border-[#14281D] flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-sm">{row.name}</div>
                          <div className="text-xs font-mono-code text-[#14281D]/60">
                            Class: {row.code} • {row.tag}
                          </div>
                        </div>
                        <div className="font-serif-editorial text-xl font-bold text-[#2A6F4E]">
                          {row.score}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-[#14281D]/70">
                      Zero manual marking required.
                    </span>
                    <button
                      onClick={() => setActiveTab(0)}
                      className="text-xs font-bold text-[#E04F33] underline"
                    >
                      ← Back to Question Cards
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 3-STEP HORIZONTAL "HOW PREPADI WORKS" STORYBOOK STRIP */}
      <section id="how-it-works" className="py-24 md:py-32 bg-[#F3EDE2] border-y-2 border-[#14281D] paper-dot-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white border-2 border-[#14281D] font-mono-code text-xs font-bold uppercase mb-3 tactile-shadow-sm">
                HOW PREPADI FITS
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl font-bold tracking-tight">
                Structured prep in three calm steps.
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-[#14281D]/75 max-w-md">
              No cluttered menus or unverified questions. Everything flows from curated papers to instant mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {STORY_STEPS.map((st, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={st.id}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-5 rounded-2xl border-2 border-[#14281D] transition-all ${
                      isSelected
                        ? 'bg-white tactile-shadow'
                        : 'bg-[#FBF8F3]/70 hover:bg-white/80 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`font-mono-code text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#14281D] ${
                          isSelected ? 'bg-[#F4B942] text-[#14281D]' : 'bg-[#F3EDE2]'
                        }`}
                      >
                        STEP {st.number}
                      </span>
                      <span className="font-mono-code text-xs font-bold text-[#2A6F4E]">
                        {st.stat}
                      </span>
                    </div>
                    <h3 className="font-serif-editorial text-xl font-bold text-[#14281D]">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#14281D]/75 mt-1 leading-relaxed">
                      {st.shortDesc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-white border-2 border-[#14281D] rounded-3xl p-6 sm:p-8 tactile-shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between border-b-2 border-[#14281D]/10 pb-4">
                <div>
                  <span className="font-mono-code text-xs font-bold uppercase text-[#E04F33]">
                    {STORY_STEPS[activeStep].tag}
                  </span>
                  <h4 className="font-serif-editorial text-2xl font-bold mt-0.5">
                    {STORY_STEPS[activeStep].title}
                  </h4>
                </div>
                <span className="w-10 h-10 rounded-2xl bg-[#F4B942] border-2 border-[#14281D] font-serif-editorial font-bold text-lg flex items-center justify-center tactile-shadow-sm">
                  {STORY_STEPS[activeStep].number}
                </span>
              </div>

              <div className="my-6 space-y-3">
                {STORY_STEPS[activeStep].previewItems.map((item) => (
                  <div
                    key={item.code}
                    className="p-4 rounded-2xl bg-[#FBF8F3] border-2 border-[#14281D] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-[#14281D] text-[#FBF8F3] font-mono-code text-xs font-bold">
                        {item.code}
                      </span>
                      <div>
                        <div className="font-bold text-sm text-[#14281D]">{item.title}</div>
                        <div className="text-xs text-[#14281D]/65 font-medium">{item.count}</div>
                      </div>
                    </div>
                    <span className="self-start sm:self-center px-3 py-1 rounded-full bg-[#2A6F4E]/15 border border-[#2A6F4E] text-[#2A6F4E] font-mono-code text-xs font-bold">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t-2 border-[#14281D]/10 text-xs font-semibold text-[#14281D]/70">
                <span>Controlled &amp; seeded by Prepadi curriculum editors</span>
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % 3)}
                  className="font-bold text-[#E04F33] hover:underline flex items-center gap-1"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN "BUILT FOR BOTH SIDES OF THE CLASSROOM" SPLIT SHOWCASE */}
      <section id="classroom-split" className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#F4B942] border-2 border-[#14281D] font-mono-code text-xs font-bold uppercase tactile-shadow-sm">
            ONE UNIFIED WORKSPACE
          </span>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl font-bold tracking-tight">
            Built for both sides of the classroom.
          </h2>
          <p className="text-base text-[#14281D]/75 font-medium">
            Students get calm daily practice. Schools and tutorial centres run structured CBT exams without paper stress.
          </p>
          <img
            src="/01.jpeg"
            alt="Students practising CBT together in classroom"
            loading="lazy"
            className="w-full h-64 md:h-80 object-cover rounded-3xl border-2 border-[#14281D] tactile-shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          <div className="bg-[#14281D] text-[#FBF8F3] border-2 border-[#14281D] rounded-3xl p-7 sm:p-9 tactile-shadow-lg flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#2A6F4E] text-white font-mono-code text-xs font-bold uppercase border border-white/20">
                  FOR CANDIDATES &amp; LEARNERS
                </span>
                <GraduationCap className="w-6 h-6 text-[#F4B942]" />
              </div>

              <h3 className="font-serif-editorial text-3xl sm:text-4xl font-bold leading-tight">
                Walk into the exam hall knowing the interface by heart.
              </h3>

              <p className="text-sm sm:text-base text-[#FBF8F3]/80 leading-relaxed">
                Practise with authentic JAMB &amp; WAEC timing, keyboard shortcuts, and topic-by-topic performance reviews.
              </p>
            </div>

            <div className="bg-[#1D3829] border-2 border-[#FBF8F3]/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-code text-[#F4B942]">
                <span>JAMB 8-KEY SPEED SHORTCUTS</span>
                <span>READY</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'A', label: 'Option A' },
                  { key: 'B', label: 'Option B' },
                  { key: 'C', label: 'Option C' },
                  { key: 'D', label: 'Option D' },
                  { key: 'N', label: 'Next' },
                  { key: 'P', label: 'Prev' },
                  { key: 'S', label: 'Submit' }
                ].map((item) => (
                  <div
                    key={item.key}
                    className="px-2.5 py-1.5 rounded-lg bg-[#14281D] border border-[#FBF8F3]/30 font-mono-code text-xs font-bold flex items-center gap-1.5"
                  >
                    <span className="text-[#F4B942]">{item.key}</span>
                    <span className="text-[10px] text-[#FBF8F3]/70">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <img
              src="/04.jpg"
              alt="Hands holding phone with low battery in classroom"
              loading="lazy"
              className="w-full h-52 object-cover rounded-2xl border-2 border-[#FBF8F3]/20"
            />

            <button
              onClick={() => setModalOpen('student')}
              className="w-full bg-[#F4B942] hover:bg-[#e5aa32] text-[#14281D] font-bold text-sm sm:text-base py-4 rounded-full border-2 border-[#14281D] shadow-[4px_4px_0px_#FBF8F3] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Free Student Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-[#F3EDE2] text-[#14281D] border-2 border-[#14281D] rounded-3xl p-7 sm:p-9 tactile-shadow-lg flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#E04F33] text-white font-mono-code text-xs font-bold uppercase border border-[#14281D]">
                  FOR SCHOOLS &amp; TUTORIAL CENTRES
                </span>
                <Building2 className="w-6 h-6 text-[#E04F33]" />
              </div>

              <h3 className="font-serif-editorial text-3xl sm:text-4xl font-bold leading-tight">
                Publish a school mock in 60 seconds. Auto-grade the rest.
              </h3>

              <p className="text-sm sm:text-base text-[#14281D]/80 leading-relaxed">
                Assign seeded past papers or custom school assessments. Students join with a 6-digit code and results export to Excel/PDF.
              </p>

              <img
                src="/05.jpg"
                alt="Teacher reviewing student results in classroom"
                loading="lazy"
                className="w-full h-56 object-cover rounded-2xl border-2 border-[#14281D]"
              />
            </div>

            <div className="bg-white border-2 border-[#14281D] rounded-2xl p-5 space-y-4 tactile-shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono-code font-bold uppercase text-[#2A6F4E]">
                    LIVE SCHOOL EXAM GENERATOR
                  </div>
                  <div className="font-bold text-sm">SS3 Joint Mock Assessment</div>
                </div>
                <button
                  onClick={generateNewMockCode}
                  className="px-3 py-1.5 rounded-full bg-[#F3EDE2] hover:bg-[#F4B942] border border-[#14281D] font-mono-code text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Publish New Mock</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FBF8F3] border-2 border-dashed border-[#14281D] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono-code uppercase text-[#14281D]/60">
                    STUDENT ACCESS CODE
                  </div>
                  <div className="font-mono-code text-2xl font-bold tracking-wider text-[#E04F33]">
                    {mockCode}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] font-mono-code uppercase text-[#14281D]/60">
                      LIVE SUBMISSIONS
                    </div>
                    <div className="font-mono-code text-sm font-bold text-[#2A6F4E]">
                      {submissionsCount} / 142 Students
                    </div>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="p-2.5 rounded-xl bg-white border border-[#14281D] hover:bg-[#F4B942] transition-colors"
                    title="Copy Access Code"
                  >
                    {copiedCode ? (
                      <Check className="w-4 h-4 text-[#2A6F4E]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#14281D]" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setModalOpen('school')}
              className="w-full bg-[#E04F33] hover:bg-[#c94127] text-white font-bold text-sm sm:text-base py-4 rounded-full tactile-btn flex items-center justify-center gap-2"
            >
              <span>Create School Organization Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* MINIMALIST TRANSPARENT NAIRA PRICING SECTION */}
      <section id="pricing" className="py-24 md:py-32 bg-[#F3EDE2] border-t-2 border-[#14281D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white border-2 border-[#14281D] font-mono-code text-xs font-bold uppercase mb-2 tactile-shadow-sm">
                SIMPLE NAIRA PRICING
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl font-bold tracking-tight">
                Start free. Scale when ready.
              </h2>
            </div>

            <div className="bg-white border-2 border-[#14281D] rounded-full p-1 inline-flex self-start">
              <button
                onClick={() => setPricingTab('student')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  pricingTab === 'student'
                    ? 'bg-[#14281D] text-white'
                    : 'text-[#14281D]/70 hover:text-[#14281D]'
                }`}
              >
                Student Plans
              </button>
              <button
                onClick={() => setPricingTab('school')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  pricingTab === 'school'
                    ? 'bg-[#E04F33] text-white'
                    : 'text-[#14281D]/70 hover:text-[#14281D]'
                }`}
              >
                School Licenses
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`bg-white border-2 border-[#14281D] rounded-3xl p-7 tactile-shadow flex flex-col justify-between space-y-6 ${
                pricingTab === 'student' ? 'ring-4 ring-[#F4B942]' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold uppercase px-3 py-1 rounded-full bg-[#F3EDE2] border border-[#14281D]">
                    FOR INDIVIDUAL LEARNERS
                  </span>
                  <span className="font-mono-code text-xs font-bold text-[#2A6F4E]">
                    FREE TO START
                  </span>
                </div>
                <div className="flex items-baseline gap-2 pt-2">
                  <span className="font-serif-editorial text-4xl sm:text-5xl font-bold">₦0</span>
                  <span className="text-xs font-semibold text-[#14281D]/70">
                    / daily seeded papers (₦1,500/mo Unlimited)
                  </span>
                </div>
                <p className="text-sm text-[#14281D]/75">
                  Everything a candidate needs to practise WAEC, JAMB &amp; NECO papers calmly.
                </p>
                <ul className="space-y-2.5 pt-2 text-sm font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2A6F4E] shrink-0" />
                    <span>Timed CBT simulator with 8-key JAMB shortcuts</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2A6F4E] shrink-0" />
                    <span>Instant step-by-step explanations &amp; topic breakdown</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2A6F4E] shrink-0" />
                    <span>Low-data offline mode for uninterrupted practice</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setModalOpen('student')}
                className="w-full bg-[#F4B942] hover:bg-[#e5aa32] text-[#14281D] font-bold text-sm py-3.5 rounded-full tactile-btn"
              >
                Create Free Student Account →
              </button>
            </div>

            <div
              className={`bg-white border-2 border-[#14281D] rounded-3xl p-7 tactile-shadow flex flex-col justify-between space-y-6 ${
                pricingTab === 'school' ? 'ring-4 ring-[#E04F33]' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold uppercase px-3 py-1 rounded-full bg-[#E04F33] text-white border border-[#14281D]">
                    FOR SCHOOLS &amp; TUTORIALS
                  </span>
                  <span className="font-mono-code text-xs font-bold text-[#E04F33]">
                    14-DAY FREE TRIAL
                  </span>
                </div>
                <div className="flex items-baseline gap-2 pt-2">
                  <span className="font-serif-editorial text-4xl sm:text-5xl font-bold">
                    ₦25,000
                  </span>
                  <span className="text-xs font-semibold text-[#14281D]/70">
                    / term per school workspace
                  </span>
                </div>
                <p className="text-sm text-[#14281D]/75">
                  Run unlimited internal mocks, class assignments, and CBT drills across JSS1–SS3.
                </p>
                <ul className="space-y-2.5 pt-2 text-sm font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E04F33] shrink-0" />
                    <span>Assign seeded WAEC/JAMB papers or custom teacher exams</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E04F33] shrink-0" />
                    <span>Instant class broadsheets (PDF/CSV) &amp; weak-topic alerts</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E04F33] shrink-0" />
                    <span>Works in school computer labs even when internet drops</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setModalOpen('school')}
                className="w-full bg-[#E04F33] hover:bg-[#c94127] text-white font-bold text-sm py-3.5 rounded-full tactile-btn"
              >
                Launch School Workspace →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WARM EDITORIAL FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
        <img
          src="/06.jpg"
          alt="Nigerian graduates celebrating outside school at sunset"
          loading="lazy"
          className="w-full h-72 md:h-96 object-cover rounded-3xl border-2 border-[#14281D] tactile-shadow-lg"
        />
      </div>
      <footer className="bg-[#14281D] text-[#FBF8F3] border-t-2 border-[#14281D] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F4B942] text-[#14281D] font-serif-editorial font-bold flex items-center justify-center">
              P
            </div>
            <div>
              <span className="font-serif-editorial font-bold text-lg">Prepadi</span>
              <span className="text-xs text-[#FBF8F3]/60 block">
                Structured CBT practice for Nigerian learners &amp; schools.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono-code text-[#FBF8F3]/75">
            <span>WAEC</span>
            <span>•</span>
            <span>JAMB UTME</span>
            <span>•</span>
            <span>NECO</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} PREPADI.ONLINE</span>
          </div>
        </div>
      </footer>

      {/* TACTILE ONBOARDING MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14281D]/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FBF8F3] border-2 border-[#14281D] rounded-3xl p-6 sm:p-8 tactile-shadow-lg space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#F4B942] border border-[#14281D] font-mono-code text-xs font-bold uppercase">
                {modalOpen === 'school' ? 'School Workspace' : 'Student Study Club'}
              </span>
              <button
                onClick={() => setModalOpen(null)}
                className="w-8 h-8 rounded-full bg-white border-2 border-[#14281D] font-bold text-xs flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold">
                {modalOpen === 'school'
                  ? 'Set up your school CBT portal'
                  : 'Start your free timed practice'}
              </h3>
              <p className="text-xs sm:text-sm text-[#14281D]/75 mt-1">
                {modalOpen === 'school'
                  ? 'Create an organization workspace to schedule mocks and track SS1–SS3 results.'
                  : 'Pick your subjects and start practising seeded WAEC & JAMB past papers.'}
              </p>
            </div>

            <div className="space-y-3 text-xs font-bold">
              {modalOpen === 'school' && (
                <div>
                  <label className="block mb-1 uppercase font-mono-code">School or Centre Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Meadow Hall College, Lekki"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#14281D] focus:outline-none focus:ring-2 focus:ring-[#F4B942]"
                  />
                </div>
              )}
              <div>
                <label className="block mb-1 uppercase font-mono-code">Email Address</label>
                <input
                  type="email"
                  placeholder="you@prepadi.online"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#14281D] focus:outline-none focus:ring-2 focus:ring-[#F4B942]"
                />
              </div>
              <div>
                <label className="block mb-1 uppercase font-mono-code">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#14281D] focus:outline-none focus:ring-2 focus:ring-[#F4B942]"
                />
              </div>
            </div>

            <button
              onClick={() => setModalOpen(null)}
              className="w-full bg-[#E04F33] hover:bg-[#c94127] text-white font-bold text-sm py-3.5 rounded-full tactile-btn"
            >
              {modalOpen === 'school' ? 'Create School Portal →' : 'Enter Practice Room →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MASTER APPLICATION — CLEAN LANDING (EXPLORER BAR REMOVED)
// ============================================================================
export default function App() {
  const [activeVersion, setActiveVersion] = useState(1); // 1 | 2 | 3

  // Hidden keyboard shortcut 1, 2, 3 to switch between the 3 concepts (no visible bar)
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === '1') setActiveVersion(1);
      if (e.key === '2') setActiveVersion(2);
      if (e.key === '3') setActiveVersion(3);
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Global Typography & Tactile Helper Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600&family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .font-serif-editorial {
          font-family: 'Fraunces', Georgia, serif;
        }
        .font-sans {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-mono-code {
          font-family: 'JetBrains Mono', monospace;
        }
        .tactile-shadow {
          box-shadow: 4px 4px 0px #14281D;
        }
        .tactile-shadow-lg {
          box-shadow: 6px 6px 0px #14281D;
        }
        .tactile-shadow-sm {
          box-shadow: 2px 2px 0px #14281D;
        }
        .tactile-btn {
          border: 2px solid #14281D;
          box-shadow: 4px 4px 0px #14281D;
          transition: transform 0.12s ease, box-shadow 0.12s ease, background-color 0.15s ease;
        }
        .tactile-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 5px 5px 0px #14281D;
        }
        .tactile-btn:active {
          transform: translate(3px, 3px);
          box-shadow: 1px 1px 0px #14281D;
        }
        .paper-dot-bg {
          background-image: radial-gradient(#14281D 0.75px, transparent 0.75px);
          background-size: 24px 24px;
        }
      `}</style>

      {/* RENDER CURRENTLY SELECTED LANDING (SWITCH WITH KEYS 1 / 2 / 3) */}
      {activeVersion === 1 && <VersionOneSaaSBento />}
      {activeVersion === 2 && <VersionTwoArchitecturalGrid />}
      {activeVersion === 3 && <VersionThreeTactileStudyClub />}
    </div>
  );
}