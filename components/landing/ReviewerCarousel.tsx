import Image from "next/image";

/**
 * Only one reviewer photo was exported from Figma — add more paths here once
 * real reviewer photos are available.
 */
const reviewerSources = ["/images/review-avatar.png"];

/**
 * The two-track marquee below only loops seamlessly if EACH track's rendered
 * width is at least as wide as its container — otherwise, for part of the
 * animation neither track covers the visible area (a gap with nothing
 * showing), followed by a jarring snap back into view when the loop
 * restarts. This carousel lives inside the hero's text column (max 660px),
 * not the full page, so a track only needs to clear that — 800px leaves a
 * safety margin. Repeat the source photos enough times to guarantee it.
 */
const AVATAR_SIZE = 48;
const AVATAR_GAP = 24; // matches --marquee-gap at the lg breakpoint (1.5rem)
const MIN_TRACK_WIDTH = 800;
const repeatCount = Math.max(
  reviewerSources.length,
  Math.ceil((MIN_TRACK_WIDTH + AVATAR_GAP) / (AVATAR_SIZE + AVATAR_GAP)),
);
const reviewerPhotos = Array.from(
  { length: repeatCount },
  (_, i) => reviewerSources[i % reviewerSources.length],
);

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <div className="marquee-track" aria-hidden={hidden}>
      {reviewerPhotos.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt=""
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-full object-cover"
        />
      ))}
    </div>
  );
}

export default function ReviewerCarousel() {
  return (
    <div className="marquee" aria-hidden="true">
      <Group />
      <Group hidden />
    </div>
  );
}
