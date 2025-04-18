import { InputWithLabel, CheckboxInput } from "@components/ui/Input";
import Button from "@components/ui/Button";
// import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { registerUser } from "@api/auth";
import { toast } from "sonner";
import { Spinner } from "@global/Icons";
import { useNavigate } from "react-router-dom";
import useUser from "@store/useUser";

const Signup = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be minimum of 6")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),
  });
  const setUser = useUser((state) => state.setUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const signupUser = async (data) => {
    const { fullName, password, username, email } = data;
    const capitalize = fullName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ")
      .split(" ");
    const firstName = capitalize[0];
    const lastName = capitalize[1];
    const req = {
      username,
      password,
      email,
      first_name: firstName,
      last_name: lastName,
    };
    try {
      const value = await registerUser(req);
      reset();
      setUser(value);
      toast.success("User Registered Successfully");
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error("User Registration Failed");
      return null;
    }
  };
  return (
    <main className="absolute  md:static md:left-0 md:top-0 md:translate-x-0  z-30 w-full left-1/2 transform top-[45%] -translate-x-1/2  flex items-center justify-center  ">
      <form
        onSubmit={handleSubmit(signupUser)}
        className="w-[90%] bg-white md:bg-transparent p-4 md:rounded-none md:shadow-none rounded-2xl shadow-md md:sha space-y-2 md:min-w-[60%]"
      >
        <h1 className="text-center mb-4 text-[1.4rem] md:text-[1.8rem] font-bold text-primary ">
          Create an Account
        </h1>
        <InputWithLabel
          placeholder="eg. Kofi Yesu"
          label="Full Name"
          {...register("fullName")}
          className={`${
            errors?.fullname ? "border-danger" : "border-primary"
          }  ${isValid ? "bg-[#FFF2EA]" : ""}`}
          name="fullName"
          type="text"
        />
        {errors && (
          <p className="text-danger text-[.7rem] ">
            {errors?.fullName?.message}
          </p>
        )}
        <InputWithLabel
          placeholder="eg. MaaHMooD"
          label="Username"
          {...register("username")}
          className={`${
            errors?.username ? "border-danger" : "border-primary"
          }  ${isValid ? "bg-[#FFF2EA]" : ""}`}
          name="username"
          type="text"
        />
        {errors && (
          <p className="text-danger text-[.7rem]">
            {errors?.username?.message}
          </p>
        )}
        <InputWithLabel
          placeholder="eg. example.gmail.com"
          label="Email"
          className={`${errors?.email ? "border-danger" : "border-primary"}  ${
            isValid ? "bg-[#FFF2EA]" : ""
          }`}
          name="email"
          {...register("email")}
          type="email"
        />
        {errors && (
          <p className="text-danger text-[.7rem]">{errors?.email?.message}</p>
        )}

        <InputWithLabel
          placeholder="Password"
          label="Password"
          {...register("password")}
          className={`${
            errors?.password ? "border-danger" : "border-primary"
          }  $isValid ? "bg-[#FFF2EA]" : ""}`}
          name="password"
          type="password"
          Icon
        />
        {errors && (
          <p className="text-danger text-[.7rem]">
            {errors?.password?.message}
          </p>
        )}
        <InputWithLabel
          placeholder="Password"
          label="Confirm Password"
          {...register("confirmPassword")}
          className={`${
            errors?.confirmPassword ? "border-danger" : "border-primary"
          }  $isValid ? "bg-[#FFF2EA]" : ""}`}
          name="confirmPassword"
          Icon
          type="password"
        />
        {errors && (
          <p className="text-danger text-[.7rem]">
            {errors?.confirmPassword?.message}
          </p>
        )}
        <Button
          type="submit"
          className="w-[95%] text-[.7rem] md:text-[1rem] mx-auto py-2 justify-center flex "
        >
          {isSubmitting ? (
            <>
              <Spinner />
            </>
          ) : (
            "Sign up"
          )}
        </Button>
        <p className="text-[.6rem] md:text-[.8rem] block mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary hover:text-secondary">
            Login
          </Link>{" "}
        </p>
      </form>
    </main>
  );
};

export default Signup;
