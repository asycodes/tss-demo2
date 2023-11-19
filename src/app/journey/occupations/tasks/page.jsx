"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import Header from "@/app/components/Header";

function Page() {
  const [selectview, setSelectView] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [occupations, setOccupations] = useState([
    "Industrial Designer",
    "Software Engineer",
  ]);
  const [tasks, setTasks] = useState([
    "Conducted Design Thinking Workshops for Clients",
    "Conducted on site user research with ground staff",
    "Led a team of 10 to develop and implement business plan.",
    "Prepare presentation slides and workshop materials",
    "Conducted Design Thinking Workshops for Clients",
    "Conducted on site user research with ground staff",
    "Led a team of 10 to develop and implement business plan.",
    "Prepare presentation slides and workshop materials",
    "Conducted on site user research with ground staff",
    "Led a team of 10 to develop and implement business plan.",
    "Prepare presentation slides and workshop materials",
    "Led a team of 10 to develop and implement business plan.",
    "Prepare presentation slides and workshop materials",
  ]);

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
  function handlePrevPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }
  function toggleSelected(taskIndex) {
    // Clone the current selectedTasks state to avoid mutating it directly
    const newSelectedTasks = { ...selectedTasks };
    // Toggle the selected status for the clicked task
    newSelectedTasks[taskIndex] = !newSelectedTasks[taskIndex];
    // Update the state with the new selected tasks
    setSelectedTasks(newSelectedTasks);
    console.log(selectedTasks, "hello");
  }
  function handleNext() {
    router.push("/journey/occupations/summary");
  }

  return (
    <motion.div className="h-screen w-screen overflow-scroll">
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
        <Header />
        {selectview ? (
          <div className="w-10/12  flex flex-col justify-center text-start">
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                ease: "easeInOut",
                type: "spring",
                stiffness: 15,
                duration: 3,
              }}
            >
              <div className="flex flex-col mt-[1rem]">
                <p className="text-xs mb-[0.5rem] ">Your chosen Occupations:</p>
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
                Select the tasks that matches with you
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
                        <p>{task}</p>
                      </div>
                      <div className="w-2/12 flex justify-end">
                        <div className="w-[2rem] h-[2rem] flex justify-center items-center rounded-sm bg-[#AFAFAF]">
                          {selectedTasks[index + currentPage * tasksPerPage] ? (
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
                className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold mt-[1rem] rounded-full"
              >
                Next
              </button>
              <button className=" w-full p-[1rem] border font-bold mt-[1rem] rounded-full mb-[5rem]">
                Go Back
              </button>
              {/* <div className="flex flex-row justify-center w-full"></div> */}
            </motion.div>
          </div>
        ) : (
          <div className="w-10/12  flex flex-col justify-center text-start ">
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
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
                  The next step is really easy, you just have to check the list
                  of tasks that resonates with you.
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

export default Page;

// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react"; // Import useEffect directly
// import styles from "./styles.module.css";
// import Header from "../../components/Header";
// import { motion } from "framer-motion";

// function ConfirmTasks() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [workexperiences, setworkExperience] = useState([]);
//   const [selectedTasksA, setSelectedTasksA] = useState(0);
//   const [selectedTasksB, setSelectedTasksB] = useState(0);
//   const [selectedTasksC, setSelectedTasksC] = useState(0);
//   const [selectedTasksD, setSelectedTasksD] = useState(0);
//   useEffect(() => {
//     scrollToTop();
//     console.log(workexperiences);

//     if (location.state && location.state.workexperiences) {
//       const initialWork = location.state.workexperiences.map((work) => ({
//         jobName: work.jobName,
//         experience: work.experience,
//         tasks: [
//           {
//             description: "task description 1",
//             checked: true,
//             category: "A",
//           },
//           {
//             description: "task description 2",
//             checked: true,
//             category: "A",
//           },
//           {
//             description: "task description 3",
//             checked: true,
//             category: "B",
//           },
//           {
//             description: "task description 4",
//             checked: true,
//             category: "B",
//           },
//           {
//             description: "task description 5",
//             checked: true,
//             category: "C",
//           },
//           {
//             description: "task description 6",
//             checked: true,
//             category: "C",
//           },
//           {
//             description: "task description 7",
//             checked: true,
//             category: "D",
//           },
//           {
//             description: "task description 8",
//             checked: true,
//             category: "D",
//           },
//         ],
//       }));
//       setworkExperience(initialWork);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     // Calculate the number of selected tasks in each category
//     const counts = workexperiences.reduce(
//       (acc, job) => {
//         job.tasks.forEach((task) => {
//           if (task.checked) {
//             acc[task.category]++;
//           }
//         });
//         return acc;
//       },
//       { A: 0, B: 0, C: 0, D: 0 }
//     );

//     // Calculate the total number of tasks in each category
//     const totalTasksInCategory = workexperiences.reduce(
//       (acc, job) => {
//         job.tasks.forEach((task) => {
//           acc[task.category]++;
//         });
//         return acc;
//       },
//       { A: 0, B: 0, C: 0, D: 0 }
//     );

//     // Update the selected task counts for each category as a proportion of total tasks
//     setSelectedTasksA(counts.A / totalTasksInCategory.A);
//     setSelectedTasksB(counts.B / totalTasksInCategory.B);
//     setSelectedTasksC(counts.C / totalTasksInCategory.C);
//     setSelectedTasksD(counts.D / totalTasksInCategory.D);
//   }, [workexperiences]);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//   };

//   function handleConfirm() {
//     navigate("/philosophy", {
//       state: { from: location, workexperiences: workexperiences },
//     });
//   }
//   function handleRegenerate() {
//     navigate("/confirm");
//   }

//   function handleChecked(jobIndex, taskIndex) {
//     // Create a copy of the taskData
//     const updatedWorkExperiences = [...workexperiences];
//     // Toggle the checked state
//     updatedWorkExperiences[jobIndex].tasks[taskIndex].checked =
//       !updatedWorkExperiences[jobIndex].tasks[taskIndex].checked;
//     // Update the state
//     setworkExperience(updatedWorkExperiences);
//   }

//   return (
//     <>
//       <div className="mainDiv">
//         <div className="content">
//           <div className={styles.bubblesDiv}>
//             <div
//               className={styles.bubbleDiv}
//               style={{
//                 justifyContent: "flex-end",
//                 alignItems: "flex-end",
//               }}
//             >
//               <motion.div
//                 className={styles.bubble}
//                 animate={{
//                   x: [-10, 10, -20, 0],
//                   y: [-20, 20, 30, -10],
//                 }}
//                 transition={{
//                   duration: 6,
//                   ease: "easeInOut",
//                   repeat: Infinity,
//                   // repeatDelay: 1,
//                 }}
//                 style={{
//                   // width: `${selectedTasksD * 10}rem`,
//                   // height: `${selectedTasksD * 10}rem`,
//                   backgroundColor: "yellow",
//                   scale: selectedTasksA * 1,
//                 }}
//               ></motion.div>
//             </div>
//             <div
//               className={styles.bubbleDiv}
//               style={{
//                 justifyContent: "flex-start",
//                 alignItems: "flex-end",
//               }}
//             >
//               <motion.div
//                 className={styles.bubble}
//                 animate={{
//                   x: [0, 10, -20, 0],
//                   y: [0, 20, 30, -10],
//                 }}
//                 transition={{
//                   duration: 6,
//                   ease: "easeInOut",
//                   repeat: Infinity,
//                   // repeatDelay: 1,
//                 }}
//                 style={{
//                   // width: `${selectedTasksD * 10}rem`,
//                   // height: `${selectedTasksD * 10}rem`,
//                   backgroundColor: "blue",
//                   scale: selectedTasksB * 1,
//                 }}
//               ></motion.div>
//             </div>
//             <div
//               className={styles.bubbleDiv}
//               style={{
//                 justifyContent: "flex-end",
//                 alignItems: "flex-start",
//               }}
//             >
//               <motion.div
//                 className={styles.bubble}
//                 animate={{
//                   x: [-10, 0, -20, -10],
//                   y: [-10, 20, 10, -10],
//                 }}
//                 transition={{
//                   duration: 6,
//                   ease: "easeInOut",
//                   repeat: Infinity,
//                   // repeatDelay: 1,
//                 }}
//                 style={{
//                   // width: `${selectedTasksD * 10}rem`,
//                   // height: `${selectedTasksD * 10}rem`,
//                   backgroundColor: "red",
//                   scale: selectedTasksC * 1,
//                 }}
//               ></motion.div>
//             </div>
//             <div
//               className={styles.bubbleDiv}
//               style={{
//                 justifyContent: "flex-start",
//                 alignItems: "flex-start",
//               }}
//             >
//               <motion.div
//                 className={styles.bubble}
//                 animate={{
//                   x: [-10, 40, 50, 10],
//                   y: [10, 20, 30, 20],
//                 }}
//                 transition={{
//                   duration: 6,
//                   ease: "easeInOut",
//                   repeat: Infinity,
//                   // repeatDelay: 1,
//                 }}
//                 style={{
//                   // width: `${selectedTasksD * 10}rem`,
//                   // height: `${selectedTasksD * 10}rem`,
//                   backgroundColor: "pink",
//                   scale: selectedTasksD * 1,
//                 }}
//               ></motion.div>
//             </div>
//           </div>
//           <motion.div
//             className={styles.TextDiv}
//             initial={{ y: 0, opacity: 0 }}
//             animate={{ y: 10, opacity: 1 }}
//             transition={{
//               delay: 0,
//               ease: "linear",
//               type: "spring",
//               stiffness: 50,
//               duration: 2,
//             }}
//           >
//             These are the tasks that we have mapped from your CV details. Would
//             you like to confirm them? Feel free to deselect tasks that are not
//             relevant.
//             <div>
//               {workexperiences.map((job, jobIndex) => (
//                 <div key={jobIndex}>
//                   <h3>{job.jobName}</h3>
//                   {job.tasks.map((task, taskIndex) => (
//                     <div key={taskIndex}>
//                       {task.description}
//                       <input
//                         type="checkbox"
//                         checked={task.checked}
//                         onChange={() => handleChecked(jobIndex, taskIndex)}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//             <div className={styles.buttonRow}>
//               {/* <button className={styles.button} onClick={handleRegenerate}>
//                 Regenerate
//               </button> */}
//               <button className={styles.button} onClick={handleConfirm}>
//                 Confirm
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ConfirmTasks;
