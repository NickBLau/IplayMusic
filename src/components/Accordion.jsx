import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowForward, IoIosMore } from "react-icons/io";

import fetchFromApi from "../lib/fetchFromApi";

const Accordion = ({ heading, category, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  const fetchSubcategories = async (category) => {
    console.log("Category id", category);

    try {
      const data = await fetchFromApi(
        `https://api.spotify.com/v1/browse/categories/${category}/playlists?country=US`
      );

      if (data) {
        console.log("SUBCATEGORIES", data.playlists.items);
        setSubCategories(data.playlists.items);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSubcategories(category);
    }
  }, [isOpen, category]);

  return (
    <motion.div>
      <AnimatePresence>
        <motion.div
          key="heading"
          className={className}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <motion.div className="font-bold ml-1 text-white flex justify-between items-center">
            <h2 className="block">{heading}</h2>
            <IoIosMore size={32} />
          </motion.div>
        </motion.div>

        {isOpen && (
          <motion.div
            key="children"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{ opacity: 0 }}
            className="pl-7 pr-6 pt-4 flex flex-col gap-2"
          >
            {subCategories?.map(
              (item) =>
                item &&
                item.name && (
                  <Link
                    to={`/playlist?q=${item.id}&desc=${item.name}`}
                    key={item.id}
                  >
                    <div className="flex w-full justify-between py-3">
                      {item.name}
                      <IoIosArrowForward size={22} />
                    </div>
                  </Link>
                )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Accordion;
