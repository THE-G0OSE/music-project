import { BiLogOut } from "react-icons/bi";
import { userSlice } from "../../../app/store/userSlice";
import { genres } from "../../../shared/configs/genre";
import { api } from "../../../shared/configs/apiPath";

export const ProfileInfo = () => {
  const currentUser = userSlice();

  const logoutHandler = () => {
    currentUser.resetUser();
  };

  const imageUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = e.target.files![0];
    if (!file) {
      alert("file not supported");
      return null;
    }
    formData.append("image", file);
    formData.append("username", currentUser.user!.username);
    const imagePath = await fetch(api + "media/uploadimage", {
      method: "POST",
      body: formData,
    });
    const data = await imagePath.json();
    currentUser.updateImage(data.path);
  };

  const genreInputHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const formData = new FormData()
    formData.append("genre", e.target.value)
    const updateGenre = async () => {
      const res = await fetch(api + 'users/' + currentUser.user!.username, {
        method: 'PUT',
        body: formData
      })
      if (!res.ok){
        alert('something went wrong')
      }
    }
    updateGenre()
    currentUser.updateGenre(e.target.value)
  }

  return (
    <>
      {currentUser.user && (
        <>
          <div className="flex w-full justify-between px-8">
            <p className="text-[2rem] text-green-500 font-bold mb-8">Профиль</p>
            <div className="flex text-[1.8rem] gap-4">
              <button
                onClick={logoutHandler}
                className="text-red-500 size-10 flex justify-center items-center "
              >
                <BiLogOut />
              </button>
            </div>
          </div>
          <div className="w-full md:gap-8 flex flex-col md:flex-row items-center md:items-start">
            <div className="md:ml-10">
              <label>
                <div className="size-60">
                  <img
                    className="size-full object-cover"
                    src={api + currentUser.user.image}
                  />
                </div>
                <input
                  onInput={imageUploadHandler}
                  className="hidden"
                  accept="image/*"
                  type="file"
                />
              </label>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-[1.9rem] font-bold">
                {currentUser.user.username}
              </p>
              <p className="text-[1.5rem] font-bold text-slate-500">
                Музыки понравилось: {currentUser.user.likes.length}
              </p>
              <p className="text-[1.5rem] font-bold text-slate-500">
                Музыки загруженно: {currentUser.user.music.length}
              </p>
              <p className="text-[1.5rem] font-bold text-slate-500">
                Альбомов созданно: {currentUser.user.playlists.length}
              </p>
              <label className='text-[1.2rem] font-bold'>Предпочитаемый жанр: {<select value={currentUser.user.genre} onChange={genreInputHandler}>
                {genres.map((genre) => <option value={genre}>{genre}</option>)}</select>}</label>
            </div>
          </div>
        </>
      )}
    </>
  );
};
