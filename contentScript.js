;(() => {
  let youtubeLeftController, youtubePlayer
  let currentVideo = ""

  //Add a listener to the message from the background script
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, videoId, value } = obj

    if (type === "NEW_VIDEO") {
      currentVideo = videoId

      //Load the new video
      newVideoLoaded()
    }
  })

  const newVideoLoaded = () => {
    const bookmarkBntExists = document.getElementsByClassName("bookmark-btn")[0]

    if (!bookmarkBntExists) {
      const bookmarkBtn = document.createElement("img")

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png")
      bookmarkBnt.className = "ytp-button " + "bookmark-btn"
      bookmarkBtn.title = "Click to bookmark current timestamp for this video"

      //Select the youtube left controller and video stream
      youtubeLeftController =
        document.getElementsByClassName("ytp-left-controls")[0]
      youtubePlayer = document.getElementsByClassName("video-stream")[0]

      //Add the bookmark button to the youtube left controller
      youtubeLeftController.appendChild(bookmarkBtn)
    }
  }
})()
