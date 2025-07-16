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
        return "http://thegoose-test.ru:3200/media/getNew";
      case "recomended":
        return "http://thegoose-test.ru:3200/media/getRec/" + (user ? user.username : '');
      case "popular":
        return "http://thegoose-test.ru:3200/media/getPop";
    }
  };

  const [music, setMusic] = useState<IMusic[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchMusic = async () => {
      try {
        const res = await fetch(requrl(), {referrerPolicy: "no-referrer"});
        const body = await res.json();

        if (isMounted && res.ok) {
          setMusic(body.music);
        }
      } catch (err) {
        if (isMounted) {
          alert(err);
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
