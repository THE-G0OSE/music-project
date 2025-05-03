import React, { useEffect, useState } from "react";
import { IMusic } from "../../../shared/mocks/musicMock";
import { useNavigate, useParams } from "react-router";
import { MusicWideCard } from "../../../entities/music/ui/MusicWideCard";
import { FaTrashCan } from "react-icons/fa6";

export const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState([]);
  const [music, setMusic] = useState<IMusic[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlaylist = async () => {
      const res = await fetch("http://localhost:3200/playlists/getOne/" + id);
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
      const res = await fetch("http://localhost:3200/playlists/music/" + id);
      const body = await res.json();
      if (!res.ok) {
        alert(body.error);
      } else {
        setMusic(body.music);
      }
    };
    fetchMusic();
  }, [playlist]);

  const deleteHandler = async () => {
    const res = await fetch('http://localhost:3200/playlists/' + playlist.ID + "/" + playlist.username, {method: "DELETE"})
    const body = await res.json()
    if (!res.ok) {
        alert(body.error)
    }
    navigate('/library')
  }

  return (
    playlist &&
    music.length > 0 && (
      <div className="flex flex-col w-full gap-4 items-center">
        <div className="flex justify-around w-full">
          <div className="size-80 overflow-hidden rounded-2xl ">
            <img
              className="size-full object-cover"
              src={
                "http://localhost:3200/" + music[music.length - 1].cover_image
              }
            />
          </div>
          <button onClick={deleteHandler} className='text-[6rem] text-red-500'>
            <FaTrashCan />
          </button>
        </div>
        <p className="text-[1.5rem] text-slate-400 font-bold">
          {playlist.title}
        </p>
        <p className="text-[1.5rem] text-slate-400 font-bold">
          {playlist.author}
        </p>
        {music.map((music) => (
          <MusicWideCard key={music.ID} music={music} />
        ))}
      </div>
    )
  );
};
