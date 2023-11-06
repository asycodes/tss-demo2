"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navburger from "../components/navburger";
import tsslogo from "public/tss.svg";
import tesalogo from "public/TESALOGO.svg";
export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Navburger />

      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-10/12 flex flex-col justify-center text-start">
          <Image
            src={tesalogo}
            width={80}
            alt="TESA Logo"
            className="mt-[2rem]"
          ></Image>

          <div className="flex flex-col gap-5 text-justify">
            <p className=" font-semibold mt-5">What is TESA?</p>
            <p>
              TESA is a package of career crafting tools. Each tool is based on
              in-depth occupational research and is powered by big data. Instead
              of picking a career off-the-shelf, TSS allows you to tailor a
              career to suit your unique capabilities and circumstances.
            </p>
            <p className="font-semibold">
              Why does TESA use Tasks in career crafting?
            </p>
            <p className="">
              TESA has a unique focus on tasks, which research has shown to be a
              highly effective approach to career crafting. You may use it to
              build a portfolio of capabilities, plan your next job transition,
              and so much more.
            </p>
            <p className="font-semibold">How can TESA help your career?</p>
            <p className="">
              TESA helps you make informed choices about your career by
              leveraging occupational research, big data, and AI algorithms.
              Find suitable job transitions using statistical analysis, or
              integrate your hobbies into your careers by building a task stack
              - these and many other tools are just a click away [Learn more
              here - presumably link to a list of tools]
            </p>
            <p className="font-semibold">Where does AI come in?</p>
            <p className="mb-5">
              TESA uses AI to improve the accuracy of its assessments. We use it
              to study your personal information (don't worry, your data's safe
              with us!) and to build an accurate picture of your capabilities.
              AI also powers many of our algorithms for planning single- and
              multi-stage career transitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
