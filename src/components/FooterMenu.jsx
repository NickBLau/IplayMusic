import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoPulse } from "react-icons/io5";
import {
  IoIosMicrophone,
  IoIosContrast,
  IoMdWifi,
  IoIosSettings,
  IoIosLogIn,
  IoMdHome,
} from "react-icons/io";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import GradientIcon from "./icons/GradientIcon";
import { useOutletContext } from "react-router-dom";
import tw from "tailwind-styled-components";

//Li
const ListItems = tw.li`
hover:text-primarycolor
`;

export default function FooterMenu() {
  const { darkmode, setdarkmode } = useOutletContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDarkmode = () => {
    setdarkmode(!darkmode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <div className="relative">
        <footer className="fixed bottom-0 left-0 z-50 w-full p-4 bg-white border-t ease-in duration-300 border-gray-200 shadow dark:bg-additional-color dark:border-additional-color">
          <nav className="flex justify-around items-center">
            <Link to="/artists">
              <GradientIcon
                size={32}
                icon={IoPulse}
                gradientId="red-to-orange-react"
              />
            </Link>
            <Link to="/featured">
              <GradientIcon
                size={32}
                icon={IoIosMicrophone}
                gradientId="red-to-orange-react"
              />
            </Link>
            <Link to="/feed">
              <div className="h-11 w-11 bg-slate-400 flex items-center justify-center bg-gradient-to-r from-orange to-primarycolor rounded-full">
                <IoMdWifi size={32} />
              </div>{" "}
            </Link>
            <button onClick={handleDarkmode}>
              <GradientIcon
                size={32}
                icon={IoIosContrast}
                gradientId="red-to-orange-react"
              />
            </button>
            <button onClick={toggleMenu}>
              <GradientIcon
                size={32}
                icon={IoIosSettings}
                gradientId="red-to-orange-react"
              />
            </button>
          </nav>
        </footer>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed top-0 right-0 w-full h-full opacity-95 z-20 text-2xl bg-white border-l border-gray-200 shadow dark:bg-additional-color dark:border-additional-color p-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <ul className="dark:text-white text-center">
                <div className="flex justify-evenly pb-5 m-auto">
                  <ListItems className="flex items-center ">
                    <IoIosLogIn
                      size={24}
                      color={darkmode ? "white" : "black"}
                    />
                    <Link to="/Login">Login</Link>{" "}
                  </ListItems>
                  <ListItems className="flex items-center">
                    <IoMdHome size={24} color={darkmode ? "white" : "black"} />
                    <Link to="/">Home</Link>
                  </ListItems>
                </div>
                <ListItems>
                  <Link to="/AlbumDetails/5gDhBFSQWB2CfXHc4AvAfb">Details</Link>
                </ListItems>
                <ListItems>
                  <Link to="/Albums">Albums</Link>
                </ListItems>
                <ListItems>
                  <Link to="/Artists">Artists</Link>
                </ListItems>
                <ListItems>
                  <Link to="/Categories">Categories</Link>
                </ListItems>
                <ListItems>
                  <Link to="/Featured">Featured</Link>
                </ListItems>
                <ListItems>
                  <Link to="/Feed">Shows</Link>
                </ListItems>
                <ListItems>
                  <Link to="/Player">Player</Link>
                </ListItems>
                <ListItems>
                  <Link to="/playlist?q=37i9dQZF1DXcBWIGoYBM5M">Playlist</Link>
                </ListItems>
                <ListItems>
                  <Link to="/Songs/3SpAbtsIKZ9omjpDCPUQKJ">Songs</Link>
                </ListItems>
                <ListItems>
                  <Link to="/Trends/alt-rock">Trending</Link>
                </ListItems>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </IconContext.Provider>
  );
}
