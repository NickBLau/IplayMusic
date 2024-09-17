import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Error from "../assets/ErrorAnimation.json";
import tw from "tailwind-styled-components";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Container = tw.section`
  flex
  flex-col
  items-center
  justify-center
  text-center
`;

const Errorview = () => {
  const buttonVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  const shootStars = () => {};
  return (
    <div className="dark:text-white ease-in duration-300 dark:bg-secondary-color">
      <Header
        className=""
        buttonClass=""
        showBackButton={true}
        showSearchButton={false}
        isDarkMode={false}
        showPageName={false}
        textColor=""
      />

      <Container>
        <h1 className="text-3xl">Seems like there's no music here!</h1>
        <Lottie animationData={Error} />
        <Link to="/Login">
          <motion.button
            onClick={shootStars}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial="initial"
            animate="animate"
            variants={buttonVariants}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Take me home
          </motion.button>
        </Link>
        <p>...Country Roads</p>
      </Container>
    </div>
  );
};

export default Errorview;
