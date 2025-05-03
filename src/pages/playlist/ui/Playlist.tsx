import { useEffect, useState } from "react";
import { IMusic } from "../../../shared/mocks/musicMock";
import { useNavigate, useParams } from "react-router";
import { MusicWideCard } from "../../../entities/music/ui/MusicWideCard";
import { FaTrashCan } from "react-icons/fa6";
import { api } from "../../../shared/configs/apiPath";

interface IPlaylist {
  title: string;
  author: string;
  username: string;
  music: number[];
  ID: number;
}

export const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<IPlaylist>();
  const [music, setMusic] = useState<IMusic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      const res = await fetch(api + "playlists/getOne/" + id);
      const body = await res.json();
      if (!res.ok) {
        alert(body.error);
      } else {
        setPlaylist(body.playlist);
      }
    };
    fetchPlaylist();
  }, [id]);

  useEffect(() => {
    const fetchMusic = async () => {
      const res = await fetch(api + "playlists/music/" + id);
      const body = await res.json();
      if (!res.ok) {
        alert(body.error);
      } else {
        setMusic(body.music);
      }
    };
    fetchMusic();
  }, [playlist, id]);

  const deleteHandler = async () => {
    const res = await fetch(
      api + "playlists/" + playlist!.ID + "/" + playlist!.username,
      { method: "DELETE" }
    );
    const body = await res.json();
    if (!res.ok) {
      alert(body.error);
    }
    navigate("/library");
  };

  return (
    playlist &&
    music.length > 0 && (
      <div className="flex flex-col w-full gap-4 items-center">
        <div className="flex justify-around w-full">
          <div className="size-80 overflow-hidden rounded-2xl ">
            <img
              className="size-full object-cover"
              src={api + music[music.length - 1].cover_image}
            />
          </div>
          <button onClick={deleteHandler} className="text-[6rem] text-red-500">
            <FaTrashCan />
          </button>
        </div>
        <p className="text-[1.5rem] text-slate-400 font-bold">
          {playlist.title}
        </p>
        <p className="text-[1.5rem] text-slate-400 font-bold">
          {playlist.author}
        </p>
        <div className='flex flex-col gap-5 items-center  w-full'>
          {music.map((music) => (
            <MusicWideCard key={music.ID} music={music} />
          ))}
        </div>
        <div className="w-full h-[140px]  shrink-0"></div>
      </div>
    )
  );
};
