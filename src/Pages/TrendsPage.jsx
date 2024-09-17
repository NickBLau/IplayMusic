import Heading from "../components/Heading";
import Header from "../components/Header";
import FooterMenu from "../components/FooterMenu";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import fetchFromApi from "../lib/fetchFromApi";
import { IoMdWifi } from "react-icons/io";
import ImageSliderDefault from "../components/ImageSliderDefault";
import { Link } from "react-router-dom";
import Attraction from "../components/attraction";

const TrendsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const { genre } = useParams();

  useEffect(() => {
    async function fetchDataFromSpotify() {
      try {
        const data = await fetchFromApi(
          `https://api.spotify.com/v1/recommendations?seed_genres=${genre}`
        );

        if (data && data.tracks) {
          // Extract album information from tracks
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

  useEffect(() => {
    async function fetchDataFromSpotify() {
      try {
        const data = await fetchFromApi(
          `https://api.spotify.com/v1/browse/featured-playlists?country=GB&limit=10&offset=5`
        );
        if (data) {
          setPlaylists(data.playlists.items);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchDataFromSpotify();
  }, [genre]);

  return (
    <div className="dark:text-white max-w-[375px] m-auto dark:bg-primarycolor">
      {/* <p>{genre}</p>
      {tracks.length > 0 && <p>{tracks[0].id}</p>} */}
      <Header
        className=""
        buttonClass=""
        showBackButton={true}
        showSearchButton={true}
        isDarkMode={true}
        showPageName={false}
        customTitle="Trends"
        textColor="dark:text-white"
      />

      <main className="px-6 pb-20">
        <Heading
          level="1"
          className="font-bold text-transparent dark:text-white text-5xl bg-clip-text inline-block bg-gradient-to-r from-orange to-primarycolor py-12"
          title="Latest Trends"
        />

        <section className="flex flex-col gap-6 h-96">
          {playlists.length > 0 && (
            <div className="w-full h-full drop-shadow-[0_15px_1.2px_rgba(0,0,0,0.5)] rounded-md bg-slate-700 relative">
              <div className="absolute right-6 -top-4 h-11 w-11 bg-slate-400 flex items-center justify-center bg-gradient-to-r from-orange to-primarycolor rounded-full">
                <IoMdWifi size={32} color="white" />
              </div>
              <Link
                to={`/playlist?q=${playlists[0]?.id}&desc=${playlists[0]?.description}`}
              >
                <img
                  src={playlists[0]?.images[0]?.url}
                  alt="jul"
                  className="object-cover h-full w-full block rounded-lg"
                  width={240}
                />
                <header className="absolute bottom-10 left-3">
                  <h2 className="text-4xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white pb-2">
                    {playlists[0]?.name}
                  </h2>
                  <Attraction></Attraction>
                </header>
              </Link>
            </div>
          )}
        </section>
        <section className="bg-primarycolor py-5 -mt-10 -ml-6 -mr-6 rounded-l-lg dark:bg-white">
          <div className="flex py-20">
            {tracks.length > 0 ? (
              <ImageSliderDefault slides={tracks} />
            ) : (
              <div className="dark:text-black pl-8">
                "{genre}" is not a valid genre
              </div>
            )}
          </div>
        </section>
        <section className="flex flex-col gap-6 -mt-10 h-96">
          {playlists.length > 1 && (
            <div className="w-full h-full  rounded-md bg-slate-700 relative">
              <div className="absolute right-6 -top-4 h-11 w-11 bg-slate-400 flex items-center justify-center bg-gradient-to-r from-orange to-primarycolor rounded-full">
                <IoMdWifi size={32} color="white" />
              </div>
              <Link
                to={`/playlist?q=${playlists[1]?.id}&desc=${playlists[1]?.description}`}
              >
                <img
                  src={playlists[1]?.images[0]?.url}
                  alt="jul"
                  className="object-cover h-full w-full block rounded-lg"
                  width={240}
                />
                <header className="absolute bottom-10 left-3">
                  <h2 className="text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pb-2">
                    {playlists[1]?.name}
                  </h2>
                  <Attraction></Attraction>
                </header>
              </Link>
            </div>
          )}
        </section>
      </main>
      <FooterMenu />
    </div>
  );
};

export default TrendsPage;
