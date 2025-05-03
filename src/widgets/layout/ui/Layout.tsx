import { FaHome, FaMusic } from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router";
import { motion } from "motion/react";
import { Player } from "../../player/ui/Player";
import { CgProfile } from "react-icons/cg";

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
    <div className="flex overflow-x-hidden min-md:pl-20 py-10 h-screen w-screen">
      <motion.nav
        variants={navbarVar}
        initial="hidden"
        animate="show"
        className="bg-white md:text-[1.5rem] flex min-md:flex-col min-md:justify-start items-center justify-stretch fixed bottom-3 min-md:bottom-0 left-[5%] min-md:left-0 shadow-black shadow-md w-[90%] rounded-full min-md:rounded-none min-md:w-15 min-md:h-full h-10"
      >
        <NavLink to="/">
          <div
            className={`flex justify-center items-center h-10 md:mt-5 md:h-15 md:w-15 w-[30vw] transition-colors duration-300 hover:text-green-300 ${
              location.pathname === "/" && "text-green-400"
            } `}
          >
            <FaHome />
          </div>
        </NavLink>
        <NavLink to="/library">
          <div
            className={`flex justify-center items-center h-10 min-md:h-15 min-md:w-15 w-[30vw] transition-colors duration-200 hover:text-green-300 ${
              location.pathname === "/library" && "text-green-400"
            }`}
          >
            <FaMusic />
          </div>
        </NavLink>
        <NavLink to="/profile">
          <div
            className={`flex text-[1.4rem] md:text-[1.9rem] justify-center items-center h-10 min-md:h-15 min-md:w-15 w-[30vw] transition-colors duration-200 hover:text-green-300 ${
              location.pathname === "/profile" && "text-green-400"
            }`}
          >
            <CgProfile />
          </div>
        </NavLink>
      </motion.nav>
      <Player />
      <Outlet />
    </div>
  );
};
