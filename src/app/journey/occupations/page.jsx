"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./styles.module.css";
import OnetWebService from "./OnetWebService";
import axios from "axios";
import tsslogo from "public/tss.svg";
import Header from "@/app/components/Header";
// First page theyll see for the app!

export default function Page() {
  const router = useRouter();
  const [speechVisible, setSpeechVisible] = useState(true);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [toggleInput, setToggleInput] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [displayResults, setDisplayResults] = useState([]);
  const [searching, setSearch] = useState(true);

  const handleGetTitles = async () => {
    try {
      const username = "singapore_university";
      const password = "3594cgj";

      const authHeader =
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
      const response = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://services.onetcenter.org/ws/online/search?keyword=${keyword}&start=1&end=10`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      const occ_arr = response.data.occupation;

      if (occ_arr === undefined) {
        await handleGetTitles();
      } else {
        setResults(occ_arr);
        return;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetTitles();

    setDisplayResults(results);
  }, [keyword]);

  function handleJobChange(e) {
    const inputJob = e.target.value;
    setSearchJob(inputJob);
  }

  function handleSelectJob(e) {
    const job = e.target.value;
    setSelectedJobs([...selectedJobs, job]);
    setSearch(false);
    setKeyword("");
    setToggleInput(false);
  }

  useEffect(() => {
    console.log(selectedJobs);
  }, [selectedJobs]);

  function handleConfirm() {
    setConfirmJobs(true);
  }

  function handleAddOccupation() {
    setSpeechVisible(false);

    setToggleInput(true);
  }

  function handleNext() {
    router.push("/journey/occupations/uploadcv");
  }

  function handleKeywordChange(e) {
    setKeyword(e.target.value);
    setSearch(true);
  }

  return (
    <div className="flex flex-col items-center h-screen w-screen overflow-scroll ">
      {speechVisible ? (
        <div className="w-full">
          <Image
            src={tsslogo}
            width={56}
            height={56}
            className="m-5"
            alt="TSS Logo"
          ></Image>
        </div>
      ) : (
        <Header></Header>
      )}
      <motion.div
        className="h-fit pl-5 pr-5 text-xl "
        initial={{ y: 0, opacity: 0 }}
        animate={{
          y: speechVisible ? 0 : -600,
          opacity: speechVisible ? 1 : 0,
          height: speechVisible ? 1000 : 0,
        }}
        transition={{
          ease: "easeInOut",
          type: "spring",
          stiffness: 30,
          duration: 2,
        }}
      >
        {speechVisible ? (
          <div className="flex flex-col gap-5 text-3xl">
            <p className="">
              Hello! Welcome to your journey through the universe of careers!
            </p>
            <p>
              To help you plan your journey, we need to know your last stop:
              tell us what your current/previous occupations are.
            </p>
            <p>
              This will help us find the optimal path for you. Don't worry, your
              data's safe with us.
            </p>
          </div>
        ) : null}
      </motion.div>

      <motion.div
        className="flex w-11/12"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          type: "spring",
          stiffness: 50,
          duration: 3,
        }}
      >
        {speechVisible ? (
          <button
            className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold mt-[4rem] rounded-full"
            onClick={handleAddOccupation}
          >
            Add Occupation
          </button>
        ) : (
          <div className="w-full">
            <div>
              {selectedJobs.map((job, index) => (
                <h1 key={index}>{job}</h1>
              ))}
            </div>
            {toggleInput ? (
              <div>
                <div>
                  <p className="pl-[1rem] font-bold">Key in your Occupation</p>
                  <input
                    type="text"
                    value={keyword}
                    className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold mt-1 rounded-full"
                    onChange={handleKeywordChange}
                    placeholder="Find Occupation"
                  ></input>
                </div>
                {searching && keyword != "" ? (
                  <div className="flex flex-col mt-2 pl-[1rem] ">
                    {displayResults.map((result) => (
                      <button
                        className="text-start"
                        key={result.code}
                        value={result.title}
                        onClick={handleSelectJob}
                      >
                        {result.title}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <button onClick={handleAddOccupation}>+</button>
            )}
          </div>
        )}
      </motion.div>

      {/* <button onClick={handleNext}>Next</button> */}
    </div>
  );
}
