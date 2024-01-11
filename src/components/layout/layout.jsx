/* eslint-disable no-console */
import { React, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Navbar from './navbar/navbar';
import MobileMenu from '../mobile-menu/mobile-menu';
import Footer from './footer/footer';
import css from './layout.module.scss';
import {
  changeLastOrderId,
  changeUserId,
} from '../../store/modules/mixed-purpose-slice';
import { getCookie, setCookie } from '../../utils/cookie';

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.path !== '/finished-order') {
      dispatch(changeLastOrderId(''));
    }
  }, [router.path]);

  useEffect(() => {
    const storedUserId = getCookie('userId');
    const newUserId = (Math.random() * 100000000000).toFixed(0);

    if (storedUserId) {
      console.log(`id was stored ${storedUserId}`);
      dispatch(changeUserId(storedUserId));
    }
    if (!storedUserId) {
      console.log('id was not stored');
      setCookie('userId', newUserId, 30);
      dispatch(changeUserId(newUserId));
      // console.log('cartId', cartId);
    }
  }, []);

  return (
    <>
      <Navbar />
      <MobileMenu />
      <div className={css.mainContent}>{children}</div>
      <Footer />
    </>
  );
}
