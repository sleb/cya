import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "../Input";
import logo from "../../images/cya.jpg";
import { signUpUser } from "../../services/auth-service";
import Button from "../Button";

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
    register,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  const [registerError, setRegisterError] = useState<Error | null>(null);

  const registerUser = ({ name, email, password }: Inputs) => {
    signUpUser(name.trim(), email.trim(), password).catch(setRegisterError);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col justify-center">
        <img src={logo} alt="logo" className="rounded-full shadow-lg" />
        <div className="text-red-500 text-sm h-5 font-bold my-4 flex justify-center">
          {registerError && <p>{registerError.message}</p>}
        </div>
        <form onSubmit={handleSubmit(registerUser)}>
          <Input
            type="text"
            placeholder="Name"
            error={errors.name?.message}
            {...register("name", {
              required: { value: true, message: "Name is required" },
            })}
          />
          <Input
            type="email"
            autoCapitalize="none"
            placeholder="Email"
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
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <Input
            type="password"
            autoCapitalize="none"
            placeholder="Confirm password"
            error={errors?.confirmPassword?.message}
            {...register("confirmPassword", {
              required: { value: true, message: "Re-type password" },
              validate: (v) =>
                v === getValues("password") || "Passwords don't match",
            })}
          />
          <Button type="submit">Register</Button>
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
