---
title: "Hormuz Flow: following an oil shock from the strait to 175 countries"
summary: A one-page web app that traces lost oil flow through the Strait of Hormuz into the oil price, product prices, industry costs and the cost of living in 175 countries, with a source and a range on every number. I built the industry-impact view and its number-checked AI explanations.
tagline: "The Strait of Hormuz closed in March 2026, and estimates of how much oil still got through disagreed threefold. Hormuz Flow asks the next question: how far does a loss of flow carry, and for which countries?"
tags: [Data visualisation, JavaScript, Python, Gemini API]
visibility: draft
order: 9
color: "#BE123C"
context: "OxHack 26 · Oxford · team of four"
status: completed
completed: "2026-10-25"
problem: >-
  From March 2026 the Strait of Hormuz was effectively closed, and published
  estimates of the oil still getting through differed by about three times
  (around 3.5 mb/d from ship trackers against around 10 mb/d from US
  officials), because many tankers switch their transponders off. Before the
  war about 20 mb/d passed through it. Trackers only see ships that broadcast,
  and existing tools don't link a loss of flow to downstream costs with
  sources and uncertainty attached.
role: >-
  I owned the industry-impact lane: the research behind it, the industry view
  of the app, its AI explanations, and much of the app's interface.
contributions:
  - "Industry research: pass-through rates, industry exposure shares and FRED series, each with a source and collection date, extended to 13 industries with cited cost shares (for example fishing 14%, packaging resin 70%)."
  - "The industry view: a build script that turns a teammate's strait page into an industry tool through about 20 patch steps, each asserting its target so upstream changes fail loudly instead of silently. It adds product layers, tanker routes and per-country Industries tabs, all driven by the lost-flow slider."
  - "\"Why these numbers?\" explanations: a local service that sends Gemini only the figures a panel shows, then checks every number in the answer against those figures and flags any it can't match. The API key never reaches the page or the repo."
  - "App interface: country focus (zoom to the country and open its detail below the map), the Models page in tabs with sources behind info buttons, and layout fixes to the legend, country tabs and Shock card."
  - "A data audit of every number shown in the app, which replaced a hand-set shortage premium with the team's measured 1.49× disruption multiplier and aligned the slider with the measure the price curve was fitted on."
team: [Alex-Sebastian Ene, Ed Denton, Yasmin, Eileen Yeoh]
implementation: >-
  A single self-contained HTML page with no server. Python experiments compute
  the models offline and save their outputs as CSV and JSON; a Python build
  bakes them into the page, so the browser only interpolates between saved
  scenarios. Lost flow is the one input: it drives Brent (with a 90% band),
  then product prices and inflation, then each country's fuel and grocery
  costs, then industry costs as cost share times price move.
technologies: [JavaScript, HTML/CSS, d3.js, globe.gl, Python, NumPy, pandas, pytest, Gemini API, GitHub Actions, GitHub Pages]
results:
  - text: "Live on GitHub Pages with all four views (World, Strait, Households, Models)."
    source: deployed site, opened 28 Oct 2026
  - text: "Country views for 175 countries, 177 on the map."
    source: deployed page data
  - text: "Team test suite: 197 tests passing."
    source: pytest run, 28 Oct 2026
challenges:
  - "Keeping a copied page in step with three teammates' changes during a two-day build, solved with patch steps that fail the build if their target moves."
  - "Stopping hand-set numbers slipping in: the audit traced every figure to a source, then replaced a hand-set premium and fixed a slider that started on a different flow measure from the price curve."
  - "Making AI text trustworthy on a free Gemini key: retries and pre-written answers for timeouts and rate limits, and a number check so the model can't introduce figures."
repo: https://github.com/Alex-Sebastian-Ene/oxhack
demo: https://alex-sebastian-ene.github.io/oxhack/
images: []
unknowns:
  - what Eileen learned and would do differently
  - photos (OXHACK2026 Drive folder, waiting for download and approval)
  - "'no data' industry rows cut from about 167 to 17: not re-counted"
  - LinkedIn post or video
---

Every number in the app shows its source and date, simulated data is labelled
as simulated, and the price model uses the IEA's lost-flow count (which
includes dark tankers) rather than only what ship trackers can see. Gemini
never produces a number: it rewrites facts it is given, and its answers are
labelled as AI-written.

The statistical and machine-learning models are Alex-Sebastian Ene's, and the
original strait page, app shell and flow estimate are Ed Denton's.
