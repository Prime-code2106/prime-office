# Context Directory

This directory contains React Context providers for global state management.

## Suggested Context Providers

1. **NavigationContext** - Global navigation state
2. **ThemeContext** - Dark/light mode theme management
3. **ContactContext** - Contact form and user interaction state
4. **ProjectContext** - Project data and filtering state

## Current Implementation
Currently, state is managed locally in components using useState.
As the application complexity grows, consider implementing React Context for:
- Global theme state
- User preferences
- Navigation state
- Contact form data persistence