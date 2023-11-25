"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import tsslogo from "public/tss_light.svg";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import Header from "@/app/components/Header";

function Page() {
  const router = useRouter();
  const [hobbyinput, setHobbyInput] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [addhobby, setAddHobby] = useState(true);

  function handleHobbyChange(e) {
    const inputhobby = e.target.value;
    setHobbyInput(inputhobby);
  }

  function handleAddHobby() {
    const newhobby = hobbyinput;
    setHobbies([...hobbies, newhobby]);
    setAddHobby(false);
  }

  function handleAddMoreHobby() {
    setAddHobby(true);
    setHobbyInput("");
  }

  function handleNext() {
    router.push("/journey/hobbies/tasks");
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
        <div className="w-10/12  flex flex-col justify-center  text-start ">
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
            <Header></Header>
            {hobbies.map((hobby, index) => (
              <p className="text-2xl text-[#D9D9D9]" key={index}>
                {hobby}
              </p>
            ))}
            {addhobby ? (
              <>
                <input
                  type="text"
                  className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold  mt-[1rem] mb-[1rem] rounded-full"
                  onChange={handleHobbyChange}
                  value={hobbyinput}
                  placeholder="Key in your Hobby"
                ></input>

                <button onClick={handleAddHobby}>
                  <div className="w-[2.5rem] h-[2.5rem] p-2 bg-[#908F8F] mt-[1rem] text-[#474545] rounded-full ">
                    +
                  </div>
                </button>
              </>
            ) : (
              <div>
                <button onClick={handleAddMoreHobby}>
                  <div className="w-[2.5rem] h-[2.5rem] p-2 bg-[#908F8F] mt-[1rem] text-[#474545] rounded-full ">
                    +
                  </div>
                </button>
                <button
                  className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold mt-[4rem] rounded-full"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Page;
