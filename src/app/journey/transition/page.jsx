"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import tssinfo from "public/info.svg";
import tss from "public/tss_light.svg";
import tssinteract from "public/interact.svg";
import tssmental from "public/mental.svg";
import tsswork from "public/work.svg";
import { personas } from "@/app/components/persona";

export default function Page() {
  const router = useRouter();
  // Dummy data to be replace with numbers combined from hobbies task persona and career task persona

  function handleNext() {
    router.push("/journey/transition");
  }
  const [combinedTasksInfo, setCombinedTasksInfo] = useState({
    I: { number: 6, letter: "I" },
    F: { number: 8, letter: "F" },
    M: { number: 7, letter: "M" },
    W: { number: 5, letter: "W" },
  });

  const calculateScale = (selected, total) => {
    return selected === total ? 0.95 : total === 0 ? 0 : selected / total;
  };

  const mostcombinedTasks = Math.max(
    combinedTasksInfo.M.number,
    combinedTasksInfo.I.number,
    combinedTasksInfo.F.number,
    combinedTasksInfo.W.number
  );

  const [zoom1, setZoom1] = useState(false);
  const [zoom2, setZoom2] = useState(false);
  const [test, setTest] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setZoom1(true);
    }, 2000);
    setTimeout(() => {
      setZoom2(true);
    }, 5000);
  }, []);

  return (
    <motion.div className=" max-h-screen max-w-screen h-screen w-screen flex items-center justify-center overflow-hidden ">
      <div className="h-screen w-screen flex items-center justify-center absolute overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={[
            { opacity: 1, scale: zoom1 ? 0.7 : 1 },
            {
              opacity: 1,
              scale: zoom1 && zoom2 ? 0.6 : 0.7,
              transition: {
                ease: "easeInOut",
                type: "spring",
                stiffness: 15,
                duration: 1, // Specify duration for second zoom
              },
            },
          ]}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            // delay: 1,
            duration: 1, // Duration for the first zoom animation
            repeat: 0, // Prevent infinite looping
          }}
          className="h-[70rem] w-[70rem] border-dashed absolute border-[0.5rem] rounded-full overflow-hidden flex items-center justify-center"
        >
          <motion.div className="h-[60rem] w-[60rem] border-dashed absolute border-[0.5rem] rounded-full overflow-hidden"></motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={
          //   ({ opacity: 1, scale: zoom1 ? 0.5 : 1 },
          //   { opacity: 1, scale: zoom1 ? 0.5 : 1 })
          { opacity: 1, scale: zoom1 ? 0.5 : 1 }
        }
        transition={{
          ease: "easeInOut",
          type: "spring",
          stiffness: 15,
          duration: 1,
        }}
        className="w-10/12 h-screen max-h-screen flex flex-col justify-center items-center overflow-hidden
        text-start "
      >
        <div className="h-1/2 w-full flex flex-wrap justify-center items-center">
          <motion.div className="h-[16rem] w-[16rem] rounded-full fixed  border-[0.5rem]   border-white "></motion.div>
          <div className="h-1/2 w-1/2 flex justify-end items-end">
            <div
              style={{
                scale: calculateScale(
                  combinedTasksInfo.M.number,
                  mostcombinedTasks
                ),
              }}
              className="h-[8rem] w-[8rem] bg-[#F3D5A3] rounded-full "
            ></div>
          </div>
          <div className="h-1/2 w-1/2 flex justify-start items-end">
            <div
              style={{
                scale: calculateScale(
                  combinedTasksInfo.F.number,
                  mostcombinedTasks
                ),
              }}
              className="h-[8rem] w-[8rem] bg-[#F8B3A5] rounded-full"
            ></div>
          </div>
          <div className="h-1/2 w-1/2 flex justify-end items-start">
            <div
              style={{
                scale: calculateScale(
                  combinedTasksInfo.I.number,
                  mostcombinedTasks
                ),
              }}
              className="h-[8rem] w-[8rem] bg-[#A5DAC5] rounded-full"
            ></div>
          </div>
          <div className="h-1/2 w-1/2 flex justify-start items-start">
            <div
              style={{
                scale: calculateScale(
                  combinedTasksInfo.W.number,
                  mostcombinedTasks
                ),
              }}
              className="h-[8rem] w-[8rem] bg-[#AFB7E0] rounded-full"
            ></div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ opacity: zoom1 ? 0.6 : 0 }}
        transition={{
          ease: "easeInOut",
          type: "spring",
          stiffness: 15,
          duration: 2,
        }}
        className="h-screen w-screen bg-black absolute opacity-40 overflow-hidden"
      ></motion.div>

      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: zoom1 ? 1 : 0 }}
        transition={{
          ease: "easeInOut",
          type: "spring",
          stiffness: 15,
          duration: 2,
        }}
        className="h-screen overflow-hidden w-10/12 absolute text gap-5 flex flex-col justify-center item-center font-bold "
      >
        <div>
          <p>We are now generating your</p>
          <p className="underline">Transition Galaxy</p>
        </div>
        <p>
          This journey isn't just about wandering into the unknown; it's about
          converting your multifaceted persona into actionable paths.
        </p>
        <p>
          It's an exhilarating quest that promises to materialize your
          potential, illuminate diverse career avenues, and reveal the
          unexplored dimensions of your professional galaxy!
        </p>
      </motion.div>
    </motion.div>
  );
}
