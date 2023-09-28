/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import cx from 'classnames';
import { BiChevronDown } from 'react-icons/bi';
import { useState, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useGetCategoriesQuery } from '../../store/modules/apiSlice';
import { changeCatalogCategory } from '../../store/modules/catalogSlice';
import useClickOutsideClose from '../../hooks/useClickOutsideClose';
import css from './navbar.module.scss';
import SearchForm from './searchForm/searchForm';
import Cart from '../cart/cart';
import Hamburger from '../hamburger/hamburger';
import { capitalizeFirstLetter } from '../../utils/functions';

export default function Header() {
  const { catalogFilters } = useSelector(({ catalog }) => catalog);
  const [isCatalogAccordeonOpen, setIsCatalogAccordeonOpen] = useState(false);
  const { data: categories, isSuccess: categoriesSuccess } =
    useGetCategoriesQuery();
  const dispatch = useDispatch();
  const router = useRouter();

  const ref = useClickOutsideClose(
    setIsCatalogAccordeonOpen,
    isCatalogAccordeonOpen,
  );

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
          <div>About Project</div>
        </a>
      </Link>
      <a
        className={cx(css.headerLink)}
        onClick={() => setIsCatalogAccordeonOpen(!isCatalogAccordeonOpen)}
        ref={ref}
      >
        <div>Catalog</div>
        <div className={cx(css.chevron, isCatalogAccordeonOpen && css.open)}>
          <BiChevronDown />
        </div>

        <div
          className={cx(
            css.catalogAccordion,
            isCatalogAccordeonOpen && css.open,
          )}
        >
          {categoriesSuccess &&
            categories.map((element) => (
              <div
                key={element.name}
                className={css.listItem}
                onClick={() => {
                  dispatch(changeCatalogCategory(element.link));
                  element.link !== ''
                    ? router.push(
                        `/catalog/?category=${element.link}&sort=&${catalogFilters.alphabet}&limit=&${catalogFilters.limit}`,
                        undefined,
                        {
                          shallow: true,
                        },
                      )
                    : router.push(
                        `/catalog/?sort=${catalogFilters.alphabet}&limit=&${catalogFilters.limit}`,
                      );
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
    </div>
  );
}
