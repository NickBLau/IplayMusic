import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import fetchFromApi from "../lib/fetchFromApi";
const Container = tw.section`
  flex
  flex-row
  gap-x-5
  overflow-x-scroll
  overflow-y-hidden
  mb-5
  whitespace-nowrap
`;

const CatWrapper = tw.button`
  bg-primarycolor
  rounded-full
  p-4
  h-12
  text-white
  text-center
  flex
  items-center
  gap-x-2
  whitespace-nowrap
`;

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchDataFromSpotify() {
      try {
        const data = await fetchFromApi(
          `https://api.spotify.com/v1/recommendations/available-genre-seeds`
        );
        if (data) {
          setGenres(data.genres || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }

    fetchDataFromSpotify();
  }, []);

  return (
    <Container>
      {loading ? (
        <p className="px-6">Loading genres...</p>
      ) : (
        genres.map((genre, index) => (
          <Link to={`/trends/${genre}`} key={index}>
            <CatWrapper key={index}>#{genre}</CatWrapper>
          </Link>
        ))
      )}
    </Container>
  );
};

export default Genres;
