import { Comment } from "../../../entities/comment/ui/Comment"
import { commentsMock } from "../../../shared/mocks/commentsMock"

export const CommentsList = () => {
  return (
    <div className='flex flex-col gap-5 px-8 md:pr-8 md:px-0 mt-5'>
       {commentsMock.map((comment) => <Comment {...comment} /> )} 
    </div>
  )
}
