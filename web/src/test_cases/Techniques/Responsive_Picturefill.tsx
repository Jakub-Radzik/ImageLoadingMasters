interface ResponsivePicturefillProps {
  smallSrc: string;
  largeSrc: string;
  altText: string;
}

export const ResponsivePicturefill: React.FC<ResponsivePicturefillProps> = ({
  smallSrc,
  largeSrc,
  altText,
}) => {
  console.log("ResponsivePicturefill", smallSrc, largeSrc, altText);
  return (
    <span data-picture>
      <span data-src={smallSrc}></span>
      <span data-src={largeSrc} data-media="(min-width: 601px)"></span>
      <noscript>
        <img src={smallSrc} alt={altText} />
      </noscript>
    </span>
  );
};
