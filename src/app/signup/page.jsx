"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navburger from "../components/navburger";
import tesalogo from "public/TESSA_FINAL.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const router = useRouter();

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
    >
      <Navburger />
      <div className="flex flex-col w-screen h-screen items-center overflow-hidden">
        <div className="flex flex-col  h-full justify-between  w-10/12 ">
          <Image
            src={tesalogo}
            width={80}
            alt="TESA Logo"
            className="mt-[2rem]"
          ></Image>

          <div className="flex flex-col ">
            <p className="mt-[2rem] mb-[1rem]">Sign Up</p>
            <button className=" w-full bg-[#D9D9D9] text-base p-[1rem] text-[#474545] font-bold mt-[1rem] rounded-full ">
              <a href="/tesahome">Sign Up with E-mail</a>
            </button>
            <button className=" w-full p-[1rem] border text-base font-bold mt-[1rem] rounded-full ">
              <a href="/tesahome">Sign Up with Google</a>
            </button>
            <button className=" w-full p-[1rem] border text-base font-bold mt-[1rem] rounded-full ">
              <a href="/tesahome"> Sign Up with Facebook</a>
            </button>
          </div>
          <p className="text-xs text-center mb-[5rem]">
            By signing up, you're agreeing to our
            <b> Privacy Policy and Terms of Service</b>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
