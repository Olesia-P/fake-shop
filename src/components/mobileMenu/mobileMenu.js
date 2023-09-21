import css from "./mobileMenu.module.scss";
import { useSelector } from "react-redux";
import cx from "classnames";
import Link from "next/link";

export default function MobileMenu() {
  const { isMobileMenuOpen } = useSelector(({ openings }) => openings);
  const { catalogFilters } = useSelector(({ catalog }) => catalog);

  return (
    <div className={cx(css.container, isMobileMenuOpen && css.open)}>
      <Link href="/">
        <a className={css.headerLink}>
          <div>About Project</div>
        </a>
      </Link>
      <Link
        href={`/catalog/?&sort=&${catalogFilters.alphabet}&limit=&${catalogFilters.limit}`}
      >
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
  );
}
