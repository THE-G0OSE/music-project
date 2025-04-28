import { useForm } from "react-hook-form";

interface IProps {
  setAuthPhase: (arg: string) => void;
}

interface IForm {
  username: string;
  password: string;
}

export const LoginForm: React.FC<IProps> = ({ setAuthPhase }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const registerHandler = () => {
    setAuthPhase("register");
  };

  const submitHandler = (data: IForm) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full px-8 h-full gap-4 flex flex-col"
    >
      <h1 className="text-green-500 text-[2rem] mb-10 font-bold ">
        Авторизация
      </h1>
      <div className="w-full flex flex-col gap-2">
        <label className="text-[1.3rem] font-bold" htmlFor="username">
          Имя пользователя:
        </label>
        <input
          className="outline-none border-1 border-green-300 rounded-full px-2 py-1 "
          type="text"
          {...register("username", {
            required: "Введите имя пользователя",
            minLength: {
              value: 6,
              message: "Имя пользователя не может быть короче 6 символов",
            },
          })}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="text-[1.3rem] font-bold" htmlFor="password">
          Пароль:
        </label>
        <input
          className="outline-none border-1 border-green-300 rounded-full px-2 py-1 "
          type="password"
          {...register("password", {
            required: "Введите пароль",
            minLength: {
              value: 8,
              message: "Пароль не может быть короче 8 символов",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <div className="flex gap-5 md:gap-0 mt-14 md:flex-row flex-col md:justify-around items-center">
        <button
          onClick={registerHandler}
          type="button"
          className="md:w-50 w-full border-2 border-green-200 text-green-500 rounded-full px-2 py-1"
        >
          Регистрация
        </button>
        <button
          type="submit"
          className="w-full md:w-50 bg-green-500 text-white px-2 py-1 rounded-full "
        >
          Войти
        </button>
      </div>
    </form>
  );
};
