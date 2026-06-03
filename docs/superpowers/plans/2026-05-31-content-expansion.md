# English Coach Content Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the app from 4 sentence categories and a 30-day plan to 8 categories, a dedicated email templates tab, a 60-day plan, quiz mode filter, and auto progress tracking.

**Architecture:** All content is extracted from `App.jsx` into a new `src/data.js` file. `App.jsx` imports from it and gains a new `EmailView` component, an updated `QuizView` with a mode toggle, updated `SentencesView` with audio tracking, and progress tracking helpers backed by localStorage.

**Tech Stack:** React 18, Vite, Tailwind CSS, lucide-react, localStorage (no new dependencies)

> **Note:** This project has no test framework. Each task ends with a browser verification step using `npm run dev`.

---

## Task 1: Create src/data.js and migrate existing data

**Files:**
- Create: `src/data.js`
- Modify: `src/App.jsx` (remove data/helpers, add import)

- [ ] **Step 1: Create `src/data.js` with all existing content**

```js
// src/data.js
import { Home, Briefcase, Plane, ShoppingBag } from "lucide-react";

export const normalize = (s) =>
  s.toLowerCase().replace(/['']/g, "'").replace(/[.,!?;:"]/g, "").replace(/\s+/g, " ").trim();

export const SENTENCES = {
  home: {
    label: "在家", labelEn: "At Home", icon: Home,
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
    label: "工作", labelEn: "At Work", icon: Briefcase,
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
    label: "旅游", labelEn: "Traveling", icon: Plane,
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
    label: "购物", labelEn: "Shopping", icon: ShoppingBag,
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

export const allSentences = () =>
  Object.entries(SENTENCES).flatMap(([key, cat]) =>
    cat.items.map((it) => ({ ...it, category: key, catLabel: cat.label }))
  );

export const PLAN = [
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
  { day: 30, week: 5, theme: "🎉 Month 1 Final Review", tasks: { speak: "进 '对话练习'，'见朋友' 主题聊 10 轮", listen: "再看 Day 29 影片，跟读", vocab: "随机抽 30 个单字自测", grammar: "随机抽 5 个文法点造句", review: "完成第一个月大测验 30 题！" }, isCheckpoint: true },
  // Week 6
  { day: 31, week: 6, theme: "Daily Comm — Part 1", tasks: { speak: "练习前4句日常沟通: Is now a good time? / Can I run something by you? / So you mean...? / I get what you mean.", listen: "找一段日常对话短片 (YouTube 搜 'English casual conversation A2')", vocab: "convenient, run by, mean, get (understand)", grammar: "间接问句: So you mean + 句子? (非直接问句，语气更软)", review: "随机挑 Week 5 的句子说 3 句" } },
  { day: 32, week: 6, theme: "Daily Comm — Part 2", tasks: { speak: "练习后4句: Could you say that again? / I didn't catch that. / Let me think. / Let's catch up.", listen: "听一段朋友打电话 1 分钟", vocab: "catch (understand), think about, catch up, sometime", grammar: "Could you + 动词? vs Can you + 动词? (礼貌程度不同)", review: "Day 31 前4句" } },
  { day: 33, week: 6, theme: "Daily Comm — Full Practice", tasks: { speak: "把8句日常沟通练习连用：造一段模拟对话（3-5 轮）", listen: "重听 Day 31 影片，跟读", vocab: "复习8个日常沟通单字", grammar: "let me + 动词原形 (Let me think / Let me check)", review: "Day 32 后4句" } },
  { day: 34, week: 6, theme: "Email Templates — 职场核心 Intro", tasks: { speak: "打开 '邮件模板'，大声朗读第一个模板 (Reply to a Request)", listen: "找一段 'professional email English' 1 分钟影片", vocab: "attach, follow up, clarify, apologize, decline", grammar: "I'd be happy to / I'd like to — I would 缩写的礼貌用法", review: "Day 33 对话练习" } },
  { day: 35, week: 6, theme: "Email Templates — 职场核心 Practice", tasks: { speak: "朗读 3 个职场核心模板，跟读 key phrases", listen: "再听 Day 34 影片", vocab: "复习邮件模板里出现的 key phrases", grammar: "Unfortunately, I'm not able to... (礼貌拒绝句型)", review: "Day 34 第一个模板" } },
  { day: 36, week: 6, theme: "Email Key Phrases Quiz", tasks: { speak: "进 '随机测验' 选 '邮件短语模式'，练习 10 题", listen: "—", vocab: "hectic, clarify, pending, urgent, feedback", grammar: "Just checking in / Just wanted to follow up (just = 表谦虚、随意语气)", review: "Day 35 的 key phrases" } },
  { day: 37, week: 6, theme: "🏆 Week 6 Quiz", tasks: { speak: "测验 10 题，专攻日常沟通类", listen: "—", vocab: "复习本周所有单字", grammar: "Could you / Let me / I'd be happy to", review: "完成本周小测验！" }, isCheckpoint: true },
  // Week 7
  { day: 38, week: 7, theme: "Work Comm — Part 1", tasks: { speak: "练习前4句职场沟通: I'll loop you in. / Let's get on the same page. / Could you follow up? / I'd love your feedback.", listen: "找一段办公室对话影片 (YouTube 搜 'office English conversation')", vocab: "loop in, same page, follow up, feedback", grammar: "I'll + 动词 (临时决定)：I'll loop you in. / I'll send it over.", review: "Week 6 的日常沟通句子" } },
  { day: 39, week: 7, theme: "Work Comm — Part 2", tasks: { speak: "练习后4句: Let me send it over. / Can we wrap this up? / I'll own this. / Is there anything I can help with?", listen: "听一段团队会议对话 1 分钟", vocab: "send over, wrap up, own (responsibility), help with", grammar: "Can we + 动词? (协商、提议)：Can we wrap this up? / Can we move on?", review: "Day 38 前4句" } },
  { day: 40, week: 7, theme: "Work Comm — Full Practice", tasks: { speak: "把8句职场沟通连用，模拟一段工作对话（3-5 轮）", listen: "重听 Day 38 影片，跟读", vocab: "复习8个职场沟通单字", grammar: "phrasal verbs in the office: loop in / wrap up / send over / follow up", review: "Day 39 后4句" } },
  { day: 41, week: 7, theme: "Email Templates — 社交/日常 Intro", tasks: { speak: "打开 '邮件模板'，朗读 Thank-You Note 模板，跟读 key phrases", listen: "找一段 'casual email English' 1 分钟影片", vocab: "appreciate, thoughtful, warmly, catch up, RSVP", grammar: "It really meant a lot to me. — 主语 it + 过去式，表达感谢", review: "Day 40 职场沟通" } },
  { day: 42, week: 7, theme: "Email Templates — 社交/日常 Practice", tasks: { speak: "朗读 Congratulations 和 Check-In 两个模板", listen: "再听 Day 41 影片", vocab: "deserve, paid off, checking in, confirm, attend", grammar: "You absolutely deserve it! — absolutely 加强语气副词", review: "Day 41 模板" } },
  { day: 43, week: 7, theme: "Social Email Key Phrases Quiz", tasks: { speak: "进 '随机测验' 选 '邮件短语模式'，练习 10 题（专注社交模板）", listen: "—", vocab: "meant a lot, paid off, checking in, confirm, RSVP", grammar: "I'd love to vs I would love to (正式/口语差别)", review: "Day 42 模板 key phrases" } },
  { day: 44, week: 7, theme: "🏆 Week 7 Quiz", tasks: { speak: "测验 15 题，专攻职场沟通类", listen: "—", vocab: "复习本周所有单字", grammar: "phrasal verbs + 礼貌表达", review: "完成本周小测验！" }, isCheckpoint: true },
  // Week 8
  { day: 45, week: 8, theme: "Phone & Video — Part 1", tasks: { speak: "练习前4句: Can you hear me okay? / You're breaking up. / I'll mute myself. / Can you turn your camera on?", listen: "找一段视频会议对话 (YouTube 搜 'video call English phrases')", vocab: "hear, breaking up, mute, camera", grammar: "You're + -ing 描述正在发生的事：You're breaking up. / You're freezing.", review: "Week 7 的职场沟通句子" } },
  { day: 46, week: 8, theme: "Phone & Video — Part 2", tasks: { speak: "练习后4句: I'll call you back. / I can't talk right now. / Let me share my screen. / The connection isn't great.", listen: "听一段电话对话 1 分钟", vocab: "call back, right now, share screen, connection", grammar: "in a bit = soon (口语)；比较：soon / in a moment / in a bit", review: "Day 45 前4句" } },
  { day: 47, week: 8, theme: "Phone & Video — Full Practice", tasks: { speak: "把8句连用，模拟一段视频通话（3-5 轮）", listen: "重听 Day 45 影片，跟读", vocab: "复习8个电话/视频单字", grammar: "isn't great vs is bad (委婉表达法)", review: "Day 46 后4句" } },
  { day: 48, week: 8, theme: "Email Templates — 内部职场 Intro", tasks: { speak: "打开 '邮件模板'，朗读 Meeting Request 模板", listen: "找一段 'workplace email English' 1 分钟影片", vocab: "schedule, suit, works for you, status, update", grammar: "Would [time] work for you? — Would 用于礼貌询问", review: "Day 47 视频通话句子" } },
  { day: 49, week: 8, theme: "Email Templates — 内部职场 Practice", tasks: { speak: "朗读 Status Update 和 Out-of-Office 模板", listen: "再听 Day 48 影片", vocab: "completed, in progress, blocker, handover, urgent", grammar: "I'll be out of the office from... to... — 日期介系词 from/to", review: "Day 48 模板" } },
  { day: 50, week: 8, theme: "Email Feedback Request + Quiz", tasks: { speak: "朗读 Feedback Request 模板；进测验模式练习内部职场 key phrases", listen: "—", vocab: "value, feedback, finalize, deadline, attachment", grammar: "I would really value your... — would 用于礼貌表达", review: "Day 49 模板" } },
  { day: 51, week: 8, theme: "🏆 Week 8 Quiz", tasks: { speak: "测验 20 题，专攻电话/视频类", listen: "—", vocab: "复习本周所有单字", grammar: "You're -ing + in a bit + from/to 日期", review: "完成本周小测验！" }, isCheckpoint: true },
  // Week 9
  { day: 52, week: 9, theme: "Social Phrases — Part 1", tasks: { speak: "练习前4句社交: Great to meet you! / Help yourself! / Can I get you something? / The food is amazing.", listen: "找一段派对/聚会英文对话 (YouTube 搜 'English party small talk')", vocab: "great, help yourself, amazing, offer", grammar: "感叹句: Great to meet you! / What a lovely place! — 省略主语+动词", review: "Week 8 的电话/视频句子" } },
  { day: 53, week: 9, theme: "Social Phrases — Part 2", tasks: { speak: "练习后4句: How do you know them? / How have you been? / Excuse me for a moment. / I had a great time.", listen: "听一段社交聚会对话 1 分钟", vocab: "know (socially), have been, excuse, had a great time", grammar: "How have you been? — 现在完成式问近况（比 How are you 更有温度）", review: "Day 52 前4句" } },
  { day: 54, week: 9, theme: "Social Phrases — Full Practice", tasks: { speak: "把8句社交场合连用，模拟派对对话（3-5 轮）", listen: "重听 Day 52 影片，跟读", vocab: "复习8个社交场合单字", grammar: "I had a great time = 过去完成的经历，表告别", review: "Day 53 后4句" } },
  { day: 55, week: 9, theme: "All Email Templates Review", tasks: { speak: "随机打开3个邮件模板，大声朗读 key phrases", listen: "找一段 'email writing English' 影片 1 分钟", vocab: "loop, wrap up, appreciate, clarify, decline", grammar: "回顾: I'd be happy to / Unfortunately / Just checking in / Would work for you", review: "Day 54 社交句子" } },
  { day: 56, week: 9, theme: "Email Quiz Mode Practice", tasks: { speak: "进 '随机测验' 选 '邮件短语模式'，目标正确率 80%", listen: "—", vocab: "复习所有模板 key phrases", grammar: "—", review: "Day 55 模板" } },
  { day: 57, week: 9, theme: "Full Category Review", tasks: { speak: "进 '句子练习'，浏览所有8个类别，每类播放 2 句语音", listen: "找一段综合日常对话影片 2 分钟", vocab: "找出自己最不熟的 10 个单字复习", grammar: "随机造 5 句，用不同时态 (现在/过去/未来)", review: "本周所有句子" } },
  { day: 58, week: 9, theme: "🏆 Week 9 Quiz", tasks: { speak: "测验 25 题，全类别混合（包含社交场合）", listen: "—", vocab: "复习本周所有单字", grammar: "感叹句 + 现在完成式 + 礼貌表达综合", review: "完成本周小测验！" }, isCheckpoint: true },
  // Week 10
  { day: 59, week: 10, theme: "Final Conversation Practice", tasks: { speak: "进 '对话练习'，连续聊 10 轮（任选场景）", listen: "看一段真实英文日常对话 vlog 2 分钟，找出你认识的句子", vocab: "无新单字，专注流畅度和自然反应", grammar: "把所有8类句型和邮件 key phrases 混合运用", review: "找出还不流利的句子，重练" } },
  { day: 60, week: 10, theme: "🎉 60-Day Final Review", tasks: { speak: "进 '对话练习'，'见朋友' 主题聊 10 轮", listen: "再看 Day 59 影片，跟读两遍", vocab: "随机抽 30 个单字自测", grammar: "随机抽 5 个文法点造句", review: "完成最终大测验 30 题 + 邮件短语测验 15 题！" }, isCheckpoint: true, isFinal: true },
];
```

- [ ] **Step 2: Update `src/App.jsx` — remove data, add imports**

At the top of `App.jsx`, replace the `Home, Briefcase, Plane, ShoppingBag` import line and all data definitions with:

```js
import { useState, useRef, useEffect } from "react";
import {
  Send, Sparkles, CheckCircle2, Circle, RotateCcw, ChevronRight,
  Volume2, Trophy, Calendar, MessageCircle, BookOpen, Shuffle,
  Coffee, Users, Loader2, X, Settings, Key, AlertTriangle, Mail,
  Phone, Users2, MessageSquare,
} from "lucide-react";
import {
  SENTENCES, EMAIL_TEMPLATES, PLAN, normalize, allSentences, allEmailPhrases,
} from "./data.js";
```

Remove the entire `// DATA` section (lines that define `SENTENCES`, `PLAN`, `normalize`, `allSentences`).

- [ ] **Step 3: Verify**

Run `npm run dev`. Open browser. Check that the app loads and the Plan tab shows all 30 existing days, and the Sentences tab shows the existing 4 categories.

- [ ] **Step 4: Commit**

```bash
git add src/data.js src/App.jsx
git commit -m "refactor: extract all content data to src/data.js"
```

---

## Task 2: Add 4 new sentence categories to data.js

**Files:**
- Modify: `src/data.js`

- [ ] **Step 1: Add new icon imports at the top of `src/data.js`**

```js
import { Home, Briefcase, Plane, ShoppingBag, MessageCircle, Briefcase as BriefcaseIcon, Phone, Users2 } from "lucide-react";
```

Replace the import line at the top of `src/data.js` with:

```js
import { Home, Briefcase, Plane, ShoppingBag, MessageCircle, Phone, Users2 } from "lucide-react";
```

- [ ] **Step 2: Add 4 new categories to `SENTENCES` in `src/data.js`**

After the `shopping` category (before the closing `}`), add:

```js
  dailyComm: {
    label: "日常沟通", labelEn: "Daily Communication", icon: MessageCircle,
    items: [
      { zh: "你方便说话吗？", natural: "Is now a good time to talk?", literal: "Is now a good time to talk?", tip: "good time 念 good-TIME。比 'Are you free?' 更体贴，先问方不方便。" },
      { zh: "我想跟你商量一件事", natural: "Can I run something by you?", literal: "Can I run (= share) something by (= past) you?", tip: "run something by you 是固定说法，非常口语化。" },
      { zh: "你的意思是…？", natural: "So you mean…?", literal: "So you mean…?", tip: "So 放句首表示'那你是说'。mean 念 meen。上扬语调。" },
      { zh: "我明白你的意思", natural: "I get what you mean.", literal: "I get (= understand) what you mean.", tip: "get = understand，超口语。也可说 I see what you mean。" },
      { zh: "你能再说一遍吗？", natural: "Sorry, could you say that again?", literal: "Sorry, could you say that again?", tip: "Sorry 放前面更有礼貌。again 念 uh-GEN。" },
      { zh: "我没听清楚", natural: "Sorry, I didn't catch that.", literal: "Sorry, I didn't catch (= hear/understand) that.", tip: "catch = 听清楚，固定用法。比 'I didn't hear' 更自然。" },
      { zh: "等我想一下", natural: "Let me think about that.", literal: "Let me think about that.", tip: "Let me 念 LET-me，连读。比 'Wait' 更礼貌，显得在认真思考。" },
      { zh: "我们找个时间聊聊", natural: "Let's catch up sometime.", literal: "Let's catch up (= talk/reconnect) sometime.", tip: "catch up 念 catch-UP。sometime 比 'someday' 更有约的感觉。" },
    ],
  },
  workComm: {
    label: "职场沟通", labelEn: "Work Communication", icon: Briefcase,
    items: [
      { zh: "我把这件事转给你", natural: "I'll loop you in.", literal: "I will loop (= include) you in.", tip: "loop you in 是超常用的职场说法。= 让你知情/加进来。" },
      { zh: "我们对齐一下", natural: "Let's get on the same page.", literal: "Let's get on the same page (= have the same understanding).", tip: "get on the same page 固定说法。page 念 payj。" },
      { zh: "这件事能麻烦你跟进吗？", natural: "Could you follow up on this?", literal: "Could you follow up (= check/pursue) on this?", tip: "follow up 念 FOL-oh-up。Could you 比 Can you 礼貌。" },
      { zh: "我需要你的反馈", natural: "I'd love your feedback on this.", literal: "I would love your feedback (= comments/opinions) on this.", tip: "I'd love 比 I need 更软。feedback 念 FEED-bak。" },
      { zh: "我先发给你看", natural: "Let me send it over for your review.", literal: "Let me send it over for your review.", tip: "send it over 比 'send to you' 更口语。review 念 rih-VYOO。" },
      { zh: "我们今天能完成吗？", natural: "Can we wrap this up today?", literal: "Can we wrap (= finish) this up today?", tip: "wrap up 念 rap-UP。比 'finish' 更日常职场用法。" },
      { zh: "这个任务我来负责", natural: "I'll own this one.", literal: "I will own (= be responsible for) this one.", tip: "own = 负责，职场口语。比 'I'll do it' 更有担当感。" },
      { zh: "有什么需要我帮忙的吗？", natural: "Is there anything I can help with?", literal: "Is there anything I can help with?", tip: "help with 念 help-WITH，介系词放最后是英文正常语序。" },
    ],
  },
  phoneVideo: {
    label: "电话/视频", labelEn: "Phone & Video Calls", icon: Phone,
    items: [
      { zh: "你听得到我吗？", natural: "Can you hear me okay?", literal: "Can you hear me okay (= fine)?", tip: "okay 放结尾是确认语气。也可说 Can you hear me alright?" },
      { zh: "我这边有点断断续续", natural: "You're breaking up a bit.", literal: "You are breaking up (= audio cutting out) a bit.", tip: "breaking up 是视频/电话断线的专用说法。a bit = 有一点。" },
      { zh: "我先把自己静音", natural: "I'll mute myself for now.", literal: "I will mute (= silence) myself for now.", tip: "mute 念 myoot。for now = 暂时。视频会议必备句。" },
      { zh: "你能开视频吗？", natural: "Can you turn your camera on?", literal: "Can you turn your camera on?", tip: "turn on 是片语动词，camera 和 on 分开。也说 Can you switch your video on?" },
      { zh: "我等下打给你", natural: "I'll call you back in a bit.", literal: "I will call you back in a bit (= soon).", tip: "call back = 回电话。in a bit 比 'soon' 更口语。" },
      { zh: "我现在不方便接电话", natural: "I can't talk right now.", literal: "I cannot talk right now.", tip: "can't 念 kant（美式）。right now 强调'现在这一刻'。简短直接不失礼。" },
      { zh: "让我共享一下屏幕", natural: "Let me share my screen.", literal: "Let me share my screen.", tip: "share my screen 是视频会议标准说法。screen 念 skreen。" },
      { zh: "信号不太好", natural: "The connection isn't great.", literal: "The connection is not great.", tip: "connection 念 kuh-NEK-shun。isn't great 比 'is bad' 更委婉。" },
    ],
  },
  social: {
    label: "社交场合", labelEn: "Social Situations", icon: Users2,
    items: [
      { zh: "很高兴认识你", natural: "Great to meet you!", literal: "It is great to meet you!", tip: "口语常省略 'It is'。Great 念 grayt，比 Nice 更热情。" },
      { zh: "请随便用", natural: "Help yourself!", literal: "Help yourself! (= take what you want)", tip: "固定说法，招待客人时用。yourself 念 yer-SELF。" },
      { zh: "你喝点什么？", natural: "Can I get you something to drink?", literal: "Can I get (= bring/offer) you something to drink?", tip: "can I get you 是招待标准句，连读。" },
      { zh: "这里的食物很好吃", natural: "The food here is amazing.", literal: "The food here is amazing.", tip: "amazing 念 uh-MAY-zing。比 'delicious' 更口语。" },
      { zh: "你是怎么认识他们的？", natural: "How do you know them?", literal: "How do you know them?", tip: "know 念 no。比 'How did you meet them?' 更简洁常用。" },
      { zh: "你最近怎么样？", natural: "How have you been?", literal: "How have you been (= how are you lately)?", tip: "比 'How are you' 更有温度，暗示一段时间没见。been 念 bin。" },
      { zh: "我先失陪一下", natural: "Excuse me for a moment.", literal: "Excuse me for a moment (= a short time).", tip: "Excuse me 念 ek-SKYOOZ-me。for a moment 比 'I need to go' 更有礼貌。" },
      { zh: "今天玩得很开心", natural: "I had a great time today.", literal: "I had a great time today.", tip: "had a great time 是道别时的固定句。也可说 This was so much fun。" },
    ],
  },
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Go to 句子练习 tab. Confirm 8 category buttons appear and all new categories show 8 sentences each.

- [ ] **Step 4: Commit**

```bash
git add src/data.js
git commit -m "feat: add 4 new sentence categories (daily comm, work comm, phone/video, social)"
```

---

## Task 3: Add EMAIL_TEMPLATES to data.js

**Files:**
- Modify: `src/data.js`

- [ ] **Step 1: Add `EMAIL_TEMPLATES` export and `allEmailPhrases` helper to `src/data.js`**

Add after the `PLAN` export:

```js
export const EMAIL_TEMPLATES = {
  professional: [
    {
      title: "Reply to a Request",
      zhTitle: "回复请求",
      whenToUse: "当有人请你帮忙或提出要求，你同意协助时使用",
      subject: "Re: [topic] — Happy to Help",
      body: `Hi [Name],\n\nThanks for reaching out! I'd be happy to help with [topic].\n\nI'll get started on this right away and send you an update by [date/time].\n\nLet me know if you need anything else in the meantime.\n\nBest,\n[Your Name]`,
      keyPhrases: [
        { en: "I'd be happy to help with [topic].", zh: "我很乐意帮忙处理[topic]。" },
        { en: "I'll get started on this right away.", zh: "我会马上开始处理这件事。" },
        { en: "Let me know if you need anything else.", zh: "如果还有其他需要，请告诉我。" },
      ],
    },
    {
      title: "Following Up",
      zhTitle: "跟进追踪",
      whenToUse: "当你等待对方回复已经一段时间，需要礼貌地催促时使用",
      subject: "Following Up: [topic]",
      body: `Hi [Name],\n\nI hope you're doing well! I wanted to follow up on my previous message about [topic].\n\nJust checking in to see if you had a chance to look into it. No rush — I just want to make sure it didn't get lost in your inbox.\n\nLooking forward to hearing from you.\n\nBest,\n[Your Name]`,
      keyPhrases: [
        { en: "I wanted to follow up on my previous message.", zh: "我想跟进一下我之前发的信息。" },
        { en: "Just checking in to see if you had a chance to look into it.", zh: "只是来问问你有没有机会看一下。" },
        { en: "I just want to make sure it didn't get lost in your inbox.", zh: "只是想确认一下没有被埋在收件箱里。" },
      ],
    },
    {
      title: "Apology for Late Response",
      zhTitle: "迟回道歉",
      whenToUse: "当你回复别人的邮件晚了，需要道歉并说明原因时使用",
      subject: "Sorry for the Late Reply — [topic]",
      body: `Hi [Name],\n\nMy apologies for the delayed response! Things have been a bit hectic on my end, but I didn't want to leave you waiting any longer.\n\nTo answer your question about [topic]: [your answer here].\n\nThanks for your patience, and please don't hesitate to reach out if you have more questions.\n\nBest,\n[Your Name]`,
      keyPhrases: [
        { en: "My apologies for the delayed response!", zh: "非常抱歉回复晚了！" },
        { en: "Things have been a bit hectic on my end.", zh: "我这边最近有点忙乱。" },
        { en: "Thanks for your patience.", zh: "感谢你的耐心等待。" },
      ],
    },
    {
      title: "Polite Decline",
      zhTitle: "礼貌婉拒",
      whenToUse: "当你无法答应别人的请求，需要礼貌地拒绝时使用",
      subject: "Re: [topic] — Unfortunately Unable to Help This Time",
      body: `Hi [Name],\n\nThank you so much for thinking of me for [topic]. I really appreciate it!\n\nUnfortunately, I'm not able to take this on right now due to [reason/prior commitments]. I hope you understand.\n\nI'd love to help in the future when my schedule clears up. Best of luck with [topic]!\n\nBest,\n[Your Name]`,
      keyPhrases: [
        { en: "Unfortunately, I'm not able to take this on right now.", zh: "很遗憾，我现在没办法接手这件事。" },
        { en: "I hope you understand.", zh: "希望你能理解。" },
        { en: "I'd love to help in the future when my schedule clears up.", zh: "等我时间空出来了，很乐意之后帮忙。" },
      ],
    },
    {
      title: "Asking for Clarification",
      zhTitle: "要求澄清",
      whenToUse: "当你对对方说的内容不太清楚，需要进一步解释时使用",
      subject: "Quick Question About [topic]",
      body: `Hi [Name],\n\nThanks for your message about [topic]. I just want to make sure I understand correctly before moving forward.\n\nCould you clarify [specific point]? Specifically, I'd like to know [your question].\n\nOnce I have a better understanding, I'll be able to [next step] right away.\n\nThanks so much!\n\nBest,\n[Your Name]`,
      keyPhrases: [
        { en: "I just want to make sure I understand correctly.", zh: "我只是想确认我理解正确。" },
        { en: "Could you clarify [specific point]?", zh: "你能澄清一下[specific point]吗？" },
        { en: "Once I have a better understanding, I'll be able to proceed.", zh: "等我更清楚了，我就能马上继续处理。" },
      ],
    },
  ],
  social: [
    {
      title: "Thank-You Note",
      zhTitle: "感谢信",
      whenToUse: "收到礼物、获得帮助或受到款待后，表达感谢时使用",
      subject: "Thank You for [occasion/gift/help]",
      body: `Hi [Name],\n\nI just wanted to take a moment to say thank you so much for [occasion/what they did]. It really meant a lot to me!\n\n[Add one specific detail about why it was special or how it helped.]\n\nI truly appreciate your kindness and thoughtfulness. Let's catch up soon!\n\nWarmly,\n[Your Name]`,
      keyPhrases: [
        { en: "It really meant a lot to me.", zh: "这对我真的很有意义。" },
        { en: "I truly appreciate your kindness.", zh: "我真的很感激你的善意。" },
        { en: "Let's catch up soon!", zh: "我们找时间聚聚吧！" },
      ],
    },
    {
      title: "Congratulations",
      zhTitle: "恭喜贺信",
      whenToUse: "当朋友或同事有好消息（升职、毕业、结婚等）时使用",
      subject: "Congratulations on [achievement]!",
      body: `Hi [Name],\n\nI just heard the amazing news — congratulations on [achievement]! You absolutely deserve it!\n\nAll the hard work you've put in has clearly paid off. I'm so proud of you and excited for what's ahead.\n\nLet's celebrate soon! How about grabbing coffee or dinner sometime this week?\n\nWith love,\n[Your Name]`,
      keyPhrases: [
        { en: "You absolutely deserve it!", zh: "你完全值得拥有这一切！" },
        { en: "All the hard work you've put in has clearly paid off.", zh: "你付出的所有努力显然都有了回报。" },
        { en: "Let's celebrate soon!", zh: "我们找个时间好好庆祝吧！" },
      ],
    },
    {
      title: "Checking In with a Friend",
      zhTitle: "问候老朋友",
      whenToUse: "当你一段时间没联系朋友，想了解近况时使用",
      subject: "Hey, just checking in!",
      body: `Hey [Name],\n\nIt's been a while! I was just thinking about you and wanted to say hi.\n\nHow are you doing? How's everything going with [work/life/something you know about them]?\n\nIt would be so great to catch up. If you have time, maybe we could grab coffee or have a quick chat sometime soon?\n\nMiss you!\n[Your Name]`,
      keyPhrases: [
        { en: "It's been a while!", zh: "好久不见！" },
        { en: "I was just thinking about you.", zh: "我刚好在想到你。" },
        { en: "It would be so great to catch up.", zh: "能叙叙旧真的很棒。" },
      ],
    },
    {
      title: "RSVP to an Invitation",
      zhTitle: "回复邀请",
      whenToUse: "当你收到活动邀请，需要确认是否出席时使用",
      subject: "RSVP: [event name] — [Attending / Unable to Attend]",
      body: `Hi [Name],\n\nThank you so much for the invitation to [event name]!\n\nI'm happy to confirm I'll be attending — I'm really looking forward to it! See you on [date].\n\n[Or if declining: I'm so sorry, but I won't be able to make it this time. I hope it goes wonderfully!]\n\nThanks again for thinking of me.\n\nBest,\n[Your Name]`,
      keyPhrases: [
        { en: "Thank you so much for the invitation.", zh: "非常感谢你的邀请。" },
        { en: "I'm happy to confirm I'll be attending.", zh: "我很高兴确认我会出席。" },
        { en: "I'm so sorry, but I won't be able to make it this time.", zh: "非常抱歉，这次我没办法参加。" },
      ],
    },
  ],
  internal: [
    {
      title: "Meeting Request",
      zhTitle: "会议邀请",
      whenToUse: "需要约同事或上司开会讨论某个话题时使用",
      subject: "Meeting Request: [topic] — [Your Name]",
      body: `Hi [Name],\n\nI'd like to schedule a meeting to discuss [topic]. I think a [30-minute / 1-hour] call would be enough to cover everything.\n\nWould any of the following times work for you?\n- [Day, Date] at [Time]\n- [Day, Date] at [Time]\n- [Day, Date] at [Time]\n\nPlease let me know what works best, or feel free to suggest another time if none of these suit you.\n\nLooking forward to connecting!\n\nBest,\n[Your Name]`,
      keyPhrases: [
        { en: "I'd like to schedule a meeting to discuss [topic].", zh: "我想约个会议讨论[topic]。" },
        { en: "Would any of the following times work for you?", zh: "以下时间有哪个方便吗？" },
        { en: "Feel free to suggest another time if none of these suit you.", zh: "如果这些时间都不方便，请随时提出其他时间。" },
      ],
    },
    {
      title: "Status Update to Manager",
      zhTitle: "进度汇报",
      whenToUse: "定期向上司汇报工作进度，或在项目关键节点更新状态时使用",
      subject: "Status Update — [Project Name] — [Date]",
      body: `Hi [Manager's Name],\n\nHere's a quick update on [project name]:\n\n✅ Completed this week:\n- [Task 1]\n- [Task 2]\n\n🔄 In progress:\n- [Task 3] — on track, expected by [date]\n\n⚠️ Blockers / issues:\n- [Any issue, or "None at the moment"]\n\nNext steps:\n- [What you're doing next week]\n\nLet me know if you have any questions or feedback.\n\nBest,\n[Your Name]`,
      keyPhrases: [
        { en: "Here's a quick update on [project].", zh: "这是关于[project]的简短进度报告。" },
        { en: "On track, expected by [date].", zh: "进度正常，预计[date]完成。" },
        { en: "Let me know if you have any questions or feedback.", zh: "如果有任何问题或意见，请告诉我。" },
      ],
    },
    {
      title: "Out-of-Office Handover",
      zhTitle: "离职/休假交接",
      whenToUse: "请假、出差或休假前，向同事交接工作时使用",
      subject: "Out of Office: [Your Name] — [Dates]",
      body: `Hi [Name],\n\nI'll be out of the office from [start date] to [end date] and will have limited access to email.\n\nDuring this time, please contact [colleague's name] at [email] for urgent matters.\n\nBefore I leave, I'll make sure to:\n- [Task 1 — e.g., complete the pending report]\n- [Task 2 — e.g., brief the team on open items]\n\nI'll respond to all messages when I'm back on [return date].\n\nThanks for your understanding!\n\nBest,\n[Your Name]`,
      keyPhrases: [
        { en: "I'll be out of the office from [date] to [date].", zh: "我将从[date]到[date]不在办公室。" },
        { en: "Please contact [name] for urgent matters.", zh: "紧急事宜请联系[name]。" },
        { en: "I'll respond to all messages when I'm back.", zh: "我回来后会回复所有信息。" },
      ],
    },
    {
      title: "Requesting Feedback",
      zhTitle: "请求反馈",
      whenToUse: "完成一项工作或项目后，向上司或同事请求意见和反馈时使用",
      subject: "Request for Feedback — [Project/Document Name]",
      body: `Hi [Name],\n\nI've finished [project/document name] and would really value your feedback before I [submit/present/finalize] it.\n\nI've attached/linked it here: [link or "see attachment"]\n\nSpecifically, I'd appreciate your thoughts on:\n- [Aspect 1 — e.g., overall structure]\n- [Aspect 2 — e.g., tone and clarity]\n\nNo worries if you're busy — even a few quick comments would be really helpful. I need it by [deadline] if possible.\n\nThank you so much!\n\nBest,\n[Your Name]`,
      keyPhrases: [
        { en: "I would really value your feedback.", zh: "我非常重视你的反馈意见。" },
        { en: "Even a few quick comments would be really helpful.", zh: "就算只是简短的几句意见也会很有帮助。" },
        { en: "I need it by [deadline] if possible.", zh: "如果可以的话，我需要在[deadline]之前收到。" },
      ],
    },
  ],
};

export const allEmailPhrases = () =>
  Object.values(EMAIL_TEMPLATES).flatMap((cat) =>
    cat.flatMap((t) =>
      t.keyPhrases.map((p) => ({
        zh: p.zh,
        natural: p.en,
        literal: p.en,
        tip: `来自模板: "${t.title}"`,
        category: "email",
        catLabel: "邮件短语",
      }))
    )
  );
```

- [ ] **Step 2: Verify**

In browser console (with dev server running), run:
```js
import('./src/data.js').then(m => console.log(Object.keys(m.EMAIL_TEMPLATES), m.allEmailPhrases().length))
```
Expected: `['professional', 'social', 'internal']` and `39` (13 templates × 3 phrases).

- [ ] **Step 3: Commit**

```bash
git add src/data.js
git commit -m "feat: add EMAIL_TEMPLATES and allEmailPhrases helper to data.js"
```

---

## Task 4: Update App.jsx imports and Header counter to /60

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update the `PLAN` constant reference — it now comes from 60 days in data.js (already done in Task 1). Update `Header` to show `/60`**

Find in `App.jsx`:

```jsx
const pct = Math.round((progress / 30) * 100);
```

Replace with:

```jsx
const pct = Math.round((progress / 60) * 100);
```

Find:

```jsx
<div className="font-display text-5xl font-semibold text-[#3d5a45]">
  {progress}<span className="text-stone-300 text-3xl">/30</span>
```

Replace with:

```jsx
<div className="font-display text-5xl font-semibold text-[#3d5a45]">
  {progress}<span className="text-stone-300 text-3xl">/60</span>
```

Find the mobile version:

```jsx
<div className="font-display text-2xl font-semibold text-[#3d5a45]">
  {progress}<span className="text-stone-300">/30</span>
```

Replace with:

```jsx
<div className="font-display text-2xl font-semibold text-[#3d5a45]">
  {progress}<span className="text-stone-300">/60</span>
```

Also update `PlanView` — find `weeks`:

```jsx
const weeks = [1, 2, 3, 4, 5];
```

Replace with:

```jsx
const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Header shows `/60`. Plan tab shows Weeks 1–10 with all 60 days. Days 31–60 appear correctly with their themes.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: extend plan to 60 days, update header counter to /60"
```

---

## Task 5: Add progress tracking storage layer

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Expand `STORAGE_KEYS` and add progress helpers in `App.jsx`**

Find:

```js
const STORAGE_KEYS = {
  apiKey: "english-coach:api-key",
  model: "english-coach:model",
  completedDays: "english-coach:completed-days",
};
```

Replace with:

```js
const STORAGE_KEYS = {
  apiKey: "english-coach:api-key",
  model: "english-coach:model",
  completedDays: "english-coach:completed-days",
  quizSessions: "english-coach:quiz-sessions",
  sentencesHeard: "english-coach:sentences-heard",
};

// Returns array of { date, mode, correct, attempts }
const getQuizSessions = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.quizSessions) || "[]");
  } catch { return []; }
};

const saveQuizSession = (mode, correct, attempts) => {
  try {
    const sessions = getQuizSessions();
    sessions.push({ date: new Date().toISOString(), mode, correct, attempts });
    localStorage.setItem(STORAGE_KEYS.quizSessions, JSON.stringify(sessions));
  } catch { /* ignore */ }
};

// Returns { [category]: string[] } mapping category key to array of heard `natural` values
const getSentencesHeard = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.sentencesHeard) || "{}");
  } catch { return {}; }
};

const recordSentenceHeard = (category, natural) => {
  try {
    const heard = getSentencesHeard();
    if (!heard[category]) heard[category] = [];
    if (!heard[category].includes(natural)) {
      heard[category].push(natural);
      localStorage.setItem(STORAGE_KEYS.sentencesHeard, JSON.stringify(heard));
    }
  } catch { /* ignore */ }
};

const isCategoryComplete = (categoryKey) => {
  const heard = getSentencesHeard();
  const heardInCat = heard[categoryKey] || [];
  const total = SENTENCES[categoryKey]?.items.length || 0;
  return total > 0 && heardInCat.length >= total;
};
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Open browser DevTools console. Run:
```js
saveQuizSession("sentences", 8, 10);
console.log(getQuizSessions());
recordSentenceHeard("home", "I'm exhausted.");
console.log(getSentencesHeard());
```
Expected: one quiz session object logged, and `{ home: ["I'm exhausted."] }`.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add progress tracking storage helpers (quiz sessions, sentences heard)"
```

---

## Task 6: Add EmailView component

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add `EmailView`, `EmailCard`, and `CopyButton` components to `App.jsx`**

Add after the `ScenarioCard` component (before the last closing line):

```jsx
// =============================================================================
// EMAIL VIEW
// =============================================================================

function EmailView() {
  const categories = [
    { key: "professional", label: "职场核心", labelEn: "Professional" },
    { key: "social",       label: "社交/日常", labelEn: "Social" },
    { key: "internal",     label: "内部职场",  labelEn: "Internal" },
  ];
  const [activeCat, setActiveCat] = useState("professional");
  const templates = EMAIL_TEMPLATES[activeCat];

  return (
    <div className="anim-slide-up">
      <div className="bg-[#fffcf5] border border-stone-900/10 rounded-2xl p-5 sm:p-6 ink-shadow mb-6">
        <h2 className="font-display text-xl font-semibold mb-1">邮件模板</h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          真实可用的邮件模板。每个模板包含使用时机、完整正文，以及
          <span className="font-semibold"> 关键短句</span>让你学以致用。
        </p>
      </div>

      <div className="flex gap-2 mb-5">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCat(c.key)}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-full text-sm font-medium transition-all border ${
              activeCat === c.key
                ? "bg-stone-900 text-stone-50 border-stone-900"
                : "bg-[#fffcf5] text-stone-700 border-stone-900/15 hover:border-stone-900/40"
            }`}
          >
            <span className="hidden sm:inline">{c.label} · </span>{c.labelEn}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {templates.map((t, i) => <EmailCard key={i} template={t} />)}
      </div>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      onClick={copy}
      className="text-xs text-stone-500 hover:text-stone-900 px-2 py-0.5 rounded border border-stone-900/10 hover:border-stone-900/30 transition-colors shrink-0"
    >
      {copied ? "✓ 已复制" : "复制"}
    </button>
  );
}

function EmailCard({ template }) {
  const [phrasesOpen, setPhrasesOpen] = useState(false);

  return (
    <div className="bg-[#fffcf5] border border-stone-900/10 rounded-xl ink-shadow overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="mb-3">
          <div className="font-display text-lg font-semibold text-stone-900">{template.title}</div>
          <div className="text-sm text-stone-500">{template.zhTitle}</div>
        </div>

        <div className="text-xs text-stone-600 bg-stone-900/[0.03] border border-stone-900/5 rounded-lg px-3 py-2 mb-4 leading-relaxed">
          <span className="font-semibold text-stone-700">使用时机：</span>{template.whenToUse}
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Subject Line</div>
            <CopyButton text={template.subject} />
          </div>
          <div className="font-mono text-sm text-stone-800 bg-white border border-stone-900/10 rounded-lg px-3 py-2">
            {template.subject}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Email Body</div>
            <CopyButton text={template.body} />
          </div>
          <pre className="font-mono text-sm text-stone-800 bg-white border border-stone-900/10 rounded-lg px-3 py-3 whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {template.body}
          </pre>
        </div>

        <button
          onClick={() => setPhrasesOpen((o) => !o)}
          className="w-full flex items-center justify-between text-sm font-semibold text-[#3d5a45] hover:text-[#2f4736] transition-colors"
        >
          <span>💡 关键短句 Key Phrases ({template.keyPhrases.length})</span>
          <ChevronRight className={`w-4 h-4 transition-transform ${phrasesOpen ? "rotate-90" : ""}`} />
        </button>

        {phrasesOpen && (
          <div className="mt-3 space-y-2 anim-slide-up">
            {template.keyPhrases.map((p, i) => (
              <div key={i} className="bg-[#3d5a45]/5 border border-[#3d5a45]/15 rounded-lg px-3 py-2.5">
                <div className="font-display text-sm font-medium text-stone-900 mb-0.5">"{p.en}"</div>
                <div className="text-xs text-stone-600">{p.zh}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run `npm run dev`. The EmailView component exists in code (not yet reachable via nav — that's the next task). No compile errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add EmailView and EmailCard components"
```

---

## Task 7: Update Nav and App routing for email tab

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add email tab to Nav**

Find in `Nav`:

```jsx
const tabs = [
  { id: "plan", label: "学习计划", icon: Calendar },
  { id: "sentences", label: "句子练习", icon: BookOpen },
  { id: "quiz", label: "随机测验", icon: Shuffle },
  { id: "chat", label: "对话练习", icon: MessageCircle },
];
```

Replace with:

```jsx
const tabs = [
  { id: "plan",      label: "学习计划", icon: Calendar },
  { id: "sentences", label: "句子练习", icon: BookOpen },
  { id: "quiz",      label: "随机测验", icon: Shuffle },
  { id: "email",     label: "邮件模板", icon: Mail },
  { id: "chat",      label: "对话练习", icon: MessageCircle },
];
```

- [ ] **Step 2: Add EmailView render in App**

Find in `App`:

```jsx
{view === "chat" && <ChatView openSettings={() => setShowSettings(true)} />}
```

Add after it:

```jsx
{view === "email" && <EmailView />}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Nav shows 5 tabs. Click 邮件模板. EmailView renders with 3 category buttons. Select each category, confirm templates appear. Click "复制" on a subject line — paste into a text editor to confirm clipboard works. Expand Key Phrases section and confirm it opens/closes.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add 邮件模板 nav tab and wire EmailView"
```

---

## Task 8: Update QuizView with mode toggle and session tracking

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace `QuizView` function with updated version**

Find the entire `function QuizView()` and replace it with:

```jsx
function QuizView() {
  const [quizMode, setQuizMode] = useState("sentences");
  const buildPool = (mode) =>
    shuffle(mode === "sentences" ? allSentences() : allEmailPhrases());

  const [pool, setPool] = useState(() => buildPool("sentences"));
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState({ correct: 0, attempts: 0 });
  const [wrongQueue, setWrongQueue] = useState([]);
  const [sessionSaved, setSessionSaved] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const inputRef = useRef(null);

  const current = pool[idx];

  // Auto-save quiz session when ≥10 attempts and ≥80% accuracy
  useEffect(() => {
    if (!sessionSaved && stats.attempts >= 10) {
      const accuracy = stats.correct / stats.attempts;
      if (accuracy >= 0.8) {
        saveQuizSession(quizMode, stats.correct, stats.attempts);
        setSessionSaved(true);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
      }
    }
  }, [stats, sessionSaved, quizMode]);

  const switchMode = (mode) => {
    setQuizMode(mode);
    setPool(buildPool(mode));
    setIdx(0);
    setAnswer("");
    setResult(null);
    setShowAnswer(false);
    setStats({ correct: 0, attempts: 0 });
    setWrongQueue([]);
    setSessionSaved(false);
    setShowSaved(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

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
      setPool(buildPool(quizMode));
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
    setPool(buildPool(quizMode));
    setIdx(0);
    setAnswer("");
    setResult(null);
    setShowAnswer(false);
    setStats({ correct: 0, attempts: 0 });
    setWrongQueue([]);
    setSessionSaved(false);
    setShowSaved(false);
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

        {/* Mode toggle */}
        <div className="mt-4 flex gap-1 p-1 bg-stone-900/[0.04] rounded-xl border border-stone-900/5 max-w-xs">
          {[
            { id: "sentences", label: "句子模式" },
            { id: "email",     label: "邮件短语" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                quizMode === m.id ? "bg-stone-900 text-stone-50 shadow-sm" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {showSaved && (
        <div className="mb-4 text-center text-sm text-[#3d5a45] bg-[#3d5a45]/5 border border-[#3d5a45]/20 rounded-xl py-2.5 anim-slide-up">
          ✓ 本次测验已记录
        </div>
      )}

      <div className="bg-[#fffcf5] border border-stone-900/10 rounded-2xl ink-shadow-deep p-6 sm:p-10">
        <div className="text-center mb-2">
          <span className="inline-block px-2.5 py-1 bg-stone-900/5 rounded-full text-xs text-stone-600 font-medium">
            {quizMode === "email" ? "邮件短语" : (SENTENCES[current.category]?.label || current.catLabel)}
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
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Go to 随机测验 tab. Confirm mode toggle appears. Switch to 邮件短语 mode — questions should change to email key phrases. Answer 10 questions correctly (≥80%) — "✓ 本次测验已记录" banner should appear briefly. Check localStorage in DevTools → Application → `english-coach:quiz-sessions` should contain one entry.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add quiz mode toggle (sentences/email) and quiz session auto-save"
```

---

## Task 9: Update SentencesView with audio tracking and category completion indicators

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update `SentencesView` to pass `onSpeak` to `SentenceCard` and show category completion checkmarks**

Find `function SentencesView()` and replace it with:

```jsx
function SentencesView() {
  const [activeCat, setActiveCat] = useState("home");
  const [heard, setHeard] = useState(() => getSentencesHeard());
  const cat = SENTENCES[activeCat];

  const handleSpeak = (sentence) => {
    recordSentenceHeard(activeCat, sentence.natural);
    setHeard(getSentencesHeard());
  };

  return (
    <div className="anim-slide-up">
      <div className="bg-[#fffcf5] border border-stone-900/10 rounded-2xl p-5 sm:p-6 ink-shadow mb-6">
        <h2 className="font-display text-xl font-semibold mb-1">句子练习</h2>
        <p className="text-sm text-stone-600">
          按情境分类的常用句。每句给你 <span className="font-semibold">自然说法</span>、
          <span className="font-semibold">直翻意思</span>、
          <span className="font-semibold">发音提示</span>。播放所有语音即完成该类别。
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {Object.entries(SENTENCES).map(([key, c]) => {
          const CatIcon = c.icon;
          const active = key === activeCat;
          const heardInCat = heard[key] || [];
          const complete = heardInCat.length >= c.items.length;
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
              {complete
                ? <CheckCircle2 className={`w-3.5 h-3.5 ${active ? "text-stone-300" : "text-[#3d5a45]"}`} />
                : <span className={`text-xs ${active ? "text-stone-300" : "text-stone-400"}`}>{c.items.length}</span>
              }
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {cat.items.map((s, i) => (
          <SentenceCard key={i} sentence={s} index={i} onSpeak={handleSpeak} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update `SentenceCard` to call `onSpeak` prop**

Find `function SentenceCard({ sentence, index })` and replace it with:

```jsx
function SentenceCard({ sentence, index, onSpeak }) {
  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(sentence.natural);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
    onSpeak?.(sentence);
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
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Go to 句子练习. Click the speaker button on all 8 sentences in the "在家" category. The category button should show a green checkmark instead of "8". Reload the page — the checkmark should still be there (persisted in localStorage).

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: track sentence audio plays and show category completion checkmarks"
```

---

## Task 10: Add "What's next" banner to PlanView

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update `PlanView` to add the "What's next" banner and auto-scroll**

Find `function PlanView({ completedDays, toggleDay, onJump })` and replace it with:

```jsx
function PlanView({ completedDays, toggleDay, onJump }) {
  const [openDay, setOpenDay] = useState(null);
  const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const nextIncompleteDay = PLAN.find((d) => !completedDays.has(d.day));
  const lastCompletedDay = [...PLAN].reverse().find((d) => completedDays.has(d.day));

  const scrollToDay = (dayNum) => {
    setOpenDay(dayNum);
    setTimeout(() => {
      document.getElementById(`day-${dayNum}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  return (
    <div className="anim-slide-up">
      {nextIncompleteDay ? (
        <button
          onClick={() => scrollToDay(nextIncompleteDay.day)}
          className="w-full text-left bg-[#3d5a45]/5 border border-[#3d5a45]/20 rounded-2xl p-4 mb-5 hover:bg-[#3d5a45]/10 transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-[#3d5a45] font-semibold uppercase tracking-widest mb-1">📍 继续学习</div>
              <div className="font-display text-lg font-semibold text-stone-900">
                Day {nextIncompleteDay.day} — {nextIncompleteDay.theme}
              </div>
              {lastCompletedDay && (
                <div className="text-xs text-stone-500 mt-0.5">上次完成: Day {lastCompletedDay.day}</div>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-[#3d5a45] shrink-0 mt-1" />
          </div>
        </button>
      ) : (
        <div className="w-full bg-[#3d5a45]/5 border border-[#3d5a45]/20 rounded-2xl p-4 mb-5 text-center">
          <div className="font-display text-lg font-semibold text-[#3d5a45]">🎉 全部完成！太厉害了！</div>
          <div className="text-sm text-stone-600 mt-1">60 天全部打卡，你已经做到了。</div>
        </div>
      )}

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
                <div id={`day-${d.day}`} key={d.day}>
                  <DayCard
                    day={d}
                    done={completedDays.has(d.day)}
                    toggle={() => toggleDay(d.day)}
                    open={openDay === d.day}
                    onOpen={() => setOpenDay(openDay === d.day ? null : d.day)}
                    onJump={onJump}
                  />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run `npm run dev`. The Plan tab shows the "继续学习" banner pointing to Day 1 (assuming no days are checked). Click the banner — page scrolls to Day 1 and it auto-opens. Mark a few days complete — the banner updates to the next unchecked day. Mark all 60 complete — banner shows the congratulations message.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add 'what's next' banner with auto-scroll to PlanView"
```

---

## Task 11: Update Header with stat chips

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update `App` to pass stats to `Header`, and update `Header` to display chips**

In `function App()`, update the Header call:

```jsx
<Header
  progress={completedDays.size}
  onSettings={() => setShowSettings(true)}
  quizSessions={getQuizSessions().length}
  sentencesCategoriesDone={Object.keys(SENTENCES).filter(isCategoryComplete).length}
  totalSentenceCategories={Object.keys(SENTENCES).length}
/>
```

Replace `function Header({ progress, onSettings })` with:

```jsx
function Header({ progress, onSettings, quizSessions, sentencesCategoriesDone, totalSentenceCategories }) {
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
            <div className="mt-2 flex gap-2 justify-end">
              <div className="text-xs bg-stone-900/[0.04] border border-stone-900/8 rounded-lg px-2 py-1 text-stone-600 tabular-nums">
                测验 {quizSessions} 次
              </div>
              <div className="text-xs bg-stone-900/[0.04] border border-stone-900/8 rounded-lg px-2 py-1 text-stone-600 tabular-nums">
                句子 {sentencesCategoriesDone}/{totalSentenceCategories}
              </div>
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
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Header shows `/60`, and two small stat chips: "测验 0 次" and "句子 0/8". Complete a quiz session (≥10 questions, ≥80% accuracy) — "测验 1 次" updates after refreshing. Hear all sentences in one category — "句子 1/8" updates.

- [ ] **Step 3: Final end-to-end check**

Walk through the full app:
- Plan tab: 60 days visible across 10 weeks, "继续学习" banner present, tapping it scrolls and opens the correct day card
- 句子练习: 8 category buttons, playing audio on all sentences in a category shows checkmark
- 随机测验: mode toggle works, email phrases mode draws from email templates, session saves after qualifying
- 邮件模板: 5th nav tab works, 3 category filters work, all templates show, copy buttons work, key phrases expand/collapse
- 对话练习: unchanged

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add quiz/sentence stat chips to header, complete content expansion"
```

---

## Self-Review Notes

- All 11 tasks produce self-contained, testable changes with explicit browser verification steps
- `data.js` holds all content; `App.jsx` holds all UI — clean boundary
- `allEmailPhrases()` defined in Task 3 is consumed in Task 8 — types match
- `isCategoryComplete()` defined in Task 5 is consumed in Task 11 — used correctly
- `recordSentenceHeard` / `getSentencesHeard` defined in Task 5, consumed in Task 9 — consistent
- `saveQuizSession` / `getQuizSessions` defined in Task 5, consumed in Tasks 8 and 11 — consistent
- `PLAN` weeks array updated to `[1..10]` in Task 4 and Task 10 — both locations covered
- Header `/30 → /60` updated in Task 4 (pct calc) and Task 11 (full Header replacement) — Task 11 supersedes Task 4's partial edit; implementer should apply Task 11 cleanly if Task 4 was already done
