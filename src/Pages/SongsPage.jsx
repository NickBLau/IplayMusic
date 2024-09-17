import Header from "../components/Header";
import FooterMenu from "../components/FooterMenu";
import Heading from "../components/Heading";
import { useEffect, useState } from "react";
import fetchFromApi from "../lib/fetchFromApi";
import { useOutletContext, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Track from "../components/Track";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";

const SongsPage = () => {
  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(true);
  const {Authtoken} = useOutletContext()
  const { id } = useParams();

  useEffect(() => {
    async function fetchDataFromSpotify() {
      try {
        const data = await fetchFromApi(
          `https://api.spotify.com/v1/albums/${id}`
        );
        console.log("API Response:", data);
        if (data) {
          setAlbum(data);
          setLoading(false);
          console.log("Album:", album);
        }
      } catch (error) {
        console.error("Error fetching data from Spotify:", error);
      }
    }

    fetchDataFromSpotify();
  }, [id]);

  function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

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
      <div className="dark:bg-secondary-color ease-in duration-300 bg-white ">
        <header className="flex justify-between py-6 tracking-widest px-6">
          <Link to="/artists">
            <button className="text-black ease-in duration-300 dark:text-white">
              <IoIosArrowBack className="text-white text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" />
            </button>
          </Link>
          <h2 className="text-black ease-in duration-300 dark:text-white">
            songs
          </h2>
          <button className="dark:text-white ease-in duration-300 text-black text-2xl">
            <IoIosSearch />
          </button>
        </header>
        <Heading level="1" title="All Songs" className="pt-0 pb-5 px-5" />
      </div>
      <main className="dark:bg-secondary-color bg-white ">
        <section className="px-5 overflow-y-auto flex flex-col max-h-fit pb-96 text-black dark:text-white">
          {loading ? (
            <p className="px-6">Loading songs...</p>
          ) : (
            album.tracks &&
            album.tracks.items.map((song) => (
              <button key={song.id} onClick={()=> PlaySelectedTrack(song.uri)}>
              <Track
                title={song.name}
                artist={song.artists[0].name}
                image={
                  album.images && album.images.length > 0
                    ? album.images[0].url
                    : ""
                }
                playtime={millisToMinutesAndSeconds(song.duration_ms)}
                key={song.id}
              />
              </button>
            ))
          )}
        </section>
      </main>
      <FooterMenu />
    </>
  );
};

export default SongsPage;
