import { useState, useEffect } from "react";

import Accordion from "../components/Accordion";
import Heading from "../components/Heading";
import Header from "../components/Header";
import FooterMenu from "../components/FooterMenu";
import fetchFromApi from "../lib/fetchFromApi";

const colors = [
  "bg-gradient-color1",
  "bg-custom-red",
  "bg-gradient-color2",
  "bg-orange",
  "bg-custom-yellow",
  "bg-dark-green",
  "bg-custom-green",
  "bg-turquoise",
  "bg-light-blue",
  "bg-dark-blue",
  "bg-additional-color",
  "bg-primarycolor",
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDataFromSpotify() {
      try {
        const data = await fetchFromApi(
          "https://api.spotify.com/v1/browse/categories?offset=0&limit=11"
        );
        if (data) {
          setCategories(data.categories.items);
          setLoading(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchDataFromSpotify();
  }, []);

  return (
    <>
      <div className="dark:bg-secondary-color ease-in duration-300 dark:text-white">
        <Header
          className=""
          buttonClass=""
          showBackButton={true}
          showSearchButton={true}
          isDarkMode={true}
          showPageName={true}
          textColor="dark:text-white"
        />
      </div>
      <main className="px-6 pb-20 ease-in duration-300 dark:bg-secondary-color dark:text-white">
        <Heading
          level="1"
          className="font-bold dark:bg-secondary-color text-transparent text-5xl bg-clip-text inline-block bg-gradient-to-r from-orange to-primarycolor py-12"
          title="Categories"
        />
        <section className="flex flex-col gap-6">
          {loading ? (
            <p className="px-6">Loading Categories...</p>
          ) : (
            categories.map((category, index) => (
              <Accordion
                key={index}
                className={`relative z-20 rounded-md px-6 py-4 cursor-pointer ${
                  colors[index % colors.length]
                }`}
                heading={category.name}
                category={category.id}
              />
            ))
          )}
        </section>
      </main>
      <FooterMenu />
    </>
  );
};

export default CategoriesPage;
