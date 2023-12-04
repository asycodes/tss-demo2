"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import tss from "public/tss_light.svg";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import puzzle from "public/puzzle.png";
import mountain from "public/mountain.png";
import people from "public/people.png";
import int_op from "public/International Operability.svg";
import pencil from "public/pencil.png";
import multivitamin from "public/Multivitamin Tool.svg";
import steps from "public/steps.png";
import multistage from "public/Mutli-Stage Tool.svg";

export default function Page() {
  function handleNextCard() {}
  const [card1, setCard1] = useState(true);
  const [card2, setCard2] = useState(false);
  const [card3, setCard3] = useState(false);
  const [card4, setCard4] = useState(false);
  const [card5, setCard5] = useState(false);
  const [cardNum, setcardNum] = useState(1);

  function handleNextCard() {
    setcardNum(cardNum + 1);
    console.log(cardNum);
    if (cardNum === 2) {
      setCard1(false);
      setCard2(true);
    } else if (cardNum === 3) {
      setCard2(false);
      setCard3(true);
    } else if (cardNum === 4) {
      setCard3(false);
      setCard4(true);
    } else if (cardNum >= 5) {
      setcardNum(5);
      setCard4(false);
      setCard5(true);
    }
  }
  function handlePrevCard() {
    setcardNum(cardNum - 1);
    console.log(cardNum);
    if (cardNum === 4) {
      setCard4(true);
      setCard5(false);
    } else if (cardNum === 3) {
      setCard3(true);
      setCard4(false);
    } else if (cardNum === 2) {
      setCard2(true);
      setCard3(false);
    } else if (cardNum <= 1) {
      setcardNum(1);
      setCard1(true);
      setCard2(false);
    }
  }

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: "easeInOut",
        type: "spring",
        stiffness: 15,
        duration: 2,
      }}
      className="w-screen h-screen overflow-scroll justify-center flex"
    >
      <div className="w-10/12 flex-col flex ">
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 15,
            duration: 1,
          }}
        >
          <Image
            src={tss}
            width={50}
            alt="TESA Logo"
            className="mt-[2rem]"
          ></Image>
        </motion.div>
        <div className="mt-[2rem] w-full flex flex-col items-center text-3xl">
          <p className="mb-[2rem] w-full">Congratulations!</p>
          <p className="mb-[2rem]">
            Now, you have a personalised work DNA -- an in-depth understanding
            about yourself based on your hobbies, your career, and your task
            persona.
          </p>
          <p className="mb-[2rem] w-full">
            Here are 5 more ways to take your options further:
          </p>

          <div className="w-[95%] h-[35rem] mb-[2rem] border-2 border-white rounded-lg drop-shadow-md">
            {card1 ? (
              <div className="w-full h-full flex flex-col">
                <div className="flex flex-col h-[90%] w-full">
                  <div className="p-5">
                    <p className=" text-lg font-semibold">
                      Explore Your Job Options
                    </p>
                    <p className="text-[#EFAB9D] font-semibold text-sm">
                      • Discover Your Perfect Fit
                    </p>
                  </div>
                  <div className="flex flex-row w-full ">
                    <Image
                      src={puzzle}
                      alt="puzzle"
                      className=" pl-[1rem] h-[20rem] w-[20rem]"
                    ></Image>
                  </div>
                  <div className="px-5 text-xs">
                    <p>
                      Explore your job options to find the right match with your
                      skills and aspirations. <u>Gain insights</u> into specific
                      job roles and their requirements, helping you make an
                      informed decision.
                    </p>
                  </div>
                </div>
                <div className="h-[10%] w-full ">
                  <div className=" h-[1px] border border-dashed border-white"></div>
                  <div className="mt-[1rem] flex flex-row justify-center items-center h-[1rem]">
                    <div className="w-2/12">
                      <FiChevronLeft onClick={handlePrevCard}></FiChevronLeft>
                    </div>
                    <div className="flex flex-row w-8/12 justify-center gap-2">
                      <div className="w-[0.8rem] h-[0.8rem] bg-[#D9D9D9] rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                    </div>
                    <div className="w-2/12">
                      <FiChevronRight onClick={handleNextCard}></FiChevronRight>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {card2 ? (
              <div className="w-full h-full flex flex-col">
                <div className="flex flex-col h-[90%] w-full">
                  <div className="p-5">
                    <p className=" text-lg font-semibold">
                      Skill Assessment and Enhancement
                    </p>
                    <p className="text-[#EFD19F] font-semibold text-sm">
                      • Empower Your Potential
                    </p>
                  </div>
                  <div className="px-5 text-xs mt-[1rem]">
                    <p>
                      Assess your current skills, identify areas for
                      improvement, and take steps to enhance your
                      qualifications.
                      <u>Unlock your full potential</u> to stand out in the
                      competitive job market.
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <Image
                      src={mountain}
                      alt="puzzle"
                      className=" h-[20rem] w-[20rem] absolute object-cover"
                    ></Image>
                  </div>
                </div>
                <div className="h-[10%] w-full">
                  <div className=" h-[1px] border border-dashed border-white"></div>

                  <div className="mt-[1rem] flex flex-row justify-center justify-self-end items-center h-[1rem]">
                    <div className="w-2/12">
                      <FiChevronLeft onClick={handlePrevCard}></FiChevronLeft>
                    </div>
                    <div className="flex flex-row w-8/12 justify-center gap-2 ">
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] bg-[#D9D9D9] rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                    </div>
                    <div className="w-2/12">
                      <FiChevronRight onClick={handleNextCard}></FiChevronRight>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {card3 ? (
              <div className="w-full h-full flex flex-col">
                <div className="flex flex-col h-[90%] w-full">
                  <div className="flex flex-row w-full justify-end ">
                    <Image
                      src={people}
                      alt="people"
                      className=" h-[16rem] w-[16rem]"
                    ></Image>
                  </div>
                  <div className="px-5">
                    <p className=" text-lg font-semibold">
                      Networking Opportunities
                    </p>
                    <p className="text-[#ABB3DC] font-semibold text-sm">
                      • Connect, Learn, and Grow
                    </p>
                  </div>
                  <div className="px-5 gap-5 flex-col flex text-xs">
                    <p>
                      Build a network within your industry by connecting with{" "}
                      <u>friends, family, and professionals.</u>
                    </p>
                    <div className="flex-row flex">
                      <p className="w-8/12">
                        The <u>Interoperability Tool</u> lets you learn from
                        professional experiences and insights to get a clear
                        picture of the industry's dynamics.
                      </p>
                      <div className=" flex-col  justify-center items-center flex  w-4/12">
                        <div className="border-2 border-white w-[5rem] h-[5rem]  flex flex-col items-center justify-center rounded-3xl">
                          <Image
                            src={int_op}
                            alt="people"
                            className="w-[2.5rem] h-[2.5rem] "
                          ></Image>
                          <div className="w-full flex-col flex text-[0.4rem] leading-3 items-center justify-center">
                            <p className="">International</p>
                            <p className="">Operability</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[10%] w-full">
                  <div className=" h-[1px] border border-dashed border-white"></div>

                  <div className="mt-[1rem] flex flex-row justify-center justify-self-end items-center h-[1rem]">
                    <div className="w-2/12">
                      <FiChevronLeft onClick={handlePrevCard}></FiChevronLeft>
                    </div>
                    <div className="flex flex-row w-8/12 justify-center gap-2 ">
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] bg-[#D9D9D9] rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                    </div>
                    <div className="w-2/12">
                      <FiChevronRight onClick={handleNextCard}></FiChevronRight>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {card4 ? (
              <div className="w-full h-full flex flex-col">
                <div className=" h-[90%] w-full">
                  <div className="p-5">
                    <p className=" text-lg font-semibold">
                      Create Your Transition Plan
                    </p>
                    <p className="text-[#A1D6C1] font-semibold text-sm">
                      • Prepare for Your Next Chapter
                    </p>
                  </div>

                  <div className="px-5 text-xs">
                    <p>
                      Build a network within your industry by connecting with
                      friends, family, and professionals. Learn from their
                      experiences and insights to get a clear picture of the
                      industry's dynamics.
                    </p>
                    {/* <div className="mt-[1rem] h-[1px] border border-dashed border-white"></div> */}
                  </div>
                  <div className="flex flex-row w-full absolute">
                    <Image
                      src={pencil}
                      alt="pencil"
                      className=" h-[17rem] w-[15rem]"
                    ></Image>
                  </div>
                  <div className="h-[20rem] w-full flex flex-row ">
                    <div className="h-[20rem] w-1/2"></div>
                    <div className="h-[20rem] w-1/2 flex-col flex">
                      <div className=" h-1/2 w-full "></div>
                      <div className=" h-1/2 w-full flex flex-col justify-center items-center  ">
                        <p className="text-xs">
                          The <u>Multi-Vitamin Tool</u> can further access your
                          career's future.
                        </p>
                        <div className="border-2 mt-2 border-white w-[5rem] h-[5rem]  flex flex-col items-center justify-center rounded-3xl">
                          <Image
                            src={multivitamin}
                            alt="people"
                            className="w-[2.5rem] h-[2.5rem] "
                          ></Image>
                          <div className="w-full flex-col flex text-[0.4rem] leading-3 items-center justify-center">
                            <p className="">Multi-Vitamin</p>
                            <p className="">Strategy</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[10%] w-full">
                  <div className=" h-[1px] border border-dashed border-white"></div>

                  <div className="mt-[1rem] flex flex-row justify-center justify-self-end items-center h-[1rem]">
                    <div className="w-2/12">
                      <FiChevronLeft onClick={handlePrevCard}></FiChevronLeft>
                    </div>
                    <div className="flex flex-row w-8/12 justify-center gap-2 ">
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] bg-[#D9D9D9] rounded-full"></div>

                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                    </div>
                    <div className="w-2/12">
                      <FiChevronRight onClick={handleNextCard}></FiChevronRight>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {card5 ? (
              <div className="w-full h-full flex flex-col">
                <div className=" h-[90%] w-full">
                  <div className="p-5">
                    <p className=" text-lg font-semibold">Take Action</p>
                    <p className=" font-semibold text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#EFD19F] via-[#EFAB9D] to-[#ABB3DC] ">
                      • Embrace the Future with Confidence
                    </p>
                  </div>

                  <div className="px-5 flex flex-col gap-5 text-xs">
                    <p>
                      Take proactive steps to turn your aspirations into
                      reality. Conquer the fear of uncertainty by taking action.
                      The future is yours to shape, and you can do it with
                      confidence.
                    </p>
                    <p>
                      To help give you the confidence, the Multi-Stage Career
                      Tool can predict your career progress 3 stages ahead.
                    </p>
                  </div>
                  <div className="flex flex-row w-full absolute">
                    <Image src={steps} alt="pencil" className=" w-full"></Image>
                  </div>
                  <div className="flex w-full h-[11rem] flex-row ">
                    <div className=" pl-5  pt-2 w-1/2 h-full">
                      <div className="border-2 mt-2 border-white w-[5rem] h-[5rem]  flex flex-col items-center justify-center rounded-3xl">
                        <Image
                          src={multistage}
                          alt="people"
                          className="w-[2.5rem] h-[2.5rem] "
                        ></Image>
                        <div className="w-full flex-col flex text-[0.4rem] leading-3 items-center justify-center">
                          <p className="">Multi-Stage</p>
                          <p className="">Transition</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 h-full"></div>
                  </div>
                </div>

                <div className="h-[10%] w-full">
                  <div className=" h-[1px] border border-dashed border-white"></div>

                  <div className="mt-[1rem] flex flex-row justify-center justify-self-end items-center h-[1rem]">
                    <div className="w-2/12">
                      <FiChevronLeft onClick={handlePrevCard}></FiChevronLeft>
                    </div>
                    <div className="flex flex-row w-8/12 justify-center gap-2 ">
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>
                      <div className="w-[0.8rem] h-[0.8rem] border-2 rounded-full"></div>

                      <div className="w-[0.8rem] h-[0.8rem] bg-[#D9D9D9] rounded-full"></div>
                    </div>
                    <div className="w-2/12">
                      <FiChevronRight onClick={handleNextCard}></FiChevronRight>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-5">
            <p> And you can do so much more!</p>
            <p>
              Create a profile to not your progress thus far, and also access to
              more tools that we, TESA has to offer.
            </p>
            <button
              //   onClick={handleYes}
              className=" w-full bg-[#D9D9D9] text-base p-[1rem] text-[#474545] font-bold mt-[1rem] rounded-full"
            >
              <a href="/signup">Yes. Create my Profile!</a>
            </button>
            <button
              //   onClick={handleNo}
              className=" w-full p-[1rem] border text-base font-bold mt-[1rem] mb-[5rem] rounded-full"
            >
              <a href="/journey/transition">
                No. Return to my Transition Galaxy.
              </a>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
