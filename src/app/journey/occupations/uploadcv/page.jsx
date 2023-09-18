"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

export default function Page() {
  const router = useRouter();

  const [upload, setUpload] = useState(true);
  const [uploaded, setUploaded] = useState(false);

  function handleUploaded(e) {
    setUploaded(true);
  }

  function handleNext() {
    router.push("/journey/occupations/edit");
  }

  return (
    <div className="mainDiv">
      <div className="flex flex-col items-center justify-center h-screen">
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
  );
}
