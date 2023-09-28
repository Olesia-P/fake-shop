import { useState, useEffect, React } from 'react';
import { useRouter } from 'next/router';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useGetProductsQuery } from '../../../store/modules/apiSlice';
import useClickOutsideClose from '../../../hooks/useClickOutsideClose';
import css from './searchForm.module.scss';

export default function SearchForm() {
  const [inputData, setInputData] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const router = useRouter();

  const ref = useClickOutsideClose(setIsSearchListOpen, isSearchListOpen);

  const { data: productsData, isSuccess } = useGetProductsQuery({
    category: '',
    filter: { alphabet: 'asc', limit: '' },
  });

  const handleSearch = () => {
    if (isSuccess) {
      const filteredResults =
        inputData === ''
          ? []
          : productsData.filter((item) =>
              item.title.toLowerCase().includes(inputData.toLowerCase()),
            );
      setSearchResults(filteredResults);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [inputData]);

  return (
    <div className={css.searchFrom} ref={ref}>
      <div className={css.searchWrap}>
        <input
          type="search"
          placeholder="Search"
          value={inputData}
          onChange={(event) => {
            setInputData(event.target.value);
            setIsSearchListOpen(true);
          }}
        />

        <div className={css.searchedList}>
          {isSearchListOpen &&
            searchResults.map((element) => (
              <div
                key={element.id}
                className={css.searchedItem}
                onClick={() => {
                  router.push(`/products/${element.id}`);
                  setIsSearchListOpen(false);
                  setInputData('');
                }}
              >
                {element.title}
              </div>
            ))}
        </div>
      </div>
      <div className={css.searchIcon}>
        <BiSearchAlt2 />
      </div>
    </div>
  );
}
