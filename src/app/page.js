"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BallBG from "./components/ball";
import Image from "next/image";
import tsslogo from "public/tss.svg";
import tesa from "public/TESA.svg";
import tesalogo from "public/TESALOGO.svg";
import tesaring from "public/TESARING.svg";
import Navburger from "./components/navburger";
import { FiChevronDown } from "react-icons/fi";
import tssinfo from "public/info.svg";
import tssinteract from "public/interact.svg";
import tssmental from "public/mental.svg";
import tsswork from "public/work.svg";

export default function Page() {
  const router = useRouter();
  const words = [
    "100 Ways",
    "to Craft your Career",
    "Re-imagine your Future",
    "a Data-Driven Method",
    // "give yourself an International Edge",
    "an International Edge",
    "Map to your Dream Job",
    "Strike a Well-Being balance",
  ];
  function handleJourney() {
    router.push("/journey/occupations");
  }
  const [text, setText] = useState(words[0]);
  const [scrollUp, setScrollUp] = useState(false);
  const [removeDiv, setRemoveDiv] = useState(false);
  const [appear, setAppear] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) => {
        const nextIndex = (words.indexOf(prevText) + 1) % words.length;
        return words[nextIndex];
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  function handleScroll() {
    setScrollUp(true);
    // setAppear(true);
    setInterval(() => {
      setRemoveDiv(true);
    }, 2500);
  }
  return (
    <div className="h-screen max-w-screen max-h-screen w-screen flex flex-col items-center overflow-x-hidden">
      <motion.div
        style={{
          backgroundImage: "linear-gradient(to bottom, #010101 50%, #474545)",
        }}
        className="h-screen max-w-screen max-h-screen w-screen flex flex-col justify-center overflow-x-hidden "
        initial={{ y: 0, opacity: 1 }}
        // animate={{ y: scrollUp ? -500 : 0, opacity: scrollUp ? 0 : 1 }}
        animate={{ y: scrollUp ? -700 : 0 }}
        transition={{
          ease: "easeInOut",
          type: "spring",
          stiffness: 10,
          duration: 2,
        }}
      >
        <BallBG />
        <div className="w-screen h-screen flex flex-col">
          <div className="flex w-full h-full flex-col items-center">
            <Image
              src={tesa}
              width={60}
              alt="TESA Logo"
              className="mt-[2.5rem]"
            ></Image>
          </div>
          <motion.div className="flex w-full flex-col justify-center h-screen items-center absolute">
            <button className="w-[12rem] h-[12rem]">
              <motion.h1
                className="text-[1.7rem] font-semibold italic z-10 w-[12rem] text-center "
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {text}
              </motion.h1>
            </button>
          </motion.div>
          <div className="justify-self-end flex mb-[2rem] flex-col items-center z-10">
            <p className="text-white text-center  font-semibold italic w-2/3 text-[0.9rem]">
              AI-powered tool to explore your career future.
            </p>
            <button
              onClick={handleScroll}
              className="w-[2rem] h-[2rem] mt-[1rem] bg-[#908F8F] rounded-full flex justify-center items-center"
            >
              <FiChevronDown className="w-[1.5em] h-[1.5rem] text-[#474545]" />
            </button>
          </div>
        </div>
      </motion.div>
      {removeDiv ? (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 10,
            duration: 1,
          }}
          className="flex flex-col w-full p-5"
        >
          <Image
            src={tesalogo}
            width={80}
            alt="TESA Logo"
            className="sticky"
          ></Image>
          <div className="w-7/8  overflow-scroll  flex flex-col text-center items-center text-[1.2rem] mt-[4rem] over">
            <p className="font-bold italic">
              TESA is an AI-powered tool to explore your career future.
            </p>
            <p className="mt-[1rem]">
              We are more than we often think. Your future is not pre-determined
              nor unchangeable.
            </p>
            <p className="mt-[1rem] mb-[2rem]">
              Let<b> TESA</b> guide you to define and expand your options,
              empowering you to craft<b> multi-futures</b>.
            </p>
            <Image src={tesaring} width={150} alt="TESA Ring"></Image>
            <p className="font-bold italic text-[2.2rem] mt-[2rem] mb-[1rem]">
              100 Tools to Craft Your Career.
            </p>
            <p>
              100 different techniques to determine what your next career move
              will be like.
            </p>
            <div className="h-[10rem]"></div>
            <p className="font-bold italic text-[2.2rem] mt-[2rem] mb-[1rem]">
              Discover more about Your Career Strengths through Task.
            </p>
            <p>
              Discover more about yourself by understanding the tasks that
              empowers you.
            </p>

            <div className="flex flex-row gap-[4rem] justify-center items-center  p-[2rem]">
              <Image
                src={tssmental}
                width={30}
                height={30}
                alt="Icon for Mental Category"
              ></Image>
              <Image
                src={tssinfo}
                width={30}
                height={30}
                alt="Icon for Info Category"
              ></Image>
              <Image
                src={tsswork}
                width={30}
                height={30}
                alt="Icon for Work Category"
              ></Image>
              <Image
                src={tssinteract}
                width={30}
                height={30}
                alt="Icon for Interact Category"
              ></Image>
            </div>
            <div
              className="w-full h-[1px]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #EFAB9D, #EFD19F, #A1D6C1, #ABB3DC)",
              }}
            ></div>
            <p className=" font-semibold mt-[2rem] mb-[2rem] ">
              So, are you ready to embark on your very own voyage?
            </p>

            <button
              // onClick={handleJourney}
              className="w-full p-[1rem] rounded-full font-bold mb-[2rem]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #EFAB9D, #EFD19F, #A1D6C1, #ABB3DC)",
              }}
            >
              {" "}
              <a href="/journey/occupations">Begin Journey</a>
            </button>
          </div>
        </motion.div>
      ) : null}

      {removeDiv ? <Navburger></Navburger> : null}
    </div>
  );
}
