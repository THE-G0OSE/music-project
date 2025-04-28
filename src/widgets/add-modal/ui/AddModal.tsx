import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  setIsOpen: (arg: boolean) => void;
  type: "music" | "playlist";
}

interface IForm {
  title: string;
  image: string;
  author: string;
}

export const AddModal: React.FC<IProps> = ({ setIsOpen, type }) => {
  const [imageSrc, setImageSrc] = useState<string>("");

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

  const submity = (data: IForm) => {
    console.log(data);
  };
  return (
    <div onClick={() => setIsOpen(false)} className="flex w-screen h-screen justify-center items-center bg-black/30 fixed top-0 left-0">
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit(submity)}
        className="bg-white py-8 rounded-xl px-10 flex flex-col items-center"
      >
        <label>
          <div className="flex bg-slate-300 jusity-center items-center rounded-2xl overflow-hidden h-100 w-100">
            <img src={imageSrc} className="w-full h-full object-cover" />
          </div>
          <input
            className="hidden"
            type="file"
            {...register("image", { required: "Добавьте обложку" })}
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
