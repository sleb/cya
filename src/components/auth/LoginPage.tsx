import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import Input from "../Input";
import logo from "../../images/cya.jpg";
import { signInUser } from "../../services/auth-service";
import Button from "../Button";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { handleSubmit, control } = useForm<Inputs>({ mode: "onBlur" });

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
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "Email is required" },
              pattern: { value: /^\S+@\S+$/, message: "Email is invalid" },
            }}
            render={({
              field: { onChange, onBlur, value, name },
              fieldState: { error },
            }) => (
              <Input
                name={name}
                type="email"
                autoCapitalize="none"
                placeholder="Email"
                error={error?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "Password is required" },
            }}
            render={({
              field: { onChange, onBlur, name, value },
              fieldState: { error },
            }) => (
              <Input
                type="password"
                autoCapitalize="none"
                placeholder="Password"
                error={error?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
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
