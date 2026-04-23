# Base Documentation

Technical documentation for Base (Ethereum L2), built with Mintlify.  
This repository contains guides, references, and examples to help you build on Base.

---

## Getting Started

To run the documentation locally:

```bash
npm install
npx mintlify dev
```

Make sure you have Mintlify available in your environment.

---

## Commands

| Command | Description |
|---------|-------------|
| `mintlify dev` | Start a local development server for previewing docs |
| `/lint` | Lint MDX files and fix formatting/content issues |
| `/doc-feedback` | Review content quality and clarity |
| `/agents` | Generate AGENTS.md index for AI agents |

---

## Structure

```bash
docs/
├── get-started/
├── base-chain/
├── base-account/
├── ai-agents/
├── apps/
├── onchainkit/
├── images/
├── snippets/
└── docs.json
```

---

## Content Rules

**Frontmatter (required):**
```yaml
---
title: "Keyword-rich title"
description: "Value description"
---
```

**Writing guidelines:**
- Use American English
- Use sentence case for headings
- Write in second person ("you")
- Prefer active voice

---

## Navigation

Edit docs.json to add or remove pages.  
Make sure to add redirects when removing existing pages.

---

## Before Committing

1. Run /lint and fix any issues
2. Run /agents if the documentation structure changed
3. Add redirects for any removed pages
4. Verify that all links are working correctly
