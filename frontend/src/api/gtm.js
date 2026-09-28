// Google Tag Manager helper functions
export const initGTM = (gtmId) => {
  if (!gtmId || window.dataLayer) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const f = document.getElementsByTagName('script')[0];
  const j = document.createElement('script');
  j.async = true;
  j.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  f.parentNode.insertBefore(j, f);
};

export const trackEvent = (eventName, eventParams = {}) => {
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...eventParams });
  }
};