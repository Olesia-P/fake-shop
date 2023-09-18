import css from "./navbar.module.scss";
import cx from "classnames";
import { BiSolidUserCircle, BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import Cart from "../cart/cart";
import Hamburger from "../hamburger/hamburger";
import { useEffect, useRef, useState } from "react";
import { capitalizeFirstLetter } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { changeCatalogCategory } from "../../store/modules/catalogSlice";
import { useRouter } from "next/router";
import SearchForm from "./searchForm/searchForm";
import { useGetCategoriesQuery } from "../../store/modules/apiSlice";

export default function Header() {
  const { catalogFilters } = useSelector(({ catalog }) => catalog);
  const [isCatalogAccordeonOpen, setIsCatalogAccordeonOpen] = useState(false);
  const {
    data: categories,
    error,
    isError,
    isLoading,
    isSuccess: categoriesSuccess,
  } = useGetCategoriesQuery();
  const dispatch = useDispatch();
  const router = useRouter();

  const catalogAccordionRef = useRef();

  const handleOutsideClick = (event) => {
    if (catalogAccordionRef.current.contains(event.target)) {
      return;
    }
    setIsCatalogAccordeonOpen(false);
  };

  useEffect(() => {
    if (isCatalogAccordeonOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCatalogAccordeonOpen]);

  return (
    <>
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
            <div>About Project</div>
          </a>
        </Link>

        <a
          className={cx(css.headerLink)}
          onClick={() => setIsCatalogAccordeonOpen(!isCatalogAccordeonOpen)}
          ref={catalogAccordionRef}
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
            {categoriesSuccess &&
              categories.map((element) => (
                <div
                  key={element.name}
                  className={css.listItem}
                  onClick={() => {
                    dispatch(changeCatalogCategory(element.link));
                    element.link !== ""
                      ? router.push(
                          `/catalog/?category=${element.link}&sort=&${catalogFilters.alphabet}&limit=&${catalogFilters.limit}`,
                          undefined,
                          {
                            shallow: true,
                          }
                        )
                      : router.push(`catalog/?sort=${catalogFilters.alphabet}`);
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

        <SearchForm />

        <Cart />
        {/* <div className={css.userIcon}>
          <BiSolidUserCircle />
        </div> */}
      </div>
    </>
  );
}
