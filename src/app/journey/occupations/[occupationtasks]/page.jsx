"use client";
import {
  openDB,
  getLatestData,
  updateLatestDataAttribute,
} from "@/app/utils/indexdb";
import axios from "axios";
import { useState, useEffect, useRef, Suspense } from "react";
import LoadingPage from "./loading";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Header from "@/app/components/Header";
import { FaCheck } from "react-icons/fa6";

/* function getRandomCategory() {  // TO BE REMOVED and REPLACED WITH API
  const categories = ["I", "W", "F", "M"];
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
} */

// WE FETCH ONE JOB FIRST
const fetchData = async (job) => {
  const url = "/api/fetchIWA?jobtitle=" + encodeURIComponent(job);

  try {
    const res = await axios(url, {
      method: "POST",
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return fetchData(job);
  }
};

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

async function convertTaskData(iwass) {
  var output = [];
  var arrayLength = iwass.length;
  var consolidatedarray = [];
  if (arrayLength > 1) {
    // meaning more than 1 occupation was picked
    for (var i = 0; i < arrayLength; i++) {
      const subarray = iwass[i].res;
      consolidatedarray.push(subarray);
    }
    const arraytarget = consolidatedarray.flat();
    updateLatestDataAttribute("occupationIWAS", arraytarget);
    for (var i = 0; i < arraytarget.length; i++) {
      const sample = {
        title: arraytarget[i],
        selected: true,
      };
      output.push(sample);
    }

    const catIWAS = await fetchIwasCat(arraytarget);
    console.log(catIWAS);
    return [output, catIWAS];
  } else {
    console.log("ARRAYTARGET:", iwass[0].res);
    const arraytarget = iwass[0].res;
    const arraylength = arraytarget.length;
    updateLatestDataAttribute("occupationIWAS", arraytarget);
    for (var i = 0; i < arraylength; i++) {
      const sample = {
        title: arraytarget[i],
        selected: false,
      };
      output.push(sample);
    }
    const catIWAS = await fetchIwasCat(arraytarget);
    console.log(output);
    return [output, catIWAS];
  }
}

export default function Page() {
  const [filename, setFilename] = useState(null);
  const [occupations, setOccupations] = useState([]);
  const [iwalist, setIwalist] = useState(null);
  const [totalcat, setTotalcat] = useState();
  useEffect(() => {
    const fetchDataForAllJobs = async () => {
      try {
        const response = await getLatestData();
        setFilename(response.filename);
        console.log(response.jobsselectedstring);
        setOccupations(JSON.parse(response.jobsselectedstring));

        // Use the response directly instead of relying on the occupations state
        const iwassArray = await Promise.all(
          JSON.parse(response.jobsselectedstring).map(async (job) => {
            console.log(job);
            try {
              const value = await fetchData(job);
              return value;
            } catch (error) {
              console.error(error);
              return null;
            }
          })
        );

        setIwalist(iwassArray);
        console.log(iwassArray);

        // Move this logic inside useEffect
        if (iwassArray) {
          const newTasksData = await convertTaskData(iwassArray);
          console.log("OUTPUT:", newTasksData);
          setTotalcat(newTasksData[1]);
          setTasksData(newTasksData[0]);
          setTasks(newTasksData[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataForAllJobs();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const [selectview, setSelectView] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [completeSelection, setCompleteSelection] = useState(false);

  const controlsA = useAnimation();
  const controlsB = useAnimation();
  const controlsC = useAnimation();
  const controlsD = useAnimation();
  const router = useRouter();

  const [tasksData, setTasksData] = useState([]);

  console.log("tasks: ", tasksData);
  const [tasks, setTasks] = useState(tasksData);

  const [selectedTasks, setSelectedTasks] = useState({});
  const tasksPerPage = 5;
  const totalPages = Math.ceil(tasksData.length / tasksPerPage);

  function handleSelectView() {
    setSelectView(true);
  }

  function handleNextPage() {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  }
  const isInitialRender = useRef(true);

  function handleSelectAll() {
    const allSelected = tasks.reduce((acc, _, index) => {
      acc[index] = true;
      return acc;
    }, {});
    setSelectedTasks(allSelected);

    // Update the tasks array with the selected flag
    const updatedTasks = tasks.map((task) => ({ ...task, selected: true }));
    setTasks(updatedTasks);
  }

  // Initial calculation of selected tasks
  useEffect(() => {
    if (isInitialRender.current) {
      const initialSelectedTasks = tasks.reduce((acc, task, index) => {
        if (task.selected) {
          acc[index] = true;
        }
        return acc;
      }, {});
      setSelectedTasks(initialSelectedTasks);
      isInitialRender.current = false;
    } else {
      const counts = tasks.reduce(
        (acc, task, index) => {
          if (selectedTasks[index]) {
            acc[task.category]++;
          }
          return acc;
        },
        { I: 0, W: 0, F: 0, M: 0 }
      );

      controlsA.start({
        scale: counts.I / tasks.filter((task) => task.category === "I").length,
      });
      controlsB.start({
        scale: counts.W / tasks.filter((task) => task.category === "W").length,
      });
      controlsC.start({
        scale: counts.F / tasks.filter((task) => task.category === "F").length,
      });
      controlsD.start({
        scale: counts.M / tasks.filter((task) => task.category === "M").length,
      });
    }
  }, [selectedTasks, tasks, controlsA, controlsB, controlsC, controlsD]);

  function handlePrevPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function toggleSelected(taskIndex) {
    const newSelectedTasks = { ...selectedTasks };
    newSelectedTasks[taskIndex] = !newSelectedTasks[taskIndex];
    setSelectedTasks(newSelectedTasks);

    // Update the tasks array with the selected flag
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].selected = newSelectedTasks[taskIndex];
    setTasks(updatedTasks);
    console.log(selectedTasks, "hello");
  }
  async function handleNext() {
    // router.push("/journey/occupations/taskpersona");

    const counts = tasks.reduce(
      (acc, task, index) => {
        if (selectedTasks[index]) {
          acc[task.category]++;
        }
        return acc;
      },
      { I: 0, W: 0, F: 0, M: 0 }
    );

    const totalI = tasks.filter((task) => task.category === "I").length;
    const totalW = tasks.filter((task) => task.category === "W").length;
    const totalF = tasks.filter((task) => task.category === "F").length;
    const totalM = tasks.filter((task) => task.category === "M").length;

    const personaArray = await JSON.stringify(totalcat);

    setCompleteSelection(true);
    setTimeout(() => {
      router.push("/journey/occupations/" + filename + "/" + personaArray);
    }, 3000);
  }

  return (
    
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ opacity: completeSelection ? 0 : 1 }}
        transition={{
          ease: "easeInOut",
          type: "spring",
          stiffness: 15,
          duration: 2,
        }}
        className="h-screen w-screen overflow-scroll "
      >
        <div className="h-screen w-screen absolute flex flex-row flex-wrap -z-10">
          {/* Ball A */}
          <div className="h-1/2 w-1/2 flex  justify-center items-center  ">
            <motion.div
              className={`rounded-full bg-[#F3D5A3] w-[5rem] h-[5rem] blur-lg opacity-60 ${
                selectview ? "visible" : "invisible"
              }`}
              animate={controlsA}
            ></motion.div>
          </div>
          {/* Ball B */}
          <div className="h-1/2 w-1/2 flex  justify-center items-center ">
            <motion.div
              className={`rounded-full bg-[#F8B3A5] w-[5rem] h-[5rem] blur-lg opacity-60 ${
                selectview ? "visible" : "invisible"
              }`}
              animate={controlsB}
            ></motion.div>
          </div>
          {/* Ball C */}
          <div className="h-1/2 w-1/2 flex  justify-center items-center">
            {" "}
            <motion.div
              className={`rounded-full bg-[#A5DAC5] w-[5rem] h-[5rem] blur-lg opacity-60 ${
                selectview ? "visible" : "invisible"
              }`}
              animate={controlsC}
            ></motion.div>
          </div>
          {/* Ball D */}
          <div className="h-1/2 w-1/2 flex  justify-center items-center">
            <motion.div
              className={`rounded-full bg-[#AFB7E0] w-[5rem] h-[5rem] blur-lg opacity-60 ${
                selectview ? "visible" : "invisible"
              }`}
              animate={controlsD}
            ></motion.div>
          </div>
        </div>

        <motion.div
          className="w-full flex flex-col justify-center items-center "
          initial={{ y: 0, opacity: 0 }}
          animate={{ opacity: completeSelection ? 0 : 1 }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            duration: 2,
          }}
        >
          <Header />
          {selectview ? (
            <div className="w-10/12  flex flex-col justify-center text-start">
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 20,
                  duration: 1,
                }}
              >
                <div className="flex flex-col mt-[1rem]">
                  <p className="text-xs mb-[0.5rem] ">
                    Your chosen Occupations:
                  </p>
                  <div className="flex flex-col h-fit max-h-[9rem] overflow-scroll">
                    {occupations.map((job, index) => (
                      <p
                        className="text-2xl text-[#D9D9D9] mb-[0.5rem] border-b border-[#4e4b4b]"
                        key={index}
                      >
                        {job}
                      </p>
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-[0.5rem]">
                  Select the tasks that match with you
                </p>
                <div className=" w-full text-xs text-end">
                  <p onClick={handleSelectAll}>
                    <u>Select All</u>
                  </p>
                </div>
                <Suspense fallback={<LoadingPage />}>
                <div className="flex flex-col gap-4 mt-[1.5rem]">
                  {tasks
                    .slice(
                      currentPage * tasksPerPage,
                      (currentPage + 1) * tasksPerPage
                    )
                    .map((task, index) => (
                      <div
                        key={index + currentPage * tasksPerPage}
                        className="p-3 flex text-[#ffffff]  flex-row text-xs items-center bg-[#C4C4C4] bg-opacity-50 rounded-md min-h-[3rem]"
                        onClick={() =>
                          toggleSelected(index + currentPage * tasksPerPage)
                        }
                      >
                        <div className="w-10/12">
                          <p>{task.title}</p>
                        </div>
                        <div className="w-2/12 flex justify-end">
                          <div className="w-[2rem] h-[2rem] text-[#474545]  flex justify-center items-center rounded-sm bg-[#AFAFAF]">
                            {selectedTasks[
                              index + currentPage * tasksPerPage
                            ] ? (
                              <FaCheck className="w-[1.5rem] h-[1.5rem]"></FaCheck>
                            ) : // <div className="rounded-full bg-[#5C5E61] w-[1.5rem] h-[1.5rem]"></div>
                            null}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                </Suspense> 
                <div className="flex flex-row  w-full justify-between items-center mt-4">
                  <button onClick={handlePrevPage} disabled={currentPage === 0}>
                    <FiChevronLeft className="w-[1.5rem] h-[1.5rem] " />
                  </button>
                  <div className="flex flex-row justify-center items-center  w-full flex-wrap">
                    {[...Array(totalPages)].map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 border rounded-full mx-[0.1rem] ${
                          index === currentPage
                            ? "bg-[#D9D9D9] border border-[#C6ABAB]"
                            : ""
                        }`}
                      ></div>
                    ))}
                  </div>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                  >
                    <FiChevronRight className="w-[1.5rem] h-[1.5rem] " />
                  </button>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold mt-[1rem] rounded-full"
                >
                  Next
                </button>
                <button className="w-full p-[1rem] border font-bold mt-[1rem] rounded-full mb-[5rem]">
                  Go Back
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="w-10/12  flex flex-col justify-center text-start ">
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: selectview ? 0 : 1 }}
                transition={{
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 15,
                  duration: 3,
                }}
              >
                <div className="flex flex-col gap-5 text-3xl mt-[1rem]">
                  <p className="">
                    Ah...Yes! We have successfully matched your tasks to our
                    database.
                  </p>
                  <p className="">
                    The next step is really easy, you just have to check the
                    list of tasks that resonates with you.
                  </p>
                  <p className="">Let's go!</p>
                  <button
                    onClick={handleSelectView}
                    className="w-[2rem] h-[2rem] bg-[#908F8F] rounded-full flex justify-center items-center self-start "
                  >
                    <FiChevronRight className="w-[1.5rem] h-[1.5rem] text-[#474545]" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    
  );
}
