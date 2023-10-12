"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navburger from "../components/navburger";
import tsslogo from "public/tss.svg";
import tesalogo from "public/TESALOGO.svg";
export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Navburger />

      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-10/12 flex flex-col justify-center text-start">
          <Image
            src={tesalogo}
            width={80}
            alt="TESA Logo"
            className="mt-[2rem]"
          ></Image>

          <div className="flex flex-col gap-5 text-justify">
            <p className=" font-semibold mt-5">What is TESSA?</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="font-semibold">How can TESSA help your career?</p>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="font-semibold">Where does AI come in?</p>
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
