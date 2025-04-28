import React from "react";
import { useNavigate } from "react-router";

interface IProps {
  title: string;
  author: string;
  image: string;
}

export const MusicCard: React.FC<IProps> = ({
  title,
  author,
  image,
}) => {

  const navigate = useNavigate()
  
  return (
    <div onClick={() => navigate('/music/1')} className="shrink-0 cursor-pointer flex-col w-[160px] h-[220px] flex">
      <div className='w-40 shrink-0 h-40 rounded-2xl overflow-hidden'>
        <img src={image} className=" w-40 h-40 " />
      </div>
      <p className='text-black text-[1.3rem] font-bold'>{title}</p>
      <p className='text-slate-300 -mt-2'>{author}</p>
    </div>
  );
};
