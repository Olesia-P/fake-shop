import css from "./hamburger.module.scss";
import { TiThMenu } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeIsMobileMenuOpen } from "../../store/modules/openingsSlice";
import { useRef } from "react";
import useClickOutsideClose from "../../hooks/useClickOutsideClose";

export default function Hamburger() {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector(({ openings }) => openings);

  const mobileMenuRef = useRef();
  const changeMobileWithDispatch = (value) => {
    dispatch(changeIsMobileMenuOpen(value));
  };

  useClickOutsideClose(
    mobileMenuRef,
    changeMobileWithDispatch,
    isMobileMenuOpen
  );

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
