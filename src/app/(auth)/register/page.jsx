import Image from "next/image";

export default function RegisterPage() {
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
      
      <section className="form-section">
        <form>
            
        </form>
      </section>
    </div>
  );
}
