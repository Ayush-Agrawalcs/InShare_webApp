const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const linkSection = document.getElementById("link-section");
const generatedLink = document.getElementById("generated-link");

// Drag and Drop Events
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.style.borderColor = "#1a73e8";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.borderColor = "#a3c9ff";
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.style.borderColor = "#a3c9ff";
    const file = event.dataTransfer.files[0];
    if (file) {
        uploadFile(file);
    }
});

// File Input (Browse Link)
document.getElementById("browse-link").addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        uploadFile(file);
    }
});

// Upload File (Simulate Link Generation)
function uploadFile(file) {
    // Simulate a server response with a generated link
    const fileName = encodeURIComponent(file.name);
    const fakeLink = `https://example.com/files/${fileName}`;
    showGeneratedLink(fakeLink);
    // Trigger icon transition
    transitionIcons();
}

// Display the Generated Link
function showGeneratedLink(link) {
    generatedLink.value = link;
    linkSection.style.display = "block";
}

// Copy Link to Clipboard
function copyLink() {
    generatedLink.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");
}

// Transition Icons
function transitionIcons() {
    // Hide the first icon
    document.getElementById("icon1").classList.add("hidden");
    
    // Show the second and third icons with a smooth transition
    document.getElementById("icon2").classList.remove("hidden");
    document.getElementById("icon3").classList.remove("hidden");

    // Optionally, you can change opacity or transition styles
    setTimeout(() => {
        document.getElementById("icon2").style.opacity = 1;
        document.getElementById("icon3").style.opacity = 1;
    }, 500);
}
