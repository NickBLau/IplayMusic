import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { flushSync } from "react-dom";
import { Link } from "react-router-dom";

const TWEEN_FACTOR = 10;

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);

export default function ImageSlider({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const [tweenValues, setTweenValues] = useState([]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR);
      return numberWithinRange(tweenValue, 0, 1);
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll();
    emblaApi.on("scroll", () => {
      flushSync(() => onScroll());
    });
    emblaApi.on("reInit", onScroll);
  }, [emblaApi, onScroll]);

  return (
    <div className="embla">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex h-45">
          {slides.map((playlist, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_50%] min-w-0 mx-5 aspect-square w-45"
            >
              <div
                className="h-full relative"
                style={{
                  ...(tweenValues.length && {
                    transform: `scale(${tweenValues[index]})`,
                  }),
                }}
              >
                <Link
                  to={`/songs/${playlist.track?.album.id}`}
                  key={playlist.track?.album.id}
                >
                  <img
                    src={playlist.track?.album.images[1].url}
                    alt={`Slide ${index}`}
                    className="object-cover w-full block h-45 rounded-lg"
                    width={240}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
