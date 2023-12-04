"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navburger from "../components/navburger";
import tsslogo from "public/tss_light.svg";
import tesalogo from "public/TESSA_FINAL.svg";
import multistage from "public/Mutli-Stage Tool.svg";
import multivitamin from "public/Multivitamin Tool.svg";
import dream from "public/Dream Stack.svg";
import future from "public/Future PlanTool.svg";
import international from "public/International Operability.svg";
import personmap from "public/Peronality Map Tool.svg";
import wellbeing from "public/Well-being Matrix Tool.svg";
import stack from "public/Stack Tool.svg";
import { IoMdSettings } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const Path = (props) => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      {...props}
    />
  );
  function toggleNavBox() {
    if (navbox === false) {
      setNavBox(true);
    } else setNavBox(false);
  }

  const [navbox, setNavBox] = useState(false);

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: "easeInOut",
        type: "spring",
        stiffness: 15,
        duration: 1,
      }}
      className="h-screen w-screen flex flex-col items-center overflow-scroll"
    >
      {/* <Navburger /> */}
      <div className="absolute w-full flex justify-end  ">
        <button
          onClick={toggleNavBox}
          className="h-[2.5rem] w-[2.5rem] bg-[#DADADA] justify-center gap-1 items-center m-5 rounded-full flex flex-col"
        >
          <div className="w-3/6 border border-black rounded-full"></div>
          <div className="w-3/6 border border-black rounded-full"></div>
          <div className="w-3/6 border border-black rounded-full"></div>
        </button>
      </div>
      <div className="flex flex-col  h-full justify-between  w-10/12 ">
        <Image
          src={tesalogo}
          width={80}
          alt="TESA Logo"
          className="mt-[2rem]"
        ></Image>
        <div className="text-2xl">
          <p>Hello Jane Doe!</p>
          <p>How can we help you?</p>
        </div>

        <div className="flex w-full flex-col items-center gap-2  mb-[4rem]">
          <div className="flex w-full flex-row gap-2">
            <div className="w-1/3">
              <div className="w-[6rem] h-[6rem] border-2 flex  flex-col justify-center items-center border-white rounded-2xl">
                <div className="h-4/6 w-full flex justify-center items-center">
                  <Image src={tsslogo} width={40} alt="TESA Logo"></Image>
                </div>
                <div className="h-2/6 w-full flex justify-center items-start">
                  <p className="text-[0.5rem]">Task Skills Stack</p>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-[6rem] h-[6rem] border-2 flex  flex-col justify-center items-center border-white rounded-2xl">
                <div className="h-4/6 w-full flex justify-center items-center">
                  <Image src={multistage} width={40} alt="TESA Logo"></Image>
                </div>
                <div className="h-2/6 w-full flex flex-col justify-start leading-3 items-center">
                  <p className="text-[0.5rem]">Multi-Stage</p>
                  <p className="text-[0.5rem]">Transition</p>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-[6rem] h-[6rem] border-2 flex  flex-col justify-center items-center border-white rounded-2xl">
                <div className="h-4/6 w-full flex justify-center items-center">
                  <Image src={multivitamin} width={40} alt="TESA Logo"></Image>
                </div>
                <div className="h-2/6 w-full flex flex-col justify-start leading-3 items-center">
                  <p className="text-[0.5rem]">Multi-Vitamin</p>
                  <p className="text-[0.5rem]">Strategy</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row gap-2">
            <div className="w-1/3">
              <div className="w-[6rem] h-[6rem] border-2 flex  flex-col justify-center items-center border-white rounded-2xl">
                <div className="h-4/6 w-full flex justify-center items-center">
                  <Image src={international} width={40} alt="TESA Logo"></Image>
                </div>
                <div className="h-2/6 w-full flex flex-col justify-start leading-3 items-center">
                  <p className="text-[0.5rem]">International</p>
                  <p className="text-[0.5rem]">Operability</p>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-[6rem] h-[6rem] border-2 flex  flex-col justify-center items-center border-white rounded-2xl">
                <div className="h-4/6 w-full flex justify-center items-center">
                  <Image src={wellbeing} width={40} alt="TESA Logo"></Image>
                </div>
                <div className="h-2/6 w-full flex justify-center items-start">
                  <p className="text-[0.5rem]">Well-being Matrix</p>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-[6rem] h-[6rem] border-2 flex  flex-col justify-center items-center border-white rounded-2xl">
                <div className="h-4/6 w-full flex justify-center items-center">
                  <Image src={stack} width={40} alt="TESA Logo"></Image>
                </div>
                <div className="h-2/6 w-full flex justify-center items-start">
                  <p className="text-[0.5rem]">Stack Tool</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row gap-2">
            <div className="w-1/3">
              <div className="w-[6rem] h-[6rem] border-2 flex  flex-col justify-center items-center border-white rounded-2xl">
                <div className="h-4/6 w-full flex justify-center items-center">
                  <Image src={dream} width={40} alt="TESA Logo"></Image>
                </div>
                <div className="h-2/6 w-full flex justify-center items-start">
                  <p className="text-[0.5rem]">Dream Map</p>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-[6rem] h-[6rem] border-2 flex  flex-col justify-center items-center border-white rounded-2xl">
                <div className="h-4/6 w-full flex justify-center items-center">
                  <Image src={future} width={40} alt="TESA Logo"></Image>
                </div>
                <div className="h-2/6 w-full flex justify-center items-start">
                  <p className="text-[0.5rem]">Future Stack</p>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-[6rem] h-[6rem] border-2 flex  flex-col justify-center items-center border-white rounded-2xl">
                <div className="h-4/6 w-full flex justify-center items-center">
                  <Image src={personmap} width={40} alt="TESA Logo"></Image>
                </div>
                <div className="h-2/6 w-full flex justify-center items-start">
                  <p className="text-[0.5rem]">Personality Stack</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {navbox ? (
        <div className="w-full flex-col flex items-center  rounded-2xl h-[15rem] mt-[5rem] absolute  bg-[#D9D9D9]">
          <div className="w-full h-[1rem] flex justify-center">
            <div className="w-1/2 h-[0.5rem] mt-2 rounded-2xl bg-white"></div>
          </div>
          <div className="flex w-10/12 h-full justify-center  flex-col ">
            <div className="">
              <div className=" flex-row h-fit border-b p-2 border-black flex items-center text-[#474545] gap-5 text-xl w-full">
                <IoMdSettings />
                <p>Settings</p>
              </div>
              <div className=" flex-row h-fit border-b p-2 border-black flex items-center text-[#474545] gap-5 text-xl w-full">
                <FaHistory />
                <p>Archive</p>
              </div>
              <div className=" flex-row h-fit border-b p-2 border-black flex items-center text-[#474545] gap-5 text-xl w-full">
                <FaHeart />
                <p>Saved</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}
