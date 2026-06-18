"use client";

import { useEffect, useRef, useState } from "react";
import IndustriesSection from "./components/IndustriesSection";

const chapters = [
  { timestamp: 0, title: "Connect to data source", description: "0:00 - 0:10" },
  { timestamp: 10, title: "Knowledge graphs", description: "0:10 - 0:20" },
  { timestamp: 20, title: "Telemetry insights", description: "0:20 - 0:28" },
  { timestamp: 28, title: "Prompting to Karl", description: "0:28 - end" }
];

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const heroRef = useRef(null);
  const barRef = useRef(null);
  const bgVideoRef = useRef(null);
  const overlayExtraRef = useRef(null);
  const heroContentRef = useRef(null);
  const scrollHintRef = useRef(null);
  const heroStageRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const demoVideoRef = useRef(null);
  const progressRef = useRef(null);

  const updateVideoState = (video) => {
    if (!video?.duration) return;

    const progress = Math.max(0, Math.min(1, video.currentTime / video.duration));
    setVideoTime(video.currentTime);
    setVideoProgress(progress * 100);

    const nextActive = chapters.reduce((current, chapter, index) => {
      return chapter.timestamp <= video.currentTime ? index : current;
    }, 0);
    setActiveChapter(nextActive);
  };

  useEffect(() => {
    const adjustHero = () => {
      if (!heroRef.current) return;
      const barHeight = showAnnouncement ? barRef.current?.offsetHeight || 0 : 0;
      heroRef.current.style.setProperty("--announcement-height", `${barHeight}px`);
    };

    adjustHero();
    window.addEventListener("resize", adjustHero);
    return () => window.removeEventListener("resize", adjustHero);
  }, [showAnnouncement]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let frameId;

    const handleMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const cursorLoop = () => {
      dotX += (mouseX - dotX) * 0.18;
      dotY += (mouseY - dotY) * 0.18;
      ringX += (mouseX - ringX) * 0.07;
      ringY += (mouseY - ringY) * 0.07;
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      frameId = requestAnimationFrame(cursorLoop);
    };

    const interactiveElements = document.querySelectorAll("a,button,.aclose,.chapter-item,.video-progress");
    const grow = () => ring.classList.add("big");
    const shrink = () => ring.classList.remove("big");

    document.addEventListener("mousemove", handleMove);
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", grow);
      element.addEventListener("mouseleave", shrink);
    });
    frameId = requestAnimationFrame(cursorLoop);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", grow);
        element.removeEventListener("mouseleave", shrink);
      });
      cancelAnimationFrame(frameId);
    };
  }, [showAnnouncement]);

  useEffect(() => {
    const scrollZone = 400;
    let ticking = false;

    const ease = (value) =>
      value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;

    const update = () => {
      ticking = false;
      const progress = Math.min(window.scrollY / scrollZone, 1);
      const eased = ease(progress);
      const textProgress = eased * eased * eased;

      if (bgVideoRef.current) {
        bgVideoRef.current.style.filter = `blur(${eased * 5}px)`;
      }
      if (overlayExtraRef.current) {
        overlayExtraRef.current.style.opacity = eased * 0.8;
      }
      if (heroContentRef.current) {
        heroContentRef.current.style.opacity = textProgress;
        heroContentRef.current.style.transform = `translateY(${28 - textProgress * 28}px)`;
      }
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = Math.max(0, 1 - progress * 1.5);
      }
      if (heroStageRef.current) {
        heroStageRef.current.style.setProperty("--hero-scroll-zone", `${scrollZone}px`);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const handleTimeUpdate = () => {
    const video = demoVideoRef.current;
    updateVideoState(video);
  };

  const handleLoadedMetadata = () => {
    const video = demoVideoRef.current;
    if (video?.duration) {
      setVideoDuration(video.duration);
      updateVideoState(video);
    }
  };

  const seekToProgress = (event) => {
    const video = demoVideoRef.current;
    const progress = progressRef.current;
    if (!video?.duration || !progress) return;

    const rect = progress.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    video.currentTime = Math.max(0, Math.min(1, percent)) * video.duration;
  };

  const seekToChapter = (timestamp, index) => {
    const video = demoVideoRef.current;
    if (video) {
      video.currentTime = timestamp;
      updateVideoState(video);
      video.play().catch(() => {});
    }
    setActiveChapter(index);
  };

  const fallbackDuration = chapters[chapters.length - 1].timestamp + 10;
  const measuredDuration = videoDuration || fallbackDuration;
  const chapterSegments = chapters.map((chapter, index) => {
    const nextTimestamp = chapters[index + 1]?.timestamp ?? measuredDuration;
    const duration = Math.max(nextTimestamp - chapter.timestamp, 1);
    const elapsed = Math.max(0, Math.min(duration, videoTime - chapter.timestamp));
    return {
      ...chapter,
      duration,
      segmentProgress: index < chapters.length - 1 ? (elapsed / duration) * 100 : 0
    };
  });

  return (
    <>
      <div id="cur-dot" ref={dotRef} />
      <div id="cur-ring" ref={ringRef} />

      {showAnnouncement && (
        <div id="abar-wrap" ref={barRef}>
          <div id="abar">
            Karl is now available on Microsoft Fabric Marketplace
            <a href="#">Learn more -&gt;</a>
            <button
              className="aclose"
              type="button"
              aria-label="Close announcement"
              onClick={() => setShowAnnouncement(false)}
            >
              x
            </button>
          </div>
        </div>
      )}

      <div className="hero-stage" ref={heroStageRef}>
        <div className="hero-sticky" ref={heroRef}>
          <video id="bgvid" ref={bgVideoRef} autoPlay muted loop playsInline>
            <source src="/full-bg-video.mp4" type="video/mp4" />
          </video>

          <div id="overlay" />
          <div id="overlay-extra" ref={overlayExtraRef} />

          <nav>
            <a href="#" className="nav-logo">
              <div className="logomark">K</div>
              <span className="wordmark">Karl</span>
            </a>
            <ul className="nav-links">
              <li><a href="#">Platform</a></li>
              <li><a href="#">Solutions</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">About</a></li>
            </ul>
            <div className="nav-right">
              <a href="#" className="n-login">Login v</a>
              <a href="#" className="n-demo">Request a Demo</a>
            </div>
          </nav>

          <div id="hero-content" ref={heroContentRef}>
            <h1 className="hero-h1">
              Your Data Team,<br />On Demand.
            </h1>
            <p className="hero-sub">
              The most successful enterprises don&apos;t wait for insight - they demand it.
              Karl puts the full power of your data in every leader&apos;s hands, instantly.
              No analysts. No dashboards. Just answers, the moment you need them.
            </p>
            <a href="#" className="hero-cta">Request a Demo</a>
          </div>

          <div id="scroll-hint" ref={scrollHintRef}>
            <div className="scroll-chevron">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 6l5 5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span>Scroll</span>
          </div>
        </div>
      </div>

      <div id="page-below">
        <div className="bottom-bar">
          <div className="bb-left">
            <span className="bb-label">Built for enterprise teams in:</span>
            <div className="industries">
              <div className="industry">Manufacturing</div>
              <div className="industry">Retail</div>
              <div className="industry">Pharma</div>
              <div className="industry">Financial Services</div>
            </div>
          </div>
          <div className="bb-right">
            <a href="#">See how it works -&gt;</a>
          </div>
        </div>

        <section className="video-section">
          <div className="video-container">
            <video
              ref={demoVideoRef}
              id="demo-video"
              className="demo-video"
              controls
              onLoadedMetadata={handleLoadedMetadata}
              onSeeked={handleTimeUpdate}
              onTimeUpdate={handleTimeUpdate}
            >
              <source src="/karl-demo.mp4" type="video/mp4" />
            </video>

            <div className="video-progress" ref={progressRef} onClick={seekToProgress}>
              <div className="progress-bar" style={{ width: `${videoProgress}%` }} />
            </div>
          </div>

          <div className="chapters-sidebar">
            {chapterSegments.map((chapter, index) => (
              <button
                className={`chapter-item${activeChapter === index ? " active" : ""}`}
                key={chapter.title}
                type="button"
                style={{
                  "--chapter-duration": chapter.duration,
                  "--chapter-segment-progress": `${chapter.segmentProgress}%`
                }}
                onClick={() => seekToChapter(chapter.timestamp, index)}
              >
                {index < chapterSegments.length - 1 && (
                  <span className="chapter-line" aria-hidden="true">
                    <span className="chapter-line-fill" />
                  </span>
                )}
                <span className="chapter-marker" aria-hidden="true" />
                <span className="chapter-content">
                  <span className="chapter-title">{chapter.title}</span>
                  <span className="chapter-description">{chapter.description}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <IndustriesSection />
      </div>
    </>
  );
}
