"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loginUserFunctionality } = useAuthInfo();

  //   redirect after loagin
  const searchParamas = useSearchParams();
  const router = useRouter();
  const redirect = searchParamas.get("redirect") || "/"

  // handle login functionality
  const handleLoginFunction = async (data) => {
    try {
      await loginUserFunctionality(data.email, data.password);
      Swal.fire({
        title: "Login Successful 🎉",
        text: `Welcome back ${data.email}!`,
        icon: "success",
      });

      reset();
      router.push(redirect);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: err.message,
      });
    }
  };

  return (
    <div className="login flex flex-col justify-center items-center min-h-screen">
      <section className="flex flex-col gap-2 text-center">
        <div className="flex gap-3 justify-center text-center">
          <h1 className="text-4xl">Login</h1>
          <Image
            src="/assets/dark-logo.png"
            alt="logo"
            height={50}
            width={50}
          />
        </div>
        <p>Welcome Back !!</p>
        <p className="pt-3">Please enter your credentials to log in</p>
      </section>

      <section className="mt-6">
        <form onSubmit={handleSubmit(handleLoginFunction)}>
          {/* username-password */}
          <div className="flex flex-col gap-3 mb-5">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 rounded-md border border-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 rounded-md border border-black"
            />

            <Link href="/reset-password" className="text-[0.8rem]">
              Forgot password?
            </Link>
          </div>

          <button className="btn bg-black text-white w-full rounded-[10px] py-2 cursor-pointer">
            Login
          </button>
        </form>
      </section>
    </div>
  );
}
