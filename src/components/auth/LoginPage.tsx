import React from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import TextInput from "../TextInput";
import logo from "../../images/cya.jpg";
import { signInUser } from "../../services/auth-service";
import Button from "../Button";

type Inputs = {
  email: string;
  password: string;
};

const login = ({ email, password }: Inputs) => {
  signInUser(email, password).catch(console.error);
};

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col justify-center">
        <img src={logo} alt="logo" className="rounded-full shadow-lg" />
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: "Email is required" },
              pattern: { value: /^\S+@\S+$/, message: "Email is invalid" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email"
                error={errors.email?.message}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "Password is required" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                error={errors.password?.message}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                secure
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
