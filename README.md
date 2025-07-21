# LLM Thinking Animation

A ChatGPT-o3-like LLM thinking animation demo showcasing advanced React animation techniques with Motion (Framer Motion's successor). This implementation demonstrates sophisticated layout animation patterns, declarative API design, and performance optimization strategies.

🔗 **[Live Demo](https://reekystive.github.io/llm-thinking-animation/)**

## 🎯 Overview

This project implements a smooth, responsive thinking animation that mimics modern AI interfaces. The core challenge was creating a container that dynamically adapts its size to content while maintaining smooth animations - a complex layout problem that required careful architectural decisions.

## 🏗️ Key Architecture Decisions

### Declarative vs Imperative Animation APIs

This project deliberately chose a **declarative approach** for the animation API, contrasting with many animation libraries that favor imperative controls.

#### Declarative Design (Current Implementation)

```typescript
interface ThinkingBoxProps {
  currentData: ThinkingData | undefined;  // What to show
  currentStep: number;                    // Which step we're on
  className?: string;
}

// Usage: State determines output
<ThinkingBox
  currentData={thinkingSteps[currentStep]}
  currentStep={currentStep}
/>
```

**Advantages:**

- **Time Travel**: Jump to any step instantly for debugging/replay
- **Predictable**: Same props = same output, every time
- **Testable**: Easy to test specific states in isolation
- **State Management Friendly**: Works seamlessly with Redux/Zustand
- **React Concurrent Safe**: No timing issues with React 18 features

#### Alternative Imperative Approach

```typescript
// Imperative alternative (not implemented)
interface ThinkingBoxRef {
  startThinking(): void;
  addContent(data: PlaintextData): void;
  endThinking(): void;
}

// Usage: Commands drive changes
thinkingRef.current?.startThinking();
thinkingRef.current?.addContent({ title: '...', content: '...' });
```

**When Imperative Wins:**

- One-shot animations (toasts, notifications)
- Complex interaction flows
- Game-like controls
- Performance-critical real-time updates

**Why Declarative Won Here:**

- Playback controls (pause, seek, replay)
- Development/debugging needs
- State persistence requirements
- Component reusability across different contexts

## 🎨 Core Animation Techniques

### 1. Dynamic Size Container with Layout Animation

The most complex part of this implementation is the auto-sizing container that smoothly animates between different content sizes.

```typescript
// src/components/thinking-box/thinking-box.tsx
const ThinkingBox: FC<ThinkingBoxProps> = ({ currentData, currentStep }) => {
  const [contentMeasure, contentMeasureRef] = useMeasure<HTMLDivElement>(true);
  const [containerMeasure, containerMeasureRef] = useMeasure<HTMLDivElement>(true);

  const controls = useAnimationControls();

  useLayoutEffect(() => {
    if (contentMeasure?.width === undefined) {
      controls.set({ width: immediateContentWidth.current });
      return;
    }
    void controls.start({
      height: contentMeasure.height,
      width: contentMeasure.width,
    });
  }, [contentMeasure?.height, contentMeasure?.width, controls]);

  return (
    <>
      {/* Phantom element for measuring the container width */}
      <div ref={containerMeasureRef} className="invisible h-0 w-full"></div>

      {/* Animated container with adaptive width */}
      <motion.div
        className="relative overflow-clip rounded-lg"
        animate={controls}
        transition={{ duration: s(0.5), type: 'spring', bounce: 0 }}
      >
        {/* Fixed width inner container prevents layout cycles */}
        <div style={{ width: containerMeasure?.width }}>
          <div ref={contentMeasureRef}>
            <AnimatePresence initial={false} mode="popLayout">
              <MemoizedThinkingStep data={currentData} currentStep={currentStep} key={currentStep} />
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
};
```

### 2. Breaking Layout Dependency Cycles

**The Problem:** When creating a container that needs both a border and size animation, there are two architectural choices, both with tradeoffs:

#### Option A: Absolute-Positioned Border (Not Chosen)

```typescript
// Simpler approach - absolute border on same layer
<motion.div animate={controls}>
  <div className="border-absolute">Content</div>
</motion.div>
```

**Pros:** No layout cycles  
**Cons:** Cannot clip overflow content (no `overflow: hidden` on border element)

#### Option B: Nested Container Architecture (Current Implementation)

```typescript
<motion.div animate={controls} className="overflow-clip">
  <div style={{ width: containerMeasure?.width }}>
    <div ref={contentMeasureRef}>
      {/* Content that determines size */}
    </div>
  </div>
</motion.div>
```

**Pros:** Full overflow control, proper content clipping  
**Cons:** Risk of layout dependency cycles

**The Layout Cycle Problem:**

1. Child content changes → Parent width animates
2. Parent width changes → Child content reflows
3. Child reflow → Parent width recalculates
4. Infinite loop = layout thrashing 🔄

**Our Solution - Three-Layer Architecture:**

```typescript
// Layer 1: Measure available space (phantom element)
<div ref={containerMeasureRef} className="invisible h-0 w-full"></div>

// Layer 2: Animate based on content measurements
<motion.div animate={controls} className="overflow-clip">

  // Layer 3: Fixed width prevents reflow cycles
  <div style={{ width: containerMeasure?.width }}>
    <div ref={contentMeasureRef}>
      {/* Content renders at predictable width */}
      {/* No reflow when parent animates */}
    </div>
  </div>
</motion.div>
```

**Why This Works:**

- **Stable Layout**: Child content renders at a fixed width, preventing reflow
- **Predictable Measurements**: Content size is measured independently of animation
- **No Circular Dependencies**: Parent animation doesn't affect child layout
- **Overflow Control**: Maintains ability to clip content with `overflow: hidden`

This architectural choice prioritizes visual polish (border + clipping) over implementation simplicity, solving the layout cycle through careful width management.

### 3. Advanced Motion API Usage

#### useAnimationControls for Programmatic Animation

```typescript
import { useAnimationControls } from 'motion/react';

const controls = useAnimationControls();

// Immediate update (no animation)
controls.set({ width: immediateWidth });

// Animated update
controls.start({
  height: contentMeasure.height,
  width: contentMeasure.width,
});
```

#### Custom Spring Transitions

```typescript
transition={{
  duration: s(0.5),      // Scaled by user preference
  type: 'spring',
  bounce: 0,             // No bounce for professional feel
}}
```

#### Complex Stagger Animations

```typescript
// src/components/thinking-box/paragraph.tsx
const renderParagraph = (paragraph: string, previousDuration: number) => {
  const slices = splitByVisibleCharacterGroups(paragraph, SPLIT_UNIT);
  return slices.map((slice, index) => (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: s(UNIT_ANIMATION_DURATION_IN_SECONDS),
        delay: s(previousDuration + index * UNIT_DELAY_IN_SECONDS),
        type: 'tween',
        ease: 'linear',
      }}
    >
      {slice}
    </motion.span>
  ));
};
```

### 4. Light Sweep Text Effect

A sophisticated CSS mask-based animation that creates a shimmer effect:

```typescript
// src/components/thinking-box/light-sweep-text.tsx
export const LightSweepText: FC<LightSweepTextProps> = ({ content }) => {
  return (
    <motion.div
      style={{
        maskImage: `linear-gradient(90deg,
          rgba(0,0,0,0.6) ${s}%,
          black ${s + w * 0.5}%,
          rgba(0,0,0,0.6) ${e}%)`,
        maskSize: `${pMaskWidthRelativeToText}% 100%`,
        maskRepeat: 'no-repeat',
      }}
      animate={{
        maskPosition: `${getMaskPositionPercent(0)}% 0%`,
      }}
      transition={{
        duration: s(durationInSeconds),
        repeat: Infinity,
        type: 'tween',
        ease: 'easeOut',
      }}
    >
      {content}
    </motion.div>
  );
};
```

## 🚀 Usage Guide

### Basic Implementation

```tsx
import { ThinkingBox } from './components/thinking-box/thinking-box';
import { thinkingData } from './mocks/thinking-data';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const currentData = thinkingData[currentStep];

  return <ThinkingBox currentData={currentData} currentStep={currentStep} />;
}
```

### Advanced Playback Controls

```tsx
import { useAutoPlay } from './components/playback-control/use-auto-play';

function ThinkingDemo() {
  const { currentStep, isPlaying, play, pause, nextStep, previousStep } = useAutoPlay({
    initialStep: 0,
    totalSteps: thinkingData.length,
    autoSwitchIntervalInMs: 3000,
  });

  return (
    <div>
      <ThinkingBox currentData={thinkingData[currentStep]} currentStep={currentStep} />

      <div className="controls">
        <button onClick={previousStep}>Previous</button>
        <button onClick={isPlaying ? pause : play}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}
```

### Custom Animation Timing

```tsx
import { AppAnimationControlProvider } from './providers/animation-control';

function App() {
  return (
    <AppAnimationControlProvider>
      <ThinkingDemo />
    </AppAnimationControlProvider>
  );
}

// Inside component:
const { getAnimationDuration, setAppAnimationSpeedScale } = useAppAnimationControl();

// Speed up animations 2x
setAppAnimationSpeedScale(2);

// Use in components
const duration = getAnimationDuration(0.5); // 0.25s when speed is 2x
```

## 📋 Data Structure

### ThinkingData Interface

```typescript
type ThinkingData = StartThinkingData | PlaintextData | SearchData | EndThinkingData;

interface StartThinkingData {
  type: 'start-thinking';
}

interface PlaintextData {
  type: 'plaintext';
  title: string;
  content: string;
}

interface SearchData {
  type: 'search';
  websites: Array<{
    title: string;
    url: string;
    description: string;
  }>;
}

interface EndThinkingData {
  type: 'end';
}
```

### Example Data

```typescript
const thinkingSequence: ThinkingData[] = [
  { type: 'start-thinking' },
  {
    type: 'plaintext',
    title: 'Analyzing the problem',
    content: 'Let me break down this complex question into smaller parts...',
  },
  {
    type: 'search',
    websites: [
      {
        title: 'React Documentation',
        url: 'https://react.dev',
        description: 'Official React documentation',
      },
    ],
  },
  { type: 'end' },
];
```

## 🎛️ API Design Philosophy

### Declarative Benefits in This Context

1. **Debugging**: Jump to any step instantly during development
2. **Testing**: Test specific animation states in isolation
3. **Playback Controls**: Implement pause/play/seek trivially
4. **State Persistence**: Save and restore animation state
5. **Integration**: Works naturally with React state management

### Performance Considerations

- **Memoization**: Heavy use of `React.memo`, `useMemo`, `useCallback`
- **Layout Optimization**: Careful measurement strategy prevents layout thrashing
- **Animation Batching**: Multiple animations coordinated through shared timing functions

### Accessibility Features

- Keyboard navigation support
- Focus management (though could be improved)
- Support for animation preferences (needs `prefers-reduced-motion` implementation)

## 🛠️ Technical Stack

- **React 19**: Latest features and concurrent rendering
- **Motion**: Modern animation library (Framer Motion successor)
- **TypeScript**: Strict type safety
- **Tailwind CSS 4.0**: Utility-first styling
- **Vite**: Fast development and building
- **@react-hookz/web**: Utility hooks (especially `useMeasure`)

## 🔄 Future Improvements

1. **Accessibility**: Add `prefers-reduced-motion` support
2. **Performance**: Implement animation frame throttling for complex sequences
3. **API**: Consider hybrid imperative/declarative API for complex use cases
4. **Testing**: Add comprehensive animation testing with `@testing-library/react`

## 🚀 Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint:eslint && pnpm lint:tsc
```

---

This implementation showcases how thoughtful API design and careful attention to layout performance can create smooth, professional animations that scale to complex use cases while remaining maintainable and debuggable.
