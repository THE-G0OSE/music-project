import { BiPlus } from "react-icons/bi";
import { MusicWideCard } from "../../../entities/music/ui/MusicWideCard";
import { musicMock } from "../../../shared/mocks/musicMock";
import { Playlists } from "../../playlists/ui/Playlists";
import { useState } from "react";
import { AddModal } from "../../add-modal/ui/AddModal";

export const LocalLibrary = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [type, setType] = useState<"music" | "playlist">("music");

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
        {musicMock.map((music) => (
          <MusicWideCard {...music} />
        ))}
      </div>
      {isAddModalOpen && <AddModal setIsOpen={setIsAddModalOpen} type={type} />}
      <div className='h-46 md:h-30' />
    </div>
  );
};
