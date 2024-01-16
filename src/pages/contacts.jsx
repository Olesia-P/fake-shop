import React from 'react';

import { FaLinkedin, FaSkype } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import css from '../styles/pageStyles/contacts.module.scss';

export default function Contacts() {
  const contacts = [
    {
      link: 'mailto:pryhun.o@gmail.com',
      name: 'Email: pryhun.o@gmail.com',
      icon: <MdOutlineMailOutline />,
    },
    {
      link: '/',
      name: 'LinkedIn',
      icon: <FaLinkedin />,
    },
    {
      link: '/',
      name: 'Skype',
      icon: <FaSkype />,
    },
  ];

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <div className={css.header}>Contacts</div>
        {contacts.map((element) => (
          <a key={element.name} className={css.contact} href={element.link}>
            <span className={css.icon}>{element.icon}</span>
            {element.name}
          </a>
        ))}
      </div>
    </div>
  );
}
