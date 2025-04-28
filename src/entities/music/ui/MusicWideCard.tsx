import React from 'react'
import { useNavigate } from 'react-router';

interface IProps {
    title: string;
    image: string;
    length: string;
    author: string;
}

export const MusicWideCard:React.FC<IProps> = ({title, image, author, length}) => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate('/music/1')} className='flex gap-2 w-full cursor-pointer h-30'>
        <div className='w-30 h-30 shrink-0'><img className='size-full object-cover' src={image}/></div>
        <div className='h-full w-full flex flex-col justify-evenly'>
            <p className='font-bold text-[1.5rem]'>{title}</p>
            <p className='text-slate-400 text-[1.2rem]'>{`${author}   ${length}`}</p>
        </div>
        <div className='h-full w-30 flex justify-center items-center'></div>
    </div>
  )
}
