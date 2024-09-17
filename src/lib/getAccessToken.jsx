const SPOTIFY_CLIENT_ID = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET;

let accessTokenData = null;

export default async function getAccessToken() {
  // If we already have a token and it's not expired, return it
  if (accessTokenData && accessTokenData.expires_at > Date.now()) {
    return accessTokenData;
  }

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      )}`,
    },
    body: "grant_type=client_credentials",
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    console.error("Failed to obtain the access token");
    return null;
  }

  // Calculate the expiration time in milliseconds
  tokenData.expires_at = Date.now() + tokenData.expires_in * 1000;

  // Store the token data
  accessTokenData = tokenData;

  return tokenData;
}
