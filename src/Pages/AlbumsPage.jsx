import { useState, useEffect } from "react";
import FooterMenu from "../components/FooterMenu";
import Header from "../components/Header";
import { Link, useOutletContext } from "react-router-dom";
import fetchFromApi from "../lib/fetchFromApi";
const AlbumPage = () => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState();
  const [FeatAlbums, setFeatAlbums] = useState();

  //////////////////// context /////
  useEffect(() => {
    async function fetchDataFromSpotify() {
      try {
        const data = await fetchFromApi(
          "https://api.spotify.com/v1/browse/new-releases?offset=19"
        );
        if (data) {
          setSongs(data.albums.items);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchDataFromSpotify();
  }, []);

  ///////////////////// get Featured Albums /////////////////////

  useEffect(() => {
    async function fetchDataFromSpotify() {
      try {
        const data = await fetchFromApi(
          "https://api.spotify.com/v1/browse/new-releases"
        );
        if (data) {
          setFeatAlbums(data.albums.items);
          console.log(data.albums.items);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchDataFromSpotify();
  }, []);

  return (
    <div className="dark:text-white ease-in duration-300 dark:bg-secondary-color">
      <Header
        className=""
        buttonClass=""
        showBackButton={true}
        showSearchButton={true}
        isDarkMode={true}
        showPageName={true}
        textColor=""
      />
      <main>
        <h1 className=" bg-gradient-to-r ease-in duration-300 from-orange to-primarycolor text-transparent bg-clip-text text-5xl pl-5 py-7">
          All Albums
        </h1>
        <div className="flex justify-between px-5 pb-4 text-white dark:text-black">
          <p className="text-black  dark:text-white font-bold text-lg">
            Featured Albums
          </p>
          <Link to="/Featured">
            <a href="#" className="no-underline text-primarycolor">
              View more
            </a>
          </Link>
        </div>
        <section className="gap-5 flex overflow-x-auto px-5 pb-8 ">
          {FeatAlbums &&
            FeatAlbums.map((album) => (
              <Link to={`/albumDetails/${album.id}`} key={album.id}>
                <div className="flex gap-5 mr-8 ">
                  <img
                    src={album.images[0].url}
                    className="rounded-lg h-32 min-w-fit mr-24 "
                  />
                </div>
              </Link>
            ))}
        </section>
        <div className="flex dark:bg-secondary-color justify-between px-5 pb-4 text-white dark:text-black">
          <p className="text-black mb-5  dark:text-white font-bold text-lg">
            New Releases
          </p>
          <Link to="/AlbumDetails/5gDhBFSQWB2CfXHc4AvAfb">
            <a href="#" className="no-underline text-primarycolor">
              View more
            </a>
          </Link>
        </div>
        <section className="mb-16 flex flex-col dark:bg-red-500">
          {songs &&
            songs.map((single) => (
              <Link
                className="dark:bg-secondary-color"
                to={`/albumDetails/${single.id}`}
                key={single.id}
              >
                <article className="flex px-6 justify-between items-center mb-6 text-black dark:text-white dark:bg-secondary-color">
                  <div className="flex gap-3 dark:bg-secondary-color">
                    <img
                      src={single.images[0].url}
                      className="h-14 flex m-auto items-center rounded-lg"
                    />
                    <span>
                      <h3 className="font-poppins w-40 font-bold text-secondary-color  dark:text-white">
                        {single.name.length > 15
                          ? single.name.slice(0, 15) + "..."
                          : single.name}
                      </h3>
                      <p>
                        {single.artists[0]?.name.length > 15
                          ? single.artists[0]?.name.slice(0, 15) + "..."
                          : single.artists[0]?.name}
                      </p>
                    </span>
                  </div>
                  <p className="m-0 ">
                    {single.total_tracks === 1
                      ? single.total_tracks + " song"
                      : single.total_tracks + " songs"}
                  </p>
                </article>
              </Link>
            ))}
        </section>{" "}
      </main>
      <FooterMenu />{" "}
    </div>
  );
};

export default AlbumPage;
