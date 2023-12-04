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
import { getLatestData } from "@/app/utils/indexdb";
import axios from "axios";




/* {
  I: { number: 6, letter: "I", color: "#F3D5A3" },
  F: { number: 8, letter: "F", color: "#F8B3A5" },
  M: { number: 7, letter: "M", color: "#A5DAC5" },
  W: { number: 5, letter: "W", color: "#AFB7E0" },
} */





const fetchIwasCat = async(iwalist)=>{
  console.log('hello')
  const url2 ='https://bcjz9dawg3.execute-api.ap-southeast-1.amazonaws.com/dev/post-json'
  try {
    const json = JSON.stringify({
      iwa:iwalist}
  );
    const res = await axios(url2, {
      method: "POST",
      data: json,
    });

    return res.data.body
}catch(error){
  console.log(error)
  fetchIwasCat(iwalist)
}
}




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

  const [careertasksInfo, setCareerTasksInfo] = useState({});
  const [hobbiestasksInfo, setHobbiesTasksInfo] = useState({});
  const [combinedTasksInfo, setCombinedTasksInfo] = useState({});

  const [careerchoosen,setCareerchoosen] = useState([])
  const [hobbychoosen,setHobbychoosen] = useState([])
  const [careerstring,setCareerstring] = useState('')
  const [hobbystring,setHobbystring] = useState('')
  
  const [mostcombinedTasks, setMostcombinedTasks] = useState(7);
  const [mostCareerTasks, setMostcareertasks] = useState(7);
  const [mostHobbyTasks, setMosthobbytasks] = useState(7);

  const colorMapping = {
    I: "#F3D5A3",
    F: "#F8B3A5",
    M: "#A5DAC5",
    W: "#AFB7E0",
  };
  const [newArrayCombined, setNewarraycombined] = useState([]);
  const [newArrayCareer, setNewarraycareer] = useState([]);
  const [newArrayHobby, setNewarrayhobby] = useState([]);




  const fetchData = async () => {
    try {
      const response = await getLatestData();
      setCareerchoosen(JSON.parse(response.jobsselectedstring))
      setHobbychoosen(response.hobbies)
      setCareerTasksInfo(response.career_array)
      setHobbiesTasksInfo(response.hobby_array)
      setCombinedTasksInfo(response.combined_array)

      if (response.combined_array){
        setMostcombinedTasks(Math.max(...Object.values(response.combined_array[3])))
        setNewarraycombined(Object.entries(response.combined_array[3]).map(([key, value]) => [key, value, colorMapping[key]]))
      }
      if (response.career_array){
        setMostcareertasks(Math.max(...Object.values(response.career_array[3])))
        setNewarraycareer(Object.entries(response.career_array[3]).map(([key, value]) => [key, value, colorMapping[key]]))
      }

      if (response.hobby_array){
        setMosthobbytasks(Math.max(...Object.values(response.hobby_array[3])))
        setNewarrayhobby(Object.entries(response.hobby_array[3]).map(([key, value]) => [key, value, colorMapping[key]]))
      }
      
      if (JSON.parse(response.jobsselectedstring).length >1){
        setCareerstring(JSON.parse(response.jobsselectedstring).join(','))
      }
      else{
        setCareerstring(JSON.parse(response.jobsselectedstring)[0])
      }
      if (response.hobbies.length >1){
        setHobbystring(response.hobbies.join(','))
      } 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("CHECKK:",careertasksInfo)
  const calculateScale = (selected, total) => {
    return selected === total ? 0.95 : total === 0 ? 0 : selected / total;
  };
 

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
                      combinedTasksInfo.M,
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
                      combinedTasksInfo.F,
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
                      combinedTasksInfo.I,
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
                      combinedTasksInfo.W,
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
            <p className="text-2xl">{combinedTasksInfo[2]}</p>
            <div className="flex flex-row mt-[1rem]">
              {newArrayCombined.map((type) => (
                <div key={type[0]} className="w-1/4 flex-row flex">
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
                    className={`ml-1 flex flex-col gap-0 text-[${type[2]}]`}
                  > 
                    <p>{type[1]}</p>
                    <p>{type[0]}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-[1rem]">
              As an{" "}
              <i>
                <u>{combinedTasksInfo[2]}</u>
              </i>
              , {combinedTasksInfo[1]}
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
                <p className="text-md">{careerstring}</p>
              </div>

              <div className="h-[4rem] w-[4rem] relative flex flex-wrap justify-center items-center ">
                <div className="h-[3rem] w-[3rem] border-[0.2rem] border-white rounded-full absolute "></div>
                <div className="w-1/2 h-1/2  flex justify-end items-end ">
                  <div
                    style={{
                      scale: calculateScale(
                        careertasksInfo.M,
                        mostCareerTasks
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
                        careertasksInfo.F,
                        mostCareerTasks
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
                        careertasksInfo.I,
                        mostCareerTasks
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
                        combinedTasksInfo.W,
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
            <p className="text-2xl mt-[1rem]">{careertasksInfo[2]}</p>
            <div className="flex flex-row mt-[1rem]">
              {newArrayCareer.map((type) => (
                <div key={type[0]} className="w-1/4 flex-row flex">
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
                    className={`ml-1 flex flex-col gap-0 text-[${type[2]}]`}
                  >
                    <p>{type[1]}</p>
                    <p>{type[0]}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-[1rem]">
              As a {""}
              <i>
                <u>{careertasksInfo[2]}</u>
              </i>
              , {careertasksInfo[1]}
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
                <p className="text-md">{hobbystring}</p>
              </div>

              <div className="h-[4rem] w-[4rem] relative flex flex-wrap justify-center items-center ">
                <div className="h-[3rem] w-[3rem] border-[0.2rem] border-white rounded-full absolute "></div>
                <div className="w-1/2 h-1/2  flex justify-end items-end ">
                  <div
                    style={{
                      scale: calculateScale(
                        hobbiestasksInfo.M,
                        mostHobbyTasks
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
                        hobbiestasksInfo.F,
                        mostHobbyTasks
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
                        hobbiestasksInfo.I,
                        mostHobbyTasks
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
                        hobbiestasksInfo.W,
                        mostHobbyTasks
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
            <p className="text-2xl mt-[1rem]">{hobbiestasksInfo[2]}</p>
            <div className="flex flex-row mt-[1rem]">
              {newArrayHobby.map((type) => (
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
                    className={`ml-1 flex flex-col gap-0 text-[${type[2]}]`}
                  >
                    <p>{type[1]}</p>
                    <p>{type[0]}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-[1rem] mb-[5rem]">
              As a {""}
              <i>
                <u>{hobbiestasksInfo[2]}</u>
              </i>
              , {hobbiestasksInfo[1]}
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
