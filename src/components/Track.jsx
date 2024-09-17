import { useState } from "react";

const Track = (props) => {
  const [isPlaying, setIsplaying] = useState(false);

  function handleChange() {
    setIsplaying(!isPlaying);
  }

  return isPlaying ? (
    // //////////////////////////// try grid //////////////////////////////7
    <div className="flex items-center  mb-4 justify-between bg-gradient-to-r from-orange to-primarycolor text-white rounded-md">
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 bg-contain bg-no-repeat bg-center flex justify-center items-center rounded-md"
          style={{ backgroundImage: `url(${props.image})` }}
        >
          <button
            className="bg-gradient-to-r  from-orange to-primarycolor rounded-full w-9 h-9 text-white"
            onClick={handleChange}
          >
            ||
          </button>
        </div>

        <span>
          <h2 className="font-bold">
            {props.title.length > 15
              ? props.title.split(" ").slice(0, 3).join(" ") + "..."
              : props.title}
          </h2>
          <div className="flex gap-4 text-sm">
            {/* {song.artists.map((artist) => {
              return <p key={artist.id}>{artist.name.length > 1
                ? artist.name.split(" ").slice(0, 3).join(" ") +
                  "..."
                : artist.name}</p>;
            })} */}
            {props.artist}
          </div>
        </span>
      </div>
      <p className="pr-3">{props.playtime}</p>
    </div>
  ) : (
    <section className="flex  items-center pb-4 justify-between">
      <div className="flex gap-4">
        <button
          className="bg-gradient-to-r from-orange to-primarycolor rounded-full w-9 h-9 text-white"
          onClick={handleChange}
        >
          ▶
        </button>
        <span>
          <h2 className="font-bold">
            {props.title.length > 15
              ? props.title.split(" ").slice(0, 3).join(" ") + "..."
              : props.title}
          </h2>
          <div className="flex gap-4 text-sm">
            {/* {song.artists.map((artist) => {
              return <p key={artist.id}>{artist.name.length > 1
                ? artist.name.split(" ").slice(0, 3).join(" ") +
                  "..."
                : artist.name}</p>;
            })} */}
            {props.artist}
          </div>
        </span>
      </div>
      <p className="w-10 ml-1  text-left mt-2 flex justify-start">
        {props.playtime}{" "}
      </p>
    </section>
  );
};

export default Track;
