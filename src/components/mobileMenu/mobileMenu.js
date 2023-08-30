import css from "./mobileMenu.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeIsMobileMenuOpen } from "../../store/modules/openingsSlice";
import cx from "classnames";
import Link from "next/link";
import { BiSolidUserCircle } from "react-icons/bi";
import useMediaQuery from "../../hooks/useMediaQuery";

export default function MobileMenu() {
  const { isMobileMenuOpen } = useSelector(({ openings }) => openings);
  const dispatch = useDispatch();

  // const isTablet = useMediaQuery(850);
  // if (isTablet) {
  //   dispatch(changeIsMobileMenuOpen(false));
  // }

  return (
    <>
      {/* {isMobileMenuOpen && (
        <style jsx global>
          {`
            body {
              overflow: hidden;
            }
          `}
        </style>
      )} */}

      <div className={cx(css.container, isMobileMenuOpen && css.open)}>
        <Link href="/">
          <a className={css.headerLink}>
            <div>About Project</div>
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
