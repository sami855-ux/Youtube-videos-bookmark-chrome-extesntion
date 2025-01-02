chrome.tabs.onUpdated.addListener((tabId, tab) => {
  //Every time a tab is updated, check if the url is a youtube video
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1]
    const urlParameters = new URLSearchParams(queryParameters)

    console.log(urlParameters)
    //Send a message to the content script with the video id
    chrome.tabs.sendMessage(tabId, {
      type: "NEW_VIDEO",
      videoId: urlParameters.get("v"),
    })
  }
})
