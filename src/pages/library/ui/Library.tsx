import { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { IoHeartOutline } from "react-icons/io5";
import { LocalLibrary } from "../../../widgets/local-library/ui/LocalLibrary";
import { LikesLibrary } from "../../../widgets/likes-library/ui/LikesLibrary";
import { userSlice } from "../../../app/store/userSlice";
import { useNavigate } from "react-router";

export const Library = () => {
  const [selectedPart, setSelectedPart] = useState<"likes" | "local">("local");
  const user = userSlice((state) => state.user)
  const navigate = useNavigate()

  if(user)return (
    <div className="flex flex-col w-full">
      <h1 className="text-green-500 ml-8 font-bold text-[2rem]">Библиотека</h1>
      <div className="flex w-full mt-4 text-[1.4rem] md:pr-6">
        <button
          className={`flex justify-center ${
            selectedPart === "likes" && "border-b-2 text-green-500"
          } transition-border cursor-pointer duration-300 border-green-500 items-center h-10 w-full`}
          onClick={() => setSelectedPart("likes")}
        >
          <IoHeartOutline />
        </button>
        <button
          className={`flex justify-center ${
            selectedPart === "local" && "border-b-2 text-green-500"
          } transition cursor-pointer duration-300 border-green-500 items-center h-10 w-full`}
          onClick={() => setSelectedPart("local")}
        >
          <BiDownload />
        </button>
      </div>
      {selectedPart === 'local' ? <LocalLibrary/> : <LikesLibrary/>}
    </div>
  );
  else return(
    <div className='w-full h-screen pb-18 flex flex-col gap-5 justify-center items-center'>
      <p className='text-green-500 font-bold text-[2rem]'>Необходимо войти в аккаунт</p>
      <button onClick={() => {navigate('/profile')}} className='bg-green-500 text-white py-2 px-4 rounded-full' >Вход\Регистрация</button>
    </div>
  )
};
