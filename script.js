const myVideo = document.getElementById("myVideo");
const remoteVideo = document.getElementById("remoteVideo");
const myIdDisplay = document.getElementById("myId");
const peerIdInput = document.getElementById("peerIdInput");

let myStream;
let peer = new Peer();

// 1. Po získaní ID zobraz ho
peer.on('open', id => {
  myIdDisplay.textContent = id;
});

// 2. Získaj kameru
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    myStream = stream;
    myVideo.srcObject = stream;

    // 3. Príjem hovoru
    peer.on('call', call => {
      call.answer(myStream);
      call.on('stream', remoteStream => {
        remoteVideo.srcObject = remoteStream;
      });
    });
  })
  .catch(err => {
    console.error("Kamera/Mikrofón nefunguje:", err);
  });

// 4. Pripojenie k inému Peer ID
function connectToPeer() {
  const otherPeerId = peerIdInput.value;
  const call = peer.call(otherPeerId, myStream);

  call.on('stream', remoteStream => {
    remoteVideo.srcObject = remoteStream;
  });
}
