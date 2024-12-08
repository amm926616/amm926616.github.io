// Function to load screenshots for a given project and add click events
function loadScreenshots(projectName) {
    const screenshotFolder = `./screenshots/${projectName}/`;
    const gallery = document.getElementById(`${projectName}-gallery`);

    if (!gallery) {
        console.error(`Gallery element with ID '${projectName}-gallery' not found.`);
        return;
    }

    // Fetch the JSON data for the screenshots
    fetch(`./resources/screenshots-json/${projectName}-screenshots.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch JSON for ${projectName}`);
            }
            return response.json();
        })
        .then(data => {
            const images = data.screenshots;

            if (!images || images.length === 0) {
                gallery.innerHTML = "<p>No screenshots available.</p>";
                return;
            }

            // Loop through the image filenames and add them to the gallery
            images.forEach((fileName) => {
                const decodedFileName = decodeURIComponent(fileName);
                const title = decodedFileName
                    .replace(/^\d+-/, "") // Remove leading numbers and dash
                    .replace(/\.\w+$/, ""); // Remove file extension

                const figure = document.createElement("figure");
                figure.classList.add("image-card");

                const img = document.createElement("img");
                img.src = `${screenshotFolder}${fileName}`;
                img.alt = title;
                img.loading = "lazy";
                
                // Add click event to each image card to open the image viewer
                figure.addEventListener("click", function () {
                    openImageViewer(`${screenshotFolder}${fileName}`);
                });

                const figcaption = document.createElement("figcaption");
                figcaption.textContent = title;

                figure.appendChild(img);
                figure.appendChild(figcaption);
                gallery.appendChild(figure);
            });
        })
        .catch((error) => {
            console.error("Error loading screenshots:", error);
            gallery.innerHTML = "<p>No screenshots available for this project.</p>";
        });
}

// Function to open an image viewer modal
function openImageViewer(imageSrc) {
    // Create a modal to display the full-size image
    const modal = document.createElement("div");
    modal.classList.add("image-modal");

    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = "Full-size image";

    // Close button
    const closeBtn = document.createElement("span");
    closeBtn.textContent = "×";
    closeBtn.classList.add("close-btn");
    closeBtn.addEventListener("click", function () {
        document.body.removeChild(modal); // Close the modal when clicking close
    });

    modal.appendChild(closeBtn);
    modal.appendChild(img);
    document.body.appendChild(modal);
}


// Function to handle the theme toggle and smooth scrolling
function handleUIElements() {
    const body = document.body;
    const navbarHeight = document.querySelector("nav").offsetHeight;
    const navLinks = document.querySelectorAll("nav a");

    // Check if dark mode is saved in localStorage or set it by default
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme || savedTheme === "dark") {
        body.classList.add("dark-mode"); // Set dark mode by default if not set
    }

    // Toggle theme on button click
    document
        .querySelector(".theme-toggle")
        .addEventListener("click", function () {
            body.classList.toggle("dark-mode");

            // Save the current theme in localStorage
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });

    // Smooth scrolling with offset for each navigation link
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - navbarHeight,
                behavior: "smooth",
            });
        });
    });
}

// DOMContentLoaded listener to initialize functions
document.addEventListener("DOMContentLoaded", function () {
    // Load screenshots for specific projects
    loadScreenshots('april-music-player'); // For April Music Player
    loadScreenshots('chess-project');      // For Chess Project
    loadScreenshots('aespa-Live-My-Life-Film-Photos');

    // Initialize other UI elements like theme toggle and smooth scrolling
    handleUIElements();
});
