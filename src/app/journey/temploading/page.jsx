"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThreeDotsWave from "../../components/loadingdots";

function Page() {
  const router = useRouter();
  function handleNext() {
    router.push("/journey/hobbies");
  }
  return (
    <>
      <div className="mainDiv">Summary</div>
      <ThreeDotsWave></ThreeDotsWave>
    </>
  );
}

export default Page;
