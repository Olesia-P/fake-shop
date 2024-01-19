import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import css from './loading.module.scss';

export default function Loading() {
  return (
    <div className={css.container}>
      <BiLoaderAlt className={css.loadingGlobal} />
      <div className={css.loadingCaption}>Loading...</div>
    </div>
  );
}
