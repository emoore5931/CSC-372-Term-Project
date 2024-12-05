/*
  Name: Ethan Moore
  Date: 10.16.2024
  CSC 372-01

  Scripting for admin-upload.html.
*/

const UPLOAD_URL = "/be/admin/upload";
const fileNameRef = document.getElementById("fileName");
const fileInputRef = document.getElementById("fileInput");
const submitButtonRef = document.getElementById("submit");
let files;

fileInputRef.addEventListener("change", (event) => {
    files = fileInputRef.files;
    if (files.length > 0) {
        let file = files.item(0);
        fileNameRef.textContent = file.name + ", " + formatBytes(file.size);
    }
})

submitButtonRef.addEventListener("click", (event) => {
    if (files.length <= 0) { return }

    successfulUploads = [];
    unsuccessfulUploads = [];

    for (let file of files) {
        if (file) {
            let productData;
            const reader = new FileReader();

            reader.onload = async (event) => {
                productData = event.target.result;
                await fetch(UPLOAD_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: productData
                }).then(response => {
                    if (response.ok) {
                        successfulUploads.push(file.name);
                    } else {
                        unsuccessfulUploads.push(file.name);
                    }
                }).catch(error => {
                    console.error(error);
                    alert("Error uploading file.");
                });

                let alertMessage = successfulUploads.length > 0 ? `Successfully uploaded: ${successfulUploads.join(", ")}` : "";
                alertMessage += unsuccessfulUploads.length > 0 ? `; Failed to upload: ${unsuccessfulUploads.join(", ")}` : "";

                alert(alertMessage);
            };

            reader.readAsText(file);
        }
    }
});

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) 
        return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}