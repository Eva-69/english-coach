import { Home, Briefcase, Plane, ShoppingBag, MessageCircle, Phone, Users2 } from "lucide-react";

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
];
