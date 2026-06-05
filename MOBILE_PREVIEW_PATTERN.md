# Mobile Prototype Web Preview Pattern

## Goal

When previewing a mobile App prototype in a desktop browser, keep the design visually consistent across different screens, including external monitors and laptop displays.

## Problem

Expo Web uses the browser viewport. If the prototype directly uses `window.width` / `useWindowDimensions().width`, the layout can stretch on large desktop screens or shrink oddly on laptop screens with limited browser height.

This makes a mobile UI look like a desktop layout instead of a fixed phone prototype.

## Solution

Use a fixed phone preview shell:

- Outer browser background: neutral desktop preview surface
- Phone shell: fixed device container with bezel
- App viewport: fixed `393 × 852` canvas
- Auto scale: scale the whole phone shell based on available browser width and height
- Internal layout: keep all App measurements based on the fixed design canvas, not the browser viewport

## Recommended Constants

```ts
const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;
const PHONE_BEZEL = 14;
```

## Scaling Formula

```ts
const previewWidth = DESIGN_WIDTH + PHONE_BEZEL * 2;
const previewHeight = DESIGN_HEIGHT + PHONE_BEZEL * 2;
const scale = Math.min(
  (width - 24) / previewWidth,
  (height - 24) / previewHeight,
  1
);
```

## Structure

```tsx
<View style={styles.root}>
  <View style={[styles.previewScaler, { width: previewWidth, height: previewHeight, transform: [{ scale }] }]}>
    <View style={styles.phoneShell}>
      <View style={styles.phoneFrame}>
        {/* App screen content */}
      </View>
    </View>
  </View>
</View>
```

## Rules

- Do not calculate mobile card widths from the full desktop browser width.
- Keep the App content frame fixed to `393 × 852` for iPhone-style prototypes.
- Scale the entire phone preview, not individual UI components.
- Use the browser only as a presentation surface, not as the design canvas.
- For real-device validation, still test with Expo Go or iOS Simulator.

## Current Project

Implemented in:

- `app/(tabs)/index.tsx`

This makes the prototype display consistently on both external monitors and laptop screens.
