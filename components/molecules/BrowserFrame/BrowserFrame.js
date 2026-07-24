"use client";

import { useEffect, useRef } from "react";
import styles from "./BrowserFrame.module.css";

function FakePage({ initial }) {
  return (
    <div className={styles.fake} aria-hidden="true">
      <div className={styles.fakeNav}>
        <span className={styles.fakeLogo} />
        <span className={styles.fakeLinks}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.fakeCta} />
      </div>

      <div className={styles.fakeHero}>
        <span className={styles.fakeInitial}>{initial}</span>
        <span className={styles.fakeTitle} />
        <span className={styles.fakeTitleShort} />
        <span className={styles.fakeButton} />
      </div>

      <div className={styles.fakeRow}>
        <span />
        <span />
        <span />
      </div>

      <div className={styles.fakeSplit}>
        <div className={styles.fakeMedia} />
        <div className={styles.fakeText}>
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className={styles.fakeBand} />

      <div className={styles.fakeRow}>
        <span />
        <span />
      </div>

      <div className={styles.fakeFooter}>
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

export default function BrowserFrame({ url, shot, video, initial, active }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (active) {
      node.currentTime = 0;
      const played = node.play();
      if (played && typeof played.catch === "function") played.catch(() => {});
    } else {
      node.pause();
    }
  }, [active]);

  return (
    <div className={`${styles.browser} ${active ? styles.on : ""}`}>
      <div className={styles.chrome}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>{url}</span>
      </div>

      <div className={styles.viewport}>
        {video ? (
          <video
            ref={ref}
            className={styles.video}
            src={video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
        ) : (
          <div className={styles.scroller}>
            {shot ? (
              <img className={styles.shot} src={shot} alt="" />
            ) : (
              <FakePage initial={initial} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
