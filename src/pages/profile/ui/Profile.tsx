import { useState } from "react";
import { userSlice } from "../../../app/store/userSlice";
import { LoginForm } from "../../../features/auth/login/ui/LoginForm";
import { CommentsList } from "../../../widgets/commentsList/ui/CommentsList";
import { ProfileInfo } from "../../../widgets/profile-info/ui/ProfileInfo";
import { RegisterForm } from "../../../features/auth/register/iu/RegisterForm";

export const Profile = () => {

  const [authPhase, setAuthPhase] = useState<string>('login')

  const user = userSlice((state) => state.user)
  if(user) return (
    <div className="w-full">
      <ProfileInfo />
      <p className="text-[1.8rem] ml-8 md:ml-0 font-bold ">Ваши комментарии</p>
      <CommentsList />
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
