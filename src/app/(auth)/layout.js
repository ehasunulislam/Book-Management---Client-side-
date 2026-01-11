"use client";

import Register from "@/Components/Auth-LeftSide/Register";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }) {
  const pathName = usePathname();

  const isRegisterPage = pathName.includes("register");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Main Content (shows first on mobile & tablet) */}
      <main className="w-full lg:w-1/2 order-1 lg:order-2 p-4 lg:p-8">
        {children}
      </main>

      {/* Left Sidebar */}
      <div
        className=" w-full lg:w-1/2 
                    order-2 lg:order-1 
                    bg-black text-white 
                    flex flex-col justify-center items-center 
                    p-8
                    rounded-t-[3rem] 
                    sm:rounded-t-[4rem] 
                    md:rounded-t-[5rem] 
                    lg:rounded-t-none lg:rounded-r-[3rem]"
      >
        <section className="logo-content text-center flex flex-col items-center space-y-2">
          <Image src="/assets/logo.png" alt="logo" height={80} width={80} />
          <h1 className="text-4xl md:text-5xl font-bold">BookWorm</h1>
          <p className="text-sm md:text-base">LIBRARY</p>
        </section>

        <section className="mt-6 w-full">
          {isRegisterPage && <Register />}
        </section>
      </div>
    </div>
  );
}
