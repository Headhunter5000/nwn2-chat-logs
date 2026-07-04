export const scrollTo = (top: number, smooth: boolean = false) => {
  const el = document.querySelector('#app-root');

  if (el) {
    try {
      el.scroll({
        top,
        left: 0,
        behavior: smooth ? 'smooth' : 'auto',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      el.scrollTo(0, top);
    }
  }
};

export const scrollToTop = (smooth: boolean = false)  => {
  scrollTo(0, smooth);
};

export const scrollToElement = (selector: string, smooth: boolean = false) => {
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
