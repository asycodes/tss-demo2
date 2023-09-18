"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

function Page() {
  const router = useRouter();
  const [workexperiences, setworkExperience] = useState([]);
  const [selectedTasksA, setSelectedTasksA] = useState(0);
  const [selectedTasksB, setSelectedTasksB] = useState(0);
  const [selectedTasksC, setSelectedTasksC] = useState(0);
  const [selectedTasksD, setSelectedTasksD] = useState(0);
  useEffect(() => {
    scrollToTop();
    console.log(workexperiences);

    if (location.state && location.state.workexperiences) {
      const initialWork = location.state.workexperiences.map((work) => ({
        jobName: work.jobName,
        experience: work.experience,
        tasks: [
          {
            description: "task description 1",
            checked: true,
            category: "A",
          },
          {
            description: "task description 2",
            checked: true,
            category: "A",
          },
          {
            description: "task description 3",
            checked: true,
            category: "B",
          },
          {
            description: "task description 4",
            checked: true,
            category: "B",
          },
          {
            description: "task description 5",
            checked: true,
            category: "C",
          },
          {
            description: "task description 6",
            checked: true,
            category: "C",
          },
          {
            description: "task description 7",
            checked: true,
            category: "D",
          },
          {
            description: "task description 8",
            checked: true,
            category: "D",
          },
        ],
      }));
      setworkExperience(initialWork);
    }
  }, [location.state]);

  useEffect(() => {
    // Calculate the number of selected tasks in each category
    const counts = workexperiences.reduce(
      (acc, job) => {
        job.tasks.forEach((task) => {
          if (task.checked) {
            acc[task.category]++;
          }
        });
        return acc;
      },
      { A: 0, B: 0, C: 0, D: 0 }
    );

    // Calculate the total number of tasks in each category
    const totalTasksInCategory = workexperiences.reduce(
      (acc, job) => {
        job.tasks.forEach((task) => {
          acc[task.category]++;
        });
        return acc;
      },
      { A: 0, B: 0, C: 0, D: 0 }
    );

    // Update the selected task counts for each category as a proportion of total tasks
    setSelectedTasksA(counts.A / totalTasksInCategory.A);
    setSelectedTasksB(counts.B / totalTasksInCategory.B);
    setSelectedTasksC(counts.C / totalTasksInCategory.C);
    setSelectedTasksD(counts.D / totalTasksInCategory.D);
  }, [workexperiences]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  function handleConfirm() {
    // navigate("/journey/occupations/summary", {
    //   state: { from: location, workexperiences: workexperiences },
    // });
    router.push("/journey/occupations/summary");
  }

  function handleChecked(jobIndex, taskIndex) {
    // Create a copy of the taskData
    const updatedWorkExperiences = [...workexperiences];
    // Toggle the checked state
    updatedWorkExperiences[jobIndex].tasks[taskIndex].checked =
      !updatedWorkExperiences[jobIndex].tasks[taskIndex].checked;
    // Update the state
    setworkExperience(updatedWorkExperiences);
  }

  return (
    <>
      <div className="mainDiv">
        <div className="content">
          <div className={styles.bubblesDiv}>
            <div
              className={styles.bubbleDiv}
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <motion.div
                className={styles.bubble}
                animate={{
                  x: [-10, 10, -20, 0],
                  y: [-20, 20, 30, -10],
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  // repeatDelay: 1,
                }}
                style={{
                  // width: `${selectedTasksD * 10}rem`,
                  // height: `${selectedTasksD * 10}rem`,
                  backgroundColor: "yellow",
                  scale: selectedTasksA * 1,
                }}
              ></motion.div>
            </div>
            <div
              className={styles.bubbleDiv}
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              <motion.div
                className={styles.bubble}
                animate={{
                  x: [0, 10, -20, 0],
                  y: [0, 20, 30, -10],
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  // repeatDelay: 1,
                }}
                style={{
                  // width: `${selectedTasksD * 10}rem`,
                  // height: `${selectedTasksD * 10}rem`,
                  backgroundColor: "blue",
                  scale: selectedTasksB * 1,
                }}
              ></motion.div>
            </div>
            <div
              className={styles.bubbleDiv}
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-start",
              }}
            >
              <motion.div
                className={styles.bubble}
                animate={{
                  x: [-10, 0, -20, -10],
                  y: [-10, 20, 10, -10],
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  // repeatDelay: 1,
                }}
                style={{
                  // width: `${selectedTasksD * 10}rem`,
                  // height: `${selectedTasksD * 10}rem`,
                  backgroundColor: "red",
                  scale: selectedTasksC * 1,
                }}
              ></motion.div>
            </div>
            <div
              className={styles.bubbleDiv}
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <motion.div
                className={styles.bubble}
                animate={{
                  x: [-10, 40, 50, 10],
                  y: [10, 20, 30, 20],
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  // repeatDelay: 1,
                }}
                style={{
                  // width: `${selectedTasksD * 10}rem`,
                  // height: `${selectedTasksD * 10}rem`,
                  backgroundColor: "pink",
                  scale: selectedTasksD * 1,
                }}
              ></motion.div>
            </div>
          </div>
          <motion.div
            className={styles.TextDiv}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            transition={{
              delay: 0,
              ease: "linear",
              type: "spring",
              stiffness: 50,
              duration: 2,
            }}
          >
            These are the tasks that we have mapped from your CV details. Would
            you like to confirm them? Feel free to deselect tasks that are not
            relevant.
            <div>
              {workexperiences.map((job, jobIndex) => (
                <div key={jobIndex}>
                  <h3>{job.jobName}</h3>
                  {job.tasks.map((task, taskIndex) => (
                    <div key={taskIndex}>
                      {task.description}
                      <input
                        type="checkbox"
                        checked={task.checked}
                        onChange={() => handleChecked(jobIndex, taskIndex)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.buttonRow}>
              {/* <button className={styles.button} onClick={handleRegenerate}>
                Regenerate
              </button> */}
              <button className={styles.button} onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Page;
