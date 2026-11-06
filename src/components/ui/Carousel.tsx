"use client";

/**
 * Horizontal scroll carousel split into composable parts, because the design places the
 * arrows in different spots per section (under the heading in "Популярные категории",
 * next to the heading in "Отзывы"):
 *
 *   <Carousel>
 *     ...anything... <CarouselControls labels={...} />
 *     <CarouselTrack itemClassName="basis-1/4">{items}</CarouselTrack>
 *   </Carousel>
 *
 * Built on native scrolling + scroll-snap: works with touch, trackpad and keyboard without
 * JS; the arrows are progressive enhancement.
 */
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

import { cn } from "@/lib/cn";

import { ICON_STROKE } from "./Icon";
import { IconButton } from "./IconButton";

interface CarouselContextValue {
  trackRef: RefObject<HTMLUListElement | null>;
  canPrev: boolean;
  canNext: boolean;
  scrollByItem: (direction: -1 | 1) => void;
  updateEdges: () => void;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel(): CarouselContextValue {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel parts must be rendered inside <Carousel>");
  return context;
}

/** 1px tolerance: scroll positions are fractional on high-DPI screens. */
const EDGE_TOLERANCE = 1;

export function Carousel({ className, children }: { className?: string; children: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > EDGE_TOLERANCE);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - EDGE_TOLERANCE);
  }, []);

  const scrollByItem = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    const firstItem = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstItem) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (firstItem.offsetWidth + gap), behavior: "smooth" });
  }, []);

  // Recompute arrow state when the track resizes (viewport change, images loading).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateEdges]);

  return (
    <CarouselContext.Provider value={{ trackRef, canPrev, canNext, scrollByItem, updateEdges }}>
      <div className={className}>{children}</div>
    </CarouselContext.Provider>
  );
}

interface CarouselTrackProps {
  /** Width of each item, e.g. `basis-[70%] md:basis-[calc((100%-48px)/4)]`. */
  itemClassName: string;
  /** Accessible name of the list. */
  label: string;
  className?: string;
  children: ReactNode;
}

export function CarouselTrack({ itemClassName, label, className, children }: CarouselTrackProps) {
  const { trackRef, updateEdges } = useCarousel();
  return (
    <ul
      ref={trackRef}
      aria-label={label}
      onScroll={updateEdges}
      className={cn(
        "m-0 scrollbar-none flex snap-x snap-mandatory list-none gap-4 overflow-x-auto p-0",
        className,
      )}
    >
      {Children.map(children, (child) => (
        <li className={cn("shrink-0 snap-start", itemClassName)}>{child}</li>
      ))}
    </ul>
  );
}

interface CarouselControlsProps {
  labels: { prev: string; next: string };
  className?: string;
}

export function CarouselControls({ labels, className }: CarouselControlsProps) {
  const { canPrev, canNext, scrollByItem } = useCarousel();
  return (
    <div className={cn("flex gap-2", className)}>
      <IconButton aria-label={labels.prev} disabled={!canPrev} onClick={() => scrollByItem(-1)}>
        <ArrowLeft size={18} strokeWidth={ICON_STROKE} aria-hidden="true" />
      </IconButton>
      <IconButton
        aria-label={labels.next}
        variant="solid"
        disabled={!canNext}
        onClick={() => scrollByItem(1)}
      >
        <ArrowRight size={18} strokeWidth={ICON_STROKE} aria-hidden="true" />
      </IconButton>
    </div>
  );
}
