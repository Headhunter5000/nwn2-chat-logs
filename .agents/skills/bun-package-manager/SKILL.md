---
name: bun-package-manager
description: Strict directive to use Bun instead of npm, yarn, or pnpm for package management, script execution, and dependency control. Trigger on any task involving installing packages, modifying package.json, creating a lockfile, or running scripts.
---

# Package Management Skill: Always Use Bun Over Npm

This skill enforces a strict restriction: **Never use `npm`, `npx`, `yarn`, or `pnpm` in this environment.** All package operations, dependency resolutions, and task executions must be handled natively by Bun for speed and reliability.

## The Golden Rule

> **Stop!** If you are about to type `npm install`, `npm run`, or `npx`, rewrite it to use `bun`.

---

## 1. Command Translation Table

When modifying dependencies or executing commands, map legacy commands directly to Bun:

| Legacy Command (Do Not Use) | Bun Alternative (Always Use) | Purpose                                          |
| :-------------------------- | :--------------------------- | :----------------------------------------------- |
| `npm install`               | `bun install`                | Installs all workspace dependencies.             |
| `npm install <pkg>`         | `bun add <pkg>`              | Adds a production dependency.                    |
| `npm install -D <pkg>`      | `bun add -d <pkg>`           | Adds a development dependency.                   |
| `npm uninstall <pkg>`       | `bun remove <pkg>`           | Removes a package.                               |
| `npm run <script>`          | `bun run <script>`           | Runs a script defined in `package.json`.         |
| `npx <command>`             | `bun x <command>`            | Executes a remote binary or local cache package. |
| `npm update`                | `bun update`                 | Updates packages to latest matching semver.      |
| `npm audit`                 | `bun audit`                  | Scans dependencies for security vulnerabilities. |

---

## 2. Package Management Operations

### Adding & Removing Dependencies

Always target the correct environment flags when managing packages.

```bash
# Add a production library
bun add zod

# Add a dev tool or type definition
bun add -d typescript @types/node

# Remove an unneeded package
bun remove lodash
```
