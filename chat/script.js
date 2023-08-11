const buttonSend = document.querySelector(".write__button_send"),
  buttonGeo = document.querySelector(".write__button_geo"),
  chatWindow = document.querySelector(".chat__window"),
  input = document.querySelector(".write__input"),
  url = "wss://echo-ws-service.herokuapp.com";

let webSoket;
let message;
let myPosition;
let messageBox;

function writeMyMessage(message) {
  let messageBox = document.createElement("div");
  messageBox.classList.add("window__message");
  messageBox.classList.add("my_message");
  messageBox.innerText = message;
  chatWindow.appendChild(messageBox);
}

function writeHisMessage(message) {
  let messageBox = document.createElement("div");
  messageBox.classList.add("window__message");
  messageBox.innerText = message;
  chatWindow.appendChild(messageBox);
}

function initializeWebSocket() {
  webSocket = new WebSocket(url);

  webSocket.onopen = () => {
    console.log("WebSocket connection opened");
  };
}

window.onload = initializeWebSocket;

buttonSend.addEventListener("click", () => {
  message = input.value;

  writeMyMessage("Вы: " + message);

  webSocket.send(message);

  webSocket.onmessage = function (e) {
    writeHisMessage("Эхо: " + e.data);
  };

  input.value = "";
});

function writeMyGeo() {
  messageBox = document.createElement("div");
  messageBox.classList.add("window__message");
  messageBox.classList.add("my_message");
  messageBox.classList.add("my_geo");
  chatWindow.appendChild(messageBox);
}

buttonGeo.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      myPosition = `https://www.openstreetmap.org/#map=10/${latitude}/${longitude}`;

      writeMyGeo();
      let geoBox = document.querySelector(".my_geo");
      let link = document.createElement("a");
      link.href = myPosition;
      link.target = "_blank";
      link.appendChild(document.createTextNode("Геолокация"));
      geoBox.appendChild(link);
      messageBox.classList.remove("my_geo");
    });
  }
});
