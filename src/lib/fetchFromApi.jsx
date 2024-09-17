import getAccessToken from "./getAccessToken";

export default async function fetchFromApi(url) {
  const tokenData = await getAccessToken();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    console.error("Failed to obtain the access token");
    throw new Error("Failed to obtain the access token");
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If the response indicates that the token has expired, refresh the token and retry the request
  if (response.status === 401) {
    return fetchFromApi(url);
  }

  if (!response.ok) {
    console.error("Request failed with status:", response.status);
    throw new Error("Request failed");
  }

  return response.json();
}
