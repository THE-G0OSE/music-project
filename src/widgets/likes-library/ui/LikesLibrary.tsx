import { IMusic } from "../../../shared/mocks/musicMock";
import { MusicWideCard } from "../../../entities/music/ui/MusicWideCard";
import { useEffect, useState } from "react";
import { userSlice } from "../../../app/store/userSlice";
import { api } from "../../../shared/configs/apiPath";

export const LikesLibrary = () => {
  const { user } = userSlice();
  const [music, setMusic] = useState<IMusic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    let isMounted = true;
    if (user) {
      setLoading(true);
      const fetchMusic = async () => {
        const res = await fetch(api + "users/getLikes/" + user!.username);
        if (!res.ok) {
          alert("something went wrong");
          setMusic([]);
        } else {
          const body = await res.json();
          if (isMounted) {
            setMusic(body.music);
          }
        }
        setLoading(false);
      };
      fetchMusic();
    }
    return () => {
      isMounted = false;
    };
  }, [user]);

  if (music && music.length > 0)
    return (
      <div className="flex flex-col gap-2 mt-2 ml-2">
        {music.map((music, id) => (
          <MusicWideCard key={id} music={music} />
        ))}
        <div className="h-60 md:h-30" />
      </div>
    );
  else
    return (
      <div className="w-full text-green-500 text-[2rem] font-bold ">
        {loading ? "Загрузка..." : "здесь пока ничего нет"}
      </div>
    );
};
