import React from "react";
import tw from "tailwind-styled-components";
import Feedcard from "../components/Feedcard";
import Genres from "../components/Feedcategories";
import Heading from "../components/Heading";
import Header from "../components/Header";
import FooterMenu from "../components/FooterMenu";

const Container = tw.section`
  bg-white
  h-full
  px-6 pb-8
`;

const FeedPage = () => {
  const showIds = [
    "38bS44xjbVVZ3No3ByF1dJ",
    "5CfCWKI5pZ28U0uOzXkDHe",
    "5as3aKmN2k11yfDDDSrvaZ",
    "6bCzqGowQUOY1LIksbiEtx",
    "6jVJDe2StbJEaCRRX6spdb",
    "7w1hbPEp7r2plvbYN4qOfW",
    "5ezqxZg20Y3ozagIvdN4UN",
    "6CHoZXtMyvijoiwZy0xhJP",
    "5xu0HTJGBlxYA0dyAIaVLz",
    "5vyHDqLM0Mk4g84EckpR4t",
    "6Vty4ceV9phhMxwCvT6Gqa",
    "6QeZj61rPeOWctSkgBImAZ",
    "5tSJa3FdJHywwCe5yghrqk",
  ];

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
      <main className="">
        <Container className="dark:bg-secondary-color ease-in duration-300">
          <Heading title="Events feed" />
          <Genres />
          <section className="VerticalMovieListContainer">
            <Feedcard showIds={showIds} />
          </section>
          <FooterMenu />
        </Container>
      </main>
    </div>
  );
};

export default FeedPage;
