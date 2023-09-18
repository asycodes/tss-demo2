"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

function Page() {
  const router = useRouter();
  const [hobbies, setHobbies] = useState([]);
  // const [workexperiences, setworkExperience] = useState(
  //   location.state.workexperiences
  // );

  // console.log(workexperiences);
  // Check if hobbies is empty, and if so, add an empty hobby
  if (hobbies.length === 0) {
    setHobbies([{ hobbyName: "" }]);
  }

  function handleConfirm() {
    // navigate("/hobbies/likes", {
    //   state: {
    //     hobbies: hobbies.filter((hobby) => hobby.hobbyName !== ""),
    //     workexperiences: workexperiences,
    //   },
    // });
    router.push("/journey/hobbies/career");
  }

  function handleHobbyChange(index, value) {
    const updatedHobbies = [...hobbies];
    updatedHobbies[index].hobbyName = value;
    setHobbies(updatedHobbies);
  }

  function handleAddHobbies() {
    setHobbies([...hobbies, { hobbyName: "" }]);
  }

  function handleRemoveHobbies(index) {
    const updatedHobbies = [...hobbies];
    updatedHobbies.splice(index, 1);
    setHobbies(updatedHobbies);
  }

  return (
    <>
      <div className="mainDiv">
        <div className="content">
          <motion.div
            className={styles.TextDiv}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            transition={{
              ease: "linear",
              type: "spring",
              stiffness: 50,
              duration: 2,
            }}
          >
            {/* ... */}
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
            <div className={styles.addJobsDiv}>
              <h3>My Hobbies</h3>
              <button className={styles.addButton} onClick={handleAddHobbies}>
                +
              </button>
            </div>

            {hobbies.map((hobby, index) => (
              <div key={index} className={styles.jobDiv}>
                <h3 className={styles.title}>Hobby {index + 1}</h3>
                <div className={styles.editableSubtitleDiv}>
                  <input
                    type="text"
                    value={hobby.hobbyName}
                    className={styles.occupationInput}
                    placeholder="e.g. volunteering, dancing"
                    onChange={(e) => handleHobbyChange(index, e.target.value)}
                  />
                  <button
                    className={styles.addButton}
                    onClick={() => handleRemoveHobbies(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
            <button className={styles.button} onClick={handleConfirm}>
              Confirm Hobbies
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Page;
