---
title: "A Dual-Branch Fusion CNN for Multi-Label RF Signal Classification: Project Overwatch, AI radio-signal classifier"
summary: A dual-branch deep-learning model that reads raw IQ radio samples and flags civilian, military, and jamming signals, even when several overlap in the same 160 µs window. Every judged class clears the 80% recall bar.
tags: [PyTorch, RF signal processing, multi-label CNN, RadioML]
flagship: false
href: /projects/sedic
order: 4
color: "#6D28D9"
context: "SEDIC 2026 · Track 1 winner"
---

Team NEXA's track-winning entry to Project Overwatch, Track 1 of SEDIC 2026
(the Strategic Electronic Defence Innovation Challenge, organised by UPNM and
held at MITEC alongside CyberDSA). A two-branch fusion CNN (raw IQ + spectrogram) classifies eight signal classes
from raw radio samples with independent sigmoid outputs, so a jammer
overlaid on a civilian link reads as both. A web console replays captures,
explains each verdict, and exports reports. Operators can correct the
model, each correction needs a second person's approval, and a retrained
model only goes live after passing evaluation. Everything runs offline on one
workstation.

Built with Eavan Tan, Jessy Pang, and Chua Xin Ying. I owned the civilian
modulation classes and the data pipeline.
