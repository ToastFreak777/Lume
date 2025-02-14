export const setCookie = (name, value, options = {}) => {
  document.cookie = `${name}=${value}; ${options}`;
};

export const getCookie = (name) => {
  return document.cookie.split(`${name}=`)[1];
};
