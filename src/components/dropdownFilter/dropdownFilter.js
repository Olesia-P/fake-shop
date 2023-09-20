import css from "./dropdownFilter.module.scss";
import cx from "classnames";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

export default function DropdownFilter({
  chosenOptionFunction,
  optionsList,
  filterName,
}) {
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  return (
    <div className={cx(css.filter, isFilterOpened && css.open)}>
      <div className={css.filterHeader}>{filterName}:</div>
      <div className={css.options}>
        <div className={css.filterListWrap}>
          <div className={css.filterChosen}>{chosenOptionFunction()}</div>
          <div className={css.filterAccordion}>
            {optionsList.map((element) => (
              <div
                key={element.name}
                className={css.filterOption}
                onClick={() => element.onClickFunction()}
              >
                {element.name}
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
