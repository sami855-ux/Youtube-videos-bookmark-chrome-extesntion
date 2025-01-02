chromes.tabs.onUpdated.addListener((tabId, tab) => {
  //Every time a tab is updated, check if the url is a youtube video
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1]
    const urlParams = new URLSearchParams(queryParameters) //Get the query parameters

    // Send a message to the content script with the video id
    chrome.tabs.sendMessage(tabId, {
      type: "NEW_VIDEO",
      videoId: urlParams.get("v"),
    })
  }
})
