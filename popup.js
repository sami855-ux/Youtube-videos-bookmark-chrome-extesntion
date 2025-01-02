import { getActiveURL } from "./utils.js"

const addNewBookmark = (bookmarkElement, bookmark) => {
  const bookmarkTitleElement = document.createElement("div")
  const newBookmarkElement = document.createElement("div")

  bookmarkTitleElement.textContent = bookmark.desc
  bookmarkTitleElement.className = "bookmark-title"

  newBookmarkElement.id = "bookmark-" + bookmark.time
}

const viewBookmarks = (currentVideoBookmark = []) => {
  const bookmarkElement = document.getElementById("bookmarks")
  bookmarkElement.innerHTML = ""

  if (currentVideoBookmark.length > 0) {
    for (let i = 0; i < currentVideoBookmark.length; i++) {
      const bookmark = currentVideoBookmark[i]

      addNewBookmark(bookmarkElement, bookmark)
    }
  } else {
    bookmarkElement.innerHTML =
      "<div class='title'>No bookmarks available</div>"
  }
}

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

      //viewBookmarks
      viewBookmarks(currentVideoBookmark)
    })
  } else {
    //If the current tab is not a youtube video, show a message
    const container = document.getElementsByName("container")[0]

    container.innerHTML = "<div class='title'>This is not a youtube video</div>"
  }
})
