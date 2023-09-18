import css from "./hamburger.module.scss";
import { TiThMenu } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeIsMobileMenuOpen } from "../../store/modules/openingsSlice";
import { useEffect } from "react";
import { useRef } from "react";
import useClickOutsideClose from "../../hooks/useClickOutsideClose";

export default function Hamburger() {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector(({ openings }) => openings);

  const mobileMenuRef = useRef();
  const changeMobileWithDispatch = (value) => {
    dispatch(changeIsMobileMenuOpen(value));
  };

  // useClickOutsideClose(
  //   mobileMenuRef,
  //   changeMobileWithDispatch(),
  //   isMobileMenuOpen
  // );

  // const handleOutsideClick = (event) => {
  //   if (mobileMenuRef.current.contains(event.target)) {
  //     return;
  //   }
  //   dispatch(changeIsMobileMenuOpen(false));
  // };

  // useEffect(() => {
  //   if (isMobileMenuOpen) {
  //     document.addEventListener("mousedown", handleOutsideClick);
  //   } else {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [isMobileMenuOpen]);

  return (
    <div
      className={css.container}
      onClick={() => dispatch(changeIsMobileMenuOpen(!isMobileMenuOpen))}
      ref={mobileMenuRef}
    >
      <TiThMenu />
    </div>
  );
}
