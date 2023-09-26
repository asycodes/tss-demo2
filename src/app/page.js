"use client";
import Image from "next/image";
import Link from "next/link";
import Navburger from "./components/navburger";
import tsslogo from "public/tss.svg";
import tssvideo from "public/video.svg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import tssinfo from "public/info.svg";
import tssinteract from "public/interact.svg";
import tssmental from "public/mental.svg";
import tsswork from "public/work.svg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [videoscroll, setVideoScroll] = useState(false);

  function handleVideoScroll() {
    setVideoScroll(true);
  }
  function handleJourney() {
    router.push("/journey/occupations");
  }

  function handleLogin() {
    router.push("/login");
  }
  return (
    <div>
      <Navburger />
      {videoscroll ? null : (
        <div>
          <div className="w-full">
            <Image
              src={tsslogo}
              width={140}
              height={140}
              className="p-5"
            ></Image>
          </div>
          <div className="w-full flex flex-col justify-center items-center ">
            <div className="w-11/12 flex flex-col justify-center text-start">
              <div className="text-[3rem] italic leading-tight">
                <p>Define</p>
                <p
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #EFAB9D, #EFD19F, #A1D6C1, #ABB3DC)",
                  }}
                  className="font-semibold text-transparent bg-clip-text w-fit pr-1"
                >
                  multi-futures
                </p>
              </div>
              <div className="flex flex-col gap-5 text-justify">
                <p className=" font-semibold italic mt-5">
                  An AI-powered tool to explore your career future.
                </p>
                <p>
                  We are more than we often think. Your future is not
                  pre-determined nor unchangeable.
                </p>
                <p className="mb-5">
                  Let TESSA guide you to define and expand your options,
                  empowering you to craft multi-futures.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full">
        <button className="w-full" onClick={handleVideoScroll}>
          <Image
            src={tssvideo}
            className=" w-full h-full"
            style={{
              paddingTop: videoscroll ? "5rem" : "0",
            }}
          ></Image>
        </button>
      </div>
      {videoscroll ? (
        <div className=" flex flex-col justify-center items-center">
          <div className="flex flex-row gap-[4rem] justify-center items-center p-[2rem]">
            <Image src={tssmental} width={30} height={30}></Image>
            <Image src={tssinfo} width={30} height={30}></Image>
            <Image src={tsswork} width={30} height={30}></Image>
            <Image src={tssinteract} width={30} height={30}></Image>
          </div>
          <div
            className="w-full h-[1px]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #EFAB9D, #EFD19F, #A1D6C1, #ABB3DC)",
            }}
          ></div>
          <p className="p-[2rem] text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button
            onClick={handleJourney}
            className="w-10/12 p-[1rem] rounded-full font-bold"
            style={{
              backgroundImage:
                "linear-gradient(to right, #EFAB9D, #EFD19F, #A1D6C1, #ABB3DC)",
            }}
          >
            Begin Journey
          </button>
          <button
            onClick={handleLogin}
            className="w-10/12 p-[1rem] rounded-full border-white border mt-[1rem] mb-[4rem]"
          >
            Already have an account? <b>Log In</b>
          </button>
        </div>
      ) : null}
    </div>
  );
}
