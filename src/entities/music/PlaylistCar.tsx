import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IMusic } from "../../shared/mocks/musicMock";
import { api } from "../../shared/configs/apiPath";

interface IProps {
  playlist: {
    title: string;
    ID: number;
    author: string;
    music: IMusic[];
  }
}

export const PlaylistCard: React.FC<IProps> = ({
  playlist
}) => {
  const {title, author, music, ID} = playlist

  const [firstMusic, setMusic] = useState<IMusic>()

  useEffect(() => {
    const fetchMusic = async () => {
        const res = await fetch(api + 'media/get/' + music[0], {referrerPolicy: 'no-referrer'})
        const body = await res.json()
        if (!res.ok){
            alert(body.error)
        } else {
            setMusic(body.music)
        }
    }
    fetchMusic()
  }, [music])

  const navigate = useNavigate()
  
  return (
    <div onClick={() => navigate('/playlist/' + ID)} className="shrink-0 cursor-pointer flex-col w-[160px] h-[220px] flex">
      <div className='w-40 shrink-0 h-40 rounded-2xl overflow-hidden'>
        {firstMusic && <img src={api + firstMusic.cover_image} className=" object-cover w-40 h-40 " />}
      </div>
      <p className='text-black text-[1.3rem] font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-40'>{title}</p>
      <p className='text-slate-300 -mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap'>{author}</p>
    </div>
  );
};