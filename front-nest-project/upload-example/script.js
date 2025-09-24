const API_URL = "http://localhost:3000/api/v1/upload";

async function uploadFile(endpoint) {
  const fileInput = document.getElementById("fileInput");
  if (!fileInput.files.length) {
    alert("Por favor, selecciona un archivo");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  document.getElementById("result").innerText = data.message || "Subido";
  await loadImages();
}

function uploadLocal() {
  uploadFile("local");
}

function uploadS3() {
  uploadFile("s3");
}

async function loadImages() {
  const res = await fetch(`${API_URL}/images`);
  const images = await res.json();

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  images.forEach(img => {
    const imgEl = document.createElement("img");
    imgEl.src = img.url;
    imgEl.className = "w-full h-40 object-cover rounded shadow";
    gallery.appendChild(imgEl);
  });
}

window.onload = loadImages;
