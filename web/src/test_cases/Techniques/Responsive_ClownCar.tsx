import React, { useMemo } from "react";

interface ResponsiveClownCarProps {
  smallSrc: string;
  largeSrc: string;
  altText: string;
}

let clownCarIdCounter = 0;

export const ResponsiveClownCar: React.FC<ResponsiveClownCarProps> = ({
  smallSrc,
  largeSrc,
  altText,
}) => {
  const uniqueClass = useMemo(() => {
    clownCarIdCounter += 1;
    return `responsive-clowncar-${clownCarIdCounter}`;
  }, []);

  return (
    <svg
      className={uniqueClass}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1 1"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <style>
        {`
                    .${uniqueClass} {
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        display: block;
                        width: 100%;
                        height: auto;
                    }
                    @media screen and (max-width: 600px) {
                        .${uniqueClass} { background-image: url("${smallSrc}"); }
                    }
                    @media screen and (min-width: 601px) {
                        .${uniqueClass} { background-image: url("${largeSrc}"); }
                    }
                `}
      </style>
      <title>{altText}</title>
    </svg>
  );
};
