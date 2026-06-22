const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
const navSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (navLinks.length && navSections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${visible.target.id}`,
        );
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.65] },
  );

  navSections.forEach((section) => navObserver.observe(section));
}

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealTargets = document.querySelectorAll(
  [
    ".hero > *",
    ".section__title",
    ".project-card",
    ".featured-card",
    ".section--reading > *",
    ".archive-list a",
    ".showcase-hero > *",
    ".showcase-carousel",
    ".showcase-content > *",
    ".council-overview > *",
    ".sunwalk-overview > *",
    ".soundmap-overview > *",
    ".council-section > .council-copy",
    ".council-section > .council-intro-copy",
    ".council-section > .section-kicker",
    ".council-section > h3",
    ".council-section > p",
    ".council-section > figure",
    ".insight-grid > article",
    ".sunwalk-research-grid > article",
    ".case-hero > *",
    ".case-section > *",
    ".case-meta-grid > *",
    ".stat-grid > *",
  ].join(", "),
);
let revealObserver;

if (motionQuery.matches) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
} else if (revealTargets.length) {
  revealTargets.forEach((target) => target.classList.add("reveal-on-scroll"));

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}

function resetRevealWithin(container) {
  if (motionQuery.matches || !container || !revealObserver) return;

  container.querySelectorAll(".reveal-on-scroll").forEach((target) => {
    target.classList.remove("is-visible");
    revealObserver.unobserve(target);
    revealObserver.observe(target);
  });
}

const showcaseData = {
  "the-council": {
    kind: "Vibe coding project",
    title: "The Council",
    summary:
      "The Council is a conversational experience where users bring a dilemma they keep returning to, and meet it through the eyes of philosophical character(s).",
    quote:
      "The goal was not to make the interface louder. It was to make thinking feel accompanied.",
    overview:
      "Placeholder overview for The Council. This section will describe the initial idea, the conversational model, and why the experience is framed as a quiet ritual rather than a chat utility.",
    detail:
      "Placeholder detail copy about the interface decisions, the role of each council voice, and how the prototype uses pacing, hierarchy, and restraint to make reflection feel structured.",
    link: "View prototype",
  },
  "soft-index": {
    kind: "Vibe coding project",
    title: "Soft Index",
    summary:
      "A small dashboard prototype for indexing dense knowledge without making the interface feel heavy.",
    quote:
      "The project asked how little structure an interface can use while still feeling dependable.",
    overview:
      "Placeholder overview for the product idea, the constraint, and the reason a soft visual system made sense for this workflow.",
    detail:
      "Placeholder detail copy about filters, empty states, metadata, and the rhythm of scanning across dense information.",
    link: "View prototype",
  },
  sunwalk: {
    kind: "Vibe coding project",
    title: "Sunwalk",
    summary:
      "A mobile app that makes sunlight visible, tracking daily exposure and guiding people outside when they need it most.",
    quote:
      "Sunlight is not a productivity metric. It is a quiet environmental cue that changes how the day feels.",
    overview:
      "Sunwalk helps people understand how much sunlight they receive throughout the day, then nudges them toward small outdoor moments when their body might need them most.",
    detail:
      "Built during a three-day hackathon, the prototype explores sunlight as a daily rhythm: something to notice, plan around, and return to with curiosity.",
    link: "View prototype",
  },
  soundmap: {
    kind: "Vibe coding project",
    title: "Soundmap",
    summary:
      "A website that maps your Spotify playlist onto a world map based on where each artist is from.",
    quote:
      "Genres do not start in a vacuum, they start in a city, a climate, a language.",
    overview:
      "Soundmap began as a curiosity about whether the sound of a track is connected to where it came from. It maps Spotify playlists to artist origins so a playlist can become a geographic object.",
    detail:
      "The hardest part was origin data. Spotify does not expose it, so the build relies on live lookup through MusicBrainz and clear UI states for tracks that mapped successfully or could not be verified.",
    link: "View prototype",
  },
  "signal-room": {
    kind: "Vibe coding project",
    title: "Signal Room",
    summary:
      "A fast visual study for making operational signals easier to scan, compare, and discuss.",
    quote:
      "The useful part was not more data. It was a calmer way to notice what mattered.",
    overview:
      "Placeholder overview for the experiment, including the signal model, layout premise, and why the prototype stayed intentionally small.",
    detail:
      "Placeholder detail copy about cards, status language, progressive disclosure, and the interaction choices that made the room feel readable.",
    link: "View prototype",
  },
};

const modal = document.querySelector("#showcase-modal");
const modalTitle = document.querySelector("#showcase-title");
const modalKind = document.querySelector("#showcase-kind");
const modalSummary = document.querySelector("#showcase-summary");
const modalQuote = document.querySelector("#showcase-quote");
const modalOverview = document.querySelector("#showcase-overview");
const modalDetail = document.querySelector("#showcase-detail");
const modalLink = document.querySelector("#showcase-link");
const genericShowcaseContent = document.querySelector(".showcase-content");
const councilStory = document.querySelector("[data-council-story]");
const councilOverview = document.querySelector("[data-council-overview]");
const sunwalkStory = document.querySelector("[data-sunwalk-story]");
const sunwalkOverview = document.querySelector("[data-sunwalk-overview]");
const soundmapOverview = document.querySelector("[data-soundmap-overview]");
const projectCarousels = document.querySelectorAll("[data-project-carousel]");
const modalTriggers = document.querySelectorAll("[data-project]");
const closeButtons = document.querySelectorAll("[data-modal-close]");
let openedAt = 0;

const coverTimeVideos = document.querySelectorAll("[data-stop-cover-time]");

coverTimeVideos.forEach((video) => {
  const coverTime = Number(video.dataset.stopCoverTime || 0);

  video.addEventListener("ended", () => {
    video.currentTime = coverTime;
    video.pause();
  });
});

function resetModalPosition() {
  if (!modal) return;

  const modalPanel = modal.querySelector(".showcase-modal__panel");

  modal.scrollTop = 0;
  modal.scrollLeft = 0;

  if (modalPanel) {
    const previousScrollBehavior = modalPanel.style.scrollBehavior;
    modalPanel.style.scrollBehavior = "auto";
    modalPanel.scrollTop = 0;
    modalPanel.scrollLeft = 0;
    modalPanel.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    modalPanel.style.scrollBehavior = previousScrollBehavior;
  }

  projectCarousels.forEach((carousel) => {
    carousel.scrollLeft = 0;
    carousel.scrollTo?.({ left: 0, behavior: "auto" });
  });
}

function openModal(projectId) {
  const project = showcaseData[projectId];
  if (!modal || !project) return;

  modal.classList.remove("is-open");
  modal.classList.add("is-preparing");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "hidden";

  modalKind.textContent = project.kind;
  modalTitle.textContent = project.title;
  modalSummary.textContent = project.summary;
  modalQuote.textContent = `“${project.quote}”`;
  modalOverview.textContent = project.overview;
  modalDetail.textContent = project.detail;
  modalLink.textContent = project.link;
  const isCouncil = projectId === "the-council";
  const isSunwalk = projectId === "sunwalk";
  const isSoundmap = projectId === "soundmap";
  const carouselKey =
    isCouncil || isSunwalk || isSoundmap ? projectId : "generic";
  councilStory?.classList.toggle("is-hidden", !isCouncil);
  councilOverview?.classList.toggle("is-hidden", !isCouncil);
  sunwalkStory?.classList.toggle("is-hidden", !isSunwalk);
  sunwalkOverview?.classList.toggle("is-hidden", !isSunwalk);
  soundmapOverview?.classList.toggle("is-hidden", !isSoundmap);
  genericShowcaseContent?.classList.toggle(
    "is-hidden",
    isCouncil || isSunwalk || isSoundmap,
  );
  projectCarousels.forEach((carousel) => {
    carousel.classList.toggle(
      "is-hidden",
      carousel.dataset.projectCarousel !== carouselKey,
    );
  });
  openedAt = Date.now();

  resetModalPosition();
  modal.offsetHeight;
  resetModalPosition();
  resetRevealWithin(modal);
  modal.classList.remove("is-preparing");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  resetModalPosition();

  requestAnimationFrame(() => {
    resetModalPosition();
    setTimeout(resetModalPosition, 0);
  });

  modal
    .querySelectorAll("[data-stop-cover-time]")
    .forEach((video) => {
      video.currentTime = 0;
      video.play?.().catch(() => {
        video.currentTime = Number(video.dataset.stopCoverTime || 0);
      });
    });

  activeWalkthroughStep = "";
  activeSunwalkStep = "";

  if (isCouncil) {
    setActiveWalkthroughStep("sage");
  } else {
    walkthroughVisuals.forEach((visual) => setVisualVideoState(visual, false));
  }

  if (isSunwalk) {
    setActiveSunwalkStep("route");
  } else {
    sunwalkVisuals.forEach((visual) => setVisualVideoState(visual, false));
  }
}

function closeModal() {
  if (!modal) return;
  if (Date.now() - openedAt < 250) return;
  resetModalPosition();
  modal.classList.remove("is-open");
  modal.classList.remove("is-preparing");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  resetModalPosition();
  activeWalkthroughStep = "";
  activeSunwalkStep = "";
  walkthroughVisuals.forEach((visual) => setVisualVideoState(visual, false));
  sunwalkVisuals.forEach((visual) => setVisualVideoState(visual, false));
}

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(trigger.dataset.project);
  });
});

document.addEventListener("click", (event) => {
  const trigger = event.target.closest?.("[data-project]");
  if (!trigger) return;
  event.preventDefault();
  openModal(trigger.dataset.project);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document
  .querySelector(".showcase-modal__panel")
  ?.addEventListener("click", (event) => {
    event.stopPropagation();
  });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const processLinks = document.querySelectorAll(".case-progress nav a");
const processSections = Array.from(processLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (processLinks.length && processSections.length) {
  const processObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      processLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${visible.target.id}`,
        );
      });
    },
    { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] },
  );

  processSections.forEach((section) => processObserver.observe(section));
}

const walkthroughSteps = document.querySelectorAll("[data-walkthrough-step]");
const walkthroughVisuals = document.querySelectorAll("[data-walkthrough-visual]");
const walkthroughRoot = document.querySelector(".showcase-modal__panel");
let activeWalkthroughStep = "";
let activeSunwalkStep = "";

function setVisualVideoState(visual, isActive, shouldRestart) {
  visual.querySelectorAll("video").forEach((video) => {
    if (!isActive) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    if (shouldRestart) {
      video.currentTime = 0;
    }

    video.play?.().catch(() => {});
  });
}

function setActiveWalkthroughStep(stepName) {
  const shouldRestart = activeWalkthroughStep !== stepName;
  activeWalkthroughStep = stepName;

  walkthroughSteps.forEach((step) => {
    step.classList.toggle(
      "is-active",
      step.dataset.walkthroughStep === stepName,
    );
  });

  walkthroughVisuals.forEach((visual) => {
    const isActive = visual.dataset.walkthroughVisual === stepName;
    visual.classList.toggle("is-active", isActive);
    setVisualVideoState(visual, isActive, shouldRestart);
  });
}

if (walkthroughSteps.length && walkthroughVisuals.length) {
  const walkthroughObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      setActiveWalkthroughStep(visible.target.dataset.walkthroughStep);
    },
    {
      root: walkthroughRoot,
      rootMargin: "-28% 0px -42% 0px",
      threshold: [0.12, 0.35, 0.6],
    },
  );

  walkthroughSteps.forEach((step) => walkthroughObserver.observe(step));
}

const sunwalkSteps = document.querySelectorAll("[data-sunwalk-step]");
const sunwalkVisuals = document.querySelectorAll("[data-sunwalk-visual]");

function setActiveSunwalkStep(stepName) {
  const shouldRestart = activeSunwalkStep !== stepName;
  activeSunwalkStep = stepName;

  sunwalkSteps.forEach((step) => {
    step.classList.toggle("is-active", step.dataset.sunwalkStep === stepName);
  });

  sunwalkVisuals.forEach((visual) => {
    const isActive = visual.dataset.sunwalkVisual === stepName;
    visual.classList.toggle("is-active", isActive);
    setVisualVideoState(visual, isActive, shouldRestart);
  });
}

if (sunwalkSteps.length && sunwalkVisuals.length) {
  const sunwalkObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      setActiveSunwalkStep(visible.target.dataset.sunwalkStep);
    },
    {
      root: walkthroughRoot,
      rootMargin: "-28% 0px -42% 0px",
      threshold: [0.12, 0.35, 0.6],
    },
  );

  sunwalkSteps.forEach((step) => sunwalkObserver.observe(step));
}

(() => {
  const widget = document.querySelector("[data-oneko-divider]");
  const cat = document.querySelector("[data-oneko-cat]");
  const ball = document.querySelector("[data-oneko-ball]");

  if (!widget || !cat || !ball) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const catSize = 40;
  const spriteFrameSize = 40;
  const ballSize = 16;
  const spriteSets = {
    idle: [[-3, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
  };

  const state = {
    width: 0,
    homeX: 0,
    catX: 0,
    ballX: 0,
    ballY: 0,
    ballVX: 0,
    ballVY: 0,
    bounces: 0,
    launched: false,
    ballResting: true,
    catMode: "idle",
    pauseUntil: 0,
    lastTime: performance.now(),
    lastSpriteAt: 0,
    walkFrame: 0,
    idleTicks: 0,
    idleAnimation: null,
    idleAnimationFrame: 0,
    initialBallPlaced: false,
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function setSprite(name, frame = 0) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    cat.style.backgroundPosition = `${sprite[0] * spriteFrameSize}px ${
      sprite[1] * spriteFrameSize
    }px`;
  }

  function positionElements() {
    cat.style.transform = `translate3d(${Math.round(state.catX)}px, 0, 0)`;
    ball.style.transform = `translate3d(${Math.round(state.ballX)}px, ${Math.round(
      -state.ballY,
    )}px, 0)`;
  }

  function measure() {
    const rect = widget.getBoundingClientRect();
    const previousWidth = state.width || rect.width;
    const previousHomeRatio = previousWidth ? state.homeX / previousWidth : 0.1;
    state.width = rect.width;
    const maxHomeX = Math.max(24, state.width - catSize - 80);
    state.homeX = clamp(
      Math.round(state.width * previousHomeRatio || state.width * 0.1),
      24,
      maxHomeX,
    );

    if (state.catMode === "idle") {
      state.catX = state.homeX;
    } else {
      state.catX = clamp(state.catX, 0, state.width - catSize);
    }

    if (state.ballResting && !state.launched && !state.initialBallPlaced) {
      state.ballX = clamp(state.homeX + 64, 0, state.width - ballSize);
      state.ballY = 0;
      state.initialBallPlaced = true;
    } else {
      state.ballX = clamp(state.ballX, 0, state.width - ballSize);
    }

    positionElements();
  }

  function resetIdleAnimation() {
    state.idleAnimation = null;
    state.idleAnimationFrame = 0;
    state.idleTicks = 0;
  }

  function runIdleSprite(now) {
    if (now - state.lastSpriteAt < 180) return;

    state.lastSpriteAt = now;
    state.idleTicks += 1;

    if (!state.idleAnimation && state.idleTicks > 18 && Math.random() < 0.18) {
      state.idleAnimation = Math.random() < 0.55 ? "sleeping" : "scratchSelf";
      state.idleAnimationFrame = 0;
    }

    if (state.idleAnimation === "sleeping") {
      setSprite("sleeping", Math.floor(state.idleAnimationFrame / 4));
      state.idleAnimationFrame += 1;

      if (state.idleAnimationFrame > 80) resetIdleAnimation();
      return;
    }

    if (state.idleAnimation === "scratchSelf") {
      setSprite("scratchSelf", state.idleAnimationFrame);
      state.idleAnimationFrame += 1;

      if (state.idleAnimationFrame > 9) resetIdleAnimation();
      return;
    }

    setSprite("idle", 0);
  }

  function stepBall(dt) {
    if (!state.launched) return;

    state.ballVY -= 1600 * dt;
    state.ballX += state.ballVX * dt;
    state.ballY += state.ballVY * dt;

    if (state.ballX <= 0) {
      state.ballX = 0;
      state.ballVX = Math.abs(state.ballVX) * 0.82;
    } else if (state.ballX >= state.width - ballSize) {
      state.ballX = state.width - ballSize;
      state.ballVX = -Math.abs(state.ballVX) * 0.82;
    }

    if (state.ballY <= 0) {
      state.ballY = 0;

      if (state.ballVY < 0 && state.bounces < 4 && Math.abs(state.ballVY) > 130) {
        state.ballVY = -state.ballVY * 0.5;
        state.ballVX *= 0.82;
        state.bounces += 1;
      } else if (state.bounces >= 2 || Math.abs(state.ballVY) <= 130) {
        state.ballVY = 0;
        state.ballVX = 0;
        state.launched = false;
        state.ballResting = true;
      }
    }
  }

  function stepCat(dt, now) {
    if (state.catMode === "idle") {
      runIdleSprite(now);
      return;
    }

    const speed = 280;
    const targetX = clamp(
      state.ballX - Math.round((catSize - ballSize) / 2),
      0,
      state.width - catSize,
    );
    const distance = targetX - state.catX;

    if (Math.abs(distance) <= speed * dt) {
      state.catX = targetX;

      if (state.catMode === "chasing" && state.ballResting) {
        state.catMode = "pausing";
        state.pauseUntil = now + 550;
        setSprite("idle", 0);
      }
    } else {
      state.catX += Math.sign(distance) * speed * dt;
    }

    if (state.catMode === "pausing") {
      setSprite("idle", 0);
      if (now >= state.pauseUntil) {
        state.homeX = state.catX;
        state.catMode = "idle";
        resetIdleAnimation();
      }
      return;
    }

    if (now - state.lastSpriteAt > 120) {
      state.lastSpriteAt = now;
      state.walkFrame += 1;
      setSprite(distance >= 0 ? "E" : "W", state.walkFrame);
    }
  }

  function tick(now) {
    const dt = Math.min((now - state.lastTime) / 1000, 0.033);
    state.lastTime = now;

    if (!reduceMotion.matches) {
      stepBall(dt);
      stepCat(dt, now);
      positionElements();
    }

    requestAnimationFrame(tick);
  }

  function launchBall() {
    if (reduceMotion.matches) {
      return;
    }

    const towardRight =
      state.ballX < state.width * 0.72 && (Math.random() > 0.35 || state.ballX < 80);

    state.launched = true;
    state.ballResting = false;
    state.bounces = 0;
    state.ballVX = (towardRight ? 1 : -1) * (240 + Math.random() * 140);
    state.ballVY = 560 + Math.random() * 110;
    state.catMode = "chasing";
    state.pauseUntil = 0;
    resetIdleAnimation();
  }

  ball.addEventListener("click", launchBall);
  window.addEventListener("resize", measure);

  measure();
  setSprite("idle", 0);
  requestAnimationFrame((now) => {
    state.lastTime = now;
    requestAnimationFrame(tick);
  });
})();
