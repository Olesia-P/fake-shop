import css from "./mobileMenu.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeIsMobileMenuOpen } from "../../store/modules/openingsSlice";
import cx from "classnames";
import Link from "next/link";
import { BiSolidUserCircle, BiSearchAlt2 } from "react-icons/bi";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function MobileMenu() {
  const { isMobileMenuOpen } = useSelector(({ openings }) => openings);
  //   const dispatch = useDispatch();
  //   const isTablet = useMediaQuery(850);
  //   if (isTablet) {
  //     dispatch(changeIsMobileMenuOpen(false));
  //   }
  return (
    <>
      <div className={cx(css.overlay, isMobileMenuOpen && css.open)}></div>
      <div className={cx(css.container, isMobileMenuOpen && css.open)}>
        <div className={css.userIcon}>
          <BiSolidUserCircle />
        </div>
        <Link href="/">
          <a className={css.headerLink}>
            <div>Home</div>
          </a>
        </Link>
        <Link href="/catalog">
          <a className={css.headerLink}>
            <div>Catalog</div>
          </a>
        </Link>
        <Link href="/contacts">
          <a className={css.headerLink}>
            <div>Contacts</div>
          </a>
        </Link>
      </div>
    </>
  );
}
