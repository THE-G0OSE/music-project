import { useEffect, useState } from "react";
import { PlaylistCard } from "../../../entities/music/PlaylistCar";
import { userSlice } from "../../../app/store/userSlice";
import { api } from "../../../shared/configs/apiPath";

export const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const { user } = userSlice();

  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await fetch(api + "playlists/" + user!.username);
      const body = await res.json();
      if (!res.ok) {
        alert(body.error);
      } else {
        setPlaylists(body.playlists);
      }
    };
    fetchPlaylists();
  }, [user]);

  return (
    <div className="h-60 w-[100vw] px-8 min-md:w-[calc(100vw-80px)] overflow-x-scroll">
      <div className="flex items-center gap-5 justify-start">
        {playlists &&
          playlists.map((playlist) => <PlaylistCard playlist={playlist} />)}
      </div>
    </div>
  );
};
