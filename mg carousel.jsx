import React, { useState, useEffect } from "react";

function ImageCarousel() {
  /* ---------------- Images Array ---------------- */

  const images = [
    "https://picsum.photos/id/1015/600/300",
    "https://picsum.photos/id/1016/600/300",
    "https://picsum.photos/id/1018/600/300",
  ];

  /* ---------------- Active Slide State ---------------- */

  const [currentIndex, setCurrentIndex] = useState(0);

  /* ---------------- Next Slide ---------------- */

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  /* ---------------- Previous Slide ---------------- */

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  /* ---------------- Auto Slide ---------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Image Carousel / Slider</h1>

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt="slider"
        style={imageStyle}
      />

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={prevSlide}>
          Prev
        </button>

        <button
          onClick={nextSlide}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>

      {/* Indicator */}
      <p>
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const imageStyle = {
  width: "600px",
  height: "300px",
  objectFit: "cover",
  borderRadius: "10px",
};

export default ImageCarousel;