"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

function Page() {
  const router = useRouter();
  function handleNext() {
    router.push("/journey/occupations");
  }
  return (
    <>
      <div className="mainDiv">Transition Map</div>
      <button onClick={handleNext} className={styles.button}>
        Next
      </button>
    </>
  );
}

export default Page;
