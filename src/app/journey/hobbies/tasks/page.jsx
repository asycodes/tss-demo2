"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import { motion, useAnimation } from "framer-motion";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Header from "@/app/components/Header";
import LoadingPage from "./loading";

function Page() {
  const [selectview, setSelectView] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [completeSelection, setCompleteSelection] = useState(false);

  const [occupations, setOccupations] = useState(["Swimming", "Cooking"]);

  const controlsA = useAnimation();
  const controlsB = useAnimation();
  const controlsC = useAnimation();
  const controlsD = useAnimation();
  const router = useRouter();

  const tasksData = [
    {
      title: "Conducted Design Thinking Workshops for Clients",
      selected: true,
      category: getRandomCategory(),
    },
    {
      title: "Conducted on-site user research with ground staff",
      selected: true,
      category: getRandomCategory(),
    },
    {
      title: "Led a team of 10 to develop and implement a business plan.",
      selected: true,
      category: getRandomCategory(),
    },
    {
      title: "Prepare presentation slides and workshop materials",
      selected: false,
      category: getRandomCategory(),
    },
    { title: "Another task", selected: false, category: getRandomCategory() },
    { title: "Another task", selected: false, category: getRandomCategory() },
    { title: "Another task", selected: false, category: getRandomCategory() },
    { title: "Another task", selected: false, category: getRandomCategory() },
    { title: "Another task", selected: false, category: getRandomCategory() },
    { title: "Another task", selected: false, category: getRandomCategory() },
    { title: "Another task", selected: false, category: getRandomCategory() },
  ];

  const [tasks, setTasks] = useState(tasksData);

  const [selectedTasks, setSelectedTasks] = useState({});
  const tasksPerPage = 5;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  function handleSelectView() {
    setSelectView(true);
  }

  function handleNextPage() {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  }
  const isInitialRender = useRef(true);

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
  }
  function handleNext() {
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

    console.log(counts);
    console.log(totalI, totalW, totalF, totalM);

    setCompleteSelection(true);
    setTimeout(() => {
      router.push("/journey/hobbies/taskpersona");
    }, 3000);
  }

  function getRandomCategory() {
    const categories = ["I", "W", "F", "M"];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <motion.div className="h-screen w-screen overflow-scroll ">
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
                  <p className="text-xs mb-[0.5rem] ">Your selected Hobbies:</p>
                  {occupations.map((job, index) => (
                    <p
                      className="text-3xl text-[#D9D9D9] mb-[0.5rem]"
                      key={index}
                    >
                      {job}
                    </p>
                  ))}
                </div>
                <p className="text-sm mt-[0.5rem]">
                  Select the tasks that match with you
                </p>
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
                          <div className="w-[2rem] h-[2rem] flex justify-center items-center rounded-sm bg-[#AFAFAF]">
                            {selectedTasks[
                              index + currentPage * tasksPerPage
                            ] ? (
                              <div className="rounded-full bg-[#5C5E61] w-[1.5rem] h-[1.5rem]"></div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button onClick={handlePrevPage} disabled={currentPage === 0}>
                    <FiChevronLeft className="w-[1.5rem] h-[1.5rem] " />
                  </button>
                  <div className="flex flex-row justify-center gap-2">
                    {[...Array(totalPages)].map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 border rounded-full mx-1 ${
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
                    Once again, we have successfully matched your tasks to our
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
    </Suspense>
  );
}

export default Page;
