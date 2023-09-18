"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

function Page() {
  const router = useRouter();
  // const [hobbies, setHobbies] = useState(location.state.hobbies);
  // const [workexperiences, setworkExperience] = useState(
  //   location.state.workexperiences
  // );
  // useEffect(() => {
  //   const initialHobbies = hobbies.map((hobby) => ({
  //     hobbyName: hobby.hobbyName,
  //     likes: hobby.likes,
  //     career: hobby.career,
  //   }));
  //   setHobbies(initialHobbies);
  // }, []);

  // function handleHobbyChange(index, value) {
  //   const updatedHobby = [...hobbies];
  //   updatedHobby[index].career = value;
  //   setHobbies(updatedHobby);
  // }

  function handleConfirm() {
    // navigate("/loading", {
    //   state: {
    //     from: location,
    //     hobbies: hobbies,
    //     workexperiences: workexperiences,
    //   },
    // });
  }

  function handleNext() {
    router.push("/journey/hobbies/tasks");
  }
  return (
    <>
      <div className="mainDiv">
        <div className="content">
          {/* <motion.div
            className={styles.TextDiv}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            transition={{
              ease: "easeInOut",
              type: "spring",
              stiffness: 50,
              duration: 3,
            }}
          >
            Describe aspects of your hobbies that you would like to be part of
            your career
          </motion.div>
          <motion.div
            className={styles.TextDiv}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            transition={{
              ease: "easeInOut",
              type: "spring",
              stiffness: 50,
              delay: 1,
              duration: 3,
            }}
          >
            {hobbies.map((hobby, index) => (
              <div key={index} className={styles.jobDiv}>
                <h3 className={styles.title}>{hobby.hobbyName}</h3>
                <textarea
                  type="text"
                  value={hobby.career}
                  onChange={(e) => handleHobbyChange(index, e.target.value)}
                  className={styles.input}
                />
              </div>
            ))}
            <button className={styles.button} onClick={handleConfirm}>
              Next
            </button>
          </motion.div> */}
          <button className={styles.button} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Page;
