"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import tssinfo from "public/Information Output.svg";
import tssinteract from "public/Interact_new.svg";
import tssmental from "public/Mental.svg";
import tsswork from "public/Work Output.svg";
import { personas } from "@/app/components/persona";

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const colorArray = ["#F3D5A3", "#F8B3A5", "#A5DAC5", "#AFB7E0"];
  const [showsummary, setShowSummary] = useState(false);
  const [merge, setMerge] = useState(false);
  const [personaDesc, setPersonaDesc] = useState({});
  const [appearText, setAppearText] = useState(false);
  const [removeDiv, setRemoveDiv] = useState(false);
  const router = useRouter();
  // Dummy data to be replace with numbers combined from hobbies task persona and career task persona
  const [careertasksInfo, setCareerTasksInfo] = useState({
    selectedI: 4,
    selectedF: 7,
    selectedM: 5,
    selectedW: 3,
  });
  const [hobbiestasksInfo, setHobbiesTasksInfo] = useState({
    selectedI: 2,
    selectedF: 2,
    selectedM: 6,
    selectedW: 4,
  });

  function combineTasks() {}

  const [combinedTasksInfo, setCombinedTasksInfo] = useState({
    I: { number: 6, letter: "I" },
    F: { number: 8, letter: "F" },
    M: { number: 7, letter: "M" },
    W: { number: 5, letter: "W" },
  });

  // Function to combine tasks from career and hobbies, remove duplicates
  function getPersona() {
    let p = "";
    const sorted = Object.values(combinedTasksInfo).sort(
      (a, b) => b.number - a.number
    );

    for (let i = 0; i < sorted.length; i++) {
      const taskLetter = sorted[i].letter;
      p = p + taskLetter;
    }

    return p;
  }

  const persona = getPersona();

  const mostcareerTasks = Math.max(
    careertasksInfo.selectedM,
    careertasksInfo.selectedI,
    careertasksInfo.selectedF,
    careertasksInfo.selectedW
  );
  const mosthobbiesTasks = Math.max(
    hobbiestasksInfo.selectedM,
    hobbiestasksInfo.selectedI,
    hobbiestasksInfo.selectedF,
    hobbiestasksInfo.selectedW
  );

  const mostcombinedTasks = Math.max(
    combinedTasksInfo.M.number,
    combinedTasksInfo.I.number,
    combinedTasksInfo.F.number,
    combinedTasksInfo.W.number
  );
  const calculateScale = (selected, total) => {
    return selected === total ? 0.95 : total === 0 ? 0 : selected / total;
  };

  useEffect(() => {
    setTimeout(() => {
      setMerge(true);
    }, 1500);
    setTimeout(() => {
      setRemoveDiv(true);
    }, 6500);
    setTimeout(() => {
      setAppearText(true);
    }, 11000);
  }, []);

  function handleNext() {
    router.push("/journey/summary/results");
  }

  return (
    <motion.div className="h-screen w-screen flex-col justify-center items-center flex overflow-scroll ">
      {removeDiv ? (
        <motion.div
          className="w-full flex flex-col justify-center items-center "
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: removeDiv ? -150 : 0, opacity: removeDiv ? 1 : 0 }}
          transition={{
            // ease: "easeInOut",
            // type: "spring",
            // stiffness: 15,
            // duration: 2,
            // delay: 1,
            y: {
              ease: "easeInOut",
              type: "spring",
              stiffness: 15,
              delay: 2,
              duration: 0.5,
            },
            opacity: {
              ease: "easeInOut",
              type: "spring",
              stiffness: 15,
              duration: 0.5, // Adjust the duration of the opacity transition
            },
          }}
        >
          <div className="w-10/12 h-screen flex flex-col justify-center items-center text-start ">
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
                >
                  {" "}
                  <Image
                    src={tssmental}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
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
                >
                  <Image
                    src={tssinfo}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
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
                >
                  {" "}
                  <Image
                    src={tssinteract}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
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
                >
                  <Image
                    src={tsswork}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
      {appearText ? (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            duration: 2,
            delay: 1,
          }}
          className="flex h-screen absolute mt-[20rem] flex-col gap-5 text-md w-10/12 justify-center items-center text-start"
        >
          <p>
            <u>
              <i>Together</i>
            </u>
            , Valerie, you can identify as a {persona}
            <i>
              <u> Task Persona.</u>
            </i>
          </p>
          <p>
            As an Insightful Specialist, you excels in gaining information,
            possesses technical expertise, and leverages mental processes to
            provide valuable insights.
          </p>
          <button className="w-[2rem] h-[2rem] bg-[#908F8F] rounded-full flex justify-center items-center self-end mb-[4rem] ">
            <FiChevronRight
              onClick={handleNext}
              className="w-[1.5rem] h-[1.5rem] text-[#474545]"
            />
          </button>
        </motion.div>
      ) : null}
      {removeDiv ? null : (
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
          <div className="w-10/12 h-screen flex flex-col  text-start ">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: merge ? 100 : 0, opacity: merge ? 0 : 1 }}
              transition={{
                // ease: "easeInOut",
                // type: "spring",
                // stiffness: 15,
                // delay: 2,
                // duration: 3,
                y: {
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 15,
                  delay: 2,
                  duration: 1.75,
                },
                opacity: {
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 15,
                  delay: 3, // Adjust this delay as needed
                  duration: 0.5, // Adjust the duration of the opacity transition
                },
              }}
              className="h-1/2 w-full flex justify-center items-center flex-wrap"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 15,
                  delay: 1.5,
                  duration: 1,
                }}
                className="h-[16rem] w-[16rem] rounded-full absolute border-[0.5rem]  border-white "
              ></motion.div>
              <div className="h-1/2 w-1/2 flex justify-end items-end">
                <div
                  style={{
                    scale: calculateScale(
                      careertasksInfo.selectedM,
                      mostcareerTasks
                    ),
                  }}
                  className="h-[8rem] w-[8rem] bg-[#F3D5A3] rounded-full "
                >
                  {" "}
                  <Image
                    src={tssmental}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
              <div className="h-1/2 w-1/2 flex justify-start items-end">
                <div
                  style={{
                    scale: calculateScale(
                      careertasksInfo.selectedF,
                      mostcareerTasks
                    ),
                  }}
                  className="h-[8rem] w-[8rem] bg-[#F8B3A5] rounded-full"
                >
                  {" "}
                  <Image
                    src={tssinfo}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
              <div className="h-1/2 w-1/2 flex justify-end items-start">
                <div
                  style={{
                    scale: calculateScale(
                      careertasksInfo.selectedI,
                      mostcareerTasks
                    ),
                  }}
                  className="h-[8rem] w-[8rem] bg-[#A5DAC5] rounded-full"
                >
                  {" "}
                  <Image
                    src={tssinteract}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
              <div className="h-1/2 w-1/2 flex justify-start items-start">
                <div
                  style={{
                    scale: calculateScale(
                      careertasksInfo.selectedW,
                      mostcareerTasks
                    ),
                  }}
                  className="h-[8rem] w-[8rem] bg-[#AFB7E0] rounded-full"
                >
                  {" "}
                  <Image
                    src={tsswork}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: merge ? -100 : 0, opacity: merge ? 0 : 1 }}
              transition={{
                y: {
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 15,
                  delay: 2,
                  duration: 1.75,
                },
                opacity: {
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 15,
                  delay: 3, // Adjust this delay as needed
                  duration: 0.5, // Adjust the duration of the opacity transition
                },
              }}
              className="h-1/2 w-full justify-center items-center  flex flex-wrap"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 15,
                  delay: 1.5,
                  duration: 1,
                }}
                className="h-[16rem] w-[16rem] rounded-full absolute border-[0.5rem]  border-white "
              ></motion.div>
              <div className="h-1/2 w-1/2 flex justify-end items-end">
                <div
                  style={{
                    scale: calculateScale(
                      hobbiestasksInfo.selectedM,
                      mosthobbiesTasks
                    ),
                  }}
                  className="h-[8rem] w-[8rem]  bg-[#F3D5A3] rounded-full  "
                >
                  {" "}
                  <Image
                    src={tssmental}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
              <div className="h-1/2 w-1/2 flex justify-start items-end">
                <div
                  style={{
                    scale: calculateScale(
                      hobbiestasksInfo.selectedF,
                      mosthobbiesTasks
                    ),
                  }}
                  className="h-[8rem] w-[8rem] bg-[#F8B3A5] rounded-full"
                >
                  {" "}
                  <Image
                    src={tssinfo}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
              <div className="h-1/2 w-1/2 flex justify-end items-start">
                <div
                  style={{
                    scale: calculateScale(
                      hobbiestasksInfo.selectedI,
                      mosthobbiesTasks
                    ),
                  }}
                  className="h-[8rem] w-[8rem] bg-[#A5DAC5] rounded-full"
                >
                  {" "}
                  <Image
                    src={tssinteract}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
              <div className="h-1/2 w-1/2 flex justify-start items-start">
                <div
                  style={{
                    scale: calculateScale(
                      hobbiestasksInfo.selectedW,
                      mosthobbiesTasks
                    ),
                  }}
                  className="h-[8rem] w-[8rem] bg-[#AFB7E0] rounded-full "
                >
                  {" "}
                  <Image
                    src={tsswork}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
