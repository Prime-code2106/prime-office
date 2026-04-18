# Project Structure

```
/
├── App.tsx                  # Root component — auth gate, chat state, layout
├── index.tsx                # React entry point
├── index.html               # HTML shell
├── index.css                # Global styles + Tailwind base
├── types.ts                 # Shared TypeScript interfaces (User, Message, Chat, etc.)
├── server.ts                # Express server — OTP auth, JWT, Vite middleware
├── vite.config.ts           # Vite config — env mapping, path aliases (@/)
├── tailwind.config.ts       # Tailwind theme — custom `nexus` color palette, fonts
├── supabase-schema.sql      # Supabase DB schema (run once to set up)
│
├── components/              # UI components (all React/TSX)
│   ├── AuthScreen.tsx       # Login/signup flow
│   ├── OnboardingScreen.tsx # New user profile setup
│   ├── ChatInterface.tsx    # Active chat view (messages, input, toolbar)
│   ├── ChatInfoSidebar.tsx  # Chat details panel
│   ├── ActionCard.tsx       # Action item card in Actions tab
│   ├── CallOverlay.tsx      # Voice/video call UI overlay
│   ├── ForwardModal.tsx     # Forward message modal
│   ├── NewChatModal.tsx     # Start new chat modal
│   ├── SettingsModal.tsx    # User settings modal
│   └── Logo.tsx             # App logo component
│
├── services/
│   ├── supabaseClient.ts        # Re-export switch (mock vs real)
│   ├── supabaseClient.real.ts   # Real Supabase implementation
│   ├── supabaseClient.mock.ts   # Mock implementation (no config needed)
│   └── geminiService.ts         # Gemini AI — summarizeChat, detectActionItem
│
├── public/                  # Static assets served as-is
└── .kiro/steering/          # AI steering rules for this project
```

## Key Conventions
- All shared types live in `types.ts` at the root — don't define types inline in components
- State management is local React state in `App.tsx` (no Redux/Zustand); lift state up as needed
- Supabase Realtime subscriptions are set up in `App.tsx` via `useEffect`
- Optimistic UI updates are used for messages and pin toggles — always roll back on error
- Dark mode is toggled via the `dark` class on `<html>` and persisted to `currentUser.preferences.theme`
- Custom Tailwind colors use the `nexus-` prefix (e.g. `bg-nexus-dark`, `text-nexus-mint`)
- The `@/` path alias resolves to the workspace root
