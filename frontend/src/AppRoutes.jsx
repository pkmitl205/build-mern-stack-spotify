import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { isLoggedIn } from "./store/thunks/user";
import Nav from "./pages/Nav/Nav";
import Player from "./pages/Player/Player";
import App from "./pages/App/App";
import Home from "./pages/App/Home/Home";
import Artist from "./pages/App/Artist/Artist";
import Playlist from "./pages/App/Playlist/Playlist";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Profile from "./pages/App/Profile/Profile";
import Search from "./pages/App/Search/Search";
import LikedSongs from "./pages/App/Playlist/LikedSongs";
import Reset from "./pages/Auth/Reset";
import Forgot from "./pages/Auth/Forgot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./pages/Admin/Admin";
import Loading from "./components/Loading";
import LandingPage from "./pages/LandingPage/LandingPage";
import NotFound from "./pages/NotFound/NotFound";

const ProtectedRoutes = () => (
  <>
    <main className="main">
      <Nav />
      <App>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/likedSongs" element={<LikedSongs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/home" />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </App>
      <Player />
    </main>
  </>
);

const AuthRoutes = () => (
  <Routes>
    {/* <Route path="/" element={<Home />} /> */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgotPassword" element={<Forgot />} />
    <Route path="/resetPassword/:id" element={<Reset />} />
    <Route path="*" element={<Navigate to="/login" />} />
    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);

const AppRoutes = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  // Check if the authentication status is being loaded
  const isLoading = user.auth === undefined;

  if (isLoading) {
    return <Loading main={true} fullHeight={true} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={user.auth ? <ProtectedRoutes /> : <AuthRoutes />}
        />
      </Routes>
      <ToastContainer
        theme="dark"
        closeOnClick
        style={{
          opacity: 0.8,
        }}
      />
    </BrowserRouter>
  );
};

export default AppRoutes;
