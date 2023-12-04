/* "use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import Header from "@/app/components/Header";
import axios from "axios";
import { openDB,getLatestData } from "@/app/utils/indexdb";



// to reduce aws lambda coldstart
const dummy = async () =>{
  const url = "https://9hxkxfyhu4.execute-api.ap-southeast-1.amazonaws.com/dev/post-json";
  try {
    const json = JSON.stringify({
      action: "select",
      table: "resume_sent_job_done",
      task: "na",
      iwa: "na",
      filename: "5.pdf",
      column: "job_done"
    });

    const res = await axios(url, {
      method: "POST",
      data: json,
    });
    const jsonData = await JSON.parse(res.data.body);
    return jsonData.flat()
  } catch (error) {
    console.error(error);
    return []
  }
}


export default function Page() {

  const [filename,setFilename] = useState()

  const fetchData = async () => {
    try {
      const response = await getLatestData();
      setFilename(response.filename)
      console.log("fileNAME:",filename)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const dummyfunc = dummy()
  const router = useRouter();
  const [uploaded, setUploaded] = useState(false);

  async function asynchandleUploaded(e) {
    console.log(filename)
    try {
      console.log("Checkfile name:",filename)
      // TO ADD !!! NEED TO CHECK IF THE FILE IS A PDF!
      const formData = new FormData();
      formData.append(
        "file",
        document.getElementById("cvfile").files[0],
        filename + '.pdf'
      );
      console.log(formData);
      console.log("Checkfile2 name:",filename)
      const res = await fetch("/api/uploadcv?filename=" + encodeURIComponent(filename), {
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
    console.log(dummyfunc)
    console.log(filename)
    router.push("/journey/occupations/uploadcv/" + filename);
  }

  //what is this route?
  function handleNo() {
    router.push("/journey/occupations/occupationtasks");
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
            onChange={asynchandleUploaded}
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
            <button
              onClick={handleNo}
              className=" w-full p-[1rem] border font-bold mt-[2rem] rounded-full"
            >
              No. Skip this step
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
 */


"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import Header from "@/app/components/Header";
import axios from "axios";
import { openDB, getLatestData } from "@/app/utils/indexdb";

// to reduce aws lambda coldstart
const dummy = async () => {
  const url =
    "https://9hxkxfyhu4.execute-api.ap-southeast-1.amazonaws.com/dev/post-json";
  try {
    const json = JSON.stringify({
      action: "select",
      table: "resume_sent_job_done",
      task: "na",
      iwa: "na",
      filename: "5.pdf",
      column: "job_done",
    });

    const res = await axios(url, {
      method: "POST",
      data: json,
    });
    const jsonData = await JSON.parse(res.data.body);
    return jsonData.flat();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function Page() {
  const [filename, setFilename] = useState();

  const fetchData = async () => {
    try {
      const response = await getLatestData();
      const data = response;
      setFilename(data.filename);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const dummyfunc = dummy();
  const router = useRouter();
  const [uploaded, setUploaded] = useState(false);

  async function asynchandleUploaded(e) {
    try {
      console.log("Checkfile name:", filename);
      // TO ADD !!! NEED TO CHECK IF THE FILE IS A PDF!
      const formData = new FormData();
      formData.append(
        "file",
        document.getElementById("cvfile").files[0],
        filename + ".pdf"
      );
      console.log(formData);
      const res = await fetch("/api/uploadcv?filename=" + encodeURIComponent(filename), {
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
    console.log(dummyfunc);
    console.log(filename);
    router.push("/journey/occupations/uploadcv/" + filename);
  }

  //what is this route?
  function handleNo() {
    router.push("/journey/occupations/occupationtasks");
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
            onChange={asynchandleUploaded}
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
            <button
              onClick={handleNo}
              className=" w-full p-[1rem] border font-bold mt-[2rem] rounded-full"
            >
              No. Skip this step
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}