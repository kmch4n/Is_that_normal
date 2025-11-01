# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page presentation website exploring how AI development will reshape society's concept of "normal" (普通). The site presents a seminar on the future of work, basic income, and human values in an AI-driven world. It's designed as a keyboard-navigable presentation (arrow keys ← →) with Japanese content.

## Tech Stack

Pure vanilla web technologies - no build tools, no dependencies:
- **HTML** (`index.html`) - single semantic page with sections
- **CSS** (`styles.css`) - custom dark theme with CSS variables
- **JavaScript** (`script.js`) - vanilla JS for interactions

## Architecture

### Content Structure
The presentation flows through 9 main sections (defined as `<section>` elements):
1. `#now` - Definition of current "normal" + interactive score slider
2. `#future` - Timeline of labor changes (2030s, 2040s)
3. `#bi` - Basic income implications
4. `#value` - New values emerging in AI era
5. `#human` - Three pillars of human irreplaceability
6. `#happy` - Happiness axis shift
7. `#reward` - Redesign of monetary incentives
8. `#key` - Key message
9. `#essence` - Core thesis + export buttons

### JavaScript Components

**Navigation System** (`script.js:3-27`)
- Uses IntersectionObserver for scroll-based section detection
- Updates nav bar `aria-current` attributes for accessibility
- `isManualNav` flag prevents conflicts between keyboard/scroll navigation

**Score Slider** (`script.js:28-52`)
- Saves user's "normal score" (0-100) to localStorage under `normal-score-v1`
- Dynamically updates label: 0-33="選好優先", 34-66="生活優先", 67-100="達成志向"
- Uses passive event listeners for performance

**Keyboard Navigation** (`script.js:68-81`)
- Arrow keys (← →) move between sections with smooth scrolling
- Respects `prefers-reduced-motion` for accessibility
- Temporarily sets `isManualNav=true` to avoid observer conflicts

### Styling Philosophy

**CSS Variables** (`styles.css:1-13`)
- Dark theme palette defined in `:root`
- `--w: 1000px` sets consistent max-width for all containers

**Responsive Design**
- Mobile breakpoint: `@media (max-width:860px)`
- Grid layouts collapse from multi-column to single column
- Nav becomes horizontally scrollable on narrow screens

**Animation**
- Fade-in on scroll using `.fade` + IntersectionObserver
- All transitions disabled when `prefers-reduced-motion: reduce`

## Common Development Commands

### Testing Locally
Open `index.html` directly in a browser (no server required). For live reload:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server)
npx http-server -p 8000
```

### Linting/Validation
No automated linters configured. Manually validate:
- HTML: https://validator.w3.org/
- CSS: https://jigsaw.w3.org/css-validator/
- JS: Check browser console for errors


## Key Constraints & Decisions

1. **No Build Step** - Everything must run directly in the browser. Avoid suggesting npm packages, TypeScript, or bundlers.

2. **Accessibility First** - All interactive elements have ARIA labels, keyboard support is required, and reduced motion is respected.

3. **Japanese Language** - All user-facing content is in Japanese. Maintain this when editing HTML content.

4. **Single File Architecture** - Keep HTML, CSS, and JS in separate files but avoid creating additional modules or dependencies.

5. **localStorage for Persistence** - The score slider uses localStorage with versioned keys (`normal-score-v1`). Future features should follow this pattern.

## GitHub Pages Configuration

Site URL: `https://kmch4n.github.io/Is_that_normal/`

OGP tags configured in `index.html:14-18` for social media previews (LINE, Twitter, etc.)

## Known Issues & Quirks

- The score slider (`#score`) previously had bugs with initialization - now fixed in `script.js:38-44` by properly parsing values and checking null.
- Arrow key navigation was previously causing nav bar highlight issues - resolved by adding `isManualNav` flag and timeout logic (`script.js:71-76`).
- Timeline dots (`.t-dot`) only display on mobile to avoid cluttering desktop view.

## Testing Checklist

When making changes, verify:
- [ ] Arrow key navigation works smoothly (← →)
- [ ] Score slider persists value across page reloads
- [ ] Nav bar highlights current section on scroll
- [ ] All sections fade in when scrolled into view
- [ ] Print button opens print dialog
- [ ] Export button copies summary to clipboard
- [ ] Layout is responsive on mobile (<860px)
- [ ] Reduced motion preference is respected

## Additional Formatting Instruction

- After generating the final commit message or code content:
- Perform full formatting of the entire output.
- Indentation must be exactly 4 spaces.
- If applying this formatting would reduce readability or alter layout meaning, explicitly notify the user and skip formatting for that section only.
- Do not modify content semantics when formatting.


## 📝 Instruction
After completing **all fixes or updates**, propose a **final commit message** in English using the [Gitmoji](https://gitmoji.dev/) convention.

### Requirements
1. Follow this exact format:
2. Use **concise, descriptive wording** that summarizes what has been improved, fixed, or updated.
3. Consider the **entire set of commits** shown (not just the latest one).
4. Provide **only the final commit message** — no explanations or bullet points.
5. The message should feel natural as a single, polished Git commit summary.


## 🧩 Example Commit History (OCR Extracted)

Below is an example commit history (extracted from an image):

- [🐛] Fix arrow key navigation issue in menu bar  
- [💄] Fix layout issues on large screens  
- [♻️] Reorder HTML sections and fix incorrect footer link  
- [✨] Add favicon and OGP tags for browser display and LINE preview  
- [🧩] Update header menu text layout and fix line-breaking issue  
- [🎨] Minor fixes in footer style  
- [🔧] Adjust index.html based on updated README.md  
- [🧾] Minor fixes in README.md  
- [💄] Improve README.md readability and fix line break issues  
- [📝] Revise README.md with major content updates  


## 💬 Example Output
Based on the commit history above, a well-formed final commit message might look like:

## 💡 Notes
- Choose **appropriate emojis** according to the change type:  
  - [🐛] Bug fix  
  - [💄] UI or layout improvement  
  - [♻️] Code refactor  
  - [✨] New feature or enhancement  
  - [📝] Documentation change  
  - [🚀] Performance or deployment improvement  
- Ensure your summary reflects **the full scope of work completed**, not individual steps.
- Keep it **professional, concise, and human-readable** — just like a real Git commit message.

**Use this prompt to automatically generate a clean, Gitmoji-compliant commit message after all fixes are completed.**
