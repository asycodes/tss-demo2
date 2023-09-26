"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navburger from "../components/navburger";
import tsslogo from "public/tss.svg";
export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Navburger />
      <div className="w-full">
        <Image src={tsslogo} width={140} height={140} className="p-5"></Image>
      </div>
    </div>
  );
}
