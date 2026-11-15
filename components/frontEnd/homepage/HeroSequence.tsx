"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type SyntheticEvent } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { progress, traceStructure } from "./build-geometry";

type Connection = EventTarget & { saveData?: boolean };
type Playback = "idle" | "playing" | "paused" | "finished";
type Plate = "site" | "frame" | "landmark";

const DURATION = 8600;
const ASSETS = "/images/home";

function Picture({ plate, className = "", priority, onLoad, onError }: {
  plate: Plate;
  className?: string;
  priority?: boolean;
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  onError?: () => void;
}) {
  return (
    <picture className={`home-build-plate ${className}`}>
      <source media="(max-width: 959px)" srcSet={`${ASSETS}/draw-${plate}-mobile.webp`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${ASSETS}/draw-${plate}.webp`}
        alt=""
        width={1536}
        height={1024}
        fetchPriority={priority ? "high" : "low"}
        onLoad={onLoad}
        onError={onError}
      />
    </picture>
  );
}

function SurveyLines({ id, mobile = false }: { id: string; mobile?: boolean }) {
  return (
    <svg className={`home-survey-art ${mobile ? "home-survey-mobile" : "home-survey-wide"}`}
      viewBox={mobile ? "540 180 980 820" : "0 0 1536 1024"} preserveAspectRatio="none" fill="none">
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path data-structure-path="concrete"
            transform={mobile ? "scale(.001020408 .001219512) translate(-540 -180)" : "scale(.000651042 .000976563)"} />
        </clipPath>
      </defs>
      <g className="home-survey-footprint">
        <path pathLength="1" d="M 1504,839 H 480 L 561,761 L 613,822 H 1504" />
        <path pathLength="1" d="M 480,839 L 972,923 L 1504,839" opacity=".45" />
      </g>
      <path className="home-survey-members" data-structure-path="brass" />
      <path className="home-survey-tips" data-structure-path="tips" />
      <g className="home-survey-details">
        <path pathLength="1" d="M 787,808 V 598 H 1014 V 808" />
        <path pathLength="1" d="M 812,519 V 352 H 1004 V 519" />
        <path pathLength="1" d="M 1114,808 V 594 H 1415 V 808" />
      </g>
    </svg>
  );
}

export default function HeroSequence() {
  const id = useId();
  const stage = useRef<HTMLDivElement>(null);
  const structurePaths = useRef<NodeListOf<SVGPathElement>>();
  const position = useRef(0);
  const [playback, setPlayback] = useState<Playback>("idle");
  const [requested, setRequested] = useState(false);
  const [siteReady, setSiteReady] = useState(false);
  const [frameReady, setFrameReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [eligible, setEligible] = useState(false);
  const [failed, setFailed] = useState(false);
  const ready = siteReady && frameReady && !failed;

  function paint(time: number) {
    const style = stage.current?.style;
    if (!style) return;
    const material = progress(time, 4730, 6680);
    const still = progress(time, 6550, 7550);
    const structure = traceStructure(time);
    structurePaths.current?.forEach((path) => {
      const part = path.dataset.structurePath as keyof typeof structure;
      path.setAttribute("d", structure[part]);
    });
    style.setProperty("--draw-footprint", String(1 - progress(time, 320, 1780)));
    style.setProperty("--draw-plot-opacity", String(1 - progress(time, 1850, 2710)));
    style.setProperty("--draw-detail", String(1 - progress(time, 4440, 5340)));
    style.setProperty("--draw-ink", String(progress(time, 280, 550) * (1 - progress(time, 5650, 6990))));
    style.setProperty("--draw-shell", String(progress(time, 4260, 5120)));
    style.setProperty("--draw-material", `${100 - material * 100}%`);
    style.setProperty("--draw-finish", String(progress(time, 4420, 5480)));
    style.setProperty("--draw-scene", String(progress(time, 0, 220) * (1 - still)));
    style.setProperty("--draw-push", String(1 + .024 * progress(time, 0, DURATION)));
    style.setProperty("--draw-breeze", String(progress(time, 6540, 7260) * (1 - progress(time, 8170, DURATION))));
  }

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const syncPreference = () => {
      const animated = !motion.matches && !connection?.saveData;
      setEligible(animated);
      if (animated) setRequested(true);
      else {
        position.current = 0;
        paint(0);
        setPlayback("idle");
        setRequested(false);
        setSiteReady(false);
        setFrameReady(false);
      }
    };
    let onScreen = true;
    const syncVisibility = () => setVisible(onScreen && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      syncVisibility();
    }, { threshold: .08 });
    observer.observe(element);
    document.addEventListener("visibilitychange", syncVisibility);
    motion.addEventListener("change", syncPreference);
    connection?.addEventListener("change", syncPreference);
    syncPreference();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      motion.removeEventListener("change", syncPreference);
      connection?.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    if (!ready || !eligible) return;
    structurePaths.current = stage.current?.querySelectorAll<SVGPathElement>("[data-structure-path]");
    const playFromStart = () => {
      position.current = 0;
      paint(0);
      setPlayback("playing");
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) playFromStart();
    };
    playFromStart();
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [eligible, ready]);

  useEffect(() => {
    if (playback !== "playing" || !visible) return;
    let previous = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(DURATION, position.current + Math.max(0, now - previous));
      previous = now;
      position.current = next;
      paint(next);
      if (next >= DURATION) setPlayback("finished");
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playback, visible]);

  function togglePlayback() {
    if (playback === "playing") {
      setPlayback("paused");
      return;
    }
    if (playback === "finished") {
      position.current = 0;
      paint(0);
    }
    setPlayback("playing");
  }

  function decode(event: SyntheticEvent<HTMLImageElement>, done: (ready: boolean) => void) {
    void event.currentTarget.decode().then(() => done(true)).catch(() => setFailed(true));
  }

  const active = playback === "playing" || playback === "paused";
  const label = playback === "playing" ? "Pause building sequence" :
    playback === "paused" ? "Resume building sequence" : "Replay building sequence";
  const Icon = playback === "playing" ? Pause : playback === "paused" ? Play : RotateCcw;

  return (
    <>
      <div className="home-build-stage" ref={stage} data-playback={playback} aria-hidden="true"
        style={{ "--draw-clip-wide": `url("#${id}-wide")`, "--draw-clip-mobile": `url("#${id}-mobile")` } as CSSProperties}>
        <div className="home-build-canvas">
          <Picture plate="landmark" priority />
          {requested && !failed && (
            <>
              <div className="home-build-shot" data-active={active}>
                <Picture plate="site" onLoad={(event) => decode(event, setSiteReady)} onError={() => setFailed(true)} />
                <Picture plate="frame" className="home-build-frame" onLoad={(event) => decode(event, setFrameReady)} onError={() => setFailed(true)} />
                <Picture plate="frame" className="home-build-shell" />
                <Picture plate="landmark" className="home-build-material" />
                <SurveyLines id={`${id}-wide`} />
                <SurveyLines id={`${id}-mobile`} mobile />
              </div>
              <Picture plate="landmark" className="home-build-breeze" />
            </>
          )}
        </div>
      </div>

      {eligible && ready && playback !== "idle" && (
        <div className="home-film-ui">
          <button type="button" className="home-film-toggle" onClick={togglePlayback} aria-label={label}>
            <Icon size={17} aria-hidden="true" />
            <span aria-hidden="true">{playback === "playing" ? "Pause" : playback === "paused" ? "Resume" : "Replay film"}</span>
          </button>
        </div>
      )}
    </>
  );
}
