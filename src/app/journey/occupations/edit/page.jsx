"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import Header from "@/app/components/Header";



export async function getData(){
  url1 = "https://o3cejf8g04.execute-api.ap-southeast-1.amazonaws.com/dev/post-json?resume_file=5.pdf"


}

function Page() {
  const router = useRouter();
  useEffect(() => {
    scrollToTop();
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const [tasks, setTasks] = useState([
    "Conducted Design Thinking Workshops for Clients",
    "Conducted on site user research with ground staff",
    "Led a team of 10 to develop and implement business plan",
    "Prepare presentation slides and workshop materials",
  ]);

  function handleNext() {
    router.push("/journey/occupations/tasks");
  }
  return (
    <div>
      <Header></Header>
      <div className="flex flex-col items-center min-h-screen ">
        <motion.div
          className="w-11/12"
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
            Please write down the tasks that you do:
          </p>
          <div className="mt-[2rem] text-xs">
            {tasks.map((task, index) => (
              <div className="bg-[#858484] mt-3 mb-2 p-3 text-[#D9D9D9] rounded-md">
                <p className="" key={index}>
                  {task}
                </p>
              </div>
            ))}
          </div>
          <button>
            <div className="w-[2.5rem] h-[2.5rem] p-2 bg-[#908F8F] mt-[1rem] text-[#474545] rounded-full ">
              +
            </div>
          </button>
          <button
            onClick={handleNext}
            className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold mt-[1rem] rounded-full"
          >
            Next
          </button>
          <button className=" w-full p-[1rem] border font-bold mt-[1rem] rounded-full">
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Page;
