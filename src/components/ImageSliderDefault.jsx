import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import fetchFromApi from "../lib/fetchFromApi";
import musiclogo from "../assets/musiclogo.png";

export default function ImageSliderDefault({ slides }) {
  const [tracks, setTracks] = useState([]);
  const { genre } = useParams();
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: false,
  });

  useEffect(() => {
    async function fetchDataFromSpotify() {
      try {
        const data = await fetchFromApi(
          `https://api.spotify.com/v1/recommendations?seed_genres=${genre}`
        );

        if (data && data.tracks) {
          const albumData = data.tracks.map((track) => track.album);
          setTracks(albumData);
        } else {
          console.error("No tracks data found in the response:", data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchDataFromSpotify();
  }, [genre]);

  return (
    <div className="embla">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex w-[375px] items-center">
          <div className=" text-white flex flex-col justify-center dark:text-primarycolor pl-5">
            <h3 className="w-32 text-xl font-bold ">
              {" "}
              Trending now in {genre}
            </h3>
          </div>
          {tracks.map((track, index) => (
            <div
              key={index}
              className="embla__slide  flex-[0_0_30%] min-w-0 mx-1 aspect-square"
            >
              <Link
                className="dark:bg-secondary-color"
                to={`/albumDetails/${track.id}`}
                key={track.id}
              >
                {track.images && track.images[0] ? (
                  <img
                    src={track.images[0].url}
                    alt={`Slide ${index}`}
                    className=" h-auto rounded-lg"
                  />
                ) : (
                  // Provide a fallback if images are not available
                  <div
                    style={{ backgroundImage: `url(${musiclogo})` }}
                    className="bg-contain bg-no-repeat bg-center flex bg-black flex-col justify-center text-center w-28 h-28 rounded-lg"
                  >
                    <p className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      Image not avaliable
                    </p>
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
