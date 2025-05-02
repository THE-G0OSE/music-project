import React from "react";
import { useNavigate } from "react-router";
import { IMusic } from "../../../shared/mocks/musicMock";

interface IProps {
  music: IMusic
}

export const MusicCard: React.FC<IProps> = ({
  music
}) => {
  const {title, author, cover_image, ID} = music

  const navigate = useNavigate()
  
  return (
    <div onClick={() => navigate('/music/' + ID)} className="shrink-0 cursor-pointer flex-col w-[160px] h-[220px] flex">
      <div className='w-40 shrink-0 h-40 rounded-2xl overflow-hidden'>
        <img src={"http://localhost:3200/" + cover_image} className=" object-cover w-40 h-40 " />
      </div>
      <p className='text-black text-[1.3rem] font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-40'>{title}</p>
      <p className='text-slate-300 -mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap'>{author}</p>
    </div>
  );
};
