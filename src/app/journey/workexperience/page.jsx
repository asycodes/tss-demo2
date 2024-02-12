"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navburger from "@/app/components/navburger";
import tsslogo from "public/tss_light.svg";
import tesalogo from "public/TESALOGO.svg";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const router = useRouter();

  function handleYes() {
    router.push({
      pathname: "/journey/occupations",
      query: { workexperience: true },
    });
  }

  function handleNo() {
    router.push({
      pathname: "/journey/occupations",
      query: { workexperience: false },
    });
    console.log(router);
  }

  return (
    <motion.div className="h-screen w-screen overflow-scroll">
      <motion.div
        className="w-full flex flex-col justify-center items-center "
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          type: "spring",
          stiffness: 15,
          duration: 2,
        }}
      >
        <div className="w-10/12  flex flex-col justify-center text-start ">
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              ease: "easeInOut",
              type: "spring",
              stiffness: 15,
              duration: 3,
            }}
          >
            <Image
              src={tsslogo}
              width={60}
              alt="TESA Logo"
              className="mt-[2rem]"
            ></Image>
            <div className="flex flex-col gap-5 text-3xl mt-[1rem]">
              <p className="">
                Hello! Welcome to your journey through the universe of careers!
              </p>
              <p>
                To help you plan your journey, we first need to know
                <u> if you have had any work experience </u>before.
              </p>
            </div>
            <button
              //   onClick={handleYes}
              className=" w-full bg-[#D9D9D9] p-[1rem]  text-sm text-[#474545] font-bold mt-[3rem] rounded-full"
            >
              <a href="/journey/occupations">Yes. I have Work Experience.</a>
            </button>
            <button
              //   onClick={handleNo}
              className=" w-full p-[1rem] text-sm border font-bold mt-[1rem] mb-[4rem] rounded-full"
            >
              <a href="/journey/occupations">
                No, I do not have Work Experience.
              </a>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
