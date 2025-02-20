const qrFormEl = document.getElementById("qrForm");
const qrImageEl = document.getElementById("qrImage");
const qrContainerEl = document.getElementById("qrContainer");
const qrInputTextEl = document.getElementById("qrInputText");
const generateBtnEl = document.getElementById("generateBtn");
const downloadBtnEl = document.getElementById("downloadBtn");

const renderQRCode = (url) => {
  if (!url) return;
  generateBtnEl.innerText = "Generating QR Code...";
  qrImageEl.src = url;

  qrImageEl.addEventListener("load", () => {
    qrContainerEl.classList.add("show");
    generateBtnEl.innerText = "Generate QR Code";
    downloadBtnEl.classList.remove("hidden"); // Show the download button
  });

  // Set download functionality
  downloadBtnEl.onclick = async () => {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };
};

qrFormEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(qrFormEl);
  const text = formData.get("qrText").trim();
  if (!text) return;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;
  renderQRCode(qrCodeUrl);
});

// Hide QR code and download button when input is empty
qrInputTextEl.addEventListener("keyup", () => {
  if (!qrInputTextEl.value.trim()) {
    qrContainerEl.classList.remove("show");
    downloadBtnEl.classList.add("hidden");
  }
});
