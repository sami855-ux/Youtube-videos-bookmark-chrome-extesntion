chromes.tabs.onUpdated.addListener((tabId, tab) => {
  //Every time a tab is updated, check if the url is a youtube video
  if (tab.url && tab.url.includes("youtube.com/watch")) {
  }
})
