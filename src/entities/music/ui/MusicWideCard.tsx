import React from 'react'
import { BiPlayCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { currentMusicSlice } from '../../../app/store/currentMusicSlice';
import { IMusic } from '../../../shared/mocks/musicMock';

interface IProps {
  music: IMusic
}

export const MusicWideCard:React.FC<IProps> = ({music}) => {
  const {cover_image, title, author, ID} = music

  const currentMusic = currentMusicSlice()
  const navigate = useNavigate()

  const playMusicHandler = (e) => {
    e.stopPropagation()
    currentMusic.setMusic(music) 
  }

  return (
    <div onClick={() => navigate('/music/' + ID)} className='flex gap-2 w-full cursor-pointer h-30'>
        <div className='w-30 h-30 shrink-0 rounded-xl overflow-hidden'><img className='size-full object-cover' src={"http://localhost:3200/" + cover_image}/></div>
        <div className='h-full w-full flex flex-col justify-evenly'>
            <p className='font-bold text-[1.5rem]'>{title}</p>
            <p className='text-slate-400 text-[1.2rem]'>{`${author}`}</p>
        </div>
        <button onClick={playMusicHandler} className='h-full w-30 flex justify-center items-center text-[3rem] text-green-500'><BiPlayCircle/></button>
    </div>
  )
}
