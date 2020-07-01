const model = ["userInfo"];

//用户点击其他地方，关闭窗口
window.onclick = function(event) {
  for (let i = 0; i < model.length; i++) {
    let m = document.getElementById(model[i]);
    if (event.target === m) {
      m.style.display = "none";
    }
  }
};
