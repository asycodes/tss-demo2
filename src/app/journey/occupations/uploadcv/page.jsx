"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import Header from "@/app/components/Header";

export default function Page() {
  const router = useRouter();

  const [uploaded, setUploaded] = useState(false);

  function handleUploaded(e) {
    setUploaded(true);
  }

  function handleNext() {
    router.push("/journey/occupations/edit");
  }
  const hiddenFileInput = useRef(null);
  const handleUpload = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <div>
      <Header></Header>
      <div className="flex flex-col items-center h-screen">
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
            Would you like to upload your CV?
          </p>
          {uploaded ? (
            <button
              disabled
              className=" w-full bg-[#989898] p-[1rem] text-[#474545] font-bold mt-[4rem] rounded-full"
            >
              Your CV has been uploaded
            </button>
          ) : (
            <button
              onClick={handleUpload}
              className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold mt-[4rem] rounded-full"
            >
              Yes. Upload my CV
            </button>
          )}
          <input
            onChange={handleUploaded}
            className="hidden"
            type="file"
            ref={hiddenFileInput}
          ></input>
          {uploaded ? (
            <button
              onClick={handleNext}
              className=" w-full p-[1rem] border font-bold mt-[2rem] rounded-full"
            >
              Next
            </button>
          ) : (
            <button className=" w-full p-[1rem] border font-bold mt-[2rem] rounded-full">
              No. Skip this step
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
