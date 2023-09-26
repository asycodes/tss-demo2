"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
// First page theyll see for the app!

export default function Page() {
  const router = useRouter();

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
    router.push("/occupations");
  }

  function handleUploaded(e) {
    setUploaded(true);
  }

  function handleNext() {
    router.push("/confirm");
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
  return <div className="mainDiv"></div>;
}
