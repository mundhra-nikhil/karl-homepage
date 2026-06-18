"use client";
import { useRef, useState } from "react";
import React from "react";

interface Chapter {
  timestamp: number;
  title: string;
  description: string;
}

interface ChapterSegment extends Chapter {
  duration: number;
  segmentProgress: number;
}

/** Chapter markers for the demo video */
const chapters: Chapter[] = [
  { timestamp: 0,  title: "Connect to data source", description: "0:00 - 0:10" },
  { timestamp: 10, title: "Knowledge graphs",        description: "0:10 - 0:20" },
  { timestamp: 20, title: "Telemetry insights",      description: "0:20 - 0:28" },
  { timestamp: 28, title: "Prompting to Karl",       description: "0:28 - end"  },
];

/**
 * VideoDemo — demo video player with a chapter sidebar.
 * Owns all video state internally; no props required.
 */
export default function VideoDemo() {
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoTime, setVideoTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const demoVideoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const updateVideoState = (video: HTMLVideoElement | null): void => {
    if (!video?.duration) return;

    const progress = Math.max(0, Math.min(1, video.currentTime / video.duration));
    setVideoTime(video.currentTime);
    setVideoProgress(progress * 100);

    const nextActive = chapters.reduce<number>((current, chapter, index) =>
      chapter.timestamp <= video.currentTime ? index : current, 0);
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

  const seekToProgress = (event: React.MouseEvent<HTMLDivElement>): void => {
    const video = demoVideoRef.current;
    const progress = progressRef.current;
    if (!video?.duration || !progress) return;
    const rect = progress.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    video.currentTime = Math.max(0, Math.min(1, percent)) * video.duration;
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

  // Derive chapter segments with per-segment progress for the timeline UI
  const fallbackDuration = chapters[chapters.length - 1].timestamp + 10;
  const measuredDuration = videoDuration || fallbackDuration;
  const chapterSegments: ChapterSegment[] = chapters.map((chapter, index) => {
    const nextTimestamp = chapters[index + 1]?.timestamp ?? measuredDuration;
    const duration = Math.max(nextTimestamp - chapter.timestamp, 1);
    const elapsed = Math.max(0, Math.min(duration, videoTime - chapter.timestamp));
    return {
      ...chapter,
      duration,
      segmentProgress:
        index < chapters.length - 1 ? (elapsed / duration) * 100 : 0,
    };
  });

  return (
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

        <div
          className="video-progress"
          ref={progressRef}
          onClick={seekToProgress}
        >
          <div
            className="progress-bar"
            style={{ width: `${videoProgress}%` }}
          />
        </div>
      </div>

      <div className="chapters-sidebar">
        {chapterSegments.map((chapter, index) => (
          <button
            key={chapter.title}
            className={`chapter-item${activeChapter === index ? " active" : ""}`}
            type="button"
            style={
              {
                "--chapter-duration": chapter.duration,
                "--chapter-segment-progress": `${chapter.segmentProgress}%`,
              } as React.CSSProperties
            }
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
  );
}
