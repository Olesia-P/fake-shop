import css from "./button.module.scss";
import { BiLoaderAlt } from "react-icons/bi";
import cx from "classnames";

export default function Button({
  onClick,
  isFetching = false,
  isDisabled = false,
  width,
  fontSize,
  text,
  type = "button",
  isWide = false,
}) {
  return (
    <button
      type={type}
      className={cx(
        css.addToCartBtn,
        isDisabled && css.disabled,
        width === "widthM" && css.widthM,
        width === "widthL" && css.widthL,
        fontSize === "fontP" && css.fontP,
        fontSize === "fontHeader" && css.fontHeader,
        fontSize === "fontHuge" && css.fontHuge,
        isWide && css.wide
      )}
      onClick={onClick}
      aria-disabled={isDisabled}
    >
      {isFetching && <BiLoaderAlt className={css.loading} />}
      {text}
    </button>
  );
}
