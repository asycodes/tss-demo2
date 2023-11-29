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
  const [removeshadow, setremoveShadow] = useState(false);
  const [reducediv, setReduceDiv] = useState(false);
  //   const [removeshadow, setremoveShadow] = useState(false);
  const [test, setTest] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setZoom1(true);
    }, 1000);
    setTimeout(() => {
      setZoom2(true);
    }, 5000);
    setTimeout(() => {
      setremoveShadow(true);
    }, 7000);
    setTimeout(() => {
      setremoveShadow(true);
    }, 7000);
    setTimeout(() => {
      setReduceDiv(true);
    }, 13000);
  }, []);

  return (
    <motion.div className=" max-h-screen max-w-screen h-screen w-screen flex flex-col items-center overflow-hidden ">
      {reducediv ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: reducediv ? 1 : 0,
            height: reducediv ? "auto" : 0,
            //   width: removeshadow ? "130%" : "100%",
          }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            // delay:1,
            duration: 1,
          }}
          className="mt-[1rem] flex flex-col z-10 w-11/12"
        >
          <p className="text-2xl">Valerie's</p>
          <p className="text-2xl">Transition Galaxy</p>
        </motion.div>
      ) : null}
      <motion.div
        initial={{}}
        animate={{}}
        transition={{
          ease: "easeInOut",
          type: "spring",
          stiffness: 15,

          duration: 1,
        }}
        className="flex  w-screen h-screen relative justify-center items-center overflow-hidden "
        style={{
          maxHeight: reducediv ? "20rem" : "100vh",
          height: reducediv ? "20rem" : "100vh",
          //   marginTop: reducediv ? "1rem" : "0",
          //   position: reducediv ? "relative" : "absolute",
          transition:
            "height 2s ease, margin-top 2s ease, max-height 2s ease, position 1s ease",
        }}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{
            scale: removeshadow ? 0.63 : 1,
            width: removeshadow ? "140%" : "100%",
            //   y: removeshadow ? -100 : 0,
          }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            delay: 2,
            duration: 1,
          }}
          className="h-screen w-screen flex flex-col items-center justify-center absolute overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: removeshadow ? 1 : 0,
              // y: removeshadow ? -80 : 0,
            }}
            transition={{
              ease: "easeInOut",
              type: "spring",
              stiffness: 15,
              delay: 3,
              duration: 1,
            }}
            className="flex flex-row   w-[31rem] h-[31rem] absolute z-10 overflow-hidden "
          >
            <div className="  flex w-1/12 h-full justify-center items-center">
              <div className="w-[2rem] h-[2rem] rounded-full  mt-[7rem] bg-white"></div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end">
                <div className="w-[2rem] h-[2rem] rounded-full  bg-white"></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                {/* <div className="w-[2rem] h-[2rem] rounded-full  bg-white"></div> */}
              </div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div className="w-[2rem] h-[2rem] rounded-full mb-[7rem]  bg-white"></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                {/* <div className="w-[2rem] h-[2rem] rounded-full bg-white"></div> */}
              </div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end">
                <div className="w-[2rem] h-[2rem] rounded-full  bg-white"></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div className="w-[2rem] h-[2rem] rounded-full mb-[3rem]  bg-white"></div>
              </div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div className="w-[2rem] h-[2rem] rounded-full mb-[1rem] bg-white"></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                {/* <div className="w-[2rem] h-[2rem] rounded-full mt-[6rem] bg-white"></div> */}
              </div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end">
                <div className="w-[2rem] h-[2rem] rounded-full mb-[3rem] bg-white"></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div className="w-[2rem] h-[2rem] rounded-full mt-[8rem] bg-white"></div>
              </div>
            </div>
            <div className="  flex w-1/12 h-full justify-center items-center">
              {/* <div className="w-[2rem] h-[2rem] rounded-full  bg-white"></div> */}
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end">
                {/* <div className="w-[2rem] h-[2rem] rounded-full mb-[3rem] bg-white"></div> */}
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                {/* <div className="w-[2rem] h-[2rem] rounded-full mt-[8rem] bg-white"></div> */}
              </div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end">
                <div className="w-[2rem] h-[2rem] rounded-full mb-[3rem] bg-white"></div>
                <div className="w-[2rem] h-[2rem] rounded-full mb-[6rem] bg-white"></div>
                <div className="w-[2rem] h-[2rem] rounded-full  bg-white"></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-start">
                <div className="w-[2rem] h-[2rem] rounded-full mt-[5rem] bg-white"></div>
              </div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end">
                {/* <div className="w-[2rem] h-[2rem] rounded-full mb-[5rem] bg-white"></div> */}
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div className="w-[2rem] h-[2rem] rounded-full mt-[5rem] bg-white"></div>
              </div>
            </div>
            <div className="  flex w-1/12 h-full justify-center items-center">
              <div className="w-[2rem] h-[2rem] rounded-full  bg-white"></div>
            </div>
            <div className="  flex w-1/12 h-full justify-center items-center">
              <div className="w-[2rem] h-[2rem] rounded-full mb-[18rem] bg-white"></div>
            </div>
            <div className="  flex w-1/12 h-full justify-center items-center">
              <div className="w-[2rem] h-[2rem] rounded-full mt-[8rem] bg-white"></div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={[
              { opacity: zoom1 ? 1 : 0, scale: zoom1 ? 0.65 : 1 },
              {
                opacity: zoom1 ? 1 : 0,
                scale: zoom2 ? 0.2 : 0.65,
              },
            ]}
            transition={{
              ease: "easeInOut",
              type: "spring",
              stiffness: 15,
              // delay: 1,
              duration: 1,
              repeat: 0,
            }}
            className="h-[150rem] w-[150rem]  border-dashed absolute border-[0.8rem] rounded-full overflow-hidden flex items-center justify-center"
          >
            <div className="h-[125rem] w-[125rem] border-dashed absolute border-[0.8rem] rounded-full overflow-hidden flex items-center justify-center">
              <motion.div className="h-[100rem] w-[100rem] border-dashed absolute border-[0.8rem] rounded-full overflow-hidden flex items-center justify-center">
                <motion.div className="h-[75rem] w-[75rem] border-dashed absolute border-[0.8rem] rounded-full overflow-hidden flex items-center justify-center">
                  <motion.div className="h-[50rem] w-[50rem] border-dashed absolute border-[0.8rem] rounded-full overflow-hidden flex items-center justify-center"></motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: removeshadow ? 1 : 0 }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            delay: 3,
            duration: 1,
          }}
          className="w-screen h-[3rem] bg-black "
        ></motion.div> */}
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: removeshadow ? 1 : 0 }}
            transition={{
              ease: "easeInOut",
              type: "spring",
              stiffness: 15,
              delay: 4,
              duration: 1,
              repeat: 0,
            }}
            className="w-[0.8rem] h-screen bg-[#474545] overflow-hidden absolute"
          ></motion.div>
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ opacity: 1, scale: zoom1 ? 0.7 : 1 }}
            transition={{
              ease: "easeInOut",
              type: "spring",
              //   delay: 2,
              stiffness: 10,
              duration: 1,
            }}
            className="w-10/12 h-screen max-h-screen flex flex-col justify-center  items-center overflow-hidden
        text-start "
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: zoom2 ? 0.4 : 1 }}
              transition={{
                ease: "easeInOut",
                type: "spring",
                //   delay: 2,
                stiffness: 15,
                duration: 1,
              }}
              className="h-1/2 w-full flex flex-wrap justify-center items-center overflow-hidden"
            >
              <motion.div className="h-[16rem]  w-[16rem] rounded-full fixed  border-[0.8rem] border-white "></motion.div>
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
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            // animate={{ opacity: zoom1 ? 0.6 : 0 }}
            animate={{ opacity: removeshadow ? 0 : zoom1 ? 0.6 : 0 }}
            transition={{
              ease: "easeInOut",
              type: "spring",
              stiffness: 15,
              duration: 1,
            }}
            className="h-screen w-screen bg-black absolute opacity-40 overflow-hidden"
          ></motion.div>
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: removeshadow ? 0 : zoom1 ? 1 : 0 }}
            transition={{
              ease: "easeInOut",
              type: "spring",
              stiffness: 15,
              duration: 1,
            }}
            className="h-screen overflow-hidden w-10/12 absolute text gap-5 flex flex-col justify-center item-center font-bold "
          >
            <div>
              <p>We are now generating your</p>
              <p className="underline">Transition Galaxy</p>
            </div>
            <p>
              This journey isn't just about wandering into the unknown; it's
              about converting your multifaceted persona into actionable paths.
            </p>
            <p>
              It's an exhilarating quest that promises to materialize your
              potential, illuminate diverse career avenues, and reveal the
              unexplored dimensions of your professional galaxy!
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      {reducediv ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: reducediv ? 1 : 0,
            height: reducediv ? "auto" : 0,
            //   width: removeshadow ? "130%" : "100%",
          }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            // delay:1,
            duration: 1,
          }}
          className="flex flex-col justify-center items-center   w-11/12"
        >
          <div className="flex mt-[1rem] mb-[1rem] flex-row">
            <button className="p-2 bg-[#C4C4C4] rounded-lg mr-[1rem]">
              {" "}
              Within Industry{" "}
            </button>
            <button className="p-2 bg-[#C4C4C4] rounded-lg ml-[1rem]">
              {" "}
              Outside Industry{" "}
            </button>
          </div>
          <div className="border opacity-70 w-full border-white border-dashed"></div>
          <div className="flex flex-col mt-[1rem] w-full">
            <div className="flex flex-row w-full">
              <div className="w-1/6 justify-center items-center flex">
                <div className="h-[1rem] w-[1rem] rounded-full bg-white"></div>
              </div>
              <div className="w-5/6 text-lg">
                <p>Industrial Designer</p>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="w-1/6 justify-center items-center flex">
                <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-white"></div>
              </div>
              <div className="w-5/6 text-lg">
                <p>Graphic Designer</p>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="w-1/6 justify-center items-center flex">
                <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-white"></div>
              </div>
              <div className="w-5/6 text-lg">
                <p>UIUX Designer</p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
