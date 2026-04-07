---
name: AI Voice Agent
description: Efficient patterns for building modular, high-performance AI voice agents using Web Speech API and Gemini 1.5/2.5.
---

# AI Voice Agent Skill

This skill documents the engineering standards for AI-driven voice agents, focusing on auditory clarity, low-latency processing, and hands-free user experience.

## 🎙️ Voice Processing Architecture

### 1. Web Speech API Integration
Use the browser's native capabilities for seamless, zero-install voice interaction.
- **SpeechRecognition**: Configure with `continuous: true` and `interimResults: true` for responsive real-time feedback.
- **SpeechSynthesis**: Utilize high-quality neural voices where available. Always provide a fallback to standard system voices.

### 2. Audio Permission Lifecycle
- **Explicit Trigger**: Audio permission must be requested only after a clear user interaction (e.g., clicking a microphone icon).
- **Visual State**: Provide a clear "Listening" indicator (pulsing glow/waveform) to notify the user of active recording.

## 🧠 Conversation Flow & Logic

### 1. Latency Optimization
- **Stream Processing**: Process interim transcripts for proactive intent detection before the user finishes speaking.
- **Backend Sync**: Utilize Gemini 1.5 Flash/2.5 Flash for ultra-fast text generation to minimize the delay between "End of Speech" and "Start of response".

### 2. Interaction Modes
- **Push-to-Talk (PTT)**: Standard for high-noise environments or clinical settings.
- **Always Listening (Contextual)**: Use sparingly; ensure strict "Wake Word" or "Interaction Threshold" guards are in place.

## 🔊 UX & Feedback Patterns

### 1. Auditory Feedback
- **Start/Stop Tones**: Gentle, non-intrusive tones to acknowledge the start and end of recording.
- **Interruption Handling**: Automatically pause `SpeechSynthesis` if new `SpeechRecognition` input is detected with high confidence.

### 2. Visual Synchronization
- **Voice Waveforms**: Canvas-based visualizations reflecting the user's input volume.
- **Text Sync**: Optionally display the live transcript as it's being recognized to build user trust.

## 🛰️ Fleet Integration
- **Heartbeat Requirement**: Voice agent deployments must heartbeat into the Fleet Monitor using a **verified Firebase ID token with MFA claims** to satisfy governance gates.
- **Registry Linkage**: Include `masterId` in auditory telemetry if used for customer-specific interactions.

## 🚀 Environment Standard
- **Cloud-First Development**: Prioritize dedicated **Firebase Cloud Development Environments** to ensure consistent audio processing performance and system parity.

---
*Maintained by Agility AI Architects // BMADD v6.1.0*
