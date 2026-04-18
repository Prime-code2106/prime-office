/**
 * INTERACTIVE PROJECT DEMOS COMPONENT
 * Working mini-applications that visitors can interact with
 * 
 * FEATURES:
 * - Calculator demo for showcasing JavaScript skills
 * - Todo app demo for React skills
 * - Color palette generator for design skills
 * - API data fetcher for backend integration skills
 * 
 * CUSTOMIZATION NOTES:
 * - Add more interactive demos based on your projects
 * - Replace with actual mini-versions of your projects
 * - Update styling to match your design system
 * - Add loading states and error handling
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Calculator, 
  Palette, 
  CheckSquare, 
  Database,
  Plus,
  Minus,
  X,
  Divide,
  Equal,
  Trash2,
  RefreshCw,
  Download
} from 'lucide-react';

export function InteractiveProjectDemos() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Interactive Project Demos</h2>
        <p className="text-muted-foreground">
          Try out these working demos to see my development skills in action
        </p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="todo">Todo App</TabsTrigger>
          <TabsTrigger value="palette">Color Tool</TabsTrigger>
          <TabsTrigger value="api">API Demo</TabsTrigger>
        </TabsList>

        {/* CALCULATOR DEMO */}
        <TabsContent value="calculator">
          <CalculatorDemo />
        </TabsContent>

        {/* TODO APP DEMO */}
        <TabsContent value="todo">
          <TodoAppDemo />
        </TabsContent>

        {/* COLOR PALETTE DEMO */}
        <TabsContent value="palette">
          <ColorPaletteDemo />
        </TabsContent>

        {/* API DEMO */}
        <TabsContent value="api">
          <ApiDemoComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * CALCULATOR DEMO COMPONENT
 * Working calculator to demonstrate JavaScript/React skills
 */
function CalculatorDemo() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForValue, setWaitingForValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForValue) {
      setDisplay(num);
      setWaitingForValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForValue(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Calculator Demo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-xs mx-auto space-y-4">
          {/* DISPLAY */}
          <div className="bg-gray-900 text-white p-4 rounded text-right text-2xl font-mono min-h-[60px] flex items-center justify-end">
            {display}
          </div>

          {/* BUTTONS GRID */}
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" onClick={clear} className="col-span-2">
              Clear
            </Button>
            <Button variant="outline" onClick={() => inputOperation('/')}>
              <Divide className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => inputOperation('*')}>
              <X className="h-4 w-4" />
            </Button>

            <Button variant="outline" onClick={() => inputNumber('7')}>7</Button>
            <Button variant="outline" onClick={() => inputNumber('8')}>8</Button>
            <Button variant="outline" onClick={() => inputNumber('9')}>9</Button>
            <Button variant="outline" onClick={() => inputOperation('-')}>
              <Minus className="h-4 w-4" />
            </Button>

            <Button variant="outline" onClick={() => inputNumber('4')}>4</Button>
            <Button variant="outline" onClick={() => inputNumber('5')}>5</Button>
            <Button variant="outline" onClick={() => inputNumber('6')}>6</Button>
            <Button variant="outline" onClick={() => inputOperation('+')}>
              <Plus className="h-4 w-4" />
            </Button>

            <Button variant="outline" onClick={() => inputNumber('1')}>1</Button>
            <Button variant="outline" onClick={() => inputNumber('2')}>2</Button>
            <Button variant="outline" onClick={() => inputNumber('3')}>3</Button>
            <Button onClick={performCalculation} className="row-span-2">
              <Equal className="h-4 w-4" />
            </Button>

            <Button variant="outline" onClick={() => inputNumber('0')} className="col-span-2">
              0
            </Button>
            <Button variant="outline" onClick={() => inputNumber('.')}>.</Button>
          </div>

          <div className="text-center">
            <Badge variant="outline">React + TypeScript</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * TODO APP DEMO COMPONENT
 * Working todo app to demonstrate state management and React skills
 */
function TodoAppDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Build an awesome portfolio', completed: true },
    { id: 2, text: 'Add interactive demos', completed: false },
    { id: 3, text: 'Deploy to production', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5" />
          Todo App Demo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-md mx-auto space-y-4">
          {/* ADD TODO INPUT */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <Button onClick={addTodo}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* TODO LIST */}
          <div className="space-y-2">
            {todos.map(todo => (
              <div key={todo.id} className="flex items-center gap-2 p-2 border rounded">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="rounded"
                />
                <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {todo.text}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* STATS */}
          <div className="text-center text-sm text-muted-foreground">
            {todos.filter(t => !t.completed).length} of {todos.length} tasks remaining
          </div>

          <div className="text-center">
            <Badge variant="outline">React State Management</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * COLOR PALETTE DEMO COMPONENT
 * Color palette generator to demonstrate design and algorithm skills
 */
function ColorPaletteDemo() {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [palette, setPalette] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  /**
   * COPY TO CLIPBOARD HELPER
   * Attempts to copy text to clipboard with fallback support
   * @param text - The text to copy to clipboard
   */
  const copyToClipboard = async (text: string) => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedColor(text);
        setTimeout(() => setCopiedColor(null), 2000);
        return;
      }
      
      // Fallback method for browsers where Clipboard API is blocked
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopiedColor(text);
        setTimeout(() => setCopiedColor(null), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      
      document.body.removeChild(textArea);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generatePalette = () => {
    const variations = [];
    const hsl = hexToHsl(baseColor);
    
    // Generate 8 color variations
    for (let i = 0; i < 8; i++) {
      const newHue = (hsl.h + (i * 45)) % 360;
      const newSaturation = Math.max(20, Math.min(100, hsl.s + (i * 10) - 40));
      const newLightness = Math.max(20, Math.min(80, hsl.l + (i * 8) - 32));
      
      variations.push(hslToHex(newHue, newSaturation, newLightness));
    }
    
    setPalette(variations);
  };

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  useEffect(() => {
    generatePalette();
  }, [baseColor]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Palette Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-md mx-auto space-y-4">
          {/* COLOR INPUT */}
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-12 h-12 rounded border"
            />
            <Input
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              placeholder="#3b82f6"
            />
            <Button onClick={generatePalette}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {/* COLOR PALETTE */}
          <div className="grid grid-cols-4 gap-2">
            {palette.map((color, index) => (
              <div
                key={index}
                className="aspect-square rounded border cursor-pointer hover:scale-105 transition-transform relative"
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color)}
                title={`Click to copy ${color}`}
              >
                {copiedColor === color && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded text-white text-xs font-semibold">
                    Copied!
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* COLOR VALUES */}
          <div className="space-y-1 text-sm">
            {palette.map((color, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: color }}
                  />
                  <span>Color {index + 1}</span>
                </div>
                <span className="font-mono text-xs">{color}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Badge variant="outline">Algorithm + Design</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * API DEMO COMPONENT
 * Demonstrates API integration and data handling skills
 */
function ApiDemoComponent() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomUser = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/' + Math.floor(Math.random() * 10 + 1));
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Supabase Integration Demo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-center">
            <Button onClick={fetchRandomUser} disabled={loading}>
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Fetch Data from Supabase
            </Button>
          </div>

          {error && (
            <div className="text-center text-red-500 text-sm">{error}</div>
          )}

          {userData && (
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">{userData.name}</h4>
                  <p className="text-sm text-muted-foreground">@{userData.username}</p>
                  <div className="space-y-1 text-sm">
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                    <p><strong>Website:</strong> {userData.website}</p>
                    <p><strong>Company:</strong> {userData.company?.name}</p>
                    <p><strong>City:</strong> {userData.address?.city}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-center">
            <Badge variant="outline">Supabase + Realtime</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}