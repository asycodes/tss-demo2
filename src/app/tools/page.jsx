"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navburger from "../components/navburger";
import tsslogo from "public/tss_light.svg";
import tesalogo from "public/TESSA_FINAL.svg";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const router = useRouter();
  const [disappear, setDisappear] = useState(false);

  const [name, setName] = useState("");
  const [confirmedName, setconfirmedName] = useState(false);

  function handleNameChange(e) {
    const inputname = e.target.value;
    setName(inputname);
  }

  function handleConfirmName() {
    setconfirmedName(true);
  }

  function handleTSS() {}

  return (
    <motion.div className="h-screen w-screen overflow-scroll">
      <Navburger />

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
              src={tesalogo}
              width={80}
              alt="TESA Logo"
              className="mt-[2rem]"
            ></Image>
          </motion.div>

          {confirmedName ? (
            <motion.div className="text-[1.8rem]">
              <p className="mt-[2rem] ">Ah! Nice to meet you, {name}!</p>
              <p className="mt-[2rem] ">
                You are about to embark on a journey to discover your career
                future.
              </p>
              <p className="mt-[2rem] ">
                To get you started, click on the TASK SKILL STACK Tool below.
              </p>
              <div className=" mt-[3rem] flex w-full h-fit justify-center items-center">
                <button className="border-4 rounded-3xl mb-[5rem]">
                  <a href="/journey/workexperience">
                    <Image
                      src={tsslogo}
                      width={80}
                      alt="TSS Logo"
                      className="ml-[3rem] mr-[3rem] mt-[3rem] mb-[1rem]"
                    ></Image>
                  </a>
                  <p className="mb-[2rem] text-[1rem]">Task Skills Stack</p>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: confirmedName ? 0 : 1 }}
              transition={{
                ease: "easeInOut",
                type: "spring",
                stiffness: 15,
                duration: 1,
              }}
            >
              <div className="flex flex-col mt-[5rem] text-[1.8rem] ">
                <p className="">
                  Welcome! We are <b className="text-[#F8B3A5]">T</b>
                  <b className="text-[#AFB7E0]">E</b>
                  <b className="text-[#F3D5A3]">S</b>
                  <b className="text-[#A5DAC5]">A</b> and we will be assisting
                  in your career future.
                </p>
                <p className="mt-[2rem]">
                  Before we begin, how may I address you?
                </p>
              </div>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold  mt-[3rem] mb-[2rem] rounded-full"
                placeholder="Key in your Name"
              ></input>
              <button
                onClick={handleConfirmName}
                className="w-[2rem] h-[2rem]  mb-[7rem] bg-[#908F8F] rounded-full flex justify-center items-center self-center "
              >
                <FiChevronRight className="w-[1.5rem] h-[1.5rem] text-[#474545]" />
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
