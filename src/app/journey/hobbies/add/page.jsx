"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect,useDeferredValue } from "react";
import { motion } from "framer-motion";
import tsslogo from "public/tss_light.svg";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import Header from "@/app/components/Header";
import debounce from "lodash.debounce";
import axios from "axios";
import { openDB,getLatestData,updateLatestDataAttribute } from "@/app/utils/indexdb";

function Page() {
  const router = useRouter();
  const [hobbyinput, setHobbyInput] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [addhobby, setAddHobby] = useState(true);
  const [keyword, setKeyword] = useState("");
  const deferredKeyword = useDeferredValue(keyword);
  const [searching, setSearch] = useState(true);
  const [displayResults, setDisplayResults] = useState([]);
  

  const [filename,setFilename] = useState()

  const fetchData = async () => {
    try {
      const response = await getLatestData();
      const data = response
      setFilename(data.filename)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlegetHobbies = async (userinput) => {
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
    handlegetHobbies(deferredKeyword);
  }, [deferredKeyword]);


  const debouncedkeyword = debounce(handleHobbyChange, 200);

  function handleHobbyChange(e) {
    setKeyword(e.target.value);
    setSearch(true);
  }

  function handleAddHobby(e) {
    const newhobby =  e.target.value;
    setSearch(false)
    setHobbies([...hobbies, newhobby]);
    setAddHobby(false);
  }

  function handleAddMoreHobby() {
    setAddHobby(true);
    setHobbyInput("");
  }
  useEffect(() => {
    console.log(hobbies);
  }, [hobbies]);

  async function handleNext() {
    await updateLatestDataAttribute("hobbies",hobbies)
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
                  onChange={debouncedkeyword}
                  placeholder="Key in your Hobby"
                ></input>

                  {searching && keyword != "" ? (
                    <div className="flex flex-col mt-2 pl-[1rem] ">
                      {displayResults?.map((result) => (
                        <button
                          className="text-start "
                          key={result.code}
                          value={result.title}
                          onClick={handleAddHobby}
                        >
                          {result.title}
                        </button>
                      ))}
                    </div>
                ) : null}
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
