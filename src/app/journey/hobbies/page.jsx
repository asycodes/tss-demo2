"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import tsslogo from "public/tss_light.svg";
import Image from "next/image";
import Header from "@/app/components/Header";

function Page() {
  const router = useRouter();
  const [hobbies, setHobbies] = useState([]);
  // const [workexperiences, setworkExperience] = useState(
  //   location.state.workexperiences
  // );

  // console.log(workexperiences);
  // Check if hobbies is empty, and if so, add an empty hobby
  if (hobbies.length === 0) {
    setHobbies([{ hobbyName: "" }]);
  }

  function handleHobbyChange(index, value) {
    const updatedHobbies = [...hobbies];
    updatedHobbies[index].hobbyName = value;
    setHobbies(updatedHobbies);
  }

  function handleAddHobbies() {
    setHobbies([...hobbies, { hobbyName: "" }]);
  }

  function handleRemoveHobbies(index) {
    const updatedHobbies = [...hobbies];
    updatedHobbies.splice(index, 1);
    setHobbies(updatedHobbies);
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
            <Image
              src={tsslogo}
              width={60}
              alt="TESA Logo"
              className="mt-[2rem]"
            ></Image>
            <div className="flex flex-col gap-5 text-3xl mt-[1rem]">
              <p className="">
                We at <b className="text-[#F8B3A5]">T</b>
                <b className="text-[#AFB7E0]">E</b>
                <b className="text-[#F3D5A3]">S</b>
                <b className="text-[#A5DAC5]">A</b> also believe that you are
                more than what you think.
              </p>
              <p>
                By adding <u>hobbies</u> into your career pathway, you can
                discover more career options that you may not have thought about
                before.
              </p>
              <p>
                So, what do you say? Do you want to add your hobbies into your
                pathway?
              </p>
            </div>
            <button
              //   onClick={handleYes}
              className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold mt-[3rem] rounded-full"
            >
              <a href="/journey/hobbies/add">Yes, let me add my hobbies.</a>
            </button>
            <button
              //   onClick={handleNo}
              className=" w-full p-[1rem] border font-bold mt-[1rem] mb-[3rem] rounded-full"
            >
              <a href="/journey/summary">
                No, I prefer to separate my hobbies.
              </a>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Page;
