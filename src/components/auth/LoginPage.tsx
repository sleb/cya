import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "../Input";
import logo from "../../images/cya.jpg";
import { signInUser } from "../../services/auth-service";
import Button from "../Button";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  const [loginError, setLoginError] = useState<Error | null>(null);

  const login = ({ email, password }: Inputs) => {
    signInUser(email, password).catch(setLoginError);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col justify-center">
        <img src={logo} alt="logo" className="rounded-full shadow-lg" />
        <div className="text-red-500 text-sm h-5 font-bold my-4 flex justify-center">
          {loginError && <p>{loginError.message}</p>}
        </div>
        <form onSubmit={handleSubmit(login)}>
          <Input
            type="email"
            placeholder="Email"
            autoCapitalize="none"
            error={errors?.email?.message}
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: { value: /^\S+@\S+$/, message: "Email is invalid" },
            })}
          />
          <Input
            type="password"
            autoCapitalize="none"
            placeholder="Password"
            error={errors?.password?.message}
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
          />
          <Button title="Login" type="submit" />
        </form>
        <Link
          to="/register"
          className="text-center text-green-700 hover:underline"
        >
          ...or register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
