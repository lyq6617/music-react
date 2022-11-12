import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function remSize() {
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  if (deviceWidth >= 750) {
    deviceWidth = 750;
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320;
  }
  //750px-->1rem=100px 375px-->1rem=50px
  document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
  //设置字体大小
  document.querySelector("body").style.fontSize = 0.3 + "rem";
}
remSize();
//当窗口发生变化就会调用
window.onresize = function () {
  remSize();
};
