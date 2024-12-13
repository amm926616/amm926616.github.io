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

// Function to load screenshots for a given project and add click events
function loadScreenshots(projectName) {
  const screenshotFolder = `./screenshots/${projectName}/`;
  const gallery = document.getElementById(`${projectName}-gallery`);

  if (!gallery) {
    console.error(
      `Gallery element with ID '${projectName}-gallery' not found.`,
    );
    return;
  }

  // Fetch the JSON data for the screenshots
  fetch(`./resources/screenshots-json/${projectName}-screenshots.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON for ${projectName}`);
      }
      return response.json();
    })
    .then((data) => {
      const images = data.screenshots;

      if (!images || images.length === 0) {
        gallery.innerHTML = "<p>No screenshots available.</p>";
        return;
      }

      // Store image data in the gallery element for navigation
      gallery.dataset.images = JSON.stringify(images);

      // Loop through the image filenames and add them to the gallery
      images.forEach((fileName, index) => {
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
          openImageViewer(gallery, index);
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

// Function to open an image viewer modal with navigation and resizing
function openImageViewer(gallery, currentIndex) {
  const images = JSON.parse(gallery.dataset.images);
  const screenshotFolder =
    gallery.dataset.screenshotFolder ||
    `./screenshots/${gallery.id.split("-gallery")[0]}/`;

  if (!images || images.length === 0) return;

  // Create the modal container
  const modal = document.createElement("div");
  modal.classList.add("image-modal");

  // Image element
  const img = document.createElement("img");
  img.src = `${screenshotFolder}${images[currentIndex]}`;
  img.alt = "Full-size image";
  img.style.transform = "scale(1)"; // Initialize scale for resizing

  // Close button
  const closeBtn = document.createElement("span");
  closeBtn.textContent = "×";
  closeBtn.classList.add("close-btn");
  closeBtn.addEventListener("click", function () {
    closeImageViewer(modal); // Close the modal
  });

  // Left navigation button
  const leftBtn = document.createElement("button");
  leftBtn.classList.add("nav-btn", "left-btn");
  leftBtn.innerHTML = "&#10094;"; // Left arrow
  leftBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Navigate left
    img.src = `${screenshotFolder}${images[currentIndex]}`;
    resetImageScale(img); // Reset scale when navigating
  });

  // Right navigation button
  const rightBtn = document.createElement("button");
  rightBtn.classList.add("nav-btn", "right-btn");
  rightBtn.innerHTML = "&#10095;"; // Right arrow
  rightBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length; // Navigate right
    img.src = `${screenshotFolder}${images[currentIndex]}`;
    resetImageScale(img); // Reset scale when navigating
  });

  // Add mouse wheel event for resizing the image
  img.addEventListener("wheel", function (event) {
    event.preventDefault();
    resizeImage(img, event.deltaY);
  });

  modal.appendChild(closeBtn);
  modal.appendChild(leftBtn);
  modal.appendChild(img);
  modal.appendChild(rightBtn);

  document.body.appendChild(modal);

  // Add keydown event listener for navigation and closing
  document.addEventListener("keydown", function keyHandler(event) {
    if (!document.body.contains(modal)) {
      document.removeEventListener("keydown", keyHandler);
      return;
    }
    switch (event.key) {
      case "ArrowLeft":
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        img.src = `${screenshotFolder}${images[currentIndex]}`;
        resetImageScale(img);
        break;
      case "ArrowRight":
        currentIndex = (currentIndex + 1) % images.length;
        img.src = `${screenshotFolder}${images[currentIndex]}`;
        resetImageScale(img);
        break;
      case "Escape":
        closeImageViewer(modal);
        document.removeEventListener("keydown", keyHandler);
        break;
    }
  });
}

// Function to resize the image using the mouse scroll
function resizeImage(img, deltaY) {
  const currentScale =
    parseFloat(img.style.transform.replace("scale(", "").replace(")", "")) || 1;
  const scaleStep = 0.1; // Define how much the scale changes per scroll
  let newScale = currentScale + (deltaY < 0 ? scaleStep : -scaleStep);

  // Clamp the scale value between a minimum and maximum
  newScale = Math.max(0.5, Math.min(newScale, 3));

  img.style.transform = `scale(${newScale})`;
}

// Function to reset the image scale
function resetImageScale(img) {
  img.style.transform = "scale(1)";
}

// Function to close the image viewer
function closeImageViewer(modal) {
  document.body.removeChild(modal);
}

// DOMContentLoaded listener to initialize functions
document.addEventListener("DOMContentLoaded", function () {
  // Initialize other UI elements like theme toggle and smooth scrolling
  handleUIElements();
  // Load screenshots for specific projects
  loadScreenshots("april-music-player");
  loadScreenshots("aespa-Live-My-Life-Film-Photos");
});
