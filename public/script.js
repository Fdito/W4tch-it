const videoElem = document.getElementById("video");
const startElem = document.getElementById("start");
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    stopCapture()
  }

});
startElem.addEventListener("click", function (evt) {
  startCapture()
  startElem.style.display = 'none'
});

async function startCapture() {
  const displayMediaOptions = {
    video: {
      cursor: "never"
    },
    audio: false
  };
  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
  } catch (err) {
    console.error("Error: " + err);
    if (err == 'NotAllowedError: Permission denied') {
      startElem.style.display = 'block'
    }
  }
}

function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();
  tracks.forEach(track => track.stop());
  videoElem.srcObject = null;
  startElem.style.display = 'block'
}

