import React from "react";

interface IProps {
  author: string;
  content: string;
  time: Date;
}

export const Comment: React.FC<IProps> = ({ author, content, time }) => {
  return (
    <div className='w-full rounded-2xl py-2 px-4  bg-slate-100 flex flex-col'>
      <p>{content}</p>
      <div className='flex text-slate-400 justify-between w-full'>
        <p>{author}</p>
        <p>{time.toLocaleDateString()}</p>
      </div>
    </div>
  );
};
