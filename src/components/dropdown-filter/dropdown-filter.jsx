import cx from 'classnames';
import { useState, React } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import css from './dropdown-filter.module.scss';

export default function DropdownFilter({
  chosenOption,
  optionsList,
  filterTitle,
  onClick,
  filterName,
}) {
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const decideChosenOption = () => {
    if (typeof chosenOption === 'function') {
      return chosenOption();
    }
    return chosenOption;
  };

  return (
    <div className={cx(css.filter, isFilterOpened && css.open)}>
      <div className={css.filterHeader}>{filterTitle}:</div>
      <div className={css.options}>
        <div className={css.filterListWrap}>
          <div className={css.filterChosen}>{decideChosenOption()}</div>
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
