import React from "react";
import { comment } from "../../../widgets/commentsList/ui/CommentsList";

interface IProps {
  comment: comment
}

export const Comment: React.FC<IProps> = ({comment}) => {
  const {content, username, CreatedAt} = comment
  return (
    <div className='w-full rounded-2xl py-2 px-4  bg-slate-100 flex flex-col'>
      <p>{content}</p>
      <div className='flex text-slate-400 justify-between w-full'>
        <p>{username}</p>
        <p>{CreatedAt.toLocaleString().slice(0, 10)}</p>
      </div>
    </div>
  );
};
