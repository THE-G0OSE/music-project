import { userSlice } from "../../../app/store/userSlice";

export const ProfileInfo = () => {
  const currentUser = userSlice();

  return (
    <>
      {currentUser.user && (
        <>
          <p className="text-[2rem] text-green-500 font-bold ml-8  mb-8">
            Профиль
          </p>
          <div className="w-full md:gap-8 flex flex-col md:flex-row items-center md:items-start">
            <div className="md:ml-10">
              <label>
                <div className="size-60">
                  <img
                    className="size-full object-cover"
                    src={currentUser.user.image}
                  />
                </div>
                <input className="hidden" accept="image/*" type="file" />
              </label>
            </div>
            <div className='flex flex-col gap-6'>
              <p className="text-[1.9rem] font-bold">
                {currentUser.user.username}
              </p>
              <p className="text-[1.5rem] font-bold text-slate-500">
                Музыки понравилось: {currentUser.user.liked.length}
              </p>
              <p className="text-[1.5rem] font-bold text-slate-500">
                Музыки загруженно: {currentUser.user.music.length}
              </p>
              <p className="text-[1.5rem] font-bold text-slate-500">
                Альбомов созданно: {currentUser.user.playlists.length}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
