import { useState, useEffect, React } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useGetProductsQuery } from '../../store/modules/api-slice';
import useClickOutsideClose from '../../hooks/use-click-outside-close';
import css from './search-form.module.scss';
import { changeSearchResults } from '../../store/modules/mixed-purpose-slice';

export default function SearchForm() {
  const [inputData, setInputData] = useState('');
  const [temporarySearchResults, setTemporarySearchResults] = useState([]);
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);

  const ref = useClickOutsideClose(setIsSearchListOpen, isSearchListOpen);
  // to close suggestions if user clicked the area outside

  const dispatch = useDispatch();
  const router = useRouter();

  const { data: productsData, isSuccess } = useGetProductsQuery({
    category: '',
    filter: { alphabet: 'asc', limit: '' },
  });
  // to load all products

  const handleSearch = () => {
    if (isSuccess) {
      const filteredResults =
        inputData === ''
          ? []
          : productsData.filter((item) =>
              item.title.toLowerCase().includes(inputData.toLowerCase()),
            );
      setTemporarySearchResults(filteredResults);
    }
  };
  // to search through all products loaded

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(changeSearchResults(temporarySearchResults));
    }
  };
  // to search on enter press

  useEffect(() => {
    handleSearch();
    if (inputData === '') {
      dispatch(changeSearchResults([]));
    }
    // if input gets empty, this action is needed to display products
    // in the catalog instead of previous (stale) search results
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
          onKeyDown={handleKeyPress}
        />

        <div className={css.searchedList}>
          {isSearchListOpen &&
            temporarySearchResults.map((element) => (
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
      <div
        className={css.searchIcon}
        onClick={() => dispatch(changeSearchResults(temporarySearchResults))}
      >
        <BiSearchAlt2 />
      </div>
    </div>
  );
}
