"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import tssinfo from "public/info.svg";
import tssinteract from "public/interact.svg";
import tssmental from "public/mental.svg";
import tsswork from "public/work.svg";
import { personas } from "@/app/components/persona";

export default function Page() {
  const [unblur, setUnblur] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const colorArray = ["#F3D5A3", "#F8B3A5", "#A5DAC5", "#AFB7E0"];
  const [showsummary, setShowSummary] = useState(false);
  const router = useRouter();
  const [personaDesc, setPersonaDesc] = useState({});
  // Dummy data to be replace with numbers passed from prev
  const totalI = 5;
  const totalF = 4;
  const totalM = 6;
  const totalW = 2;
  const selectedI = 3;
  const selectedF = 4;
  const selectedM = 2;
  const selectedW = 1;
  const descriptions = [
    {
      type: "Mental Processes",
      desc: " refers to tasks where processing, planning, problem-solving, decision-making, and innovating activities are performed.",
      imagesrc: tssmental,
      number: selectedM,
      letter: "M",
      color: "#F3D5A3",
    },
    {
      type: "Information Outputs",
      desc: " refers to tasks where and how are the information and data gained that are needed.",
      imagesrc: tssinfo,
      number: selectedF,
      letter: "F",
      color: "#F8B3A5",
    },
    {
      type: "Interacting with Others",
      desc: " Interacting with Others refers to tasks where interactions with other persons or supervisory activities occur.",
      imagesrc: tssinteract,
      number: selectedI,
      letter: "I",
      color: "#A5DAC5",
    },
    {
      type: "Work Outputs",
      desc: " Work Outputs refers to tasks where physical activities are performed, what equipment and vehicles are operated/controlled, and what complex/technical activities are accomplished.",
      imagesrc: tsswork,
      number: selectedW,
      letter: "W",
      color: "#AFB7E0",
    },
  ];
  const sortedDescriptions = [...descriptions].sort(
    (a, b) => b.number - a.number
  );
  function handleNext() {
    router.push("/journey/hobbies");
  }
  function getPersona() {
    let p = "";
    for (let i = 0; i < sortedDescriptions.length; i++) {
      const taskLetter = sortedDescriptions[i].letter;
      p = p + taskLetter;
    }
    return p;
  }

  const persona = getPersona();

  const calculateScale = (selected, total) => {
    return selected === total ? 0.95 : total === 0 ? 0 : selected / total;
  };

  const handleArrowClick = () => {
    if (currentIndex === 3) {
      setShowSummary(true);
    } else
      setCurrentIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
  };

  useEffect(() => {
    setTimeout(() => {
      setUnblur(true);
    }, 2000);
    const p = personas.filter((obj) => {
      return obj.letters === persona;
    });
    setPersonaDesc(p);
    console.log(personaDesc);
  }, []);

  return (
    <motion.div className="h-screen w-screen overflow-scroll ">
      {showsummary ? (
        <motion.div
          className="w-full flex flex-col justify-center items-center "
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: unblur ? 1 : 0 }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            duration: 2,
          }}
        >
          <div className="w-10/12 h-screen flex flex-col  text-start ">
            <p className="mt-[3rem] mb-[1rem]">
              Based on your choices, you have selected
            </p>
            <div className="flex flex-col gap-5 w-full">
              {sortedDescriptions.map((desc, index) => (
                <div className="flex flex-row" key={index}>
                  <div className={`flex flex-row w-3/12 `}>
                    <div
                      className={`w-[4rem] h-[4rem] flex justify-center items-center rounded-full bg-[${desc.color}]`}
                    >
                      <Image
                        src={desc.imagesrc}
                        alt="TSS Logo"
                        width={30}
                        height={30}
                        className=" w-[4rem] h-[4rem] brightness-200"
                      ></Image>
                    </div>
                  </div>
                  <div className="flex flex-col w-9/12">
                    <p className={`text-3xl font-bold text-[${desc.color}]`}>
                      {desc.number}
                    </p>
                    <p className={`text-md text-[${desc.color}]`}>
                      <b>{desc.type}</b> Tasks
                    </p>
                  </div>
                </div>
              ))}

              <p>
                This shows that you can identify as a{" "}
                {persona.split("").map((letter, index) => (
                  <span
                    key={index}
                    style={{ color: sortedDescriptions[index].color }}
                    className="font-bold"
                  >
                    {letter}
                  </span>
                ))}{" "}
                <u>
                  {" "}
                  <i>Career Task Persona.</i>{" "}
                </u>
              </p>
              <p className="">
                This means you are a {personaDesc[0].name} in your career.
                {personaDesc[0].desc}
              </p>
              <button
                onClick={handleNext}
                className="w-[2rem] h-[2rem] bg-[#908F8F] rounded-full flex justify-center items-center self-end mb-[4rem] "
              >
                <FiChevronRight className="w-[1.5rem] h-[1.5rem] text-[#474545]" />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="h-screen w-screen absolute flex flex-row -z-10 flex-wrap overflow-hidden">
            {/* Ball A */}
            <div
              className={`"h-1/2 w-1/2 flex flex-col " ${
                unblur ? "items-end justify-end" : "items-center justify-center"
              } `}
            >
              <motion.div
                className={`rounded-full bg-[#F3D5A3] w-[10rem] h-[10rem] flex justify-center object items-center ${
                  unblur ? "" : "blur-lg opacity-60 "
                } `}
                style={{
                  scale: calculateScale(selectedI, totalI, unblur),
                }}
              >
                {currentIndex === 0 ? (
                  <div className="w-full h-full flex rounded">
                    <Image
                      src={tssmental}
                      alt="TSS Logo"
                      className=" brightness-200 w-full h-full"
                    ></Image>
                    <div className="bg-[#F7E90D] opacity-50 blur-lg absolute w-full h-full rounded-full"></div>
                  </div>
                ) : null}
              </motion.div>
            </div>
            {/* Ball B */}
            <div
              className={`"h-1/2 w-1/2 flex flex-col " ${
                unblur
                  ? "items-start justify-end"
                  : "items-center justify-center"
              } `}
            >
              <motion.div
                className={`rounded-full bg-[#F8B3A5] w-[10rem] h-[10rem] ${
                  unblur ? "" : "blur-lg opacity-60"
                } `}
                style={{
                  scale: calculateScale(selectedF, totalF, unblur),
                }}
              >
                {currentIndex === 1 ? (
                  <div className="w-full h-full flex rounded">
                    <Image
                      src={tssinfo}
                      alt="TSS Logo"
                      className=" brightness-200 w-full h-full "
                    ></Image>
                    <div className="bg-[#F1684C] absolute opacity-50 blur-lg  w-full h-full rounded-full"></div>
                  </div>
                ) : null}
              </motion.div>
            </div>
            {/* Ball C */}
            <div
              className={`"h-1/2 w-1/2 flex flex-col " ${
                unblur
                  ? "items-end justify-start"
                  : "items-center justify-center"
              } `}
            >
              <motion.div
                className={`rounded-full bg-[#A5DAC5] w-[10rem] h-[10rem] ${
                  unblur ? "" : "blur-lg opacity-60"
                } `}
                style={{
                  scale: calculateScale(selectedM, totalM, unblur),
                }}
              >
                {" "}
                {currentIndex === 2 ? (
                  <div className="w-full h-full flex rounded">
                    <Image
                      src={tssinteract}
                      alt="TSS Logo"
                      className=" brightness-200 w-full h-full"
                    ></Image>
                    <div className="bg-[#9CD1BC] opacity-50 blur-lg absolute w-full h-full rounded-full"></div>
                  </div>
                ) : null}
              </motion.div>
            </div>
            {/* Ball D */}
            <div
              className={`"h-1/2 w-1/2 flex flex-col " ${
                unblur
                  ? "items-start justify-start"
                  : "items-center justify-center"
              } `}
            >
              <motion.div
                className={`rounded-full bg-[#AFB7E0] w-[10rem] h-[10rem] ${
                  unblur ? "" : "blur-lg opacity-60"
                } `}
                style={{
                  scale: calculateScale(selectedW, totalW, unblur),
                }}
              >
                {" "}
                {currentIndex === 3 ? (
                  <div className="w-full h-full flex rounded">
                    <Image
                      src={tsswork}
                      alt="TSS Logo"
                      className=" brightness-200 w-full h-full"
                    ></Image>
                    <div className="bg-[#A6AED7] opacity-50 blur-lg absolute w-full h-full rounded-full"></div>
                  </div>
                ) : null}
              </motion.div>
            </div>
          </div>
          <motion.div
            className="w-full flex flex-col justify-center items-center "
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: unblur ? 1 : 0 }}
            transition={{
              ease: "easeInOut",
              type: "spring",
              stiffness: 15,
              duration: 2,
            }}
          >
            <div className="w-10/12 h-screen flex flex-col  text-start justify-between ">
              <div className="mt-[3rem]">
                <p>
                  You have selected {descriptions[currentIndex].number} Tasks
                  based on
                </p>
                <p
                  className={`text-[${colorArray[currentIndex]}] font-bold text-xl`}
                >
                  {descriptions[currentIndex].type}
                </p>
              </div>

              <div className=" mt-[1rem] mb-[1rem] flex flex-col ">
                <p>
                  <b className={`text-[${colorArray[currentIndex]}]`}>
                    {descriptions[currentIndex].type}
                  </b>
                  {descriptions[currentIndex].desc}
                </p>
                <button
                  onClick={handleArrowClick}
                  className="w-[2rem] h-[2rem] bg-[#908F8F] rounded-full flex justify-center items-center self-end "
                >
                  <FiChevronRight className="w-[1.5rem] h-[1.5rem] text-[#474545]" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
