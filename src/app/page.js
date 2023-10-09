"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BallBG from "./components/ball";
import Image from "next/image";
import tsslogo from "public/tss.svg";
// import test from "../components/test.mp4";
// First page theyll see for the app!

export default function Page() {
  const router = useRouter();
  const words = [
    "100 Ways",
    "Design your career",
    "Data-Driven",
    "Career Transitions",
  ];

  const [text, setText] = useState(words[0]);
  const [scrollUp, setScrollUp] = useState(false);
  const [removeDiv, setRemoveDiv] = useState(false);
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
    setInterval(() => {
      setRemoveDiv(true);
    }, 2500);
  }
  return (
    <div className="h-screen max-w-screen max-h-screen w-screen flex justify-center overflow-x-hidden">
      {removeDiv ? (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: 10,
            opacity: 1,
          }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 20,
            duration: 1,
          }}
          className="flex flex-col w-full p-5"
        >
          <div className="flex flex-col w-full text-left mb-5 ">
            <div className="flex flex-row w-full">
              <Image
                src={tsslogo}
                width={20}
                height={20}
                alt="TSS Logo"
                className="mr-2"
              ></Image>
              <a href="/journey">
                <h1 className="text-[1.5rem] font-bold">Task Skills Stack</h1>
              </a>
            </div>
            <p className="w-[18rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh
              massa, consequat sit amet scelerisque at, mattis vitae mi. In arcu
              urna, interdum sit amet lacus quis, gravida posuere tellus. Sed
              mollis tristique ipsum, eu bibendum ante lacinia eget.
            </p>
          </div>
          <div className="flex flex-col w-full mb-5 items-end">
            <div className="flex flex-row w-full justify-end ">
              <Image
                src={tsslogo}
                width={20}
                height={20}
                alt="TSS Logo"
                className="mr-2"
              ></Image>
              <h1 className="text-[1.5rem] font-bold">
                Multi Stage Transition
              </h1>
            </div>

            <p className="w-[18rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh
              massa, consequat sit amet scelerisque at, mattis vitae mi. In arcu
              urna, interdum sit amet lacus quis, gravida posuere tellus. Sed
              mollis tristique ipsum, eu bibendum ante lacinia eget.
            </p>
          </div>
          <div className="flex flex-col w-full text-left mb-5">
            <div className="flex flex-row w-full">
              <Image
                src={tsslogo}
                width={25}
                height={25}
                alt="TSS Logo"
                className="mr-2"
              ></Image>
              <h1 className="text-[1.5rem] font-bold">Multivitamin Strategy</h1>
            </div>
            <p className="w-[18rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh
              massa, consequat sit amet scelerisque at, mattis vitae mi. In arcu
              urna, interdum sit amet lacus quis, gravida posuere tellus. Sed
              mollis tristique ipsum, eu bibendum ante lacinia eget.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          style={{
            backgroundImage: "linear-gradient(to bottom, #010101 60%, #474545)",
          }}
          className="h-screen max-w-screen max-h-screen w-screen flex justify-center overflow-x-hidden "
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: scrollUp ? -500 : 0, opacity: scrollUp ? 0 : 1 }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 10,
            duration: 2,
          }}
        >
          <BallBG />
          <motion.div className="flex w-full flex-col justify-center h-screen items-center">
            <button className="w-[15rem] h-[12rem]" onClick={handleScroll}>
              <motion.h1
                className="text-[2rem] font-bold z-10 w-[15rem] text-center "
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {text}
              </motion.h1>
            </button>
          </motion.div>
        </motion.div>
      )}
      {/* {removeDiv ? (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: 10,
            opacity: 1,
          }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 20,
            duration: 2,
          }}
        >
          Hello
        </motion.div>
      ) : null} */}
    </div>
  );
}
