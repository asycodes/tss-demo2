"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import Header from "@/app/components/Header";
import axios from "axios";
import { method } from "lodash";


export default function Page() {
  const router = useRouter();

  const [uploaded, setUploaded] = useState(false);

  function handleUploaded(e) {
    try {
      // TO ADD !!! NEED TO CHECK IF THE FILE IS A PDF!
      const formData = new FormData();
      formData.append(
        "file",
        document.getElementById("cvfile").files[0],
        "11122.pdf"
      );
      console.log(formData);
      const res = fetch("/api/uploadcv", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }).then((res) => {
        setUploaded(true);
      });
    } catch (error) {
      console.error(error);
    }
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
      <div className="flex flex-col items-center h-screen overflow-scroll">
        <motion.div
          className="w-10/12  mb-[7rem]"
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
          <div className="flex flex-col gap-5 text-3xl mt-[1rem]">
            <p className="">
              Next, tell us about what you have done in your current/previous
              occupations.
            </p>
            <p className="">
              To help you in this process, we can get started by looking at your
              CV.
            </p>
            <p className="">Would you like to upload your CV?</p>
          </div>
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
            id="cvfile"
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
