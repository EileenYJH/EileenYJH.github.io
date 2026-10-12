---
title: Project Overwatch — AI radio-signal classifier
summary: A dual-branch deep-learning model that reads raw IQ radio samples and flags civilian, military, and jamming signals — even when several overlap in the same 160 µs window. Every judged class clears the 80% recall bar.
tags: [PyTorch, RF signal processing, multi-label CNN, RadioML]
flagship: false
href: /projects/sedic
order: 4
---

Project Overwatch is team NEXA's entry to the SEDIC 2026 RF/Signal Track. A
two-branch fusion CNN (raw IQ + spectrogram) classifies eight signal classes
from raw radio samples with independent sigmoid outputs, so a jammer
overlaid on a civilian link reads as both. A web console replays captures,
explains each verdict, and exports reports.

Built with Eavan Tan, Jessy Pang, and Chua Xin Ying. I owned the civilian
modulation classes and the data pipeline.
