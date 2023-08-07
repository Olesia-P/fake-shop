import css from "./navbar.module.scss";
import cx from "classnames";
import { BiSolidUserCircle, BiSearchAlt2, BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import Cart from "../cart/cart";
import Hamburger from "../hamburger/hamburger";
import { useState } from "react";
import { categories } from "../../utils/objects";
import { capitalizeFirstLetter } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { changeCatalogCategory } from "../../store/modules/catalogSlice";
import { useRouter } from "next/router";

export default function Header() {
  const [isCatalogAccordeonOpen, setIsCatalogAccordeonOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
      <a
        className={cx(css.headerLink)}
        onClick={() => setIsCatalogAccordeonOpen(!isCatalogAccordeonOpen)}
      >
        <div>Catalog</div>
        <div className={cx(css.chevron, isCatalogAccordeonOpen && css.open)}>
          <BiChevronDown />
        </div>
        <div
          className={cx(
            css.catalogAccordion,
            isCatalogAccordeonOpen && css.open
          )}
        >
          {categories.map((element) => (
            <div
              key={element.name}
              className={css.listItem}
              onClick={() => {
                dispatch(changeCatalogCategory(element.link));
                router.push(`catalog`);
              }}
            >
              {capitalizeFirstLetter(element.name)}
            </div>
          ))}
        </div>
      </a>

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
  /* <div className={css.catalogAccordion}>
  <div className={css.listItem}>Electronics</div>
  <div className={css.listItem}>Jewelery</div>
  <div className={css.listItem}>Men&apos;s clothing</div>
  <div className={css.listItem}>Women&apos;s clothing</div>
  <div className={css.listItem}>Show all</div>
</div>; */
}
