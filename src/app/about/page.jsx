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
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-11/12 flex flex-col justify-center text-start">
          <div className="flex flex-col gap-5 text-justify">
            <p className=" font-semibold mt-5">What is TESSA?</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="font-semibold">How can TESSA help your career?</p>
            <p className="mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
