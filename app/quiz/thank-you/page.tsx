"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ThankYouPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.removeItem("mr-magico-quiz-answers");
      sessionStorage.removeItem("mr-magico-quiz-event-id");
    } catch {
      // sessionStorage unavailable — nothing to clean up
    }
  }, []);

  // Browsers block autoplay-with-sound, so the video always starts muted.
  // This lets someone opt in to audio with a tap.
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 pb-16 pt-4 text-center">
      <h1 className="text-[28px] font-black uppercase leading-tight text-[#00157a]">
        Thank you, we&rsquo;ll reach out in a few minutes!
      </h1>
      <div className="relative w-full max-w-[420px]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/thank-you-poster.jpg"
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          onCanPlay={() => setVideoReady(true)}
          className="aspect-[9/16] w-full rounded-xl object-cover"
        >
          <source src="/videos/thank-you.mp4" type="video/mp4" />
        </video>
        {/* Shows over the poster image until the video can actually play —
            covers slow connections so it doesn't look frozen/broken. */}
        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/20">
            <span className="size-8 animate-spin rounded-full border-[3px] border-white/40 border-t-white" />
          </div>
        )}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={paused ? "Play video" : "Pause video"}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
        >
          {paused ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
              <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
            </svg>
          )}
        </button>
        {muted && (
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-ping rounded-full bg-[#3653e3] px-5 py-2.5 opacity-75" />
        )}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#3653e3] px-5 py-2.5 text-[14px] font-black uppercase text-white shadow-lg"
        >
          {muted ? (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
              </svg>
              Tap for sound
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
              Sound on
            </>
          )}
        </button>
      </div>
      <Link
        href="/"
        className="mt-4 rounded-lg bg-[#3653e3] px-6 py-3 text-[16px] font-black uppercase text-white"
      >
        Back to home
      </Link>
    </div>
  );
}
