import React, { useEffect, useState } from "react";
import { IMusic } from "../../../shared/mocks/musicMock";
import { MusicCard } from "../../../entities/music/ui/MusicCard";
import { userSlice } from "../../../app/store/userSlice";

interface IProps {
  type: "new" | "recomended" | "popular";
}

export const MusicList: React.FC<IProps> = ({ type }) => {
  const user = userSlice((state) => state.user)
  const requrl = () => {
    switch (type) {
      case "new":
        return "http://localhost:3200/media/getNew";
      case "recomended":
        return "http://localhost:3200/media/getRec/" + (user ? user.username : '');
      case "popular":
        return "http://localhost:3200/media/getPop";
    }
  };

  const [music, setMusic] = useState<IMusic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchMusic = async () => {
      try {
        setLoading(true);
        const res = await fetch(requrl());
        const body = await res.json();

        if (isMounted && res.ok) {
          setMusic(body.music);
        }
      } catch (err) {
        if (isMounted) {
          alert(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchMusic();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="h-60 w-[100vw] px-8 min-md:w-[calc(100vw-80px)] overflow-x-scroll">
      <div className="flex items-center gap-5 justify-start">
        {music.length > 0 ? (
          music.map((music) => <MusicCard music={music} />)
        ) : (
          <div className="w-full flex justify-center items-center">
            <p className='text-[1.7rem] text-green-500 font-bold'>Здесь ничего нет</p>
          </div>
        )}
      </div>
    </div>
  );
};
