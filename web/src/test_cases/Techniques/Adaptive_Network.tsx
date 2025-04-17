import React, { useEffect, useState } from "react";

interface AdaptiveNetworkProps {
  slowSrc: string; // Image for 2G
  mediumSrc: string; // Image for 3G
  fastSrc: string; // Image for 4G
  altText: string;
}

export const AdaptiveNetwork: React.FC<AdaptiveNetworkProps> = ({
  slowSrc,
  mediumSrc,
  fastSrc,
  altText,
}) => {
  const [selectedSrc, setSelectedSrc] = useState<string>(mediumSrc); // Default to mediumSrc (3G)
  const [speed, setSpeed] = useState<string>("");

  useEffect(() => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection && connection.effectiveType) {
      setSpeed(connection.effectiveType);
      switch (connection.effectiveType) {
        case "2g":
          setSelectedSrc(slowSrc);
          break;
        case "3g":
          setSelectedSrc(mediumSrc);
          break;
        case "4g":
        default:
          setSelectedSrc(fastSrc);
          break;
      }
    }
  }, [slowSrc, mediumSrc, fastSrc]);

  return <img className="w-1/3 object-cover" src={selectedSrc} alt={altText} />;
};
