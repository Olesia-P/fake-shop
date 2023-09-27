import { React, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Navbar from '../navbar/navbar';
import MobileMenu from '../mobileMenu/mobileMenu';
import Footer from './footer/footer';
import css from './layout.module.scss';
import { changeLastOrderId } from '../../store/modules/mixedPurposeSlice';

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.path !== '/finishedOrder') {
      dispatch(changeLastOrderId(''));
    }
  }, [router.path]);

  return (
    <>
      <Navbar />
      <MobileMenu />
      <div className={css.mainContent}>{children}</div>
      <Footer />
    </>
  );
}
