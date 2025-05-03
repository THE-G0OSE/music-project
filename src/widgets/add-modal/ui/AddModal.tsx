import React, { FormEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PiFilePlusBold } from "react-icons/pi";
import { userSlice } from "../../../app/store/userSlice";
import { musicSlice } from "../../../app/store/musicSlice";
import { genres } from "../../../shared/configs/genre";
import { IMusic } from "../../../shared/mocks/musicMock";

interface IProps {
  setIsOpen: (arg: boolean) => void;
  type: "music" | "playlist";
}

interface IForm {
  title: string;
  image: string;
  author: string;
  music: string;
  genre: string;
}

export const AddModal: React.FC<IProps> = ({ setIsOpen, type }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [musicName, setMusicName] = useState<string>("");

  const user = userSlice((state) => state.user);
  const addMusic = userSlice((state) => state.addMusic);
  const { fetchMusic, localMusic } = musicSlice();
  const [musicArr, setMusicArr] = useState<IMusic[]>([]);
  const musicSelectRef = useRef<HTMLSelectElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const imageInputHandler = (e: FormEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const img = URL.createObjectURL(file);
    setImageSrc(img);
  };

  const musicInputHandler = (e) => {
    setMusicName(e.target.files[0].name);
  };

  const musicSelectHandler = () => {
    console.log(musicSelectRef.current!.value);
    setMusicArr([
      ...musicArr,
      localMusic.find((music) => music.ID == musicSelectRef.current!.value)!,
    ]);
    musicSelectRef.current!.value = 'nothing'
  };

  const submity = async (data: IForm) => {
    if (type === "music") {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("author", data.author);
      formData.append("music", data.music[0]);
      formData.append("username", user!.username);
      formData.append("genre", data.genre);
    const res = await fetch("http://localhost:3200/media/uploadtrack", {
      method: "POST",
      body: formData,
    });
    const body = await res.json();
    if (res.status !== 200) {
      alert(body.error);
      return null;
    }
    addMusic(body.music);
    fetchMusic(user!.username);
    setIsOpen(false);
    } else { 
      const body = {
        title: data.title,
        author: data.author,
        music: musicArr.map((music) => music.ID.toString()),
        username: user!.username,
      }
      const postPlaylist = async () => {
        const res = await fetch('http://localhost:3200/playlists/' + user!.username, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify(body),
        })
        const resBody = await res.json()
        if (!res.ok) {
          alert(resBody.error)
        }
      }
      postPlaylist()
      setIsOpen(false)
    }
  };
  return (
    <div
      onClick={() => setIsOpen(false)}
      className="flex w-screen h-screen justify-center items-center bg-black/30 fixed top-0 left-0"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(submity)}
        className="bg-white py-8 rounded-xl px-10 flex flex-col items-center"
      >
        <label className={type === 'playlist' ? 'hidden' : ''}>
          <div className="flex bg-slate-300 jusity-center items-center rounded-2xl overflow-hidden h-100 w-100">
            <img
              src={imageSrc ? imageSrc : "alo"}
              className="w-full h-full object-cover"
            />
          </div>
          <input
            className="hidden"
            type="file"
            {...register("image")}
            onInput={imageInputHandler}
          />
        </label>
        {errors.image && (
          <p className="w-full text-center text-red-500">
            {errors.image.message}
          </p>
        )}
        <input
          placeholder="Название"
          className="w-80 outline-none text-center placeholder:text-slate-300 border-2 border-slate-200 rounded-full h-8 mt-6"
          type="text"
          {...register("title", { required: "Напишите название" })}
        />
        {errors.title && (
          <p className="w-full text-center text-red-500">
            {errors.title.message}
          </p>
        )}
        <input
          placeholder="Автор"
          className="w-70 outline-none text-center placeholder:text-slate-300 border-2 border-slate-200 rounded-full h-8 mt-3"
          type="text"
          {...register("author", { required: "Напишите автора" })}
        />
        {errors.author && (
          <p className="w-full text-center text-red-500">
            {errors.author.message}
          </p>
        )}
        {type == "music" && (
          <>
            <label className="flex flex-col items-center">
              <div className="size-20 mt-5 flex justify-center items-center rounded-2xl bg-slate-300 text-white text-[1.9rem]">
                <PiFilePlusBold />
              </div>
              <input
                onInput={musicInputHandler}
                className="hidden"
                type="file"
                accept="audio/*"
                {...register("music", { required: "Выберите файл" })}
              />
              <p>{musicName}</p>
            </label>
            {errors.music && (
              <p className="text-red-500">{errors.music.message}</p>
            )}
            <label className="mt-4">
              <select {...register("genre", { required: "Выбеоете жанр" })}>
                {genres.map((genre) => (
                  <option value={genre}>{genre}</option>
                ))}
              </select>
            </label>
          </>
        )}
        {type == "playlist" && (
          <div className="flex mt-5 flex-col items-center">
            <p>Добавить трек:</p>
            <select ref={musicSelectRef} onInput={musicSelectHandler}>
                <option value={'nothing'}>Выберите трек</option>
              {localMusic.map((music) => (
                <option value={music.ID}>{music.title}</option>
              ))}
            </select>
            <p>Добавленные:</p>
            {musicArr.map((music) => (
              <div>{music.title}</div>
            ))}
          </div>
        )}
        <div className="w-full gap-4 mt-8 flex">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full cursor-pointer text-slate-300 h-8 rounded-full flex justify-center items-center border-2 border-slate-200"
          >
            Отмена
          </button>
          <button className="w-full h-8 rounded-full cursor-pointer flex justify-center items-center bg-green-500 text-white">
            Загрузить
          </button>
        </div>
      </form>
    </div>
  );
};
