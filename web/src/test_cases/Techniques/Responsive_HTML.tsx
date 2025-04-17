interface ResponsiveHTMLProps {
  smallSrc: string;
  largeSrc: string;
  altText: string;
}

export const ResponsiveHTML: React.FC<ResponsiveHTMLProps> = ({
  smallSrc,
  largeSrc,
  altText,
}) => {
  return (
    <picture className="w-1/3 object-cover">
      <source media="(max-width: 600px)" srcSet={smallSrc} />
      <source media="(min-width: 601px)" srcSet={largeSrc} />
      <img src={smallSrc} alt={altText} />
    </picture>
  );
};
