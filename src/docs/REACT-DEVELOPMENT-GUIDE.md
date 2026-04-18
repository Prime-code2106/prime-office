# React Development Guide

Complete guide to React development patterns used in this portfolio.

---

## 📚 Table of Contents

1. [React Fundamentals](#react-fundamentals)
2. [TypeScript with React](#typescript-with-react)
3. [Component Patterns](#component-patterns)
4. [State Management](#state-management)
5. [Hooks Reference](#hooks-reference)
6. [Performance Optimization](#performance-optimization)
7. [Best Practices](#best-practices)
8. [Common Patterns](#common-patterns)

---

## 🎯 React Fundamentals

### What is React?

React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called "components."

### Key Concepts

#### 1. **Components**
Building blocks of React applications.

```typescript
// Functional Component (Modern)
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// With Props
interface WelcomeProps {
  name: string;
}

function Welcome({ name }: WelcomeProps) {
  return <h1>Hello, {name}!</h1>;
}
```

#### 2. **JSX**
JavaScript XML - syntax extension for JavaScript.

```typescript
// JSX allows you to write HTML-like code in JavaScript
const element = <h1>Hello, world!</h1>;

// You can embed expressions in JSX
const name = "Adewale";
const element = <h1>Hello, {name}!</h1>;

// JSX is expressions too
const greeting = (
  <div>
    <h1>Hello!</h1>
    <p>Welcome to my portfolio</p>
  </div>
);
```

#### 3. **Props**
Properties passed to components.

```typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

function Button({ text, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
    >
      {text}
    </button>
  );
}

// Usage
<Button text="Click me" onClick={() => alert('Clicked!')} />
```

#### 4. **State**
Component's memory.

```typescript
import { useState } from 'react';

function Counter() {
  // State declaration
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

## 📘 TypeScript with React

### Why TypeScript?

- **Type Safety:** Catch errors before runtime
- **Better IDE Support:** Autocomplete and IntelliSense
- **Self-Documenting:** Types serve as documentation
- **Refactoring:** Easier and safer code changes

### Component Props Types

```typescript
// Simple Props
interface UserProps {
  name: string;
  age: number;
}

// Optional Props
interface UserProps {
  name: string;
  age?: number; // Optional
}

// Props with Children
interface CardProps {
  title: string;
  children: React.ReactNode;
}

// Function Props
interface ButtonProps {
  onClick: () => void;
  onHover?: (event: React.MouseEvent) => void;
}

// Union Types
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
}

// Array Props
interface ListProps {
  items: string[];
  // OR
  items: Array<string>;
}

// Object Props
interface UserCardProps {
  user: {
    name: string;
    email: string;
    age: number;
  };
}
```

### State Types

```typescript
// Simple State
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>('');
const [isOpen, setIsOpen] = useState<boolean>(false);

// Object State
interface User {
  name: string;
  email: string;
}

const [user, setUser] = useState<User>({
  name: '',
  email: ''
});

// Array State
const [items, setItems] = useState<string[]>([]);

// Nullable State
const [user, setUser] = useState<User | null>(null);

// State from Props
interface ComponentProps {
  initialCount?: number;
}

function Component({ initialCount = 0 }: ComponentProps) {
  const [count, setCount] = useState(initialCount);
}
```

### Event Types

```typescript
// Common Event Types
onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
onKeyDown: (event: React.KeyboardEvent) => void;

// Example Usage
function Form() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form logic
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
    </form>
  );
}
```

---

## 🧩 Component Patterns

### 1. Presentational Components

Pure components that just render UI based on props.

```typescript
/**
 * Card Component - Presentational
 * Displays content in a card format
 */
interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function Card({ title, description, imageUrl }: CardProps) {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

### 2. Container Components

Components with logic and state.

```typescript
/**
 * UserList Component - Container
 * Fetches and displays list of users
 */
export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <Spinner />;
  
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### 3. Compound Components

Components that work together.

```typescript
/**
 * Tabs Component - Compound Pattern
 */
interface TabsProps {
  children: React.ReactNode;
}

interface TabProps {
  label: string;
  children: React.ReactNode;
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className="tabs">
      <div className="tab-headers">
        {React.Children.map(children, (child, index) => (
          <button onClick={() => setActiveTab(index)}>
            {(child as React.ReactElement<TabProps>).props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}

// Usage
<Tabs>
  <Tab label="Profile">Profile content</Tab>
  <Tab label="Settings">Settings content</Tab>
</Tabs>
```

### 4. Render Props

Share code between components using a prop whose value is a function.

```typescript
interface MouseTrackerProps {
  render: (position: { x: number; y: number }) => React.ReactNode;
}

function MouseTracker({ render }: MouseTrackerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return <>{render(position)}</>;
}

// Usage
<MouseTracker 
  render={({ x, y }) => (
    <div>Mouse is at {x}, {y}</div>
  )}
/>
```

---

## 🔄 State Management

### Local State (useState)

For component-specific state.

```typescript
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Lifting State Up

Share state between components by moving it to common parent.

```typescript
// Parent component holds the state
function ParentComponent() {
  const [sharedValue, setSharedValue] = useState('');
  
  return (
    <>
      <ChildA value={sharedValue} onChange={setSharedValue} />
      <ChildB value={sharedValue} />
    </>
  );
}

// Child components receive state via props
interface ChildAProps {
  value: string;
  onChange: (value: string) => void;
}

function ChildA({ value, onChange }: ChildAProps) {
  return (
    <input 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  );
}

function ChildB({ value }: { value: string }) {
  return <p>Current value: {value}</p>;
}
```

### Context API

For global state that many components need.

```typescript
// 1. Create Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

// 2. Create Provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create Hook for using context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Use in components
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className={theme === 'light' ? 'btn-light' : 'btn-dark'}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
}
```

---

## 🪝 Hooks Reference

### useState

Manage component state.

```typescript
const [state, setState] = useState(initialState);

// Usage Examples
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState<string[]>([]);

// Functional Updates
setCount(prev => prev + 1);
setItems(prev => [...prev, newItem]);
```

### useEffect

Handle side effects (data fetching, subscriptions, etc.).

```typescript
useEffect(() => {
  // Effect code
  
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);

// Examples:

// Run once on mount
useEffect(() => {
  console.log('Component mounted');
}, []);

// Run when dependency changes
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);

// Cleanup
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  return () => clearInterval(timer); // Cleanup
}, []);

// Data fetching
useEffect(() => {
  let cancelled = false;
  
  async function fetchData() {
    const data = await fetch('/api/data');
    if (!cancelled) {
      setData(data);
    }
  }
  
  fetchData();
  
  return () => { cancelled = true; }; // Prevent state update if unmounted
}, []);
```

### useContext

Access context values.

```typescript
const value = useContext(MyContext);

// Example
const theme = useContext(ThemeContext);
```

### useRef

Persist values between renders without causing re-render.

```typescript
const ref = useRef(initialValue);

// Examples:

// DOM reference
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}

// Persist value without re-render
function Timer() {
  const countRef = useRef(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      countRef.current += 1;
      console.log(countRef.current); // Updates without re-render
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return <div>Check console</div>;
}
```

### useMemo

Memoize expensive computations.

```typescript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Example
function ExpensiveComponent({ items }: { items: number[] }) {
  const sum = useMemo(() => {
    console.log('Computing sum...');
    return items.reduce((acc, item) => acc + item, 0);
  }, [items]); // Only recompute when items change
  
  return <div>Sum: {sum}</div>;
}
```

### useCallback

Memoize callback functions.

```typescript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// Example
function Parent() {
  const [count, setCount] = useState(0);
  
  // Without useCallback, this creates new function every render
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []); // Dependencies empty = function never changes
  
  return <Child onClick={handleClick} />;
}
```

### useReducer

Alternative to useState for complex state logic.

```typescript
const [state, dispatch] = useReducer(reducer, initialState);

// Example
interface State {
  count: number;
}

type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

### Custom Hooks

Create reusable stateful logic.

```typescript
// useLocalStorage hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue] as const;
}

// Usage
function Component() {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
    />
  );
}

// useToggle hook
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);
  
  return [value, toggle] as const;
}

// Usage
function Component() {
  const [isOpen, toggleOpen] = useToggle();
  
  return (
    <div>
      {isOpen && <Modal />}
      <button onClick={toggleOpen}>Toggle</button>
    </div>
  );
}
```

---

## ⚡ Performance Optimization

### React.memo

Prevent unnecessary re-renders.

```typescript
// Without memo - re-renders every time parent renders
function ChildComponent({ name }: { name: string }) {
  console.log('Rendering Child');
  return <div>{name}</div>;
}

// With memo - only re-renders when props change
const ChildComponent = React.memo(({ name }: { name: string }) => {
  console.log('Rendering Child');
  return <div>{name}</div>;
});

// Custom comparison
const ChildComponent = React.memo(
  ({ user }: { user: User }) => {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip render)
    return prevProps.user.id === nextProps.user.id;
  }
);
```

### Code Splitting

Load components only when needed.

```typescript
import React, { lazy, Suspense } from 'react';

// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Key Prop

Help React identify which items have changed.

```typescript
// ❌ Bad - using index as key
{items.map((item, index) => (
  <Item key={index} {...item} />
))}

// ✅ Good - using unique id as key
{items.map(item => (
  <Item key={item.id} {...item} />
))}
```

---

## ✅ Best Practices

### 1. Component Organization

```typescript
/**
 * COMPONENT_NAME
 * Description of what it does
 * 
 * @component
 */

// 1. Imports
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
}

// 3. Component
export function Component({ title }: ComponentProps) {
  // 3a. Hooks
  const [state, setState] = useState();
  
  // 3b. Event handlers
  const handleClick = () => {
    // ...
  };
  
  // 3c. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 3d. Render helpers (if needed)
  const renderContent = () => {
    // ...
  };
  
  // 3e. Return JSX
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### 2. Naming Conventions

```typescript
// Components: PascalCase
function UserProfile() {}

// Functions: camelCase
function handleSubmit() {}

// Constants: UPPER_SNAKE_CASE
const MAX_ITEMS = 100;

// Boolean props: is/has/should prefix
interface Props {
  isOpen: boolean;
  hasError: boolean;
  shouldUpdate: boolean;
}

// Event handlers: handle prefix
const handleClick = () => {};
const handleChange = () => {};
const handleSubmit = () => {};
```

### 3. Props Destructuring

```typescript
// ✅ Good - destructure props
function User({ name, email }: UserProps) {
  return <div>{name} - {email}</div>;
}

// ❌ Avoid - using props object
function User(props: UserProps) {
  return <div>{props.name} - {props.email}</div>;
}
```

### 4. Conditional Rendering

```typescript
// Short circuit for simple conditions
{isLoggedIn && <UserPanel />}

// Ternary for if/else
{isLoggedIn ? <UserPanel /> : <LoginForm />}

// Function for complex logic
const renderContent = () => {
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <Content data={data} />;
};

return <div>{renderContent()}</div>;
```

### 5. Lists & Keys

```typescript
// Always use unique keys
{items.map(item => (
  <Item 
    key={item.id}  // ✅ Unique ID
    {...item} 
  />
))}

// Don't use index unless items never reorder
{items.map((item, index) => (
  <Item 
    key={index}  // ⚠️ Only if items never change order
    {...item} 
  />
))}
```

---

## 🎨 Common Patterns in This Portfolio

### 1. Page Navigation

```typescript
// App.tsx pattern
export type PageType = 'home' | 'skills' | 'projects';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <>
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'skills' && <SkillsPage />}
      {/* ... */}
    </>
  );
}
```

### 2. Scroll Animations

```typescript
// ScrollReveal pattern
function ScrollReveal({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={ref}
      className={isVisible ? 'animate-in' : 'opacity-0'}
    >
      {children}
    </div>
  );
}
```

### 3. Form Handling

```typescript
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {/* ... */}
    </form>
  );
}
```

---

## 📚 Learning Resources

### Official Documentation
- [React Docs](https://react.dev) - Official React documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide

### Recommended Learning Path

1. **Basics:**
   - JSX syntax
   - Components & Props
   - State & Lifecycle
   - Event Handling

2. **Intermediate:**
   - Hooks (useState, useEffect, useContext)
   - Forms & Validation
   - Lists & Keys
   - Conditional Rendering

3. **Advanced:**
   - Custom Hooks
   - Performance Optimization
   - Context API
   - Code Splitting

4. **TypeScript:**
   - Basic Types
   - Interfaces
   - Generics
   - Type Guards

---

## 🐛 Common Mistakes to Avoid

### 1. Mutating State Directly
```typescript
// ❌ Wrong
const [items, setItems] = useState([1, 2, 3]);
items.push(4); // Don't mutate directly!

// ✅ Correct
setItems([...items, 4]); // Create new array
```

### 2. Missing Dependencies in useEffect
```typescript
// ❌ Wrong
useEffect(() => {
  doSomething(prop);
}, []); // Missing 'prop' in dependencies

// ✅ Correct
useEffect(() => {
  doSomething(prop);
}, [prop]);
```

### 3. Not Cleaning Up Effects
```typescript
// ❌ Wrong
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  // No cleanup!
}, []);

// ✅ Correct
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer); // Cleanup
}, []);
```

### 4. Using Index as Key in Dynamic Lists
```typescript
// ❌ Wrong - items can reorder
{items.map((item, index) => <Item key={index} />)}

// ✅ Correct
{items.map(item => <Item key={item.id} />)}
```

---

**Last Updated:** October 16, 2025  
**Author:** Adewale Samuel (Prime)
