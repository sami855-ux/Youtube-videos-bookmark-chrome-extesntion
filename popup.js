import { getActiveURL } from "./utils.js"

const addNewBookmark = (bookmarkElement, bookmark) => {
  const bookmarkTitleElement = document.createElement("div")
  const newBookmarkElement = document.createElement("div")
  const controlsElement = document.createElement("div")

  bookmarkTitleElement.textContent = bookmark.desc
  bookmarkTitleElement.className = "bookmark-title"

  controlsElement.className = "bookmark-controls"

  newBookmarkElement.id = "bookmark-" + bookmark.time
  newBookmarkElement.className = "bookmark"
  newBookmarkElement.setAttribute("timestamp", bookmark.time)

  setBookmarkAttributes("play", onPlay, controlsElement)
  setBookmarkAttributes("delete", onDelete, controlsElement)

  newBookmarkElement.appendChild(bookmarkTitleElement)
  newBookmarkElement.appendChild(controlsElement)
  bookmarkElement.appendChild(newBookmarkElement)
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

const onPlay = async (e) => {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp")
  const activeTab = await getActiveURL()

  //Send a message to the content script to play the video at the bookmarked time
  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY_VIDEO",
    time: bookmarkTime,
  })
}

const onDelete = async (e) => {
  const activeTab = await getActiveURL()
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp")
  const bookmarkElementToDelete = document.getElementById(
    "bookmark-" + bookmarkTime
  )

  //Delete the bookmark from the storage
  bookmarkElementToDelete.remove()

  // Send a message to the content script to delete the bookmark
  chrome.tabs.sendMessage(
    activeTab.id,
    {
      type: "DELETE_BOOKMARK",
      time: bookmarkTime,
    },
    viewBookmarks
  )
}

const setBookmarkAttributes = (src, eventListener, controlParentElement) => {
  const controlElement = document.createElement("img")

  controlElement.src = "assets/" + src + ".png"
  controlElement.title = src
  controlElement.addEventListener("click", eventListener)

  controlParentElement.appendChild(controlElement)
}

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
