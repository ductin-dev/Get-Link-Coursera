var link = "",
  success = false;
chrome.storage.sync.set({ link: "", success: false });

function getLink() {
  //Pay to view this, nothing free :)
}

function failHandler() {
  document.getElementById("edwuitqe").style.display = "none";
  document.getElementById("fejfeoif").style.display = "";
}

function successHandler() {
  document.getElementById("edwuitqe").style.display = "";
  document.getElementById("fejfeoif").style.display = "none";
  document.getElementById("result").value = link;
}

async function mainHandler(isManual) {
  if (isManual)
    setTimeout(function () {
      document.getElementById("reloadBtn").innerHTML =
        '<div class="lds-ring"><div></div><div></div><div></div><div>';
    }, 1000);

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getLink,
  });

  chrome.storage.sync.get(["link", "success"], (e) => {
    link = e.link;
    success = e.success;
  });
  if (success) successHandler();
  else failHandler();
  document.getElementById("reloadBtn").innerHTML = "Reload";
}

copyBtn.addEventListener("click", async () => {
  str = document.getElementById("result").value;
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  document.getElementById("copyBtn").innerHTML = "Copied !";
});
copyBtn.addEventListener("mouseover", async (e) => {
  document.getElementById("copyBtn").style.background = "#e2e2e2";
});
copyBtn.addEventListener("mouseleave", async (e) => {
  document.getElementById("copyBtn").style.background = "";
});
copyBtn.addEventListener("mousedown", async (e) => {
  document.getElementById("copyBtn").style.background = "#bdbdbd";
});
copyBtn.addEventListener("mouseup", async (e) => {
  document.getElementById("copyBtn").style.background = "#e2e2e2";
});

reloadBtn.addEventListener("click", mainHandler(true));
var timer = setInterval(function () {
  mainHandler(false);
  if (link !== "") clearInterval(timer);
}, 500);
