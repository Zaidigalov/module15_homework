const buttonSend = document.querySelector(".write__button_send");
const buttonGeo = document.querySelector(".write__button_geo");
const chatWindow = document.querySelector(".chat__window");
const input = document.querySelector(".write__input");
const url = "wss://echo-ws-service.herokuapp.com";
//const url = "wss://echo.websocket.events";

let websoket;
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

buttonSend.addEventListener("click", () => {
  message = input.value;

  websoket = new WebSocket(url);

  writeMyMessage("Вы: " + message);

  websoket.send(message);

  websoket.onmessage = function (e) {
    writeHisMessage("Эхо: " + e.data);
  };
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

//Не удается подключиться к серверу даже с VPN.
