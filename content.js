// Runs on every page, injects saved CSS for that domain
(async function () {
  const domain = location.hostname;
  chrome.storage.local.get(domain, (data) => {
    const css = data[domain];
    if (css) {
      const style = document.createElement('style');
      style.textContent = css;
      document.documentElement.appendChild(style);
    }
  });
})();
