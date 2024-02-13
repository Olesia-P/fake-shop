import React from 'react';
import { FaLinkedin, FaTelegramPlane } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import css from '../styles/pageStyles/contacts.module.scss';

export default function Contacts() {
  const contacts = [
    {
      link: 'mailto:pryhun.o@gmail.com',
      linkText: 'Email:',
      text: 'pryhun.o@gmail.com',
      icon: <MdOutlineMailOutline />,
    },
    {
      link: 'https://www.linkedin.com/in/olesia-pryhun-217051247/',
      linkText: 'LinkedIn',
      text: '',
      icon: <FaLinkedin />,
    },
    {
      link: 'https://t.me/Pryhun_Olesia',
      linkText: 'Telegram:',
      text: '@Pryhun_Olesia',
      icon: <FaTelegramPlane />,
    },
  ];

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <div className={css.header}>Contacts</div>
        {contacts.map((element) => (
          <p className={css.contact} key={element.text}>
            <span className={css.icon}>{element.icon}</span>
            <a
              key={element.name}
              href={element.link}
              target="_blank"
              rel="noreferrer"
              className={css.link}
            >
              {element.linkText}
            </a>

            <span className={css.text}>{element.text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
