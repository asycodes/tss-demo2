"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from './styles.module.css'
// First page theyll see for the app!

export default function Page() {
    const router = useRouter()

    const [upload, setUpload] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const [speechVisible, setSpeechVisible] = useState(true);
    const [searchJob, setSearchJob] = useState("");

    //temp
    const [search, setSearch] = useState(false);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [confirmJobs, setConfirmJobs] = useState(false);
    const [toggleInput, setToggleInput] = useState(false);

    function handleYes() {
        setUpload(true);
      }
      function handleNo() {
        router.push('/occupations')
      }
    
      function handleUploaded(e) {
        setUploaded(true);
      }
    
      function handleNext() {
        router.push('/confirm')
      }
    
      function handleJobChange(e) {
        const inputJob = e.target.value;
        setSearchJob(inputJob);
      }
      function handleSearchJob() {
        //make api call here later
        setSearch(true);
      }
      function selectJob(e) {
        const job = e.target.value;
        setSelectedJobs([...selectedJobs, job]);
        setSearch(false);
      }
      function handleConfirm() {
        setConfirmJobs(true);
      }
    
      function handleAddOccupation() {
        setSpeechVisible(false);
        setToggleInput(true);
      }
    return (
        <div className="mainDiv">
        <div className="flex flex-col items-center justify-center h-screen">
          <motion.div
            className={styles.IntroTextDiv}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: speechVisible ? 10 : -500,
              opacity: speechVisible ? 1 : 0,
              height: speechVisible ? 1000 : 0,
            }}
            transition={{
              ease: "easeInOut",
              type: "spring",
              stiffness: 30,
              duration: 3,
            }}
          >
            <h2>
              Greetings, traveler of the cosmos! <br /> <br />
              In your journey through the vast expanse, might you consider
              gracing me with the knowledge contained within your CV/resume?
              <br /> <br />
              Such information could illuminate the pathways of understanding
              between your terrestrial experiences and the cosmic fabric. <br />
              <br /> Should you deem it appropriate, do share your document, and
              fear not, for in the cosmic realm, your data shall remain secure
              and guarded. Speak the word, and the process shall begin!
            </h2>
          </motion.div>

          <motion.div
            className={styles.TextDiv}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              ease: "easeInOut",
              type: "spring",
              stiffness: 50,
              duration: 5,
            }}
          >
            {toggleInput ? (
              <input
                type="text"
                className={styles.jobsInput}
                placeholder="Find Occupation"
              ></input>
            ) : (
              <button className={styles.button} onClick={handleAddOccupation}>
                Add Occupation
              </button>
            )}
          </motion.div>

          {/* <div>
              <input
                list="job"
                id="job"
                type="text"
                placeholder="type job here"
                onChange={handleJobChange}
                value={searchJob}
              ></input>
              <button onClick={handleSearchJob}>search</button>
            </div> */}
          {/* {search ? (
              <div>
                <button onClick={selectJob} value="job 1">
                  job 1 result
                </button>
                <button onClick={selectJob} value="job 2">
                  job 2 result
                </button>
                <button onClick={selectJob} value="job 3">
                  job 3 result
                </button>
              </div>
            ) : null} */}

          {/* <div>Selected Jobs</div>
            <div>{selectedJobs}</div>
            <button onClick={handleConfirm}>Confirm Jobs</button>
            {confirmJobs ? (
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 10, opacity: 1 }}
                transition={{
                  delay: 0,
                  ease: "linear",
                  type: "spring",
                  stiffness: 50,
                  duration: 2,
                }}
                className={styles.buttonRow}
              >
                <button className={styles.button} onClick={handleYes}>
                  Yes
                </button>
                <button className={styles.button} onClick={handleNo}>
                  No
                </button>
              </motion.div>
            ) : null} */}

          {upload ? (
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
              <p>Please upload your CV below</p>
              <input
                onChange={handleUploaded}
                className={styles.uploadCV}
                type="file"
              ></input>
            </motion.div>
          ) : null}
          {uploaded ? (
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
              <p>Thank you, your CV has been uploaded.</p>
              <button onClick={handleNext} className={styles.button}>
                Next
              </button>
            </motion.div>
          ) : null}
        </div>
      </div>
    )


  }