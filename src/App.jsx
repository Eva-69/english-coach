import { useState, useRef, useEffect } from "react";
import {
  Send, Sparkles, CheckCircle2, Circle, RotateCcw, ChevronRight,
  Volume2, Trophy, Calendar, MessageCircle, BookOpen, Shuffle,
  Coffee, Users, Loader2, X, Settings, Key, AlertTriangle, Mail,
  Phone, Users2,
} from "lucide-react";
import { SENTENCES, PLAN, normalize, allSentences } from "./data.js";

// =============================================================================
// HELPERS
// =============================================================================

// LocalStorage helpers
const STORAGE_KEYS = {
  apiKey: "english-coach:api-key",
  model: "english-coach:model",
  completedDays: "english-coach:completed-days",
};

const loadKey = (k, fallback) => {
  try {
    const v = localStorage.getItem(k);
    return v === null ? fallback : v;
  } catch {
    return fallback;
  }
};
const saveKey = (k, v) => {
  try { localStorage.setItem(k, v); } catch { /* ignore */ }
};

// =============================================================================
// MAIN APP
// =============================================================================

export default function App() {
  const [view, setView] = useState("plan");
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.completedDays);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [showSettings, setShowSettings] = useState(false);

  const toggleDay = (d) => {
    const next = new Set(completedDays);
    if (next.has(d)) next.delete(d); else next.add(d);
    setCompletedDays(next);
    try { localStorage.setItem(STORAGE_KEYS.completedDays, JSON.stringify([...next])); } catch { /* ignore */ }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=DM+Sans:wght@400;500;600;700&display=swap');
        body { margin: 0; }
        .font-display { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
        .font-body { font-family: 'DM Sans', system-ui, -apple-system, sans-serif; }
        .paper-grain {
          background-color: #faf6ef;
          background-image:
            radial-gradient(circle at 20% 30%, rgba(201, 117, 84, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(61, 90, 69, 0.05) 0%, transparent 50%);
        }
        .ink-shadow { box-shadow: 0 1px 0 rgba(28, 40, 37, 0.04), 0 4px 16px -4px rgba(28, 40, 37, 0.08); }
        .ink-shadow-deep { box-shadow: 0 2px 0 rgba(28, 40, 37, 0.06), 0 8px 24px -6px rgba(28, 40, 37, 0.12); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .anim-slide-up { animation: slideUp 0.3s ease-out forwards; }
        @keyframes pulse-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .anim-pulse { animation: pulse-soft 1.4s ease-in-out infinite; }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(28, 40, 37, 0.15); border-radius: 3px; }
      `}</style>

      <div className="font-body min-h-screen paper-grain text-stone-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <Header progress={completedDays.size} onSettings={() => setShowSettings(true)} />
          <Nav view={view} setView={setView} />

          <main className="mt-6">
            {view === "plan" && <PlanView completedDays={completedDays} toggleDay={toggleDay} onJump={setView} />}
            {view === "sentences" && <SentencesView />}
            {view === "quiz" && <QuizView />}
            {view === "chat" && <ChatView openSettings={() => setShowSettings(true)} />}
          </main>

          <footer className="mt-16 pt-8 border-t border-stone-900/10 text-center text-xs text-stone-500">
            <p className="font-display italic">Three months. One step at a time. You've got this.</p>
          </footer>
        </div>

        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      </div>
    </>
  );
}

// =============================================================================
// HEADER
// =============================================================================

function Header({ progress, onSettings }) {
  const pct = Math.round((progress / 60) * 100);
  return (
    <header className="mb-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Personal English Coach</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-medium leading-[1.05] text-stone-900">
            你的<span className="italic text-[#3d5a45]">日常英语</span>
            <br />
            <span className="text-[#c97554]">60 天</span>计划
          </h1>
          <p className="mt-3 text-sm text-stone-600 max-w-md">
            目标: 三个月内能流畅日常对话。每天 30 分钟，按部就班。
          </p>
        </div>

        <div className="flex items-start gap-2 shrink-0">
          <button
            onClick={onSettings}
            className="text-stone-500 hover:text-stone-900 p-2 rounded-lg hover:bg-stone-900/5 transition-colors"
            aria-label="Settings"
            title="设定"
          >
            <Settings className="w-4 h-4" />
          </button>
          <div className="hidden sm:block text-right">
            <div className="font-display text-5xl font-semibold text-[#3d5a45]">
              {progress}<span className="text-stone-300 text-3xl">/60</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-stone-500 mt-1">Days done</div>
            <div className="mt-2 w-32 h-1 bg-stone-200 rounded-full overflow-hidden ml-auto">
              <div className="h-full bg-[#3d5a45] transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden mt-4 flex items-center gap-3">
        <div className="font-display text-2xl font-semibold text-[#3d5a45]">
          {progress}<span className="text-stone-300">/60</span>
        </div>
        <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#3d5a45] transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </header>
  );
}

// =============================================================================
// SETTINGS MODAL
// =============================================================================

function SettingsModal({ onClose }) {
  const [apiKey, setApiKey] = useState(() => loadKey(STORAGE_KEYS.apiKey, ""));
  const [model, setModel] = useState(() => loadKey(STORAGE_KEYS.model, "claude-haiku-4-5-20251001"));
  const [saved, setSaved] = useState(false);

  const save = () => {
    saveKey(STORAGE_KEYS.apiKey, apiKey.trim());
    saveKey(STORAGE_KEYS.model, model.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const clear = () => {
    if (!confirm("确定要清除 API key 吗？")) return;
    setApiKey("");
    saveKey(STORAGE_KEYS.apiKey, "");
  };

  return (
    <div className="fixed inset-0 bg-stone-900/50 z-50 flex items-center justify-center p-4 anim-slide-up" onClick={onClose}>
      <div className="bg-[#fffcf5] rounded-2xl ink-shadow-deep max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5" /> 设定
            </h2>
            <button onClick={onClose} className="text-stone-500 hover:text-stone-900 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-[#c97554]/10 border border-[#c97554]/30 rounded-xl p-4 mb-5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#c97554] shrink-0 mt-0.5" />
              <div className="text-xs text-stone-700 leading-relaxed">
                <strong className="text-[#c97554]">安全提醒:</strong> 你的 API key 会存在浏览器的 localStorage，<u>仅限自己电脑使用</u>。
                如果把这个网站公开（例如 GitHub Pages 公开网址），<strong>不要在公开版本上输入 key</strong> ——
                任何打开开发者工具的人都能看到它，会被盗用烧你的额度。
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2 flex items-center gap-1.5">
              <Key className="w-4 h-4" /> Anthropic API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="w-full px-3 py-2.5 bg-white border-2 border-stone-900/15 rounded-lg text-sm font-mono focus:outline-none focus:border-[#3d5a45]"
            />
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
              在 <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-[#3d5a45] underline">console.anthropic.com</a> 取得。只用在「对话练习」功能。
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border-2 border-stone-900/15 rounded-lg text-sm focus:outline-none focus:border-[#3d5a45]"
            >
              <option value="claude-haiku-4-5-20251001">Claude Haiku 4.5 (便宜、够用)</option>
              <option value="claude-sonnet-4-5">Claude Sonnet 4.5 (更好)</option>
              <option value="claude-opus-4-5">Claude Opus 4.5 (最强、贵)</option>
            </select>
            <p className="text-xs text-stone-500 mt-1.5">A2-B1 闲聊用 Haiku 完全够。</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={save}
              className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
            >
              {saved ? "✓ 已存" : "存档"}
            </button>
            {apiKey && (
              <button onClick={clear} className="px-4 py-2.5 border border-stone-900/15 hover:border-[#c97554] hover:text-[#c97554] rounded-lg text-stone-700 transition-colors text-sm">
                清除
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// NAV
// =============================================================================

function Nav({ view, setView }) {
  const tabs = [
    { id: "plan", label: "学习计划", icon: Calendar },
    { id: "sentences", label: "句子练习", icon: BookOpen },
    { id: "quiz", label: "随机测验", icon: Shuffle },
    { id: "chat", label: "对话练习", icon: MessageCircle },
  ];

  return (
    <nav className="flex gap-1 sm:gap-2 p-1 bg-stone-900/[0.04] rounded-xl ink-shadow border border-stone-900/5">
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = view === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setView(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              active ? "bg-stone-900 text-stone-50 shadow-md" : "text-stone-600 hover:text-stone-900 hover:bg-stone-900/5"
            }`}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// =============================================================================
// PLAN VIEW
// =============================================================================

function PlanView({ completedDays, toggleDay, onJump }) {
  const [openDay, setOpenDay] = useState(null);
  const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="anim-slide-up">
      <div className="bg-[#fffcf5] border border-stone-900/10 rounded-2xl p-5 sm:p-6 ink-shadow mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3d5a45] text-stone-50 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-stone-900 mb-1">How this works</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              每天 5 个小任务，30 分钟以内。每周第 7 天是
              <span className="font-semibold text-[#c97554]"> 🏆 小测验</span>
              检查点。点开任何一天看详细任务，做完就打勾。
            </p>
          </div>
        </div>
      </div>

      {weeks.map((w) => {
        const days = PLAN.filter((d) => d.week === w);
        const weekDone = days.filter((d) => completedDays.has(d.day)).length;
        return (
          <section key={w} className="mb-8">
            <div className="flex items-baseline justify-between mb-3 px-1">
              <h3 className="font-display text-2xl font-medium text-stone-900">
                Week <span className="italic text-[#3d5a45]">{w}</span>
                {w === 10 && <span className="ml-2 text-base text-stone-500">(收尾)</span>}
              </h3>
              <span className="text-xs text-stone-500 tabular-nums">{weekDone}/{days.length}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {days.map((d) => (
                <DayCard
                  key={d.day}
                  day={d}
                  done={completedDays.has(d.day)}
                  toggle={() => toggleDay(d.day)}
                  open={openDay === d.day}
                  onOpen={() => setOpenDay(openDay === d.day ? null : d.day)}
                  onJump={onJump}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function DayCard({ day, done, toggle, open, onOpen, onJump }) {
  const isCheckpoint = day.isCheckpoint;
  const isFinal = day.isFinal;

  return (
    <div className={`rounded-xl border transition-all ${
      done ? "bg-[#3d5a45]/5 border-[#3d5a45]/30"
        : isCheckpoint ? "bg-[#c97554]/5 border-[#c97554]/30"
        : "bg-[#fffcf5] border-stone-900/10"
    } ${open ? "ink-shadow-deep" : "ink-shadow"}`}>
      <button onClick={onOpen} className="w-full text-left px-4 py-3 flex items-center gap-3">
        <button onClick={(e) => { e.stopPropagation(); toggle(); }} className="shrink-0" aria-label="Mark complete">
          {done ? <CheckCircle2 className="w-6 h-6 text-[#3d5a45]" /> : <Circle className="w-6 h-6 text-stone-300 hover:text-stone-500" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-0.5">
            <span className="font-mono tabular-nums">Day {day.day}</span>
            {isCheckpoint && (
              <span className="px-1.5 py-0.5 bg-[#c97554] text-white rounded text-[10px] font-semibold tracking-wide">
                {isFinal ? "FINAL" : "QUIZ"}
              </span>
            )}
          </div>
          <div className={`font-display text-base font-medium truncate ${done ? "text-stone-500 line-through" : "text-stone-900"}`}>
            {day.theme}
          </div>
        </div>
        <ChevronRight className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>

      {open && (
        <div className="px-4 pb-4 anim-slide-up">
          <div className="border-t border-stone-900/10 pt-3 space-y-2.5 text-sm">
            <TaskRow icon="🗣️" label="口语" text={day.tasks.speak} />
            <TaskRow icon="👂" label="听力" text={day.tasks.listen} />
            <TaskRow icon="📖" label="单字" text={day.tasks.vocab} />
            <TaskRow icon="🔧" label="文法" text={day.tasks.grammar} />
            <TaskRow icon="🔁" label="复习" text={day.tasks.review} />
          </div>
          {isCheckpoint && (
            <button onClick={() => onJump("quiz")} className="mt-4 w-full flex items-center justify-center gap-2 bg-[#c97554] hover:bg-[#b6664a] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
              <Trophy className="w-4 h-4" /> 开始本周测验
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function TaskRow({ icon, label, text }) {
  return (
    <div className="flex gap-3">
      <span className="text-lg shrink-0 leading-none mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-0.5">{label}</div>
        <div className="text-stone-700 leading-relaxed">{text}</div>
      </div>
    </div>
  );
}

// =============================================================================
// SENTENCES VIEW
// =============================================================================

function SentencesView() {
  const [activeCat, setActiveCat] = useState("home");
  const cat = SENTENCES[activeCat];

  return (
    <div className="anim-slide-up">
      <div className="bg-[#fffcf5] border border-stone-900/10 rounded-2xl p-5 sm:p-6 ink-shadow mb-6">
        <h2 className="font-display text-xl font-semibold mb-1">句子练习</h2>
        <p className="text-sm text-stone-600">
          按情境分类的常用句。每句给你 <span className="font-semibold">自然说法</span>、
          <span className="font-semibold">直翻意思</span>、
          <span className="font-semibold">发音提示</span>。
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {Object.entries(SENTENCES).map(([key, c]) => {
          const CatIcon = c.icon;
          const active = key === activeCat;
          return (
            <button
              key={key}
              onClick={() => setActiveCat(key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium transition-all border ${
                active ? "bg-stone-900 text-stone-50 border-stone-900" : "bg-[#fffcf5] text-stone-700 border-stone-900/15 hover:border-stone-900/40"
              }`}
            >
              <CatIcon className="w-4 h-4" />
              <span>{c.label}</span>
              <span className={`text-xs ${active ? "text-stone-300" : "text-stone-400"}`}>{c.items.length}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {cat.items.map((s, i) => <SentenceCard key={i} sentence={s} index={i} />)}
      </div>
    </div>
  );
}

function SentenceCard({ sentence, index }) {
  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(sentence.natural);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="bg-[#fffcf5] border border-stone-900/10 rounded-xl p-4 sm:p-5 ink-shadow group">
      <div className="flex items-start gap-3">
        <div className="font-display text-xl text-stone-300 font-medium tabular-nums shrink-0 w-6">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-stone-500 text-xs uppercase tracking-widest mb-1">中文</div>
          <div className="text-stone-900 text-base mb-3">{sentence.zh}</div>
          <div className="space-y-2.5 border-l-2 border-[#3d5a45]/20 pl-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#3d5a45] font-semibold mb-1">
                自然说法 · Natural
                <button onClick={speak} className="text-stone-400 hover:text-[#3d5a45] transition-colors" aria-label="Listen">
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="font-display text-lg sm:text-xl font-medium text-stone-900 leading-snug">{sentence.natural}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-0.5">直翻意思 · Literal</div>
              <div className="text-stone-600 text-sm italic">{sentence.literal}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#c97554] font-semibold mb-0.5">发音提示 · Tip</div>
              <div className="text-stone-700 text-sm leading-relaxed">{sentence.tip}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// QUIZ VIEW
// =============================================================================

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function levenshteinClose(a, b) {
  if (Math.abs(a.length - b.length) > 4) return false;
  let diff = 0;
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i++) {
    if (a[i] !== b[i]) diff++;
    if (diff > 3) return false;
  }
  return true;
}

function QuizView() {
  const [pool, setPool] = useState(() => shuffle(allSentences()));
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState({ correct: 0, attempts: 0 });
  const [wrongQueue, setWrongQueue] = useState([]);
  const inputRef = useRef(null);

  const current = pool[idx];

  const checkAnswer = () => {
    if (!answer.trim()) return;
    const userN = normalize(answer);
    const correctN = normalize(current.natural);
    const correctSimple = correctN.replace(/^(im|i am|i'd|i would|ive|i have)/, "i");

    setStats((s) => ({ ...s, attempts: s.attempts + 1 }));

    if (userN === correctN) {
      setResult("correct");
      setStats((s) => ({ ...s, correct: s.correct + 1 }));
    } else if (
      userN.length > 3 &&
      (correctN.includes(userN) || userN.includes(correctSimple) || levenshteinClose(userN, correctN))
    ) {
      setResult("close");
    } else {
      setResult("wrong");
      setWrongQueue((q) => (q.find((x) => x.zh === current.zh) ? q : [...q, current]));
    }
  };

  const next = () => {
    setAnswer("");
    setResult(null);
    setShowAnswer(false);

    if (result === "wrong" || result === "close") {
      const newPool = [...pool];
      const insertAt = Math.min(idx + 3 + Math.floor(Math.random() * 3), newPool.length);
      newPool.splice(insertAt, 0, current);
      setPool(newPool);
    }

    if (idx + 1 >= pool.length) {
      setPool(shuffle(allSentences()));
      setIdx(0);
    } else {
      setIdx(idx + 1);
    }
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const skip = () => {
    setShowAnswer(true);
    setResult("wrong");
    setWrongQueue((q) => (q.find((x) => x.zh === current.zh) ? q : [...q, current]));
  };

  const reset = () => {
    setPool(shuffle(allSentences()));
    setIdx(0);
    setAnswer("");
    setResult(null);
    setShowAnswer(false);
    setStats({ correct: 0, attempts: 0 });
    setWrongQueue([]);
  };

  const accuracy = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;

  return (
    <div className="anim-slide-up">
      <div className="bg-[#fffcf5] border border-stone-900/10 rounded-2xl p-5 sm:p-6 ink-shadow mb-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="font-display text-xl font-semibold mb-1">随机测验</h2>
            <p className="text-sm text-stone-600">看中文，写英文。答错的会重新排进队伍，直到你说对。</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-stone-500">正确率</div>
              <div className="font-display text-2xl font-semibold text-[#3d5a45] tabular-nums">{accuracy}%</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-stone-500">做过</div>
              <div className="font-display text-2xl font-semibold tabular-nums">{stats.attempts}</div>
            </div>
            <button onClick={reset} className="text-stone-500 hover:text-stone-900 p-2 rounded-lg hover:bg-stone-900/5 transition-colors" aria-label="Reset" title="重置">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#fffcf5] border border-stone-900/10 rounded-2xl ink-shadow-deep p-6 sm:p-10">
        <div className="text-center mb-2">
          <span className="inline-block px-2.5 py-1 bg-stone-900/5 rounded-full text-xs text-stone-600 font-medium">
            {SENTENCES[current.category].label}
          </span>
        </div>
        <div className="text-center mb-8">
          <div className="text-[11px] uppercase tracking-[0.2em] text-stone-500 mb-3">把这句翻成英文 · Translate</div>
          <div className="font-display text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">{current.zh}</div>
        </div>

        <div className="max-w-md mx-auto">
          <textarea
            ref={inputRef}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (result) next(); else checkAnswer();
              }
            }}
            disabled={!!result}
            rows={2}
            placeholder="Type your answer in English..."
            className="w-full px-4 py-3 bg-white border-2 border-stone-900/15 rounded-xl text-base focus:outline-none focus:border-[#3d5a45] resize-none disabled:bg-stone-100 disabled:text-stone-500 transition-colors"
          />

          {result && <ResultBox result={result} userAnswer={answer} correct={current.natural} tip={current.tip} showAnswer={showAnswer} />}

          <div className="flex gap-2 mt-4">
            {!result ? (
              <>
                <button onClick={checkAnswer} disabled={!answer.trim()} className="flex-1 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white font-medium py-3 px-5 rounded-xl transition-colors">
                  检查 Check
                </button>
                <button onClick={skip} className="px-5 py-3 border border-stone-900/15 hover:border-stone-900/40 rounded-xl text-stone-700 transition-colors">
                  看答案
                </button>
              </>
            ) : (
              <button onClick={next} className="flex-1 bg-[#3d5a45] hover:bg-[#2f4736] text-white font-medium py-3 px-5 rounded-xl transition-colors flex items-center justify-center gap-2">
                下一题 <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="text-center text-xs text-stone-400 mt-3">按 Enter 检查 · Shift+Enter 换行</p>
        </div>
      </div>

      {wrongQueue.length > 0 && (
        <div className="mt-5 bg-[#c97554]/5 border border-[#c97554]/20 rounded-xl p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#c97554] mb-1">
            <RotateCcw className="w-4 h-4" />
            还在练 ({wrongQueue.length})
          </div>
          <p className="text-xs text-stone-600">这些句子会重新出现，直到你答对它们。</p>
        </div>
      )}
    </div>
  );
}

function ResultBox({ result, correct, tip, showAnswer }) {
  const config = {
    correct: { bg: "bg-[#3d5a45]/10", border: "border-[#3d5a45]/30", text: "text-[#3d5a45]", label: "✓ 答对了！", msg: "Nice. 完全正确。" },
    close:   { bg: "bg-[#d4a574]/10", border: "border-[#d4a574]/40", text: "text-[#a87838]", label: "～ 很接近", msg: "意思有了，但跟自然说法有点差距：" },
    wrong:   { bg: "bg-[#c97554]/10", border: "border-[#c97554]/30", text: "text-[#c97554]", label: showAnswer ? "答案：" : "再试试", msg: "自然说法是：" },
  };
  const c = config[result];

  return (
    <div className={`mt-4 ${c.bg} border ${c.border} rounded-xl p-4 anim-slide-up`}>
      <div className={`text-sm font-semibold ${c.text} mb-2`}>{c.label}</div>
      {result !== "correct" && (
        <>
          <div className="text-xs text-stone-500 mb-1">{c.msg}</div>
          <div className="font-display text-lg text-stone-900 mb-3">"{correct}"</div>
          <div className="text-xs text-stone-600 leading-relaxed border-t border-stone-900/10 pt-2">
            <span className="font-semibold text-[#c97554]">提示: </span>{tip}
          </div>
        </>
      )}
    </div>
  );
}

// =============================================================================
// CHAT VIEW
// =============================================================================

function ChatView({ openSettings }) {
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const hasApiKey = !!loadKey(STORAGE_KEYS.apiKey, "");

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const startScenario = (sc) => {
    setScenario(sc);
    setMessages([]);
    setError(null);
    sendToAI([], sc, true);
  };

  const exitScenario = () => {
    setScenario(null);
    setMessages([]);
    setInput("");
    setError(null);
  };

  const buildSystemPrompt = (sc) => {
    const setting = sc === "office"
      ? "You're a friendly co-worker chatting at the office coffee machine or break room. Topics like weekend, busy week, weather, lunch, projects."
      : "You're a friend who hasn't seen the user in a while. You're catching up at a café. Topics like recent life, hobbies, plans, mutual friends.";

    return `You are roleplaying as a native English speaker chatting with someone learning English (level A2-B1).

SETTING: ${setting}

CRITICAL RULES (FOLLOW EVERY TIME):
- ENGLISH ONLY. Never use Chinese.
- Vocabulary: A2-B1 only. Simple, everyday words.
- Sentences: SHORT. Usually under 12 words.
- Ask EXACTLY ONE question per turn. Never two.
- Be warm and casual, like a friendly person — not a teacher.

CORRECTION FORMAT (after every user message):
1. Look at the user's last message. Did they make a mistake or sound unnatural?
2. If YES, start your reply with this exact format on its own line:
   💡 More natural: "[the better version]" — [one short reason in simple English, max 10 words]
3. If their English is fine, skip the correction line entirely.
4. Then continue the conversation: react briefly to what they said, and ask ONE follow-up question.

EXAMPLES OF CORRECTIONS:
User says: "I very like coffee."
You reply:
💡 More natural: "I really like coffee." — We use "really," not "very," before verbs.
Same here — coffee is the best. What kind do you usually drink?

User says: "Yesterday I go to mall."
You reply:
💡 More natural: "Yesterday I went to the mall." — Past tense + "the" before mall.
Nice! Did you buy anything?

FOCUS ON NATURALNESS, NOT PERFECTION. Don't correct tiny things like missing periods. Only correct if it sounds clearly off or wrong.

If this is the FIRST message (no user message yet), just open the conversation naturally with a greeting and ONE simple question. No correction needed.`;
  };

  const sendToAI = async (history, sc, isOpener = false) => {
    const apiKey = loadKey(STORAGE_KEYS.apiKey, "");
    const model = loadKey(STORAGE_KEYS.model, "claude-haiku-4-5-20251001");

    if (!apiKey) {
      setError("请先在「设定」里输入 Anthropic API key");
      return;
    }

    setLoading(true);
    setError(null);

    const apiMessages = isOpener
      ? [{ role: "user", content: "Start the conversation. Greet me and ask one simple question." }]
      : history.map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.content }));

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model,
          max_tokens: 1000,
          system: buildSystemPrompt(sc),
          messages: apiMessages,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `API error ${res.status}`);
      }
      const data = await res.json();
      const text = (data.content || [])
        .map((c) => (c.type === "text" ? c.text : ""))
        .filter(Boolean)
        .join("\n")
        .trim();

      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (e) {
      console.error(e);
      setError(`连接失败: ${e.message || "请再试一次"}`);
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    await sendToAI(newHistory, scenario);
    inputRef.current?.focus();
  };

  // No API key warning
  if (!hasApiKey && !scenario) {
    return (
      <div className="anim-slide-up">
        <div className="bg-[#fffcf5] border border-stone-900/10 rounded-2xl p-5 sm:p-6 ink-shadow mb-6">
          <h2 className="font-display text-xl font-semibold mb-1">对话练习</h2>
          <p className="text-sm text-stone-600">和 AI 母语者聊天 · 全程英文 · A2-B1 等级 · 每次只问一个问题</p>
        </div>
        <div className="bg-[#c97554]/10 border border-[#c97554]/30 rounded-2xl p-6 text-center">
          <Key className="w-10 h-10 text-[#c97554] mx-auto mb-3" />
          <h3 className="font-display text-xl font-semibold mb-2">需要 API Key</h3>
          <p className="text-sm text-stone-700 leading-relaxed mb-4 max-w-md mx-auto">
            对话功能需要呼叫 Anthropic API。在 console.anthropic.com 取得 API key 后，
            在「设定」里输入即可使用。<br />
            <span className="text-xs text-stone-500">(其他三个功能不需要 API key，可以直接用)</span>
          </p>
          <button
            onClick={openSettings}
            className="bg-stone-900 hover:bg-stone-800 text-white font-medium px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Settings className="w-4 h-4" /> 打开设定
          </button>
        </div>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="anim-slide-up">
        <div className="bg-[#fffcf5] border border-stone-900/10 rounded-2xl p-5 sm:p-6 ink-shadow mb-6">
          <h2 className="font-display text-xl font-semibold mb-1">对话练习</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            和 AI 母语者聊天。全程英文，A2-B1 等级。每次只问一个问题，
            <br className="hidden sm:block" />
            你回答之后会用英文温和地告诉你怎么讲更自然。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <ScenarioCard icon={Coffee} title="Office Small Talk" zhTitle="办公室闲聊"
            desc="Co-worker chatting by the coffee machine. Weekend, projects, busy days."
            zhDesc="和同事在茶水间聊聊周末、最近的工作、忙不忙之类的"
            color="#3d5a45" onClick={() => startScenario("office")} />
          <ScenarioCard icon={Users} title="Meeting a Friend" zhTitle="见朋友"
            desc="Catching up with a friend at a café after some time apart."
            zhDesc="好久不见的朋友约咖啡，闲聊近况、生活、计划"
            color="#c97554" onClick={() => startScenario("friend")} />
        </div>
        <div className="mt-6 text-xs text-stone-500 bg-stone-900/[0.03] border border-stone-900/5 rounded-lg p-4 leading-relaxed">
          <span className="font-semibold text-stone-700">小提示：</span>
          回答不用完美。讲错了 AI 会用 💡 提示你更自然的说法，然后继续聊。重点是把话说出来。
        </div>
      </div>
    );
  }

  return (
    <div className="anim-slide-up flex flex-col" style={{ height: "calc(100vh - 240px)", minHeight: "500px" }}>
      <div className="bg-[#fffcf5] border border-stone-900/10 rounded-t-2xl px-4 sm:px-5 py-3 ink-shadow flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#3d5a45] text-white flex items-center justify-center">
            {scenario === "office" ? <Coffee className="w-4 h-4" /> : <Users className="w-4 h-4" />}
          </div>
          <div>
            <div className="font-display font-semibold text-sm leading-tight">
              {scenario === "office" ? "Alex (co-worker)" : "Sam (friend)"}
            </div>
            <div className="text-xs text-stone-500">
              {scenario === "office" ? "Office break room · A2-B1" : "Catching up · A2-B1"}
            </div>
          </div>
        </div>
        <button onClick={exitScenario} className="text-stone-500 hover:text-stone-900 p-2 rounded-lg hover:bg-stone-900/5" aria-label="End">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#faf6ef] border-x border-stone-900/10 px-4 sm:px-5 py-4 space-y-3 scrollbar-thin">
        {messages.length === 0 && !loading && !error && (
          <div className="text-center text-xs text-stone-400 py-4 anim-pulse">连接中...</div>
        )}
        {messages.map((m, i) => <ChatBubble key={i} message={m} />)}
        {loading && (
          <div className="flex items-center gap-2 text-stone-500 text-sm pl-1">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="anim-pulse">typing...</span>
          </div>
        )}
        {error && (
          <div className="text-center text-sm text-[#c97554] bg-[#c97554]/5 border border-[#c97554]/20 rounded-lg p-3">
            {error}
          </div>
        )}
      </div>

      <div className="bg-[#fffcf5] border border-stone-900/10 border-t-0 rounded-b-2xl p-3 sm:p-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            disabled={loading}
            placeholder="Type your reply in English..."
            className="flex-1 px-4 py-2.5 bg-white border-2 border-stone-900/15 rounded-xl text-sm focus:outline-none focus:border-[#3d5a45] disabled:bg-stone-100"
          />
          <button onClick={send} disabled={!input.trim() || loading} className="bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message }) {
  const isUser = message.role === "user";

  const parseAssistant = (text) => {
    const lines = text.split("\n");
    const correctionIdx = lines.findIndex((l) => l.trim().startsWith("💡"));
    if (correctionIdx === -1) return { correction: null, body: text };
    const correction = lines[correctionIdx].replace(/^💡\s*/, "").trim();
    const body = lines.filter((_, i) => i !== correctionIdx).join("\n").trim();
    return { correction, body };
  };

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-stone-900 text-stone-50 rounded-2xl rounded-br-md px-4 py-2.5 text-sm leading-relaxed">
          {message.content}
        </div>
      </div>
    );
  }

  const { correction, body } = parseAssistant(message.content);

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] space-y-2">
        {correction && (
          <div className="bg-[#d4a574]/15 border border-[#d4a574]/40 rounded-xl px-3.5 py-2.5 text-xs leading-relaxed">
            <div className="flex items-start gap-1.5">
              <span className="text-base leading-none mt-0.5">💡</span>
              <div className="text-stone-800">
                <span className="font-semibold text-[#a87838]">More natural: </span>{correction}
              </div>
            </div>
          </div>
        )}
        {body && (
          <div className="bg-[#fffcf5] border border-stone-900/10 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm leading-relaxed text-stone-900 ink-shadow">
            {body}
          </div>
        )}
      </div>
    </div>
  );
}

function ScenarioCard({ icon: Icon, title, zhTitle, desc, zhDesc, color, onClick }) {
  return (
    <button onClick={onClick} className="text-left bg-[#fffcf5] border border-stone-900/10 hover:border-stone-900/30 rounded-2xl p-5 ink-shadow hover:ink-shadow-deep transition-all group">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105" style={{ backgroundColor: color, color: "white" }}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="font-display text-xl font-semibold text-stone-900 mb-0.5">{title}</div>
      <div className="text-sm text-stone-500 mb-3">{zhTitle}</div>
      <div className="text-sm text-stone-700 leading-relaxed mb-2">{desc}</div>
      <div className="text-xs text-stone-500 leading-relaxed">{zhDesc}</div>
      <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={{ color }}>
        开始 Start <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </button>
  );
}
