import { useParams } from "react-router";
import { musicMock } from "../../../shared/mocks/musicMock";
import { CommentsList } from "../../../widgets/commentsList/ui/CommentsList";
import { useRef } from "react";

export const MusicPage = () => {
  const { musicId } = useParams();
  console.log(musicId);

  const music = musicMock[0]

  const commentRef = useRef<HTMLTextAreaElement>(null)

  const submitHandler = () => {
    const commentValue = commentRef.current!.value
    const comment = {
        content: commentValue,
        author: 'me',
        time: new Date(),
    }
    console.log(comment)
    commentRef.current!.value = ''
  }

  return (
    <div className='flex overflow-scroll h-[calc(100vh+500px)] md:h-[calc(100vh+440px)] flex-col w-full px-8 md:px-0 md:pr-8 items-center'>
        <div className='size-60 rounded-2xl shrink-0 overflow-hidden'>
            <img className='size-full object-cover' src={music.image} />
        </div>
        <p className='text-[1.6rem] mt-3 font-bold'>{music.title}</p>
        <p className='text-[1.4rem] text-slate-400'>{music.author}</p>
        <div className='h-screen md:pl-8 overflow-scroll'>
            <CommentsList/>
            <textarea ref={commentRef} placeholder="Напишите свой комментарий" className='w-[calc(100%-64px)] md:w-[calc(100%-32px)] md:ml-0 outline-none py-2 px-4 rounded-2xl mt-9 ml-8 min-h-30 bg-slate-100' />
            <button onClick={submitHandler} className="w-[calc(100%-64px)] md:w-[calc(100%-32px)] mt-4 md:ml-0 ml-8 text-white rounded-full h-10 bg-green-500">Написать</button>
        </div>
    </div>
  );
};
