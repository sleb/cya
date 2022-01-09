import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import Input from "../Input";
import logo from "../../images/cya.jpg";
import { signUpUser } from "../../services/auth-service";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const { handleSubmit, getValues, control } = useForm<Inputs>({
    mode: "onBlur",
  });

  const [registerError, setRegisterError] = useState<Error | null>(null);

  const register = ({ name, email, password }: Inputs) => {
    signUpUser(name.trim(), email.trim(), password).catch(setRegisterError);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col justify-center">
        <img src={logo} alt="logo" className="rounded-full shadow-lg" />
        <div className="text-red-500 text-sm h-5 font-bold my-4 flex justify-center">
          {registerError && <p>{registerError.message}</p>}
        </div>
        <form onSubmit={handleSubmit(register)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: { value: true, message: "Name is required" } }}
            render={({
              field: { onChange, onBlur, name, value },
              fieldState: { error },
            }) => (
              <Input
                name={name}
                value={value}
                type="text"
                placeholder="Name"
                error={error?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "Email is required" },
              pattern: { value: /^\S+@\S+$/, message: "Email is invalid" },
            }}
            render={({
              field: { onChange, onBlur, name, value },
              fieldState: { error },
            }) => (
              <Input
                name={name}
                value={value}
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
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({
              field: { onChange, onBlur, name, value },
              fieldState: { error },
            }) => (
              <Input
                name={name}
                value={value}
                type="password"
                autoCapitalize="none"
                placeholder="Password"
                error={error?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "Re-type password" },
              validate: (v) =>
                v === getValues("password") || "Passwords don't match",
            }}
            render={({
              field: { onChange, onBlur, value, name },
              fieldState: { error },
            }) => (
              <Input
                name={name}
                value={value}
                type="password"
                autoCapitalize="none"
                placeholder="Confirm password"
                error={error?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <button
            type="submit"
            className="bg-green-700 text-yellow-300 px-2 py-1 w-full rounded-md"
          >
            Register
          </button>
        </form>
        <Link
          to="/login"
          className="text-center text-green-700 hover:underline"
        >
          ...or log in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
