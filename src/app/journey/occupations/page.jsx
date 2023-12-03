"use client";
import { useRouter } from "next/navigation";
import {
  useState,
  useEffect,
  useDeferredValue,
  Suspense,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./styles.module.css";
import axios from "axios";
import tsslogo from "public/tss.svg";
import tsslight from "public/tss_light.svg";
import Header from "@/app/components/Header";
import debounce from "lodash.debounce";
import { addData } from "@/app/utils/indexdb";
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const [filename] = useState(uuidv4());
  const router = useRouter();
  const [speechVisible, setSpeechVisible] = useState(true);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [toggleInput, setToggleInput] = useState(false);
  const [keyword, setKeyword] = useState("");
  const deferredKeyword = useDeferredValue(keyword);
  const [displayResults, setDisplayResults] = useState([]);
  const [searching, setSearch] = useState(true);

  const handleGetTitles = async (userinput) => {
    try {
      if (userinput != "") {
        var url = "/api/onet?userInput=" + encodeURIComponent(userinput);
        const res = await axios.get(url);
        await console.log(userinput, res.data.res);
        await setDisplayResults(res.data.res);
      }
      /*  */
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetTitles(deferredKeyword);
  }, [deferredKeyword]);

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

  async function handleNext() {
    const jobsselectedstring = await JSON.stringify(selectedJobs);
    await addData(filename, jobsselectedstring);
    router.push("/journey/occupations/uploadcv");
  }

  function handleFinishSelectJob() {
    // setSearch(false);
    setKeyword("");
    setToggleInput(false);
  }

  const debouncedkeyword = debounce(handleKeywordChange, 300);

  function handleKeywordChange(e) {
    setKeyword(e.target.value);
    setSearch(true);
  }

  return (
    <div className="flex flex-col items-center h-screen w-screen overflow-scroll mb-[2rem]">
      {speechVisible ? (
        <div className="w-10/12">
          <Image
            src={tsslight}
            width={60}
            height={60}
            className="mt-[2rem]"
            alt="TSS Logo"
          ></Image>
        </div>
      ) : (
        <Header></Header>
      )}
      <motion.div
        className="h-fit text-xl w-10/12 mt-[2rem] "
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
              Ok! Now that we know that you have had work experience, we can
              begin!
            </p>
            <p>
              To help you plan your journey, we need to know your last stop:
              <u className="text-semibold">
                <i> tell us what your current/previous occupations are.</i>
              </u>
            </p>
            <p>
              This will help us find the optimal path for you. Don't worry, your
              data's safe with us.
            </p>
          </div>
        ) : null}
      </motion.div>

      <motion.div
        className="flex w-10/12 flex-col justify-center"
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
            className="  bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold mt-[3rem] mb-[4rem] rounded-full"
            onClick={handleAddOccupation}
          >
            Add Occupation
          </button>
        ) : (
          <div className="w-full">
            <div>
              {selectedJobs.map((job, index) => (
                <p className="text-2xl text-[#D9D9D9]" key={index}>
                  {job}
                </p>
              ))}
            </div>
            {toggleInput ? (
              <div>
                <div>
                  {/* <p className="pl-[1rem] font-bold">Key in your Occupation</p> */}
                  <input
                    type="text"
                    className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold  mt-[1rem] mb-[1rem] rounded-full"
                    onChange={debouncedkeyword}
                    placeholder="Key in your Occupation"
                  ></input>
                </div>
                {searching && keyword != "" ? (
                  <div className="flex flex-col mt-2 pl-[1rem] ">
                    {displayResults?.map((result) => (
                      <button
                        className="text-start "
                        key={result.code}
                        value={result.title}
                        onClick={handleSelectJob}
                      >
                        {result.title}
                      </button>
                    ))}

                    {/* <button className="go-back ">go back</button> */}
                  </div>
                ) : null}
              </div>
            ) : (
              <button onClick={handleAddOccupation}>
                <div className="w-[2.5rem] h-[2.5rem] p-2 bg-[#908F8F] mt-[1rem] text-[#474545] rounded-full ">
                  +
                </div>
              </button>
            )}
          </div>
        )}
        {toggleInput === false && speechVisible === false ? (
          <button
            className=" w-full bg-[#D9D9D9] p-[1rem] text-[#474545] font-bold mt-[4rem] rounded-full"
            onClick={handleNext}
          >
            Next
          </button>
        ) : null}
        {/* {searching ? (
          <button
            onClick={handleFinishSelectJob}
            className="w-[2rem] h-[2rem] bg-[#908F8F] rounded-full flex justify-center items-center self-center "
          >
            <FiChevronRight className="w-[1.5rem] h-[1.5rem] text-[#474545]" />
          </button>
        ) : null} */}
      </motion.div>
    </div>
  );
}
