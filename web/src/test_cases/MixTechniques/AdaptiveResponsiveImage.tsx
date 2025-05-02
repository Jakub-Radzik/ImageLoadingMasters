import React, { useEffect, useState } from "react";

interface AdaptiveResponsiveImageProps {
  smallSlow: string; // <600px, <4G
  smallFast: string; // <600px, >=4G
  largeSlow: string; // >=600px, <4G
  largeFast: string; // >=600px, >=4G
  altText: string;
}

export const AdaptiveResponsiveImage: React.FC<
  AdaptiveResponsiveImageProps
> = ({ smallSlow, smallFast, largeSlow, largeFast, altText }) => {
  const [selectedSrc, setSelectedSrc] = useState<string>(smallFast); // domyślnie 3G i mały ekran
  const [connection, setConnection] = useState<string>("unknown");
  const [size, setSize] = useState<string>("");

  useEffect(() => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    const isFastNetwork = connection?.effectiveType === "4g";
    const isSmallScreen = window.innerWidth <= 600;

    setSize(window.innerWidth <= 600 ? "small" : "large");
    setConnection(connection);

    const src = isSmallScreen
      ? isFastNetwork
        ? smallFast
        : smallSlow
      : isFastNetwork
      ? largeFast
      : largeSlow;

    setSelectedSrc(src);
  }, [smallSlow, smallFast, largeSlow, largeFast]);

  return (
    <>
      {size + " " + connection}
      <img className="w-1/3 object-cover" src={selectedSrc} alt={altText} />
    </>
  );
};
