import { useState, useRef, useEffect } from "react";
import {
  Home,
  Briefcase,
  Plane,
  ShoppingBag,
  Send,
  Sparkles,
  CheckCircle2,
  Circle,
  RotateCcw,
  ChevronRight,
  Volume2,
  Trophy,
  Calendar,
  MessageCircle,
  BookOpen,
  Shuffle,
  Coffee,
  Users,
  Loader2,
  X,
  Settings,
  Key,
  AlertTriangle,
} from "lucide-react";

// =============================================================================
// DATA
// =============================================================================

const SENTENCES = {
  home: {
    label: "在家",
    labelEn: "At Home",
    icon: Home,
    items: [
      { zh: "我好累", natural: "I'm exhausted.", literal: "I am exhausted (= very tired).", tip: "exhausted = ig-ZAW-stid。比 'tired' 更累。也可说 I'm wiped out / I'm beat。" },
      { zh: "我的充电器在哪里？", natural: "Where's my charger?", literal: "Where is my charger?", tip: "Where's = Where is，连读成 'wairz'。charger 念 CHAR-jer。" },
      { zh: "我要出门了", natural: "I'm heading out.", literal: "I am heading out (= going out now).", tip: "heading 念 HED-ing。比 'I'm going out' 更口语化。" },
      { zh: "你吃饭了吗？", natural: "Have you eaten?", literal: "Have you eaten (food)?", tip: "eaten 念 EE-tn。完整一点：Have you had dinner yet?" },
      { zh: "我先睡了", natural: "I'm gonna hit the sack.", literal: "I am going to hit the sack (= go to bed).", tip: "hit the sack 是地道说法。简单版：I'm off to bed。" },
      { zh: "灯没关", natural: "The light's still on.", literal: "The light is still on.", tip: "light's = light is。'still on' 强调 '还' 开着。" },
      { zh: "我饿死了", natural: "I'm starving.", literal: "I am starving (= extremely hungry).", tip: "starving 念 STAR-ving。比 'I'm hungry' 强烈很多。" },
      { zh: "等一下，我马上回来", natural: "Hang on, I'll be right back.", literal: "Hang on (= wait), I will be right back.", tip: "Hang on 比 'wait' 更自然。'right back' 重音在 right。" },
    ],
  },
  work: {
    label: "工作",
    labelEn: "At Work",
    icon: Briefcase,
    items: [
      { zh: "我有个会要开", natural: "I've got a meeting.", literal: "I have got a meeting.", tip: "I've got = I have。比 'I have' 更口语。meeting 念 MEE-ting。" },
      { zh: "我马上就来", natural: "I'll be right there.", literal: "I will be right there.", tip: "right there 表示 '马上到'。可以说 Be right there!" },
      { zh: "今天忙死了", natural: "Today's been crazy.", literal: "Today has been crazy (= very busy).", tip: "crazy 在这里=超忙。也可说 It's been hectic（HEK-tik）。" },
      { zh: "这件事我来处理", natural: "I'll take care of it.", literal: "I will take care of it.", tip: "take care of = 处理。比 'I will handle it' 更日常。" },
      { zh: "截止日期是什么时候？", natural: "When's the deadline?", literal: "When is the deadline?", tip: "deadline 念 DED-line。When's = wenz。" },
      { zh: "我再确认一下", natural: "Let me double-check.", literal: "Let me double-check.", tip: "double-check 是固定说法，连着念 DUB-l-chek。" },
      { zh: "你现在有空吗？", natural: "Do you have a sec?", literal: "Do you have a second (= a moment)?", tip: "sec = second，超口语。正式：Do you have a minute?" },
      { zh: "我下班了", natural: "I'm done for the day.", literal: "I am done for the day.", tip: "done 念 dun。也可说 I'm calling it a day。" },
    ],
  },
  travel: {
    label: "旅游",
    labelEn: "Traveling",
    icon: Plane,
    items: [
      { zh: "厕所在哪里？", natural: "Where's the restroom?", literal: "Where is the restroom (= toilet)?", tip: "美国用 restroom，英国说 toilet 也行。bathroom 也很常用。" },
      { zh: "我迷路了", natural: "I'm lost.", literal: "I am lost.", tip: "lost 念 lawst。简单两个字就够了。" },
      { zh: "这班车去机场吗？", natural: "Does this bus go to the airport?", literal: "Does this bus go to the airport?", tip: "airport 重音在前：AIR-port。整句节奏稳一点。" },
      { zh: "我要 check in", natural: "I'd like to check in, please.", literal: "I would like to check in, please.", tip: "I'd = I would。加 please 比较有礼貌。" },
      { zh: "我的行李不见了", natural: "My luggage is missing.", literal: "My luggage is missing.", tip: "luggage 念 LUG-ij，不可数。不要说 luggages。" },
      { zh: "这附近有什么好吃的？", natural: "Any good food around here?", literal: "(Is there) any good food around here?", tip: "口语常省略 'is there'。around 念 uh-ROWND。" },
      { zh: "可以帮我拍张照吗？", natural: "Could you take a picture for me?", literal: "Could you take a picture for me?", tip: "Could you 比 Can you 更礼貌。picture 念 PIK-cher。" },
      { zh: "我可以再来一份吗？", natural: "Can I get another one?", literal: "Can I get another one?", tip: "another 念 uh-NUH-ther。点东西时超常用。" },
    ],
  },
  shopping: {
    label: "购物",
    labelEn: "Shopping",
    icon: ShoppingBag,
    items: [
      { zh: "这个多少钱？", natural: "How much is this?", literal: "How much is this?", tip: "How much 念 how-MUCH。指着东西说就行。" },
      { zh: "可以试穿吗？", natural: "Can I try this on?", literal: "Can I try this on?", tip: "try on 是片语动词。重音在 try 和 on 之间均匀。" },
      { zh: "有别的颜色吗？", natural: "Do you have this in other colors?", literal: "Do you have this in other colors?", tip: "in other colors 表示 '别的颜色款'。colors 念 KUL-erz。" },
      { zh: "我只是看看", natural: "I'm just looking, thanks.", literal: "I am just looking, thanks.", tip: "店员问 Can I help you? 时的标准回答。加 thanks 礼貌。" },
      { zh: "太贵了", natural: "That's a bit pricey.", literal: "That is a bit pricey (= expensive).", tip: "pricey 比 expensive 更口语。a bit = 有点。" },
      { zh: "可以便宜一点吗？", natural: "Could you give me a discount?", literal: "Could you give me a discount?", tip: "discount 念 DIS-kownt。Could you 比 Can you 礼貌。" },
      { zh: "我可以刷卡吗？", natural: "Can I pay by card?", literal: "Can I pay by card?", tip: "by card / by credit card 都行。也可问 Do you take card?" },
      { zh: "我要这个", natural: "I'll take this one.", literal: "I will take this one.", tip: "决定要买时说。take 在这里=买。" },
    ],
  },
};

const PLAN = [
  { day: 1, week: 1, theme: "Greetings & Hellos", tasks: { speak: "练习5种打招呼: Hi / Hey / How's it going? / What's up? / Long time no see", listen: "找一段1分钟英文打招呼影片 (YouTube 搜 'English greetings A2')", vocab: "morning, afternoon, evening, weekend, day", grammar: "I am / You are / He is — be 动词三种基本式。例: I am tired. She is busy.", review: "—" } },
  { day: 2, week: 1, theme: "Talking About You", tasks: { speak: "自我介绍 30 秒: name, where you live, what you do", listen: "听一段自我介绍 (BBC Learning English 'Introduction')", vocab: "live, work, study, from, name", grammar: "现在简单式：I work / She works (第三人称加 s)", review: "Day 1 的打招呼说一遍" } },
  { day: 3, week: 1, theme: "Daily Routines", tasks: { speak: "说出你的一天 (5 句子): I wake up at... / I have... / I go to...", listen: "听一段 'My daily routine' 短片", vocab: "wake up, breakfast, lunch, dinner, sleep", grammar: "频率副词: always / usually / sometimes / never (放在动词前)", review: "Day 2 自我介绍" } },
  { day: 4, week: 1, theme: "Asking for Help", tasks: { speak: "练习 3 句: Could you help me? / Can you say that again? / What does ___ mean?", listen: "Café 对话 (Elllo.org 搜 'cafe ordering')", vocab: "help, again, slow, sorry, repeat", grammar: "Could you + 动词原形 (礼貌请求)。例: Could you say that slowly?", review: "Day 3 的频率副词造 2 句" } },
  { day: 5, week: 1, theme: "Time & Days", tasks: { speak: "回答: What time is it? / What day is today? / When's your birthday?", listen: "听天气/时间预报 1 分钟", vocab: "Monday-Sunday, today, tomorrow, yesterday, week", grammar: "介系词 at / on / in (at 7pm, on Monday, in July)", review: "Day 4 礼貌请求" } },
  { day: 6, week: 1, theme: "Likes & Dislikes", tasks: { speak: "说 5 件你喜欢/不喜欢的事: I love... / I'm into... / I'm not a fan of...", listen: "听一段 'What I like to do' 短影片", vocab: "love, like, hate, prefer, into", grammar: "like + V-ing (I like reading, not I like read)", review: "Day 5 时间介系词" } },
  { day: 7, week: 1, theme: "🏆 Week 1 Quiz", tasks: { speak: "打开测验模式，做 10 题随机句子", listen: "—", vocab: "回顾本周所有单字", grammar: "be 动词 + 现在式 + 频率副词 + 介系词", review: "完成本周小测验！" }, isCheckpoint: true },
  { day: 8, week: 2, theme: "Home Phrases", tasks: { speak: "去 '句子练习' 选 '在家' 类，每句念 3 遍", listen: "看一段家庭日常 vlog (1-2 分钟)", vocab: "tired, hungry, charger, light, bed", grammar: "I'm + 形容词 (I'm tired / I'm starving)", review: "Week 1 的自我介绍" } },
  { day: 9, week: 2, theme: "Shopping Basics", tasks: { speak: "选 '购物' 类，5 句对话扮演", listen: "听一段商店对话 (BBC 'shopping')", vocab: "price, color, size, expensive, cheap", grammar: "Can I + 动词原形 (Can I try / Can I pay)", review: "Day 8 的家里句子" } },
  { day: 10, week: 2, theme: "Food & Drinks", tasks: { speak: "扮演餐厅点餐: I'd like... / Can I get... / Could I have...", listen: "餐厅对话 (Elllo 'restaurant')", vocab: "menu, order, drink, dessert, bill", grammar: "I'd like = I would like (礼貌点餐说法)", review: "Day 9 购物句子" } },
  { day: 11, week: 2, theme: "Talking Feelings", tasks: { speak: "说出今天感觉: I'm + (happy/tired/excited/nervous/stressed)", listen: "Podcast 短篇 'How are you feeling?'", vocab: "happy, sad, excited, nervous, stressed", grammar: "形容词 vs 副词 (happy vs happily)", review: "Day 10 餐厅句子" } },
  { day: 12, week: 2, theme: "Making Plans", tasks: { speak: "邀请朋友: Wanna grab coffee? / Are you free Saturday?", listen: "朋友约见面 1 分钟对话", vocab: "free, busy, plan, weekend, later", grammar: "Wanna = want to (口语); Gonna = going to", review: "Day 11 心情句子" } },
  { day: 13, week: 2, theme: "Phone Talk", tasks: { speak: "电话开头/结尾: Hey, it's me / Talk to you later / Gotta go", listen: "听一段电话对话", vocab: "call, text, message, voicemail, line", grammar: "Could I speak to ___? / Speaking. (= 我就是)", review: "Day 12 邀请句子" } },
  { day: 14, week: 2, theme: "🏆 Week 2 Quiz", tasks: { speak: "测验 15 题，专攻 '在家' + '购物'", listen: "—", vocab: "复习本周 30+ 单字", grammar: "Can I / I'd like / Wanna / Gonna", review: "完成本周小测验！" }, isCheckpoint: true },
  { day: 15, week: 3, theme: "Past Simple (Regular)", tasks: { speak: "说昨天做了什么 (5 句): I worked / walked / watched / cooked / called", listen: "听一段 'Yesterday I...' 短篇", vocab: "yesterday, last night, ago, before, then", grammar: "动词 + ed (worked / played / watched). -ed 念 t / d / id", review: "Week 2 邀请句" } },
  { day: 16, week: 3, theme: "Past Simple (Irregular)", tasks: { speak: "用过去式说一件昨天发生的事: went / had / saw / made / got", listen: "故事短篇 (StoryCorps 类)", vocab: "go-went, have-had, see-saw, make-made, get-got", grammar: "不规则过去式表 (背 20 个最常用)", review: "Day 15 规则过去式" } },
  { day: 17, week: 3, theme: "Telling a Story", tasks: { speak: "讲一个上周末做的事 (1 分钟，3-5 句)", listen: "听一个 short personal story (Elllo)", vocab: "first, then, after that, finally, suddenly", grammar: "时间连接词 (first / then / after that / finally)", review: "Day 16 不规则过去式" } },
  { day: 18, week: 3, theme: "Travel Phrases", tasks: { speak: "选 '旅游' 类，5 句念 3 遍", listen: "机场广播或对话 1 分钟", vocab: "luggage, flight, gate, ticket, lost", grammar: "Where is...? / How do I get to...? (问路)", review: "Day 17 讲一个故事" } },
  { day: 19, week: 3, theme: "Asking Directions", tasks: { speak: "How do I get to the station? / Is it far? / Turn left/right", listen: "听问路对话 1 分钟", vocab: "left, right, straight, corner, near", grammar: "祈使句 (Turn left. Go straight.) — 直接动词原形", review: "Day 18 旅游句" } },
  { day: 20, week: 3, theme: "Restaurant / Café", tasks: { speak: "完整点餐流程 (从进门到买单)", listen: "餐厅服务对话 1-2 分钟", vocab: "table, waiter, order, check, tip", grammar: "Could I have...? / I'll have... (点餐两种说法)", review: "Day 19 问路句" } },
  { day: 21, week: 3, theme: "🏆 Week 3 Quiz", tasks: { speak: "测验 20 题，专攻 '旅游' 类", listen: "—", vocab: "复习过去式 + 旅游单字", grammar: "过去式 + 祈使句", review: "完成本周小测验！" }, isCheckpoint: true },
  { day: 22, week: 4, theme: "Future: Going to", tasks: { speak: "说 5 个明天/这周末的计划: I'm going to...", listen: "听 'My plans for...' 短篇", vocab: "plan, going to, tonight, tomorrow, later", grammar: "be going to + V (有计划的未来)", review: "Week 3 故事" } },
  { day: 23, week: 4, theme: "Will vs Going to", tasks: { speak: "区分练习: I'll get it (临时决定) vs I'm going to study (有计划)", listen: "对话: 临时决定 vs 已计划好", vocab: "decide, maybe, probably, definitely, just", grammar: "will = 临时决定; going to = 已有计划", review: "Day 22 计划句" } },
  { day: 24, week: 4, theme: "Office Small Talk", tasks: { speak: "进 '对话练习' 选 '办公室闲聊'", listen: "听同事闲聊 1 分钟", vocab: "weekend, weather, busy, project, coffee", grammar: "How was...? / How's it going? (开场必问)", review: "Day 23 will/going to" } },
  { day: 25, week: 4, theme: "Meeting Friends", tasks: { speak: "进 '对话练习' 选 '见朋友'", listen: "朋友见面对话 (Elllo casual)", vocab: "catch up, hang out, miss, ages, recently", grammar: "Long time no see / It's been ages (久违的两种说法)", review: "Day 24 办公室句" } },
  { day: 26, week: 4, theme: "Giving Opinions", tasks: { speak: "用 3 句给意见: I think... / In my opinion... / If you ask me...", listen: "辩论或评论短片 1 分钟", vocab: "think, believe, opinion, agree, sure", grammar: "I think + 完整子句 (I think it's good, 不是 I think good)", review: "Day 25 朋友句" } },
  { day: 27, week: 4, theme: "Disagreeing Politely", tasks: { speak: "练 3 句礼貌反对: I see your point, but... / I'm not sure about that", listen: "听一段不同意见的对话", vocab: "disagree, however, although, actually, kind of", grammar: "but / however / although (转折)", review: "Day 26 给意见" } },
  { day: 28, week: 4, theme: "🏆 Week 4 Quiz", tasks: { speak: "测验 25 题，全类别混合", listen: "—", vocab: "复习未来式 + 表达观点单字", grammar: "going to / will / 转折语", review: "完成本周小测验！" }, isCheckpoint: true },
  { day: 29, week: 5, theme: "Real Conversation Practice", tasks: { speak: "进 '对话练习'，连续聊 10 轮 (办公室主题)", listen: "看一段真实闲聊 vlog 2 分钟", vocab: "无新单字，专注流畅度", grammar: "把所有句型混合用", review: "找出最不熟的 10 句重练" } },
  { day: 30, week: 5, theme: "🎉 Final Review", tasks: { speak: "进 '对话练习'，'见朋友' 主题聊 10 轮", listen: "再看 Day 29 影片，跟读", vocab: "随机抽 30 个单字自测", grammar: "随机抽 5 个文法点造句", review: "完成最终大测验 30 题！" }, isCheckpoint: true, isFinal: true },
];

// =============================================================================
// HELPERS
// =============================================================================

const normalize = (s) =>
  s.toLowerCase().replace(/['']/g, "'").replace(/[.,!?;:"]/g, "").replace(/\s+/g, " ").trim();

const allSentences = () =>
  Object.entries(SENTENCES).flatMap(([key, cat]) =>
    cat.items.map((it) => ({ ...it, category: key, catLabel: cat.label }))
  );

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
  const pct = Math.round((progress / 30) * 100);
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
            <span className="text-[#c97554]">30 天</span>计划
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
              {progress}<span className="text-stone-300 text-3xl">/30</span>
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
          {progress}<span className="text-stone-300">/30</span>
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
  const weeks = [1, 2, 3, 4, 5];

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
                {w === 5 && <span className="ml-2 text-base text-stone-500">(收尾)</span>}
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
