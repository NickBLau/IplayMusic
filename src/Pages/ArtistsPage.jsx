import Heading from "../components/Heading";
import Header from "../components/Header";
import FooterMenu from "../components/FooterMenu";
import ArtistsOfTheMonth from "../components/ArtistsOfTheMonth";
import ViewAll from "../components/ViewAll";
import ArtistCard from "../components/ArtistCard";
import TopArtistsByCountry from "../components/TopArtistsByCountry";
import { Link } from "react-router-dom";

const ArtistsPage = () => {
  return (
    <div className="dark:text-white ease-in duration-300 dark:bg-secondary-color">
      <Header
        className=""
        buttonClass=""
        showBackButton={true}
        showSearchButton={true}
        isDarkMode={false}
        showPageName={true}
        textColor=""
      />
      <Heading className="pl-4" title="All Artists" />
      <Link to="/Songs/3SpAbtsIKZ9omjpDCPUQKJ">
        <ViewAll text="Artists of the Month" showButton={true} />
      </Link>
      <ArtistsOfTheMonth />
      <Link to="/Albums">
        <ViewAll text="Featured Artists" showButton={true} />
      </Link>
      <ArtistCard />
      <ViewAll text="Top Artists By Country" showButton={false} />

      <TopArtistsByCountry country="US" />
      <FooterMenu />
    </div>
  );
};

export default ArtistsPage;
