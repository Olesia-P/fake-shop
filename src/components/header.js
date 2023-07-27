import css from "./header.module.scss";
import cx from "classnames";
import { BiSolidUserCircle, BiSearchAlt2 } from "react-icons/bi";

export default function Header() {


  return (
    <div className={css.container}>
      <div className={css.userIcon}>
        <BiSolidUserCircle />
      </div>
      <div className={cx(css.logo)}>Fake Shop</div><div className={css.headerLink}>Home</div><div className={css.headerLink}>Catalog</div>
      <div className={css.headerLink}>Contacts</div>
      <div className={css.searchFrom}><input type="search" placeholder="Search" /><div className={css.searchIcon}><BiSearchAlt2/></div>
      
      </div>
    
    </div>
  );
}
