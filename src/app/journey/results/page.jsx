"use client";

import styles from "./styles.module.css";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Page() {
  useEffect(() => {
    scrollToTop();
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  function handleConfirm() {
    navigate("/loading", {
      state: { from: location, workexperiences: workexperiences },
    });
  }
  function handleSkillsChange(e) {
    setSkills(e.target.value);
  }

  const [skills, setSkills] = useState(
    "help businesses make critical financial decisions by collecting, tracking, and correcting the company's finances. They are responsible for financial audits, reconciling bank statements, and ensuring financial records are accurate throughout the year,identify the customer need and the larger business objectives that a product or feature will fulfill, articulates what success looks like for a product, and rallies a team to turn that vision into a reality."
  );
  const [workexperiences, setWorkExperience] = useState([
    {
      jobName: "Accountant",
      experience:
        "help businesses make critical financial decisions by collecting, tracking, and correcting the company's finances. They are responsible for financial audits, reconciling bank statements, and ensuring financial records are accurate throughout the year.",
    },
    {
      jobName: "Product Manager",
      experience:
        "identify the customer need and the larger business objectives that a product or feature will fulfill, articulates what success looks like for a product, and rallies a team to turn that vision into a reality.",
    },
  ]);

  function handleOccupationChange(index, value) {
    const updatedOccupations = [...workexperiences];
    updatedOccupations[index].jobName = value;
    setWorkExperience(updatedOccupations);
  }

  function handleExperienceChange(index, value) {
    const updatedWorkExperiences = [...workexperiences];
    updatedWorkExperiences[index].experience = value;
    setWorkExperience(updatedWorkExperiences);
  }

  function toggleEdit(index) {
    const updatedWorkExperiences = [...workexperiences];
    updatedWorkExperiences[index].isEditing =
      !updatedWorkExperiences[index].isEditing;
    setWorkExperience(updatedWorkExperiences);
  }

  return (
    <>
      <div className="mainDiv">
        <div className="content">
          {/* <div className={styles.stellaTextDiv}></div> */}

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
            I have mapped your work experience to our archive, and these are the
            results. See whether I have captured the essence of your career
            profile:
            <h2 className={styles.title}>My Tasks</h2>
            {/* {workexperiences.map((workexperience, index) => (
              <div key={index} className={styles.jobDiv}>
                <div className={styles.editableSubtitleDiv}>
                  {workexperience.isEditing ? (
                    <input
                      type="text"
                      value={workexperience.jobName}
                      placeholder={workexperience.jobName}
                      className={styles.editTitle}
                      onChange={(e) =>
                        handleOccupationChange(index, e.target.value)
                      }
                    />
                  ) : (
                    <h3 className={styles.editableSubtitle}>
                      {index + 1}. {workexperience.jobName}
                    </h3>
                  )}
                  <div className={styles.editDoneButtonDiv}>
                    <button
                      className={styles.button}
                      onClick={() => toggleEdit(index)}
                    >
                      {workexperience.isEditing ? "Done" : "Edit"}
                    </button>
                  </div>
                </div>
                <textarea
                  type="text"
                  value={workexperience.experience}
                  className={styles.input}
                  onChange={(e) =>
                    handleExperienceChange(index, e.target.value)
                  }
                />
              </div>
            ))} */}
            <textarea
              type="text"
              value={skills}
              className={styles.input}
              onChange={handleSkillsChange}
            />
            <button className={styles.button} onClick={handleConfirm}>
              Confirm
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Page;
