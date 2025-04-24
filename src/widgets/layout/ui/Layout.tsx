import { FaHome, FaMusic } from "react-icons/fa";
import { NavLink, useLocation } from "react-router";
import { motion, useScroll } from "motion/react";

export const Layout = () => {
  const location = useLocation();

  const navbarVar = {
    hidden:
      window.innerWidth >= 768
        ? {
            x: -50,
            transition: {
              duration: 0.3,
              type: "spring",
              stiffness: 70,
              delay: 0.3,
            },
          }
        : {
            y: 60,
            transition: {
              duration: 0.3,
              type: "spring",
              stiffness: 70,
              delay: 0.3,
            },
          },
    show:
      window.innerWidth >= 768
        ? {
            x: 0,
            transition: {
              duration: 0.3,
              type: "spring",
              stiffness: 70,
              delay: 0.3,
            },
          }
        : {
            y: 0,
            transition: {
              duration: 0.3,
              type: "spring",
              stiffness: 70,
              delay: 0.3,
            },
          },
  };

  return (
    <motion.nav
      variants={navbarVar}
      initial="hidden"
      animate="show"
      className="md:text-[1.5rem] flex min-md:flex-col min-md:justify-start items-center justify-stretch fixed bottom-3 min-md:bottom-0 left-[5%] min-md:left-0 shadow shadow-black shadow-md w-[90%] rounded-full min-md:rounded-none min-md:w-15 min-md:h-full h-10 border-[2px] border-slate-400"
    >
      <NavLink to="/">
        <div
          className={`flex justify-center items-center h-10 md:h-15 md:w-full w-[45vw] transition-colors duration-300 hover:text-green-300 ${
            location.pathname === "/" && "text-green-400"
          } `}
        >
          <FaHome />
        </div>
      </NavLink>
      <NavLink to="/library">
        <div
          className={`flex justify-center items-center h-10 min-md:h-15 min-md:w-full w-[45vw] transition-colors duration-200 hover:text-green-300 ${
            location.pathname === "/library" && "text-green-400"
          }`}
        >
          <FaMusic />
        </div>
      </NavLink>
    </motion.nav>
  );
};
