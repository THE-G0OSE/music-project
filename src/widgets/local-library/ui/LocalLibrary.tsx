import { BiPlus } from "react-icons/bi";
import { MusicWideCard } from "../../../entities/music/ui/MusicWideCard";
import { Playlists } from "../../playlists/ui/Playlists";
import { useEffect, useState } from "react";
import { AddModal } from "../../add-modal/ui/AddModal";
import { musicSlice } from "../../../app/store/musicSlice";
import { userSlice } from "../../../app/store/userSlice";

export const LocalLibrary = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [type, setType] = useState<"music" | "playlist">("music");

  const music = musicSlice();
  const user = userSlice((state) => state.user);

  useEffect(() => {
    if (user) {
      music.fetchMusic(user.username);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex w-full justify-between pr-5 items-center">
        <p className="text-[1.6rem] font-bold ml-8 mb-4">Альбомы</p>
        <button
          onClick={() => {
            setIsAddModalOpen(true);
            setType("playlist");
          }}
          className="text-[1.5rem] cursor-pointer text-white bg-green-500 rounded-full  -mt-2"
        >
          <BiPlus />
        </button>
      </div>
      <Playlists />
      <div className="flex w-full justify-between pr-5 items-center">
        <p className="font-bold text-[1.6rem] ml-8 mt-3 mb-4">
          Загруженные треки
        </p>
        <button
          onClick={() => {
            setIsAddModalOpen(true);
            setType("music");
          }}
          className="text-[1.5rem] cursor-pointer text-white bg-green-500 rounded-full  -mt-2"
        >
          <BiPlus />
        </button>
      </div>
      <div className="flex flex-col gap-2 ml-8">
        {music.localMusic ? music.localMusic.map((music) => (
          <MusicWideCard music={music} />
        )) : <p className='text-[1.7rem] font-bold text-green-500'>Пока не загруженно ни одного трека</p>}
      </div>
      {isAddModalOpen && <AddModal setIsOpen={setIsAddModalOpen} type={type} />}
      <div className="h-46 md:h-30" />
    </div>
  );
};
