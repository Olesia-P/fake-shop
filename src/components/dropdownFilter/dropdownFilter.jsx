import cx from 'classnames';
import { useState, React } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import css from './dropdownFilter.module.scss';

export default function DropdownFilter({
  chosenOptionFunction,
  optionsList,
  filterTitle,
  onClick,
  filterName,
}) {
  const [isFilterOpened, setIsFilterOpened] = useState(false);

  return (
    <div className={cx(css.filter, isFilterOpened && css.open)}>
      <div className={css.filterHeader}>{filterTitle}:</div>
      <div className={css.options}>
        <div className={css.filterListWrap}>
          <div className={css.filterChosen}>{chosenOptionFunction()}</div>
          <div className={css.filterAccordion}>
            {optionsList.map((element) => (
              <div
                key={element.value}
                className={css.filterOption}
                onClick={() => {
                  onClick(filterName, element.value);
                  setIsFilterOpened(false);
                }}
              >
                {element.render}
              </div>
            ))}
          </div>
        </div>
        <div
          className={css.chevron}
          onClick={() => setIsFilterOpened(!isFilterOpened)}
        >
          <BiChevronDown />
        </div>
      </div>
    </div>
  );
}
