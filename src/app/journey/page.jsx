"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import BallBG from "../components/ball";
// import test from "../components/test.mp4";
// First page theyll see for the app!

export default function Page() {
  const router = useRouter();
  return (
    <div className="h-screen max-w-screen w-screen overflow-x-hidden">
      <BallBG />
      {/* <video
        height="320"
        width="320"
        muted
        src={test}
        // autoPlay={"autoplay"}
        autoPlay
        preLoad="auto"
        loop
      >
        <source src={test} type="video/mp4"></source>
      </video> */}
      {/* <video autoPlay loop style={{ width: "500px", height: "500px" }}>
        <source src="/test.mp4" type="video/mp4" />
      </video> */}
      <div className="flex w-full justify-center h-screen items-center">
        <h1 className="text-[3rem] font-bold z-10">100 ways</h1>
      </div>
    </div>
  );
}
