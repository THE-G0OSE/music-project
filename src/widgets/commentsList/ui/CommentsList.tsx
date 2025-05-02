import { Comment } from "../../../entities/comment/ui/Comment"

export type comment = {
  ID: string;
  content: string;
  username: string;
  music_id: string;
  CreatedAt: number;
}

interface IProps {
  comments: comment[]
}

export const CommentsList:React.FC<IProps> = ({comments}) => {
  return (
    <div className='flex flex-col gap-5 w-[80vw] max-w-200 px-8 md:pr-8 md:px-0 mt-5'>
       {comments.map((comment) => <Comment comment={comment} /> )} 
    </div>
  )
}
