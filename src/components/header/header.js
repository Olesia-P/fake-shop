import css from "./header.module.scss";
import cx from "classnames";
import { BiSolidUserCircle, BiSearchAlt2 } from "react-icons/bi";
import Link from "next/link";
import Cart from "../cart/cart";
import Hamburger from "../hamburger/hamburger";
import { useState } from "react";

export default function Header() {
  const [isCatalogAccordeonOpen, setIsCatalogAccordeonOpen] = useState(false);

  return (
    <div className={css.container}>
      <div className={css.hamburger}>
        <Hamburger />
      </div>
      <Link href="/">
        <a>
          <div className={cx(css.logo)}>Fake Shop</div>
        </a>
      </Link>
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

      <div className={css.searchFrom}>
        <input type="search" placeholder="Search" />
        <div className={css.searchIcon}>
          <BiSearchAlt2 />
        </div>
      </div>
      <div className={css.userIcon}>
        <BiSolidUserCircle />
      </div>
      <Cart />
    </div>
  );
}

// onMouseOver={() => setIsCatalogAccordeonOpen(true)}
// onMouseOut={() => setIsCatalogAccordeonOpen(false)}

{
  /* <div className={css.catalogAccordeon}>
  <div className={css.listItem}>Electronics</div>
  <div className={css.listItem}>Jewelery</div>
  <div className={css.listItem}>Men&apos;s clothing</div>
  <div className={css.listItem}>Women&apos;s clothing</div>
  <div className={css.listItem}>Show all</div>
</div>; */
}
