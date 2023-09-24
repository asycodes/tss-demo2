import Image from "next/image";
import Link from "next/link";
import Navburger from "./components/navburger";

// Will be used to access the app, showthe information of the app etc.

export default function Home() {
  return (
    <div>
      <Navburger />
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1>Losts? We Provide You Potential</h1>
          <h3>
            Your Journey, Your Way: Transform your career the smarter way!
          </h3>
          <Link href="/journey">Try it now!</Link>
          <button></button> {/* Button to the video */}
        </div>

        <div>
          <h3>intro</h3>
        </div>

        <div>
          <h3>Feature</h3>
        </div>

        <div></div>
      </div>
    </div>
  );
}
