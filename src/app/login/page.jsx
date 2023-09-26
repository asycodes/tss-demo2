"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navburger from "../components/navburger";
import tsslogo from "public/tss.svg";
export default function Page() {
  const router = useRouter();

  function handleLogin() {
    router.push("/journey/occupations");
  }

  function handleSignUp() {
    router.push("/signup");
  }
  return (
    <div>
      <Navburger />
      <div className="w-full">
        <Image
          src={tsslogo}
          width={140}
          height={140}
          alt="TSS Logo"
          className="p-5"
        ></Image>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-col w-10/12 mt-[2rem]">
          <p>Log In</p>
          <input
            type="text"
            className="bg-transparent border rounded-md pl-2  pt-2 pb-2 mt-4 mb-2"
            placeholder="E-mail"
          ></input>
          <input
            type="text"
            className="bg-transparent border rounded-md pl-2 pt-2 pb-2 mt-2 mb-2"
            placeholder="Password"
          ></input>
          <div className="flex justify-end w-full">
            <button className="text-xs">Forgot Password?</button>
          </div>

          <button
            className="mt-[1rem] p-[1rem] rounded-full bg-[#908F8F] font-bold "
            onClick={handleLogin}
          >
            Log in
          </button>
          <button
            onClick={handleSignUp}
            className=" p-[1rem] rounded-full border-white border mt-[1rem]"
          >
            Don't have an account?
            <b> Sign Up</b>
          </button>
          <p className="text-xs text-center mt-[6rem]">
            By signing up, you’re agreeing to our
            <b> Privacy Policy and Terms of Service</b>
          </p>
        </div>
      </div>
    </div>
  );
}
