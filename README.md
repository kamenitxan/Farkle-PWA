# Farkle PWA

[![Live App](https://img.shields.io/badge/Play%20Online-farkle.kamenitxan.eu-blue?style=flat-square)](https://farkle.kamenitxan.eu/en/)
[![Coverage](https://sonarqube.kamenitxan.eu/api/project_badges/measure?project=kamenitxan_Farkle-PWA_7234cc99-305f-4903-8bff-628260fcd5ce&metric=coverage&token=sqb_8ea66b5af71d00ca949b7028d79f07beb7dffe38)](https://sonarqube.kamenitxan.eu/dashboard?id=kamenitxan_Farkle-PWA_7234cc99-305f-4903-8bff-628260fcd5ce)
[![Lines of Code](https://sonarqube.kamenitxan.eu/api/project_badges/measure?project=kamenitxan_Farkle-PWA_7234cc99-305f-4903-8bff-628260fcd5ce&metric=ncloc&token=sqb_8ea66b5af71d00ca949b7028d79f07beb7dffe38)](https://sonarqube.kamenitxan.eu/dashboard?id=kamenitxan_Farkle-PWA_7234cc99-305f-4903-8bff-628260fcd5ce)

A **Progressive Web App** implementation of the classic dice game **Farkle** (also known as 10000 or Zilch), built with Angular 21.

🎲 **[Play it now → farkle.kamenitxan.eu](https://farkle.kamenitxan.eu/en/)**

---

## About the Game

Farkle is a push-your-luck dice game for two players. On your turn, roll six dice, set aside scoring combinations, and either bank your points or risk rolling again. Reach the target score first to win — but watch out for a Farkle (no scoring dice), which wipes out your round score!

### Scoring

| Combination    | Points             |
|----------------|--------------------|
| Single 1       | 100                |
| Single 5       | 50                 |
| Three 1s       | 1000               |
| Three 2s       | 200                |
| Three 3s       | 300                |
| Three 4s       | 400                |
| Three 5s       | 500                |
| Three 6s       | 600                |
| Four of a kind | 2× three-of-a-kind |
| Five of a kind | 3× three-of-a-kind |
| Six of a kind  | 4× three-of-a-kind |

**Hot dice rule:** if all six dice score, you may roll all six again and keep accumulating points.

---

## Features

- 🎮 **Two-player local gameplay** with customisable player names and target score
- 📱 **Progressive Web App** — installable on desktop and mobile, works offline
- 🌍 **Multilingual** — English 🇬🇧, Czech 🇨🇿, and Latin 🇻🇦
- 🎨 **Three visual themes** — Light, Dark, and Medieval

---

## Tech Stack

|           |                                                    |
|-----------|----------------------------------------------------|
| Framework | Angular 21 (standalone components, zoneless)       |
| UI        | Angular Material 21 (M3 theming)                   |
| State     | Angular Signals (`signal`, `computed`, `toSignal`) |
| Styling   | SCSS with Angular Material M3 CSS tokens           |
| i18n      | Angular built-in localisation (xlf2 format)        |
| Testing   | Karma + Jasmine                                    |
| Quality   | SonarQube                                          |

---

## Development

### Prerequisites

- Node.js 20+
- Angular CLI: `npm install -g @angular/cli`

### Install dependencies

```bash
npm install
```

### Start development server

```bash
# English
npm run start_en

# Czech
npm run start_cs

# Latin
npm run start_la
```

Open `http://localhost:4200/` in your browser. The app reloads automatically on file changes.

### Build for production

```bash
npm run build
```

Builds all locales into `dist/farkle-pwa/`. Each locale is output to its own subdirectory (`en/`, `cs/`, `la/`).

### Run tests

```bash
# Interactive (watch mode)
npm test

# CI / headless with coverage
npm run test-ci
```

### Extract / update translations

```bash
npm run extract-i18n
```

This extracts translatable strings to `src/locale/messages.xlf` and merges them into the locale-specific files (`messages.cs.xlf`, `messages.la.xlf`).

---

## Project Structure

```
src/
├── app/
│   ├── header/               # Top navigation bar with language selector
│   ├── pages/
│   │   ├── game/             # Main game view (dice board, scoreboard, controls)
│   │   │   ├── dice/         # Individual die component
│   │   │   ├── dice-board/   # Dice rolling and selection
│   │   │   ├── scoreboard/   # Per-player score display
│   │   │   ├── controls/     # Roll again / End round buttons
│   │   │   └── winner-dialog/# Win screen dialog
│   │   ├── rules/            # Scoring rules reference page
│   │   └── settings/         # Player names, target score, theme selector
│   ├── services/
│   │   ├── score-calculator.service.ts  # Dice scoring logic
│   │   ├── score-keeper.service.ts      # Game state (signals)
│   │   └── settings.service.ts         # User preferences + theme
│   └── utils/                # Shared utilities
└── locale/
    ├── messages.xlf          # Source strings (English)
    ├── messages.cs.xlf       # Czech translations
    └── messages.la.xlf       # Latin translations
```

---

## Additional Resources

- [Angular CLI documentation](https://angular.dev/tools/cli)
- [Angular Signals](https://angular.dev/guide/signals)
- [Angular Zoneless](https://angular.dev/guide/zoneless)
- [Angular Material](https://material.angular.io/)

