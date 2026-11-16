import React, { useState, useEffect, useCallback } from 'react';
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
  Play
} from 'lucide-react';

// Curated Nigerian Exam Card Stack Data
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

// 3-Step Interactive Storybook Data
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

export default function App() {
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
      {/* Load Google Fonts: Fraunces (Editorial Display Serif), Plus Jakarta Sans, JetBrains Mono */}
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

      {/* FLOATING PILL NAVIGATION */}
      <div className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8">
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
              <img src="./03.jpg" alt="Nigerian student studying calmly at home with phone and notebook" loading="lazy" className="w-full h-64 sm:h-72 object-cover rounded-3xl border-2 border-[#14281D] tactile-shadow" />
              <figcaption className="text-xs font-mono-code text-[#14281D]/60 pt-2">Calm home practice — low-data, offline-ready.</figcaption>
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
                  {EXAM_CARDS.map((card, idx) => (
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

              {/* Card Body: Either Interactive Student Question Card OR School Live Sheet */}
              {activeTab !== 3 ? (
                <div className="p-6 sm:p-7 space-y-5 relative">
                  {/* Reassuring Offline Rubber Stamp Overlay */}
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

                  {/* Card Metadata Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#F3EDE2] border border-[#14281D] font-mono-code text-xs font-bold">
                        {currentCard.badge}
                      </span>
                      <span className="text-xs font-bold text-[#2A6F4E]">
                        {currentCard.topic}
                      </span>
                    </div>

                    {/* Ticking Exam Timer Pill */}
                    <div className="flex items-center gap-1.5 bg-[#14281D] text-[#FBF8F3] px-3 py-1 rounded-full font-mono-code text-xs font-bold">
                      <Clock className="w-3.5 h-3.5 text-[#F4B942]" />
                      <span>{formatTimer(secondsLeft)}</span>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono-code font-bold uppercase text-[#14281D]/60">
                      {currentCard.questionNumber} • PAPER {currentCard.paperCode}
                    </div>
                    <p className="font-serif-editorial text-xl sm:text-2xl font-bold text-[#14281D] leading-snug">
                      {currentCard.question}
                    </p>
                  </div>

                  {/* 4 Tactile Option Buttons */}
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

                  {/* Celebratory Explanation Footer & Next Card Flipper */}
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
                          💡 Tap an option (or press A, B, C, D) to check your answer.
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
                /* Tab 4: School Admin Live Broadsheet Preview */
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

          {/* 3-Tab Horizontal Selector + Dynamic Visual Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 5 Cols: Step Selector Tabs */}
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

            {/* Right 7 Cols: Live Step Preview Card */}
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
                <span> Controlled &amp; seeded by Prepadi curriculum editors</span>
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
          <img src="./01.jpeg" alt="Students practising CBT together in classroom" loading="lazy" className="w-full h-64 md:h-80 object-cover rounded-3xl border-2 border-[#14281D] tactile-shadow-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* LEFT CARD: FOR LEARNERS (DEEP FOREST GREEN THEME) */}
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

            {/* Tactile Keyboard Shortcut & Mastery Mini-Widget */}
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
            <img src="./04.jpg" alt="Hands holding phone with low battery in classroom" loading="lazy" className="w-full h-52 object-cover rounded-2xl border-2 border-[#FBF8F3]/20" />

            <button
              onClick={() => setModalOpen('student')}
              className="w-full bg-[#F4B942] hover:bg-[#e5aa32] text-[#14281D] font-bold text-sm sm:text-base py-4 rounded-full border-2 border-[#14281D] shadow-[4px_4px_0px_#FBF8F3] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Free Student Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT CARD: FOR SCHOOLS & TUTORIAL CENTRES (WARM TERRACOTTA / SAND THEME) */}
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
            </div>
            <img src="./05.jpg" alt="Teacher reviewing student results in classroom" loading="lazy" className="w-full h-56 object-cover rounded-2xl border-2 border-[#14281D]" />

            {/* Interactive "Generate Mock Exam Code" Widget */}
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

            {/* Pricing Filter Pill */}
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
            {/* Card 1: Student Starter / Free Forever */}
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

            {/* Card 2: School & Tutorial Centre Term License */}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <img src="./06.jpg" alt="Celebrating students after exams" loading="lazy" className="w-full h-64 md:h-80 object-cover rounded-3xl border-2 border-[#14281D] tactile-shadow-lg" />
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