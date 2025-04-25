
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_TAB_DATA") {
    const storeUrl = localStorage.getItem("store_url");
    const cookie = document.cookie;
    sendResponse({ storeUrl, cookie });
  }
  return true; // For async response
});
