import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Feedgroup from "../components/Feedgroup";

const Container = tw.section`
  mb-5
`;

const CardWrapper = tw.section`
  w-full
  h-auto
  rounded-3xl
  flex
  flex-col
  mb-5
  bg-additional-color
`;

const FavContainer = tw.div`
  flex
  mb-2 mt-5
  text-primarycolor
`;

const Feedcard = ({ showIds }) => {
  const [token, setToken] = useState();
  const [showDataList, setShowDataList] = useState([]);

  useEffect(() => {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID,
      client_secret: import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET,
    });

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    })
      .then((res) => res.json())
      .then((data) => setToken(data.access_token));
  }, []);

  useEffect(() => {
    const fetchShowData = async () => {
      if (token) {
        // Use showIds directly
        if (showIds.length > 0) {
          const promises = showIds.map((showId) =>
            fetch(`https://api.spotify.com/v1/shows/${showId}`, {
              method: "GET",
              headers: {
                "content-type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`,
              },
            }).then((res) => res.json())
          );

          const results = await Promise.all(promises);
          setShowDataList(results);
        }
      }
    };

    fetchShowData();
  }, [token, showIds]);

  return (
    <Container className="">
      {showDataList.map((showData, index) => {
        const imageUrl =
          showData.images && showData.images.length > 0
            ? showData.images[0]?.url
            : "";

        return (
          <CardWrapper key={index}>
            <img
              src={imageUrl}
              alt="Card Image"
              className="rounded-t-3xl h-auto w-full"
            />
            <section className="ml-5">
              <FavContainer>
                <p>#Spotify</p>,<p>#Music</p>,<p>#Grammy2020</p>
              </FavContainer>
              <p className="uppercase text-white text-2xl">{showData.type}</p>
              <Feedgroup />
              <div className="font-bold text-white text-2xl mb-5">
                <p>{showData.name}</p>
              </div>
            </section>
          </CardWrapper>
        );
      })}
    </Container>
  );
};

export default Feedcard;
