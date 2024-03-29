import { TiThMenu } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { React } from 'react';
import { changeIsMobileMenuOpen } from '../../store/modules/openings-slice';
import useClickOutsideClose from '../../hooks/use-click-outside-close';
import css from './hamburger.module.scss';

export default function Hamburger() {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector(({ openings }) => openings);

  const changeMobileWithDispatch = (value) => {
    dispatch(changeIsMobileMenuOpen(value));
  };

  const ref = useClickOutsideClose(changeMobileWithDispatch, isMobileMenuOpen);
  // to close menu if user clicked the area outside nenu

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
