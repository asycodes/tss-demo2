"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import remote from "public/Remoteability.svg";
import tss from "public/tss_light.svg";
import tssinfo from "public/Information Output.svg";
import tssinteract from "public/Interact_new.svg";
import tssmental from "public/Mental.svg";
import tsswork from "public/Work Output.svg";
import { personas } from "@/app/components/persona";
import { FaX } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import html2canvas from "html2canvas";
import { getLatestData } from "@/app/utils/indexdb";
import axios from "axios";
import { set } from "lodash";

// iwaslist will be
const fetchsimilar = async (iwalist, jobs, id) => {
  const url2 = "/api/fetchTransition";
  try {
    const json = {
      job_level: "",
      input_title: "",
      onet_title: jobs,
      title_id: "",
      skill_list: [],
      task_list: iwalist,
    };
    const res = await axios(url2, {
      method: "POST",
      data: json,
    });
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

function convertData(iwaslist) {
  console.log(iwaslist)
  return iwaslist.map((item) => ({ IWA_Title: item }));
}



export default function Page() {
  const router = useRouter();
  const [combinedIwaslist, setCombinediwaslist] = useState([]);
  const [jobsselected, setJobsselected] = useState([]);
  const [fileid, setFileid] = useState("");
  const [name, setName] = useState("");
  const [withinjobs, setInsidejobs] = useState([]);
  const [outsidejobs, setOutidejobs] = useState([]);
  const [remoteability, setRemoteability] = useState([]);
  const [tasksIhave, setTaskIHave] = useState([]);
  const [tasksToTrain, setTaskToTrain] = useState([]);

  // figure out what variables are needed.
  // test out the api

  const fetchData = async () => {
    try {
      const response = await getLatestData();
      setJobsselected(response.jobsselectedstring);
      setCombinediwaslist(response.combined_IWAS);
      setFileid(response.filename);
      setName(response.username);
      console.log(convertData(response.combined_IWAS));

      const findsuggestions = await fetchsimilar(
        convertData(response.combined_IWAS),
        JSON.parse(response.jobsselectedstring),
        response.filename
      );
      // console.log(JSON.parse(findsuggestions.data.count), "hello help");

      setTaskIHave(JSON.parse(findsuggestions.data.similar));
      setTaskToTrain(JSON.parse(findsuggestions.data.missing));
      setAllSimilarJobs(JSON.parse(findsuggestions.data.count));
      const within = JSON.parse(findsuggestions.data.count)
        .filter((subarray) => subarray[6] == 1) // Filter based on the condition
        .map((subarray) => subarray[2]);

      setInsidejobs(within);
      const outside = JSON.parse(findsuggestions.data.count)
        .filter((subarray) => subarray[6] != 1) // Filter based on the condition
        .map((subarray) => subarray[2]);
      setOutidejobs(outside);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //dummy
  //will need to sort jobs from lowest similarity
  const withinIndustryJobs = withinjobs;

  const outsideIndustryJobs = outsidejobs;

  function handleNext() {
    router.push("/journey/nextsteps");
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
  const [withinIndustry, setWithinIndustry] = useState(true);
  const [download, setDownLoad] = useState(false);
  const [showcard, setShowCard] = useState(false);
  const [cardData, setCardData] = useState("Industrial Designer");
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
  function handleWithinIndustry() {
    setWithinIndustry(true);
    setSelectedJob(withinIndustryJobs[0]);
  }

  function handleOutsideIndustry() {
    setWithinIndustry(false);
    setSelectedJob(outsideIndustryJobs[0]);
  }

  function toggleCard() {
    if (showcard === false) {
      setShowCard(true);
    } else setShowCard(false);
  }
  const [selectedJobSimilarTasks, setSelectedJobSimilarTasks] = useState([]);
  const [selectedJobMissingTasks, setSelectedJobMissingTasks] = useState([]);
  const [selectedJob, setSelectedJob] = useState("Industrial Designer");
  const [jobRemoteScore, setJobRemoteScore] = useState(12);
  const [jobRemoteDesc, setJobRemoteDesc] = useState("No Information");
  const [allsimilarJobs, setAllSimilarJobs] = useState([]);
  const [selectedJobAllTasks, setSelectedJobAllTasks] = useState([
    {
      title: "This is a sentence that describes Task done as part of a job",
      remoteable: true,
      category: "work",
      selected: true,
    },
    {
      title: "This is a sentence that describes Task done as part of a job",
      remoteable: true,
      category: "interact",
      selected: false,
    },
    {
      title: "This is a sentence that describes Task done as part of a job",
      remoteable: false,
      category: "info",
      selected: true,
    },
    {
      title: "This is a sentence that describes Task done as part of a job",
      remoteable: true,
      category: "mental",
      selected: false,
    },
  ]);
  const handleJobClick = (job) => {
    setSelectedJob(job === selectedJob ? null : job);
  };

  function combineLists(similarTasks, missingTasks) {
    // Create an array to store the result
    const combinedArray = [];

    // Process similar tasks
    similarTasks.forEach((task) => {
      combinedArray.push({
        title: task,
        selected: true,
      });
    });
    // Process missing tasks
    missingTasks.forEach((task) => {
      combinedArray.push({
        title: task,
        selected: false,
      });
    });
    return combinedArray;
  }
  useEffect(() => {
    setSelectedJob(withinIndustryJobs[0]);
  }, []);

  useEffect(() => {
    const targetJob = selectedJob;
    console.log(tasksIhave, "similar heelleeo");
    const selectedsimjobstask = tasksIhave
      .filter((item) => item[2] === targetJob)
      .map((item) => item[3]);
    const selectedmissjobstask = tasksIhave
      .filter((item) => item[2] === targetJob)
      .map((item) => item[3]);

    setSelectedJobSimilarTasks(selectedsimjobstask);
    setSelectedJobMissingTasks(selectedmissjobstask);
    console.log(selectedJobMissingTasks, "missing");
    console.log(selectedJobSimilarTasks, "similar");
    setSelectedJobAllTasks(
      combineLists(selectedJobMissingTasks, selectedJobSimilarTasks)
    );
    console.log(selectedJobAllTasks, "hellooooooooo");
    const remotescore = getRemoteabilityScore();
    setJobRemoteScore(remotescore);
    setJobRemoteDesc(getRemoteAbilityDescription(remotescore));
  }, [selectedJob]);

  function getRemoteAbilityDescription(number) {
    if (number === 0) {
      return "No Information";
    } else if (number > 0 && number < 20) {
      return "This means that this job is fairly remote-able";
    } else if (number >= 20 && number < 40) {
      return "This means that this job is moderately remote-able";
    } else if (number >= 40 && number < 60) {
      return "This means that this job is very remote-able";
    } else if (number >= 60 && number < 80) {
      return "This means that this job is highly remote-able";
    } else if (number >= 80 && number <= 100) {
      return "This means that this job is extremely remote-able";
    }
  }

  //ASYRAF HELP THANKS
  function getRemoteabilityScore() {
    const entry = allsimilarJobs.filter((item) => item[2] === selectedJob);
    // const score = (entry[0][16] * 100).toFixed(2);
    //dummy
    const score = 0.35;

    return score;
  }
  const downloadImage = async (event) => {
    event.preventDefault(); // Prevent the default anchor click behavior

    const element = printRef.current;

    // Get the scroll position before capturing
    const scrollLeft = element.scrollLeft;
    const scrollTop = element.scrollTop;

    // Change the height to auto to capture the full content
    setDownLoad(true);
    element.style.height = "auto";
    // element.style.opacity = "0";

    // Create the canvas
    const canvas = await html2canvas(element);

    // Reset the scroll position
    element.scrollLeft = scrollLeft;
    element.scrollTop = scrollTop;

    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
    element.style.height = "90vh";
    setDownLoad(false);
    // element.style.opacity = "100";
  };

  const printRef = useRef();
  console.log(selectedJob, "hello");
  return (
    <motion.div className=" max-h-screen max-w-screen h-screen w-screen flex flex-col items-center overflow-hidden ">
      {download ? (
        <div className="w-screen h-screen flex items-center justify-center text-4xl font-bold absolute bg-[#474545] z-10">
          Image Downloaded
        </div>
      ) : null}
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
          className="mt-[1rem] flex flex-col  w-11/12"
        >
          <div className="flex w-full flex-row">
            <div className="w-5/6">
              <p className="text-2xl">{name}'s</p>
              <p className="text-2xl">Transition Galaxy</p>
            </div>
            <div className="w-1/6">
              <div className="flex flex-row justify-end">
                <button className="w-[2rem] h-[2rem] bg-[#908F8F] rounded-full flex justify-center items-center">
                  <FiChevronRight
                    onClick={handleNext}
                    className="w-[1.5rem] h-[1.5rem] text-[#474545]"
                  />
                </button>
              </div>
            </div>
          </div>
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
          maxHeight: reducediv ? "15rem" : "100vh",
          height: reducediv ? "15rem" : "100vh",
          //   marginTop: reducediv ? "1rem" : "0",
          //   position: reducediv ? "relative" : "absolute",
          transition:
            "height 2s ease, margin-top 2s ease, max-height 2s ease, position 1s ease",
        }}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{
            scale: removeshadow ? 0.4 : 1,
            width: removeshadow ? "150%" : "100%",

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
            <div className="flex-row flex absolute w-full h-full">
              <motion.div
                // initial={{ opacity: 0 }}
                animate={{
                  opacity: withinIndustry ? 0 : 0.8,
                }}
                transition={{
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 30,
                  duration: 1,
                }}
                className="w-1/2 h-full  "
              >
                <div className="h-[42%] w-full bg-[#474545]"></div>
                <div className="h-1/5 w-full flex flex-row">
                  <div className="w-4/5 h-full bg-[#474545]"></div>
                  <div className="w-1/5 h-full "></div>
                </div>
                <div className="h-2/5 w-full bg-[#474545]"></div>
              </motion.div>
              <motion.div
                // initial={{ opacity: 0 }}
                animate={{
                  opacity: withinIndustry ? 0.8 : 0,
                }}
                transition={{
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 15,
                  duration: 1,
                }}
                className="w-1/2 h-full "
              >
                <div className="h-2/5 w-full bg-[#474545]"></div>
                <div className="h-1/5 w-full flex flex-row">
                  <div className="w-1/5 h-full"></div>
                  <div className="w-4/5 h-full bg-[#474545]"></div>
                </div>
                <div className="h-2/5 w-full bg-[#474545]"></div>
              </motion.div>
            </div>

            <div className=" flex w-1/12 h-full justify-center transition ease-in-out duration-150 items-center">
              <div
                className={`w-[1.5rem] h-[1.5rem] rounded-full  mt-[7rem] bg-white  transition ease-in-out duration-150 ${
                  selectedJob === withinIndustryJobs[7]
                    ? "border-[#C6ABAB] border-4 scale-150 "
                    : ""
                }`}
              ></div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end">
                <div
                  className={`w-[2rem] h-[2rem] rounded-full  bg-white  transition ease-in-out duration-150 ${
                    selectedJob === withinIndustryJobs[5]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                {/* <div className="w-[2rem] h-[2rem] rounded-full  bg-white"></div> */}
              </div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div
                  className={`w-[2rem] h-[2rem] rounded-full mb-[7rem]  bg-white transition ease-in-out duration-150 ${
                    selectedJob === withinIndustryJobs[6]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                {/* <div className="w-[2rem] h-[2rem] rounded-full bg-white"></div> */}
              </div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end">
                <div
                  className={`w-[2rem] h-[2rem] rounded-full  bg-white transition ease-in-out duration-150 ${
                    selectedJob === withinIndustryJobs[3]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div
                  className={`w-[2rem] h-[2rem] rounded-full mb-[3rem]  bg-white  transition ease-in-out duration-150 ${
                    selectedJob === withinIndustryJobs[4]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
              </div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div
                  className={`w-[2rem] h-[2rem] rounded-full mb-[1rem] bg-white transition ease-in-out duration-150 ${
                    selectedJob === withinIndustryJobs[2]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                {/* <div className="w-[2rem] h-[2rem] rounded-full mt-[6rem] bg-white"></div> */}
              </div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end">
                <div
                  className={`w-[2rem] h-[2rem] rounded-full mb-[3rem] bg-white transition ease-in-out duration-150 ${
                    selectedJob === withinIndustryJobs[0]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div
                  className={`w-[2rem] h-[2rem] rounded-full mt-[8rem] bg-white transition ease-in-out duration-150 ${
                    selectedJob === withinIndustryJobs[1]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
              </div>
            </div>
            <div className="  flex w-1/12 h-full justify-center items-center"></div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end"></div>
              <div className="flex h-1/2 w-full flex-col justify-center"></div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end">
                <div
                  className={`w-[2rem] h-[2rem] rounded-full mb-[3rem] bg-white transition ease-in-out duration-150 ${
                    selectedJob === outsideIndustryJobs[5]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
                <div
                  className={`w-[2rem] h-[2rem] rounded-full mb-[6rem] bg-white transition ease-in-out duration-150 ${
                    selectedJob === outsideIndustryJobs[1]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
                <div
                  className={`w-[2rem] h-[2rem] rounded-full  bg-white transition ease-in-out duration-150 ${
                    selectedJob === outsideIndustryJobs[0]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
              </div>
              <div className="flex h-1/2 w-full flex-col justify-start">
                <div
                  className={`w-[2rem] h-[2rem] rounded-full mt-[5rem] bg-white transition ease-in-out duration-150 ${
                    selectedJob === outsideIndustryJobs[3]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
              </div>
            </div>
            <div className="  flex w-1/12 h-full flex-col ">
              <div className="flex h-1/2 w-full flex-col justify-end">
                {/* <div className="w-[2rem] h-[2rem] rounded-full mb-[5rem] bg-white"></div> */}
              </div>
              <div className="flex h-1/2 w-full flex-col justify-center">
                <div
                  className={`w-[2rem] h-[2rem] rounded-full mt-[5rem] bg-white transition ease-in-out duration-150 ${
                    selectedJob === outsideIndustryJobs[4]
                      ? "border-[#C6ABAB] border-4 scale-150 "
                      : ""
                  }`}
                ></div>
              </div>
            </div>
            <div className="  flex w-1/12 h-full justify-center items-center">
              <div
                className={` w-[2rem] h-[2rem] rounded-full  bg-white transition ease-in-out duration-150 ${
                  selectedJob === outsideIndustryJobs[2]
                    ? "border-[#C6ABAB] border-4 scale-150 "
                    : ""
                }`}
              ></div>
            </div>
            <div className="  flex w-1/12 h-full justify-center items-center">
              <div
                className={` w-[2rem] h-[2rem] rounded-full mb-[18rem] bg-white transition ease-in-out duration-150 ${
                  selectedJob === outsideIndustryJobs[6]
                    ? "border-[#C6ABAB] border-4 scale-150 "
                    : ""
                }`}
              ></div>
            </div>
            <div className="  flex w-1/12 h-full justify-center items-center">
              <div
                className={` w-[2rem] h-[2rem] rounded-full mt-[8rem] bg-white transition ease-in-out duration-150 ${
                  selectedJob === outsideIndustryJobs[7]
                    ? "border-[#C6ABAB] border-4 scale-150 "
                    : ""
                }`}
              ></div>
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
                  {" "}
                  <Image
                    src={tsswork}
                    alt="TSS Logo"
                    className="  w-full h-full"
                  ></Image>
                </div>
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
          className="flex flex-col justify-center  items-center   w-11/12"
        >
          <div className="flex text-bold mb-[1rem] flex-row">
            <button
              onClick={handleWithinIndustry}
              className="p-2 bg-[#C4C4C4] rounded-lg mr-[1rem] focus:border-4 border-solid border-[#C6ABAB]"
            >
              Within Industry{" "}
            </button>
            <button
              onClick={handleOutsideIndustry}
              className="p-2 bg-[#C4C4C4] rounded-lg mr-[1rem] focus:border-4 border-solid border-[#C6ABAB]"
            >
              {" "}
              Outside Industry{" "}
            </button>
          </div>
          <div className="border opacity-70 w-full border-white border-dashed"></div>{" "}
          {withinIndustry ? (
            <div className="flex flex-col mt-[1rem] text-xl w-full overflow-scroll h-[10rem]">
              {withinIndustryJobs.map((job, index) => (
                <div
                  key={index}
                  className={`flex flex-row w-full ${
                    selectedJob === job ? "" : ""
                  }`}
                  onClick={() => handleJobClick(job)}
                >
                  <div className="w-1/6 justify-center h-fit  my-3 items-center flex">
                    <div
                      className={`h-[0.5rem] w-[0.5rem] rounded-full  bg-white ease-in-out transition duration-300 ${
                        selectedJob === job
                          ? " border-[#C6ABAB] border scale-[400%]"
                          : ""
                      }`}
                    ></div>
                  </div>

                  <div
                    className={`w-5/6 flex items-center ease-in-out transition duration-300  ${
                      selectedJob === job ? "text-xl" : "text-sm opacity-25"
                    }`}
                  >
                    <p>{job}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col mt-[1rem] w-full overflow-scroll h-[10rem]">
              {outsideIndustryJobs.map((job, index) => (
                <div
                  key={index}
                  className={`flex flex-row w-full ${
                    selectedJob === job ? "" : ""
                  }`}
                  onClick={() => handleJobClick(job)}
                >
                  <div className="w-1/6 justify-center h-fit  my-3 items-center flex">
                    <div
                      className={`h-[0.5rem] w-[0.5rem] rounded-full  bg-white ease-in-out transition duration-300 ${
                        selectedJob === job
                          ? " border-[#C6ABAB] border scale-[400%]"
                          : ""
                      }`}
                    ></div>
                  </div>

                  <div
                    className={`w-5/6 flex items-center ease-in-out transition duration-300  ${
                      selectedJob === job ? "text-xl" : "text-sm opacity-25"
                    }`}
                  >
                    <p>{job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ) : null}
      {reducediv ? (
        <motion.div
          initial={{ y: "80vh" }}
          animate={{
            y: showcard ? 0 : "80vh",
          }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            // delay:1,
            duration: 1,
          }}
          className=" absolute w-screen  flex justify-center items-center h-screen "
        >
          <div className=" w-[90%] h-[90%] absolute opacity-[95%] rounded-lg bg-[#D9D9D9]"></div>
          <div
            ref={printRef}
            className="w-[90%] h-[90%] z-10 relative flex flex-col items-center rounded-lg overflow-scroll "
          >
            <div
              onClick={toggleCard}
              className="w-[100%] h-[2rem] pb-3 mt-[0.5rem] flex-col flex  items-center mb-[0.5rem]"
            >
              <div className="w-[50%] h-[0.4rem] bg-white rounded-lg"></div>
            </div>
            {showcard ? (
              <div className="w-11/12 text-[#474545] flex flex-row gap-2 justify-end ">
                <button onClick={downloadImage}>
                  <FaDownload></FaDownload>
                </button>
              </div>
            ) : null}

            <div className="flex w-11/12 flex-col h-fit ">
              <p className="text-[#474545] font-semibold text-3xl">
                {selectedJob}
              </p>
              <div className="flex mt-[1rem] flex-row justify-center gap-4 items-center ">
                <div className="flex-col flex justify-center items-center">
                  <div className="w-[3rem] h-[3rem] rounded-full bg-[#E0C291]"></div>
                  <p className="text-[#E0C291]">12</p>
                </div>
                <div className="flex-col flex justify-center items-center ">
                  <div className="w-[3rem] h-[3rem] rounded-full bg-[#E19D8F]"></div>
                  <p className="text-[#E19D8F]">12</p>
                </div>
                <div className="flex-col flex justify-center items-center">
                  <div className="w-[3rem] h-[3rem] rounded-full bg-[#93C8B3]"></div>{" "}
                  <p className="text-[#93C8B3]">12</p>
                </div>
                <div className="flex-col flex justify-center items-center">
                  <div className="w-[3rem] h-[3rem] rounded-full bg-[#9DA4CD]"></div>
                  <p className="text-[#9DA4CD]">12</p>
                </div>
              </div>
              <div
                className="w-full h-[2pxrem] my-[1rem]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #EFAB9D, #EFD19F, #A1D6C1, #ABB3DC)",
                }}
              ></div>
              <div className="flex gap-2 flex-row  h-fit ">
                <div className="w-1/2 ">
                  <div className="bg-[#474545] p-2 rounded-lg w-full h-fit">
                    <p className="text-lg">Remote-ability Score: </p>
                    <div className=" flex flex-row my-[0.4rem] ml-2 gap-2">
                      <Image src={remote} width={30} height={30}></Image>
                      <p className="text-xl">{jobRemoteScore}</p>
                    </div>
                    <div className="text-xs mb-[1rem]">{jobRemoteDesc}</div>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                  <div className="w-full h-fit rounded-lg text-xs p-2 bg-[#63B166]">
                    Fresh Graduate Position
                  </div>
                  <div className="w-fit h-fit rounded-lg text-xs p-2 bg-[#E55234]">
                    !!! Job Demand
                  </div>
                </div>
              </div>
              <div
                className="w-full h-[2px] my-[1rem]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #EFAB9D, #EFD19F, #A1D6C1, #ABB3DC)",
                }}
              ></div>
              <div className="flex flex-row mb-[1rem]">
                <div className="w-1/3 border-2 flex flex-row items-center bg-[#C4C4C4] border-white h-[3rem] rounded-lg m-1">
                  <div className="w-1/3 flex justify-center items-center h-full p-1">
                    <div className="w-[1rem] h-[1rem] absolute border-white border rounded-full"></div>
                    <FaCheck></FaCheck>
                  </div>
                  <div className="w-2/3 text-[0.7rem]"> Task You Have</div>
                </div>
                <div className="w-1/3  border-2 flex flex-row items-center  bg-[#C4C4C4] border-white h-[3rem] rounded-lg m-1">
                  <div className="w-1/3 flex justify-center items-center h-full p-1">
                    <div className="w-[1rem] h-[1rem] absolute border-white border rounded-full"></div>
                  </div>
                  <div className="w-2/3 text-[0.7rem] "> Task To Train</div>
                </div>
                <div className="w-1/3  border-2 flex flex-row items-center  bg-[#C4C4C4] border-white h-[3rem] rounded-lg m-1">
                  <div className="w-1/3 flex justify-center items-center h-full p-1">
                    <Image src={remote} width={20}></Image>
                  </div>
                  <div className="w-2/3 text-[0.7rem]"> Remote-able Task</div>
                </div>
              </div>
              <div className=" flex-col flex gap-2 w-full text-sm mb-[2rem] justify-center items-center">
                {selectedJobAllTasks.map((task, index) => (
                  <div
                    className={`w-full flex-row flex justify-center items-center text-start h-fit p-2 rounded-lg ${
                      task.category === "work"
                        ? "bg-[#E0C291]"
                        : task.category === "mental"
                        ? "bg-[#E19D8F]"
                        : task.category === "interact"
                        ? "bg-[#93C8B3]"
                        : task.category === "info"
                        ? "bg-[#9DA4CD]"
                        : "bg-[#474545]"
                    }`}
                  >
                    <div className="w-1/12 flex justify-center  items-center">
                      {" "}
                      <div className="w-full flex justify-center items-center h-full p-1">
                        <div className="w-[1rem] h-[1rem] absolute border-white border rounded-full"></div>
                        {task.selected ? <FaCheck></FaCheck> : null}
                      </div>
                    </div>
                    <p className="w-10/12">{task.title}</p>
                    <div className="w-1/12">
                      <Image src={remote} width={20}></Image>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
