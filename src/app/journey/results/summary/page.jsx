"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

function Page() {
  const router = useRouter();
  function handleNext() {
    router.push("/journey/results/transitionmap");
  }
  return (
    <>
      <div className="mainDiv">Summary</div>
      <button onClick={handleNext} className={styles.button}>
        Next
      </button>
    </>
  );
}

export default Page;
