import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="text-white mt-8 flex justify-center items-center flex-col">
      <p className="mb-6">New to our platform? register now.</p>

      <Link
        href="/register"
        className="btn border border-white px-8 py-3 rounded-[10px] hover:bg-white hover:text-black transition-colors"
      >
        register now
      </Link>
    </div>
  );
};

export default Login;
