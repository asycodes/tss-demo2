"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import tss from "public/tss_light.svg";
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
  const [removeDiv, setRemoveDiv] = useState(false);
  const router = useRouter();
  // Dummy data to be replace with numbers combined from hobbies task persona and career task persona

  function handleNext() {
    router.push("/journey/transition");
  }

  //get from prev location

  const [combinedTasksInfo, setCombinedTasksInfo] = useState({
    I: {
      number: 6,
      letter: "I",
      color: "#F3D5A3",
      img: tssinteract,
    },
    F: {
      number: 8,
      letter: "F",
      color: "#F8B3A5",
      img: tssinfo,
    },
    M: { number: 7, letter: "M", color: "#A5DAC5", img: tssmental },
    W: {
      number: 5,
      letter: "W",
      color: "#AFB7E0",
      img: tsswork,
    },
  });

  const combinedTasksArray = Object.values(combinedTasksInfo);

  const sortedcombinedTasks = combinedTasksArray.sort(
    (a, b) => b.number - a.number
  );

  const calculateScale = (selected, total) => {
    return selected === total ? 0.95 : total === 0 ? 0 : selected / total;
  };
  const [mostcombinedTasks, setMostCombinedTasks] = useState(7);

  return (
    <motion.div className="h-screen w-screen flex justify-center overflow-scroll ">
      <div className="w-10/12 h-screen flex flex-col text-start ">
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            duration: 1,
          }}
        >
          <Image
            src={tss}
            width={60}
            alt="TESA Logo"
            className="mt-[2rem]"
          ></Image>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            delay: 1,
            duration: 1,
          }}
        >
          <div className="text-start text-2xl mt-[1rem]">
            <p>Valerie's</p>
            <p> Summary</p>
            <p className="mt-[1rem]"> Hobbies x Career</p>
            <p> Task Persona</p>
          </div>
          <div className=" h-[7rem]  w-full flex justify-center items-center ">
            <div className="h-[7rem] w-[7rem] relative flex flex-wrap justify-center items-center  ">
              <div className="h-[5rem] w-[5rem] border-[0.3rem] border-white rounded-full absolute "></div>
              <div className="w-1/2 h-1/2  flex justify-end items-end ">
                <div
                  style={{
                    scale: calculateScale(
                      combinedTasksInfo.M.number,
                      mostcombinedTasks
                    ),
                  }}
                  className="h-[2rem] w-[2rem] m-1 bg-[#F3D5A3] rounded-full "
                >
                  <Image
                    src={tssmental}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
              <div className="w-1/2 h-1/2 flex justify-start items-end">
                <div
                  style={{
                    scale: calculateScale(
                      combinedTasksInfo.F.number,
                      mostcombinedTasks
                    ),
                  }}
                  className="h-[2rem] w-[2rem]  m-1 bg-[#F8B3A5] rounded-full "
                >
                  <Image
                    src={tssinfo}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
              <div className="w-1/2 h-1/2 flex justify-end items-start">
                <div
                  style={{
                    scale: calculateScale(
                      combinedTasksInfo.I.number,
                      mostcombinedTasks
                    ),
                  }}
                  className="h-[2rem] w-[2rem] m-1 bg-[#A5DAC5] rounded-full "
                >
                  <Image
                    src={tssinteract}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
              <div className="w-1/2 h-1/2 flex justify-start items-start">
                <div
                  style={{
                    scale: calculateScale(
                      combinedTasksInfo.W.number,
                      mostcombinedTasks
                    ),
                  }}
                  className="h-[2rem] w-[2rem]   m-1 bg-[#AFB7E0] rounded-full "
                >
                  {" "}
                  <Image
                    src={tsswork}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-2xl">Insightful Specialist</p>
            <div className="flex flex-row mt-[1rem]">
              {sortedcombinedTasks.map((type) => (
                <div key={type.letter} className="w-1/4 flex-row flex">
                  <div
                    className={`w-[2rem] h-[2rem] rounded-full bg-[${type.color}]`}
                  >
                    {" "}
                    <Image
                      src={type.img}
                      alt="TSS Logo"
                      className="  w-full h-full"
                    ></Image>
                  </div>
                  <div
                    className={`ml-1 flex flex-col gap-0 text-[${type.color}]`}
                  >
                    <p>{type.number}</p>
                    <p>{type.letter}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-[1rem]">
              As an{" "}
              <i>
                <u>Insightful Specialist</u>
              </i>
              , you excels in gaining information, possesses technical
              expertise, and leverages mental processes to provide valuable
              insights.
            </p>
          </div>
          <div
            className="w-full mt-[2rem] h-[1px]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #EFAB9D, #EFD19F, #A1D6C1, #ABB3DC)",
            }}
          ></div>
          <div className="mt-[2rem]">
            <div className="flex-row flex w-full justify-between">
              <div className="flex flex-col">
                <p className="text-2xl">Career Task Persona</p>
                <p className="text-md">Industrial designer</p>
              </div>

              <div className="h-[4rem] w-[4rem] relative flex flex-wrap justify-center items-center ">
                <div className="h-[3rem] w-[3rem] border-[0.2rem] border-white rounded-full absolute "></div>
                <div className="w-1/2 h-1/2  flex justify-end items-end ">
                  <div
                    style={{
                      scale: calculateScale(
                        combinedTasksInfo.M.number,
                        mostcombinedTasks
                      ),
                    }}
                    className="h-[1rem] w-[1rem] m-1 bg-[#F3D5A3] rounded-full "
                  >
                    {" "}
                    <Image
                      src={tssmental}
                      alt="TSS Logo"
                      className="  w-full h-full"
                    ></Image>
                  </div>
                </div>
                <div className="w-1/2 h-1/2 flex justify-start items-end">
                  <div
                    style={{
                      scale: calculateScale(
                        combinedTasksInfo.F.number,
                        mostcombinedTasks
                      ),
                    }}
                    className="h-[1rem] w-[1rem]  m-1 bg-[#F8B3A5] rounded-full "
                  >
                    {" "}
                    <Image
                      src={tssinfo}
                      alt="TSS Logo"
                      className="  w-full h-full"
                    ></Image>
                  </div>
                </div>
                <div className="w-1/2 h-1/2 flex justify-end items-start">
                  <div
                    style={{
                      scale: calculateScale(
                        combinedTasksInfo.I.number,
                        mostcombinedTasks
                      ),
                    }}
                    className="h-[1rem] w-[1rem] m-1 bg-[#A5DAC5] rounded-full "
                  >
                    {" "}
                    <Image
                      src={tssinteract}
                      alt="TSS Logo"
                      className="  w-full h-full"
                    ></Image>
                  </div>
                </div>
                <div className="w-1/2 h-1/2 flex justify-start items-start">
                  <div
                    style={{
                      scale: calculateScale(
                        combinedTasksInfo.W.number,
                        mostcombinedTasks
                      ),
                    }}
                    className="h-[1rem] w-[1rem]   m-1 bg-[#AFB7E0] rounded-full "
                  >
                    {" "}
                    <Image
                      src={tsswork}
                      alt="TSS Logo"
                      className="  w-full h-full"
                    ></Image>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-2xl mt-[1rem]">Facilitator Leader</p>
            <div className="flex flex-row mt-[1rem]">
              {sortedcombinedTasks.map((type) => (
                <div key={type.letter} className="w-1/4 flex-row flex">
                  <div
                    className={`w-[2rem] h-[2rem] rounded-full bg-[${type.color}]`}
                  >
                    <Image
                      src={type.img}
                      alt="TSS Logo"
                      className="  w-full h-full"
                    ></Image>
                  </div>
                  <div
                    className={`ml-1 flex flex-col gap-0 text-[${type.color}]`}
                  >
                    <p>{type.number}</p>
                    <p>{type.letter}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-[1rem]">
              As a {""}
              <i>
                <u>Facilitator Leader</u>
              </i>
              , you lead by facilitating interactions, considering work
              requirements and information input.
            </p>
            <div
              className="w-full mt-[2rem] h-[1px]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #EFAB9D, #EFD19F, #A1D6C1, #ABB3DC)",
              }}
            ></div>
          </div>
          <div className="mt-[2rem] flex flex-col">
            <div className="flex-row flex w-full justify-between">
              <div className="flex flex-col">
                <p className="text-2xl">Hobbies Task Persona</p>
                <p className="text-md">Swimming</p>
              </div>

              <div className="h-[4rem] w-[4rem] relative flex flex-wrap justify-center items-center ">
                <div className="h-[3rem] w-[3rem] border-[0.2rem] border-white rounded-full absolute "></div>
                <div className="w-1/2 h-1/2  flex justify-end items-end ">
                  <div
                    style={{
                      scale: calculateScale(
                        combinedTasksInfo.M.number,
                        mostcombinedTasks
                      ),
                    }}
                    className="h-[1rem] w-[1rem] m-1 bg-[#F3D5A3] rounded-full "
                  >
                    <Image
                      src={tssmental}
                      alt="TSS Logo"
                      className="  w-full h-full"
                    ></Image>
                  </div>
                </div>
                <div className="w-1/2 h-1/2 flex justify-start items-end">
                  <div
                    style={{
                      scale: calculateScale(
                        combinedTasksInfo.F.number,
                        mostcombinedTasks
                      ),
                    }}
                    className="h-[1rem] w-[1rem]  m-1 bg-[#F8B3A5] rounded-full "
                  >
                    <Image
                      src={tssinfo}
                      alt="TSS Logo"
                      className="  w-full h-full"
                    ></Image>
                  </div>
                </div>
                <div className="w-1/2 h-1/2 flex justify-end items-start">
                  <div
                    style={{
                      scale: calculateScale(
                        combinedTasksInfo.I.number,
                        mostcombinedTasks
                      ),
                    }}
                    className="h-[1rem] w-[1rem] m-1 bg-[#A5DAC5] rounded-full "
                  >
                    <Image
                      src={tssinteract}
                      alt="TSS Logo"
                      className="  w-full h-full"
                    ></Image>
                  </div>
                </div>
                <div className="w-1/2 h-1/2 flex justify-start items-start">
                  <div
                    style={{
                      scale: calculateScale(
                        combinedTasksInfo.W.number,
                        mostcombinedTasks
                      ),
                    }}
                    className="h-[1rem] w-[1rem]   m-1 bg-[#AFB7E0] rounded-full "
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
            <p className="text-2xl mt-[1rem]">Facilitator Leader</p>
            <div className="flex flex-row mt-[1rem]">
              {sortedcombinedTasks.map((type) => (
                <div key={type.letter} className="w-1/4 flex-row flex">
                  <div
                    className={`w-[2rem] h-[2rem] rounded-full bg-[${type.color}]`}
                  >
                    {" "}
                    <Image
                      src={type.img}
                      alt="TSS Logo"
                      className="  w-full h-full"
                    ></Image>
                  </div>
                  <div
                    className={`ml-1 flex flex-col gap-0 text-[${type.color}]`}
                  >
                    <p>{type.number}</p>
                    <p>{type.letter}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-[1rem] mb-[5rem]">
              As a {""}
              <i>
                <u>Team Collaborator</u>
              </i>
              , you collaborates within a team, considering both work outputs
              and mental processes for effective teamwork.
            </p>
            <button
              onClick={handleNext}
              className="w-full p-[1rem] rounded-full font-bold mb-[5rem]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #EFAB9D, #EFD19F, #A1D6C1, #ABB3DC)",
              }}
            >
              Generate my Transition Galaxy
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
