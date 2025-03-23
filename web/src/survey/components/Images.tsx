import { Spin } from "antd";
import { useState } from "react";

type ImagesProps = {
  imageA: string;
  imageB: string;
  isImageALoaded: boolean;
  isImageBLoaded: boolean;
  setIsImageALoaded: () => void;
  setIsImageBLoaded: () => void;
  onClick: (response: "Obraz A" | "Obraz B") => void;
};

export const Images = ({
  imageA,
  imageB,
  onClick,
  isImageALoaded,
  isImageBLoaded,
  setIsImageALoaded,
  setIsImageBLoaded,
}: ImagesProps) => {
  const clickable = typeof onClick === "function";

  const cardClasses = "w-full object-contain rounded shadow";
  const wrapperClasses = clickable ? "rounded-lg overflow-hidden" : "";

  const allLoaded = isImageALoaded && isImageBLoaded;

  return (
    <div className="p-4">
      {!allLoaded && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.9)",
            height: 500,
            width: "100%",
          }}
        >
          <div className="flex justify-center">
            Ładowanie obrazów
            <Spin size="large" />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div
          className={`flex flex-col w-full sm:w-1/2 items-center ${wrapperClasses}`}
        >
          <span className="text-center font-medium my-2">Option A</span>
          {!isImageALoaded && (
            <div>
              <Spin />
              <p>Poczekaj na załadowanie obrazu</p>
            </div>
          )}
          <img
            src={imageA}
            alt="Image A"
            className={cardClasses}
            onLoad={setIsImageALoaded}
          />
        </div>
        <div
          className={`flex flex-col w-full sm:w-1/2 items-center ${wrapperClasses}`}
        >
          <span className="text-center font-medium my-2">Option B</span>
          {!isImageBLoaded && (
            <div>
              <Spin />
              <p>Poczekaj na załadowanie obrazu</p>
            </div>
          )}
          <img
            src={imageB}
            alt="Image B"
            className={cardClasses}
            onLoad={setIsImageBLoaded}
          />
        </div>
      </div>
    </div>
  );
};
