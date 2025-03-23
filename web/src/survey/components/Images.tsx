import { Spin } from "antd";
import { useState } from "react";

type ImagesProps = {
  imageA: string;
  imageB: string;
  onClick: (response: "Obraz A" | "Obraz B") => void;
};

export const Images = ({ imageA, imageB, onClick }: ImagesProps) => {
  const [isImageALoaded, setImageALoaded] = useState(false);
  const [isImageBLoaded, setImageBLoaded] = useState(false);

  const clickable = typeof onClick === "function";

  const cardClasses =
    "w-full object-contain rounded shadow transition-transform hover:scale-105";
  const wrapperClasses = clickable
    ? "rounded-lg overflow-hidden hover:shadow-lg cursor-pointer transition"
    : "";

  const onAClick = () => {
    setImageALoaded(false);
    setImageBLoaded(false);
    allLoaded && onClick("Obraz A");
  };
  const onBClick = () => {
    setImageALoaded(false);
    setImageBLoaded(false);
    allLoaded && onClick("Obraz B");
  };

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
          onClick={onAClick}
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
            onLoad={() => setImageALoaded(true)}
          />
        </div>
        <div
          className={`flex flex-col w-full sm:w-1/2 items-center ${wrapperClasses}`}
          onClick={onBClick}
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
            onLoad={() => setImageBLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};
