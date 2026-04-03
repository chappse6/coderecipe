
## Design System

This project uses the **Lemon Kitchen** palette. Full spec: `DESIGN.md` (project root).

**Quick rules:**
- Primary color: `recipe-primary` (`#FCCA59`) — buttons, CTA, logo accent
- Card color: `recipe-card` (`#99B7F5`) — main section cards
- Accent color: `orange-500` (`#F97316`) — links, badges, secondary emphasis
- Page background: `bg-white dark:bg-stone-800`
- Card background: `bg-white dark:bg-stone-700`
- Body text: `text-stone-700 dark:text-stone-100`
- Borders: `border-stone-200 dark:border-stone-700` — NEVER use `border-amber-100` for structural borders
- Primary button text must be `text-stone-800` (not white — yellow background needs dark text for contrast)
- Use `bg-recipe-primary` / `hover:bg-recipe-primary-hover` instead of raw `bg-amber-400` / `bg-amber-500`

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
