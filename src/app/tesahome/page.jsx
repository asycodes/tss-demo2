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

import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
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
    </motion.div>
  );
}
