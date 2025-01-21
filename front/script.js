const dropArea = document.querySelector(".upload-box");
const fileInput = document.getElementById("file-input");
const linkSection = document.querySelector(".link-section");
const generatedLink = document.getElementById("generated-link");

const bgprogress = document.querySelector(".bg-progress");
const progressbar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");
const percentDiv=document.querySelector("#percent");

// const host = "https://innshare.herokuapp.com/";
// const uploadURL = `${host}api/files`;

// Drag and Drop Events
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();  // Allow drop
    dropArea.classList.add("dragged");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragged");
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();  // Prevent the default behavior of the drop (e.g., opening the file)
    dropArea.classList.remove("dragged");

    console.log("Drop event triggered");
    console.log(event);
    console.log("DataTransfer items:", event.dataTransfer.items);
    console.log("DataTransfer files:", event.dataTransfer.files);

    // Get the dropped files
    const files = event.dataTransfer.files;
    console.log("Dropped files detected:", files);

    // If valid files are detected, trigger the file upload
    if (files.length > 0) {
        fileInput.files = files;  
        uploadFile(files); 
    } else {
        console.log("No valid files detected in dataTransfer.files.");
    }
});

// File Input (Browse Link)
document.getElementById("browse-link").addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        uploadFile(files);  
    }
});

// Function to handle the file upload simulation (progress bar)
const uploadFile = (files) => {
    progressContainer.style.display="block";
    const file = files[0];  
    const formData = new FormData();
    formData.append("myfile", file);
    
   
   
   simulateUpload(file);  
   

    // Below code would handle the real upload to the server if needed:
    /*
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response);
        }
    };

    xhr.upload.onprogress = updateProgress;  // Use the real progress event
    xhr.open("POST", uploadURL);
    xhr.send(formData);
    */
};

// Simulate fake upload (progress bar)
const simulateUpload = (file) => {
    console.log("Uploading file:", file.name);
    let progress = 0;

    const interval = setInterval(() => {
        // Randomly increase progress between 5 and 20 each time
        const randomIncrement = Math.floor(Math.random() * 16) + 5;  // Random value between 5 and 20
        progress += randomIncrement;

        
        if (progress > 100) {
            progress = 100;
        }

        // Update the progress bar width
        bgprogress.style.width = `${progress}%`;

        
        percentDiv.innerHTML = `${progress}`;
        progressbar.style.transform=`scaleX(${progress/100})`;

        if (progress >= 100) {
            clearInterval(interval);  
            console.log("Upload complete!");
            showGeneratedLink(`https://example.com/files/${encodeURIComponent(file.name)}`); // Show the link section after "upload" completion
        }
    }, Math.random() * 500 + 300);  // Randomize the interval time between 300ms and 800ms
    
};

const showGeneratedLink=(link)=> {
    generatedLink.value = link;
    linkSection.style.display = "block";
}

function copyLink() {
    generatedLink.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");
}

// Simulate file upload progress update
const updateProgress = (e) => {
    const percent = Math.round((e.loaded / e.total) * 100);
    console.log(percent);
    bgprogress.style.width = `${percent}%`;
};
