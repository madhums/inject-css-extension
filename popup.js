document.addEventListener('DOMContentLoaded', async () => {
  const siteEl = document.getElementById('site');
  const cssInput = document.getElementById('cssInput');
  const saveBtn = document.getElementById('saveBtn');
  const statusEl = document.getElementById('status');

  // Get current tab and domain
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const domain = url.hostname;
  siteEl.textContent = `Editing CSS for: ${domain}`;

  // Load existing CSS for the domain
  chrome.storage.local.get(domain, (data) => {
    if (data[domain]) cssInput.value = data[domain];
  });

  // Save and inject CSS
  saveBtn.addEventListener('click', async () => {
    const css = cssInput.value;
    chrome.storage.local.set({ [domain]: css });

    // Inject CSS into the current tab
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      css
    });

    statusEl.textContent = 'Saved and applied!';
    setTimeout(() => (statusEl.textContent = ''), 1500);
  });
});
