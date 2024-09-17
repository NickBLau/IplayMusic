import { useEffect} from "react";
import { useOutletContext } from "react-router-dom";

const PlayConnect = () => {
  const {Authtoken, setAuthToken} = useOutletContext()
  const {SPPlayer,setSPPlayer} = useOutletContext()
  
  useEffect(() => {
        console.log(Authtoken)
        const token = Authtoken;
        const player = new Spotify.Player({
          name: "IPlayMusic",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });

        // Add your event listeners here...
        // Ready
        player.addListener("ready", ({ device_id }) => {
          fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              device_ids: [`${device_id}`],
            }),
          });
        });
        
        setSPPlayer(player)
        player.connect();
     
  }, []);

  return (
    <>
    </>
  );
};

export default PlayConnect;
