"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import useAxios from "@/hooks/useAxios";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUserFunction, updateUserFunction } = useAuthInfo();
  const axiosSecure = useAxios();
  const [registerLoading, setRegisterLoading] = useState(false);

  // redirect after register
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/";

  const handleRegister = async (data) => {
    try {
      // image upload with ImageBB
      const registerImg = data.photo[0];
      const formData = new FormData();
      formData.append("image", registerImg);

      const image_bb_api_key = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_BB_API_LINK}`;
      const imageRes = await axios.post(image_bb_api_key, formData);
      const imageURL = imageRes.data.data.url;

      // create user with firebase
      const registerFunctionality = await createUserFunction(
        data.email,
        data.password
      );
      const user = registerFunctionality.user;
      console.log("after registerd", user);

      // add image with firebase
      await updateUserFunction(data.name, imageURL);

      // save user to database
      const userData = {
        name: data.name,
        email: data.email,
        contact: data.contact,
        photo: imageURL,
        userName: data.username,
        role: "user",
        status: "approved",
      };

      const res = await axiosSecure.post("/create-user", userData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "You registerd successfully",
          showConfirmButton: false,
          timer: 2500,
        });

        router.push(redirect);
        reset();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: err.message,
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="register flex flex-col justify-center items-center min-h-screen">
      <section className="flex flex-col gap-2">
        <div className="flex gap-3 justify-center text-center">
          <h1 className="text-4xl">Register</h1>
          <Image
            src="/assets/dark-logo.png"
            alt="logo"
            height={50}
            width={50}
          />
        </div>
        <p>Please provide your information to sign up.</p>
      </section>

      <section className="form-section mt-4">
        <form onSubmit={handleSubmit(handleRegister)}>
          {/* name-email */}
          <div className="flex flex-col md:flex-row gap-3 mb-5">
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 rounded-md border border-black"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 rounded-md border border-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* contact-photo */}
          <div className="flex flex-col md:flex-row gap-3 mb-5">
            <input
              type="text"
              placeholder="Contact"
              {...register("contact", { required: "Contact is required" })}
              className="w-full p-2 rounded-md border border-black"
            />

            <input
              type="file"
              {...register("photo")}
              className="file-input w-full p-2 rounded-md border border-black cursor-pointer"
            />
          </div>

          {/* username-password */}
          <div className="flex flex-col md:flex-row gap-3 mb-5">
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="w-full p-2 rounded-md border border-black"
            />

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
          </div>

          <button
            type="submit"
            disabled={registerLoading}
            className={`w-full py-2 rounded-md cursor-pointer
            ${
                registerLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800 text-white"
                }
            `}
          >
            {registerLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </section>
    </div>
  );
}
