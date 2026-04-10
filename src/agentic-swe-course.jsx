import { useState } from "react";

const weeks = [
  {
    id: 0,
    label: "Week 0",
    title: "Getting Started",
    intro: "No pre-work required. We meet to introduce ourselves, see a live demo, and get Claude Code installed on everyone's machine.",
    detail: "Come prepared with a working terminal and the prerequisites above.",
    prework: [],
    activity: null,
    session: "Introductions, live demo, installation, and overview of the course arc.",
  },
  {
    id: 1,
    label: "Week 1",
    title: "One Coding Agent",
    intro: "This week is about getting your hands dirty. You install a coding agent, work through structured exercises, and learn the established best practices for steering it effectively.",
    prework: [
      { text: "Claude Code in Action", url: "https://anthropic.skilljar.com/claude-code-in-action", verb: "Complete", note: "Anthropic · Mar 2026 · includes exercises" },
      { text: "Best Practices for Claude Code", url: "https://code.claude.com/docs/en/best-practices", verb: "Read", note: "Anthropic" },
    ],
    activity: null,
    session: "We share what we tried during the course exercises and discuss what worked and what did not. Then we break into pairs for the nanobot exercise.",
    liveActivity: {
      title: "Hands-On with nanobot",
      description: "We work on a shared codebase: nanobot, an ultra-lightweight AI agent written in Python (~4,000 lines of core code). In pairs, each person picks a small task and uses Claude Code to solve it. You have never seen this codebase before, and that is the point: notice what context the agent needs and does not have.",
      repo: { url: "https://github.com/HKUDS/nanobot", label: "github.com/HKUDS/nanobot" },
      steps: [
        "Clone the repo and explore it with Claude Code.",
        "Pick a small task: a bug, a missing feature, a refactor.",
        "Use Claude Code to solve it. Pay attention to what context the agent asks for and what it misses.",
      ],
    },
  },
  {
    id: 2,
    label: "Week 2",
    title: "Adapting A Coding Agent",
    intro: "A generic agent is useful. An agent that knows your team's PR checklist, can query your database, and applies your coding standards automatically is transformative. This week you learn skills (how to encode knowledge), MCP (how to connect tools), and the deeper principles of context engineering.",
    prework: [
      { text: "Introduction to Agent Skills", url: "https://anthropic.skilljar.com/introduction-to-agent-skills", verb: "Complete", note: "Anthropic · Mar 2026 · includes exercises and reflections" },
      { text: "Introduction to Model Context Protocol", url: "https://anthropic.skilljar.com/introduction-to-model-context-protocol", verb: "Complete", note: "Anthropic · Mar 2026" },
      { text: "Introduction to Subagents", url: "https://anthropic.skilljar.com/introduction-to-subagents", verb: "Complete", note: "Anthropic · Apr 2026" },
      { text: "How Claude Code Works", url: "https://code.claude.com/docs/en/how-claude-code-works", verb: "Read", note: "Anthropic" },
      { text: "Effective Context Engineering for AI Agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", verb: "Read", note: "Anthropic · May 2025" },
    ],
    activity: null,
    session: "We discuss questions from the courses and the context engineering article. Then we do a skill-building sprint.",
    liveActivity: {
      title: "Skill-Building Sprint",
      description: "Pick either the nanobot codebase from Week 1 or something from your own workflow, and write a SKILL.md for it. Swap with a partner and test whether it triggers correctly.",
      repo: { url: "https://github.com/HKUDS/nanobot", label: "github.com/HKUDS/nanobot" },
      steps: [
        "Choose a codebase: nanobot or your own project.",
        "Write a SKILL.md that encodes a repeating pattern or workflow.",
        "Swap with a partner and test whether the skill triggers correctly.",
      ],
    },
  },
  {
    id: 3,
    label: "Week 3",
    title: "Solving Hard Problems",
    intro: "Agents struggle with large, real-world codebases. This week you learn the Research-Plan-Implement (RPI) workflow and the broader pattern of treating context as a managed, persistent artifact rather than an ephemeral chat.",
    prework: [
      { text: "No Vibes Allowed: Solving Hard Problems in Complex Codebases", url: "https://www.youtube.com/watch?v=rmvDxxNubIg", verb: "Watch", note: "Dex Horthy · AI Engineer · Dec 2025" },
      { text: "No More Slop: What We Got Wrong About RPI", url: "https://www.youtube.com/watch?v=YwZR6tc7qYg", verb: "Watch", note: "Dex Horthy · AI Engineer · 2026 · watch after the previous talk" },
      { text: "Conductor: Introducing Context-Driven Development for Gemini CLI", url: "https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/", verb: "Read", note: "Google · Dec 2025" },
      { text: "Advanced Context Engineering for Coding Agents", url: "https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md", verb: "Browse", note: "HumanLayer · Dec 2025 · optional" },
      { text: "Effective Context Engineering for AI Agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", verb: "Re-read", note: "Anthropic · May 2025 · with RPI in mind" },
    ],
    activity: {
      title: "RPI on OpenCode",
      description: "We all work on the same codebase for this exercise: OpenCode, an open source coding agent written in Go. Yes, you are using a coding agent to work on a coding agent's codebase.",
      repo: { url: "https://github.com/opencode-ai/opencode", label: "github.com/opencode-ai/opencode" },
      detail: "Clone the repo, explore it, and pick a non-trivial task: an open issue, a missing feature, a refactor that touches multiple packages, a bug. Then apply the RPI workflow deliberately:",
      steps: [
        "Research: Have Claude Code investigate the OpenCode codebase. Do not let it write code. Produce a research summary: how is the project structured? Where does the relevant logic live? What are the dependencies?",
        "Plan: From the research, produce a detailed plan (specific files, specific changes, testing strategy). Review the plan yourself before proceeding.",
        "Implement: Execute the plan. Compact context between phases.",
      ],
      deliverable: "Bring the research doc and the plan to the live session. Write one paragraph of reflection: did separating research from implementation change the outcome compared to how you would have done it in Week 1?",
    },
    session: "We review each other's research docs and plans in small groups and discuss what worked, what broke, and when the RPI discipline felt worth it vs. when you wanted to skip ahead.",
  },
  {
    id: 4,
    label: "Week 4",
    title: "Towards Agent-First SE",
    intro: "Everything so far has been about making a single agent useful to you on individual tasks. This week shifts the ambition: what does it take to build a repository where teams of agents can autonomously produce features that are correct, coherent, elegant, and merge-ready, with as little human input as possible? The readings approach this from different angles: how to sustain agent work across many sessions, how a team shipped an entire product with zero manually written code, how the SE discipline itself needs to change, and how multiple agents can coordinate on a shared codebase.",
    prework: [
      { text: "Effective Harnesses for Long-Running Agents", url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents", verb: "Read", note: "Anthropic · Nov 2025 · start here" },
      { text: "Harness Engineering: Leveraging Codex in an Agent-First World", url: "https://openai.com/index/harness-engineering/", verb: "Read", note: "OpenAI · Feb 2026" },
      { text: "Agentic Software Engineering: Foundational Pillars and a Research Roadmap", url: "https://arxiv.org/html/2509.06216v2", verb: "Read", note: "Hassan et al. · Sep 2025 · focus on SASE framework" },
      { text: "Verified Spec-Driven Development", url: "https://gist.github.com/dollspace-gay/d8d3bc3ecf4188df049d7a4726bb2a00", verb: "Read", note: "Doll · Mar 2026" },
      { text: "Agent Teams", url: "https://code.claude.com/docs/en/agent-teams", verb: "Read", note: "Anthropic" },
    ],
    activity: {
      title: "Harness Design Document",
      description: "Choose a real project (your current work, a side project, an open source project you contribute to). Write a one-page harness design document describing how you would set up an agent-first workflow for it. Cover at least:",
      steps: [
        "Repository knowledge structure: What goes in CLAUDE.md/AGENTS.md? What goes in docs/? How do you apply progressive disclosure?",
        "Architectural guardrails: What invariants would you enforce mechanically (linters, CI, structural tests)? What do you leave flexible?",
        "Agent legibility: What is currently invisible to an agent (Slack discussions, tacit knowledge, undocumented conventions)? How would you make it legible?",
        "Feedback loops: How does the agent validate its own work? Where does human review add the most leverage?",
        "Honest risks: What would be the hardest part of this transition for your team?",
      ],
      deliverable: "A markdown document (roughly one page, more is fine). If you are doing the Week 5 capstone, this document becomes the blueprint for your project.",
    },
    session: "Each participant presents their harness design. We discuss what is most creative, what is most practical, and close with a course retrospective.",
  },
  {
    id: 5,
    label: "Week 5",
    title: "Capstone",
    optional: true,
    intro: "No new readings. This is where everything comes together. You build a real project from scratch, but instead of writing the code yourself, you design the harness and let the agent be the primary code producer.",
    prework: [],
    activity: {
      title: "Build a Project, Harness-First",
      description: "Choose your own project idea. It can be anything: a CLI tool, a web app, an API, a library, a game. The scope should be ambitious enough that you cannot finish it in one sitting, but realistic enough to have something working by demo day.",
      detail: "You are not just building a project. You are building the engineering system around the project. Use the agent to build the harness itself. Skills, hooks, subagent definitions, MCP configurations, documentation structure: all of it can and should be agent-produced.",
      steps: [
        "CLAUDE.md / AGENTS.md: project standards, architecture decisions, and constraints",
        "docs/ directory: progressive disclosure, high-level map at the top, detailed references linked from it",
        "Skills: repeating patterns (your testing approach, your commit format, your code style)",
        "Hooks: automated operations (linting on save, validation before commits)",
        "Subagents: delegated work (review, testing, documentation)",
        "MCP servers: external tools and data access if needed",
        "Architectural guardrails: linters, structural tests, CI",
        "Progress tracking: so the agent always knows what has been done and what is next",
      ],
    },
    successCriterion: "A fresh agent session, dropped into your repo with no prior context, can pick up a new feature and produce a result that is working, tested, validated, correct, coherent with the principles of the codebase, and merge-ready. No slop. Minimal human steering. As models get more capable and agent throughput continues to exceed what a single human can review, the quality of your harness determines the quality of the output. You are building the system that scales.",
    deliverableNote: "The repository itself, including the harness. The code matters, but the scaffolding matters more. Ask yourself: if someone else cloned this repo and ran a team of agents on it, would the output be good?",
    session: "Demo day. Each participant demos their project and walks through their harness: what did you set up, what worked, what would you change? Show both the running project and the engineering system behind it.",
  },
];

const resources = {
  courses: [
    { text: "AI Fluency: Framework & Foundations", url: "https://anthropic.skilljar.com/ai-fluency-framework-foundations", note: "Anthropic · prerequisite · Mar 2026" },
    { text: "Claude Code in Action", url: "https://anthropic.skilljar.com/claude-code-in-action", note: "Anthropic · Mar 2026" },
    { text: "Introduction to Agent Skills", url: "https://anthropic.skilljar.com/introduction-to-agent-skills", note: "Anthropic · Mar 2026" },
    { text: "Introduction to Model Context Protocol", url: "https://anthropic.skilljar.com/introduction-to-model-context-protocol", note: "Anthropic · Mar 2026" },
    { text: "AI Capabilities and Limitations", url: "https://anthropic.skilljar.com/ai-capabilities-and-limitations", note: "Anthropic · prerequisite · Apr 2026" },
    { text: "Introduction to Subagents", url: "https://anthropic.skilljar.com/introduction-to-subagents", note: "Anthropic · Apr 2026" },
  ],
  docs: [
    { text: "Claude Code Product Page", url: "https://claude.com/product/claude-code", note: "Anthropic" },
    { text: "How Claude Code Works", url: "https://code.claude.com/docs/en/how-claude-code-works", note: "Anthropic" },
    { text: "Best Practices for Claude Code", url: "https://code.claude.com/docs/en/best-practices", note: "Anthropic" },
    { text: "Agent Teams", url: "https://code.claude.com/docs/en/agent-teams", note: "Anthropic" },
  ],
  articles: [
    { text: "Effective Context Engineering for AI Agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", note: "Anthropic · May 2025" },
    { text: "Effective Harnesses for Long-Running Agents", url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents", note: "Anthropic · Nov 2025" },
    { text: "No Vibes Allowed: Solving Hard Problems in Complex Codebases", url: "https://www.youtube.com/watch?v=rmvDxxNubIg", note: "HumanLayer · Dec 2025" },
    { text: "No More Slop: What We Got Wrong About RPI", url: "https://www.youtube.com/watch?v=YwZR6tc7qYg", note: "HumanLayer · 2026" },
    { text: "Advanced Context Engineering for Coding Agents", url: "https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md", note: "HumanLayer · Dec 2025" },
    { text: "Conductor: Context-Driven Development for Gemini CLI", url: "https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/", note: "Google · Dec 2025" },
    { text: "Harness Engineering: Leveraging Codex in an Agent-First World", url: "https://openai.com/index/harness-engineering/", note: "OpenAI · Feb 2026" },
    { text: "Agentic SE: Foundational Pillars and a Research Roadmap", url: "https://arxiv.org/html/2509.06216v2", note: "Hassan et al. · Sep 2025" },
    { text: "Verified Spec-Driven Development", url: "https://gist.github.com/dollspace-gay/d8d3bc3ecf4188df049d7a4726bb2a00", note: "Doll · Mar 2026" },
  ],
  agents: [
    { text: "Codex by OpenAI", url: "https://openai.com/codex/", note: "OpenAI" },
    { text: "GitHub Copilot CLI", url: "https://github.com/features/copilot/cli", note: "GitHub" },
    { text: "OpenCode", url: "https://opencode.ai/", note: "Anomaly Innovations" },
    { text: "nanobot", url: "https://github.com/HKUDS/nanobot", note: "HKUDS" },
    { text: "OpenClaw", url: "https://docs.openclaw.ai/start/getting-started", note: "Peter Steinberger" },
  ],
};

const furtherReading = [
  {
    category: "Deployment Reports",
    items: [
      {
        title: "Minions: Stripe's One-Shot End-to-End Coding Agents",
        url: "https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents",
        source: "Stripe Engineering",
        blurb: "Stripe describes Minions, an internal system of unattended coding agents that produces over 1,000 merged pull requests per week. The authors argue that generic agents underperform on large, mature codebases and report that observed gains came primarily from integration with internal tooling (homegrown libraries, Sorbet types, Stripe-specific developer tools), combined with deterministic guardrails such as linting and selective CI.",
      },
      {
        title: "Minions, Part 2: The Infrastructure Behind Stripe's Coding Agents",
        url: "https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2",
        source: "Stripe Engineering",
        blurb: "Technical companion to Part 1. The authors describe the infrastructure supporting Minions: isolated and parallelizable execution via Stripe's existing \"devbox\" cloud developer environments; a \"blueprint\" orchestration pattern combining deterministic code nodes with agent loops; and Toolshed, a centralized MCP server exposing roughly 500 internal tools. They report that infrastructure originally built for human developer productivity transferred largely unchanged to agent productivity.",
      },
    ],
  },
  {
    category: "Harness Architecture",
    items: [
      {
        title: "Scaling Managed Agents",
        url: "https://www.anthropic.com/engineering/managed-agents",
        source: "Anthropic · Feb 2026",
        blurb: "Anthropic argues that harnesses encode assumptions that become obsolete as underlying models improve, and propose an operating-systems-inspired decomposition of the agent runtime: the brain (model plus harness), the hands (sandboxes and tools), and the session (an event log), each communicating through narrow and stable interfaces. Reported results include a 60% reduction in time-to-first-token at p50, improved fault tolerance, and a security boundary in which credentials no longer flow into sandboxes executing untrusted code.",
      },
      {
        title: "Harness Design for Long-Running Application Development",
        url: "https://www.anthropic.com/engineering/harness-design-long-running-apps",
        source: "Anthropic · Mar 2026",
        blurb: "Rajasekaran presents a multi-agent architecture for building full applications with Claude Code. The system separates generation from evaluation, motivated by the observation that single agents tend to assess their own output favorably, and relies on structured context handoffs rather than compaction to preserve coherence across long tasks. A three-agent planner / generator / evaluator configuration negotiates \"sprint contracts\" before implementation, with the evaluator using Playwright to test functionality end-to-end. The full harness produces measurably more functional applications than solo generation at roughly 20x the token cost.",
      },
    ],
  },
  {
    category: "Evaluation & Iteration",
    items: [
      {
        title: "Infrastructure Noise in Agentic Coding Evals",
        url: "https://www.anthropic.com/engineering/infrastructure-noise",
        source: "Anthropic · Feb 2026",
        blurb: "The authors run Terminal-Bench 2.0 across six resource configurations (CPU, RAM, enforcement strictness) and report a 6-point gap between the most and least resourced setups, comparable in magnitude to the margin between top leaderboard entries. They find that up to roughly 3x the benchmark's specified resources, additional allocation fixes infrastructure failures without altering task difficulty; beyond that threshold, additional resources begin to enable models to solve previously unsolvable problems. The authors recommend evals specify both guaranteed allocation and hard kill thresholds separately, and caution that benchmark differences below approximately 3 points should be interpreted carefully absent documented infrastructure matching.",
      },
      {
        title: "Evaluating Skills",
        url: "https://blog.langchain.com/evaluating-skills/",
        source: "LangChain · Mar 2026",
        blurb: "LangChain proposes a four-step evaluation protocol for skills (the dynamically loaded instruction packages used by coding agents such as Claude Code): define target tasks, baseline without the skill, run with the skill enabled, compare. The protocol relies on isolated Docker environments, constrained tasks with measurable outcomes, and trace-level observability for post-hoc analysis of agent decisions. The authors report an 82% improvement in success rate on their benchmark tasks when the skill under test was enabled.",
      },
      {
        title: "How We Build Evals for Deep Agents",
        url: "https://blog.langchain.com/how-we-build-evals-for-deep-agents/",
        source: "LangChain · Mar 2026",
        blurb: "LangChain describes the evaluation methodology used for their Deep Agents work. They argue that the quantity of evaluations does not mechanically translate to agent quality, and advocate for targeted tests tied to observed production behavior. The eval set draws from three sources (dogfooding feedback, adapted external benchmarks, and hand-written unit tests), grouped by capability category such as file operations or tool use. Beyond correctness, they track efficiency metrics (step ratio, tool call ratio, solve rate) and compare agent trajectories against a hand-defined ideal trajectory to distinguish correct reasoning from successful workarounds.",
      },
      {
        title: "Continual Learning for AI Agents",
        url: "https://blog.langchain.com/continual-learning-for-ai-agents/",
        source: "LangChain · Apr 2026",
        blurb: "LangChain proposes a three-layer decomposition of where learning can occur in an agent system: the model itself, the operational harness (code and built-in instructions), and the external context (skills and configurable instructions). Each layer is treated as an independent surface for improvement, with execution traces as the shared substrate for extracting signal. The framing is presented as a vocabulary for deciding where to invest (at the model, at the harness, or at the context) when an agent underperforms.",
      },
      {
        title: "Better Harness: A Recipe for Harness Hill-Climbing with Evals",
        url: "https://blog.langchain.com/better-harness-a-recipe-for-harness-hill-climbing-with-evals/",
        source: "LangChain · Apr 2026",
        blurb: "The authors treat eval results as the training signal for harness modifications (prompt edits, tool changes, instruction rewrites) without updating model weights. Their four-stage pipeline sources and categorizes evals, splits them into optimization and holdout sets, autonomously diagnoses failures and proposes harness modifications, and validates proposed changes against regressions. They report improvements on holdout sets for both Claude Sonnet 4.6 and GLM-5, with discovered modifications (e.g. \"use reasonable defaults\" added to a prompt, sharper tool descriptions) generalizing to unseen examples.",
      },
    ],
  },
  {
    category: "Research",
    items: [
      {
        title: "Meta-Harness: End-to-End Optimization of Model Harnesses",
        url: "https://arxiv.org/abs/2603.28052",
        source: "Lee et al. · arXiv · Mar 2026",
        blurb: "Lee et al. introduce Meta-Harness, an outer-loop system that searches over harness code for LLM applications. The agentic proposer has filesystem access to the source code, scores, and execution traces of all prior candidates, avoiding the aggressive feedback compression that the authors argue limits existing text optimizers in this setting. Reported results: +7.7 points over a state-of-the-art context management system on online text classification at 4x fewer context tokens; +4.7 points on average across five held-out models on 200 IMO-level retrieval-augmented math problems; and improved performance over hand-engineered baselines on TerminalBench-2 for agentic coding.",
      },
      {
        title: "Hyperagents: Self-Referential Agents with Metacognitive Self-Modification",
        url: "https://arxiv.org/abs/2603.19461",
        source: "Zhang et al. · arXiv · Mar 2026",
        blurb: "Zhang et al. introduce hyperagents, self-referential agents that integrate a task agent and a meta agent into a single editable program in which the meta-level modification procedure is itself editable. The construction generalizes the Darwin Gödel Machine beyond coding-specific self-improvement: because the meta-level is no longer assumed to be aligned with any particular task domain, self-modification skill can in principle improve on arbitrary computable tasks. The authors report that DGM-Hyperagents outperforms prior self-improving systems across several domains and develops meta-level capabilities (persistent memory, performance tracking) that transfer across runs.",
      },
    ],
  },
];

const palette = {
  bg: "#FFFFFF",       // page background
  surface: "#F7F7F7",  // card surfaces
  border: "#E5E5E5",   // card borders and dividers
  text: "#0A0A0A",     // headings and primary text (also used for inline links + emphasized labels)
  body: "#262626",     // body paragraph text
  muted: "#737373",    // meta labels, dates, mono annotations
  stepNumber: "#525252", // numbered-step index in activity lists
  orange: "#CC785C",   // Anthropic clay-orange, used only for link arrows
};

function Arrow({ size = 12, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 11L11 1M11 1H4M11 1V8" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Inline link with the standard "text + orange arrow" treatment.
// Used for anchors embedded inside flowing text (Our Tool card, activity repo links).
function InlineLink({ href, children, style }) {
  return (
    <a
      className="link-plain"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: palette.text,
        display: "inline-flex",
        alignItems: "baseline",
        gap: "4px",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children} <Arrow size={10} color={palette.orange} />
    </a>
  );
}

// Unified link row: [index.] [verb] name  meta  ↗
// Used for both week pre-work lists and the All Resources section.
function LinkRow({ href, title, meta, index, verb, compact = false }) {
  return (
    <a
      className="link-a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: compact ? "8px" : "10px",
        textDecoration: "none",
        padding: compact ? "4px 0" : "6px 0",
        lineHeight: 1.55,
      }}
    >
      {index !== undefined && (
        <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: palette.muted, minWidth: "20px" }}>
          {index}.
        </span>
      )}
      <span style={{ color: palette.body, fontFamily: "var(--body)", fontSize: compact ? "14px" : "15px" }}>
        {verb && <>{verb}{" "}</>}
        <em style={{ color: palette.text, fontStyle: "normal", fontWeight: 400 }}>{title}</em>
      </span>
      {meta && (
        <span style={{ fontFamily: "var(--mono)", fontSize: "10.5px", color: palette.muted, whiteSpace: "nowrap" }}>
          {meta}
        </span>
      )}
      <Arrow size={compact ? 10 : 12} color={palette.orange} />
    </a>
  );
}

function OptionalBadge() {
  return (
    <span style={{
      display: "inline-block", marginLeft: "12px", fontSize: "9px", fontFamily: "var(--mono)",
      letterSpacing: "0.1em", textTransform: "uppercase", color: palette.muted,
      border: `1px solid ${palette.border}`, borderRadius: "3px", padding: "2px 7px", verticalAlign: "middle",
    }}>
      Optional
    </span>
  );
}

function WeekCard({ week, isOpen, onToggle }) {
  return (
    <div style={{ borderTop: `1px solid ${palette.border}` }}>
      <AccordionHeader
        leftLabel={week.label}
        title={week.title}
        trailing={week.optional ? <OptionalBadge /> : null}
        isOpen={isOpen}
        onClick={onToggle}
      />

      {isOpen && (
        <div style={{ paddingLeft: "76px", paddingBottom: "36px", paddingRight: "16px", animation: "fadeIn 0.25s ease" }}>
          <p style={{ fontFamily: "var(--body)", fontSize: "15.5px", lineHeight: 1.72, color: palette.body, marginBottom: "24px", maxWidth: "620px" }}>
            {week.intro}
          </p>
          {week.detail && (
            <p style={{ fontFamily: "var(--body)", fontSize: "14.5px", lineHeight: 1.7, color: palette.muted, marginBottom: "24px", maxWidth: "620px" }}>
              {week.detail}
            </p>
          )}

          {week.prework.length > 0 && (
            <div style={{ marginBottom: "26px" }}>
              <Label>Pre-work</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {week.prework.map((item, i) => (
                  <LinkRow key={i} href={item.url} title={item.text} meta={item.note} index={i + 1} verb={item.verb} />
                ))}
              </div>
            </div>
          )}

          {week.activity && (
            <ActivityCard label="Pre-work Activity" activity={week.activity} style={{ marginBottom: "26px" }} />
          )}

          {week.successCriterion && (
            <div style={{ borderLeft: `3px solid ${palette.text}`, paddingLeft: "20px", marginBottom: "26px", maxWidth: "620px" }}>
              <Label color={palette.text}>The Success Criterion</Label>
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", lineHeight: 1.72, color: palette.body }}>
                {week.successCriterion}
              </p>
            </div>
          )}

          {week.deliverableNote && (
            <p style={{
              fontFamily: "var(--mono)", fontSize: "11.5px", color: palette.muted, marginBottom: "26px",
              padding: "10px 14px", background: palette.surface, borderRadius: "4px", lineHeight: 1.6, maxWidth: "620px",
              border: `1px solid ${palette.border}`,
            }}>
              Deliverable: {week.deliverableNote}
            </p>
          )}

          <div style={{ marginBottom: week.liveActivity ? "26px" : "0" }}>
            <Label>Live Session</Label>
            <p style={{ fontFamily: "var(--body)", fontSize: "14.5px", lineHeight: 1.72, color: palette.body, maxWidth: "620px" }}>
              {week.session}
            </p>
          </div>

          {week.liveActivity && (
            <ActivityCard label="Live Session Activity" activity={week.liveActivity} />
          )}
        </div>
      )}
    </div>
  );
}

function Label({ children, color }) {
  return (
    <div style={{
      fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
      color: color || palette.muted, marginBottom: "12px", fontWeight: 500,
    }}>
      {children}
    </div>
  );
}

// Shared surface for every content card: prerequisites, our tool,
// in-week activity cards, and further reading entries. The `hover-card`
// class handles the consistent hover behavior across all of them.
function Card({ as: Tag = "div", style, children, ...rest }) {
  return (
    <Tag
      className="hover-card"
      style={{
        background: palette.surface,
        border: `1px solid ${palette.border}`,
        borderRadius: "8px",
        padding: "22px 24px",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Single-column page section with the standard 820px reading column.
function Section({ style, children }) {
  return (
    <section style={{ maxWidth: "820px", margin: "0 auto", padding: "0 28px", ...style }}>
      {children}
    </section>
  );
}

// Top-level section heading used for Curriculum / All Resources / Further Reading.
function SectionHeading({ children }) {
  return (
    <h2 style={{
      fontFamily: "var(--display)", fontSize: "28px", fontWeight: 600,
      color: palette.text, letterSpacing: "-0.01em",
    }}>
      {children}
    </h2>
  );
}

// "Expand all" / "Collapse all" pair used on Curriculum and Further Reading sections.
function ToggleAll({ onExpand, onCollapse }) {
  const btnStyle = {
    background: "none", border: "none", cursor: "pointer",
    fontFamily: "var(--mono)", fontSize: "11px", color: palette.muted, letterSpacing: "0.04em",
  };
  return (
    <div style={{ display: "flex", gap: "14px" }}>
      <button className="small-btn" onClick={onExpand} style={btnStyle}>Expand all</button>
      <button className="small-btn" onClick={onCollapse} style={btnStyle}>Collapse all</button>
    </div>
  );
}

// Accordion button row used by WeekCard and the Further Reading groups.
function AccordionHeader({ leftLabel, title, rightMeta, trailing, titleSize = "22px", isOpen, onClick }) {
  return (
    <button
      className="accordion-btn"
      onClick={onClick}
      style={{
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "baseline",
        gap: "20px",
        padding: "24px 0",
        textAlign: "left",
      }}
    >
      <span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.06em", color: palette.text, minWidth: "56px", fontWeight: 500 }}>
        {leftLabel}
      </span>
      <span style={{ fontFamily: "var(--display)", fontSize: titleSize, fontWeight: 500, color: palette.text, flex: 1, lineHeight: 1.35, letterSpacing: "-0.01em" }}>
        {title}
        {trailing}
      </span>
      {rightMeta && (
        <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: palette.muted }}>
          {rightMeta}
        </span>
      )}
      <span style={{
        fontFamily: "var(--display)", fontSize: "22px", color: palette.muted, fontWeight: 300,
        transition: "transform 0.25s ease", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
      }}>
        +
      </span>
    </button>
  );
}

// Renders the body of a Pre-work Activity or Live Session Activity card.
function ActivityCard({ label, activity, style }) {
  return (
    <Card style={{ padding: "24px 26px", maxWidth: "660px", ...style }}>
      <Label color={palette.text}>{label}</Label>
      <h5 style={{
        fontFamily: "var(--display)", fontSize: "18px", fontWeight: 600,
        color: palette.text, marginBottom: "8px", letterSpacing: "-0.01em",
      }}>
        {activity.title}
      </h5>
      <p style={{ fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.72, color: palette.body, marginBottom: "14px" }}>
        {activity.description}
      </p>
      {activity.repo && (
        <div style={{ marginBottom: "14px" }}>
          <InlineLink href={activity.repo.url} style={{ fontFamily: "var(--mono)", fontSize: "12px", gap: "6px" }}>
            {activity.repo.label}
          </InlineLink>
        </div>
      )}
      {activity.detail && (
        <p style={{ fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.72, color: palette.body, marginBottom: "14px" }}>
          {activity.detail}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        {activity.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.6, color: palette.body }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: palette.stepNumber, minWidth: "16px", paddingTop: "2px" }}>{i + 1}</span>
            {step}
          </div>
        ))}
      </div>
      {activity.deliverable && (
        <p style={{
          fontFamily: "var(--mono)", fontSize: "11.5px", color: palette.muted, marginTop: "16px",
          padding: "10px 14px", background: palette.bg, borderRadius: "4px", lineHeight: 1.6,
        }}>
          Deliverable: {activity.deliverable}
        </p>
      )}
    </Card>
  );
}

function FurtherReadingItem({ item }) {
  return (
    <Card
      as="a"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", textDecoration: "none", marginBottom: "16px" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px" }}>
        <h5 style={{
          fontFamily: "var(--display)", fontSize: "18px", fontWeight: 600,
          color: palette.text, lineHeight: 1.35, flex: 1, letterSpacing: "-0.01em",
        }}>
          {item.title}
        </h5>
        <Arrow size={11} color={palette.orange} />
      </div>
      {item.source && (
        <div style={{
          fontFamily: "var(--mono)", fontSize: "10.5px", color: palette.muted,
          letterSpacing: "0.04em", marginBottom: "10px",
        }}>
          {item.source}
        </div>
      )}
      <p style={{
        fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.72,
        color: palette.body, margin: 0,
      }}>
        {item.blurb}
      </p>
    </Card>
  );
}

function ResourceSection({ title, items }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <Label>{title}</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {items.map((item, i) => (
          <LinkRow key={i} href={item.url} title={item.text} meta={item.note} compact />
        ))}
      </div>
    </div>
  );
}

export default function AgenticSECourse() {
  const [openWeeks, setOpenWeeks] = useState(new Set());
  const toggle = (id) => setOpenWeeks(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const expandAll = () => setOpenWeeks(new Set(weeks.map(w => w.id)));
  const collapseAll = () => setOpenWeeks(new Set());

  const [openGroups, setOpenGroups] = useState(new Set());
  const toggleGroup = (i) => setOpenGroups(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const expandAllGroups = () => setOpenGroups(new Set(furtherReading.map((_, i) => i)));
  const collapseAllGroups = () => setOpenGroups(new Set());

  return (
    <div style={{ minHeight: "100vh", background: palette.bg, color: palette.text,
      "--body": "'Source Serif 4', 'Source Serif Pro', Georgia, serif",
      "--display": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      "--mono": "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
        * { margin:0; padding:0; box-sizing:border-box; }
        ::selection { background: #E5E5E5; color: #0A0A0A; }

        /* Inline resource and prework links — underline on hover only */
        .link-a em { transition: text-decoration 0.15s ease; }
        .link-a svg { transition: transform 0.18s ease; }
        .link-a:hover em {
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
        }
        .link-a:hover svg { transform: translate(2px, -2px); }

        /* Plain anchor links — no underline by default, underline on hover */
        .link-plain {
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .link-plain svg { transition: transform 0.18s ease; }
        .link-plain:hover {
          text-decoration: underline !important;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
        }
        .link-plain:hover svg { transform: translate(2px, -2px); }

        /* Interactive content cards — Further Reading items and in-week activity cards */
        .hover-card {
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        .hover-card svg { transition: transform 0.2s ease; }
        .hover-card:hover {
          border-color: #0A0A0A !important;
          background: #F0F0F0 !important;
          transform: translateY(-1px);
        }
        .hover-card:hover svg { transform: translate(2px, -2px); }

        /* Accordion rows (week cards and Further Reading group headers) */
        .accordion-btn { transition: background 0.15s ease; }
        .accordion-btn:hover { background: #FAFAFA !important; }

        /* Small text buttons (Expand all / Collapse all) */
        .small-btn { transition: color 0.15s ease; }
        .small-btn:hover { color: #0A0A0A !important; }
      `}</style>

      <header style={{ maxWidth: "820px", margin: "0 auto", padding: "72px 28px 0" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: palette.muted, marginBottom: "22px", fontWeight: 500 }}>
          Inverse Classroom · 5 Sessions + Capstone + Further Reading
        </div>
        <h1 style={{
          fontFamily: "var(--display)", fontSize: "clamp(40px, 5.5vw, 56px)", fontWeight: 700,
          lineHeight: 1.05, color: palette.text, marginBottom: "32px", letterSpacing: "-0.02em",
        }}>
          Agentic SE Course
        </h1>
        <p style={{ fontFamily: "var(--display)", fontSize: "22px", lineHeight: 1.5, fontWeight: 400, color: palette.text, maxWidth: "640px", marginBottom: "24px", letterSpacing: "-0.005em" }}>
          Coding agents are already exceeding human throughput for many software engineering tasks. As model capabilities continue to improve, agents will increasingly be the primary producers of code. The engineering challenge shifts: the bottleneck is no longer writing code but ensuring that agent-produced code is correct, tested, coherent, and merge-ready, with as little human steering as possible.
        </p>
        <p style={{ fontFamily: "var(--body)", fontSize: "17px", lineHeight: 1.72, color: palette.body, maxWidth: "640px", marginBottom: "16px" }}>
          This course prepares you for that shift. You start by using a coding agent. Then you customise it. Then you learn disciplined workflows for complex codebases. And finally, you learn to design repositories built for agents: environments where teams of agents can do real work and do it right. The industry calls this <strong style={{ fontWeight: 600, color: palette.text }}>harness engineering</strong>. We know this is new ground. Rather than prescribe answers, we explore several perspectives on what agent-first engineering could look like.
        </p>
        <p style={{ fontFamily: "var(--body)", fontSize: "17px", lineHeight: 1.72, color: palette.body, maxWidth: "640px", marginBottom: "16px" }}>
          Each week you complete pre-work on your own (courses, readings, videos) and then we meet for one hour to discuss, ask questions, and work on something together.
        </p>
        <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: palette.text, lineHeight: 1.6, marginBottom: "12px" }}>
          The Anthropic Skilljar courses used in Weeks 1 and 2 award certificates on completion.
        </p>
        <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: palette.muted, lineHeight: 1.6 }}>
          This curriculum was designed in March 2026. If you are reading this three months from now, things might be very different and the industry might be in a much more autonomous place. Please do your own research and validate that this content is still current and at the frontier.
        </p>
      </header>

      {/* Prerequisites */}
      <Section style={{ padding: "52px 28px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <Card>
            <Label>Prerequisites</Label>
            <div style={{ fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.75, color: palette.body }}>
              <div style={{ marginBottom: "6px" }}>A working terminal (macOS, Linux, or WSL)</div>
              <div style={{ marginBottom: "6px" }}>A GitHub account with a repo to experiment on</div>
              <LinkRow
                href="https://anthropic.skilljar.com/ai-fluency-framework-foundations"
                title="AI Fluency: Framework & Foundations"
                meta="Anthropic · Mar 2026 · required"
                compact
              />
              <LinkRow
                href="https://anthropic.skilljar.com/ai-capabilities-and-limitations"
                title="AI Capabilities and Limitations"
                meta="Anthropic · Apr 2026 · required"
                compact
              />
            </div>
          </Card>
          <Card>
            <Label>Our Tool</Label>
            <div style={{ fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.75, color: palette.body }}>
              We use{" "}
              <InlineLink href="https://claude.com/product/claude-code" style={{ fontWeight: 600 }}>
                Claude Code
              </InlineLink>
              {" "}as our primary coding agent. The principles transfer directly to other agents (Codex, Copilot CLI, OpenCode), but having everyone on the same tool keeps things simple.
            </div>
          </Card>
        </div>
      </Section>

      {/* Curriculum */}
      <Section style={{ padding: "56px 28px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
          <SectionHeading>Curriculum</SectionHeading>
          <ToggleAll onExpand={expandAll} onCollapse={collapseAll} />
        </div>
        {weeks.map(w => <WeekCard key={w.id} week={w} isOpen={openWeeks.has(w.id)} onToggle={() => toggle(w.id)} />)}
        <div style={{ borderTop: `1px solid ${palette.border}` }} />
      </Section>

      {/* Resources */}
      <Section style={{ padding: "60px 28px 0" }}>
        <div style={{ marginBottom: "28px" }}>
          <SectionHeading>All Resources</SectionHeading>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 52px" }}>
          <ResourceSection title="Courses" items={resources.courses} />
          <ResourceSection title="Documentation" items={resources.docs} />
          <ResourceSection title="Articles & Talks" items={resources.articles} />
          <ResourceSection title="Other Agents" items={resources.agents} />
        </div>
      </Section>

      {/* Further Reading */}
      <Section style={{ padding: "52px 28px 72px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
          <SectionHeading>Further Reading</SectionHeading>
          <ToggleAll onExpand={expandAllGroups} onCollapse={collapseAllGroups} />
        </div>
        <p style={{ fontFamily: "var(--body)", fontSize: "14.5px", lineHeight: 1.72, color: palette.muted, marginBottom: "28px", maxWidth: "620px" }}>
          Selected deployment reports, architecture pieces, evaluation methodology, and recent research on agent-first software engineering. Annotations are descriptive, not endorsements. Read them critically.
        </p>
        {furtherReading.map((group, gi) => {
          const isOpen = openGroups.has(gi);
          return (
            <div key={gi} style={{ borderTop: `1px solid ${palette.border}` }}>
              <AccordionHeader
                leftLabel={String(gi + 1).padStart(2, "0")}
                title={group.category}
                rightMeta={`${group.items.length} ${group.items.length === 1 ? "entry" : "entries"}`}
                titleSize="20px"
                isOpen={isOpen}
                onClick={() => toggleGroup(gi)}
              />
              {isOpen && (
                <div style={{ paddingBottom: "16px", animation: "fadeIn 0.25s ease" }}>
                  {group.items.map((item, i) => <FurtherReadingItem key={i} item={item} />)}
                </div>
              )}
            </div>
          );
        })}
        <div style={{ borderTop: `1px solid ${palette.border}` }} />
      </Section>
    </div>
  );
}
