---
name: summarize-chat-to-ai-prompts
description: Summarize the current Cursor chat into ai-prompts markdown (Prompt, AI Response Summary, Validation Notes). Use after a focused session or when the user asks to save prompt history.
---

# Summarize chat to ai-prompts

Write or append `ai-prompts/<file>.md` using:

- Prompt
- AI Response Summary
- Validation Notes (or Debugging Outcome / Edits You Made)

Map sessions:

- requirements → `requirements-and-planning.md`
- cases → `test-design.md`
- data → `test-data.md`
- specs/debug → `automation-and-debugging.md`
- readme/report → `documentation-and-summary.md`

Do not dump full model transcripts. Capture the real prompt, what was accepted, and what a human changed.
