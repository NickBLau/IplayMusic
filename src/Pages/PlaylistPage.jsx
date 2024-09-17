import Heading from "../components/Heading";
import Header from "../components/Header";
import FooterMenu from "../components/FooterMenu";
import { useState, useEffect } from "react";
import fetchFromApi from "../lib/fetchFromApi";
import { Link, useOutletContext } from "react-router-dom";
import { IoIosPlay } from "react-icons/io";
import Button from "../components/ui/Button";
import ImageSlider from "../components/ImageSlider";

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const {Authtoken, setAuthtoken} = useOutletContext()
  let params = new URLSearchParams(document.location.search);
  let playlistUrl = params.get("q");
  let playlistDescription = params.get("desc");

  console.log("PLAYPAGE", playlists);

  useEffect(() => {
    async function fetchDataFromSpotify() {
      try {
        const data = await fetchFromApi(
          `https://api.spotify.com/v1/playlists/${playlistUrl}/tracks`
        );
        if (data) {
          setPlaylists(data.items);
          setLoading(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchDataFromSpotify();
  }, []);


 
  
  function PlaySelectedTrack (uri) {
    fetch("https://api.spotify.com/v1/me/player/play", {
      method : "PUT",
      headers : {
        Authorization : `Bearer ${Authtoken}`,
        "Content-type" : "application/json",
      },
      body : JSON.stringify({
        "uris" : [`${uri}`],
      })
    })
    .then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
  }

  return (
    <>
      <section className="pb-20 bg-wave bg-cover ease-in duration-300 dark:bg-secondary-color dark:text-white min-h-96">
        <Header
          className="px-6 "
          buttonClass=""
          showBackButton={true}
          showSearchButton={true}
          isDarkMode={false}
          showPageName={true}
          textColor=""
        />

        <div className="pt-10">
          <ImageSlider slides={playlists} />
        </div>
      </section>
      <main className="px-6 pb-24 pb-20bg ease-in duration-300 dark:bg-secondary-color dark:text-white">
        <Heading
          level="2"
          className="font-bold text-center pb-10 text-xl"
          title={playlistDescription}
        />
        <section className="flex flex-col gap-6">
          {loading ? (
            <p>Loading playlist...</p>
          ) : (
            playlists?.map((playlist, index) => (
              <div
                key={index}
                className="flex gap-6 justify-between items-center"
              >
                <button onClick={() => PlaySelectedTrack(playlist.track?.uri)}>
                  <div className="h-11 w-11 bg-slate-400 flex items-center justify-center bg-gradient-to-r from-orange to-primarycolor rounded-full">
                    <IoIosPlay size={24} color="white" />
                  </div>
                </button>
                <div className="flex-grow">
                  <h3 className="font-extrabold capitalize pb-1">
                    {playlist.track?.name}
                  </h3>
                  <div className="flex gap-4 flex-wrap max-w-20">
                    {playlist.track?.artists
                      ?.slice(0, 3)
                      .map((artist, index) => (
                        <p className="text-sm font-light" key={index}>
                          {artist.name}
                        </p>
                      ))}
                  </div>
                </div>
                {/* <p className="text-xs dark:text-white text-gray-600">
          {durationConverter(playlist.track.duration_ms).minutes}:
          {durationConverter(playlist.track.duration_ms).seconds}
        </p> */}
                <p className="w-6 text-right flex justify-end">
                  {millisToMinutesAndSeconds(playlist.track?.duration_ms, "s")}
                </p>
              </div>
            ))
          )}
        </section>

        <Button
          title="LISTEN ALL"
          color="border-primarycolor text-primarycolor"
        />
      </main>
      <FooterMenu />
    </>
  );
};

export default PlaylistPage;
