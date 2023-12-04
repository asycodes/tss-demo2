"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navburger from "../components/navburger";
import tsslogo from "public/tss_light.svg";
import tesalogo from "public/TESSA_FINAL.svg";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const router = useRouter();
  const [disappear, setDisappear] = useState(false);

  const [name, setName] = useState("");
  const [confirmedName, setconfirmedName] = useState(false);

  function handleNameChange(e) {
    const inputname = e.target.value;
    setName(inputname);
  }

  function handleConfirmName() {
    setconfirmedName(true);
  }

  function handleTSS() {}

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: "easeInOut",
        type: "spring",
        stiffness: 15,
        duration: 1,
      }}
      className="h-screen w-screen overflow-scroll"
    >
      <Navburger />
      <div className="w-11/12 h-full"></div>
    </motion.div>
  );
}
