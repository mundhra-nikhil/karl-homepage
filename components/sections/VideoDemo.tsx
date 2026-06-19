"use client";
import { useRef, useState } from "react";
import React from "react";

/* ─── Chapter data ──────────────────────────────────────────────────────── */
interface Chapter {
  timestamp: number;
  title: string;
  description: string;
}

/** Chapter markers — timestamps unchanged, descriptions updated */
const chapters: Chapter[] = [
  {
    timestamp: 0,
    title: "Connect to Data Source",
    description:
      "Connect an existing data source or bring a new connection to life inside of Karl's context window within seconds.",
  },
  {
    timestamp: 10,
    title: "Knowledge Guide",
    description:
      "Visualize how tables and columns connect as lineages and schemas. Karl uses these graphs to plan and resolve queries and reduce ambiguity.",
  },
  {
    timestamp: 20,
    title: "Telemetry Insights",
    description: "Track system health and query patterns across your workspace.",
  },
  {
    timestamp: 28,
    title: "Ask Karl Directly",
    description:
      "Chat with Karl to build comprehensive reports and get answers to urgent questions in natural language. Karl brings together a unique and powerful system to build the right graphs, summaries and analysis for you.",
  },
];

/* ─── Component ─────────────────────────────────────────────────────────── */
import { chapters } from "@/lib/data/videoChapters";
import type { Chapter } from "@/lib/data/videoChapters";

interface ChapterSegment extends Chapter {
  duration: number;
  segmentProgress: number;
}

/**
 * VideoDemo — demo video player with a chapter sidebar.
 * Owns all video state internally; no props required.
 */
export default function VideoDemo() {
  /* ── All original state & refs preserved ── */
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoTime, setVideoTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const demoVideoRef = useRef<HTMLVideoElement>(null);

  /* ── Original handler logic preserved exactly ── */
  const updateVideoState = (video: HTMLVideoElement | null): void => {
    if (!video?.duration) return;

    const progress = Math.max(0, Math.min(1, video.currentTime / video.duration));
    setVideoTime(video.currentTime);
    setVideoProgress(progress * 100);

    const nextActive = chapters.reduce<number>(
      (current, chapter, index) =>
        chapter.timestamp <= video.currentTime ? index : current,
      0
    );
    setActiveChapter(nextActive);
  };

  const handleTimeUpdate = (): void => updateVideoState(demoVideoRef.current);

  const handleLoadedMetadata = (): void => {
    const video = demoVideoRef.current;
    if (video?.duration) {
      setVideoDuration(video.duration);
      updateVideoState(video);
    }
  };

  const seekToChapter = (timestamp: number, index: number): void => {
    const video = demoVideoRef.current;
    if (video) {
      video.currentTime = timestamp;
      updateVideoState(video);
      video.play().catch(() => {});
    }
    setActiveChapter(index);
  };

  /* ── Derived values (original chapterSegments calc preserved) ── */
  const fallbackDuration = chapters[chapters.length - 1].timestamp + 10;
  const measuredDuration = videoDuration || fallbackDuration;

  return (
    <>
      <style>{`
        /* ─── Section shell — full-width breakout ─── */
        .vd-section {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          min-height: 100vh;
          overflow: hidden;
          background: #0d0d0d;
          border-top: 1px solid #1e1e1e;
          border-bottom: 1px solid #1e1e1e;
          display: flex;
          align-items: stretch;
        }

        /* ─── Tabs column — 22% ─── */
        .vd-tabs {
          flex: 0 0 22%;
          min-width: 22%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 0 40px 48px;
          gap: 4px;
        }

        .vd-tab {
          position: relative;
          background: transparent;
          border: 0;
          text-align: left;
          padding: 20px 24px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 200ms ease;
        }

        /* Golden left accent bar */
        .vd-tab::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #C9A84C;
          border-radius: 0 2px 2px 0;
          opacity: 0;
          transition: opacity 200ms ease;
        }

        .vd-tab.vd-active {
          background: rgba(201, 168, 76, 0.08);
        }
        .vd-tab.vd-active::before {
          opacity: 1;
        }

        .vd-tab-title {
          display: block;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.4);
          transition: color 200ms ease, font-size 200ms ease, font-weight 200ms ease;
          line-height: 1.4;
        }

        .vd-tab.vd-active .vd-tab-title {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
        }

        .vd-tab:not(.vd-active):hover .vd-tab-title {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Description — collapses when inactive */
        .vd-tab-desc {
          display: block;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          margin-top: 0;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 200ms ease, opacity 200ms ease, margin-top 200ms ease;
        }

        .vd-tab.vd-active .vd-tab-desc {
          max-height: 200px;
          opacity: 1;
          margin-top: 8px;
        }

        /* ─── Golden vertical progress bar — 4px ─── */
        .vd-bar-wrap {
          flex: 0 0 4px;
          margin: 0 20px;
          position: relative;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          align-self: stretch;
        }

        /* Fill: driven by videoProgress (0-100) */
        .vd-bar-fill {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          border-radius: 999px;
          background: #C9A84C;
          box-shadow: 0 0 8px #C9A84C, 0 0 20px rgba(201, 168, 76, 0.35);
          overflow: hidden;
          pointer-events: none;
        }

        /* Shimmer sweep top → bottom */
        @keyframes vd-shimmer {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }

        .vd-bar-fill::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.55) 50%,
            transparent 100%
          );
          animation: vd-shimmer 2s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .vd-bar-fill::after { display: none; }
        }

        /* Chapter marker dots on the bar */
        .vd-dot {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          z-index: 2;
          transition: all 200ms ease;
        }

        .vd-dot.vd-dot-active {
          width: 8px;
          height: 8px;
          background: #C9A84C;
          box-shadow: 0 0 6px #C9A84C, 0 0 14px rgba(201, 168, 76, 0.5);
        }

        .vd-dot:not(.vd-dot-active):hover {
          background: rgba(255, 255, 255, 0.5);
          width: 8px;
          height: 8px;
        }

        /* ─── Video column — flex:1 takes all remaining width ─── */
        .vd-video-col {
          flex: 1;
          min-width: 0;
          display: flex;
          align-items: stretch;
        }

        .vd-video-pad {
          flex: 1;
          padding: 24px 24px 24px 0;
          display: flex;
          align-items: stretch;
        }

        .vd-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          display: block;
          pointer-events: none;
        }

        /* Kill all native controls */
        video::-webkit-media-controls { display: none !important; }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .vd-section {
            flex-direction: column;
            min-height: auto;
            width: 100%;
            margin-left: 0;
          }
          .vd-tabs {
            flex: none;
            min-width: 0;
            padding: 32px 24px 0;
          }
          .vd-bar-wrap {
            flex: none;
            align-self: auto;
            height: 4px;
            width: calc(100% - 48px);
            margin: 16px 24px;
          }
          /* Horizontal bar on mobile: fill width instead of height */
          .vd-bar-fill {
            top: 0;
            bottom: 0;
            left: 0;
            right: auto;
            height: 100% !important;
            width: var(--vd-bar-pct, 0%);
          }
          .vd-dot {
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .vd-video-col {
            flex: none;
            height: 300px;
          }
          .vd-video-pad {
            padding: 0 16px 24px;
          }
        }

        @media (max-width: 768px) {
          .vd-tabs {
            padding: 24px 16px 0;
          }
        }
      `}</style>

      <section className="vd-section">

        {/* ── Left: tab list ── */}
        <div className="vd-tabs" role="tablist" aria-label="Karl feature tabs">
          {chapters.map((chapter, i) => (
            <button
              key={chapter.title}
              role="tab"
              aria-selected={activeChapter === i}
              type="button"
              className={`vd-tab${activeChapter === i ? " vd-active" : ""}`}
              onClick={() => seekToChapter(chapter.timestamp, i)}
            >
              <span className="vd-tab-title">{chapter.title}</span>
              <span className="vd-tab-desc">{chapter.description}</span>
            </button>
          ))}
        </div>

        {/* ── Middle: golden vertical progress bar ── */}
        <div className="vd-bar-wrap" aria-hidden="true">
          {/* Fill height driven directly by videoProgress (0-100) */}
          <div
            className="vd-bar-fill"
            style={{ height: `${videoProgress}%` }}
          />

          {/* Per-chapter marker dots at proportional positions */}
          {chapters.map((chapter, i) => (
            <div
              key={chapter.title}
              className={`vd-dot${activeChapter === i ? " vd-dot-active" : ""}`}
              style={{ top: `${(chapter.timestamp / measuredDuration) * 100}%` }}
              onClick={() => seekToChapter(chapter.timestamp, i)}
              role="button"
              tabIndex={0}
              aria-label={`Jump to ${chapter.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  seekToChapter(chapter.timestamp, i);
                }
              }}
            />
          ))}
        </div>

        {/* ── Right: single video with padding wrapper ── */}
        <div className="vd-video-col">
          <div className="vd-video-pad">
            <video
              ref={demoVideoRef}
              id="demo-video"
              className="vd-video"
              autoPlay
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onLoadedMetadata={handleLoadedMetadata}
              onSeeked={handleTimeUpdate}
              onTimeUpdate={handleTimeUpdate}
            >
              <source src="/karl-demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

      </section>
    </>
  );
}
