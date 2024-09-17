import React, { useState, useEffect } from "react";
import axios from "axios";
import fetchFromApi from "../lib/fetchFromApi";
import { Link } from "react-router-dom";

const ArtistsOfTheMonth = () => {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchDataFromSpotify() {
      try {
        const data = await fetchFromApi(
          `https://api.spotify.com/v1/browse/new-releases`
        );
        if (data) {
          setArtists(data.albums.items);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    }

    fetchDataFromSpotify();
  }, []);
  console.log(artists);
  return (
    <div className="flex overflow-x-auto">
      {loading ? (
        <p className="px-6">Loading artists of the month...</p>
      ) : (
        artists.map((artist) => (
          <div
            key={artist.id}
            className="relative w-64 h-48 overflow-hidden m-4 shadow-lg rounded-lg flex-shrink-0 "
            style={{ minWidth: "20rem" }}
          >
            <img
              src={artist.images[0].url}
              alt={`${artist.name} background`}
              className="w-full h-full object-cover"
            />

            <Link to={`/Songs/${artist.id}`} key={artist.id}>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black opacity-75">
                <p className="text-white pt-16 pl-36">Song of the Month</p>
                <h3 className="text-primarycolor text-lg font-bold pl-20">
                  {artist.name}
                </h3>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};
export default ArtistsOfTheMonth;
