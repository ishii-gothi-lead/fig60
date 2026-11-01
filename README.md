# Fig 60
**Fig 60** is a privacy-centric, zero-server micro-video platform built on a simple premise: **Technology and AI are tools for human intent, not replacements for human perspective.** 

Rejecting realistic fake automated media, Fig 60 puts the creator fully in the driver's seat using strict boundaries and absolute local data privacy.

## Core Philosophy
* **Human-First Intent:** Technology should serve your creative vision, not churn out automated noise.
* **100% Local & Private:** Zero servers, zero telemetry. Your media never leaves your device.
* **Intentional Constraints:** Enforced 60-second duration and 720p resolution limits keep work focused, lightweight, and manageable.

## Architecture
* Built with `ffmpeg.wasm` running entirely inside multi-threaded Web Workers.
* Browser-only execution ensuring complete user data sovereignty.
---

## ⚡ Powered by MAE-B Engine

**Fig 60** is powered by **MAE-B** (*Motor-Accessible Editing — Browser*), an open interaction standard designed for single-tap, gesture-free media creation.

### MAE-B Core Design Principles
* **Zero Complex Gestures:** Eliminates timeline dragging, pinching, and double-tapping in favor of large, single-tap actions.
* **Discrete Nudge Controls:** Fine-tune start and end points using accessible `+0.5s` and `-0.5s` adjustment buttons.
* **Massive Touch Targets:** Compliant with WCAG 2.2 touch-target rules (56px+ targets) to support motor accessibility and switch-control devices.
* **100% In-Browser Execution:** Operates entirely client-side using WebAssembly (`ffmpeg.wasm`) and Web Workers—no servers, zero telemetry.
