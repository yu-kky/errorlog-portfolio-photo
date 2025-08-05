# errorlog-pf-photo

A personal photo portfolio built with **Vue 3**, **TypeScript**, and **Firebase**.  
This project is a migration of an older Vue 2 version, refactored using the Composition API and modern tooling.

---

## 🔧 Tech Stack

- **Vue 3** + **Vue Router**
- **TypeScript**
- **Firebase (Storage)**
- **Vite** (build tool)
- **Vitest** + **jsdom** (unit testing)
- **ESLint** + **Prettier**
- **Sass (via sass-embedded)**
- **pnpm** (package manager)
- Node.js `^20.19.0 || >=22.12.0` (required)

---

## 🚀 Project Setup

```sh
pnpm install
```

### Start development server

```sh
pnpm dev
```

### Build for production (type-check + minify)

```sh
pnpm build
```

### Preview production build

```sh
pnpm preview
```

### Type-check with vue-tsc

```sh
pnpm type-check
```

### Format with Prettier

```sh
pnpm format
```

### Lint code

```sh
pnpm lint
```

### Run unit tests

```sh
pnpm test:unit
```

---

## 🔐 Environment Variables

Create a .env file at the root with the following structure:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ✅ This project uses Vite's import.meta.env for environment variables.

> 🔒 Make sure .env is listed in .gitignore.

Use .env.sample as a reference template.

## 📁 Project Structure Highlights

- src/firebase/config.ts: Firebase initialization with env vars
- src/components/: Vue 3 components using Composition API
- src/composables/useGallery.ts: Encapsulated logic for image pagination and loading
- .env / .env.sample: Separate sensitive data from codebase
