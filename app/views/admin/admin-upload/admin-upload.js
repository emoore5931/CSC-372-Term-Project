/*
  Name: Ethan Moore
  Date: 10.16.2024
  CSC 372-01

  Scripting for admin-upload.html.
*/

const fileNameRef = document.getElementById("fileName");
const fileInputRef = document.getElementById("fileInput");
let files;

fileInputRef.addEventListener("change", (event) => {
    files = fileInputRef.files;
    if (files.length > 0) {
        let file = files.item(0);
        fileNameRef.textContent = file.name + ", " + formatBytes(file.size);
    }
})

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) 
        return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}