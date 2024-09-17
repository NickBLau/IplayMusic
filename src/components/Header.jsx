import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import Heading from "./Heading";
export default function Header({
  className,
  buttonClass,
  showBackButton = true,
  showSearchButton = true,
  isDarkMode = false,
  showPageName = true,
  customTitle,
  textColor,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.substring(1);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const headerClasses = `${className} uppercase tracking-wider ${textColor} flex justify-between items-center py-4 px-4 ${
    isDarkMode ? "dark:bg-secondary-color" : ""
  }`;

  const handleSearchButtonClick = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    // Navigate to the desired page with the search input as a parameter
    navigate(`/trends/${searchInput}`);
  };

  const handleNavigateButtonClick = () => {
    // Navigate to the desired page with the search input as a parameter
    navigate(`/trends/${searchInput}`);
  };

  return (
    <div>
      <header className="flex justify-between py-6 px-6 tracking-widest">
        {showBackButton && (
          <button onClick={() => navigate(-1)} className={buttonClass}>
            <IoIosArrowBack size={24} />
          </button>
        )}
        <div
          style={{
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showPageName ? (
            <Heading level="2" className={className} title={pathname} />
          ) : (
            <div className={className}>{customTitle}</div>
          )}
        </div>
        {showSearchButton && (
          <button onClick={handleSearchButtonClick} className={buttonClass}>
            <IoIosSearch size={24} />
          </button>
        )}
      </header>

      <form onSubmit={handleSearchFormSubmit} className="flex justify-center">
        <div className="relative flex m-auto">
          <input
            placeholder="Search in genres..."
            className={`bg-gray-100 dark:bg-gray-400 border-2 text-black ml-8 pl-3 p-0 rounded-l-xl align-middle border-gray-600 w-72 ${
              isSearchVisible ? "" : "hidden"
            }`}
            type="search"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button
            type="submit"
            className={`bg-light-blue dark:bg-dark-blue mr-6 text-white w-7 h-7 text-sm rounded-r-xl ${
              isSearchVisible ? "" : "hidden"
            }`}
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
}
