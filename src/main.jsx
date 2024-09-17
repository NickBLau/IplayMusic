import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Welcome from "./Pages/WelcomePage.jsx";
import Login from "./Pages/LoginPage.jsx";
import Walkthrough from "./Pages/WalkthroughPage.jsx";
import Player from "./Pages/PlayerPage.jsx";
import Feed from "./Pages/FeedPage";
import Trends from "./Pages/TrendsPage";
import Playlist from "./Pages/PlaylistPage";
import Featured from "./Pages/FeaturedPage";
import Categories from "./Pages/CategoriesPage";
import Songs from "./Pages/SongsPage";
import Artists from "./Pages/ArtistsPage";
import Albums from "./Pages/AlbumsPage";
import AlbumDetails from "./Pages/AlbumDetailsPage";
import Errorview from "./Pages/Errorview.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Errorview />}>
      <Route index element={<Welcome />} />
      <Route path="/Login/" element={<Login />} />
      <Route path="/Walkthrough/" element={<Walkthrough />} />
      <Route path="/Player/" element={<Player />} />
      <Route path="/Feed/" element={<Feed />} />
      <Route path="/Trends/:genre" element={<Trends />} />
      <Route path="/Playlist/" element={<Playlist />} />
      <Route path="/Featured/" element={<Featured />} />
      <Route path="/Categories/" element={<Categories />} />
      <Route path="/Songs/:id" element={<Songs />} />
      <Route path="/Artists/" element={<Artists />} />
      <Route path="/Albums/" element={<Albums />} />
      <Route path="/AlbumDetails/:id" element={<AlbumDetails />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
