interface ResponsiveHTMLProps {
    smallSrc: string;
    largeSrc: string;
    altText: string;
}

export const ResponsiveHTML: React.FC<ResponsiveHTMLProps> = ({ smallSrc, largeSrc, altText }) => {
    return (
        <picture>
            <source media="(max-width: 600px)" srcSet={smallSrc} />
            <source media="(min-width: 601px)" srcSet={largeSrc} />
            <img src={smallSrc} alt={altText} />
        </picture>
    );
};