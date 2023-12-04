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
import { getLatestData, updateLatestDataAttribute } from "@/app/utils/indexdb";
import axios from "axios";

const fetchIwasCat = async (iwalist) => {
  const url2 =
    "https://bcjz9dawg3.execute-api.ap-southeast-1.amazonaws.com/dev/post-json";
  try {
    const json = JSON.stringify({
      iwa: iwalist,
    });
    const res = await axios(url2, {
      method: "POST",
      data: json,
    });

    return res.data.body;
  } catch (error) {
    console.log(error);
    fetchIwasCat(iwalist);
  }
};

export default function Page() {
  const [name,setName] = useState('')
  const [careertasksInfo, setCareerTasksInfo] = useState({
    I: 4,
    F: 7,
    M: 5,
    W: 3,
  });
  const [hobbiestasksInfo, setHobbiesTasksInfo] = useState({
    I: 2,
    F: 2,
    M: 6,
    W: 4,
  });

  const [combinedTasksInfo, setCombinedTasksInfo] = useState({
    I: { number: 6, letter: "I" },
    F: { number: 8, letter: "F" },
    M: { number: 7, letter: "M" },
    W: { number: 5, letter: "W" },
  });

  const fetchData = async () => {
    try {
      const response = await getLatestData();
      setName(response.username)
      const responsecareer = await fetchIwasCat(response.occupationIWAS);
      const responsehobbies = await fetchIwasCat(response.hobbyIWAS);
      const responsecombined = await fetchIwasCat(
        response.hobbyIWAS.concat(response.occupationIWAS)
      );
      console.log(response.hobbyIWAS.concat(response.occupationIWAS));
      console.log("HOBBY:",response.hobbyIWAS)
      await updateLatestDataAttribute(
        "combined_IWAS",
        response.hobbyIWAS.concat(response.occupationIWAS)
      );
      setCareerTasksInfo(responsecareer);
      setHobbiesTasksInfo(responsehobbies);
      setCombinedTasksInfo(responsecombined);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const colorArray = ["#F3D5A3", "#F8B3A5", "#A5DAC5", "#AFB7E0"];
  const [showsummary, setShowSummary] = useState(false);
  const [merge, setMerge] = useState(false);
  const [appearText, setAppearText] = useState(false);
  const [removeDiv, setRemoveDiv] = useState(false);
  const router = useRouter();
  // Dummy data to be replace with numbers combined from hobbies task persona and career task persona

  // Function to combine tasks from career and hobbies, remove duplicates
  function getPersona(taskinfo) {
    if (taskinfo) {
      console.log(taskinfo);
      const dataArray = Object.entries(taskinfo);
      // Sort the array based on the values in descending order
      const sortedArray = dataArray.sort((a, b) => b[1] - a[1]);
      const sortedObject = Object.fromEntries(sortedArray);
      const p = Object.keys(sortedObject).join("");
      const targetObject = personas.find((item) => item.letters === p);
      const targetDesc = targetObject.desc;
      const targetname = targetObject.name;
      return [p, targetDesc, targetname];
    }
  }

  const persona_Combined = getPersona(combinedTasksInfo)[0];
  const personaDesc_Combined = getPersona(combinedTasksInfo)[1];
  const personaTitle_Combined = getPersona(combinedTasksInfo)[2];
  const combined_iwa_numbers = combinedTasksInfo;
  const persona_combined_array = [
    persona_Combined,
    personaDesc_Combined,
    personaTitle_Combined,
    combined_iwa_numbers,
  ];

  const persona_Career = getPersona(careertasksInfo)[0];
  const personaDesc_Career = getPersona(careertasksInfo)[1];
  const personaTitle_Career = getPersona(careertasksInfo)[2];
  const career_iwa_numbers = careertasksInfo;
  const persona_career_array = [
    persona_Career,
    personaDesc_Career,
    personaTitle_Career,
    career_iwa_numbers,
  ];

  const persona_Hobby = getPersona(hobbiestasksInfo)[0];
  const personaDesc_Hobby = getPersona(hobbiestasksInfo)[1];
  const personaTitle_Hobby = getPersona(hobbiestasksInfo)[2];
  const hobby_iwa_numbers = hobbiestasksInfo;
  const persona_hobby_array = [
    persona_Hobby,
    personaDesc_Hobby,
    personaTitle_Hobby,
    hobby_iwa_numbers,
  ];

  updateLatestDataAttribute("career_array", persona_career_array);
  updateLatestDataAttribute("combined_array", persona_combined_array);
  updateLatestDataAttribute("hobby_array", persona_hobby_array);

  const mostcareerTasks = Math.max(
    careertasksInfo.M,
    careertasksInfo.I,
    careertasksInfo.F,
    careertasksInfo.W
  );
  const mosthobbiesTasks = Math.max(
    hobbiestasksInfo.M,
    hobbiestasksInfo.I,
    hobbiestasksInfo.F,
    hobbiestasksInfo.W
  );

  const mostcombinedTasks = Math.max(
    combinedTasksInfo.M,
    combinedTasksInfo.I,
    combinedTasksInfo.F,
    combinedTasksInfo.W
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

  const applyColorsToText = (text) => {
    const colorMapping = {
      M: "#F3D5A3",
      F: "#F8B3A5",
      I: "#A5DAC5",
      W: "#AFB7E0",
    };

    return text.split("").map((letter, index) => (
      <span key={index} style={{ color: colorMapping[letter] }}>
        {letter}
      </span>
    ));
  };

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
                      combinedTasksInfo.M,
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
                      combinedTasksInfo.F,
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
                      combinedTasksInfo.I,
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
                      combinedTasksInfo.W,
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
            , {name}, you can identify as a{" "}
            <b> {applyColorsToText(persona_Combined)} </b>
            <i>
              <u>Task Persona.</u>
            </i>
          </p>
          <p>{personaDesc_Combined}</p>
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
                    scale: calculateScale(careertasksInfo.M, mostcareerTasks),
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
                    scale: calculateScale(careertasksInfo.F, mostcareerTasks),
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
                    scale: calculateScale(careertasksInfo.I, mostcareerTasks),
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
                    scale: calculateScale(careertasksInfo.W, mostcareerTasks),
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
                    scale: calculateScale(hobbiestasksInfo.M, mosthobbiesTasks),
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
                    scale: calculateScale(hobbiestasksInfo.F, mosthobbiesTasks),
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
                    scale: calculateScale(hobbiestasksInfo.I, mosthobbiesTasks),
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
                    scale: calculateScale(hobbiestasksInfo.W, mosthobbiesTasks),
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
