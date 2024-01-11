export const setCookie = (key, value, days) => {
  // const validValues = Number;

  // if (!validValues.includes(value)) {
  //   // eslint-disable-next-line no-console
  //   console.error(`Invalid value for cookie: ${value}`);

  //   document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

  //   return;
  // }

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${key}=${value};expires=${expires.toUTCString()};path=/`;
};

export const getCookie = (key) => {
  const name = `${key}=`;
  const decodedCookie = decodeURIComponent(document.cookie);

  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i += 1) {
    // eslint-disable-next-line prefer-const
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
};
