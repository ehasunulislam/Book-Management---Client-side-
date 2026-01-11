"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {createUserFunction, updateUserFunction} = useAuthInfo();
    
    const handleRegister = async(data) => {
        // image upload with ImageBB 
        const registerImg = data.photo[0];
        const formData = new FormData();
        formData.append("image", registerImg);

        const image_bb_api_key = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_BB_API_LINK}`;
        const imageRes = await axios.post(image_bb_api_key, formData);
        const imageURL = imageRes.data.data.url;

        // create user with firebase 
        const registerFunctionality = await createUserFunction(data.email, data.password);
        const user = registerFunctionality.user
        console.log("after registerd", user);

        // add image with firebase 
        await updateUserFunction(data.name, imageURL)
    }

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
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer"
          >
            Register
          </button>
        </form>
      </section>
    </div>
  );
}
