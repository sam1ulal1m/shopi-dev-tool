chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getCookies') {
    chrome.cookies.getAll({ url: request.url }, (cookies) => {
      sendResponse(cookies);
    });
    return true; // Indicates async response
  }
});
