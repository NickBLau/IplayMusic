import {
  IoFingerPrintOutline,
  IoPersonCircleOutline,
  IoKey,
} from "react-icons/io5";
import Heading from "../components/Heading";
// import Button from "../components/ui/Button";
// import { Link } from "react-router-dom";
import FooterMenu from "../components/FooterMenu";
import { useOutletContext } from "react-router-dom";
import React, { Suspense, useState } from "react";

export default function LoginPage() {
  const {Authtoken, setAuthToken} = useOutletContext();
  const PlayConnect = React.lazy(() => import("../Player/PlayConnect"));
  const [showPlayConnect, setShowPlayConnect] = useState(false);
  const handleClick = async () => {
    // Call getToken function
    await getToken();

    setShowPlayConnect(true);
  };

  // Generate a random string
  const generateRandomString = (length) => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(values)
      .map((x) => possible[x % possible.length])
      .join("");
  };

  // Generate a code verifier
  const codeVerifier = generateRandomString(64);

  // SHA-256 function
  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  };

  // Base64 URL encode function
  const base64URLEncode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  // Generate a code challenge
  const generateCodeChallenge = async (verifier) => {
    const hashed = await sha256(verifier);
    return base64URLEncode(hashed);
  };

  // Function to get the token
  const getToken = async (code) => {
    const clientId = "4a84ce2cc21c4b7da807f69c2279cb07";
    const redirectUri = "http://localhost:5173/Login";
    const codeVerifier = localStorage.getItem("code_verifier");
    const url = "https://accounts.spotify.com/api/token";
    const urlParams = new URLSearchParams(window.location.search);
    code = urlParams.get("code");

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        /////////////////// find a way to get code from url //////////////
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();
    console.log(data);

    setAuthToken(data.access_token);
    console.log(Authtoken)
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
  };

  // Main function
  const main = async () => {
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const clientId = "4a84ce2cc21c4b7da807f69c2279cb07";
    const redirectUri = "http://localhost:5173/Login";
    const scope =
      "user-read-private user-read-email user-library-read user-read-playback-state user-modify-playback-state user-read-currently-playing streaming user-read-playback-position ";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    // Store the code verifier in local storage
    window.localStorage.setItem("code_verifier", codeVerifier);

    const params = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  
  return (
    <>
      <header className="dark:bg-primarycolor">
        <Heading
          level="1"
          className="font-bold text-4xl pl-6 inline-block text-black dark:bg-primarycolor dark:text-white pt-10 pb-18"
          title="Log in"
        />
      </header>
      <main className="px-6 pb-7 dark:bg-primarycolor">
        <section>
          <form className="w-full space-y-8 dark:bg-primarycolor dark:text-white">
            <div className="flex flex-col">
              <label htmlFor="username" className="font-bold py-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none">
                  <IoPersonCircleOutline
                    size={32}
                    className=" dark:text-white"
                  />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="border-b-2 dark:bg-primarycolor dark:text-white dark:border-white border-black py-2 px-4 w-full focus:outline-none focus:border-primarycolor"
                />
              </div>
            </div>
            <div className="flex flex-col pb-10">
              <label htmlFor="password" className="font-bold py-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none">
                  <IoKey size={32} />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="border-b-2 dark:bg-primarycolor dark:text-white dark:border-white border-black py-2 px-4 w-full focus:outline-none focus:border-primarycolor"
                />
              </div>
            </div>
          </form>
          {/* get token button */}
          <button
            className="border-black text-black uppercase p-5 my-6 rounded-full border-4 font-bold tracking-wide bg-white block w-full"
            onClick={handleClick}
          >
            {" "}
            LOG IN
          </button>
          {showPlayConnect && (
            <Suspense fallback={<div>Loading...</div>}>
              <PlayConnect />
            </Suspense>
          )}
          {/* get token button end */}
          <div className="flex flex-col items-center mt-8">
            {/* go to spotify login page */}
            <button
              className="p-4 aspect-square rounded-full bg-green-800"
              onClick={main}
            >
              <IoFingerPrintOutline size={32} style={{ color: "white" }} />
            </button>
            <p className="text-center pt-4 text-sm">Spotify Login</p>
            {/* go to spotify login page end */}
          </div>
        </section>
        <FooterMenu />
      </main>
    </>
  );
}
