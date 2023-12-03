"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import Header from "@/app/components/Header";


const Tasks = (props)  => {
  const router = useRouter();
  const selectedjobs = router.query

  console.log(selectedjobs)
  useEffect(() => {
    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const [tasks, setTasks] = useState(props.tasks);
  const [editing, setEditing] = useState(false);
  const [editedTasks, setEditedTasks] = useState([...tasks]);

  const handleEdit = (index) => {
    setEditing(index); // Set the index of the task being edited
    const updatedTasks = [...editedTasks];
    updatedTasks[index] = tasks[index];
    setEditedTasks(updatedTasks);
  };

  const handleSave = (index) => {
    setEditing(false);
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedTasks[index];
    setTasks(updatedTasks);
  };
  const handleAddTask = () => {
    const newTask = ""; // You can set a default value or leave it empty
    setTasks([...tasks, newTask]);
    setEditedTasks([...editedTasks, newTask]);
    setEditing(tasks.length); // Start editing the new task
  };
  const handleDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  // const handleCancel = () => {
  //   setEditing(false);
  //   setEditedTasks([...tasks]);
  // };

  function handleNext() {
    router.push("/journey/occupations/"+ props.fileid);
  }
  
  return (
    <div>
      <div className="flex flex-col items-center h-screen overflow-scroll  ">
        <motion.div
          className="w-10/12"
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
          <p className="text-2xl text-[#D9D9D9]">
            Please write down the tasks that you have done in your career.
          </p>
          {/* <div className="mt-[2rem] text-xs">
            {tasks.map((task, index) => (
              <div className="bg-[#858484] mt-3 mb-2 p-3 text-[#D9D9D9] rounded-md">
                <p className="" key={index}>
                  {task}
                </p>
              </div>
            ))}
          </div> */}
          <div className="mt-[2rem] text-xs">
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`bg-[#858484] mt-3 mb-2 p-3 text-[#D9D9D9] flex rounded-md ${
                  editing === index ? "items-center" : ""
                }`}
              >
                {editing === index ? (
                  <>
                    <textarea
                      value={editedTasks[index]}
                      onChange={(e) => {
                        const updatedTasks = [...editedTasks];
                        updatedTasks[index] = e.target.value;
                        setEditedTasks(updatedTasks);
                      }}
                      className={`flex-grow bg-transparent border-none outline-none text-[#D9D9D9] ${
                        editing === index ? "h-[3rem]" : "h-[2rem]"
                      }`}
                    />
                    <button
                      onClick={() => handleSave(index)}
                      className="text-[#D9D9D9] ml-2 cursor-pointer"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p
                      className=""
                      key={index}
                      onClick={() => handleEdit(index)}
                    >
                      {task}
                    </p>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-[#D9D9D9] ml-2 cursor-pointer"
                    >
                      X
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleAddTask}
            className="w-[2.5rem] h-[2.5rem] p-2 bg-[#908F8F] mt-[1rem] text-[#474545] rounded-full"
          >
            +
          </button>
          <button
            onClick={handleNext}
            className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold mt-[1rem] rounded-full"
          >
            Next
          </button>
          <button className=" w-full p-[1rem] border font-bold mt-[1rem] rounded-full mb-[5rem]">
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
export default Tasks;