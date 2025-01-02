import { getActiveURL } from "./utils.js"

const addNewBookmark = () => {}

const viewBookmarks = () => {}

const onPlay = (e) => {}

const onDelete = (e) => {}

const setBookmarkAttributes = () => {}

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveURL()
  const queryParameters = activeTab.url.split("?")[1]
  const urlParameters = new URLSearchParams(queryParameters)

  const currentVideo = urlParameters.get("v")

  if (activeTab.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (obj) => {
      const currentVideoBookmark = obj[currentVideo]
        ? JSON.parse(obj[currentVideo])
        : []
    })
  }
})
