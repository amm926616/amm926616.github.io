function createProjectArticles() {
  // Example data for projects
  const projects = [
    {
      id: "april-music-player",
      name: "April Music Player",
      description:
        "April Music Player is not just a music player; it’s a companion for both music lovers and language learners.",
      galleryId: "april-music-player-gallery",
      showcaseVideoText: "The video",
      projectUrl: "https://april-music-player.github.io",
      buttonText: "More about April Music Player",
    },

    {
      id: "aespa-Live-My-Life-Film-Photos",
      name: "Aespa Live My Life Gallery",
      description:
        "April Music Player is not just a music player; it’s a companion for both music lovers and language learners.",
      galleryId: "aespa-Live-My-Life-Film-Photos-gallery",
      showcaseVideoText: "The video",
      projectUrl: "https://april-music-player.github.io",
      buttonText: "More about April Music Player",
    },
  ];
  const container = document.getElementById("projects-container"); // The container for all projects

  projects.forEach((project) => {
    // Create article element
    const article = document.createElement("article");
    article.id = project.id;
    article.className = "project";

    // Create project title
    const title = document.createElement("h3");
    title.textContent = project.name;
    article.appendChild(title);

    // Create description paragraph
    const description = document.createElement("p");
    description.textContent = project.description;
    article.appendChild(description);

    // Create Screenshots section
    const screenshotsTitle = document.createElement("h3");
    screenshotsTitle.textContent = "Screenshots";
    article.appendChild(screenshotsTitle);

    const galleryDiv = document.createElement("div");
    galleryDiv.id = project.galleryId;
    galleryDiv.className = "screenshot-gallery";
    article.appendChild(galleryDiv);

    // Create Showcase Video section
    const showcaseTitle = document.createElement("h3");
    showcaseTitle.textContent = "Project Showcase Video";
    article.appendChild(showcaseTitle);

    const videoLink = document.createElement("a");
    videoLink.textContent = project.showcaseVideoText;
    article.appendChild(videoLink);

    // Create button container
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const exploreButton = document.createElement("a");
    exploreButton.href = project.projectUrl;
    exploreButton.target = "_blank";
    exploreButton.className = "explore-button";
    exploreButton.textContent = project.buttonText;

    buttonContainer.appendChild(exploreButton);
    article.appendChild(buttonContainer);

    // Append article to the container
    container.appendChild(article);
  });
}
