import styles from "./styles.module.css";
import Link from "next/link";
function Header() {
  // const routePaths = ["/", "/confirm", "/other-route"];

  // const currentPage =
  //   routePaths.findIndex((path) => path === location.pathname) + 1;

  return (
    <>
      <div className="flex flex-row p-5 gap-3 w-full justify-center">
        {/* {Array.from({ length: 10 }, (_, index) => (
          <Link
            key={index}
            to={routePaths[index]}
            className={`${styles.progressBall} ${
              index + 1 <= currentPage ? styles.active : ""
            }`}
          ></Link>
        ))} */}
        <div className="w-3 h-3 border rounded-full"></div>
        <div className="w-3 h-3 border rounded-full"></div>
        <div className="w-3 h-3 border rounded-full"></div>
        <div className="w-3 h-3 border rounded-full"></div>
        <div className="w-3 h-3 border rounded-full"></div>
        <div className="w-3 h-3 border rounded-full"></div>
        <div className="w-3 h-3 border rounded-full"></div>
        <div className="w-3 h-3 border rounded-full"></div>
        <div className="w-3 h-3 border rounded-full"></div>
        <div className="w-3 h-3 border rounded-full"></div>
      </div>
    </>
  );
}

export default Header;
