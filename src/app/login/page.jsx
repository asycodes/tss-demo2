"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navburger from "../components/navburger";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Navburger />
    </div>
  );
}
