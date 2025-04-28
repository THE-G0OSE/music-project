import React from "react";
import { musicMock } from "../../../shared/mocks/musicMock";
import { MusicCard } from "../../../entities/music/ui/MusicCard";

export const MusicList = () => {
  return (
    <div className="h-60 w-[100vw] px-8 min-md:w-[calc(100vw-80px)] overflow-x-scroll">
      <div className='flex items-center gap-5 justify-start'>
        {musicMock.map((music) => (
          <MusicCard
            title={music.title}
            author={music.author}
            image={music.image}
          />
        ))}
      </div>
    </div>
  );
};
