import { TiThMenu } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { React } from 'react';
import { changeIsMobileMenuOpen } from '../../store/modules/openingsSlice';
import useClickOutsideClose from '../../hooks/useClickOutsideClose';
import css from './hamburger.module.scss';

export default function Hamburger() {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector(({ openings }) => openings);

  const changeMobileWithDispatch = (value) => {
    dispatch(changeIsMobileMenuOpen(value));
  };

  const ref = useClickOutsideClose(changeMobileWithDispatch, isMobileMenuOpen);

  return (
    <div
      className={css.container}
      onClick={() => dispatch(changeIsMobileMenuOpen(!isMobileMenuOpen))}
      ref={ref}
    >
      <TiThMenu />
    </div>
  );
}
