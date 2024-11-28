import { useState } from "react";
import jobhunt_slider from "@assets/img/jobhunt_slider.png";
import xmas from "@assets/img/xmas.png";
import mu from "@assets/img/mu.jpeg";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [jobhunt_slider, xmas, mu];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="mt-2 relative">
      <div className="flex overflow-hidden rounded-md border-4 h-[250px] border-primary-600 relative">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex items-center gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full bg-gray-200 ${
              index === currentSlide ? "bg-gray-600" : ""
            }`}
          ></div>
        ))}
      </div>
      <div className="absolute top-1/2 left-0 bg-gray-150 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
        <IconButton onClick={handlePreviousSlide}>
          <KeyboardArrowLeftIcon />
        </IconButton>
      </div>
      <div className="absolute top-1/2 right-0 bg-gray-150 rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 shadow-lg">
        <IconButton onClick={handleNextSlide}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
}
