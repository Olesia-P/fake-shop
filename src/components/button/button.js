import css from "./button.module.scss";
import { BiLoaderAlt } from "react-icons/bi";
import cx from "classnames";

export default function Button({
  clickHandler,
  isFetching,
  isDisabled,
  width,
  fontSize,
  isHover,
  isAlignSelfEnd,
  type,
  onSubmit,
}) {
  return (
    <button
      type={type}
      className={cx(
        css.addToCartBtn,
        css[width],
        css[fontSize],
        isDisabled && css.disabled,

        isHover && css.hover,
        isAlignSelfEnd && css.alignSelfEnd
      )}
      onClick={clickHandler}
      aria-disabled={isDisabled}
      onSubmit={onSubmit}
    >
      {isFetching && <BiLoaderAlt className={css.loading} />}
      Add to cart
    </button>
  );
}
