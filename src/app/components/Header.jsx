import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
function Header() {
  const routePaths = ["/", "/confirm", "/other-route"];

  const currentPage =
    routePaths.findIndex((path) => path === location.pathname) + 1;

  return (
    <>
      <div className={styles.header}>
        {Array.from({ length: 10 }, (_, index) => (
          <Link
            key={index}
            to={routePaths[index]}
            className={`${styles.progressBall} ${
              index + 1 <= currentPage ? styles.active : ""
            }`}
          ></Link>
        ))}
      </div>
    </>
  );
}

export default Header;
