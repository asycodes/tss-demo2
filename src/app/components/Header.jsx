// import Link from "next/link";
// import { useRouter } from "next/router";

// function Header() {
//   const router = useRouter();
//   const routePaths = [
//     "/",
//     "/tools",
//     "/journey/occupations",
//     "/journey/occupations/edit",
//     "/journey/occupations/tasks",
//   ];

//   const currentPage =
//     routePaths.findIndex((path) => path === router.pathname) + 1;

//   return (
//     <>
//       <div className="flex flex-row p-5 gap-3 w-full justify-center">
//         {routePaths.map((path, index) => (
//           <Link key={index} href={path}>
//             <a
//               className={`w-3 h-3 border rounded-full ${
//                 index + 1 <= currentPage ? "bg-gray-500" : ""
//               }`}
//             ></a>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Header;
// Example of a component inside components directory
// components/Header.js
"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Use window.location.pathname to get the current path on the client side
    const path = window.location.pathname;
    const routePaths = [
      "/journey/occupations",
      "/journey/occupations/uploadcv",
      "/journey/occupations/edit",
      "/journey/occupations/tasks",
      "/journey/hobbies/add",
      "/journey/hobbies/tasks",
    ];
    const currentIndex = routePaths.findIndex((p) => p === path) + 1;
    setCurrentPage(currentIndex);
  }, []);

  return (
    <>
      <div className="flex flex-row p-5 gap-3 w-full justify-center">
        {Array.from({ length: 6 }).map((_, index) => (
          // <Link key={index} href={["/", "/A", "/B", "/C"][index]}>
          <div
            key={index}
            className={`w-3 h-3 border rounded-full ${
              index + 1 <= currentPage
                ? "bg-[#D9D9D9] border border-[#C6ABAB]"
                : ""
            }`}
          ></div>
          // </Link>
        ))}
      </div>
    </>
  );
}

export default Header;
