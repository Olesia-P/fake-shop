import css from "./footer.module.scss";
import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <div className={css.container}>
      <a className={css.gitLink} href=" https://github.com/Olesia-P/fake-shop">
        <div className={css.iconWrap}>
          <AiFillGithub />
        </div>
        Git repository
      </a>
    </div>
  );
}
