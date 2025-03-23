type ImagesProps = {
  imageA: string;
  imageB: string;
  onClick?: (response: "A" | "B") => void;
};

export const Images = ({ imageA, imageB, onClick }: ImagesProps) => {
  const clickable = typeof onClick === "function";

  const cardClasses =
    "w-full object-contain rounded shadow transition-transform hover:scale-105";
  const wrapperClasses = clickable
    ? "rounded-lg overflow-hidden hover:shadow-lg cursor-pointer transition"
    : "";

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div
          className={`flex flex-col w-full sm:w-1/2 items-center ${wrapperClasses}`}
          onClick={() => clickable && onClick("A")}
        >
          <span className="text-center font-medium my-2">Option A</span>
          <img src={imageA} alt="Image A" className={cardClasses} />
        </div>
        <div
          className={`flex flex-col w-full sm:w-1/2 items-center ${wrapperClasses}`}
          onClick={() => clickable && onClick("B")}
        >
          <span className="text-center font-medium my-2">Option B</span>
          <img src={imageB} alt="Image B" className={cardClasses} />
        </div>
      </div>
    </div>
  );
};
