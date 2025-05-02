import { useEffect, useState } from "react";
import { userSlice } from "../../../app/store/userSlice";
import { LoginForm } from "../../../features/auth/login/ui/LoginForm";
import { CommentsList } from "../../../widgets/commentsList/ui/CommentsList";
import { ProfileInfo } from "../../../widgets/profile-info/ui/ProfileInfo";
import { RegisterForm } from "../../../features/auth/register/iu/RegisterForm";

export const Profile = () => {

  const [authPhase, setAuthPhase] = useState<string>('login')
  const [comments, setComments] = useState<Comment[]>([])
  const user = userSlice((state) => state.user)

  useEffect(() => {
    let isMounted = true
    if(user){
      const fetchComments = async () => {
        const res = await fetch('http://localhost:3200/comments/user/' + user.username)
        const body = await res.json()
        if (res.ok && isMounted) {
          if (body.comments) {
            setComments(body.comments)
          } else {
            setComments([])
          }
        }
      }
      fetchComments()
    }
    return () =>{isMounted = false}
  },[user])

  if(user) return (
    <div className="w-full">
      <ProfileInfo />
      <p className="text-[1.8rem] ml-8 md:ml-0 font-bold ">Ваши комментарии</p>
      <CommentsList comments={comments} />
      <div className='h-50 md:h-30'/>
    </div>
  );
  else if(authPhase === 'login') return (
    <LoginForm setAuthPhase={setAuthPhase}/>
  ) ;
  else if(authPhase === 'register') return (
    <RegisterForm setAuthPhase={setAuthPhase}/>
  )
};
