# English Coach — Content Expansion Design

**Date:** 2026-05-31
**Scope:** Add new sentence categories, email templates tab, 60-day plan, quiz filter, and auto progress tracking

---

## 1. Overview

Expand the English Coach app from 4 sentence categories and a 30-day plan to 8 sentence categories, a dedicated email templates feature, and a 60-day study plan. The quiz gains a separate mode for email key phrases. Auto progress tracking records quiz session results and sentence audio completions in localStorage, with a "what's next" nudge on the Plan tab.

---

## 2. Data Architecture

### 2.1 New file: `src/data.js`

All content is extracted from `App.jsx` into `src/data.js`. `App.jsx` imports `SENTENCES`, `EMAIL_TEMPLATES`, and `PLAN` from this file. No other files change structure.

```
src/
  data.js       ← SENTENCES, EMAIL_TEMPLATES, PLAN (all content)
  App.jsx       ← all React components and UI logic
```

### 2.2 SENTENCES — 4 new categories

Each new category follows the existing shape: `{ label, labelEn, icon, items[] }`.
Each item: `{ zh, natural, literal, tip }`.

New categories (8 phrases each):

| Key | Label | LabelEn |
|-----|-------|---------|
| `dailyComm` | 日常沟通 | Daily Communication |
| `workComm` | 职场沟通 | Work Communication |
| `phoneVideo` | 电话/视频 | Phone & Video Calls |
| `social` | 社交场合 | Social Situations |

Existing categories (home, work, travel, shopping) are unchanged.

### 2.3 EMAIL_TEMPLATES — new export

```js
{
  professional: EmailTemplate[],   // reply to request, follow up, apologize, decline, clarify
  social:       EmailTemplate[],   // thank-you, congratulations, check-in, RSVP
  internal:     EmailTemplate[],   // meeting request, status update, handover, feedback request
}
```

Each `EmailTemplate` object:

```js
{
  title: string,          // English title, e.g. "Following Up on a Request"
  zhTitle: string,        // Chinese title
  whenToUse: string,      // Chinese explanation of when/why to use this template
  subject: string,        // Email subject line
  body: string,           // Full email body (use [Name], [topic] as fill-in placeholders)
  keyPhrases: [           // 2–3 phrases pulled from the body
    { en: string, zh: string }
  ]
}
```

### 2.4 PLAN — extended to 60 days

Days 1–30 are unchanged. Days 31–60 follow the same weekly structure (6 study days + 1 quiz checkpoint day). Each day has the same 5 task fields: `speak`, `listen`, `vocab`, `grammar`, `review`.

Week/day mapping for new content:

| Week | Days | Primary Focus |
|------|------|---------------|
| 6 | 31–37 | 日常沟通 phrases + intro to 职场核心 email templates |
| 7 | 38–44 | 职场沟通 phrases + social/daily email templates |
| 8 | 45–51 | 电话/视频 phrases + internal workplace email templates |
| 9 | 52–58 | 社交场合 phrases + email quiz mode practice |
| 10 | 59–60 | Final review — all 8 sentence categories + all email templates |

Quiz checkpoints on days 35, 42, 49, 56, and 60 (day 60 is the final).

The `Header` progress counter changes from `/30` to `/60`.

---

## 3. Navigation

The main nav gains a 5th tab between 随机测验 and 对话练习:

```
学习计划 | 句子练习 | 随机测验 | 邮件模板 | 对话练习
```

Tab config entry: `{ id: "email", label: "邮件模板", icon: Mail }` (Mail from lucide-react).

---

## 4. Views

### 4.1 句子练习 (SentencesView) — unchanged structure

The category filter bar now renders 8 buttons instead of 4. The existing `flex-wrap` layout handles overflow on mobile without changes.

### 4.2 邮件模板 (EmailView) — new component

**Structure:**
- Header card (title + description, same pattern as other views)
- 3 category filter buttons: 职场核心 | 社交/日常 | 内部职场
- Scrollable list of `EmailCard` components for the active category

**EmailCard component:**
- Title (English) + zhTitle (Chinese subtitle)
- `whenToUse` line in Chinese
- Subject line with a copy button
- Full email body in a monospace-styled block with a copy button
- Collapsible "Key Phrases" section showing 2–3 `{ en, zh }` pairs — collapsed by default

Copy buttons use `navigator.clipboard.writeText()`. No external dependencies needed.

### 4.3 随机测验 (QuizView) — quiz mode toggle

A mode toggle is added at the top of the quiz card:

```
[ 句子模式 ]  [ 邮件短语模式 ]
```

- **句子模式** (default): existing behavior, pool from all `SENTENCES` items
- **邮件短语模式**: pool built from `keyPhrases` across all `EMAIL_TEMPLATES` categories — each item is `{ zh: phrase.zh, natural: phrase.en, literal: phrase.en, tip: "" }`

Switching modes resets the quiz state (pool, index, stats, wrongQueue).

---

## 5. Progress Tracking

### 5.1 Storage keys (localStorage)

| Key | Value | Description |
|-----|-------|-------------|
| `english-coach:completed-days` | `number[]` | Existing — days manually checked off |
| `english-coach:quiz-sessions` | `QuizSession[]` | New — array of completed quiz sessions |
| `english-coach:sentences-heard` | `Record<category, string[]>` | New — per-category list of sentence `natural` values heard (audio played) |

```js
// QuizSession shape
{ date: string, mode: "sentences" | "email", correct: number, attempts: number }
```

### 5.2 Quiz completion trigger

A quiz session is considered **complete** when the user has answered at least **10 questions** AND reached **≥ 80% accuracy** in that session. When triggered:
- The session is appended to `english-coach:quiz-sessions` in localStorage
- A brief inline confirmation appears below the stats bar: "✓ 本次测验已记录" (fades out after 2 seconds)

The existing reset button clears current session stats but does not delete saved sessions.

### 5.3 Sentence audio completion trigger

Each time the user taps the speaker (Volume2) button on a `SentenceCard`, the sentence's `natural` value is recorded under its category key in `english-coach:sentences-heard`. A category is considered **complete** when all sentences in it have been heard at least once.

A subtle checkmark appears on the category filter button when all sentences in that category have been heard.

### 5.4 "What's next" nudge on Plan tab

A banner appears at the top of the 学习计划 tab (above the "How this works" card) when there are incomplete days. It shows:

> 📍 继续学习：**Day {N} — {theme}**  ← first incomplete day
> [上次完成: Day {M}]  ← last completed day, if any

Tapping the banner scrolls to and auto-opens that day card.

If all 60 days are complete, the banner is replaced with a congratulations message.

### 5.5 Progress summary in Header

The existing `{progress}/60` counter in the header is supplemented with two small stat chips below it (visible on sm+ screens):

- **测验** — number of completed quiz sessions (e.g., "3 次")
- **句子** — number of categories where all sentences have been heard (e.g., "2/8")

---

## 6. Out of Scope

- No changes to the AI chat (对话练习) scenarios
- No changes to the SettingsModal
- No new quiz scenario types beyond the toggle described above
- Email templates are not auto-tracked for completion (read-only reference material)
