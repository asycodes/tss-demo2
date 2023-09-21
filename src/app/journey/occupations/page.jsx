"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import OnetWebService from "./OnetWebService";
import axios from "axios";
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
      <motion.div
        className="h-fit p-10 text-xl "
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
          <h2>
            Greetings, traveler of the cosmos! <br /> <br />
            In your journey through the vast expanse, might you consider gracing
            me with the knowledge contained within your CV/resume?
            <br /> <br />
            Such information could illuminate the pathways of understanding
            between your terrestrial experiences and the cosmic fabric. <br />
            <br /> Should you deem it appropriate, do share your document, and
            fear not, for in the cosmic realm, your data shall remain secure and
            guarded. Speak the word, and the process shall begin!
          </h2>
        ) : null}
      </motion.div>

      <motion.div
        className={styles.TextDiv}
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
          <button className={styles.button} onClick={handleAddOccupation}>
            Add Occupation
          </button>
        ) : (
          <div>
            <div>
              {selectedJobs.map((job, index) => (
                <h1 key={index}>{job}</h1>
              ))}
            </div>
            {toggleInput ? (
              <div>
                <div>
                  <input
                    type="text"
                    value={keyword}
                    className={styles.jobsInput}
                    onChange={handleKeywordChange}
                    placeholder="Find Occupation"
                  ></input>
                </div>
                {searching && keyword != "" ? (
                  <div className="flex flex-col ">
                    {displayResults.map((result) => (
                      <button
                        className="text-start "
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
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
