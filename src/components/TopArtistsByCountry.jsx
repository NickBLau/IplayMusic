import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import fetchFromApi from "../lib/fetchFromApi";

const TopArtistsByCountry = ({ country }) => {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [topPlaylists, setTopPlaylists] = useState([]);

  useEffect(() => {
    async function fetchDataFromSpotify() {
      try {
        const data = await fetchFromApi(
          `https://api.spotify.com/v1/browse/categories/toplists/playlists?country=${country}`
        );
        if (data) {
          setTopPlaylists(data.playlists.items);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching top playlists:", error);
      }
    }

    fetchDataFromSpotify();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 pb-28">
      {loading ? (
        <p className="px-6">Loading top artist by country...</p>
      ) : (
        topPlaylists.map((playlist) => (
          <div
            key={playlist.id}
            className="relative w-40 h-40 overflow-hidden m-0 shadow-lg rounded-lg dark:shadow-gray-700 shadow-slate-700"
          >
            <Link to={`/playlist?q=${playlist.id}&desc=${playlist.name}`}>
              <img
                src={playlist.images[0].url}
                alt={`${playlist.name} background`}
                className="w-full h-full object-cover rounded-lg"
              />
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default TopArtistsByCountry;
