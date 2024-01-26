import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import css from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={css.container}>
      <a
        className={css.gitLink}
        href="https://github.com/Olesia-P/fake-shop"
        target="_blank"
        rel="noreferrer"
      >
        <div className={css.iconWrap}>
          <AiFillGithub />
        </div>
        Source code - Git repository
      </a>
    </footer>
  );
}
