"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navburger from "../components/navburger";
import tsslogo from "public/tss.svg";
export default function Page() {
  const router = useRouter();

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
          <p>Sign Up</p>
          <button className="mt-[1rem] p-[1rem] rounded-md bg-[#908F8F] font-bold ">
            Sign Up with E-mail
          </button>
          <button className="mt-[1rem] p-[1rem] rounded-md border font-bold ">
            Sign Up with Google
          </button>
          <button className="mt-[1rem] p-[1rem] rounded-md  border font-bold ">
            Sign Up with Facebook
          </button>
          <p className="text-xs text-center mt-[4rem]">
            By signing up, you’re agreeing to our
            <b> Privacy Policy and Terms of Service</b>
          </p>
        </div>
      </div>
    </div>
  );
}
