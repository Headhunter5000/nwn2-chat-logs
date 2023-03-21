export const scrollTo = (top, smooth) => {
  const el = document.querySelector('#app-root');

  try {
    el.scroll({
      top,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  } catch (err) {
    el.scrollTo(0, top);
  }
};

export const scrollToTop = smooth  => {
  scrollTo(0, smooth);
};

export const scrollToElement = (selector, smooth) => {
  const el = document.querySelector(selector);

  if (el) {
    el.scrollIntoView({
      block: 'center',
      behavior: smooth ? 'smooth' : 'auto',
    });
    return true;
  }

  return false;
};
