import { useState, useEffect, useMemo } from "react";
import { 
  Activity, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  RotateCcw, 
  Timer, 
  Share2, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft, 
  Filter, 
  User, 
  Check, 
  AlertCircle, 
  Printer, 
  TrendingUp, 
  Sparkles,
  Clipboard,
  HelpCircle,
  Clock,
  ListTodo
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { questions, CATEGORIES, Question } from "./questions";

type QuizMode = "dashboard" | "practice" | "exam" | "flashcard" | "results" | "shared-score";

export default function App() {
  // App States
  const [currentMode, setCurrentMode] = useState<QuizMode>("dashboard");
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem("med_prep_name") || "";
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("med_prep_flagged");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Mode Specific States
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(0);
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [examTotalTime, setExamTotalTime] = useState<number>(0);
  const [practiceRevealed, setPracticeRevealed] = useState<Record<number, boolean>>({});
  const [flashcardFlipped, setFlashcardFlipped] = useState<boolean>(false);
  const [examLength, setExamLength] = useState<number>(25); // default exam questions

  // UI States
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [sharedScoreData, setSharedScoreData] = useState<{
    name: string;
    score: number;
    total: number;
    percentage: number;
    category?: string;
    date: string;
  } | null>(null);

  // Initialize and check for Shared Link in hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#share=")) {
        try {
          const base64Data = hash.substring(7);
          const decoded = JSON.parse(atob(base64Data));
          if (decoded && typeof decoded.score === "number") {
            setSharedScoreData({
              name: decoded.name || "Candidate Doctor",
              score: decoded.score,
              total: decoded.total || 116,
              percentage: Math.round((decoded.score / (decoded.total || 116)) * 100),
              category: decoded.category || undefined,
              date: decoded.date || new Date().toLocaleDateString()
            });
            setCurrentMode("shared-score");
          }
        } catch (e) {
          console.error("Failed to parse shared score", e);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Sync flagged questions with localStorage
  useEffect(() => {
    localStorage.setItem("med_prep_flagged", JSON.stringify(flaggedQuestions));
  }, [flaggedQuestions]);

  // Sync user name with localStorage
  useEffect(() => {
    localStorage.setItem("med_prep_name", userName);
  }, [userName]);

  // Exam Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentMode === "exam" && isExamActive && examTimeRemaining > 0) {
      timer = setInterval(() => {
        setExamTimeRemaining(prev => {
          if (prev <= 1) {
            // Auto-submit when time is up
            setIsExamActive(false);
            setCurrentMode("results");
            triggerToast("⌛ Time is up! Exam submitted automatically.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentMode, isExamActive, examTimeRemaining]);

  // Utility to show toasts
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Flag Toggle Handler
  const toggleFlag = (qId: number) => {
    setFlaggedQuestions(prev => {
      const isAlreadyFlagged = prev.includes(qId);
      if (isAlreadyFlagged) {
        triggerToast("Removed from flagged high-yield questions");
        return prev.filter(id => id !== qId);
      } else {
        triggerToast("Saved to flagged high-yield questions");
        return [...prev, qId];
      }
    });
  };

  // Set up quiz configuration
  const startQuiz = (mode: "practice" | "exam" | "flashcard", useOnlyFlagged = false) => {
    let list = [...questions];

    // Filter by Category if selected
    if (selectedCategory) {
      list = list.filter(q => q.category === selectedCategory);
    }

    // Filter by Flagged if requested
    if (useOnlyFlagged) {
      list = list.filter(q => flaggedQuestions.includes(q.id));
      if (list.length === 0) {
        triggerToast("No flagged questions in this category!");
        return;
      }
    }

    // Shuffle questions for randomized challenge
    list.sort(() => 0.5 - Math.random());

    // Slicing for Exam Mode lengths
    if (mode === "exam") {
      const actualLength = Math.min(examLength, list.length);
      list = list.slice(0, actualLength);
      // 60 seconds per question
      const allottedTime = actualLength * 60;
      setExamTimeRemaining(allottedTime);
      setExamTotalTime(allottedTime);
      setIsExamActive(true);
    } else {
      setIsExamActive(false);
    }

    setQuizQuestions(list);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setPracticeRevealed({});
    setFlashcardFlipped(false);
    setCurrentMode(mode);
  };

  // Score Calculation
  const examScore = useMemo(() => {
    let correctCount = 0;
    quizQuestions.forEach(q => {
      // Handle missing/blank answers gracefully (skip counting them or mark them as incorrect)
      if (q.correctIndex !== -1 && userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const totalAnswerable = quizQuestions.filter(q => q.correctIndex !== -1).length;
    return {
      correct: correctCount,
      total: quizQuestions.length,
      answerable: totalAnswerable,
      percentage: quizQuestions.length > 0 ? Math.round((correctCount / quizQuestions.length) * 100) : 0
    };
  }, [quizQuestions, userAnswers]);

  // Overall Statistics for Dashboard
  const dashboardStats = useMemo(() => {
    const total = questions.length;
    const incomplete = questions.filter(q => q.correctIndex === -1).length;
    const complete = total - incomplete;

    // Categorized breakdown
    const categoryStats: Record<string, { total: number; incomplete: number; completed: number }> = {};
    Object.values(CATEGORIES).forEach(cat => {
      categoryStats[cat] = { total: 0, incomplete: 0, completed: 0 };
    });

    questions.forEach(q => {
      if (categoryStats[q.category]) {
        categoryStats[q.category].total++;
        if (q.correctIndex === -1) {
          categoryStats[q.category].incomplete++;
        } else {
          categoryStats[q.category].completed++;
        }
      }
    });

    return {
      total,
      complete,
      incomplete,
      categoryStats
    };
  }, []);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Generate share link
  const copyShareLink = (scoreObj?: typeof examScore) => {
    const targetScore = scoreObj ? scoreObj.correct : examScore.correct;
    const targetTotal = scoreObj ? scoreObj.total : examScore.total;
    
    const payload = {
      name: userName || "Candidate Doctor",
      score: targetScore,
      total: targetTotal,
      category: selectedCategory || "All Categories",
      date: new Date().toLocaleDateString()
    };

    try {
      const base64 = btoa(JSON.stringify(payload));
      const shareUrl = `${window.location.origin}${window.location.pathname}#share=${base64}`;
      navigator.clipboard.writeText(shareUrl);
      triggerToast("✅ Shareable results link copied to clipboard!");
    } catch (e) {
      triggerToast("❌ Failed to generate share link.");
    }
  };

  // Print results / certificate
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] flex flex-col font-sans select-none antialiased text-stone-900">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a2d22] text-[#f7f4ed] px-6 py-3 rounded-none shadow-md flex items-center gap-3 border border-[#2b4c3e]"
            id="toast-notification"
          >
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Clinical Header */}
      <header className="bg-white border-b border-[#e6ded4] sticky top-0 z-40 print:hidden shadow-[0_2px_12px_rgba(0,0,0,0.01)]" id="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-4 cursor-pointer" 
            onClick={() => {
              setSelectedCategory(null);
              setCurrentMode("dashboard");
            }}
          >
            <div className="w-10 h-10 border border-stone-900 flex items-center justify-center text-stone-900 bg-[#fdfbf9]">
              <Activity className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h1 className="font-display font-serif font-bold text-xl sm:text-2xl text-stone-900 tracking-tight leading-none">MedBoard</h1>
              <p className="text-[9px] text-stone-500 font-mono font-medium tracking-[0.25em] uppercase mt-1">Practice Assessment Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* User Name Tag */}
            <div className="flex items-center gap-2 bg-[#fdfcfb] px-3.5 py-2 rounded-none border border-[#e6ded4]">
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Candidate:</span>
              <input
                type="text"
                placeholder="Candidate Doctor"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-xs font-serif font-bold text-stone-800 bg-transparent outline-none placeholder:text-stone-300 w-28 sm:w-36 focus:ring-0 rounded-none px-1 transition-all"
              />
            </div>

            {flaggedQuestions.length > 0 && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  startQuiz("practice", true);
                }}
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#fdfbf7] hover:bg-[#faf4e8] text-[#7c5312] rounded-none text-xs font-mono border border-[#d6c4a0] transition-all"
                title="Study flagged high-yield items"
                id="flagged-quick-study-btn"
              >
                <Bookmark className="w-3.5 h-3.5 fill-[#7c5312] text-[#7c5312]" />
                <span>High-Yield Review ({flaggedQuestions.length})</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        
        {/* VIEWING SHARED SCORE MODE */}
        {currentMode === "shared-score" && sharedScoreData && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto w-full bg-white rounded-none border border-[#e6ded4] shadow-md overflow-hidden p-8 sm:p-12 text-center"
            id="shared-score-card"
          >
            <div className="w-16 h-16 border border-stone-800 text-stone-800 rounded-none flex items-center justify-center mx-auto mb-6 bg-stone-50">
              <Award className="w-8 h-8 stroke-[1.25]" />
            </div>
            <p className="text-stone-500 font-mono text-[10px] tracking-[0.2em] font-semibold uppercase mb-2">SHARED PERFORMANCE REPORT</p>
            <h2 className="font-display font-serif font-bold text-2xl text-stone-900 mb-1">Board Readiness Verification</h2>
            <p className="text-xs font-mono text-stone-400 mb-6">Generated on {sharedScoreData.date}</p>

            <div className="bg-[#faf8f5] rounded-none p-6 border border-[#e6ded4] mb-8">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">Candidate</div>
              <div className="font-display font-serif font-bold text-xl text-stone-800 mb-4">{sharedScoreData.name}</div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border-r border-[#e6ded4] py-2">
                  <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-0.5">Score</div>
                  <div className="font-serif text-2xl font-bold text-stone-900">{sharedScoreData.score} / {sharedScoreData.total}</div>
                </div>
                <div className="py-2">
                  <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-0.5">Ready Percentage</div>
                  <div className="font-serif text-2xl font-bold text-stone-900">{sharedScoreData.percentage}%</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setSharedScoreData(null);
                  setCurrentMode("dashboard");
                  window.location.hash = "";
                }}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-[#fbf9f6] rounded-none font-sans uppercase tracking-wider font-semibold text-xs transition-all active:scale-[0.98]"
                id="take-challenge-btn"
              >
                Accept Challenge & Take the Quiz
              </button>
              <button
                onClick={() => {
                  setCurrentMode("dashboard");
                  window.location.hash = "";
                }}
                className="w-full py-3 hover:bg-stone-50 border border-stone-200 text-stone-600 rounded-none font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </motion.div>
        )}

        {/* DASHBOARD MODE */}
        {currentMode === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
            id="dashboard-container"
          >
            {/* Portal Welcome / Configuration Banner */}
            <div className="bg-[#1a2e26] text-[#faf6f0] rounded-none p-8 sm:p-12 border border-[#2b4c3e] relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2e5d48] text-emerald-100 rounded-none text-[10px] font-mono tracking-wider uppercase mb-4 border border-[#3e7d61]">
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  <span>Licensed Board Exam Bank</span>
                </div>
                <h2 className="font-display font-serif italic font-normal text-3xl sm:text-5xl text-[#f7f4ed] tracking-tight mb-4">
                  Medical Specialization Board Prep
                </h2>
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-serif mb-6">
                  Verify your diagnostic and clinical skills with 116 high-yield questions covering internal medicine, surgery, obstetrics, pediatrics, and more.
                </p>

                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2 bg-emerald-950/40 px-4 py-2 border border-[#2e5d48] text-xs font-mono">
                    <ListTodo className="w-4 h-4 text-emerald-400" />
                    <span className="text-stone-300"><strong className="text-[#f7f4ed] font-bold">{dashboardStats.total}</strong> HIGH-YIELD CASES</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-950/40 px-4 py-2 border border-[#2e5d48] text-xs font-mono">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span className="text-stone-300">STANDARDIZED TIME FORMAT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Config & Category Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Panel: Mode Customizer */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white border border-[#e6ded4] p-6 space-y-6 rounded-none shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <div>
                    <h3 className="font-display font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-2">1. Setup Your Challenge</h3>
                    <p className="text-xs text-stone-400 mt-1 font-sans">Select your testing filter and target parameters</p>
                  </div>

                  {/* Category Filter Select */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest block">Target Specialization</label>
                    <div className="relative">
                      <select
                        value={selectedCategory || ""}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                        className="w-full bg-[#fdfdfb] border border-[#dcd6cd] rounded-none px-4 py-3 text-xs font-serif font-bold text-stone-800 outline-none focus:border-stone-800 transition-all appearance-none cursor-pointer"
                        id="category-filter-select"
                      >
                        <option value="">All Board Subjects (116 questions)</option>
                        {Object.entries(CATEGORIES).map(([key, value]) => {
                          const count = questions.filter(q => q.category === value).length;
                          return (
                            <option key={key} value={value}>
                              {value} ({count} cases)
                            </option>
                          );
                        })}
                      </select>
                      <Filter className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Exam Length Parameter (Only used in Exam Mode) */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest block">Exam Question Length</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[10, 25, 50, 116].map((len) => {
                        // Max possible based on category
                        const availableCount = selectedCategory 
                          ? questions.filter(q => q.category === selectedCategory).length
                          : 116;
                        const isPowerDisabled = len > availableCount && len !== 116;
                        const activeLen = len > availableCount ? availableCount : len;

                        return (
                          <button
                            key={len}
                            type="button"
                            disabled={isPowerDisabled}
                            onClick={() => setExamLength(activeLen)}
                            className={`py-2 text-xs font-mono font-bold border transition-all rounded-none ${
                              (examLength === activeLen || (len === 116 && examLength === availableCount)) && !isPowerDisabled
                                ? "bg-stone-900 border-stone-900 text-white shadow-sm"
                                : isPowerDisabled
                                ? "bg-[#fbfbfb] border-stone-100 text-stone-300 cursor-not-allowed"
                                : "bg-white border-[#e6ded4] hover:border-stone-800 text-stone-700"
                            }`}
                          >
                            {len === 116 ? "All" : len}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Flagged-only toggle (if any flagged) */}
                  {flaggedQuestions.length > 0 && (
                    <div className="pt-2">
                      <button
                        onClick={() => startQuiz("practice", true)}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#faf7f0] hover:bg-[#faf4e8] text-[#7c5312] rounded-none text-xs font-mono font-bold border border-[#d6c4a0] transition-colors"
                        id="flagged-quiz-btn"
                      >
                        <Bookmark className="w-4 h-4 fill-[#7c5312] text-[#7c5312] animate-pulse" />
                        <span>High-Yield Practice ({flaggedQuestions.length})</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Performance Analytics Widget */}
                <div className="bg-white border border-[#e6ded4] p-6 rounded-none shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-2">
                    <h4 className="font-mono font-bold text-[10px] text-stone-500 uppercase tracking-widest">Exam Stats Breakdown</h4>
                    <TrendingUp className="w-4 h-4 text-stone-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500 font-medium">Flagged Items</span>
                      <span className="font-mono font-bold text-amber-800 bg-[#faf7f0] px-2 py-0.5 rounded-none border border-[#d6c4a0]">
                        {flaggedQuestions.length} saved
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500 font-medium">Exam Ready Pool</span>
                      <span className="font-mono font-bold text-[#1c3f24] bg-[#f1f5f2] px-2 py-0.5 rounded-none border border-[#a2bca8]">
                        {dashboardStats.complete} verified
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500 font-medium">Incomplete Stems</span>
                      <span className="font-mono font-bold text-stone-500 bg-stone-50 px-2 py-0.5 rounded-none border border-stone-200">
                        {dashboardStats.incomplete} preserved
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Modes Selector & Specialized Subjects */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Mode Grid Cards */}
                <div>
                  <h3 className="font-display font-serif font-bold text-xl text-stone-900 mb-4 pb-2 border-b border-[#e6ded4]">2. Select Mode to Begin</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {/* Practice Mode */}
                    <div 
                      onClick={() => startQuiz("practice")}
                      className="bg-white border border-[#e6ded4] hover:border-stone-900 p-6 rounded-none transition-all group flex flex-col justify-between cursor-pointer"
                      id="mode-card-practice"
                    >
                      <div>
                        <div className="w-10 h-10 border border-stone-200 bg-stone-50 text-stone-800 flex items-center justify-center mb-4 group-hover:bg-stone-950 group-hover:text-[#fbf9f6] group-hover:border-stone-950 transition-colors rounded-none">
                          <BookOpen className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <h4 className="font-display font-serif font-bold text-stone-900 text-base">Practice Mode</h4>
                        <p className="text-xs text-stone-500 mt-2 leading-relaxed font-sans">
                          Untimed active recall. Revealing clinical justifications with step-2 board reasoning immediately.
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-stone-800 font-serif italic text-xs mt-4 group-hover:underline">
                        <span>Begin Study</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Exam Mode */}
                    <div 
                      onClick={() => startQuiz("exam")}
                      className="bg-white border border-[#e6ded4] hover:border-stone-900 p-6 rounded-none transition-all group flex flex-col justify-between cursor-pointer"
                      id="mode-card-exam"
                    >
                      <div>
                        <div className="w-10 h-10 border border-stone-200 bg-stone-50 text-stone-800 flex items-center justify-center mb-4 group-hover:bg-stone-950 group-hover:text-[#fbf9f6] group-hover:border-stone-950 transition-colors rounded-none">
                          <Timer className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <h4 className="font-display font-serif font-bold text-stone-900 text-base">Timed Exam</h4>
                        <p className="text-xs text-stone-500 mt-2 leading-relaxed font-sans">
                          Simulated board testing environment. Strict time of 60s per question. Score analysis revealed at completion.
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-stone-800 font-serif italic text-xs mt-4 group-hover:underline">
                        <span>Launch Simulation</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Flashcard Mode */}
                    <div 
                      onClick={() => startQuiz("flashcard")}
                      className="bg-white border border-[#e6ded4] hover:border-stone-900 p-6 rounded-none transition-all group flex flex-col justify-between cursor-pointer"
                      id="mode-card-flashcard"
                    >
                      <div>
                        <div className="w-10 h-10 border border-stone-200 bg-stone-50 text-stone-800 flex items-center justify-center mb-4 group-hover:bg-stone-950 group-hover:text-[#fbf9f6] group-hover:border-stone-950 transition-colors rounded-none">
                          <HelpCircle className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <h4 className="font-display font-serif font-bold text-stone-900 text-base">Rapid Flashcard</h4>
                        <p className="text-xs text-stone-500 mt-2 leading-relaxed font-sans">
                          Ideal for rapid review. Click cards to instantly flip and reveal answer keys and justifications.
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-stone-800 font-serif italic text-xs mt-4 group-hover:underline">
                        <span>Launch Flashcards</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Category List Panel */}
                <div>
                  <h3 className="font-display font-serif font-bold text-xl text-stone-900 mb-4 pb-2 border-b border-[#e6ded4]">Board Specialty Directory</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(CATEGORIES).map(([key, val]) => {
                      const count = questions.filter(q => q.category === val).length;
                      const isTarget = selectedCategory === val;
                      return (
                        <div
                          key={key}
                          onClick={() => setSelectedCategory(isTarget ? null : val)}
                          className={`p-4 rounded-none border cursor-pointer transition-all flex items-center justify-between ${
                            isTarget 
                              ? "bg-[#faf7f2] border-stone-900 shadow-sm" 
                              : "bg-white border-[#e6ded4] hover:border-stone-400"
                          }`}
                          id={`subject-card-${key}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-none border flex items-center justify-center text-xs font-serif italic ${
                              isTarget ? "bg-stone-900 text-[#fbf9f6] border-stone-900" : "bg-stone-50 text-stone-600 border-stone-200"
                            }`}>
                              {key}
                            </div>
                            <div>
                              <div className="text-xs font-serif font-bold text-stone-800 leading-tight">{val}</div>
                              <div className="text-[10px] text-stone-400 font-mono mt-1">{count} Exam Questions</div>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-none border flex items-center justify-center transition-all ${
                            isTarget ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200"
                          }`}>
                            {isTarget && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* ACTIVE PRACTICE OR EXAM CHALLENGE */}
        {(currentMode === "practice" || currentMode === "exam") && quizQuestions.length > 0 && (
          <div className="max-w-4xl mx-auto w-full space-y-6 animate-fade-in" id="active-quiz-viewport">
            
            {/* Header: Progress, Timer, Flags */}
            <div className="bg-white border border-[#e6ded4] p-5 rounded-none flex flex-wrap items-center justify-between gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              
              {/* Left: Info */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-bold text-stone-700 bg-[#faf8f5] border border-[#e6ded4] px-2.5 py-1 rounded-none uppercase tracking-wider">
                  Case {currentQuestionIndex + 1} / {quizQuestions.length}
                </span>
                <span className="hidden sm:inline-block font-display font-serif italic text-sm text-stone-700">
                  {quizQuestions[currentQuestionIndex].category}
                </span>
              </div>

              {/* Center: Timer for Exam */}
              {currentMode === "exam" && (
                <div className="flex items-center gap-2 bg-[#faf1ef] border border-[#e0b0a5] text-[#622314] px-4 py-1.5 rounded-none font-mono text-xs font-semibold tracking-wider">
                  <Timer className={`w-4 h-4 ${examTimeRemaining < 60 ? "animate-spin text-rose-600" : "animate-pulse"}`} />
                  <span className="font-bold tracking-widest">{formatTime(examTimeRemaining)}</span>
                </div>
              )}

              {/* Right: Flag Case & Exit */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFlag(quizQuestions[currentQuestionIndex].id)}
                  className={`p-2 rounded-none border transition-colors ${
                    flaggedQuestions.includes(quizQuestions[currentQuestionIndex].id)
                      ? "bg-[#faf7f0] border-[#d6c4a0] text-[#7c5312]"
                      : "bg-[#fdfcfb] border-stone-200 text-stone-400 hover:text-stone-800"
                  }`}
                  title="Flag this case as High-Yield review"
                  id="flag-case-btn"
                >
                  <Bookmark className={`w-4 h-4 ${flaggedQuestions.includes(quizQuestions[currentQuestionIndex].id) ? "fill-[#7c5312] text-[#7c5312]" : ""}`} />
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to exit? Your current progress will be reset.")) {
                      setCurrentMode("dashboard");
                    }
                  }}
                  className="px-4 py-1.5 bg-white border border-[#e6ded4] hover:border-stone-800 text-stone-600 hover:text-stone-900 rounded-none text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
                  id="exit-quiz-btn"
                >
                  Exit
                </button>
              </div>

            </div>

            {/* Custom Interactive Progress Bar */}
            <div className="w-full bg-[#e6ded4] h-[3px] rounded-none overflow-hidden">
              <div 
                className="bg-stone-900 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>

            {/* Main Question Card */}
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-white border border-[#e6ded4] p-8 sm:p-12 space-y-8 rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.015)] relative"
              id={`question-card-${quizQuestions[currentQuestionIndex].id}`}
            >
              
              {/* Question Stem */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Question Case Stem #{quizQuestions[currentQuestionIndex].id}</span>
                  {/* If incomplete question stem, warn the user clearly */}
                  {quizQuestions[currentQuestionIndex].correctIndex === -1 && (
                    <span className="bg-[#faf7f0] text-[#7c5312] border border-[#d6c4a0] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-none flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-[#7c5312]" />
                      Omitted Item
                    </span>
                  )}
                </div>
                <h3 className="font-display font-serif font-bold text-lg sm:text-2xl text-stone-950 leading-relaxed tracking-tight">
                  {quizQuestions[currentQuestionIndex].question}
                </h3>
              </div>

              {/* Options Stack */}
              <div className="space-y-4">
                {quizQuestions[currentQuestionIndex].options.map((opt, oIdx) => {
                  const qId = quizQuestions[currentQuestionIndex].id;
                  const isSelected = userAnswers[qId] === oIdx;
                  const isRevealed = currentMode === "practice" && practiceRevealed[qId];
                  const isCorrectAnswer = oIdx === quizQuestions[currentQuestionIndex].correctIndex;
                  const isWrongSelection = isSelected && !isCorrectAnswer;

                  // Skip empty placeholder options entirely to keep it pristine
                  if (opt === "[blank]" || opt.includes("[blank]") || opt === "[other options to be filled]") {
                    return (
                      <div 
                        key={oIdx} 
                        className="py-3 px-4 rounded-none bg-[#faf8f5]/60 border border-[#e6ded4] text-stone-400 text-xs italic font-serif flex items-center justify-between"
                      >
                        <span>Option {String.fromCharCode(65 + oIdx)}: [Omitted in Source Exam]</span>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-stone-400">Blank</span>
                      </div>
                    );
                  }

                  // Styles for options depending on active quiz modes
                  let buttonStyle = "border-[#e6ded4] hover:border-stone-800 hover:bg-[#faf9f6]";
                  let badgeStyle = "bg-stone-50 text-stone-700 border-stone-200 font-serif italic";

                  if (isRevealed) {
                    if (isCorrectAnswer) {
                      buttonStyle = "bg-[#f1f5f2] border-emerald-600 text-emerald-950 ring-1 ring-emerald-600/30";
                      badgeStyle = "bg-emerald-600 text-white border-emerald-600 font-serif italic";
                    } else if (isWrongSelection) {
                      buttonStyle = "bg-[#faf1ef] border-rose-400 text-rose-950";
                      badgeStyle = "bg-rose-500 text-white border-rose-500 font-serif italic";
                    } else {
                      buttonStyle = "opacity-50 border-stone-100 bg-[#fbfbfb]";
                    }
                  } else if (isSelected) {
                    buttonStyle = "bg-[#faf8f5] border-stone-900 text-stone-950 ring-1 ring-stone-900";
                    badgeStyle = "bg-stone-900 text-white border-stone-900 font-serif italic";
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={isRevealed || quizQuestions[currentQuestionIndex].correctIndex === -1}
                      onClick={() => {
                        setUserAnswers(prev => ({ ...prev, [qId]: oIdx }));
                        if (currentMode === "practice") {
                          setPracticeRevealed(prev => ({ ...prev, [qId]: true }));
                        }
                      }}
                      className={`w-full p-4 rounded-none border text-left font-medium text-sm transition-all flex items-center gap-4 ${buttonStyle} leading-normal active:scale-[0.99] group`}
                      id={`opt-btn-${qId}-${oIdx}`}
                    >
                      <span className={`w-8 h-8 rounded-none border flex items-center justify-center font-bold text-xs shrink-0 transition-all ${badgeStyle}`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="flex-1 font-sans text-stone-800">{opt.replace(/^[A-D1-4]\.\s*/, "")}</span>
                      
                      {/* Checkmarks & Crosses for Practice mode reviews */}
                      {isRevealed && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 animate-pulse" />
                      )}
                      {isRevealed && isWrongSelection && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* RATIONALE ACCORDION FOR PRACTICE MODE */}
              {currentMode === "practice" && practiceRevealed[quizQuestions[currentQuestionIndex].id] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#fcfaf7] border-l-4 border-stone-800 p-6 space-y-3 rounded-none border-t border-r border-b border-[#e6ded4]"
                  id="clinical-justification-panel"
                >
                  <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider font-mono">
                    <Activity className="w-4 h-4 text-stone-700" />
                    <span>Clinical Justification &amp; Board Reasoning</span>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed font-serif">
                    {quizQuestions[currentQuestionIndex].justification || "No rationale available for this placeholder question."}
                  </p>
                </motion.div>
              )}

            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between" id="navigation-bar">
              <button
                onClick={() => {
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(prev => prev - 1);
                  }
                }}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 bg-white border border-[#e6ded4] hover:border-stone-800 text-stone-700 hover:bg-[#faf9f6] disabled:opacity-40 disabled:cursor-not-allowed rounded-none font-mono text-xs uppercase tracking-wider font-bold transition-all"
                id="prev-btn"
              >
                <ChevronLeft className="w-4 h-4 inline mr-1" />
                <span>Prev Case</span>
              </button>

              <div className="flex items-center gap-2">
                {/* Submit button for timely review or early finalization */}
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to finish the quiz and view your scoreboard?")) {
                      setIsExamActive(false);
                      setCurrentMode("results");
                    }
                  }}
                  className="px-4 py-2.5 bg-[#faf1ef] border border-[#e0b0a5] text-[#622314] hover:bg-[#f6e4e1] rounded-none font-mono font-bold uppercase tracking-wider text-xs transition-colors"
                  id="finish-early-btn"
                >
                  Finish Challenge
                </button>

                {currentQuestionIndex < quizQuestions.length - 1 ? (
                  <button
                    onClick={() => {
                      setCurrentQuestionIndex(prev => prev + 1);
                    }}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-none font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all active:scale-95"
                    id="next-btn"
                  >
                    <span>Next Case</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsExamActive(false);
                      setCurrentMode("results");
                    }}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-none font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all active:scale-95 animate-pulse"
                    id="view-results-btn"
                  >
                    <span>View Results</span>
                    <Award className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {/* FLASHCARD MODE */}
        {currentMode === "flashcard" && quizQuestions.length > 0 && (
          <div className="max-w-2xl mx-auto w-full space-y-6" id="flashcard-container">
            
            {/* Flashcard Header Controls */}
            <div className="bg-white border border-[#e6ded4] p-5 rounded-none flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              <span className="font-mono text-[10px] font-bold text-[#7c5312] bg-[#faf7f0] border border-[#d6c4a0] px-2.5 py-1 rounded-none uppercase tracking-wider">
                Card {currentQuestionIndex + 1} / {quizQuestions.length}
              </span>
              <span className="font-display font-serif italic text-stone-700">
                {quizQuestions[currentQuestionIndex].category}
              </span>
              <button
                onClick={() => setCurrentMode("dashboard")}
                className="px-4 py-1.5 bg-white border border-[#e6ded4] hover:border-stone-800 text-stone-600 hover:text-stone-900 rounded-none text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
              >
                Exit
              </button>
            </div>

            {/* Animated Card Fliping */}
            <div 
              onClick={() => setFlashcardFlipped(prev => !prev)}
              className="w-full h-80 cursor-pointer [perspective:1000px]"
              id="flashcard-card"
            >
              <div className={`relative w-full h-full duration-500 [transform-style:preserve-3d] ${flashcardFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
                
                {/* Front Side */}
                <div className="absolute w-full h-full bg-white rounded-none border border-[#e6ded4] shadow-md p-8 sm:p-12 flex flex-col justify-between [backface-visibility:hidden]">
                  <div className="space-y-4">
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest font-mono">QUESTION CASE FRONT</p>
                    <h3 className="font-display font-serif font-bold text-lg sm:text-xl text-stone-900 leading-relaxed">
                      {quizQuestions[currentQuestionIndex].question}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-800 font-serif italic border-t border-stone-100 pt-4">
                    <span>Click card to flip and reveal diagnosis</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-[#1c2e24] text-[#f7f4ed] rounded-none p-8 sm:p-12 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] border border-[#2e503d]">
                  <div className="space-y-4 overflow-y-auto pr-1">
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">CORRECT EXAM ANSWER KEY</p>
                    
                    {quizQuestions[currentQuestionIndex].correctIndex === -1 ? (
                      <div className="text-amber-300 text-sm font-mono uppercase tracking-wider">
                        This is an incomplete question from the exam.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-2xl font-serif italic text-emerald-300 border-b border-[#2e503d] pb-2">
                          Option {quizQuestions[currentQuestionIndex].correctAnswer}
                        </div>
                        <p className="text-stone-300 text-sm leading-relaxed font-serif">
                          {quizQuestions[currentQuestionIndex].justification}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-emerald-400/70 text-center font-bold uppercase tracking-widest mt-2 border-t border-[#2e503d] pt-3">
                    Click card to flip back to question
                  </div>
                </div>

              </div>
            </div>

            {/* Flashcard Nav controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(prev => prev - 1);
                    setFlashcardFlipped(false);
                  }
                }}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 bg-white border border-[#e6ded4] hover:border-stone-800 text-stone-700 hover:bg-[#faf9f6] disabled:opacity-40 disabled:cursor-not-allowed rounded-none font-mono text-xs uppercase tracking-wider font-bold transition-all"
              >
                Previous Card
              </button>

              <button
                onClick={() => {
                  if (currentQuestionIndex < quizQuestions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                    setFlashcardFlipped(false);
                  } else {
                    triggerToast("You have completed all cards!");
                    setCurrentMode("dashboard");
                  }
                }}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-none font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95"
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? "Next Card" : "Finish Review"}
              </button>
            </div>

          </div>
        )}

        {/* RESULTS & PERFORMANCE SCORECARD */}
        {currentMode === "results" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto w-full space-y-8"
            id="results-container"
          >
            {/* Top Score summary widget */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Score breakdown Ring */}
              <div className="bg-white border border-[#e6ded4] p-8 rounded-none shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest mb-6">Board Exam Score</span>
                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                  
                  {/* Circular progress bar SVG */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="54"
                      className="stroke-stone-100"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="54"
                      className="stroke-stone-900 transition-all duration-1000"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 54}
                      strokeDashoffset={2 * Math.PI * 54 * (1 - examScore.percentage / 100)}
                    />
                  </svg>

                  <div className="absolute text-center">
                    <span className="font-serif text-3xl font-extrabold text-stone-900 leading-none">{examScore.percentage}%</span>
                    <div className="text-[9px] text-stone-400 uppercase tracking-wider font-bold mt-1">Accuracy</div>
                  </div>
                </div>

                <div className="font-serif italic text-sm text-stone-600">
                  {examScore.correct} of {examScore.total} Correct Answers
                </div>
              </div>

              {/* Diagnostic Assessment message card */}
              <div className="bg-white border border-[#e6ded4] p-8 rounded-none shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col justify-between md:col-span-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fbf9f6] border border-[#e6ded4] rounded-none text-[10px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-4">
                    <Award className="w-3.5 h-3.5 text-stone-800" />
                    <span>Evaluation Report</span>
                  </div>
                  <h3 className="font-display font-serif font-bold text-2xl text-stone-950 mb-2">
                    {examScore.percentage >= 90 
                      ? "Expert Clinical Proficiency" 
                      : examScore.percentage >= 75 
                      ? "Board Ready Performance" 
                      : examScore.percentage >= 50 
                      ? "Candidate Development Needed" 
                      : "Remedial Study Required"}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed font-serif">
                    {examScore.percentage >= 90 
                      ? "Outstanding medical accuracy. You possess exceptional clinical reasoning and diagnostic criteria safety. Excellent candidate readiness." 
                      : examScore.percentage >= 75 
                      ? "Strong medical foundations. Your diagnosis matches board specifications closely. Keep reviewing flagged cases to master every sub-specialty." 
                      : examScore.percentage >= 50 
                      ? "Decent score with several diagnostic gaps. Focus on pediatric and surgical sections, review explanations, and retry category-specific sets." 
                      : "Severe gaps detected. Spend dedicated time with flashcards and clinical justifications to improve core safety parameters."}
                  </p>
                </div>

                {/* Primary controls */}
                <div className="flex flex-wrap items-center gap-3 mt-8 border-t border-stone-100 pt-6">
                  <button
                    onClick={() => startQuiz("practice")}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-none font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95"
                    id="retry-quiz-btn"
                  >
                    Retry Active Set
                  </button>
                  <button
                    onClick={() => copyShareLink()}
                    className="px-4 py-2.5 bg-white border border-[#e6ded4] hover:border-stone-800 text-stone-700 rounded-none font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all"
                    id="share-results-btn"
                  >
                    <Share2 className="w-3.5 h-3.5 text-stone-500" />
                    <span>Share Results Link</span>
                  </button>
                  {examScore.percentage >= 70 && (
                    <button
                      onClick={() => setShowCertificate(true)}
                      className="px-4 py-2.5 bg-[#faf7f0] hover:bg-[#faf4e8] text-[#7c5312] border border-[#d6c4a0] rounded-none font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all"
                      id="view-certificate-btn"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#7c5312]" />
                      <span>Print Board Certificate</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setCurrentMode("dashboard");
                    }}
                    className="px-4 py-2.5 hover:underline text-stone-600 rounded-none font-serif text-xs italic"
                  >
                    Back to Portal
                  </button>
                </div>
              </div>

            </div>

            {/* DYNAMIC CERTIFICATE MODAL SCREEN */}
            {showCertificate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:p-0 print:static print:bg-transparent"
                id="certificate-modal"
              >
                <div className="bg-white rounded-none shadow-2xl max-w-2xl w-full p-8 sm:p-12 relative border-[12px] border-double border-stone-800 overflow-hidden print:shadow-none print:border-stone-800 print:p-8">
                  {/* Watermark decorations */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
                  
                  {/* Certificate Content */}
                  <div className="text-center space-y-6 relative z-10">
                    <div className="w-20 h-20 bg-[#faf8f5] text-stone-900 rounded-none flex items-center justify-center mx-auto border-2 border-stone-800">
                      <Award className="w-10 h-10 stroke-[1.25]" />
                    </div>
                    
                    <div className="space-y-1">
                      <h2 className="font-display font-serif font-bold text-2xl uppercase tracking-widest text-stone-900">MedBoard Verification</h2>
                      <p className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-stone-500">Certificate of Clinical Excellence</p>
                    </div>

                    <div className="py-2 border-t border-b border-stone-100 max-w-xs mx-auto text-[9px] text-stone-400 font-mono tracking-widest">
                      THIS CERTIFICATE IS OFFICIALLY PRESENTED TO
                    </div>

                    <div className="font-display font-serif italic text-3xl text-stone-900 py-1 select-text">
                      {userName || "Candidate Doctor"}
                    </div>

                    <p className="text-sm text-stone-600 leading-relaxed max-w-md mx-auto font-serif">
                      For successfully reviewing and passing the standardized medical specialty assessment challenge, scoring <strong className="text-stone-950 font-sans font-bold">{examScore.correct} correct cases</strong> with an exceptional evaluation accuracy of <strong className="text-stone-950 font-sans font-bold">{examScore.percentage}%</strong>.
                    </p>

                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-4 text-left border-t border-stone-100">
                      <div>
                        <div className="text-[9px] text-stone-400 font-mono uppercase tracking-wider">Date Granted</div>
                        <div className="text-xs font-semibold text-stone-700 font-mono">{new Date().toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-stone-400 font-mono uppercase tracking-wider">Specialty Pool</div>
                        <div className="text-xs font-serif italic font-semibold text-stone-700 truncate">{selectedCategory || "Full Generalist"}</div>
                      </div>
                    </div>

                    {/* Footer Seal */}
                    <div className="pt-6 flex items-center justify-between text-[9px] text-stone-400 font-mono border-t border-stone-50">
                      <span>VERIFIED SECURITY STAMP: #MB-{Math.floor(Math.random() * 900000 + 100000)}</span>
                      <span className="text-stone-800 font-bold uppercase tracking-wider">MedPrep Board Authority</span>
                    </div>
                  </div>

                  {/* Print / Close controls */}
                  <div className="absolute top-4 right-4 flex gap-2 print:hidden">
                    <button
                      onClick={handlePrint}
                      className="p-2 bg-stone-50 hover:bg-stone-100 text-stone-600 rounded-none border border-stone-200 transition-colors"
                      title="Print Certificate"
                      id="print-certificate-trigger"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowCertificate(false)}
                      className="p-2 bg-stone-50 hover:bg-stone-100 text-stone-600 rounded-none border border-stone-200 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Detailed Cases review list */}
            <div className="bg-white border border-[#e6ded4] p-8 rounded-none shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-6">
              <div>
                <h3 className="font-display font-serif font-bold text-xl text-stone-900">Case-by-Case Diagnostic Review</h3>
                <p className="text-xs text-stone-400 mt-1">Carefully study correct keys and explanations to strengthen board reasoning</p>
              </div>

              <div className="space-y-6" id="case-review-list">
                {quizQuestions.map((q, qIdx) => {
                  const uAnswerIdx = userAnswers[q.id];
                  const isCorrect = q.correctIndex !== -1 && uAnswerIdx === q.correctIndex;
                  const isSkipped = uAnswerIdx === undefined;

                  return (
                    <div 
                      key={q.id}
                      className={`p-6 rounded-none border transition-all ${
                        isSkipped 
                          ? "bg-[#fbfbfb] border-stone-200" 
                          : isCorrect 
                          ? "bg-[#f1f5f2] border-emerald-200 hover:bg-[#ebf0ec]" 
                          : "bg-[#faf1ef] border-rose-200 hover:bg-[#f5e7e4]"
                      }`}
                      id={`review-case-${q.id}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-stone-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-stone-500">CASE #{q.id}</span>
                          <span className="text-[9px] text-stone-400 font-mono uppercase tracking-wider">{q.category}</span>
                        </div>
                        
                        {/* Status tag */}
                        {q.correctIndex === -1 ? (
                          <span className="text-[9px] font-mono font-bold text-[#7c5312] bg-[#faf7f0] px-2.5 py-0.5 border border-[#d6c4a0] uppercase tracking-wider">Omitted Item</span>
                        ) : isSkipped ? (
                          <span className="text-[9px] font-mono font-bold text-stone-500 bg-stone-100 px-2.5 py-0.5 border border-stone-200 uppercase tracking-wider">Skipped</span>
                        ) : isCorrect ? (
                          <span className="text-[9px] font-mono font-bold text-emerald-800 bg-[#e3ebe5] px-2.5 py-0.5 border border-emerald-300 uppercase tracking-wider">Correct Diagnostic</span>
                        ) : (
                          <span className="text-[9px] font-mono font-bold text-rose-800 bg-[#f4e2de] px-2.5 py-0.5 border border-rose-300 uppercase tracking-wider">Incorrect Diagnostic</span>
                        )}
                      </div>

                      <h4 className="font-display font-serif font-bold text-base text-stone-900 leading-relaxed mb-4">{q.question}</h4>

                      {/* Display what user answered vs correct answer */}
                      {q.correctIndex !== -1 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                          <div className="bg-white p-4 rounded-none border border-stone-200">
                            <span className="text-[9px] text-stone-400 font-mono uppercase tracking-wider block mb-1">Your Diagnostic Choice</span>
                            {isSkipped ? (
                              <span className="text-stone-400 italic">No selection recorded</span>
                            ) : (
                              <span className={`font-serif font-bold ${isCorrect ? "text-emerald-800" : "text-rose-800"}`}>
                                {q.options[uAnswerIdx]}
                              </span>
                            )}
                          </div>
                          <div className="bg-white p-4 rounded-none border border-stone-200">
                            <span className="text-[9px] text-stone-400 font-mono uppercase tracking-wider block mb-1">Correct Official Key</span>
                            <span className="font-serif font-bold text-stone-900">
                              {q.options[q.correctIndex]}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Justification */}
                      <p className="text-xs text-stone-600 leading-relaxed bg-white p-4 border border-stone-200">
                        <strong className="text-[9px] text-stone-800 font-mono uppercase tracking-widest block mb-1.5">Board Justification Explanation</strong>
                        <span className="font-serif leading-relaxed text-stone-600">{q.justification || "Clinical documentation is incomplete in current exam version."}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}

      </main>

      {/* Footer copyright */}
      <footer className="bg-white border-t border-[#e6ded4] py-8 mt-12 print:hidden text-center text-xs text-stone-500 font-serif italic">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} MedBoard Practice Assessment Portal. Designed for active clinician recall.</p>
        </div>
      </footer>
    </div>
  );
}
