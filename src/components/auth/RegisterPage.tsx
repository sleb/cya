import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import TextInput from "../TextInput";
import logo from "../../images/cya.jpg";
import { signUpUser } from "../../services/auth-service";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

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
            rules={{ required: { value: true, message: "Name is required" } }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                placeholder="Name"
                error={errors.name?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: "Email is required" },
              pattern: { value: /^\S+@\S+$/, message: "Email is invalid" },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                placeholder="Email"
                error={errors.email?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                placeholder="Password"
                error={errors.password?.message}
                onChange={onChange}
                onBlur={onBlur}
                secure
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: { value: true, message: "Re-type password" },
              validate: (v) =>
                v === getValues("password") || "Passwords don't match",
            }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                placeholder="Confirm password"
                error={errors.confirmPassword?.message}
                onChange={onChange}
                onBlur={onBlur}
                secure
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
