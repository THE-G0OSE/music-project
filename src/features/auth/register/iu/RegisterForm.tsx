import { useForm } from "react-hook-form";
import { api } from "../../../../shared/configs/apiPath";

interface IProps {
  setAuthPhase: (arg: string) => void;
}

interface IForm {
  username: string;
  password: string;
  passwordRep: string;
}

export const RegisterForm: React.FC<IProps> = ({ setAuthPhase }) => {
  const {
    register,
    clearErrors,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const passwordRepInputHandler = () => {
    clearErrors("passwordRep");
  };

  const loginHandler = () => {
    setAuthPhase("login");
  };

  const submitHandler = (data: IForm) => {
    if (data.passwordRep !== data.password) {
      setError("passwordRep", {
        type: "custom",
        message: "Пароли не совпадают",
      });
    } else {
      clearErrors("passwordRep");
      fetch(api + 'users', {
        method: 'POST',
        referrerPolicy: 'no-referrer',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        })
      }).then((res) => {if (res.status !== 201) {
        alert(res.statusText + ' \nвозможно имя пользователя уже занято')
      } else {
        setAuthPhase('login')
      }})
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full px-8 h-full gap-4 flex flex-col"
    >
      <h1 className="text-green-500 text-[2rem] mb-10 font-bold ">
        Регистрация
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
      <div className="w-full flex flex-col gap-2">
        <label className="text-[1.3rem] font-bold" htmlFor="passwordRep">
          Повторите пароль:
        </label>
        <input
          className="outline-none border-1 border-green-300 rounded-full px-2 py-1 "
          onInput={passwordRepInputHandler}
          type="password"
          {...register("passwordRep", {
            required: "Повторите пароль",
            minLength: {
              value: 8,
              message: "Пароль не может быть короче 8 символов",
            },
          })}
        />
        {errors.passwordRep && (
          <span className="text-red-500">{errors.passwordRep.message}</span>
        )}
      </div>
      <div className="flex mt-4 md:flex-row flex-col md:justify-around items-center">
        <button
          onClick={loginHandler}
          type="button"
          className="w-50 border-2 border-green-200 text-green-500 rounded-full px-2 py-1"
        >
          Войти
        </button>
        <button
          type="submit"
          className="w-50 bg-green-500 text-white px-2 py-1 rounded-full "
        >
          Регистрация
        </button>
      </div>
    </form>
  );
};
