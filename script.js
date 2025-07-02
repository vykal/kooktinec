const video = document.getElementById("myVideo");

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Kamera sa nepodarila spustiť:", err);
  });
