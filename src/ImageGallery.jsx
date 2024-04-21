// Importing images from the image folder
const images = [
    require('./assets/imgs/0017.jpg'),
    require('./assets/imgs/0018.jpg'),
    // Add more images here as needed
  ];
  
  // Component to render each image
  const ImageGallery = () => {
    return (
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
    );
  };
  
  export default ImageGallery;
  