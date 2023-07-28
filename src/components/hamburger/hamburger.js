import css from "./hamburger.module.scss";
import { TiThMenu } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeIsMobileMenuOpen } from "../../store/modules/openingsSlice";

export default function Hamburger() {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector(({ openings }) => openings);

  return (
    <div
      className={css.container}
      onClick={() => dispatch(changeIsMobileMenuOpen(!isMobileMenuOpen))}
    >
      <TiThMenu />
    </div>
  );
}
